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
      <SheetTrigger className={buttonVariants({ variant: "ghost" })}>
        <ShoppingBag className="w-5" />
      </SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle className="flex items-start space-x-2">
            <ShoppingBag className="w-5" />
            <span>Cart</span>
          </SheetTitle>
          <SheetDescription className="py-5">
            {cart.length === 0 ? (
              <p>Your cart is empty</p>
            ) : (
              <table className="w-full">
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id} className="py-2flexitems-centerjustify-between">
                      <td>
                        <Image
                          src={item.image[0]}
                          alt={item.name}
                          width={50}
                          height={50}
                          className="object-cover"
                        />
                      </td>
                      <td className="font-semibold">{item.name}</td>
                      <td className="font-medium">
                        ${item.price} x {item.quantity}
                      </td>
                      <td className="font-semibold">${item.quantity * item.price}</td>
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
          </SheetDescription>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
