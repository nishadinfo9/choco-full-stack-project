import { z } from "zod";

export const isServer = typeof window === "undefined";

export const ProductSchema = z.object({
  name: z
    .string()
    .trim()
    .min(3, "Name must be at least 3 characters")
    .max(100, "Name too long"),

  description: z
    .string()
    .trim()
    .min(10, "Description must be at least 10 characters")
    .max(1000, "Description too long"),

  price: z
    .number()
    .positive("Price must be greater than 0")
    .finite("Invalid price"),

  image: z.instanceof(isServer ? File : FileList, {
    message: "Product image should be a image",
  }),
});
