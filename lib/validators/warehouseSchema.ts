import * as z from "zod";

export const WarehouseSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Warehouse name must be at least 3 characters")
    .max(100, "Warehouse name cannot exceed 100 characters"),

  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Pincode must be exactly 6 digits")
    .length(6),
});

// export type WarehouseInput = z.infer<typeof WarehouseSchema>;
