import { create } from "zustand";

interface ImodalStore {
  title: string;
  isModalOpen: boolean;
  modalContent: React.ReactNode | null;
  openModal: (content: React.ReactNode) => void;
  closeModal: () => void;
}

export const useModalStore = create<ImodalStore>((set) => ({
  isModalOpen: false,
  title: "",
  modalContent: null,
  openModal: (content) => set({ isModalOpen: true, modalContent: content }),
  closeModal: () => set({ isModalOpen: false, modalContent: null, title: "" })
}));
