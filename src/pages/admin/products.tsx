import { useNavigate } from "react-router-dom";
import {
  Plus,
  Search,
  MoreHorizontal,
  Edit2,
  Trash2,
  Eye,
  ShoppingBag
} from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { useDocumentTitle, useScrollTop } from "@/hooks";
import { useAllProducts } from "@/features/products/hooks";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";
import { productService } from "@/lib/firebase";
import { useState } from "react";
import { toast } from "@/hooks/use-toast";
import { useQueryClient } from "@tanstack/react-query";

export default function AdminProductsPage() {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { data: products, isLoading } = useAllProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [productToDelete, setProductToDelete] = useState<string | null>(null);
  const [isDeleting, setIsDeleting] = useState(false);

  useScrollTop();
  useDocumentTitle("Manage Products | Lumina Boutique Admin");

  const filteredProducts = products?.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    product.brand.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = async () => {
    if (!productToDelete) return;
    setIsDeleting(true);
    try {
      await productService.deleteProduct(productToDelete);
      toast({
        title: "Product Deleted",
        description: "The product has been successfully removed from inventory.",
      });
      queryClient.invalidateQueries({ queryKey: ["products"] });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to delete product. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsDeleting(false);
      setProductToDelete(null);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Products</h1>
          <p className="text-muted-foreground">Manage your product catalog and inventory.</p>
        </div>
        <Button
          onClick={() => navigate(ROUTES.ADD_PRODUCT)}
          className="h-12 px-6 rounded-xl shadow-lg shadow-primary/20"
        >
          <Plus className="mr-2 h-5 w-5" />
          Add New Product
        </Button>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1 max-w-sm">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search products by name or brand..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12 rounded-xl border-muted-foreground/20"
          />
        </div>
        <div className="text-sm text-muted-foreground font-medium">
          Showing {filteredProducts?.length || 0} products
        </div>
      </div>

      <div className="rounded-2xl border bg-muted/30 overflow-hidden shadow-sm">
        <Table>
          <TableHeader className="bg-muted/50">
            <TableRow className="hover:bg-transparent border-muted-foreground/10">
              <TableHead className="w-[100px] font-bold text-xs uppercase tracking-wider text-muted-foreground">Image</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Product Details</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground">Category/Brand</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-right">Price</TableHead>
              <TableHead className="font-bold text-xs uppercase tracking-wider text-muted-foreground text-center">Stock</TableHead>
              <TableHead className="w-[80px]"></TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {isLoading ? (
              [1, 2, 3, 4, 5].map((i) => (
                <TableRow key={i} className="animate-pulse border-muted-foreground/10">
                  <TableCell><div className="h-12 w-12 rounded bg-muted-foreground/10" /></TableCell>
                  <TableCell><div className="h-4 w-48 rounded bg-muted-foreground/10 mb-2" /><div className="h-3 w-24 rounded bg-muted-foreground/10" /></TableCell>
                  <TableCell><div className="h-4 w-32 rounded bg-muted-foreground/10" /></TableCell>
                  <TableCell><div className="ml-auto h-4 w-20 rounded bg-muted-foreground/10" /></TableCell>
                  <TableCell><div className="mx-auto h-4 w-12 rounded bg-muted-foreground/10" /></TableCell>
                  <TableCell><div className="h-8 w-8 rounded bg-muted-foreground/10" /></TableCell>
                </TableRow>
              ))
            ) : filteredProducts?.length === 0 ? (
              <TableRow>
                <TableCell colSpan={6} className="h-64 text-center">
                  <div className="flex flex-col items-center justify-center gap-2 text-muted-foreground">
                    <ShoppingBag className="h-12 w-12 opacity-20" />
                    <p className="text-lg font-medium">No products found</p>
                    <p className="text-sm">Try adjusting your search or add a new product.</p>
                  </div>
                </TableCell>
              </TableRow>
            ) : (
              filteredProducts?.map((product) => (
                <TableRow key={product.id} className="hover:bg-background/50 border-muted-foreground/10 transition-colors group">
                  <TableCell>
                    <div className="h-12 w-12 overflow-hidden rounded-lg bg-white border shadow-sm group-hover:scale-110 transition-transform">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="h-full w-full object-contain"
                      />
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="font-bold text-foreground">{product.name}</div>
                    <div className="text-xs text-muted-foreground mt-1">ID: {product.id}</div>
                  </TableCell>
                  <TableCell>
                    <div className="text-sm font-medium">{product.brand}</div>
                    <div className="text-xs text-muted-foreground uppercase tracking-widest">{product.category || 'Footwear'}</div>
                  </TableCell>
                  <TableCell className="text-right font-bold text-primary">
                    {formatPrice(product.price)}
                  </TableCell>
                  <TableCell className="text-center font-medium">
                    {product.maxQuantity || 0}
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-muted-foreground/10">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end" className="w-48 rounded-xl shadow-xl">
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem onClick={() => navigate(`/product/${product.id}`)}>
                          <Eye className="mr-2 h-4 w-4 text-muted-foreground" />
                          View Page
                        </DropdownMenuItem>
                        <DropdownMenuItem onClick={() => navigate(`/admin/products/edit/${product.id}`)}>
                          <Edit2 className="mr-2 h-4 w-4 text-muted-foreground" />
                          Edit Details
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          className="text-destructive focus:bg-destructive/10 focus:text-destructive"
                          onClick={() => setProductToDelete(product.id)}
                        >
                          <Trash2 className="mr-2 h-4 w-4" />
                          Delete Product
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <AlertDialog open={!!productToDelete} onOpenChange={(open) => !open && setProductToDelete(null)}>
        <AlertDialogContent className="rounded-2xl">
          <AlertDialogHeader>
            <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product
              and remove its data from our records.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel disabled={isDeleting} className="rounded-xl">Cancel</AlertDialogCancel>
            <AlertDialogAction
              onClick={(e) => {
                e.preventDefault();
                handleDelete();
              }}
              disabled={isDeleting}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90 rounded-xl"
            >
              {isDeleting ? "Deleting..." : "Confirm Delete"}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
