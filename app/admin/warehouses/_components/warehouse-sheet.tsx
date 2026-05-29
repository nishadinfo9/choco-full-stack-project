import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createWarehouse } from "@/http/api";
import { toast } from "sonner";
import { Warehouse } from "@/types/type";
import WarehouseForm from "../warehouse-form";
import { useNewWarehouse } from "@/store/warehouse/warehouse.store";

export function WarehouseSheet() {
  const queryClient = useQueryClient();

  const { isOpen, onClose } = useNewWarehouse();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-warehouse"],
    mutationFn: async (data: Warehouse) => createWarehouse(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["warehouses"],
      });
      toast("warehouse created successfully", { position: "bottom-right" });
      onClose();
    },
    onError: (err) => {
      console.log(err);
      toast("failed to create warehouses", { position: "bottom-right" });
    },
  });

  const onSubmit = (formValue: Warehouse) => {
    mutate(formValue);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl">Create Warehouse</SheetTitle>
          <WarehouseForm onSubmit={onSubmit} disabled={isPending} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
