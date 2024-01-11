import { create } from "zustand";

interface LogedIn {
  logedIn: boolean;
  setLogedIn: (state: boolean) => void;
}

const useLogedInStore = create<LogedIn>((set) => ({
  logedIn: false,
  setLogedIn: (state) => set({ logedIn: state })
}));

export default useLogedInStore;
