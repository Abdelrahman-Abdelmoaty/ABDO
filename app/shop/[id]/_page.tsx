import { getProductById } from "@/data/products";
import ProductCaraousel from "@/components/product-carousel";
import Link from "next/link";
import { cn } from "@/lib/utils";
import AddToCartButton from "@/components/add-to-cart-button";
import CustomRadioButton from "@/components/custom-radio-button";

export default async function page({
  params: { id },
  searchParams: { ci, si },
}: {
  params: { id: string };
  searchParams: { ci: string; si: string };
}) {
  const product = await getProductById(id);
  if (!product) return null;

  const colorIndex = +ci || product.productColors.findIndex((c) => c.stock > 0);
  const sizeIndex = +si || product.productSizes.findIndex((c) => c.stock > 0);

  return (
    <div className="grid md:grid-cols-2 items-start max-w-5xl px-4 mx-auto py-6 gap-6 md:gap-12 lg:gap-24">
      <div className="h-full">
        <ProductCaraousel images={product.productColors[colorIndex].images} />
      </div>
      <div className="flex flex-col gap-8 max-w-fit">
        <div>
          <h1 className="font-bold text-3xl lg:text-4xl">{product.name}</h1>
        </div>
        <div>
          <p className="text-sm font-medium">{product.description}</p>
        </div>
        <div>
          <p className="text-2xl font-bold">${product.price}</p>
        </div>
        <div className="flex space-x-1">
          {product.productColors.map((color, index) => (
            <Link
              key={color.id}
              href={`?ci=${index}&si=${sizeIndex}`}
              replace={true}
              scroll={false}
              className={cn({
                "pointer-events-none": color.stock === 0,
              })}
            >
              <CustomRadioButton
                name="color"
                color={color.color.hexCode}
                checked={colorIndex === index}
                disabled={color.stock === 0}
              />
            </Link>
          ))}
        </div>
        <div className="flex space-x-2">
          {product.productSizes.map((size, index) => (
            <Link
              key={size.id}
              href={`?ci=${colorIndex}&si=${index}`}
              replace={true}
              scroll={false}
              className={cn({
                "pointer-events-none": size.stock === 0,
              })}
            >
              <CustomRadioButton
                name="size"
                checked={sizeIndex === index}
                disabled={size.stock === 0}
              >
                {size.size.name}
              </CustomRadioButton>
            </Link>
          ))}
        </div>
        <AddToCartButton product={product} />
      </div>
    </div>
  );
}
