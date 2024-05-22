import { Model } from "mongoose";

type Variant = {
  type: string;
  value: string;
};
type Inventory = {
  quantity: number;
  inStock: boolean;
};

export type TProduct = {
  name: string;
  description: string;
  price: number;
  category: string;
  tags: string[];
  variants: Variant[];
  inventory: Inventory;
};


// export interface ProductModel extends Model<TProduct> {
//   isUserExists(name: string): Promise<TProduct | null>;
// }
