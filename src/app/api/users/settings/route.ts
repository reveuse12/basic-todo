import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("POST /api/users/settings", req);
    return NextResponse.json({ message: "users settings" });
  } catch {
    return NextResponse.error();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    console.log("POST /api/users/settings", req);
    return NextResponse.json({ message: "users settings update" });
  } catch {
    return NextResponse.error();
  }
}
