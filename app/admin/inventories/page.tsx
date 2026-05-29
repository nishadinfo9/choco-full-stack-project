"use client";

import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { getInventories } from "@/http/api";
import { Inventory } from "@/types/type";
import { Loader2 } from "lucide-react";
import { DataTable } from "../_components/data-table";
import { InventoryColumns } from "./_components/our-colums";
import { InventorySheet } from "./_components/inventory-sheet";
import { useNewInventory } from "@/store/inventory/inventory.store";

const Inventories = () => {
  const { onOpen } = useNewInventory();

  const {
    data: inventories,
    isLoading,
    isError,
  } = useQuery<Inventory[]>({
    queryKey: ["inventories"],
    queryFn: getInventories,
  });

  console.log(inventories);

  return (
    <>
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold tracking-tight">Inventories</h2>
        <Button onClick={onOpen} size={"lg"}>
          Add Inventory
        </Button>
        <InventorySheet />
      </div>

      {isError && (
        <div className="text-center text-red-500">something went wrong</div>
      )}

      {isLoading ? (
        <div className="flex items-center justify-center">
          <Loader2 className="size-8 animate-spin" />
        </div>
      ) : (
        <DataTable columns={InventoryColumns} data={inventories || []} />
      )}
    </>
  );
};

export default Inventories;
