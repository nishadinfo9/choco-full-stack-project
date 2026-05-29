"use client";

import { useQuery } from "@tanstack/react-query";
import { Product } from "@/types/type";
import ProductCard from "../../_components/ProductCard";
import { getProducts } from "@/http/api";
import ProductCardSkeleton from "../../_components/ProductCardSkeleton";

export default function ProductsClient() {
  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  if (isError) {
    <div className="min-h-screen flex items-center justify-center text-[#2B1D16]">
      Failed to load products
    </div>;
  }

  return (
    <section className="min-h-screen bg-[#FAF7F2] py-16">
      <div className="max-w-6xl mx-auto px-4">
        {/* HEADER */}
        <div className="mb-10">
          <h1 className="text-3xl font-semibold text-[#2B1D16]">
            Chocolates
          </h1>
          <p className="text-[#2B1D16]/60 mt-2">
            Handcrafted premium chocolate collection
          </p>
        </div>

        {/* GRID */}
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {isLoading &&
            Array.from({ length: 8 }).map((_, i) => (
              <ProductCardSkeleton key={i} />
            ))}

          {/* Data */}
          {!isLoading &&
            products?.map((product: Product) => (
              <ProductCard key={product.id} product={product} />
            ))}
        </div>
      </div>
    </section>
  );
}
