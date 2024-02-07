"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { Button } from "./ui/button";
import { HeartIcon, Plus, Minus } from "lucide-react";
import { useCart } from "@/store/CartProvider";
import { useToast } from "@/components/ui/use-toast";

export default function ProductCardButton({ product }: { product: Product }) {
  const { toast } = useToast();
  const { cart, setCart } = useCart()();
  const [quantity, setQuantity] = useState(
    cart.find((item) => item.id === product.id)?.quantity || 0
  );
  const [isInCart, setIsInCart] = useState(cart.some((item) => item.id === product.id));

  useEffect(() => {
    setQuantity(cart.find((item) => item.id === product.id)?.quantity || 0);
    setIsInCart(cart.some((item) => item.id === product.id));
  }, [cart.find((item) => item.id === product.id)?.quantity]);

  const updateCart = (newQuantity: number) => {
    setQuantity(newQuantity);
    const updatedCart = cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, quantity: newQuantity };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const addToCart = async () => {
    setIsInCart(true);
    updateCart(1);
    const newCart = [...cart, { ...product, quantity: 1 }];
    setCart(newCart);
    toast({
      title: "Added to cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const increaseQuantity = () => {
    const newQuantity = quantity + 1;
    updateCart(newQuantity);
  };

  const decreaseQuantity = () => {
    if (quantity === 1) {
      setQuantity(0);
      setIsInCart(false);
      const updatedCart = cart.filter((item) => item.id !== product.id);
      setCart(updatedCart);
    }
    if (quantity > 1) {
      const newQuantity = quantity - 1;
      updateCart(newQuantity);
    }
  };

  return (
    <>
      {isInCart ? (
        <div className="flex items-center space-x-2">
          <Button onClick={decreaseQuantity}>
            <Minus className="w-4" />
          </Button>
          <span className="font-semibold">{quantity}</span>
          <Button onClick={increaseQuantity}>
            <Plus className="w-4" />
          </Button>
        </div>
      ) : (
        <>
          <Button size="icon" variant="ghost">
            <HeartIcon />
          </Button>
          <Button onClick={addToCart}>add to cart</Button>
        </>
      )}
    </>
  );
}
