import { create } from "zustand";

type DeliveryPersonState = {
  isOpen: boolean;
  onOpen: () => void;
  onClose: () => void;
};

export const useNewDeliveryPerson = create<DeliveryPersonState>((set) => {
  return {
    isOpen: false,
    onOpen: () => set({ isOpen: true }),
    onClose: () => set({ isOpen: false }),
  };
});
