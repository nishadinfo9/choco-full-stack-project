import * as z from "zod";

export const OrderSchema = z.object({
  productId: z
    .number()
    .int("productI must be an integer")
    .positive("productI must be positive"),

  pincode: z
    .string()
    .trim()
    .regex(/^\d{6}$/, "Pincode must be exactly 6 digits")
    .length(6),

  qty: z
    .number()
    .positive("qty must be greater than 0")
    .finite("Invalid qty"),

  address: z
    .string({ message: "Invalid address" })
    .min(5, "address at least 5 character"),
});
