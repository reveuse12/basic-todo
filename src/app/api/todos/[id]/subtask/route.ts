import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  try {
    console.log("POST /api/todo/id.subtask", req);
    return NextResponse.json({ message: "todo fetch by id subtask" });
  } catch {
    return NextResponse.error();
  }
}

export async function PATCH(req: NextRequest) {
  try {
    console.log("POST /api/todo/id.subtask", req);
    return NextResponse.json({ message: "todo update subtask" });
  } catch {
    return NextResponse.error();
  }
}

export async function DELETE(req: NextRequest) {
  try {
    console.log("POST /api/todo/id.subtask", req);
    return NextResponse.json({ message: "todo deleted subtask" });
  } catch {
    return NextResponse.error();
  }
}

export async function POST(req: NextRequest) {
  try {
    console.log("POST /api/todo/id.subtask", req);
    return NextResponse.json({ message: "todo created subtask" });
  } catch {
    return NextResponse.error();
  }
}
