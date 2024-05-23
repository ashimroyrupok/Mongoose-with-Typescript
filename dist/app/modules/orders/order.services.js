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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.orderServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const order_modal_1 = require("./order.modal");
const product_model_1 = require("../product/product.model");
const createOrderIntoDB = (order) => __awaiter(void 0, void 0, void 0, function* () {
    const { productId } = order;
    const objId = new mongoose_1.default.Types.ObjectId(productId);
    const isAvailable = yield product_model_1.Product.findOne({ _id: objId });
    // console.log(isAvailable, "data is available");
    if (!isAvailable) {
        return { message: "Order not found" };
    }
    const quantity = isAvailable === null || isAvailable === void 0 ? void 0 : isAvailable.inventory.quantity;
    const remaining = quantity - order.quantity;
    if (quantity < order.quantity) {
        return {
            message: "Insufficient quantity available in inventory",
            quantity,
        };
    }
    if (remaining === 0) {
        isAvailable.inventory.inStock = false;
        yield isAvailable.save();
    }
    const result = yield order_modal_1.Order.create(order);
    isAvailable.inventory.quantity -= order.quantity;
    yield isAvailable.save();
    return result;
});
const getAllOrderIntoDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_modal_1.Order.find();
    return result;
});
const getSingleOrderFromDB = (email) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield order_modal_1.Order.find({ email: email });
    return result;
});
exports.orderServices = {
    createOrderIntoDB,
    getAllOrderIntoDB,
    getSingleOrderFromDB,
};
