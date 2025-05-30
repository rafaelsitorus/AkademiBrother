// app/layout.tsx
import './globals.css';
import { Inter } from 'next/font/google';
import { AuthProvider } from './providers'; // Pastikan ini benar

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
        <AuthProvider> {/* Ini membungkus seluruh aplikasi Anda */}
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}