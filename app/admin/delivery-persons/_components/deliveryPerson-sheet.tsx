import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDeliveryPerson } from "@/http/api";
import { toast } from "sonner";
import { DeliveryPerson } from "@/types/type";
import DeliveryPersonForm from "./deliveryPerson-form";
import { useNewDeliveryPerson } from "@/store/delivery-person/delivery-person.store";

export function DeliveryPersonSheet() {
  const queryClient = useQueryClient();

  const { isOpen, onClose } = useNewDeliveryPerson();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-deliveryPerson"],
    mutationFn: async (data: DeliveryPerson) => createDeliveryPerson(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["delivery-persons"],
      });
      toast("deliveryPerson created successfully", {
        position: "bottom-right",
      });
      onClose();
    },
    onError: (err) => {
      console.log(err);
      toast("failed to create deliveryPerson", { position: "bottom-right" });
    },
  });

  const onSubmit = (formValue: DeliveryPerson) => {
    mutate(formValue);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl">Create Delivery Person</SheetTitle>
          <DeliveryPersonForm onSubmit={onSubmit} disabled={isPending} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
