import { Product } from "./product";

export type CartItem = Product & {
  size: string;
  quantity: number;
  color: {
    name: string;
    hexCode: string;
  };
};

export type Cart = CartItem[];
