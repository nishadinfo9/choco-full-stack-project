"use client";

import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/type";
import { getSingleProduct } from "@/http/api";
import { useParams } from "next/navigation";
import ProductDetailsSkeleton from "./_components/ProductDetailsSkeleton";
import Container from "@/app/(client)/_components/Container";
import Image from "next/image";
import {  CardContent } from "@/components/ui/card";
import OrderForm from "./_components/OrderForm";
import { Separator } from "@/components/ui/separator";

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

  if (isLoading) return <ProductDetailsSkeleton />;


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
                    ${product.price}
                  </p>
                </div>

                <Separator />

                {/* MIDDLE - FORM */}
                <div className="w-full">
                  <OrderForm id={params.id} />
                </div>
              </CardContent>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
