import { Request, Response } from "express";
import { orderServices } from "./order.services";
import OrderValidationSchema from "./order.validation";

const createOrder = async (req: Request, res: Response) => {
  try {
    const order = req.body;
    console.log(order, "aa");

    const parseOrder = OrderValidationSchema.parse(order);

    const result = await orderServices.createOrderIntoDB(parseOrder);
    res.status(200).json({
      success: true,
      message: "Order created successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

const getAllOrder = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;
    console.log(email, "ab");
    if (email) {
      const result2 = await orderServices.getSingleOrderFromDB(email);
      return res.status(200).json({
        success: true,
        message: "order get by email was successful",
        data: result2,
      });
    }
    const result = await orderServices.getAllOrderIntoDB();
    // console.log(result);
    res.status(200).json({
      success: true,
      message: "get all order successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error,
    });
  }
};

export const orderController = {
  createOrder,
  getAllOrder,
};
