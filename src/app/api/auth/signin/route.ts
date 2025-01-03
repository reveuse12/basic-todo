import { NextRequest, NextResponse } from "next/server";
import { DBprisma } from "@/lib/db";
import { generateRefreshToken, verifyPassword } from "@/lib/helpers/auth";

export async function POST(req: NextRequest) {
  try {
    const { email, password } = await req.json();

    if (!email || !password) {
      return NextResponse.json(
        { message: "Email and password are required" },
        { status: 400 }
      );
    }

    const user = await DBprisma.user.findUnique({ where: { email } });

    if (!user)
      return NextResponse.json({ message: "User not found" }, { status: 404 });

    const passwordMatch = await verifyPassword(password, user.password);

    if (!passwordMatch)
      return NextResponse.json(
        { message: "Invalid Credentials" },
        { status: 401 }
      );

    const token = generateRefreshToken({ email: user.email, name: user.name });
    const refreshToken = generateRefreshToken({
      email: user.email,
      name: user.name,
    });

    const response = NextResponse.json({
      message: "Login Successful",
      token,
      refreshToken,
      user: { email: user.email, name: user.name },
    });
    response.headers.set(
      "Set-Cookie",
      `auth=${token}; Path=/; HttpOnly; SameSite=Strict; Max-Age=3600, refresh=${refreshToken}; Path=/api/auth/refresh; HttpOnly; SameSite=Strict; Max-Age=604800`
    );
    return response;
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
