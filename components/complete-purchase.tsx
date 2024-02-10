"use client";
import { useCart } from "@/store/CartProvider";
import { Button } from "./ui/button";
import { Separator } from "./ui/separator";

export default function CompletePurchase() {
  const { cart } = useCart()();
  const subtotal = cart.reduce((acc, product) => acc + product.price * product.quantity, 0);
  const shipping = 10;
  const tax = 0.1;
  const total = subtotal + shipping + subtotal * tax;

  return (
    <section className="flex flex-col gap-4">
      <div className="border rounded-lg p-4">
        <div className="grid items-center gap-4 md:grid-cols-2">
          <div className="font-semibold">Subtotal</div>
          <div className="ml-auto">${subtotal.toFixed(2)}</div>
        </div>
        <div className="grid items-center gap-4 md:grid-cols-2">
          <div className="font-semibold">Shipping</div>
          <div className="ml-auto">${shipping.toFixed(2)}</div>
        </div>
        <div className="grid items-center gap-4 md:grid-cols-2">
          <div className="font-semibold">Tax (10%)</div>
          <div className="ml-auto">${(subtotal * tax).toFixed(2)}</div>
        </div>
        <Separator className="border-t my-4" />
        <div className="grid items-center gap-4 md:grid-cols-2">
          <div className="font-semibold">Total</div>
          <div className="ml-auto">${total.toFixed(2)}</div>
        </div>
      </div>
      <Button className="self-end w-[200px]">Complete purchase</Button>
    </section>
  );
}
