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
exports.ProductServices = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const product_model_1 = require("./product.model");
const createProductIntoDB = (product) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.create(product);
    return result;
});
const getProductsFromDB = () => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield product_model_1.Product.find();
    return result;
});
const getSingleProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objId = new mongoose_1.default.Types.ObjectId(id);
    const result = yield product_model_1.Product.aggregate([{ $match: { _id: objId } }]);
    // const result = await Product.findOne({_id:objId})
    return result;
});
const updateProduct = (id, product) => __awaiter(void 0, void 0, void 0, function* () {
    const objId = new mongoose_1.default.Types.ObjectId(id);
    const filter = { _id: objId };
    const update = {
        name: product === null || product === void 0 ? void 0 : product.name,
        description: product === null || product === void 0 ? void 0 : product.description,
        price: product === null || product === void 0 ? void 0 : product.price,
        category: product === null || product === void 0 ? void 0 : product.category,
        tags: product === null || product === void 0 ? void 0 : product.tags,
        variants: product === null || product === void 0 ? void 0 : product.variants,
        inventory: product === null || product === void 0 ? void 0 : product.inventory,
    };
    const result = yield product_model_1.Product.findOneAndUpdate(filter, update);
    return result;
});
const deleteProduct = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const objId = new mongoose_1.default.Types.ObjectId(id);
    const result = yield product_model_1.Product.findOneAndDelete({ _id: objId });
    return result;
});
const searchProductFromDB = (str) => __awaiter(void 0, void 0, void 0, function* () {
    const regex = new RegExp(`\\b${str}\\b`, "i");
    const results = yield product_model_1.Product.find({ name: regex });
});
exports.ProductServices = {
    createProductIntoDB,
    getProductsFromDB,
    getSingleProduct,
    updateProduct,
    deleteProduct
};
