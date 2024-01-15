import { create } from "zustand";

interface EditMode {
  isEditMode: boolean;
  setIsEditMode: (state: boolean) => void;
}

const useUserEditModeStore = create<EditMode>((set) => ({
  isEditMode: false,
  setIsEditMode: (state) => set({ isEditMode: state })
}));

export default useUserEditModeStore;
