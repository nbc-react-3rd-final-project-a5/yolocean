import { create } from "zustand";

interface ImodalStore {
  title: string;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  openModal: (title: string, content: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ImodalStore>((set) => ({
  isModalOpen: false,
  title: "",
  modalContent: null,
  openModal: (title, content) => set({ isModalOpen: true, title, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null, title: "" })
}));
