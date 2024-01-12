import { create } from "zustand";

interface Office {
  office: string;
  setOffice: (office: string) => void;
}
export const useOfficeStore = create<Office>((set) => ({
  office: "",
  setOffice: (office: string) => set({ office: office })
}));
