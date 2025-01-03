import { DBprisma } from "@/lib/db";
import { verifyAuthToken } from "@/lib/helpers/auth";
import { NextRequest, NextResponse } from "next/server";

type Params = {
  id: string;
  subtaskId: string;
};

export async function PATCH(
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
    const { id, subtaskId } = await params;

    const updatedSubtask = await DBprisma.subtask.update({
      where: { id: subtaskId, todoId: id },
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

export async function DELETE(
  req: NextRequest,
  { params }: { params: Promise<Params> }
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
    const { id, subtaskId } = await params;

    const deletedSubtask = await DBprisma.subtask.delete({
      where: { id: subtaskId, todoId: id },
    });

    console.log("deletedSubtask", deletedSubtask);
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
