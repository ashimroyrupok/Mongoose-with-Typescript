import express from "express";
import { ProductControllers } from "./product.controllers";

const router = express.Router();

router.post("/", ProductControllers.createProduct);
router.get("/", ProductControllers.getAllProduct);
router.get("/:productId", ProductControllers.getSingleProduct);
router.put("/:productId", ProductControllers.updateSingleProduct);
router.delete("/:productId", ProductControllers.deleteSingleProduct);
// router.get("/", ProductControllers.searchProduct);

export const productRoutes = router;
