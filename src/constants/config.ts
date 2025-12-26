// Application configuration constants
export const APP_CONFIG = {
  name: "Lumina Boutique",
  version: "2.0.0",
  description: "Premium E-commerce Boutique",

  // Pagination
  productsPerPage: 12,

  // Image defaults
  defaultAvatar: "/images/default-avatar.jpg",
  defaultBanner: "/images/default-banner.jpg",
  defaultProductImage: "/images/default-product.jpg",

  // Price range
  minPrice: 0,
  maxPrice: 1000,

  // Checkout
  shippingFee: 0,
  internationalShippingFee: 50,

  // Timeouts
  requestTimeout: 15000,
  debounceDelay: 300,
} as const;

// Action types for state management
export const ACTION_TYPES = {
  LOADING: "LOADING",
  SUCCESS: "SUCCESS",
  ERROR: "ERROR",
  RESET: "RESET",
} as const;

// User roles
export const USER_ROLES = {
  ADMIN: "ADMIN",
  USER: "USER",
} as const;

// Sort options
export const SORT_OPTIONS = [
  { value: "name", label: "Name A-Z" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "date", label: "Newest First" },
] as const;
