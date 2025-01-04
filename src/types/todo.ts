export type Todo = {
  id: string;
  title: string;
  description?: string;
  completed: boolean;
  priority: "LOW" | "MEDIUM" | "HIGH" | "URGENT";
  dueDate?: Date;
  createdAt?: Date;
  updatedAt?: Date;
  labels?: Label[];
  subtasks?: Subtask[];
};

export type Subtask = {
  id: string;
  title: string;
  completed: boolean;
  todoId: string;
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
