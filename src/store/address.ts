import create from "zustand";
interface Address {
  address: string;
  setAddress: (address: string) => void;
}
export const useAddressStore = create<Address>((set) => ({
  address: "",
  setAddress: (address) => set({ address: address })
}));
