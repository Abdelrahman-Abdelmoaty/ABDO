import { db } from "@/lib/db";
import { Color, Product } from "@/types/product";

export const getProducts = async () => {
  try {
    const products = await db.product.findMany({
      include: {
        productColors: {
          include: {
            color: true,
          },
        },
        productSizes: {
          include: {
            size: true,
          },
        },
      },
    });
    return products as Product[];
  } catch {
    return null;
  }
};

export const getProductById = async (id: string) => {
  try {
    const product = await db.product.findUnique({
      include: {
        productColors: {
          include: {
            color: true,
          },
        },
        productSizes: {
          include: {
            size: true,
          },
        },
      },
      where: {
        id,
      },
    });
    return product as Product;
  } catch {
    return null;
  }
};

export const getColors = async () => {
  try {
    const colors = await db.color.findMany();
    return colors as Color[];
  } catch {
    return null;
  }
};
