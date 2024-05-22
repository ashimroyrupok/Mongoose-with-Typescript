import { z } from "zod";

// Define the Variant schema
const VariantValidationSchema = z.object({
  type: z.string().min(1, "Type is required"),
  value: z.string().min(1, "Value is required"),
});

// Define the Inventory schema
const InventoryValidationSchema = z.object({
  quantity: z.number().min(0, "Quantity must be at least 0"),
  inStock: z.boolean(),
});

// Define the Product schema
const productValidationSchema = z.object({
  name: z.string().min(1, "Name is required"),
  description: z.string().min(1, "Description is required"),
  price: z.number().min(0, "Price must be at least 0"),
  category: z.string().min(1, "Category is required"),
  tags: z
    .array(z.string().min(1, "Tag must be a non-empty string"))
    .nonempty("Tags are required"),
  variants: z.array(VariantValidationSchema).nonempty("Variants are required"),
  inventory: InventoryValidationSchema,
});

export default productValidationSchema
