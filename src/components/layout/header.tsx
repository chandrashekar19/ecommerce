import { Link, useNavigate, useLocation } from "react-router-dom";
import { ShoppingCart, User, Menu, X, Search, LogOut } from "lucide-react";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuthStore } from "@/features/auth/stores/auth-store";
import { useCartStore } from "@/features/cart/stores/cart-store";
import { ROUTES } from "@/constants/routes";
import { cn } from "@/lib/utils";

export function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const { user, isAuthenticated, signOut } = useAuthStore();
  const { itemCount, openCart } = useCartStore();
  const cartItemCount = itemCount();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/search/${encodeURIComponent(searchQuery.trim())}`);
      setSearchQuery("");
    }
  };

  const handleSignOut = async () => {
    await signOut();
    navigate(ROUTES.HOME);
  };

  const isActive = (path: string) => location.pathname === path;

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between px-4">
        {/* Logo */}
        <Link to={ROUTES.HOME} className="flex items-center space-x-2">
          <img
            src="/images/logo-light.png"
            alt="Lumina Boutique"
            className="h-9 w-auto mix-blend-multiply"
          />
          <span className="hidden sm:inline-block font-bold text-xl tracking-tight">
            Lumina
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            to={ROUTES.HOME}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive(ROUTES.HOME) ? "text-primary" : "text-muted-foreground"
            )}
          >
            Home
          </Link>
          <Link
            to={ROUTES.SHOP}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive(ROUTES.SHOP) ? "text-primary" : "text-muted-foreground"
            )}
          >
            Shop
          </Link>
          <Link
            to={ROUTES.FEATURED_PRODUCTS}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive(ROUTES.FEATURED_PRODUCTS)
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Featured
          </Link>
          <Link
            to={ROUTES.RECOMMENDED_PRODUCTS}
            className={cn(
              "text-sm font-medium transition-colors hover:text-primary",
              isActive(ROUTES.RECOMMENDED_PRODUCTS)
                ? "text-primary"
                : "text-muted-foreground"
            )}
          >
            Recommended
          </Link>
        </nav>

        {/* Search Bar - Desktop */}
        <form onSubmit={handleSearch} className="hidden md:flex flex-1 max-w-md mx-6">
          <div className="relative w-full">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              type="search"
              placeholder="Search products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-10 pr-4"
            />
          </div>
        </form>

        {/* Right Actions */}
        <div className="flex items-center space-x-4">
          {/* Cart Button */}
          <Button
            variant="ghost"
            size="icon"
            className="relative"
            onClick={openCart}
          >
            <ShoppingCart className="h-5 w-5" />
            {cartItemCount > 0 && (
              <Badge
                variant="destructive"
                className="absolute -right-1 -top-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
              >
                {cartItemCount}
              </Badge>
            )}
          </Button>

          {/* Auth/User Menu */}
          {isAuthenticated && user ? (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src={user.avatar} alt={user.fullname} />
                    <AvatarFallback>
                      {user.fullname?.charAt(0)?.toUpperCase() || "U"}
                    </AvatarFallback>
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">
                      {user.fullname}
                    </p>
                    <p className="text-xs leading-none text-muted-foreground">
                      {user.email}
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem asChild>
                  <Link to={ROUTES.ACCOUNT}>
                    <User className="mr-2 h-4 w-4" />
                    Account
                  </Link>
                </DropdownMenuItem>
                {user.role === "ADMIN" && (
                  <DropdownMenuItem asChild>
                    <Link to={ROUTES.ADMIN_DASHBOARD}>Admin Dashboard</Link>
                  </DropdownMenuItem>
                )}
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleSignOut}>
                  <LogOut className="mr-2 h-4 w-4" />
                  Sign out
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          ) : (
            <div className="hidden md:flex items-center space-x-2">
              <Button variant="ghost" asChild>
                <Link to={ROUTES.SIGNIN}>Sign In</Link>
              </Button>
              <Button asChild>
                <Link to={ROUTES.SIGNUP}>Sign Up</Link>
              </Button>
            </div>
          )}

          {/* Mobile Menu Button */}
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-5 w-5" />
            ) : (
              <Menu className="h-5 w-5" />
            )}
          </Button>
        </div>
      </div>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="md:hidden border-t bg-background">
          <div className="container px-4 py-4 space-y-4">
            {/* Mobile Search */}
            <form onSubmit={handleSearch}>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search products..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="pl-10"
                />
              </div>
            </form>

            {/* Mobile Navigation Links */}
            <nav className="flex flex-col space-y-2">
              <Link
                to={ROUTES.HOME}
                className="py-2 text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link
                to={ROUTES.SHOP}
                className="py-2 text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Shop
              </Link>
              <Link
                to={ROUTES.FEATURED_PRODUCTS}
                className="py-2 text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Featured
              </Link>
              <Link
                to={ROUTES.RECOMMENDED_PRODUCTS}
                className="py-2 text-sm font-medium"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Recommended
              </Link>
            </nav>

            {/* Mobile Auth Buttons */}
            {!isAuthenticated && (
              <div className="flex flex-col space-y-2 pt-4 border-t">
                <Button variant="outline" asChild>
                  <Link to={ROUTES.SIGNIN}>Sign In</Link>
                </Button>
                <Button asChild>
                  <Link to={ROUTES.SIGNUP}>Sign Up</Link>
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
