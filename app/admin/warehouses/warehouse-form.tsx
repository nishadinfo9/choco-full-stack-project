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
import { WarehouseSchema } from "@/lib/validators/warehouseSchema";
import { Warehouse } from "@/types/type";

export type FormValue = z.input<typeof WarehouseSchema>;

const WarehouseForm = ({
  onSubmit,
  disabled,
}: {
  onSubmit: (formValue: Warehouse) => void;
  disabled: boolean;
}) => {
  const { handleSubmit, control } = useForm<z.infer<typeof WarehouseSchema>>({
    resolver: zodResolver(WarehouseSchema),
    defaultValues: {
      name: "",
      pincode: "",
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
          disabled={disabled}
        >
          {disabled ? <Loader2 className="size-4 animate-spin " /> : "Create"}
        </Button>
      </FieldGroup>
    </form>
  );
};

export default WarehouseForm;
