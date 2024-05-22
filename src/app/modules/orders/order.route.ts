import express from "express";
import { orderController } from "./order.controllers";

const router = express.Router();

router.post("/", orderController.createOrder);
router.get('/', orderController.getAllOrder);

export const orderRoutes = router;
