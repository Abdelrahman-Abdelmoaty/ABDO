export type Product = {
  id: string;
  name: string;
  price: number;
  description: string | null;
  category: string | null;
  stock: number;
  createdAt: Date;
  productColors: ProductColor[];
  productSizes: ProductSize[];
};

type Size = {
  id: string;
  name: string;
  stock: number;
};

type Color = {
  id: string;
  name: string;
  hexCode: string;
  stock: number;
};

type ProductColor = {
  id: string;
  colorId: string;
  productId: string;
  images: string[];
  stock: number;
  color: Color;
};

type ProductSize = {
  id: string;
  sizeId: string;
  productId: string;
  stock: number;
  size: Size;
};

export type { Size, Color, ProductColor, ProductSize };
export default Product;
