import { Label } from "@/components/ui/label";
import { RadioGroupItem, RadioGroup } from "@/components/ui/radio-group";
import {
  SelectValue,
  SelectTrigger,
  SelectItem,
  SelectContent,
  Select,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { JSX, SVGProps } from "react";
import { getProductById } from "@/data/products";
import Link from "next/link";
import { ArrowLeft, ArrowRight } from "lucide-react";

export default async function page({
  params: { id },
  searchParams: { color, size },
}: {
  params: { id: string };
  searchParams: { color: string; size: string };
}) {
  const product = await getProductById(id);

  const colors = ["beige", "blue", "black"];
  const sizes = ["xs", "s", "m", "l", "xl"];
  return (
    <div className="grid md:grid-cols-2 items-start max-w-3xl px-4 mx-auto py-6 gap-6 md:gap-12 lg:gap-24">
      <div className="w-full aspect-video h-full">
        <div className="h-full flex items-center space-x-5">
          <Link href={``}>
            <ArrowLeft className="w-8 h-8 cursor-pointer" />
          </Link>
          <img
            alt={product?.name}
            className="aspect-video object-cover border h-full border-gray-200 w-full rounded-lg overflow-hidden dark:border-gray-800"
            height={1200}
            src={product?.image[0]}
            width={1200}
          />
          <Link href={``}>
            <ArrowRight className="w-8 h-8 cursor-pointer" />
          </Link>
        </div>
      </div>
      <div className="flex flex-col gap-4">
        <div className="grid gap-2">
          <h1 className="font-bold text-3xl lg:text-4xl">{product?.name}</h1>
        </div>
        <form className="grid gap-4 md:gap-10">
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="color">
              Color
            </Label>
            <RadioGroup className="flex items-center gap-2" defaultValue={color} id="color">
              {colors.map((_color) => (
                <Link href={`?color=${_color}&size=${size}`} key={_color}>
                  <Label
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800"
                    htmlFor={_color}
                  >
                    <RadioGroupItem id={_color} value={_color} />
                    {_color}
                  </Label>
                </Link>
              ))}
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="size">
              Size
            </Label>
            <RadioGroup className="flex items-center gap-2" defaultValue={size} id="size">
              {sizes.map((_size) => (
                <Link href={`?color=${color}&size=${_size}`} key={_size}>
                  <Label
                    className="border cursor-pointer rounded-md p-2 flex items-center gap-2 [&:has(:checked)]:bg-gray-100 dark:[&:has(:checked)]:bg-gray-800 uppercase"
                    htmlFor={_size}
                  >
                    <RadioGroupItem id={_size} value={_size} />
                    {_size}
                  </Label>
                </Link>
              ))}
            </RadioGroup>
          </div>
          <div className="grid gap-2">
            <Label className="text-base" htmlFor="quantity">
              Quantity
            </Label>
            <Select defaultValue="1">
              <SelectTrigger className="w-24">
                <SelectValue placeholder="Select" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1</SelectItem>
                <SelectItem value="2">2</SelectItem>
                <SelectItem value="3">3</SelectItem>
                <SelectItem value="4">4</SelectItem>
                <SelectItem value="5">5</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button size="lg">Add to cart</Button>
        </form>
      </div>
    </div>
  );
}
