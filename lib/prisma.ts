import { PrismaClient } from '../app/generated/prisma'; // PATH INI SANGAT PENTING!

// Global variable to hold the PrismaClient instance in development to prevent
// multiple instances on hot-reloads, which can lead to "too many connections" errors.
declare global {
  var prisma: PrismaClient | undefined;
}

// Use the existing instance or create a new one if it doesn't exist
const prisma = global.prisma || new PrismaClient();

// In development, store the PrismaClient instance globally
if (process.env.NODE_ENV === 'development') {
  global.prisma = prisma;
}

export default prisma;