import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Button, buttonVariants } from "./ui/button";
import { ShoppingBag, X } from "lucide-react";
import { useCart } from "@/store/CartProvider";
import Image from "next/image";

export default function Cart() {
  const { cart, setCart } = useCart()();
  const handleRemoveButton = (id: string) => {
    const newCart = cart.filter((item) => item.id !== id);
    setCart(newCart);
  };

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost">
          <ShoppingBag className="w-5" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col w-[400px] sm:w-[700px] sm:max-w-[700px]">
        <SheetHeader>
          <SheetTitle className="flex items-start space-x-2">
            <ShoppingBag className="w-5" />
            <span>Cart</span>
          </SheetTitle>
        </SheetHeader>
        {cart.length === 0 ? (
          <p>Your cart is empty</p>
        ) : (
          <table className="w-full">
            <tbody>
              {cart.map((item) => (
                <tr key={item.id}>
                  <td>
                    <Image
                      src={item.productColors[0].images[0]}
                      alt={item.name}
                      width={50}
                      height={50}
                      className="object-cover"
                    />
                  </td>
                  <td className="font-bold">{item.name}</td>
                  <td className="font-bold uppercase">{item.size}</td>
                  <td>
                    <div
                      className="w-4 h-4 rounded-full"
                      style={{ backgroundColor: item.color }}
                    ></div>
                  </td>
                  <td className="font-medium">
                    ${item.price} x {item.quantity}
                  </td>
                  <td className="font-bold">${item.quantity * item.price}</td>
                  <td>
                    <Button
                      variant="destructive"
                      size="icon"
                      onClick={() => handleRemoveButton(item.id)}
                    >
                      <X className="w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        {cart.length > 0 && <Button className="mt-auto">Checkout</Button>}
      </SheetContent>
    </Sheet>
  );
}
