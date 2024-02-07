import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { HeartIcon, PlusIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import PRODUCTS from "@/mock-data/products.json";
import ProductCard from "@/components/product-card";
import { getProducts } from "@/data/products";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      <div className="sm:text-center py-12 space-y-4">
        <h1 className="font-bold text-6xl text-primary">The Perfect Product for You</h1>
        <Button size="lg" asChild>
          <Link href="/shop">Shop Now</Link>
        </Button>
      </div>
      <div>
        <h2 className="font-bold text-5xl text-center text-primary mb-12">Featured Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products?.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
      <div>
        <h2 className="font-bold text-5xl text-center text-primary mb-12">New Arrivals</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products?.sort(() => Math.random() - 0.5) &&
            products
              ?.slice(0, 4)
              .map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </>
  );
}
