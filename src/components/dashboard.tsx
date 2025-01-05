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
import {
  createTodo,
  deleteTodo,
  fetchAllTodos,
  updateTodo,
} from "@/app/actions";
import { useToast } from "@/hooks/use-toast";
import { Todo } from "@/types/todo";

// Mock data for initial todos
const initialTodos: Todo[] = [
  {
    id: "1",
    title: "Complete project proposal",
    description: "Write and submit the project proposal for the new client",
    completed: false,
    priority: "HIGH",
    status: "NOTSTARTED",
    dueDate: new Date(2024, 0, 10),
    createdAt: new Date(),
    updatedAt: new Date(),
  },
  // Add more mock todos as needed
];

export default function Dashboard() {
  const { toast } = useToast();
  const [todos, setTodos] = useState<Todo[]>(initialTodos);
  const [editingTodo, setEditingTodo] = useState<Todo | null>(null);
  const [filterPriority, setFilterPriority] = useState<string>("all");
  const [filterStatus, setFilterStatus] = useState<string>("all");
  // const [subtask, setSubtask] = useState<Todo>();

  const fetchTodos = async () => {
    try {
      const res = await fetchAllTodos();
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
    const priorityMatch =
      filterPriority === "all" || todo.priority === filterPriority;
    const statusMatch = filterStatus === "all" || todo.status === filterStatus;
    return priorityMatch && statusMatch;
  });

  const handleCreateTodo = async (data: Partial<Todo>) => {
    const newTodo: Todo = {
      id: Math.random().toString(),
      title: data.title!,
      description: data.description!,
      completed: false,
      status: data.status!,
      priority: data.priority!,
      dueDate: data.dueDate!,
      createdAt: new Date(),
      updatedAt: new Date(),
    };

    try {
      const res = await createTodo(newTodo);
      setTodos((prev) => [...prev, newTodo]);
      toast({ title: res.message });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    }
  };

  const handleEditTodo = async (id: string, data: Partial<Todo>) => {
    try {
      const updatedTodo = { ...data, id } as Todo;
      const res = await updateTodo(updatedTodo);
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
      toast({ title: res.message });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    }
  };

  const handleToggleComplete = async (id: string, completed: boolean) => {
    const updatedTodo = todos.find((todo) => todo.id === id);
    if (!updatedTodo) return;

    const newTodo = {
      ...updatedTodo,
      status: "DONE" as "NOTSTARTED" | "INPROGRESS" | "DONE",
      completed,
      updatedAt: new Date(),
    };

    setTodos((prev) => prev.map((todo) => (todo.id === id ? newTodo : todo)));

    try {
      const res = await updateTodo(newTodo);
      toast({ title: res.message });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    }
  };

  const handleDeleteTodo = async (id: string) => {
    try {
      const res = await deleteTodo(id);
      toast({ title: res.message });
      setTodos((prev) => prev.filter((todo) => todo.id !== id));
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "An error occurred. Please try again.",
      });
    }
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

          <Select value={filterStatus} onValueChange={setFilterStatus}>
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Filter by status" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">All status</SelectItem>
              <SelectItem value="NOTSTARTED">NOTSTARTED</SelectItem>
              <SelectItem value="INPROGESS">INPROGESS</SelectItem>
              <SelectItem value="DONE">DONE</SelectItem>
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
