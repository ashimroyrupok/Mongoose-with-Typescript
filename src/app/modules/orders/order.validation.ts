import { z } from "zod";

// Define the Zod schema for an order
const OrderValidationSchema = z.object({
  email: z.string().email(),
  productId: z.string(),
  price: z.number().nonnegative(),
  quantity: z.number().int().nonnegative(),
});

export default OrderValidationSchema;
