"use client";

import { Product } from "@/types/type";
import Container from "./Container";
import ProductCard from "./ProductCard";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/http/api";

// const products :Product[] = [
//   {
//     id: 1,
//     name: "Milk Chocolate Classic",
//     image: "https://images.unsplash.com/photo-1511381939415-e44015466834",
//     price: 8,
//   },
//   {
//     id: 2,
//     name: "Dark 70% Cocoa",
//     image: "https://images.unsplash.com/photo-1612203985729-70726954388c",
//     price: 9,
//   },
//   {
//     id: 3,
//     name: "Caramel Crunch Bar",
//     image: "https://images.unsplash.com/photo-1551024506-0bccd828d307",
//     price: 11,
//   },
//   {
//     id: 4,
//     name: "Sea Salt Cocoa",
//     image: "https://images.unsplash.com/photo-1717239318589-2a2ea6c3401c",
//     price: 10,
//   },
// ];

export default function Products() {
  const { data: products, isLoading } = useQuery({
    queryKey: ["products"],
    queryFn: getProducts,
    staleTime: 10 * 1000,
  });

  return (
    <section className="py-24 bg-[#FAF7F2]">
      <Container>
        {/* Header */}
        <div className="flex justify-between items-end mb-10">
          <div>
            <h2 className="text-3xl font-semibold text-[#2B1D16]">
              All Products
            </h2>
            <p className="text-[#2B1D16]/60 mt-2">
              Explore our handcrafted chocolate collection
            </p>
          </div>

          <button className="text-sm text-[#6B3E2E] hover:underline">
            View more →
          </button>
        </div>

        {/* Grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products && products?.map((product: Product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </Container>
    </section>
  );
}
