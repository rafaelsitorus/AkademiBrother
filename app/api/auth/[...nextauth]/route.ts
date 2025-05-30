// app/api/auth/[...nextauth]/route.ts
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import * as bcrypt from 'bcryptjs'; // Untuk hashing dan verifikasi password

// Pastikan path ini benar sesuai lokasi `lib/prisma.ts` Anda
// Jika `lib` ada di root: `../../../lib/prisma`
// Jika `lib` ada di `app`: `../../lib/prisma`
import prisma from "../../../../lib/prisma";

import type { NextAuthOptions, Session } from "next-auth";
import type { JWT } from "next-auth/jwt";

export const authOptions: NextAuthOptions = {
  providers: [
    // Hanya gunakan CredentialsProvider untuk login username/email & password
    CredentialsProvider({
      name: "Credentials",
      // Ini adalah form input yang akan ditampilkan oleh NextAuth.js jika Anda menggunakan
      // halaman signIn default NextAuth.js. Karena kita punya halaman signIn kustom,
      // ini lebih untuk informasi tipe dan validasi internal.
      credentials: {
        identifier: { label: "Username or Email", type: "text", placeholder: "username or email" },
        password: { label: "Password", type: "password" },
      },
      // Fungsi `authorize` adalah tempat Anda memverifikasi kredensial.
      async authorize(credentials) {
        if (!credentials?.identifier || !credentials.password) {
            return null;
        }

        try {
            // 1. Cari user berdasarkan username ATAU email
            const user = await prisma.user.findFirst({
                where: {
                    OR: [
                        { username: credentials.identifier },
                        { email: credentials.identifier },
                    ],
                },
                include: { role: true }, // Sertakan role untuk mendapatkan RoleName
            });

            // 2. Jika user tidak ditemukan
            if (!user) {
                return null; // Autentikasi gagal (user tidak ada)
            }

            // 3. Pastikan password dari DB ada dan berformat string yang valid
            if (typeof user.password !== 'string' || user.password.length === 0) {
                return null;
            }

            // 4. Bandingkan password yang diinput dengan password yang di-hash di database
            const isValidPassword = await bcrypt.compare(credentials.password, user.password);

            if (isValidPassword) {
                return {
                    id: user.UserID.toString(), // Pastikan UserID adalah string
                    name: user.username || user.email, // Gunakan username atau email sebagai nama
                    email: user.email,
                    roleName: user.role?.RoleName, // Menyuntikkan roleName ke objek user
                };
            } else {
                return null; // Password tidak cocok
            }
        } catch (error) {
            return null; // Mengembalikan null pada error tak terduga
        }
      },
    }),
  ],
  secret: process.env.NEXTAUTH_SECRET, // Variabel lingkungan wajib
  session: {
    strategy: "jwt", // Kita tetap menggunakan JWT untuk manajemen sesi
    maxAge: 30 * 24 * 60 * 60, // Sesi berlaku 30 hari
    updateAge: 24 * 60 * 60, // Refresh sesi setiap 24 jam
  },
  pages: {
    signIn: "/signin", // Mengarahkan ke halaman login kustom Anda
    // error: '/auth/error', // Opsional: Halaman error kustom untuk NextAuth.js
  },
  callbacks: {
    // Callback `jwt` dieksekusi saat JWT dibuat atau diperbarui.
    // Ini penting untuk menambahkan data kustom (seperti UserID dan RoleName) ke dalam token.
    async jwt({ token, user }) {
      if (user) {
        // `user` di sini adalah objek yang dikembalikan dari fungsi `authorize` di atas.
        token.id = user.id;
        (token as any).roleName = (user as any).roleName;
      }
      return token;
    },

    // Callback `session` dieksekusi setiap kali sesi diakses oleh client.
    // Ini untuk memastikan data kustom dari token (seperti UserID dan RoleName)
    // tersedia di objek `session.user` di client.
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id as string;
        (session.user as any).roleName = (token as any).roleName;
      }
      return session;
    },
  },
  // Aktifkan debugging di development untuk melihat log NextAuth.js yang lebih detail
  debug: process.env.NODE_ENV === 'development',
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };