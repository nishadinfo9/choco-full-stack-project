import { z } from "zod";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const ACCEPTED_IMAGE_TYPES = ["image/jpeg", "image/png", "image/webp"];

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

  price: z.coerce
    .number()
    .positive("Price must be greater than 0")
    .finite("Invalid price"),

  image: z
    .instanceof(File, {
      message: "Image is required",
    })
    .refine((file) => file.size > 0, "Image is required")
    .refine((file) => file.size <= MAX_FILE_SIZE, "Max image size is 5MB")
    .refine(
      (file) => ACCEPTED_IMAGE_TYPES.includes(file.type),
      "Only .jpg, .png and .webp formats are supported",
    ),
});
