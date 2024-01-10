import { create } from "zustand";

type TalertType = "error" | "success";

interface IalertStore {
  message: string | null;
  type: TalertType;
  alertFire: (message: string | null, type: TalertType) => void;
}

export const usealertStore = create<IalertStore>((set) => ({
  message: null,
  type: "success",
  alertFire: (message: string | null, type: TalertType) => set({ message, type })
}));
