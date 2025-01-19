import { getAuthToken } from "@/lib/helpers/authClient";
import axios from "axios";

export const fetchProfile = async () => {
  try {
    const res = await axios.get("/api/users/me", {
      headers: {
        Authorization: `Bearer ${getAuthToken()}`,
      },
    });
    return res.data.user;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
