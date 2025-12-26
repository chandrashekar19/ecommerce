import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, Check, CreditCard } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Separator } from "@/components/ui/separator";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useCartStore } from "@/features/cart/stores/cart-store";
import { useCheckoutStore } from "@/features/checkout/stores/checkout-store";
import { StepTracker } from "@/features/checkout/components/step-tracker";
import { useDocumentTitle, useScrollTop } from "@/hooks";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { toast } from "@/hooks/use-toast";

const paymentSchema = z.object({
  type: z.enum(["paypal", "credit-card"]),
  name: z.string().min(4, "Name on card is required"),
  cardnumber: z.string().min(13, "Invalid card number").max(19),
  expiry: z.string().min(5, "Expiry date required"),
  ccv: z.string().min(3, "CVV required").max(4),
});

type PaymentFormValues = z.infer<typeof paymentSchema>;

export default function CheckoutStep3() {
  const navigate = useNavigate();
  const { total, clearCart } = useCartStore();
  const { shipping, payment, setPayment, setDone } = useCheckoutStore();
  const subtotal = total();

  useScrollTop();
  useDocumentTitle("Checkout Final Step | Lumina Boutique");

  const form = useForm<PaymentFormValues>({
    resolver: zodResolver(paymentSchema),
    defaultValues: {
      type: payment?.type || "credit-card",
      name: payment?.name || "",
      cardnumber: payment?.cardnumber || "",
      expiry: payment?.expiry || "",
      ccv: payment?.ccv || "",
    },
  });

  const paymentType = form.watch("type");
  const shippingFee = shipping?.isInternational ? 50 : 0;
  const grandTotal = subtotal + shippingFee;

  const onSubmit = (values: PaymentFormValues) => {
    setPayment(values);
    setDone(true);
    toast({
      title: "Order Placed Successfully!",
      description: "Thank you for your purchase.",
    });
    clearCart();
    navigate(ROUTES.HOME); // Or an order success page if implemented
  };

  if (!shipping) {
    navigate(ROUTES.CHECKOUT_STEP_2);
    return null;
  }

  return (
    <main className="container pb-20 pt-24">
      <StepTracker currentStep={3} />

      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Payment</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-xs mt-2 font-bold">Final Step</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Payment Options */}
            <div className="lg:col-span-2 space-y-8">
              <FormField
                control={form.control}
                name="type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Payment Method</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="grid grid-cols-1 md:grid-cols-2 gap-4"
                      >
                        <Label
                          className={`flex items-center justify-between rounded-2xl border-2 p-6 cursor-pointer transition-all ${field.value === "credit-card" ? "border-primary bg-primary/5" : "border-muted hover:border-muted-foreground/30"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="credit-card" />
                            <div>
                              <p className="font-bold">Credit Card</p>
                              <p className="text-xs text-muted-foreground mt-1 text-left">Visa, Mastercard, AMEX</p>
                            </div>
                          </div>
                          <CreditCard className="h-6 w-6 text-muted-foreground" />
                        </Label>

                        <Label
                          className={`flex items-center justify-between rounded-2xl border-2 p-6 cursor-pointer opacity-50 transition-all ${field.value === "paypal" ? "border-primary bg-primary/5" : "border-muted"
                            }`}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem value="paypal" disabled />
                            <div>
                              <p className="font-bold">PayPal</p>
                              <p className="text-xs text-muted-foreground mt-1 text-left">Not ready yet :)</p>
                            </div>
                          </div>
                          <div className="h-6 w-6 bg-blue-500 rounded flex items-center justify-center text-[10px] text-white font-bold">PP</div>
                        </Label>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {paymentType === "credit-card" && (
                <div className="space-y-6 rounded-2xl border p-8 bg-muted/20 animate-in fade-in slide-in-from-top-4 duration-300">
                  <h3 className="font-bold text-lg mb-4">Card Information</h3>

                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name on Card</FormLabel>
                        <FormControl>
                          <Input placeholder="Enter name as it appears on card" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="cardnumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Card Number</FormLabel>
                        <FormControl>
                          <Input placeholder="0000 0000 0000 0000" maxLength={19} {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-2 gap-6">
                    <FormField
                      control={form.control}
                      name="expiry"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Expiry Date</FormLabel>
                          <FormControl>
                            <Input placeholder="MM/YY" {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={form.control}
                      name="ccv"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>CVV</FormLabel>
                          <FormControl>
                            <Input placeholder="***" maxLength={4} {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Summary & Actions */}
            <div className="space-y-6">
              <div className="rounded-2xl border bg-muted/30 p-6">
                <h2 className="mb-6 text-lg font-bold">Final Total</h2>
                <div className="space-y-4">
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Subtotal</span>
                    <span className="font-semibold">{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-muted-foreground">Shipping</span>
                    <span className="font-semibold">{formatPrice(shippingFee)}</span>
                  </div>
                  <Separator />
                  <div className="flex justify-between text-2xl font-bold">
                    <span>Total</span>
                    <span className="text-primary">{formatPrice(grandTotal)}</span>
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-3">
                <Button
                  type="submit"
                  size="lg"
                  className="w-full h-14 text-base"
                >
                  <Check className="mr-2 h-5 w-5" />
                  Confirm Order
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full h-12 text-muted-foreground"
                  onClick={() => navigate(ROUTES.CHECKOUT_STEP_2)}
                >
                  <ArrowLeft className="mr-2 h-4 w-4" />
                  Go Back
                </Button>
              </div>
            </div>
          </form>
        </Form>
      </div>
    </main>
  );
}
