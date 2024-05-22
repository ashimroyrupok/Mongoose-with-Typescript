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
exports.ProductControllers = void 0;
const product_services_1 = require("./product.services");
const product_validation_1 = __importDefault(require("./product.validation"));
const createProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const product = req.body;
        console.log(product);
        // validation using zod
        const zodDataParse = product_validation_1.default.parse(product);
        const result = yield product_services_1.ProductServices.createProductIntoDB(zodDataParse);
        res.status(200).json({
            success: true,
            message: "Product is created successfully",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error creating product",
            details: error,
        });
    }
});
const getAllProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { searchTerm } = req.query;
        if (searchTerm) {
            const result2 = yield product_services_1.ProductServices.searchProductFromDB(searchTerm);
            console.log(result2);
            return res.status(200).json({
                success: true,
                message: "successfully search product",
                data: result2,
            });
        }
        const result = yield product_services_1.ProductServices.getProductsFromDB();
        res.status(200).json({
            success: true,
            message: "product is successfully retrieved",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error when get all product",
            details: error,
        });
    }
});
const getSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        console.log(productId);
        const result = yield product_services_1.ProductServices.getSingleProduct(productId);
        console.log(result);
        res.status(200).json({
            success: true,
            message: "product is successfully retrieved",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "product is not exist",
            details: error,
        });
    }
});
const updateSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const newValue = req.body;
        console.log(newValue, productId);
        const result = yield product_services_1.ProductServices.updateProduct(productId, newValue);
        res.status(200).json({
            success: true,
            message: "successfully updated product",
            details: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error when get single product",
            details: error,
        });
    }
});
// delete single product
const deleteSingleProduct = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { productId } = req.params;
        const result = yield product_services_1.ProductServices.deleteProduct(productId);
        res.status(200).json({
            success: true,
            message: "product is successfully deleted",
            data: result,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Error when delete single product",
            details: error,
        });
    }
});
// search
exports.ProductControllers = {
    createProduct,
    getAllProduct,
    getSingleProduct,
    updateSingleProduct,
    deleteSingleProduct,
};
