import { create } from "zustand";

type ProductState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewProduct = create<ProductState>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
});
