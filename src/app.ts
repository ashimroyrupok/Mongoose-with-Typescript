import express, { Request, Response } from "express";
import cors from "cors";
import { productRoutes } from "./app/modules/product/product.route";
import { orderRoutes } from "./app/modules/orders/order.route";
const app = express();
const port = 3000;

// parser
app.use(express.json());
app.use(cors());

// routes
app.use("/api/products", productRoutes);
app.use("/api/orders", orderRoutes);

app.get("/", (req: Request, res: Response) => {
  res.send("Hello World!");
});

export default app;
