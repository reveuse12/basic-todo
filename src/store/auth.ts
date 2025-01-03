import { User } from "@prisma/client";
import { create } from "zustand";
import { devtools, persist } from "zustand/middleware";

// Define the state interface
interface AuthState {
  user: User | null;
  token: string | null;
  refreshToken: string | null;
  login: (user: User, token: string, refreshToken: string) => void;
  logout: () => void;
}

// Create the store
const authStore = create<AuthState>()(
  devtools(
    persist(
      (set) => ({
        user: null,
        token: null,
        refreshToken: null,
        login: (user: User, token: string, refreshToken: string) => {
          set({ user, token, refreshToken });
        },
        logout: () => {
          set({ user: null, token: null, refreshToken: null });
        },
      }),
      {
        name: "auth-storage",
        // Optionally specify which parts of the state to persist
        partialize: (state) => ({
          user: state.user,
          token: state.token,
          refreshToken: state.refreshToken,
        }),
      }
    )
  )
);

export { authStore };
