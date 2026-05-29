"use client";

import { Product } from "@/types/type";
import Container from "./Container";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/http/api";
import ProductCardSkeleton from "./ProductCardSkeleton";
import Link from "next/link";

export default function Products() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn:()=> getProducts(),
    staleTime: 10 * 1000,
  });


  return (
    <section className="py-24 bg-[#FAF7F2]">
      <Container>
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-semibold text-[#2B1D16]">
              Chocolates
            </h2>
            <p className="text-[#2B1D16]/60 mt-2">
              Explore our handcrafted chocolate collection
            </p>
          </div>

          <Link href={'/products'} className="text-sm text-[#6B3E2E] hover:underline">
            View more →
          </Link>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
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
      </Container>
    </section>
  );
}
