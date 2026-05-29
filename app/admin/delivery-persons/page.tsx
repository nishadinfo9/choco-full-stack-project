"use client";

import { Button } from "@/components/ui/button";
import { DeliveryPersonColumns } from "./our-colums";
import { useQuery } from "@tanstack/react-query";
import { getDeliveryPersons, getProducts, getWarehouses } from "@/http/api";
import { DeliveryPerson, Product, Warehouse } from "@/types/type";
import { useNewProduct } from "@/store/product/product.store";
import { Loader2 } from "lucide-react";
import { DataTable } from "../_components/data-table";
import { DeliveryPersonSheet } from "./deliveryPerson-sheet";

const DeliveryParsons = () => {
  const { onOpen } = useNewProduct();

  const {
    data: deliveryPersons,
    isLoading,
    isError,
  } = useQuery<DeliveryPerson[]>({
    queryKey: ["delivery-persons"],
    queryFn: getDeliveryPersons,
  });

console.log('deliveryPersons',deliveryPersons)

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Delivery Persons</h2>
        <Button onClick={onOpen} size={"lg"}>
          Add Delivery Person
        </Button>
        <DeliveryPersonSheet />
      </div>

      {isError && (
        <div className="text-center text-red-500">something went wrong</div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : (
        <DataTable
          columns={DeliveryPersonColumns}
          data={deliveryPersons || []}
        />
      )}
    </>
  );
};

export default DeliveryParsons;
