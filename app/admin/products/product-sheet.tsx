import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";
import ProductForm, { FormValue } from "./product-form";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createProduct } from "@/http/api";
import { toast } from "sonner";
import { useNewProduct } from "@/store/product/product.store";

export function ProductSheet() {
  const queryClient = useQueryClient();

  const { isOpen, onClose } = useNewProduct();

  const { mutate } = useMutation({
    mutationKey: ["create-product"],
    mutationFn: async (data: FormData) => createProduct(data),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["products"],
      });
      toast("product created successfully", { position: "bottom-right" });
      onClose();
    },
    onError: (err) => {
      console.log(err);
      toast("failed to create product", { position: "bottom-right" });
    },
  });

  const onSubmit = (formValue: FormValue) => {
    const formData = new FormData();
    formData.append("name", formValue.name);
    formData.append("description", formValue.description);
    formData.append("price", String(formValue.price));
    formData.append("image", formValue.image[0] as FileList[0]);
    mutate(formData);
  };

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="text-2xl">Create Product</SheetTitle>
          <ProductForm onSubmit={onSubmit} />
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
