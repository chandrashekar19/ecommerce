import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

export interface ShippingDetails {
  fullname: string;
  email: string;
  address: string;
  mobile: {
    country: string;
    countryCode: string;
    dialCode: string;
    value: string;
  };
  isInternational: boolean;
}

export interface PaymentDetails {
  type: "paypal" | "credit-card";
  name: string;
  cardnumber: string;
  expiry: string;
  ccv: string;
}

interface CheckoutStore {
  shipping: ShippingDetails | null;
  payment: PaymentDetails | null;
  isDone: boolean;

  setShipping: (details: ShippingDetails) => void;
  setPayment: (details: PaymentDetails) => void;
  setDone: (isDone: boolean) => void;
  resetCheckout: () => void;
}

export const useCheckoutStore = create<CheckoutStore>()(
  persist(
    (set) => ({
      shipping: null,
      payment: null,
      isDone: false,

      setShipping: (shipping) => set({ shipping }),
      setPayment: (payment) => set({ payment }),
      setDone: (isDone) => set({ isDone }),
      resetCheckout: () => set({ shipping: null, payment: null, isDone: false }),
    }),
    {
      name: "checkout-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);
