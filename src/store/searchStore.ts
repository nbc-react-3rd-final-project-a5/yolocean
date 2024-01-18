import { create } from "zustand";

interface Search {
  searchWord: string;
  hasSearchWord: boolean;
  setSearchWord: (searchWord: string) => void;
  setHasSearchWord: (state: boolean) => void;
}

export const useSearchStore = create<Search>((set) => ({
  searchWord: "",
  hasSearchWord: false,
  setSearchWord: (searchWord: string) => set({ searchWord: searchWord }),
  setHasSearchWord: (state: boolean) => set({ hasSearchWord: state })
}));
