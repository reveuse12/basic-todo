"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { Todo } from "@/types/todo";

// interface Label {
//   id: string;
//   color: string;
//   name: string;
// }

interface TodoItemProps {
  todo: Todo;
  onDelete: (id: string) => Promise<void>;
  onToggleComplete: (id: string, completed: boolean) => Promise<void>;
  onEdit: (todo: Todo) => void;
}

export function TodoItem({
  todo,
  onDelete,
  onToggleComplete,
  onEdit,
}: TodoItemProps) {
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    await onDelete(todo.id);
    setIsDeleting(false);
  };

  const priorityColors = {
    LOW: "bg-slate-500 text-white hover:text-slate-600 hover:bg-gray-200",
    MEDIUM: "bg-blue-500 text-white hover:text-blue-600 hover:bg-gray-200",
    HIGH: "bg-yellow-500 text-white hover:text-yellow-600 hover:bg-gray-200",
    URGENT: "bg-red-500 text-white hover:text-red-600 hover:bg-gray-200",
  };

  return (
    <Card className={cn("transition-opacity", todo.completed && "opacity-60")}>
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between space-x-4">
          <div className="flex items-start space-x-4">
            <Checkbox
              checked={todo.completed}
              onCheckedChange={(checked) => {
                onToggleComplete(todo.id, checked as boolean);
              }}
            />
            <div>
              <CardTitle className={cn(todo.completed && "line-through")}>
                {todo.title}
              </CardTitle>
              {todo.description && (
                <CardDescription className="mt-2">
                  {todo.description}
                </CardDescription>
              )}
            </div>
          </div>
          <div className="flex gap-2">
            <Button variant="ghost" size="icon" onClick={() => onEdit(todo)}>
              <Pencil className="h-4 w-4" />
            </Button>
            <Button
              variant="ghost"
              size="icon"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2">
          <Badge
            variant="secondary"
            className={
              priorityColors[todo.priority as keyof typeof priorityColors]
            }
          >
            {todo.priority}
          </Badge>
          {/* TODO to implement labels */}
          {/* {todo.labels.map(
        (label: { id: string; color: string; name: string }) => (
          <Badge
        key={label.id}
        style={{ backgroundColor: label.color }}
        className="text-white"
          >
        {label.name}
          </Badge>
        )
          )} */}
        </div>
        {todo.subtasks && todo.subtasks.length > 0 && (
          <div className="mt-4">
            <h4 className="text-sm font-medium">Subtasks</h4>
            <ul className="list-disc pl-5 space-y-1">
              {todo.subtasks.map((subtask) => (
                <li
                  key={subtask.id}
                  className={cn(
                    "flex items-center space-x-2",
                    subtask.completed && "line-through text-gray-500"
                  )}
                >
                  <Checkbox
                    checked={subtask.completed}
                    onCheckedChange={() => {
                      // Handle subtask completion toggle
                    }}
                  />
                  <span>{subtask.title}</span>
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
      {todo.dueDate && (
        <CardFooter className="text-sm text-muted-foreground">
          Due: {format(todo.dueDate, "PPP")}
        </CardFooter>
      )}
    </Card>
  );
}
