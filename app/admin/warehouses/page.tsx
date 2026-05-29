"use client";

import { Button } from "@/components/ui/button";
import { warehouseColumns } from "./our-colums";
import { useQuery } from "@tanstack/react-query";
import { getProducts, getWarehouses } from "@/http/api";
import { Product, Warehouse } from "@/types/type";
import { useNewProduct } from "@/store/product/product.store";
import { Loader2 } from "lucide-react";
import { DataTable } from "../_components/data-table";
import { WarehouseSheet } from "./warehouse-sheet";

const WareHouses = () => {
  const { onOpen } = useNewProduct();

  const {
    data: warehouses,
    isLoading,
    isError,
  } = useQuery<Warehouse[]>({
    queryKey: ["warehouses"],
    queryFn: getWarehouses,
  });

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Warehouses</h2>
        <Button onClick={onOpen} size={"lg"}>
          Add Warehouse
        </Button>
        <WarehouseSheet />
      </div>

      {isError && (
        <div className="text-center text-red-500">something went wrong</div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : (
        <DataTable columns={warehouseColumns} data={warehouses || []} />
      )}
    </>
  );
};

export default WareHouses;
