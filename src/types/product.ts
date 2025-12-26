export interface Product {
  id: string;
  name: string;
  nameLower: string;
  brand: string;
  price: number;
  description: string;
  image: string;
  imageCollection?: string[];
  isFeatured: boolean;
  isRecommended: boolean;
  availableColors: string[];
  availableSizes: string[];
  quantity: number;
  maxQuantity: number;
  keywords: string[];
  category: string;
  dateAdded: number;
}

export interface ProductFilters {
  minPrice: number;
  maxPrice: number;
  sortBy: "price-asc" | "price-desc" | "name" | "date";
  brand?: string;
}

export interface CartItem {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  selectedColor: string;
  selectedSize: string;
}

export interface ProductsState {
  items: Product[];
  lastKey: string | null;
  total: number;
  isLoading: boolean;
  error: string | null;
}

export interface SearchResult {
  products: Product[];
  lastKey: string | null;
}
