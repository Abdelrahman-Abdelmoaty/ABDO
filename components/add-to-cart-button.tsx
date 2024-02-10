"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { Button } from "./ui/button";
import { HeartIcon, Plus, Minus, X } from "lucide-react";
import { useCart } from "@/store/CartProvider";
import { useToast } from "@/components/ui/use-toast";
import { useSearchParams } from "next/navigation";

export default function AddToCartButton({ product }: { product: Product }) {
  const { toast } = useToast();
  const { cart, setCart } = useCart()();

  const searchParams = useSearchParams();
  const color = product.productColors[+(searchParams.get("ci") || 0)].color;
  const size = product.productSizes[+(searchParams.get("si") || 0)].size.name;

  const addToCart = () => {
    if (cart.some((item) => item.id === product.id && item.size === size && item.color === color)) {
      setCart(
        cart.map((item) => {
          if (item.id === product.id && item.size === size && item.color.name === color.name) {
            return {
              ...item,
              quantity: item.quantity + 1,
            };
          }
          return item;
        })
      );
    } else {
      setCart([
        ...cart,
        {
          ...product,
          color,
          size,
          quantity: 1,
        },
      ]);
    }

    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  return (
    <div className="flex items-center space-x-5">
      <Button size="icon" variant="ghost">
        <HeartIcon />
      </Button>
      <Button size="lg" onClick={addToCart} className="uppercase">
        add to cart
      </Button>
    </div>
  );
}
