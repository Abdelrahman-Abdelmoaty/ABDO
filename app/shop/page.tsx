import ProductCard from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import { getColors, getProducts } from "@/data/products";

import Link from "next/link";
import CustomRadioButton from "@/components/custom-radio-button";

export default async function page({
  searchParams: { query, category, color },
}: {
  searchParams: { query: string; category: string; color: string };
}) {
  let products = await getProducts();

  if (query) {
    products =
      products?.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())) ||
      null;
  }

  if (category) {
    products =
      products?.filter((product) => product.category?.toLowerCase() === category.toLowerCase()) ||
      null;
  }

  if (color) {
    products =
      products?.filter((product) => {
        return product.productColors.some((pc) => {
          return pc.color.name.toLowerCase() === color.toLowerCase();
        });
      }) || null;
  }

  const handleSearch = async (formData: FormData) => {
    "use server";
    const query = formData.get("query") as string;
    const category = formData.get("category") as string;
    const color = formData.get("color") as string;

    let redirectUrl = "?";

    if (query) {
      redirectUrl += `query=${query}&`;
    }

    if (category && category != "default") {
      redirectUrl += `category=${category}&`;
    }

    if (color) {
      redirectUrl += `color=${color}&`;
    }

    redirect(redirectUrl);
  };

  const categories = ["jeans", "sweatpants", "hoodies"];
  const colors = await getColors();

  return (
    <>
      <div className="sm:text-center py-12 space-y-4">
        <h2 className="font-bold text-6xl text-primary">Discover Best Deals</h2>
      </div>
      <div>
        <form action={handleSearch}>
          <div className="mb-5 flex items-center justify-between">
            <div className="relative max-w-lg w-full">
              <MagnifyingGlassIcon className="w-6 h-6 text-muted-foreground mx-2 left-0 top-1/2 absolute -translate-y-1/2" />
              <Input name="query" type="text" placeholder="Search" className="pl-10" />
            </div>
            <div className="flex space-x-2">
              {colors?.map((_color) => (
                <Link
                  key={_color.id}
                  href={`?color=${_color.name}${category ? `&category=${category}` : ""}`}
                  replace={true}
                  scroll={false}
                >
                  <CustomRadioButton
                    name="color"
                    color={_color.hexCode}
                    checked={_color.name.toLowerCase() === (color || "").toLowerCase()}
                  />
                </Link>
              ))}
            </div>

            <div className="flex space-x-2">
              {categories.map((_category) => (
                <Link
                  key={_category}
                  href={`?${color ? `color=${color}&` : ""}category=${_category}`}
                  replace={true}
                  scroll={false}
                >
                  <CustomRadioButton
                    name="color"
                    checked={_category.toLowerCase() === (category || "").toLowerCase()}
                    className="h-auto w-auto"
                  >
                    {_category}
                  </CustomRadioButton>
                </Link>
              ))}
            </div>
          </div>
        </form>
        {products?.length === 0 && (
          <div className="text-center py-12">
            <h5 className="text-3xl font-bold">No products found</h5>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products?.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      </div>
    </>
  );
}
