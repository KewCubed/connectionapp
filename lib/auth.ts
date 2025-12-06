import bcrypt from 'bcryptjs';
import { prisma } from './db';

export interface User {
  id: string;
  username: string;
  createdAt: Date;
}

/**
 * Hash a password using bcrypt
 */
export async function hashPassword(password: string): Promise<string> {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

/**
 * Verify a password against a hash
 */
export async function verifyPassword(
  password: string,
  hash: string
): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

/**
 * Create a new user (placeholder - requires database connection)
 */
export async function createUser(
  username: string,
  password: string
): Promise<User> {
  const passwordHash = await hashPassword(password);
  
  // This will work once DATABASE_URL is configured
  const user = await prisma.user.create({
    data: {
      username,
      passwordHash,
    },
    select: {
      id: true,
      username: true,
      createdAt: true,
    },
  });

  return user;
}

/**
 * Find user by username (placeholder - requires database connection)
 */
export async function findUserByUsername(username: string) {
  return prisma.user.findUnique({
    where: { username },
    select: {
      id: true,
      username: true,
      passwordHash: true,
      createdAt: true,
    },
  });
}

/**
 * Find user by ID (placeholder - requires database connection)
 */
export async function findUserById(id: string): Promise<User | null> {
  return prisma.user.findUnique({
    where: { id },
    select: {
      id: true,
      username: true,
      createdAt: true,
    },
  });
}


