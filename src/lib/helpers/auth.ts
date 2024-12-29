import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// password hashing function
export async function hashPassword(password: string) {
  return bcrypt.hash(password, 10);
}

// password verification function
export async function verifyPassword(password: string, hashedPassword: string) {
  return bcrypt.compareSync(password, hashedPassword);
}

// JWT secret key
export const JWT_SECRET = process.env.JWT_SECRET!;

// generate JWT token
export function generateToken(payload: Pick<User, "email" | "name">) {
  return jwt.sign(payload, JWT_SECRET);
}
