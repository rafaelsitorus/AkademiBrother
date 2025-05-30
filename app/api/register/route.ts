import { NextResponse } from 'next/server';
import * as bcrypt from 'bcryptjs';
import prisma from '../../../lib/prisma';

export async function POST(req: Request) {
  try {
    const { username, password, email, roleName } = await req.json();

    // Validasi input dasar - TAMBAHKAN EMAIL DI SINI
    if (!username || !password || !email || !roleName) {
      return NextResponse.json({ message: 'Username, password, email, and role are required.' }, { status: 400 });
    }

    // Cek apakah username sudah ada
    const existingUser = await prisma.user.findUnique({
      where: { Username: username },
    });

    if (existingUser) {
      return NextResponse.json({ message: 'Username already exists.' }, { status: 409 });
    }

    // Cek apakah email sudah ada
    const existingEmail = await prisma.user.findUnique({
      where: { Email: email },
    });
    if (existingEmail) {
      return NextResponse.json({ message: 'Email already exists.' }, { status: 409 });
    }

    // Cari RoleID berdasarkan RoleName
    const role = await prisma.roles.findUnique({
      where: { RoleName: roleName },
    });

    if (!role) {
      return NextResponse.json({ message: `Role '${roleName}' not found.` }, { status: 404 });
    }

    // Hash password sebelum menyimpan
    const hashedPassword = await bcrypt.hash(password, 10); // Salting rounds: 10

    // Buat user baru
    const newUser = await prisma.user.create({
      data: {
        Username: username,
        Email: email,
        Password: hashedPassword,
        RoleID: role.RoleID,
      },
    });

    // Jangan kembalikan password yang di-hash ke client
    const { Password: userPassword, ...rest } = newUser;

    return NextResponse.json({ message: 'User registered successfully!', user: rest }, { status: 201 });

  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json({ message: 'Internal server error.' }, { status: 500 });
  }
}