"use client";

import z from "zod";
import Image from "next/image";
import { useQuery } from "@tanstack/react-query";
import { getSingleProduct } from "@/http/api";
import { useParams } from "next/navigation";
const ProductDetailsSkeleton = dynamic(()=> import('./_components/ProductDetailsSkeleton',))
import Container from "@/app/(client)/_components/Container";
import { CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { OrderSchema } from "@/lib/validators/OrderSchema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Order, Product } from "@/types/type";
import { Loader2 } from "lucide-react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";
import { Textarea } from "@/components/ui/textarea";
import { useSession } from "next-auth/react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useMemo } from "react";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import dynamic from "next/dynamic";

export default function SingleProduct() {
  const params = useParams<{ id: string }>();

  const {
    data: product,
    isError,
    isLoading,
  } = useQuery<Product>({
    queryKey: ["single-product", params.id],
    queryFn: () => getSingleProduct(params.id),
  });

  const queryClient = useQueryClient();
  const { data: session } = useSession();
  const pathname = usePathname();

  const { mutate, isPending } = useMutation({
    mutationKey: ["create-orders"],
   

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

  const { handleSubmit, control, watch } = useForm<z.infer<typeof OrderSchema>>(
    {
      resolver: zodResolver(OrderSchema),
      defaultValues: {
        pincode: "",
        qty: 1,
        address: "",
        productId: Number(params.id),
      },
    },
  );

  const submitHandler = (data: Order) => {
    console.log("Order Data:", data);
    mutate(data);
  };

  const qty = watch("qty");
  const price = useMemo(() => {
    if (product?.price) {
      return product.price * qty;
    }
    return 0;
  }, [qty, product?.price]);

  if (isLoading || !product) return <ProductDetailsSkeleton />;

  if (isError) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#2B1D16]">
        Product not found
      </div>
    );
  }
  return (
    <section className="flex items-center">
      <Container>
        <div className="max-w-5xl mx-auto m-5 flex items-center justify-center">
          <div className="w-full h-full overflow-hidden rounded-2xl">
            <div className="grid grid-cols-1 md:grid-cols-2 h-full">
              {/* IMAGE */}
              <div className="h-full bg-[#F3E9E1]">
                <Image
                  src={`/assets/${product.image}` || "/product1.jpg"}
                  alt={product.name}
                  width={900}
                  height={900}
                  className="min-w-full md:h-[85vh] object-cover"
                  priority
                />
              </div>

              {/* CONTENT */}
              <CardContent className="h-full flex flex-col justify-between p-10 space-y-6 text-left">
                {/* TOP SECTION */}
                <div className="space-y-3">
                  <h1 className="text-2xl font-semibold text-[#2B1D16]">
                    {product.name}
                  </h1>

                  <p className="text-2xl font-medium text-[#6B3E2E]">
                    ${price || product.price}
                  </p>
                </div>

                <Separator />

                {/* MIDDLE - FORM */}
                <div className="w-full">
                  <form
                    id="form-rhf-demo"
                    onSubmit={handleSubmit(submitHandler)}
                  >
                    <FieldGroup>
                      {/* PINCODE */}
                      <Controller
                        name="pincode"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-title">
                              Pincode
                            </FieldLabel>
                            <Input
                              {...field}
                              type="number"
                              id="form-rhf-demo-title"
                              aria-invalid={fieldState.invalid}
                              placeholder="e.g. 458136"
                              autoComplete="off"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      {/* QTY */}
                      <Controller
                        name="qty"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-title">
                              QTY
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
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />

                      {/* ADDRESS */}
                      <Controller
                        name="address"
                        control={control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-title">
                              Address
                            </FieldLabel>

                            <Textarea
                              {...field}
                              id="textarea-invalid"
                              aria-invalid={fieldState.invalid}
                              placeholder="e.g. Address"
                              autoComplete="off"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error]} />
                            )}
                          </Field>
                        )}
                      />
                      {session?.user ? (
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
                      ) : (
                        <Link href={`/api/auth/signin?callbackUrl=${pathname}`}>
                          <Button className="w-full" size={"lg"}>
                            Buy Now
                          </Button>
                        </Link>
                      )}
                    </FieldGroup>
                  </form>
                </div>
              </CardContent>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
