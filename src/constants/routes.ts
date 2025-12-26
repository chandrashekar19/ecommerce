// Route constants
export const ROUTES = {
  HOME: "/",
  SHOP: "/shop",
  SEARCH: "/search/:searchKey",
  FEATURED: "/featured",
  RECOMMENDED: "/recommended",
  FEATURED_PRODUCTS: "/featured",
  RECOMMENDED_PRODUCTS: "/recommended",
  VIEW_PRODUCT: "/product/:id",
  SIGNIN: "/signin",
  SIGNUP: "/signup",
  FORGOT_PASSWORD: "/forgot-password",
  ACCOUNT: "/account",
  ACCOUNT_EDIT: "/account/edit",
  CHECKOUT_STEP_1: "/checkout/step-1",
  CHECKOUT_STEP_2: "/checkout/step-2",
  CHECKOUT_STEP_3: "/checkout/step-3",
  ADMIN_DASHBOARD: "/admin/dashboard",
  ADMIN_PRODUCTS: "/admin/products",
  ADD_PRODUCT: "/admin/products/add",
  EDIT_PRODUCT: "/admin/products/edit",
} as const;

export type RouteKey = keyof typeof ROUTES;
export type RoutePath = (typeof ROUTES)[RouteKey];
