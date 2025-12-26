export * from "./product";
export * from "./user";

// Common types
export interface PaginatedResponse<T> {
  items: T[];
  lastKey: string | null;
  total?: number;
}

export interface AsyncState<T> {
  data: T | null;
  isLoading: boolean;
  error: string | null;
}

export type SortOrder = "asc" | "desc";

export interface SelectOption {
  value: string;
  label: string;
}
