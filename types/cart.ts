import { Product } from "./product";

export type CartItem = Product & {
  size: string;
  quantity: number;
  color: string;
};

export type Cart = CartItem[];
