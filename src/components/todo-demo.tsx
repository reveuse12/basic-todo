"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Sparkles, Plus } from "lucide-react";

type Todo = {
  id: number;
  text: string;
  completed: boolean;
  aiEnhanced?: string;
};

export function TodoDemo() {
  const [todos, setTodos] = useState<Todo[]>([
    {
      id: 1,
      text: "Create presentation for meeting",
      completed: false,
      aiEnhanced:
        "Estimated time: 45 minutes. Best done in the morning for optimal creativity.",
    },
    {
      id: 2,
      text: "Review quarterly reports",
      completed: false,
      aiEnhanced:
        "Consider breaking this into smaller tasks. Suggested deadline: EOD.",
    },
  ]);
  const [newTodo, setNewTodo] = useState("");

  const addTodo = () => {
    if (newTodo.trim()) {
      setTodos([
        ...todos,
        {
          id: Date.now(),
          text: newTodo,
          completed: false,
          aiEnhanced: "AI analyzing your task...",
        },
      ]);
      setNewTodo("");
    }
  };

  return (
    <section className="w-full py-12 md:py-24 lg:py-32">
      <div className="container px-4 md:px-6">
        <div className="mx-auto max-w-2xl">
          <Card className="border-2">
            <CardHeader>
              <CardTitle className="text-2xl font-bold">Try it out</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex space-x-2">
                  <Input
                    placeholder="Add a new task..."
                    value={newTodo}
                    onChange={(e) => setNewTodo(e.target.value)}
                    onKeyPress={(e) => e.key === "Enter" && addTodo()}
                    className="flex-1"
                  />
                  <Button onClick={addTodo}>
                    <Plus className="h-4 w-4" />
                  </Button>
                </div>
                <div className="space-y-4">
                  {todos.map((todo) => (
                    <div
                      key={todo.id}
                      className="flex items-start space-x-4 rounded-lg border p-4"
                    >
                      <Checkbox
                        checked={todo.completed}
                        onCheckedChange={() =>
                          setTodos(
                            todos.map((t) =>
                              t.id === todo.id
                                ? { ...t, completed: !t.completed }
                                : t
                            )
                          )
                        }
                      />
                      <div className="flex-1 space-y-1">
                        <p className={todo.completed ? "line-through" : ""}>
                          {todo.text}
                        </p>
                        {todo.aiEnhanced && (
                          <p className="text-sm text-muted-foreground flex items-center">
                            <Sparkles className="h-3 w-3 mr-1" />
                            {todo.aiEnhanced}
                          </p>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  );
}
