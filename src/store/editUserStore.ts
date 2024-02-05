import { create } from "zustand";

interface EditMode {
  isEditMode: boolean;
  imageURL: string;
  setIsEditMode: (state: boolean) => void;
  setImageURL: (state: string) => void;
}

const useUserEditModeStore = create<EditMode>((set) => ({
  isEditMode: false,
  imageURL: "",
  setIsEditMode: (state) => set({ isEditMode: state }),
  setImageURL: (state) => set({ imageURL: state })
}));

export default useUserEditModeStore;
