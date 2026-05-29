import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Controller, useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Loader2 } from "lucide-react";
import { deliveryPersonSchema } from "@/lib/validators/DeliveryPersonSchema";
import { DeliveryPerson } from "@/types/type";

export type FormValue = z.input<typeof deliveryPersonSchema>;

const DeliveryPersonForm = ({
  onSubmit,
  disabled,
}: {
  onSubmit: (formValue: DeliveryPerson) => void;
  disabled: boolean;
}) => {
  const { handleSubmit, control } = useForm<
    z.infer<typeof deliveryPersonSchema>
  >({
    resolver: zodResolver(deliveryPersonSchema),
    defaultValues: {
      name: "",
      phone: "880",
      warehouseId: 0,
    },
  });

  const submitHandler = (values: FormValue) => {
    onSubmit(values);
  };
  return (
    <form id="form-rhf-demo" onSubmit={handleSubmit(submitHandler)}>
      <FieldGroup className="">
        <Controller
          name="name"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Name</FieldLabel>
              <Input
                {...field}
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                placeholder="Name"
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="phone"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">Phone</FieldLabel>
              <Input
                {...field}
                type="number"
                id="form-rhf-demo-title"
                aria-invalid={fieldState.invalid}
                autoComplete="off"
              />
              {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
            </Field>
          )}
        />

        <Controller
          name="warehouseId"
          control={control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="form-rhf-demo-title">
                Warehouse Id
              </FieldLabel>
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

        <Button
          size={"lg"}
          type="submit"
          form="form-rhf-demo"
          disabled={disabled}
        >
          {disabled ? <Loader2 className="size-4 animate-spin " /> : "Create"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default DeliveryPersonForm;
