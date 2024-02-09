export type Product = {
  productColors: ({
    color: {
      id: string;
      name: string;
      hexCode: string;
    };
  } & {
    id: string;
    colorId: string;
    productId: string;
    images: string[];
    stock: number;
  })[];
} & {
  productSizes: ({
    size: {
      id: string;
      name: string;
    };
  } & {
    id: string;
    sizeId: string;
    productId: string;
    stock: number;
  })[];
} & {
  id: string;
  name: string;
  price: number;
  description: string | null;
  category: string | null;
  stock: number;
  createdAt: Date;
};
