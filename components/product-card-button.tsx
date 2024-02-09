"use client";
import { useEffect, useState } from "react";
import { Product } from "@/types/product";
import { Button } from "./ui/button";
import { HeartIcon, Plus, Minus, X } from "lucide-react";
import { useCart } from "@/store/CartProvider";
import { useToast } from "@/components/ui/use-toast";
import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import { useRouter, useSearchParams } from "next/navigation";

const sizes = ["xs", "s", "m", "l", "xl"];

export default function ProductCardButton({ product }: { product: Product }) {
  const { toast } = useToast();
  const { cart, setCart } = useCart()();
  const [quantity, setQuantity] = useState(
    cart.find((item) => item.id === product.id)?.quantity || 0
  );
  const [isInCart, setIsInCart] = useState(cart.some((item) => item.id === product.id));
  const [selectedSize, setSelectedSize] = useState("m");
  const [selectedColor, setSelectedColor] = useState("red");

  useEffect(() => {
    const foundItem = cart.find((item) => item.id === product.id);
    setQuantity(foundItem?.quantity || 0);
    setIsInCart(!!foundItem);
  }, [cart, product.id]);

  const updateCart = (newQuantity: number) => {
    setQuantity(newQuantity);
    const updatedCart = cart.map((item) => {
      if (item.id === product.id && selectedSize === item.size && selectedColor === item.color) {
        return { ...item, quantity: newQuantity, size: selectedSize, color: selectedColor };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const addToCart = () => {
    setIsInCart(true);
    updateCart(1);
    const newCart = [
      ...cart,
      { ...product, quantity: 1, size: selectedSize, color: selectedColor },
    ];
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
      const updatedCart = cart.filter((item) => item.id !== product.id);
      setCart(updatedCart);
      setIsInCart(false);
      setQuantity(0);
    } else if (quantity > 1) {
      const newQuantity = quantity - 1;
      updateCart(newQuantity);
    }
  };

  const updateSelectedSize = (newSize: string) => {
    setSelectedSize(newSize);
    const updatedCart = cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, size: newSize };
      }
      return item;
    });
    setCart(updatedCart);
  };

  const router = useRouter();
  const searchParams = useSearchParams();
  const [colorIndex, setColorIndex] = useState(+(searchParams.get("color") || 0));
  const updateSelectedColor = (newColor: string, index: number) => {
    setSelectedColor(newColor);
    const updatedCart = cart.map((item) => {
      if (item.id === product.id) {
        return { ...item, color: newColor };
      }
      return item;
    });
    setCart(updatedCart);
    router.push(`?color=${index}`);
    setColorIndex(index);
  };

  const handleRemoveButton = () => {
    const newCart = cart.filter((item) => item.id !== product.id);
    setCart(newCart);
    setIsInCart(false);
    setQuantity(0);
  };

  const handleNewSize = () => {};

  return (
    <>
      <div className="grid gap-2">
        <Label className="text-base" htmlFor="size">
          Size
        </Label>
        <RadioGroup defaultValue="m" className="flex items-center" name="size">
          {sizes.map((size) => (
            <div key={size}>
              <Label
                htmlFor={size}
                className="p-2 border cursor-pointer flex items-center space-x-2 rounded-lg"
              >
                <RadioGroupItem value={size} id={size} onClick={() => updateSelectedSize(size)} />
                <span className="uppercase">{size}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
      <div className="grid gap-2">
        <Label className="text-base" htmlFor="color">
          Color
        </Label>
        <RadioGroup defaultValue="red" className="flex items-center" name="color">
          {product.productColors.map((item, index) => (
            <div key={item.id}>
              <Label
                htmlFor={item.id}
                className="p-2 border cursor-pointer flex items-center space-x-2 rounded-lg"
              >
                <RadioGroupItem
                  value={item.id}
                  id={item.id}
                  onClick={() => updateSelectedColor(item.color.name, index)}
                  checked={colorIndex === index}
                />
                <span className="capitalize">{item.color.name}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>
      </div>
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
