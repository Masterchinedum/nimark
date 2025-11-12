import Container from "@/components/ui/container";
import ProductList from "@/components/product/product-list";
import getProducts from "@/actions/get-products";
import getBillboards from "@/actions/get-billboards";
import getParentCategories from "@/actions/get-parent-categories";
import getBrands from "@/actions/get-brands";
import HeroCarousel from "@/components/hero/hero-carousel";
import QuickActionCards from "@/components/hero/quick-action-cards";
import CategoryPills from "@/components/hero/category-pills";
import PromoBanners from "@/components/hero/promo-banners";
import BrandCarousel from "@/components/hero/brand-carousel";

export const revalidate = 0;

export default async function HomePage() {
  // Fetch all data in parallel for better performance
  const [products, billboards, categories, brands] = await Promise.all([
    getProducts({ isFeatured: true }),
    getBillboards(),
    getParentCategories(),
    getBrands(),
  ]);

  return (
    <Container>
      <div className="space-y-6 sm:space-y-8 lg:space-y-10 pb-10">
        {/* Hero Carousel Section */}
        <div className="px-4 sm:px-6 lg:px-8 pt-6 sm:pt-8">
          <HeroCarousel billboards={billboards} />
        </div>

        {/* Quick Action Cards */}
        <div className="px-4 sm:px-6 lg:px-8">
          <QuickActionCards />
        </div>

        {/* Category Pills Navigation */}
        <div className="px-4 sm:px-6 lg:px-8">
          <CategoryPills categories={categories} />
        </div>

        {/* Promo Banners */}
        <div className="px-4 sm:px-6 lg:px-8">
          <PromoBanners />
        </div>

        {/* Brand Carousel */}
        {brands.length > 0 && (
          <div className="px-4 sm:px-6 lg:px-8">
            <BrandCarousel brands={brands} />
          </div>
        )}

        {/* Featured Products Section */}
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="mb-4 sm:mb-6">
            <h2 className="text-2xl sm:text-3xl font-bold">Featured Products</h2>
            <p className="text-muted-foreground text-sm sm:text-base mt-1">
              Discover our hand-picked selection of premium electronics
            </p>
          </div>
          <ProductList title="" items={products} />
        </div>
      </div>
    </Container>
  );
}
