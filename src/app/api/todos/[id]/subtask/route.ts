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

export async function POST(req: NextRequest, { params }: { params: Params }) {
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

export async function PATCH(req: NextRequest, { params }: { params: Params }) {
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
    const todoId = id;

    const todo = await DBprisma.todo.findUnique({
      where: { id: todoId, userId: user.id },
    });
    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    const subtask = await DBprisma.subtask.findFirst({
      where: { todo },
    });

    if (!subtask) {
      return NextResponse.json(
        { message: "Subtask not found" },
        { status: 404 }
      );
    }

    const updatedSubtask = await DBprisma.subtask.update({
      where: { id: subtask.id },
      data: {
        title,
        completed,
      },
    });

    console.log("updatedSubtask", updatedSubtask);

    if (!updatedSubtask) {
      return NextResponse.json(
        { message: "Subtask not updated" },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { message: "todo update subtask", updatedSubtask },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating subtask:", JSON.stringify(error));
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, { params }: { params: Params }) {
  try {
    const { success, error, data: tokenData } = await verifyAuthToken(req);
    if (!success || !tokenData) {
      return error;
    }
    const user = await DBprisma.user.findUnique({
      where: { email: tokenData.email },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const { id } = params;
    const todoId = id;
    const todo = await DBprisma.todo.findUnique({
      where: { id: todoId, userId: user.id },
    });
    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    const subtask = await DBprisma.subtask.findFirst({
      where: { todo },
    });
    if (!subtask) {
      return NextResponse.json(
        { message: "Subtask not found" },
        { status: 404 }
      );
    }
    const deletedSubtask = await DBprisma.subtask.delete({
      where: { id: subtask.id },
    });
    return NextResponse.json({
      message: "todo deleted subtask",
      deletedSubtask,
    });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
