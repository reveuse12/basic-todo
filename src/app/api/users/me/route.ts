import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("POST /api/users/me", req);
    return NextResponse.json({ message: "users me" });
  } catch {
    return NextResponse.error();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    console.log("POST /api/users/me", req);
    return NextResponse.json({ message: "users me update" });
  } catch {
    return NextResponse.error();
  }
}

export async function DELETE(req: NextRequest) {
  try {
    console.log("POST /api/users/me", req);
    return NextResponse.json({ message: "users me delete" });
  } catch {
    return NextResponse.error();
  }
}
