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
  const [quantity, setQuantity] = useState(
    cart.find((item) => item.id === product.id)?.quantity || 0
  );
  const [isInCart, setIsInCart] = useState(cart.some((item) => item.id === product.id));
  const searchParams = useSearchParams();

  const color = product.productColors[+(searchParams.get("ci") || 0)].color.hexCode;
  const size = product.productSizes[+(searchParams.get("si") || 0)].size.name;

  useEffect(() => {
    setCart(
      cart.map((item) => {
        if (item.id === product.id) {
          return {
            ...item,
            size,
            color,
          };
        }
        return item;
      })
    );
  }, [color, size]);

  const addToCart = () => {
    setIsInCart(true);
    updateCart(1);
    const newCart = [
      ...cart,
      {
        ...product,
        quantity: 1,
        size,
        color,
      },
    ];
    setCart(newCart);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };
  const updateCart = (newQuantity: number) => {
    setQuantity(newQuantity);
    const updatedCart = cart.map((item) => {
      if (item.id === product.id && color === item.size && size === item.color) {
        return {
          ...item,
          quantity: newQuantity,
          size,
          color,
        };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    updateCart(newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) {
      const updatedCart = cart.filter((item) => item.id !== product.id);
      setCart(updatedCart);
      setIsInCart(false);
      setQuantity(0);
    } else if (quantity > 1) {
      const newQuantity = quantity - 1;
      updateCart(newQuantity);
    }
  };

  const handleRemoveButton = () => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
    setIsInCart(false);
    setQuantity(0);
  };

  const handleNewSize = () => {
    setIsInCart(false);
    setQuantity(0);
  };

  return (
    <>
      <div className="flex items-center space-x-5">
        {isInCart ? (
          <>
            <div className="flex items-center space-x-2">
              <Button onClick={decreaseQuantity}>
                <Minus className="w-4" />
              </Button>
              <span className="font-semibold">{quantity}</span>
              <Button onClick={increaseQuantity}>
                <Plus className="w-4" />
              </Button>
            </div>
            <Button variant="destructive" size="icon" onClick={handleRemoveButton}>
              <X className="w-4" />
            </Button>
            <Button variant="outline" onClick={handleNewSize}>
              add new size
            </Button>
          </>
        ) : (
          <>
            <Button size="icon" variant="ghost">
              <HeartIcon />
            </Button>
            <Button size="lg" onClick={addToCart}>
              add to cart
            </Button>
          </>
        )}
      </div>
    </>
  );
}
