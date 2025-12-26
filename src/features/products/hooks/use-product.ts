import { useQuery } from "@tanstack/react-query";
import { productService } from "@/lib/firebase/firestore";

export function useProduct(id: string | undefined) {
  return useQuery({
    queryKey: ["product", id],
    queryFn: () => (id ? productService.getSingleProduct(id) : null),
    enabled: !!id,
  });
}
