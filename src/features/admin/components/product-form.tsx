import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import {
  X,
  ImageIcon,
  Check,
  Loader2
} from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Product } from "@/types/product";
import { useFileHandler } from "@/hooks";
import { useState } from "react";

const productSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characters"),
  brand: z.string().min(1, "Brand is required"),
  price: z.coerce.number().min(1, "Price must be greater than 0"),
  category: z.string().min(1, "Category is required"),
  maxQuantity: z.coerce.number().min(1, "Available stock is required"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  isFeatured: z.boolean().default(false),
  isRecommended: z.boolean().default(false),
  keywords: z.array(z.string()).min(1, "At least one keyword is required"),
  availableColors: z.array(z.string()).min(1, "At least one color is required"),
  availableSizes: z.array(z.string()).min(1, "At least one size is required"),
});

type ProductFormValues = z.infer<typeof productSchema>;

interface ProductFormProps {
  initialData?: Product;
  onSubmit: (values: ProductFormValues, imageFile: File | null) => Promise<void>;
  isLoading?: boolean;
}

export function ProductForm({ initialData, onSubmit, isLoading }: ProductFormProps) {
  const [keywordInput, setKeywordInput] = useState("");
  const [colorInput, setColorInput] = useState("#000000");
  const [sizeInput, setSizeInput] = useState("");

  const { files, onFileChange, removeFile, isLoading: isFileLoading } = useFileHandler({
    avatar: { file: null, url: initialData?.image || "" },
  });

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      brand: initialData.brand,
      price: initialData.price,
      category: initialData.category,
      maxQuantity: initialData.maxQuantity,
      description: initialData.description,
      isFeatured: initialData.isFeatured,
      isRecommended: initialData.isRecommended,
      keywords: initialData.keywords || [],
      availableColors: initialData.availableColors || [],
      availableSizes: initialData.availableSizes || [],
    } : {
      name: "",
      brand: "",
      price: 0,
      category: "Footwear",
      maxQuantity: 1,
      description: "",
      isFeatured: false,
      isRecommended: false,
      keywords: [],
      availableColors: [],
      availableSizes: [],
    },
  });

  const handleSubmit = (values: ProductFormValues) => {
    onSubmit(values, files.avatar.file);
  };

  const addTag = (field: "keywords" | "availableColors" | "availableSizes", value: string) => {
    if (!value.trim()) return;
    const current = form.getValues(field);
    if (!current.includes(value)) {
      form.setValue(field, [...current, value], { shouldValidate: true });
    }
  };

  const removeTag = (field: "keywords" | "availableColors" | "availableSizes", index: number) => {
    const current = form.getValues(field);
    form.setValue(field, current.filter((_, i) => i !== index), { shouldValidate: true });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(handleSubmit)} className="grid gap-8 lg:grid-cols-3">
        {/* Left Column: Main Details */}
        <div className="lg:col-span-2 space-y-8">
          <div className="rounded-2xl border bg-muted/30 p-6 space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">1</span>
              Basic Information
            </h3>

            <div className="grid gap-6 md:grid-cols-2">
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Product Name</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Premium Leather Sneakers" className="h-12 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g. Lumina Boutique" className="h-12 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Tell customers about this product..."
                      className="min-h-[150px] rounded-xl resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid gap-6 md:grid-cols-3">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input type="number" className="h-12 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <FormControl>
                      <Input className="h-12 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="maxQuantity"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Count</FormLabel>
                    <FormControl>
                      <Input type="number" className="h-12 rounded-xl" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Attributes Section */}
          <div className="rounded-2xl border bg-muted/30 p-6 space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">2</span>
              Attributes & SEO
            </h3>

            {/* Keywords */}
            <div className="space-y-4">
              <FormLabel>Keywords (Press Enter to add)</FormLabel>
              <div className="flex gap-2">
                <Input
                  placeholder="e.g. running, leather, premium"
                  value={keywordInput}
                  onChange={(e) => setKeywordInput(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter') {
                      e.preventDefault();
                      addTag("keywords", keywordInput);
                      setKeywordInput("");
                    }
                  }}
                  className="h-11 rounded-xl"
                />
                <Button
                  type="button"
                  variant="secondary"
                  onClick={() => {
                    addTag("keywords", keywordInput);
                    setKeywordInput("");
                  }}
                  className="h-11 rounded-xl"
                >
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2 min-h-[40px] p-2 rounded-xl bg-background border">
                {form.watch("keywords").map((tag, i) => (
                  <Badge key={i} variant="secondary" className="px-3 py-1.5 rounded-lg gap-1.5">
                    {tag}
                    <X className="h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeTag("keywords", i)} />
                  </Badge>
                ))}
              </div>
              <FormMessage>{form.formState.errors.keywords?.message}</FormMessage>
            </div>

            <div className="grid gap-8 md:grid-cols-2">
              {/* Colors */}
              <div className="space-y-4">
                <FormLabel>Available Colors</FormLabel>
                <div className="flex gap-2">
                  <div className="h-11 w-11 rounded-xl border p-0.5 shrink-0">
                    <input
                      type="color"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      className="h-full w-full cursor-pointer rounded-lg border-none"
                    />
                  </div>
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => addTag("availableColors", colorInput)}
                    className="h-11 w-full rounded-xl"
                  >
                    Add Color
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[40px] p-2 rounded-xl bg-background border">
                  {form.watch("availableColors").map((color, i) => (
                    <div key={i} className="group relative flex h-8 items-center gap-1 overflow-hidden rounded-full border px-1 pr-2 transition-all hover:pr-8">
                      <div className="h-6 w-6 rounded-full border shadow-sm" style={{ backgroundColor: color }} />
                      <span className="text-[10px] font-bold uppercase">{color}</span>
                      <X
                        className="absolute right-2 h-4 w-4 cursor-pointer text-muted-foreground opacity-0 hover:text-destructive group-hover:opacity-100"
                        onClick={() => removeTag("availableColors", i)}
                      />
                    </div>
                  ))}
                </div>
                <FormMessage>{form.formState.errors.availableColors?.message}</FormMessage>
              </div>

              {/* Sizes */}
              <div className="space-y-4">
                <FormLabel>Available Sizes</FormLabel>
                <div className="flex gap-2">
                  <Input
                    placeholder="e.g. 42, XL, 10"
                    value={sizeInput}
                    onChange={(e) => setSizeInput(e.target.value)}
                    className="h-11 rounded-xl"
                  />
                  <Button
                    type="button"
                    variant="secondary"
                    onClick={() => {
                      addTag("availableSizes", sizeInput);
                      setSizeInput("");
                    }}
                    className="h-11 rounded-xl"
                  >
                    Add
                  </Button>
                </div>
                <div className="flex flex-wrap gap-2 min-h-[40px] p-2 rounded-xl bg-background border">
                  {form.watch("availableSizes").map((size, i) => (
                    <Badge key={i} variant="outline" className="px-4 py-1.5 rounded-lg border-primary/20 bg-primary/5 text-primary">
                      {size}
                      <X className="ml-2 h-3 w-3 cursor-pointer hover:text-destructive" onClick={() => removeTag("availableSizes", i)} />
                    </Badge>
                  ))}
                </div>
                <FormMessage>{form.formState.errors.availableSizes?.message}</FormMessage>
              </div>
            </div>
          </div>
        </div>

        {/* Right Column: Settings & Sidebar */}
        <div className="space-y-8">
          {/* Image Upload */}
          <div className="rounded-2xl border bg-muted/30 p-6 space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">3</span>
              Primary Image
            </h3>

            <div className="group relative aspect-square overflow-hidden rounded-2xl border-2 border-dashed border-muted-foreground/20 bg-background transition-colors hover:border-primary/50">
              {files.avatar.url ? (
                <>
                  <img src={files.avatar.url} alt="Preview" className="h-full w-full object-contain p-4" />
                  <div className="absolute inset-0 flex items-center justify-center bg-black/40 opacity-0 transition-opacity group-hover:opacity-100">
                    <Button
                      type="button"
                      variant="destructive"
                      size="sm"
                      onClick={() => removeFile("avatar")}
                      className="rounded-xl shadow-xl"
                    >
                      Remove & Replace
                    </Button>
                  </div>
                </>
              ) : (
                <div className="flex flex-col items-center justify-center h-full p-8 text-center space-y-4">
                  <div className="rounded-full bg-muted p-4">
                    <ImageIcon className="h-8 w-8 text-muted-foreground" />
                  </div>
                  <div>
                    <p className="text-sm font-bold">Click to upload image</p>
                    <p className="text-xs text-muted-foreground mt-1">PNG, JPG or WebP. Max 5MB</p>
                  </div>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={(e) => onFileChange(e, { name: "avatar" })}
                    className="absolute inset-0 cursor-pointer opacity-0"
                  />
                </div>
              )}
            </div>
            <p className="text-[10px] text-muted-foreground text-center italic">
              This image will be used in results and details page.
            </p>
          </div>

          {/* Visibility & Status */}
          <div className="rounded-2xl border bg-muted/30 p-6 space-y-6">
            <h3 className="text-lg font-bold flex items-center gap-2">
              <span className="flex h-6 w-6 items-center justify-center rounded-full bg-primary text-[10px] text-primary-foreground">4</span>
              Visibility
            </h3>

            <div className="space-y-4">
              <FormField
                control={form.control}
                name="isFeatured"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-xl border bg-background p-4 shadow-sm transition-all hover:shadow-md">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base font-bold">Featured Product</FormLabel>
                      <FormDescription className="text-xs">
                        Will appear in the Featured section on Homepage.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="isRecommended"
                render={({ field }) => (
                  <FormItem className="flex items-center justify-between rounded-xl border bg-background p-4 shadow-sm transition-all hover:shadow-md">
                    <div className="space-y-0.5">
                      <FormLabel className="text-base font-bold">Recommended</FormLabel>
                      <FormDescription className="text-xs">
                        Added to the scrolling recommendations.
                      </FormDescription>
                    </div>
                    <FormControl>
                      <Switch
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                    </FormControl>
                  </FormItem>
                )}
              />
            </div>
          </div>

          {/* Sticky Actions Bar */}
          <div className="sticky bottom-8 rounded-2xl border bg-primary/5 p-6 shadow-xl backdrop-blur-sm">
            <div className="flex flex-col gap-4">
              <Button
                type="submit"
                size="lg"
                className="h-14 rounded-xl text-lg font-bold shadow-lg shadow-primary/20"
                disabled={isLoading || isFileLoading}
              >
                {isLoading ? (
                  <>
                    <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                    Saving Changes...
                  </>
                ) : (
                  <>
                    <Check className="mr-2 h-5 w-5" />
                    {initialData ? "Update Product" : "Publish Product"}
                  </>
                )}
              </Button>
              <Button
                type="button"
                variant="outline"
                size="lg"
                className="h-12 rounded-xl border-muted-foreground/20"
                onClick={() => window.history.back()}
              >
                Discard Changes
              </Button>
            </div>
          </div>
        </div>
      </form>
    </Form>
  );
}
