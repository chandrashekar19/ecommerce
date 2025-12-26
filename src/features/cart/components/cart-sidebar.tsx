import { Link } from "react-router-dom";
import { ShoppingBag, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/features/cart/stores/cart-store";
import { CartItem } from "./cart-item";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function CartSidebar() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, total } =
    useCartStore();

  const cartTotal = total();

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black/50 z-50"
        onClick={closeCart}
      />

      {/* Sidebar */}
      <div
        className={cn(
          "fixed right-0 top-0 h-full w-full max-w-md bg-background z-50 shadow-xl",
          "flex flex-col transform transition-transform duration-300",
          isOpen ? "translate-x-0" : "translate-x-full"
        )}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            <ShoppingBag className="h-5 w-5" />
            Shopping Cart ({items.length})
          </h2>
          <Button variant="ghost" size="icon" onClick={closeCart}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-4">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <ShoppingBag className="h-16 w-16 text-muted-foreground mb-4" />
              <p className="text-lg font-medium">Your cart is empty</p>
              <p className="text-muted-foreground mt-1">
                Add some items to get started
              </p>
              <Button className="mt-6" onClick={closeCart} asChild>
                <Link to={ROUTES.SHOP}>Continue Shopping</Link>
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              {items.map((item) => (
                <CartItem
                  key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                  item={item}
                  onRemove={removeItem}
                  onUpdateQuantity={updateQuantity}
                />
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="border-t p-4 space-y-4">
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Subtotal</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Shipping</span>
                <span>Calculated at checkout</span>
              </div>
              <Separator />
              <div className="flex justify-between font-semibold">
                <span>Total</span>
                <span>{formatPrice(cartTotal)}</span>
              </div>
            </div>

            <Button className="w-full" size="lg" asChild onClick={closeCart}>
              <Link to={ROUTES.CHECKOUT_STEP_1}>Proceed to Checkout</Link>
            </Button>

            <Button
              variant="outline"
              className="w-full"
              onClick={closeCart}
              asChild
            >
              <Link to={ROUTES.SHOP}>Continue Shopping</Link>
            </Button>
          </div>
        )}
      </div>
    </>
  );
}
