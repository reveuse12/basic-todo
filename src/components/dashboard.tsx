"use client";

import { useEffect, useState } from "react";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { CreateTodoDialog } from "@/components/create-todo-dialog";
import { EditTodoDialog } from "@/components/edit-todo-dialog";
import { TodoItem } from "@/components/todo-item";
import { ScrollArea } from "./ui/scroll-area";
import { Todo } from "@prisma/client";
import { fetchAllTodos } from "@/app/actions";

// Mock data for initial todos
const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Write and submit the project proposal for the new client",
    completed: false,
    priority: "HIGH",
    dueDate: new Date(2024, 0, 10),
    createdAt: new Date(),
    updatedAt: new Date(),
    labels: [
      { id: "1", name: "Work", color: "#0ea5e9" },
      { id: "2", name: "Important", color: "#f43f5e" },
    ],
  },
  // Add more mock todos as needed
];

export default function Dashboard() {
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const fetchTodos = async () => {
    try {
      const res = await fetchAllTodos();
      console.log("Fetched todos", res.todos);
      setTodos(res.todos);
    } catch (error) {
      console.error(error);
      throw error;
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  const filteredTodos = todos.filter((todo) => {
    if (filterPriority === "all") return true;
    return todo.priority === filterPriority;
  });

  const handleCreateTodo = async (data: Partial<Todo>) => {
    const newTodo: Todo = {
      id: Math.random().toString(),
      title: data.title!,
      description: data.description,
      completed: false,
      priority: data.priority!,
      dueDate: data.dueDate,
      createdAt: new Date(),
      updatedAt: new Date(),
      labels: [],
    };
    setTodos((prev) => [...prev, newTodo]);
  };

  const handleEditTodo = async (id: string, data: Partial<Todo>) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              ...data,
              updatedAt: new Date(),
            }
          : todo
      )
    );
  };

  const handleDeleteTodo = async (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id
          ? {
              ...todo,
              completed,
              updatedAt: new Date(),
            }
          : todo
      )
    );
  };

  return (
    <ScrollArea className="h-auto w-screen py-10  rounded-md border p-4">
      <div className="space-y-8 space-x-2">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
            <p className="text-muted-foreground">
              Manage your todos and track your progress
            </p>
          </div>
          <CreateTodoDialog onCreateTodo={handleCreateTodo} />
        </div>

        <div className="flex items-center gap-4">
          <Select value={filterPriority} onValueChange={setFilterPriority}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by priority" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All Priorities</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="URGENT">Urgent</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {filteredTodos.map((todo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteTodo}
              onToggleComplete={handleToggleComplete}
              onEdit={setEditingTodo}
            />
          ))}
        </div>

        <EditTodoDialog
          todo={editingTodo}
          open={!!editingTodo}
          onOpenChange={(open) => !open && setEditingTodo(null)}
          onEditTodo={handleEditTodo}
        />
      </div>
    </ScrollArea>
  );
}
