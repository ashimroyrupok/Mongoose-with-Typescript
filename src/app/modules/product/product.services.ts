import mongoose from "mongoose";
import { TProduct } from "./product.interface";
import { Product } from "./product.model";

const createProductIntoDB = async (product: TProduct) => {
  const result = await Product.create(product);
  return result;
};

const getProductsFromDB = async () => {
  const result = await Product.find();
  return result;
};

const getSingleProduct = async (id: string) => {
  const objId = new mongoose.Types.ObjectId(id);
  const result = await Product.aggregate([{ $match: { _id: objId } }]);
  // const result = await Product.findOne({_id:objId})
  return result;
};

const updateProduct = async (id: string, product: TProduct) => {
  const objId = new mongoose.Types.ObjectId(id);
  const filter = { _id: objId };
  const update = {
    name: product?.name,
    description: product?.description,
    price: product?.price,
    category: product?.category,
    tags: product?.tags,
    variants: product?.variants,
    inventory: product?.inventory,
  };

  const result = await Product.findOneAndUpdate(filter, update);
  return result;
};

const deleteProduct = async (id: string) => {
    const objId = new mongoose.Types.ObjectId(id);
    const result = await Product.findOneAndDelete({ _id: objId})
    return result;
}

const searchProductFromDB = async(str:string)=>{
  const regex = new RegExp(`\\b${str}\\b`, "i");

  const results = await Product.find({ name: regex });
}


export const ProductServices = {
  createProductIntoDB,
  getProductsFromDB,
  getSingleProduct,
  updateProduct,
  deleteProduct
};
