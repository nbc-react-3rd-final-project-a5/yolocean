import { create } from "zustand";

interface Office {
  regionId: string;
  office: { name: string; address: string };
  setRegionId: (regionId: string) => void;
  setOffice: (office: { name: string; address: string }) => void;
}
export const useOfficeStore = create<Office>((set) => ({
  regionId: "",
  office: { name: "", address: "" },
  setRegionId: (regionId: string) => set({ regionId: regionId }),
  setOffice: (office: { name: string; address: string }) => set({ office: office })
}));
