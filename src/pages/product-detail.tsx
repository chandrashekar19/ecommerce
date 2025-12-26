import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { ChevronLeft, ShoppingBag, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useProduct, useRecommendedProducts } from "@/features/products/hooks";
import { ColorChooser, ProductShowcaseGrid } from "@/features/products/components";
import { ImageLoader, MessageDisplay, Preloader } from "@/components/shared";
import { useCartStore } from "@/features/cart/stores/cart-store";
import { useDocumentTitle, useScrollTop } from "@/hooks";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

export default function ProductDetailPage() {
  const { id } = useParams<{ id: string }>();
  useScrollTop();

  const { data: product, isLoading, error } = useProduct(id);
  const { data: recommended, isLoading: isLoadingRecommended } = useRecommendedProducts(4);

  const addItem = useCartStore((state) => state.addItem);
  const isItemInCart = useCartStore((state) => state.isItemInCart(id || ""));

  const [selectedImage, setSelectedImage] = useState("");
  const [selectedSize, setSelectedSize] = useState("");
  const [selectedColor, setSelectedColor] = useState("");

  useDocumentTitle(product ? `View ${product.name}` : "Loading Product...");

  useEffect(() => {
    if (product) {
      setSelectedImage(product.image);
      if (product.availableSizes?.length > 0) {
        setSelectedSize(product.availableSizes[0]);
      }
      if (product.availableColors?.length > 0) {
        setSelectedColor(product.availableColors[0]);
      }
    }
  }, [product]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        ...product,
        selectedColor,
        selectedSize,
      });
    }
  };

  if (isLoading) return <Preloader />;

  if (error || !product) {
    return (
      <div className="container py-20">
        <MessageDisplay
          message={error?.message || "Product not found."}
          buttonLabel="Back to Shop"
          onAction={() => window.location.assign(ROUTES.SHOP)}
        />
      </div>
    );
  }

  return (
    <main className="container pb-20 pt-24">
      <Link
        to={ROUTES.SHOP}
        className="mb-8 inline-flex items-center text-sm font-medium text-muted-foreground transition-colors hover:text-primary"
      >
        <ChevronLeft className="mr-1 h-4 w-4" />
        Back to shop
      </Link>

      <div className="grid grid-cols-1 gap-12 lg:grid-cols-2">
        {/* Left: Images */}
        <div className="space-y-4">
          <div className="relative aspect-square overflow-hidden rounded-2xl bg-muted">
            <ImageLoader
              src={selectedImage}
              alt={product.name}
              className="h-full w-full object-cover"
            />
            {product.isFeatured && (
              <Badge className="absolute left-4 top-4 px-3 py-1 text-xs">
                Featured
              </Badge>
            )}
          </div>

          {product.imageCollection && product.imageCollection.length > 0 && (
            <div className="flex gap-4 overflow-x-auto pb-2 scrollbar-hide">
              <button
                onClick={() => setSelectedImage(product.image)}
                className={cn(
                  "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-muted transition-all",
                  selectedImage === product.image ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                )}
              >
                <ImageLoader src={product.image} alt={product.name} className="h-full w-full object-cover" />
              </button>
              {product.imageCollection.map((img, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(img)}
                  className={cn(
                    "relative h-20 w-20 flex-shrink-0 overflow-hidden rounded-lg border-2 bg-muted transition-all",
                    selectedImage === img ? "border-primary" : "border-transparent opacity-70 hover:opacity-100"
                  )}
                >
                  <ImageLoader src={img} alt={`${product.name} ${index + 1}`} className="h-full w-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right: Details */}
        <div className="flex flex-col">
          <div className="mb-6">
            <p className="mb-2 text-sm font-semibold uppercase tracking-wider text-muted-foreground">
              {product.brand}
            </p>
            <h1 className="mb-4 text-4xl font-bold tracking-tight lg:text-5xl">
              {product.name}
            </h1>
            <p className="text-2xl font-bold text-primary">
              {formatPrice(product.price)}
            </p>
          </div>

          <div className="mb-8 border-y py-8">
            <p className="leading-relaxed text-muted-foreground">
              {product.description}
            </p>
          </div>

          <div className="space-y-8">
            {/* Size Selector */}
            {product.availableSizes && product.availableSizes.length > 0 && (
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Select Size
                </label>
                <Select value={selectedSize} onValueChange={setSelectedSize}>
                  <SelectTrigger className="w-full sm:w-[240px]">
                    <SelectValue placeholder="Select a size" />
                  </SelectTrigger>
                  <SelectContent>
                    {product.availableSizes.map((size) => (
                      <SelectItem key={size} value={size}>
                        {size} mm
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            )}

            {/* Color Selector */}
            {product.availableColors && product.availableColors.length > 0 && (
              <div className="space-y-3">
                <label className="text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  Choose Color
                </label>
                <ColorChooser
                  availableColors={product.availableColors}
                  onSelectedColorChange={setSelectedColor}
                />
              </div>
            )}

            {/* Add to Cart */}
            <div className="pt-4">
              <Button
                size="lg"
                className="h-14 w-full px-8 text-base sm:w-auto"
                onClick={handleAddToCart}
                disabled={isItemInCart}
              >
                {isItemInCart ? (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    Added to Basket
                  </>
                ) : (
                  <>
                    <ShoppingBag className="mr-2 h-5 w-5" />
                    Add to Basket
                  </>
                )}
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Recommended Section */}
      <div className="mt-32">
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="mb-2 text-3xl font-bold tracking-tight">Recommended</h2>
            <p className="text-muted-foreground">You might also like these products.</p>
          </div>
          <Link
            to={ROUTES.RECOMMENDED}
            className="text-sm font-bold uppercase tracking-wider text-primary hover:underline"
          >
            See All
          </Link>
        </div>
        <ProductShowcaseGrid
          products={recommended}
          isLoading={isLoadingRecommended}
          skeletonCount={4}
        />
      </div>
    </main>
  );
}

// Utility class merge (already in src/lib/utils.ts, but imported here for local usage if needed)
function cn(...inputs: any[]) {
  return inputs.filter(Boolean).join(" ");
}
