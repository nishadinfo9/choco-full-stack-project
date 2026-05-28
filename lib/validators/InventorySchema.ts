import * as z from "zod";

export const InventorySchema = z.object({
  sku: z.string().trim().length(8, { message: "sku must be exactly 8 digits" }),

  warehouseId: z
    .number()
    .int("Warehouse ID must be an integer")
    .positive("Warehouse ID must be positive"),

  productId: z
    .number()
    .int("productI must be an integer")
    .positive("productI must be positive"),
});
