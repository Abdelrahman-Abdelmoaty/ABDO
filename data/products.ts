import { db } from "@/lib/db";
import { Product } from "@/types/product";

export const getProducts = async () => {
  try {
    const products = await db.product.findMany();
    return products as Product[];
  } catch {
    return null;
  }
};

export const getProductById = async (id: string) => {
  try {
    const product = await db.product.findUnique({ where: { id } });
    return product as Product;
  } catch {
    return null;
  }
};
