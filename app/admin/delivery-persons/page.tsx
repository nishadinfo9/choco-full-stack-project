"use client";

import { Button } from "@/components/ui/button";
import { DeliveryPersonColumns } from "./_components/our-colums";
import { useQuery } from "@tanstack/react-query";
import { getDeliveryPersons } from "@/http/api";
import { DeliveryPerson } from "@/types/type";
import { Loader2 } from "lucide-react";
import { DataTable } from "../_components/data-table";
import { DeliveryPersonSheet } from "./_components/deliveryPerson-sheet";
import { useNewDeliveryPerson } from "@/store/delivery-person/delivery-person.store";

const DeliveryParsons = () => {
  const { onOpen } = useNewDeliveryPerson();

  const {
    data: deliveryPersons,
    isLoading,
    isError,
  } = useQuery<DeliveryPerson[]>({
    queryKey: ["delivery-persons"],
    queryFn: getDeliveryPersons,
  });


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
