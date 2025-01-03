"use client";
import Dashboard from "@/components/dashboard";
// import TodoApp from "@/components/todo-app";
import { authStore } from "@/store";
// import { PrismaClient } from "@prisma/client";

// Create a single instance of PrismaClient
// const prisma = new PrismaClient();

// Mark the component as async to fetch data
function Page() {
  // Fetch todos directly in the component
  // const todos = await prisma.todo.findMany();
  const { user, token } = authStore();
  console.log("user", user, "token", token);

  return <Dashboard />;
}

export default Page;
