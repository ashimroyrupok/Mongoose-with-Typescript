import { Request, Response } from "express";
import { ProductServices } from "./product.services";
import { z } from "zod";
import productValidationSchema from "./product.validation";

const createProduct = async (req: Request, res: Response) => {
  try {
    const product = req.body;
    console.log(product);
    // validation using zod
    const zodDataParse = productValidationSchema.parse(product);

    const result = await ProductServices.createProductIntoDB(zodDataParse);
    res.status(200).json({
      success: true,
      message: "Product is created successfully",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error creating product",
      details: error,
    });
  }
};

const getAllProduct = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query;
    if (searchTerm) {
      const result2 = await ProductServices.searchProductFromDB(searchTerm);
      console.log(result2);
      return res.status(200).json({
        success: true,
        message: "successfully search product",
        data: result2,
      });
    }
    const result = await ProductServices.getProductsFromDB();
    res.status(200).json({
      success: true,
      message: "product is successfully retrieved",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error when get all product",
      details: error,
    });
  }
};

const getSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    console.log(productId);
    const result = await ProductServices.getSingleProduct(productId);
    console.log(result);
    res.status(200).json({
      success: true,
      message: "product is successfully retrieved",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "product is not exist",
      details: error,
    });
  }
};

const updateSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const newValue = req.body;
    console.log(newValue, productId);
    const result = await ProductServices.updateProduct(productId, newValue);
    res.status(200).json({
      success: true,
      message: "successfully updated product",
      details: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error when get single product",
      details: error,
    });
  }
};

// delete single product

const deleteSingleProduct = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params;
    const result = await ProductServices.deleteProduct(productId);
    res.status(200).json({
      success: true,
      message: "product is successfully deleted",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error when delete single product",
      details: error,
    });
  }
};

// search

export const ProductControllers = {
  createProduct,
  getAllProduct,
  getSingleProduct,
  updateSingleProduct,
  deleteSingleProduct,
};
