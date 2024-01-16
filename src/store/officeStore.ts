import { create } from "zustand";

interface Office {
  regionId: string;
  office: { name: string; address: string; id: string };
  setRegionId: (regionId: string) => void;
  setOffice: (office: { name: string; address: string; id: string }) => void;
}
export const useOfficeStore = create<Office>((set) => ({
  regionId: "",
  office: { name: "", address: "", id: "" },
  setRegionId: (regionId: string) => set({ regionId: regionId }),
  setOffice: (office: { name: string; address: string; id: string }) => set({ office: office })
}));
