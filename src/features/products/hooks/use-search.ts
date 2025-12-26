import { useQuery } from "@tanstack/react-query";
import { productService } from "@/lib/firebase/firestore";

export function useSearchProducts(searchKey: string | undefined) {
  return useQuery({
    queryKey: ["products", "search", searchKey],
    queryFn: () => (searchKey ? productService.searchProducts(searchKey) : []),
    enabled: !!searchKey,
  });
}
