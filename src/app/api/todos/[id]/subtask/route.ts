import { DBprisma } from "@/lib/db";
import { verifyAuthToken } from "@/lib/helpers/auth";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
};

export async function GET(req: NextRequest) {
  try {
    console.log("GET /api/todo/id.subtask", req);
    return NextResponse.json({ message: "todo fetch by id subtask" });
  } catch {
    return NextResponse.error();
  }
}

export async function POST(
  req: NextRequest,
  { params }: { params: Promise<Params> }
) {
  try {
    const { success, error, data: tokenData } = await verifyAuthToken(req);
    if (!success || !tokenData) {
      return error;
    }

    const { title, completed } = await req.json();

    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }

    const user = await DBprisma.user.findUnique({
      where: { email: tokenData.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const { id } = await params;

    const todo = await DBprisma.todo.findUnique({
      where: { id: id, userId: user.id },
    });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }

    const subtask = await DBprisma.subtask.create({
      data: {
        title,
        completed,
        todoId: todo.id,
      },
    });

    return NextResponse.json({ message: "Subtask created", subtask });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
