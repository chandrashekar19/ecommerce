import { Minus, Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ImageLoader } from "@/components/shared/image-loader";
import { formatPrice } from "@/lib/utils";
import { CartItem as CartItemType } from "@/types/product";

interface CartItemProps {
  item: CartItemType;
  onRemove: (id: string) => void;
  onUpdateQuantity: (id: string, quantity: number) => void;
  showControls?: boolean;
}

export function CartItem({
  item,
  onRemove,
  onUpdateQuantity,
  showControls = true,
}: CartItemProps) {
  return (
    <div className="flex gap-4 p-4 rounded-xl border bg-card transition-all hover:shadow-md">
      {/* Item Image */}
      <ImageLoader
        src={item.image}
        alt={item.name}
        className="w-24 h-24 rounded-lg flex-shrink-0 object-cover bg-muted"
      />

      {/* Item Details */}
      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div>
          <div className="flex justify-between items-start gap-2">
            <h3 className="font-bold text-lg truncate">{item.name}</h3>
            <p className="font-bold text-primary">
              {formatPrice(item.price * item.quantity)}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-3 mt-1 text-sm text-muted-foreground font-medium">
            {item.selectedColor && (
              <span className="flex items-center gap-1.5 bg-muted px-2 py-0.5 rounded-full border">
                <span
                  className="w-2.5 h-2.5 rounded-full border border-black/10"
                  style={{ backgroundColor: item.selectedColor }}
                />
                {item.selectedColor}
              </span>
            )}
            {item.selectedSize && (
              <span className="bg-muted px-2 py-0.5 rounded-full border">
                Size: {item.selectedSize} mm
              </span>
            )}
            <span className="text-muted-foreground/60">
              {formatPrice(item.price)} x {item.quantity}
            </span>
          </div>
        </div>

        {/* Action Controls */}
        {showControls && (
          <div className="flex items-center justify-between mt-3 pt-3 border-t">
            <div className="flex items-center bg-muted rounded-lg p-1">
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md hover:bg-background"
                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
              >
                <Minus className="h-3.5 w-3.5" />
              </Button>
              <span className="w-10 text-center text-sm font-bold">
                {item.quantity}
              </span>
              <Button
                variant="ghost"
                size="icon"
                className="h-8 w-8 rounded-md hover:bg-background"
                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
              >
                <Plus className="h-3.5 w-3.5" />
              </Button>
            </div>

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 text-destructive hover:text-destructive hover:bg-destructive/10"
              onClick={() => onRemove(item.id)}
            >
              <Trash2 className="h-4 w-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
