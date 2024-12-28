import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    console.log("POST /api/auth/signout", req);
    return NextResponse.json({ message: "Signup Successful" });
  } catch {
    return NextResponse.error();
  }
}
