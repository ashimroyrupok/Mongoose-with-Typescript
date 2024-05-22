"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the Variant schema
const VariantValidationSchema = zod_1.z.object({
    type: zod_1.z.string().min(1, "Type is required"),
    value: zod_1.z.string().min(1, "Value is required"),
});
// Define the Inventory schema
const InventoryValidationSchema = zod_1.z.object({
    quantity: zod_1.z.number().min(0, "Quantity must be at least 0"),
    inStock: zod_1.z.boolean(),
});
// Define the Product schema
const productValidationSchema = zod_1.z.object({
    name: zod_1.z.string().min(1, "Name is required"),
    description: zod_1.z.string().min(1, "Description is required"),
    price: zod_1.z.number().min(0, "Price must be at least 0"),
    category: zod_1.z.string().min(1, "Category is required"),
    tags: zod_1.z
        .array(zod_1.z.string().min(1, "Tag must be a non-empty string"))
        .nonempty("Tags are required"),
    variants: zod_1.z.array(VariantValidationSchema).nonempty("Variants are required"),
    inventory: InventoryValidationSchema,
});
exports.default = productValidationSchema;
