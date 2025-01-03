import { getAuthToken } from "@/lib/helpers/authClient";
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
