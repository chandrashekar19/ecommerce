import { useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ProductForm } from "@/features/admin/components/product-form";
import { productService, storageService } from "@/lib/firebase";
import { useDocumentTitle, useScrollTop } from "@/hooks";
import { toast } from "@/hooks/use-toast";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";

export default function AddProductPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isLoading, setIsLoading] = useState(false);

  useScrollTop();
  useDocumentTitle("Add New Product | Lumina Boutique Admin");

  const handleSubmit = async (values: any, imageFile: File | null) => {
    if (!imageFile) {
      toast({
        title: "Image Required",
        description: "Please upload a primary image for the product.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);
    try {
      const id = productService.generateId();

      // 1. Upload image
      const imageUrl = await storageService.uploadImage(id, "products", imageFile);

      // 2. Prepare product data
      const newProduct = {
        ...values,
        id,
        image: imageUrl,
        nameLower: values.name.toLowerCase(),
        dateAdded: Date.now(),
        quantity: 1, // Default initial quantity
      };

      // 3. Save to Firestore
      await productService.addProduct(newProduct);

      toast({
        title: "Product Added",
        description: `${values.name} has been successfully added to inventory.`,
      });

      // 4. Invalidate queries and navigate
      queryClient.invalidateQueries({ queryKey: ["products"] });
      navigate(ROUTES.ADMIN_PRODUCTS);
    } catch (error) {
      console.error("Error adding product:", error);
      toast({
        title: "Error",
        description: "Failed to add product. Please check your connection and try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Add New Product</h1>
        <p className="text-muted-foreground">Fill in the details below to publish a new items to your store.</p>
      </div>

      <ProductForm onSubmit={handleSubmit} isLoading={isLoading} />
    </div>
  );
}
