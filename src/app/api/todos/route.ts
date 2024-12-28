import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("POST /api/todos", req);
    return NextResponse.json({ message: "Fetch all todos" });
  } catch {
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("POST /api/todos", req);
    return NextResponse.json({ message: "todos Created" });
  } catch {
    return NextResponse.error();
  }
}
