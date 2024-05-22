import { TOrder } from "./order.interface";
import { Order } from "./order.modal";

const createOrderIntoDB = async (order: TOrder) => {
  const result = await Order.create(order);
  return result;
};

const getAllOrderIntoDB = async () => {
  const result = await Order.find();
  return result;
};
const getSingleOrderFromDB = async (email:any) => {
  const result = await Order.find({email:email});
  return result;
};

export const orderServices = {
  createOrderIntoDB,
  getAllOrderIntoDB,
  getSingleOrderFromDB,
};
