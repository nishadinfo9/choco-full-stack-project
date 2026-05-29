"use client";

import { Product } from "@/types/type";
import Container from "./Container";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getLetestProducts } from "@/http/api";
import SpecialProductSkeleton from "./SpecialProductSkeleton";

export default function SpecialProducts() {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["products", 'letest'],
    queryFn: () => getLetestProducts({ limit: 3 }),
  });

  return (
    <section className="py-24 bg-white">
      <Container>
        <div className="mb-10 text-center">
          <h2 className="flex items-center justify-center gap-5 text-3xl font-semibold text-[#2B1D16]">
            Chocolates
          </h2>

          <p className="text-[#2B1D16]/60 mt-2">
            Crafted for special moments and premium taste
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {isLoading &&
            Array.from({ length: 3}).map((_, i) => (
              <SpecialProductSkeleton key={i} />
            ))}

          {products?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
