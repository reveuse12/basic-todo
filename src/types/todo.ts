export type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  labels: Label[];
};

export type Label = {
  id: string;
  name: string;
  color: string;
};

export type CreateTodoInput = {
  title: string;
  description?: string;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate?: Date;
  labelIds?: string[];
};
