import { Product } from "@/types/product";
import React from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Eye } from "lucide-react";
import { cn } from "@/lib/utils";

export default async function ProductCard({ product }: { product: Product }) {
  return (
    <Card>
      <CardHeader>
        <div className="relative overflow-hidden group">
          <Image
            src={product.productColors[0].images[0]}
            alt="product-image"
            width={600}
            height={400}
          />
          <Link href={`/shop/${product.id}`}>
            <Image
              src={product.productColors[0].images[1]}
              alt="product-image"
              width={600}
              height={400}
              className="absolute z-10 top-0 left-0 opacity-0 group-hover:opacity-100 transition group-hover:scale-110 duration-300"
            />
            <div className="opacity-0 text-gray-700 bg-white bg-opacity-40 rounded-full p-3 group-hover:opacity-100 transition duration-300 absolute top-1/2 left-1/2 z-20 -translate-x-1/2 -translate-y-1/2">
              <Eye className="w-6 h-6" />
            </div>
          </Link>
        </div>
      </CardHeader>
      <CardContent>
        <h3 className="font-bold text-xl">{product.name}</h3>
        <p className="font-medium text-muted-foreground text-sm whitespace-nowrap text-ellipsis overflow-hidden">
          {product.description}
        </p>
        <p className="text-lg font-bold">${product.price}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between">
        <div className="space-x-2 flex">
          {product.productSizes.map((item) => (
            <div
              key={item.sizeId}
              className="border rounded-full p-1.5 w-8 h-8 flex items-center justify-center"
            >
              <span
                className={cn("uppercase text-sm font-semibold leading-none", {
                  "text-muted-foreground": item.stock === 0,
                })}
              >
                {item.size.name}
              </span>
            </div>
          ))}
        </div>
        <div className="space-x-2 flex">
          {product.productColors.map((item) => (
            <div
              key={item.colorId}
              className={cn("w-5 h-5 rounded-full", {
                hidden: item.stock === 0,
              })}
              style={{
                backgroundColor: item.color.hexCode,
              }}
            ></div>
          ))}
        </div>
      </CardFooter>
    </Card>
  );
}
