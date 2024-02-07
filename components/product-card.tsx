import { Product } from "@/types/product";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { HeartIcon } from "@radix-ui/react-icons";
import ProductCardButton from "./product-card-button";
import Link from "next/link";

export default function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader>
        <Image src={product.image[0]} alt="product-image" width={600} height={400} />
      </CardHeader>
      <CardContent>
        <h3 className="font-semibold text-xl">{product.name}</h3>
        <p className="font-medium text-muted-foreground text-sm whitespace-nowrap text-ellipsis overflow-hidden">
          {product.description}
        </p>
      </CardContent>
      <CardFooter className="space-x-2 ">
        <p className="text-lg font-semibold mr-auto">${product.price}</p>
        <Button asChild>
          <Link href={`/shop/${product.id}`}>View</Link>
        </Button>
        {/* <ProductCardButton product={product} /> */}
      </CardFooter>
    </Card>
  );
}
