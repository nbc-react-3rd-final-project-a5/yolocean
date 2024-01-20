import { create } from "zustand";

type alertType = "error" | "success";

interface IalertStore {
  message: string | null;
  type: alertType;
  alertFire: (message: string | null, type: alertType) => void;
}

export const usealertStore = create<IalertStore>((set) => ({
  message: null,
  type: "success",
  alertFire: (message: string | null, type: alertType) => set({ message, type })
}));
