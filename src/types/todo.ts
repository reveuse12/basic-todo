export type Priority = "LOW" | "MEDIUM" | "HIGH" | "URGENT";
export type Status = "NOTSTARTED" | "INPROGRESS" | "DONE";

export interface Todo {
  id: string;
  title: string;
  description?: string | null;
  completed: boolean;
  priority: Priority;
  status: Status;
  dueDate?: Date | null;
  createdAt: Date;
  updatedAt: Date;
  userId: string;
  listId?: string | null;
  subtasks: Subtask[];
  labels: Label[];
}

export interface Subtask {
  id: string;
  title: string;
  status: Status;
  completed: boolean;
  todoId: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Label {
  id: string;
  name: string;
  color: string;
  createdAt: Date;
  updatedAt: Date;
}

export type CreateTodoInput = {
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  status: "NOTSTARTED" | "INPROGRESS" | "DONE";
  dueDate?: Date;
  labelIds?: string[];
};
