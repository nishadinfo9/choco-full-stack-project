import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createInventory } from "@/http/api";
import { toast } from "sonner";
import { Inventory } from "@/types/type";
import InventoryForm from "./inventory-form";
import { useNewInventory } from "@/store/inventory/inventory.store";

export function InventorySheet() {
  const queryClient = useQueryClient();
  const { isOpen, onClose } = useNewInventory();

  const { mutate, isPending, error } = useMutation({
    mutationKey: ["create-inventory"],
    mutationFn: async (data: Inventory) => createInventory(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["inventories"],
      });
      toast("inventory created successfully", {
        position: "bottom-right",
      });
      onClose();
    },
    onError: (err) => {
      console.log(err);
      toast("failed to create inventory", { position: "bottom-right" });
    },
  });
  console.log("error", error);

  const onSubmit = (formValue: Inventory) => {
    mutate(formValue);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl">Create Inventory</SheetTitle>
          <InventoryForm onSubmit={onSubmit} disabled={isPending} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
