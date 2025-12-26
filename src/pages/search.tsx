import { useParams } from "react-router-dom";
import { useSearchProducts } from "@/features/products/hooks";
import { ProductShowcaseGrid } from "@/features/products/components";
import { MessageDisplay } from "@/components/shared";
import { useDocumentTitle, useScrollTop } from "@/hooks";

export default function SearchPage() {
  const { searchKey } = useParams<{ searchKey: string }>();
  useScrollTop();
  useDocumentTitle(searchKey ? `Search Results for "${searchKey}"` : "Search Products");

  const { data: products, isLoading, error } = useSearchProducts(searchKey);

  return (
    <main className="container pb-20 pt-24">
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">
          Search Results
        </h1>
        <p className="text-muted-foreground">
          {products && products.length > 0
            ? `Found ${products.length} ${products.length === 1 ? 'product' : 'products'} for "${searchKey}"`
            : isLoading
              ? `Searching for "${searchKey}"...`
              : `No products found for "${searchKey}"`
          }
        </p>
      </div>

      {error ? (
        <MessageDisplay message={(error as Error).message} />
      ) : (
        <ProductShowcaseGrid
          products={products}
          isLoading={isLoading}
          skeletonCount={8}
        />
      )}
    </main>
  );
}
