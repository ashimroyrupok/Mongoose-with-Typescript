"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderController = void 0;
const order_services_1 = require("./order.services");
const createOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const order = req.body;
        console.log(order, "aa");
        const result = yield order_services_1.orderServices.createOrderIntoDB(order);
        res.status(200).json({
            success: true,
            message: "Order created successfully!",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
const getAllOrder = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = req.query;
        console.log(email, "ab");
        if (email) {
            const result2 = yield order_services_1.orderServices.getSingleOrderFromDB(email);
            return res.status(200).json({
                success: true,
                message: "order get by email was successful",
                data: result2,
            });
        }
        const result = yield order_services_1.orderServices.getAllOrderIntoDB();
        // console.log(result);
        res.status(200).json({
            success: true,
            message: "get all order successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: error,
        });
    }
});
exports.orderController = {
    createOrder,
    getAllOrder,
};
