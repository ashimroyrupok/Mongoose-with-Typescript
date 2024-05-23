import mongoose from "mongoose";
import { TOrder } from "./order.interface";
import { Order } from "./order.modal";
import { Product } from "../product/product.model";

const createOrderIntoDB = async (order: TOrder) => {
  const { productId } = order;

  const objId = new mongoose.Types.ObjectId(productId);
  const isAvailable = await Product.findOne({ _id: objId });
  // console.log(isAvailable, "data is available");
  if (!isAvailable) {
    return { message: "Order not found" };
  }
  const quantity = isAvailable?.inventory.quantity;
  const remaining = quantity - order.quantity;

  if (quantity < order.quantity) {
    return {
      message: "Insufficient quantity available in inventory",
      quantity,
    };
  }
  if (remaining === 0) {
    isAvailable.inventory.inStock = false;
    await isAvailable.save();
  }
  const result = await Order.create(order);
  isAvailable.inventory.quantity -= order.quantity;
  await isAvailable.save();
  return result;
};

const getAllOrderIntoDB = async () => {
  const result = await Order.find();
  return result;
};
const getSingleOrderFromDB = async (email: any) => {
  const result = await Order.find({ email: email });
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getAllOrderIntoDB,
  getSingleOrderFromDB,
};
