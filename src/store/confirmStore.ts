import { create } from "zustand";

interface Store {
  isConfirmOpen: boolean;
  title: string | null;
  question: string | null;
  resolve: ((value: boolean) => void) | null;
}

export const confirmStore = create<Store>((set) => ({
  isConfirmOpen: false,
  title: null,
  question: null,
  resolve: null
}));

export const openConfirm = (title: string, question: string): Promise<boolean> => {
  return new Promise<boolean>((resolve) => {
    confirmStore.setState({
      isConfirmOpen: true,
      title,
      question,
      resolve
    });
  });
};

export const closeConfirm = (answer: boolean): void => {
  const { resolve } = confirmStore.getState();
  if (resolve) {
    resolve(answer);
  }
  confirmStore.setState({
    isConfirmOpen: false,
    title: null,
    question: null,
    resolve: null
  });
};
