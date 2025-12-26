import { create } from "zustand";
import type { ProductFilters } from "@/types/product";
import { APP_CONFIG } from "@/constants/config";

interface FilterStore {
  // State
  filters: ProductFilters;
  isFilterOpen: boolean;

  // Actions
  setMinPrice: (price: number) => void;
  setMaxPrice: (price: number) => void;
  setPriceRange: (min: number, max: number) => void;
  setSortBy: (sortBy: ProductFilters["sortBy"]) => void;
  setBrand: (brand: string | undefined) => void;
  resetFilters: () => void;
  toggleFilter: () => void;
  openFilter: () => void;
  closeFilter: () => void;
}

const defaultFilters: ProductFilters = {
  minPrice: APP_CONFIG.minPrice,
  maxPrice: APP_CONFIG.maxPrice,
  sortBy: "date",
  brand: undefined,
};

export const useFilterStore = create<FilterStore>((set) => ({
  // Initial state
  filters: defaultFilters,
  isFilterOpen: false,

  // Set minimum price
  setMinPrice: (price: number) => {
    set((state) => ({
      filters: { ...state.filters, minPrice: price },
    }));
  },

  // Set maximum price
  setMaxPrice: (price: number) => {
    set((state) => ({
      filters: { ...state.filters, maxPrice: price },
    }));
  },

  // Set price range
  setPriceRange: (min: number, max: number) => {
    set((state) => ({
      filters: { ...state.filters, minPrice: min, maxPrice: max },
    }));
  },

  // Set sort option
  setSortBy: (sortBy: ProductFilters["sortBy"]) => {
    set((state) => ({
      filters: { ...state.filters, sortBy },
    }));
  },

  // Set brand filter
  setBrand: (brand: string | undefined) => {
    set((state) => ({
      filters: { ...state.filters, brand },
    }));
  },

  // Reset all filters
  resetFilters: () => {
    set({ filters: defaultFilters });
  },

  // Toggle filter panel
  toggleFilter: () => {
    set((state) => ({ isFilterOpen: !state.isFilterOpen }));
  },

  // Open filter panel
  openFilter: () => {
    set({ isFilterOpen: true });
  },

  // Close filter panel
  closeFilter: () => {
    set({ isFilterOpen: false });
  },
}));
