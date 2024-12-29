import { DBprisma } from "@/lib/db";
import { verifyAuthToken } from "@/lib/helpers/auth";
import { Priority } from "@prisma/client";
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

export async function PATCH(req: NextRequest) {
  try {
    const { success, error, data: tokenData } = await verifyAuthToken(req);
    if (!success || !tokenData) {
      return error;
    }
    const { title, description, priority, dueDate, listId } = await req.json();
    if (!title) {
      return NextResponse.json(
        { message: "Title is required" },
        { status: 400 }
      );
    }
    if (priority && !Object.values(Priority).includes(priority)) {
      return NextResponse.json(
        {
          message:
            "Invalid priority value. Must be LOW, MEDIUM, HIGH, or URGENT",
        },
        { status: 400 }
      );
    }

    let parsedDueDate: Date | undefined;
    if (dueDate) {
      parsedDueDate = new Date(dueDate);
      if (isNaN(parsedDueDate.getTime())) {
        return NextResponse.json(
          {
            message: "Invalid date format",
          },
          { status: 400 }
        );
      }
    }
    // Find user
    const user = await DBprisma.user.findUnique({
      where: { email: tokenData.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const updatedTodo = await DBprisma.todo.update({
      where: { id: user.id },
      data: {
        title: title.trim(),
        description: description?.trim(),
        priority: priority || Priority.MEDIUM,
        dueDate: parsedDueDate,
        listId: listId || null,
        userId: user.id,
        completed: false,
      },
    });
    if (!updatedTodo) {
      return NextResponse.json(
        { message: "Failed to update todo" },
        { status: 500 }
      );
    }

    return NextResponse.json(
      { message: "todo update", updatedTodo },
      { status: 200 }
    );
  } catch (err) {
    console.log("error", JSON.stringify(err));
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: NextRequest, params: { id: string }) {
  try {
    const { success, error, data: tokenData } = await verifyAuthToken(req);
    if (!success || !tokenData) {
      return error;
    }
    const { id } = params;
    // Find user
    const user = await DBprisma.user.findUnique({
      where: { email: tokenData.email },
    });
    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }
    const todo = await DBprisma.todo.findUnique({
      where: { id },
    });
    if (!todo) {
      return NextResponse.json({ message: "Todo not found" }, { status: 404 });
    }
    await DBprisma.todo.delete({
      where: { id },
    });
    console.log("Deleted todo", todo);
    return NextResponse.json({ message: "todo deleted", todo });
  } catch {
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
