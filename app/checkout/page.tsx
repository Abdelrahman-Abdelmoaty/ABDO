import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import CheckoutProducts from "@/components/checkout-products";
import CompletePurchase from "@/components/complete-purchase";

export default function page() {
  return (
    <main className="flex-1 flex flex-col p-4 gap-4 md:gap-8 md:p-6">
      <section className="grid items-start gap-4 md:grid-cols-2">
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg md:text-base capitalize">Order summary</h2>
          <CheckoutProducts />
        </div>
        <div className="flex flex-col gap-1">
          <h2 className="font-semibold text-lg md:text-base">Customer details</h2>
          <div className="grid gap-2 text-sm">
            <div className="flex items-center gap-2">
              <Label className="min-w-[100px]" htmlFor="name">
                Name
              </Label>
              <Input id="name" placeholder="Enter your name" />
            </div>
            <div className="flex items-center gap-2">
              <Label className="min-w-[100px]" htmlFor="email">
                Email
              </Label>
              <Input id="email" placeholder="Enter your email" />
            </div>
            <div className="flex items-center gap-2">
              <Label className="min-w-[100px]" htmlFor="address">
                Address
              </Label>
              <Textarea
                className="min-h-[100px] resize-none"
                id="address"
                placeholder="Enter your address"
              />
            </div>
          </div>
        </div>
      </section>
      <CompletePurchase />
    </main>
  );
}
