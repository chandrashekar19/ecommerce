import { useNavigate, useParams } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";
import { ProductForm } from "@/features/admin/components/product-form";
import { productService, storageService } from "@/lib/firebase";
import { useDocumentTitle, useScrollTop } from "@/hooks";
import { useProduct } from "@/features/products/hooks";
import { toast } from "@/hooks/use-toast";
import { ROUTES } from "@/constants/routes";
import { useState } from "react";
import { FullPagePreloader, MessageDisplay } from "@/components/shared";

export default function EditProductPage() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const [isSaving, setIsSaving] = useState(false);

  const { data: product, isLoading, error } = useProduct(id || "");

  useScrollTop();
  useDocumentTitle(`Edit ${product?.name || "Product"} | Lumina Boutique Admin`);

  const handleSubmit = async (values: any, imageFile: File | null) => {
    if (!id) return;

    setIsSaving(true);
    try {
      let imageUrl = product?.image;

      // 1. If a new image was uploaded, process it
      if (imageFile) {
        imageUrl = await storageService.uploadImage(id, "products", imageFile);
      }

      // 2. Prepare update data
      const updates = {
        ...values,
        image: imageUrl,
        nameLower: values.name.toLowerCase(),
      };

      // 3. Update Firestore
      await productService.updateProduct(id, updates);

      toast({
        title: "Product Updated",
        description: `${values.name} has been successfully updated.`,
      });

      // 4. Invalidate queries and navigate
      queryClient.invalidateQueries({ queryKey: ["products"] });
      queryClient.invalidateQueries({ queryKey: ["product", id] });
      navigate(ROUTES.ADMIN_PRODUCTS);
    } catch (error) {
      console.error("Error updating product:", error);
      toast({
        title: "Error",
        description: "Failed to update product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) return <FullPagePreloader />;

  if (error || !product) {
    return (
      <MessageDisplay
        message="Product not found or an error occurred."
        buttonLabel="Back to Products"
        onAction={() => navigate(ROUTES.ADMIN_PRODUCTS)}
      />
    );
  }

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">Edit Product</h1>
        <p className="text-muted-foreground">Modify the details for <span className="text-foreground font-bold">{product.name}</span>.</p>
      </div>

      <ProductForm initialData={product} onSubmit={handleSubmit} isLoading={isSaving} />
    </div>
  );
}
