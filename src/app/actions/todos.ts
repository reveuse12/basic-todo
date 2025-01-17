import { getAuthToken } from "@/lib/helpers/authClient";
import { Subtask, Todo } from "@/types/todo";
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
    const res = await axios.patch(`/api/todos/${todo.id}`, todo, {
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

// add subtask to the todo
export const createSubtask = async (
  todoId: string,
  subtask: Partial<Subtask>
) => {
  try {
    const res = await axios.post(`/api/todos/${todoId}/subtask`, subtask, {
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

// update the subtask todo
export const updateSubtaskStatus = async (
  todoId: string,
  subtaskId: string,
  completed: boolean
) => {
  try {
    const res = await axios.patch(
      `/api/todos/${todoId}/subtask/${subtaskId}`,
      completed,
      {
        headers: {
          Authorization: `Bearer ${getAuthToken()}`,
        },
      }
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

// audio todo creation
export const audioTodoCreate = async (formData: FormData) => {
  try {
    const res = await axios.post(`/api/transcribe`, formData, {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
        "Content-Type": "multipart/form-data", // Set correct content type
      },
    });
    return res.data; // Ensure the backend returns the transcript
  } catch (error) {
    console.error("Error sending audio data:", error);
    throw error;
  }
};
