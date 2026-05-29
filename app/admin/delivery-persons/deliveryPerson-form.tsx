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
import { DeliveryPerson, Warehouse } from "@/types/type";
import { useQuery } from "@tanstack/react-query";
import { getWarehouses } from "@/http/api";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

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

  const { data: warehouses, isLoading } = useQuery<Warehouse[]>({
    queryKey: ["warehouses"],
    queryFn: () => getWarehouses(),
  });

  const submitHandler = (values: FormValue) => {
    console.log("values", values);
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

              <Select
                onValueChange={(value) => field.onChange(parseInt(value))}
                defaultValue={field.value ? field.value.toString() : ""}
              >
                <SelectTrigger className="w-[180px]">
                  <SelectValue placeholder="Warehouse ID" />
                </SelectTrigger>
                <SelectContent>
                  {isLoading ? (
                    <SelectItem value="Loading">Loading...</SelectItem>
                  ) : (
                    <>
                      {warehouses &&
                        warehouses.map((item) => (
                          <SelectItem
                            key={item.id}
                            value={item.id ? item.id?.toString() : ""}
                          >
                            {item.name}
                          </SelectItem>
                        ))}
                    </>
                  )}
                </SelectContent>
              </Select>

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
