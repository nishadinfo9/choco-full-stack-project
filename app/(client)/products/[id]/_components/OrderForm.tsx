"use client";

import z from "zod";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderSchema } from "@/lib/validators/OrderSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Order } from "@/types/type";
import { Loader2 } from "lucide-react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";

export default function OrderForm({id}: {id: string}) {
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-orders"],
    mutationFn: () => createOrder(),

    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["orders"],
      });
      toast("order created successfully", {
        position: "bottom-right",
      });
    },

    onError: () => {
      toast("failed to create order", { position: "bottom-right" });
    },
  });

  const { handleSubmit, control } = useForm<z.infer<typeof OrderSchema>>({
    resolver: zodResolver(OrderSchema),
    defaultValues: {
      pincode: "",
      qty: 1,
      address: "",
      productId: Number(id)
    },
  });

  const submitHandler = (data: Order) => {
      console.log("Order Data:", data);
      mutate(data)
  };

  return (
    <form id="form-rhf-demo" onSubmit={handleSubmit(submitHandler)}>
      <FieldGroup >
        {/* PINCODE */}
        <Controller
          name="pincode"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Pincode</FieldLabel>
              <Input
                {...field}
                type="number"
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="e.g. 458136"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* QTY */}
        <Controller
          name="qty"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">QTY</FieldLabel>
              <Input
                {...field}
                type="number"
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
                onChange={(e) => {
                  const value = parseFloat(e.target.value);
                  field.onChange(value);
                }}
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        {/* ADDRESS */}
        <Controller
          name="address"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Address</FieldLabel>
             
              <Textarea
              {...field}
              id="textarea-invalid"
              aria-invalid={fieldState.invalid}
              placeholder="e.g. Address"
              autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />
        <Button
          size={"lg"}
          type="submit"
          form="form-rhf-demo"
          disabled={isPending}
        >
          {isPending ? (
            <Loader2 className="size-4 animate-spin " />
          ) : (
            "Buy Now"
          )}
        </Button>
      </FieldGroup>
    </form>
  );
}
