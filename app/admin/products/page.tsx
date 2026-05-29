"use client";

import { Button } from "@/components/ui/button";
import { columns } from "./_components/our-colums";
import { useQuery } from "@tanstack/react-query";
import { getProducts } from "@/http/api";
import { Product } from "@/types/type";
import { ProductSheet } from "./_components/product-sheet";
import { useNewProduct } from "@/store/product/product.store";
import { Loader2 } from "lucide-react";
import { DataTable } from "../_components/data-table";

const ProductPage = () => {
  const { onOpen } = useNewProduct();

  const {
    data: products,
    isLoading,
    isError,
  } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: getProducts,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Products</h2>
        <Button onClick={onOpen} size={"lg"}>
          Add Product
        </Button>
        <ProductSheet />
      </div>

      {isError && (
        <div className="text-center text-red-500">something went wrong</div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : (
        <DataTable columns={columns} data={products || []} />
      )}
    </>
  );
};

export default ProductPage;
