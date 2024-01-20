import { create } from "zustand";

interface Auth {
  auth: string;
  setAuth: (Auth: string) => void;
}
export const useAuthStore = create<Auth>((set) => ({
  auth: "",
  setAuth: (auth: string) => set({ auth: auth })
}));
