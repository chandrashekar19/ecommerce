import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { ArrowLeft, ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
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
import { useAuthStore } from "@/features/auth/stores/auth-store";
import { useCheckoutStore } from "@/features/checkout/stores/checkout-store";
import { StepTracker } from "@/features/checkout/components/step-tracker";
import { useDocumentTitle, useScrollTop } from "@/hooks";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

const shippingSchema = z.object({
  fullname: z.string().min(2, "Full name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  address: z.string().min(5, "Address must be at least 5 characters"),
  mobile: z.string().min(8, "Invalid mobile number"),
  isInternational: z.boolean().default(false),
});

type ShippingFormValues = z.infer<typeof shippingSchema>;

export default function CheckoutStep2() {
  const navigate = useNavigate();
  const user = useAuthStore((state) => state.user);
  const { total } = useCartStore();
  const { shipping, setShipping } = useCheckoutStore();
  const subtotal = total();

  useScrollTop();
  useDocumentTitle("Checkout Step 2 | Lumina Boutique");

  const form = useForm<ShippingFormValues>({
    resolver: zodResolver(shippingSchema),
    defaultValues: {
      fullname: shipping?.fullname || user?.fullname || "",
      email: shipping?.email || user?.email || "",
      address: shipping?.address || user?.address?.address || "",
      mobile: shipping?.mobile?.value || user?.mobile?.value || "",
      isInternational: shipping?.isInternational || false,
    },
  });

  const isInternational = form.watch("isInternational");
  const shippingFee = isInternational ? 50 : 0;
  const grandTotal = subtotal + shippingFee;

  const onSubmit = (values: ShippingFormValues) => {
    setShipping({
      ...values,
      mobile: {
        country: "PH", // Default for now to match interface
        countryCode: "PH",
        dialCode: "+63",
        value: values.mobile,
      },
    });
    navigate(ROUTES.CHECKOUT_STEP_3);
  };

  return (
    <main className="container pb-20 pt-24">
      <StepTracker currentStep={2} />

      <div className="mx-auto max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold tracking-tight">Shipping Details</h1>
          <p className="text-muted-foreground uppercase tracking-widest text-xs mt-2 font-bold">Step 2 of 3</p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="grid grid-cols-1 gap-12 lg:grid-cols-3">
            {/* Form Fields */}
            <div className="lg:col-span-2 space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="fullname"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Full Name</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your full name" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="email"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Email Address</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter your email" {...field} />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>

              <FormField
                control={form.control}
                name="address"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Shipping Address</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter full shipping address" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="mobile"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Mobile Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter mobile number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="isInternational"
                render={({ field }) => (
                  <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-2xl border p-6 bg-muted/30">
                    <FormControl>
                      <Checkbox
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                    <div className="flex flex-1 items-center justify-between">
                      <div className="space-y-1 leading-none">
                        <FormLabel className="text-base font-bold">
                          International Shipping
                        </FormLabel>
                        <p className="text-sm text-muted-foreground">
                          Delivery within 7-14 business days.
                        </p>
                      </div>
                      <span className="font-bold text-lg">{formatPrice(50)}</span>
                    </div>
                  </FormItem>
                )}
              />
            </div>

            {/* Summary & Actions */}
            <div className="space-y-6">
              <div className="rounded-2xl border bg-muted/30 p-6">
                <h2 className="mb-6 text-lg font-bold">Order Summary</h2>
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
                  <div className="flex justify-between text-xl font-bold">
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
                  Next Step
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  className="w-full h-12 text-muted-foreground"
                  onClick={() => navigate(ROUTES.CHECKOUT_STEP_1)}
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
