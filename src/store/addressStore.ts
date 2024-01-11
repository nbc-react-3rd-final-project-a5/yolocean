import create from "zustand";
interface Address {
  address: string;
  setAddress: (address: string) => void;
  initAddress: () => void;
}
export const useAddressStore = create<Address>((set) => ({
  address: "",
  setAddress: (address) => set({ address: address }),
  initAddress: () => set({ address: "" })
}));
