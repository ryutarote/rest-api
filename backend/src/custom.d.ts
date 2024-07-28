import { User as PrismaUser } from '@prisma/client';

// Make sure to use the PrismaUser type in a meaningful way
type User = Omit<PrismaUser, 'password'>;

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}

// This ensures TypeScript treats this as a module
export {};
