import { useNavigate, Link } from "react-router-dom";
import { ShoppingBag, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { useCartStore } from "@/features/cart/stores/cart-store";
import { CartItem } from "@/features/cart/components/cart-item";
import { StepTracker } from "@/features/checkout/components/step-tracker";
import { useDocumentTitle, useScrollTop } from "@/hooks";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

export default function CheckoutStep1() {
  const navigate = useNavigate();
  const { items, total, removeItem, updateQuantity } = useCartStore();
  const subtotal = total();

  useScrollTop();
  useDocumentTitle("Checkout Step 1 | Lumina Boutique");

  if (items.length === 0) {
    return (
      <main className="container pb-20 pt-24">
        <div className="flex flex-col items-center justify-center py-20 text-center">
          <ShoppingBag className="mb-6 h-16 w-16 text-muted-foreground" />
          <h2 className="mb-2 text-2xl font-bold">Your basket is empty</h2>
          <p className="mb-8 text-muted-foreground">Add some items before checking out.</p>
          <Button asChild>
            <Link to={ROUTES.SHOP}>Shop Now</Link>
          </Button>
        </div>
      </main>
    );
  }

  return (
    <main className="container pb-20 pt-24">
      <StepTracker currentStep={1} />

      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Order Summary</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-xs mt-2 font-bold">Step 1 of 3</p>
        </div>

        <div className="grid grid-cols-1 gap-12 lg:grid-cols-3">
          {/* Item List */}
          <div className="lg:col-span-2 space-y-4">
            {items.map((item) => (
              <CartItem
                key={`${item.id}-${item.selectedColor}-${item.selectedSize}`}
                item={item}
                onRemove={removeItem}
                onUpdateQuantity={updateQuantity}
              />
            ))}
          </div>

          {/* Summary Card */}
          <div className="space-y-6">
            <div className="rounded-2xl border bg-muted/30 p-6">
              <h2 className="mb-6 text-lg font-bold">Basket Total</h2>
              <div className="space-y-4">
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Subtotal</span>
                  <span className="font-semibold">{formatPrice(subtotal)}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-muted-foreground">Shipping</span>
                  <span className="font-semibold italic">Calculated next step</span>
                </div>
                <Separator />
                <div className="flex justify-between text-xl font-bold">
                  <span>Grand Total</span>
                  <span className="text-primary">{formatPrice(subtotal)}</span>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-3">
              <Button
                size="lg"
                className="w-full h-14 text-base"
                onClick={() => navigate(ROUTES.CHECKOUT_STEP_2)}
              >
                Next Step
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                variant="ghost"
                className="w-full h-12 text-muted-foreground"
                asChild
              >
                <Link to={ROUTES.SHOP}>Continue Shopping</Link>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
