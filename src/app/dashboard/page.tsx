import Dashboard from "@/components/dashboard";
import TodoApp from "@/components/todo-app";
import { PrismaClient } from "@prisma/client";

// Create a single instance of PrismaClient
const prisma = new PrismaClient();

// Mark the component as async to fetch data
async function Page() {
  // Fetch todos directly in the component
  const todos = await prisma.todo.findMany();

  return <Dashboard />;
}

export default Page;
