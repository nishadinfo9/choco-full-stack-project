import { create } from "zustand";

type WarehouseState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewWarehouse = create<WarehouseState>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
});
