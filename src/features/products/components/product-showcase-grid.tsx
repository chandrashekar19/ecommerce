import { Product } from "@/types/product";
import { ProductCard } from "./product-card";
import { ProductCardSkeleton } from "./product-card-skeleton";

interface ProductShowcaseGridProps {
  products: Product[] | undefined;
  skeletonCount?: number;
  isLoading?: boolean;
}

export function ProductShowcaseGrid({
  products,
  skeletonCount = 4,
  isLoading,
}: ProductShowcaseGridProps) {
  if (isLoading || !products) {
    return (
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {Array.from({ length: skeletonCount }).map((_, i) => (
          <ProductCardSkeleton key={i} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="flex h-40 items-center justify-center rounded-lg border-2 border-dashed border-muted text-muted-foreground">
        No products found.
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
