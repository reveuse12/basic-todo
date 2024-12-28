import TodoApp from "@/components/todo-app";
import { PrismaClient } from "@prisma/client";

// Create a single instance of PrismaClient
const prisma = new PrismaClient();

// Mark the component as async to fetch data
async function Page() {
  // Fetch todos directly in the component
  const todos = await prisma.todo.findMany();

  return (
    <div className="min-w-full h-full flex items-center justify-center">
      <TodoApp todo={todos ? todos : null} />
    </div>
  );
}

export default Page;
