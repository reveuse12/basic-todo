import { DBprisma } from "@/lib/db";
import { verifyAuthToken } from "@/lib/helpers/auth";
import { Todo } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest, params: { id: string }) {
  try {
    const { success, error, data: tokenData } = await verifyAuthToken(req);
    if (!success || !tokenData) {
      return error;
    }
    const { id } = params;
    // find todo by id
    const todo = await DBprisma.todo.findFirst({
      where: { id, userId: tokenData.email },
    });
    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    return NextResponse.json(
      { message: "todo fetch by id", todo },
      { status: 200 }
    );
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function PATCH(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const existingTodo = await DBprisma.todo.findFirst({
      where: {
        id,
        userId: user.id,
      },
    });

    if (!existingTodo) {
      return NextResponse.json(
        { message: "Todo not found or unauthorized" },
        { status: 404 }
      );
    }

    const body = await req.json();
    const { title, description, priority, dueDate, listId, completed } = body;

    const updateData: Partial<Todo> = {};

    if (title !== undefined) updateData.title = title.trim();
    if (description !== undefined) updateData.description = description.trim();
    if (priority !== undefined) updateData.priority = priority;
    if (dueDate !== undefined) updateData.dueDate = new Date(dueDate);
    if (listId !== undefined) updateData.listId = listId || null;
    if (completed !== undefined) updateData.completed = Boolean(completed);

    const updatedTodo = await DBprisma.todo.update({
      where: { id },
      data: {
        ...updateData,
      },
    });

    return NextResponse.json(
      { message: "Todo updated successfully", todo: updatedTodo },
      { status: 200 }
    );
  } catch (error) {
    console.log("Error updating todo:", JSON.stringify(error, null, 2));
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  req: NextRequest,
  { params }: { params: { id: string } }
) {
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

    const todo = await DBprisma.todo.findUnique({
      where: { id },
    });

    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    await DBprisma.todo.delete({
      where: { id },
    });
    return NextResponse.json({ message: "todo deleted", todo });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
