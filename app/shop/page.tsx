import ProductCard from "@/components/product-card";
import { Input } from "@/components/ui/input";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import { getColors, getProducts } from "@/data/products";
import Filter from "@/components/filter";

export default async function page({
  searchParams: { query, category, colorId },
}: {
  searchParams: { query: string; category: string; colorId: string };
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

  if (colorId) {
    products =
      products?.filter((product) => {
        return product.productColors.some((pc) => {
          return pc.color.name.toLowerCase() === colorId.toLowerCase();
        });
      }) || null;
  }

  const handleSearch = async (formData: FormData) => {
    "use server";
    const query = formData.get("query") as string;

    let redirectUrl = "?";

    if (query) {
      redirectUrl += `query=${query}&`;
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
        <div className="flex space-x-2"></div>
        {products?.length === 0 && (
          <div className="text-center py-12">
            <h5 className="text-3xl font-bold">No products found</h5>
          </div>
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-2">
          <div>
            <div className="mb-5 flex items-center justify-between">
              <form action={handleSearch}>
                <div className="relative w-full">
                  <MagnifyingGlassIcon className="w-6 h-6 text-muted-foreground mx-2 left-0 top-1/2 absolute -translate-y-1/2" />
                  <Input name="query" type="text" placeholder="Search" className="pl-10" />
                </div>
              </form>
            </div>
            <div className="flex space-x-2">
              {colors && <Filter data={colors} name={"Colors"} valueKey={"colorId"} />}
            </div>
          </div>
          <div className="col-span-3 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
            {products?.map((product) => <ProductCard key={product.id} product={product} />)}
            {products?.map((product) => <ProductCard key={product.id} product={product} />)}
            {products?.map((product) => <ProductCard key={product.id} product={product} />)}
            {products?.map((product) => <ProductCard key={product.id} product={product} />)}
            {products?.map((product) => <ProductCard key={product.id} product={product} />)}
          </div>
        </div>
      </div>
    </>
  );
}
