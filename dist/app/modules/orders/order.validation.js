"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const zod_1 = require("zod");
// Define the Zod schema for an order
const OrderValidationSchema = zod_1.z.object({
    email: zod_1.z.string().email(),
    productId: zod_1.z.string(),
    price: zod_1.z.number().nonnegative(),
    quantity: zod_1.z.number().int().nonnegative(),
});
exports.default = OrderValidationSchema;
