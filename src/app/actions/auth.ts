import { User } from "@prisma/client";
import axios from "axios";

export const signin = async (
  formData: Omit<User, "id" | "createdAt" | "updatedAt" | "name">
) => {
  try {
    const res = await axios.post("/api/auth/signin", formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};

export const signout = () => {
  try {
    return axios.get("/api/auth/signout");
  } catch (error) {
    throw error;
  }
};

export const signup = async (
  formData: Omit<User, "id" | "createdAt" | "updatedAt">
) => {
  try {
    const res = await axios.post("/api/auth/signup", formData);
    return res.data;
  } catch (error) {
    throw error;
  }
};
