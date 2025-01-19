import { getAuthToken } from "@/lib/helpers/authClient";
import axios from "axios";
import { User } from "@/types/user";

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

export const updateProfile = async (UserData: Partial<User>) => {
  try {
    const res = await axios.patch(`/api/users/me`, UserData, {
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
