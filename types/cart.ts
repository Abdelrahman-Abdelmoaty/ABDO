import { Product } from "./product";

export type CartItem = Product & {
  quantity: number;
  size: string;
  color: string;
};

export type Cart = CartItem[];
