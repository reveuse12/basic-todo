import { getAuthToken } from "@/lib/helpers/authClient";
import { Todo } from "@/types/todo";
import axios from "axios";

export const fetchAllTodos = async () => {
  try {
    const res = await axios.get("/api/todos", {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// create todo
export const createTodo = async (todo: Todo) => {
  try {
    const res = await axios.post("/api/todos", todo, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// update todo
export const updateTodo = async (todo: Todo) => {
  try {
    const res = await axios.put(`/api/todos/${todo.id}`, todo, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// delete todo
export const deleteTodo = async (id: string) => {
  try {
    const res = await axios.delete(`/api/todos/${id}`, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
