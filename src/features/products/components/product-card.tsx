import { Link } from "react-router-dom";
import { ShoppingCart, Heart, Eye } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ImageLoader } from "@/components/shared/image-loader";
import { useCartStore } from "@/features/cart/stores/cart-store";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/types/product";

interface ProductCardProps {
  product: Product;
  className?: string;
}

export function ProductCard({ product, className }: ProductCardProps) {
  const { addItem, openCart } = useCartStore();

  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();

    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      quantity: 1,
      selectedColor: product.availableColors[0] || "",
      selectedSize: product.availableSizes[0] || "",
    });

    openCart();
  };

  return (
    <Card
      className={cn(
        "group overflow-hidden transition-all duration-300 hover:shadow-lg",
        className
      )}
    >
      <Link to={`/product/${product.id}`}>
        {/* Image Container */}
        <div className="relative aspect-square overflow-hidden bg-muted">
          <ImageLoader
            src={product.image}
            alt={product.name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-2 left-2 flex flex-col gap-1">
            {product.isFeatured && (
              <Badge variant="default">Featured</Badge>
            )}
            {product.isRecommended && (
              <Badge variant="secondary">Recommended</Badge>
            )}
          </div>

          {/* Quick Actions Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center gap-2">
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              onClick={handleAddToCart}
            >
              <ShoppingCart className="h-4 w-4" />
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              asChild
            >
              <Link to={`/product/${product.id}`}>
                <Eye className="h-4 w-4" />
              </Link>
            </Button>
            <Button
              variant="secondary"
              size="icon"
              className="rounded-full"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                // TODO: Add to wishlist functionality
              }}
            >
              <Heart className="h-4 w-4" />
            </Button>
          </div>
        </div>

        {/* Content */}
        <CardContent className="p-4">
          <p className="text-xs text-muted-foreground uppercase tracking-wide">
            {product.brand}
          </p>
          <h3 className="font-medium mt-1 line-clamp-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-bold">{formatPrice(product.price)}</p>
            {product.availableColors.length > 0 && (
              <div className="flex items-center gap-1">
                {product.availableColors.slice(0, 4).map((color) => (
                  <span
                    key={color}
                    className="w-3 h-3 rounded-full border border-gray-200"
                    style={{ backgroundColor: color }}
                    title={color}
                  />
                ))}
                {product.availableColors.length > 4 && (
                  <span className="text-xs text-muted-foreground">
                    +{product.availableColors.length - 4}
                  </span>
                )}
              </div>
            )}
          </div>
        </CardContent>
      </Link>
    </Card>
  );
}
