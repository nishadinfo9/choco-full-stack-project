import * as z from "zod";

export const deliveryPersonSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name cannot exceed 100 characters"),

  phone: z
    .string()
    .trim()
    .length(13, { message: "Phone number must be exactly 13 digits" }),

  warehouseId: z
    .number()
    .int("Warehouse ID must be an integer")
    .positive("Warehouse ID must be positive"),

  orderId: z
    .number()
    .int("Warehouse ID must be an integer")
    .positive("Warehouse ID must be positive")
    .optional(),
});
