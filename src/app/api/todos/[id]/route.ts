import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("POST /api/todo/id", req);
    return NextResponse.json({ message: "todo fetch by id" });
  } catch {
    return NextResponse.error();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    console.log("POST /api/todo/id", req);
    return NextResponse.json({ message: "todo update" });
  } catch {
    return NextResponse.error();
  }
}

export async function DELETE(req: NextRequest) {
  try {
    console.log("POST /api/todo/id", req);
    return NextResponse.json({ message: "todo deleted" });
  } catch {
    return NextResponse.error();
  }
}
