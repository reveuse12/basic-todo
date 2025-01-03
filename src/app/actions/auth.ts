import { User } from "@prisma/client";
import axios from "axios";
export const signin = () => {
  console.log("signin");
};

export const signout = () => {
  console.log("signout");
};

export const signup = async (
  formData: Omit<User, "id" | "createdAt" | "updatedAt">
) => {
  try {
    const res = await axios.post("/api/auth/signup", formData);
    return res.data;
  } catch (error) {
    console.log("error", error);
    throw error;
  }
};
