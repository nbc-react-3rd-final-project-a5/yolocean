import { create } from "zustand";

interface Office {
  office: { name: string; address: string };
  setOffice: (office: { name: string; address: string }) => void;
}
export const useOfficeStore = create<Office>((set) => ({
  office: { name: "", address: "" },
  setOffice: (office: { name: string; address: string }) => set({ office: office })
}));
