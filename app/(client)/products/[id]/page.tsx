"use client";

import { useQuery } from "@tanstack/react-query";
import ProductDetails from "./_components/ProductDetails";
import { Product } from "@/types/type";
import { getSingleProduct } from "@/http/api";
import { Loader2 } from "lucide-react";
import { useParams } from "next/navigation";

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


  if (isLoading)
    return (
      <div className="flex items-center justify-center">
        <Loader2 className="h-8 animate-spin" />
      </div>
    );

  // ❌ Error state (API failed / 404)
  if (isError || !product) {
    return (
      <div className="min-h-screen flex items-center justify-center text-[#2B1D16]">
        Product not found
      </div>
    );
  }
  return <ProductDetails product={product} />;
}
