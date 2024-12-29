import { User } from "@prisma/client";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { NextRequest, NextResponse } from "next/server";

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

// verify and decode JWT token
export function verifyAndDecodeToken(token: string) {
  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    return decoded;
  } catch (error) {
    if (error instanceof jwt.TokenExpiredError) {
      throw new Error("Token has expired");
    } else if (error instanceof jwt.JsonWebTokenError) {
      throw new Error("Invalid token");
    }
    throw error;
  }
}

// generate refresh token
export function generateRefreshToken(payload: Pick<User, "email" | "name">) {
  try {
    return jwt.sign(payload, JWT_SECRET, { expiresIn: "7d" });
  } catch {
    throw new Error("Error generating refresh token");
  }
}

interface TokenData {
  email: string;
  // Add other token payload fields if needed
}

export async function verifyAuthToken(req: NextRequest): Promise<{
  success: boolean;
  data?: TokenData;
  error?: NextResponse;
}> {
  try {
    // Get Authorization header
    const authHeader = req.headers.get("Authorization");
    if (!authHeader?.startsWith("Bearer ")) {
      return {
        success: false,
        error: NextResponse.json(
          { message: "Invalid authorization header" },
          { status: 401 }
        ),
      };
    }

    // Extract token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return {
        success: false,
        error: NextResponse.json(
          { message: "No token provided" },
          { status: 401 }
        ),
      };
    }

    // Verify and decode token
    const decodedToken = verifyAndDecodeToken(token) as TokenData;

    return {
      success: true,
      data: decodedToken,
    };
  } catch {
    return {
      success: false,
      error: NextResponse.json(
        { message: "Invalid or expired token" },
        { status: 401 }
      ),
    };
  }
}
