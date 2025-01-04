import { NextRequest, NextResponse } from "next/server";
import { DBprisma } from "@/lib/db";
import { verifyAuthToken } from "@/lib/helpers/auth";
import { Priority } from "@prisma/client";

// fetch all todos
export async function GET(req: NextRequest) {
  try {
    const { success, data: tokenData, error } = await verifyAuthToken(req);
    if (!success || !tokenData) {
      return error;
    }

    const user = await DBprisma.user.findUnique({
      where: { email: tokenData.email },
    });

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    const todos = await DBprisma.todo.findMany({
      where: { userId: user.id },
      include: { labels: true, subtasks: true },
    });

    return NextResponse.json({ todos }, { status: 200 });
  } catch (error) {
    console.log("Detailed error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}

// create a new todo
export async function POST(req: NextRequest) {
  try {
    // Verify and decode token
    const { success, data: tokenData, error } = await verifyAuthToken(req);
    if (!success || !tokenData) {
      return error;
    }

    const { title, description, priority, dueDate, listId } = await req.json();

    if (!title) {
      return NextResponse.json(
        {
          message: "Title is required",
        },
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

    // Create todo
    const todo = await DBprisma.todo.create({
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

    return NextResponse.json(
      { message: "Todo created successfully", todo },
      { status: 201 }
    );
  } catch (error) {
    console.error("Detailed error:", error);
    return NextResponse.json(
      { message: "Internal Server Error" },
      { status: 500 }
    );
  }
}
