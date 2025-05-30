// app/layout.tsx
import './globals.css'; // Global CSS Anda
import { Inter } from 'next/font/google';
import { AuthProvider } from './providers'; // Import AuthProvider Anda

const inter = Inter({ subsets: ['latin'] });

export const metadata = {
  title: 'Aplikasi Next.js',
  description: 'Aplikasi dengan autentikasi NextAuth.js',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        {/* AuthProvider harus melingkupi semua children agar useSession bekerja */}
        <AuthProvider>
          {children} {/* Konten halaman Anda (termasuk app/page.tsx) akan dirender di sini */}
        </AuthProvider>
      </body>
    </html>
  );
}