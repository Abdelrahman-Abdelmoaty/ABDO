import ProductCard from "@/components/product-card";
import PRODUCTS from "@/mock-data/products.json";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import { getProducts } from "@/data/products";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

export default async function page({
  searchParams: { query, category, color },
}: {
  searchParams: { query: string; category: string; color: string };
}) {
  let products = await getProducts();

  if (query) {
    console.log(products);
    products =
      products?.filter((product) => product.name.toLowerCase().includes(query.toLowerCase())) ||
      null;
  }

  if (category) {
    console.log(products);
    products =
      products?.filter((product) => product.category.toLowerCase() === category.toLowerCase()) ||
      null;
  }
  console.log(products);

  if (color) {
    products =
      products?.filter((product) => product.color.toLowerCase() === color.toLowerCase()) || null;
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
  const handleColor = async (formData: FormData) => {
    "use server";
    console.log(formData);

    // const color = formData.get("color") as string;
    // let redirectUrl = "?";

    // if (color) {
    //   redirectUrl += `color=${color}&`;

    //   redirect(redirectUrl);
    // }
  };
  const categories = ["jeans", "sweatpants", "hoddies"];
  const colors = ["beige", "blue", "black"];

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

            {colors.map((color) => (
              <input
                type="radio"
                name="color"
                id={color}
                key={color}
                value={color}
                formAction={handleColor}
                className="hidden"
              />
            ))}

            <div className="flex space-x-2">
              <ToggleGroup type="single" className="space-x-3">
                {colors.map((color) => (
                  <ToggleGroupItem value={color} key={color} className="p-0">
                    <label htmlFor={color} className="rounded-full p-3 cursor-pointer">
                      <div
                        className="w-5 h-5 rounded-full cursor-pointer"
                        style={{ backgroundColor: color }}
                      ></div>
                    </label>
                  </ToggleGroupItem>
                ))}
              </ToggleGroup>
            </div>
            <select name="category" defaultValue="default" className="border px-3 py-2 capitalize">
              <option value="default" disabled>
                Category
              </option>
              {categories.map((category) => (
                <option key={category} value={category} className="capitalize">
                  {category}
                </option>
              ))}
            </select>
            <Button type="submit">Apply Filters</Button>
          </div>
        </form>
        {products?.length === 0 && (
          <div className="text-center py-12">
            <h5 className="text-3xl font-bold">No products found</h5>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </div>
    </>
  );
}
