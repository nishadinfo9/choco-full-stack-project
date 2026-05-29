import Container from "@/app/(client)/_components/Container";
import { Skeleton } from "@/components/ui/skeleton";
import React from "react";

const ProductDetailsSkeleton = () => {
  return (
    <div className="h-screen w-full flex items-center">
      <Container>
        <div className="grid grid-cols-2 max-w-5xl mx-auto h-[85vh] ">
          <Skeleton className="aspect-square bg-amber-900/20" />
          <div className="flex mt-40 flex-col space-y-6">
            <Skeleton className=" mx-auto w-50 h-10 rounded-full bg-amber-900/20" />
            <Skeleton className=" mx-auto w-30 h-10 rounded-full bg-amber-900/20" />
            <Skeleton className=" mx-auto w-40 h-12 rounded-full bg-amber-900/20" />
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ProductDetailsSkeleton;
