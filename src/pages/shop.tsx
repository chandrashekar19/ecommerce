import { useState, useEffect } from "react";
import { SlidersHorizontal, Grid, List } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { ProductCard, ProductGridSkeleton } from "@/features/products";
import { useFilterStore } from "@/features/products/stores/filter-store";
import { useDocumentTitle } from "@/hooks";
import { productService } from "@/lib/firebase";
import { SORT_OPTIONS } from "@/constants/config";
import type { Product } from "@/types/product";

export function ShopPage() {
  useDocumentTitle("Shop");

  const [products, setProducts] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const { filters, setSortBy } = useFilterStore();

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        const result = await productService.getProducts();
        setProducts(result.products);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, []);

  // Apply filters and sorting
  const filteredProducts = products
    .filter((product) => {
      if (product.price < filters.minPrice || product.price > filters.maxPrice) {
        return false;
      }
      if (filters.brand && product.brand !== filters.brand) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (filters.sortBy) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "name":
          return a.name.localeCompare(b.name);
        case "date":
        default:
          return b.dateAdded - a.dateAdded;
      }
    });

  return (
    <main className="container px-4 py-8">
      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">Shop</h1>
        <p className="text-muted-foreground mt-1">
          Browse our collection of premium products
        </p>
      </div>

      {/* Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
        <div className="flex items-center gap-4">
          <Button variant="outline" size="sm">
            <SlidersHorizontal className="mr-2 h-4 w-4" />
            Filters
          </Button>
          <p className="text-sm text-muted-foreground">
            {filteredProducts.length} products
          </p>
        </div>

        <div className="flex items-center gap-4">
          {/* Sort */}
          <Select
            value={filters.sortBy}
            onValueChange={(value) => setSortBy(value as typeof filters.sortBy)}
          >
            <SelectTrigger className="w-[180px]">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              {SORT_OPTIONS.map((option) => (
                <SelectItem key={option.value} value={option.value}>
                  {option.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          {/* View Toggle */}
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-r-none"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "secondary" : "ghost"}
              size="icon"
              className="rounded-l-none"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Products Grid */}
      {isLoading ? (
        <ProductGridSkeleton count={12} />
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-16">
          <p className="text-muted-foreground">No products found</p>
        </div>
      ) : (
        <div className="product-grid">
          {filteredProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}
    </main>
  );
}
