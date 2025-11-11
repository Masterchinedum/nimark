import Container from "@/components/ui/container";
import ProductList from "@/components/product/product-list";
import getProducts from "@/actions/get-products";

export const revalidate = 0;

export default async function HomePage() {
  const products = await getProducts({ isFeatured: true });

  return (
    <Container>
      <div className="space-y-10 pb-10">
        <div className="flex flex-col gap-y-8 px-4 py-10 sm:px-6 lg:px-8">
          <div className="space-y-4">
            <h1 className="text-4xl font-bold">Welcome to Nimark Store</h1>
            <p className="text-lg text-muted-foreground">
              Discover our collection of premium electronics and tech products
            </p>
          </div>
          <ProductList title="Featured Products" items={products} />
        </div>
      </div>
    </Container>
  );
}
