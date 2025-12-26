import { useQuery } from "@tanstack/react-query";
import { productService } from "@/lib/firebase/firestore";

export function useRecommendedProducts(limitCount = 6) {
  return useQuery({
    queryKey: ["products", "recommended", limitCount],
    queryFn: () => productService.getRecommendedProducts(limitCount),
  });
}
