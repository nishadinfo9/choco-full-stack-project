"use client";

import { Product } from "@/types/type";
import Container from "@/app/(client)/_components/Container";
import Image from "next/image";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

export default function ProductDetails({ product }: { product: Product }) {
  return (
    <section className="h-screen flex items-center">
      <Container>

        <div className="max-w-5xl mx-auto h-[85vh] flex items-center justify-center">

          <Card className="w-full h-full overflow-hidden border-[#E7D7C9] shadow-sm rounded-2xl">
            
            <div className="grid grid-cols-2 h-full">

              {/* IMAGE */}
              <div className="h-full bg-[#F3E9E1]">
                <Image
                  src={`/assets/${product.image}` || '/product1.jpg'}
                  alt={product.name}
                  width={900}
                  height={900}
                  className="w-full h-full object-cover"
                  priority
                />
              </div>

              {/* CONTENT */}
              <CardContent className="flex flex-col items-center justify-center text-center space-y-6">

                {/* TITLE */}
                <h1 className="text-3xl font-semibold text-[#2B1D16]">
                  {product.name}
                </h1>

                {/* PRICE */}
                <p className="text-2xl font-medium text-[#6B3E2E]">
                  ${product.price}
                </p>

                {/* BUTTON */}
                <Button
                  className="px-8 py-6 rounded-full bg-[#6B3E2E] hover:bg-[#5a3326] text-white"
                >
                  Add to Cart
                </Button>

              </CardContent>

            </div>

          </Card>

        </div>

      </Container>
    </section>
  );
}