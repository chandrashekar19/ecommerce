import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UserProfile } from "@/features/account/components/user-profile";
import { useDocumentTitle, useScrollTop } from "@/hooks";
import { User, Heart, ShoppingBag } from "lucide-react";

export default function AccountPage() {
  useScrollTop();
  useDocumentTitle("My Account | Lumina Boutique");

  return (
    <main className="container pb-20 pt-24">
      <div className="mb-12">
        <h1 className="mb-2 text-3xl font-bold tracking-tight">Settings</h1>
        <p className="text-muted-foreground">Manage your account settings and preferences.</p>
      </div>

      <Tabs defaultValue="account" className="space-y-12">
        <TabsList className="inline-flex h-12 items-center justify-start rounded-none border-b bg-transparent p-0">
          <TabsTrigger
            value="account"
            className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-8 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            <User className="mr-2 h-4 w-4" />
            Account
          </TabsTrigger>
          <TabsTrigger
            value="wishlist"
            className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-8 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            <Heart className="mr-2 h-4 w-4" />
            My Wish List
          </TabsTrigger>
          <TabsTrigger
            value="orders"
            className="relative h-12 rounded-none border-b-2 border-b-transparent bg-transparent px-8 pb-3 pt-2 font-semibold text-muted-foreground shadow-none transition-none data-[state=active]:border-b-primary data-[state=active]:text-foreground data-[state=active]:shadow-none"
          >
            <ShoppingBag className="mr-2 h-4 w-4" />
            My Orders
          </TabsTrigger>
        </TabsList>

        <TabsContent value="account" className="space-y-4">
          <UserProfile />
        </TabsContent>

        <TabsContent value="wishlist">
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted py-24 text-center">
            <Heart className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold">Your wish list is empty</h3>
            <p className="text-muted-foreground">Start adding items you love to save them for later.</p>
          </div>
        </TabsContent>

        <TabsContent value="orders">
          <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-muted py-24 text-center">
            <ShoppingBag className="mb-4 h-12 w-12 text-muted-foreground" />
            <h3 className="mb-2 text-xl font-semibold">No orders yet</h3>
            <p className="text-muted-foreground">Once you place an order, it will appear here.</p>
          </div>
        </TabsContent>
      </Tabs>
    </main>
  );
}
