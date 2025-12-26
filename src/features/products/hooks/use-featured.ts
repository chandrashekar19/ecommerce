import { useQuery } from "@tanstack/react-query";
import { productService } from "@/lib/firebase/firestore";

export function useFeaturedProducts(limitCount = 6) {
  return useQuery({
    queryKey: ["products", "featured", limitCount],
    queryFn: () => productService.getFeaturedProducts(limitCount),
  });
}
