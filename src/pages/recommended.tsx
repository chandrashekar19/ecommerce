import { useRecommendedProducts } from "@/features/products/hooks";
import { ProductShowcaseGrid } from "@/features/products/components";
import { useDocumentTitle, useScrollTop } from "@/hooks";

export default function RecommendedPage() {
  useScrollTop();
  useDocumentTitle("Recommended Products | Lumina Boutique");
  const { data: products, isLoading } = useRecommendedProducts(12);

  return (
    <main className="container pb-20 pt-24">
      <div className="relative mb-16 overflow-hidden rounded-3xl bg-[#f9f9f9] px-8 py-16 text-center shadow-sm lg:px-16 lg:py-24">
        <div className="relative z-10 max-w-2xl mx-auto">
          <h1 className="mb-6 text-4xl font-extrabold tracking-tight lg:text-6xl">
            Recommended Products
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Personalized picks just for you. Find your next favorite pair of glasses.
          </p>
        </div>
        <div className="absolute top-0 left-0 -translate-y-1/2 -translate-x-1/2 w-96 h-96 rounded-full bg-secondary/5 blur-3xl" />
        <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-64 h-64 rounded-full bg-secondary/10 blur-3xl" />
      </div>

      <ProductShowcaseGrid
        products={products}
        isLoading={isLoading}
        skeletonCount={8}
      />
    </main>
  );
}
