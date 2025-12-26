import { useFeaturedProducts } from "@/features/products/hooks";
import { ProductShowcaseGrid } from "@/features/products/components";
import { useDocumentTitle, useScrollTop } from "@/hooks";

export default function FeaturedPage() {
  useScrollTop();
  useDocumentTitle("Featured Products | Lumina Boutique");
  const { data: products, isLoading } = useFeaturedProducts(12);

  return (
    <main className="container pb-20 pt-24">
      <div className="relative mb-16 overflow-hidden rounded-3xl bg-[#f9f9f9] px-8 py-16 text-center shadow-sm lg:px-16 lg:py-24">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-6xl">
            Featured Products
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Discover our handpicked selection of top-rated eyewear, designed for style and comfort.
          </p>
        </div>
        {/* Abstract background shapes */}
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-96 h-96 rounded-full bg-primary/5 blur-3xl" />
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-64 h-64 rounded-full bg-primary/10 blur-3xl" />
      </div>

      <ProductShowcaseGrid
        products={products}
        isLoading={isLoading}
        skeletonCount={8}
      />
    </main>
  );
}
