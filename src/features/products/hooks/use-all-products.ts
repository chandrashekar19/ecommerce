import { useQuery } from "@tanstack/react-query";
import { productService } from "@/lib/firebase";

export function useAllProducts() {
  return useQuery({
    queryKey: ["products", "all"],
    queryFn: async () => {
      // For now, we fetch the first page. 
      // In a real admin panel, we might want to fetch all or handle pagination in the table.
      const result = await productService.getProducts();
      return result.products;
    },
  });
}
