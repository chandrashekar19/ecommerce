import { Link } from "react-router-dom";
import { Github, Twitter } from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { ROUTES } from "@/constants/routes";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="border-t bg-background">
      <div className="container px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand */}
          <div className="space-y-4">
            <Link to={ROUTES.HOME} className="flex items-center space-x-2">
              <img
                src="/images/logo-light.png"
                alt="Lumina Boutique"
                className="h-9 w-auto mix-blend-multiply"
              />
              <span className="font-bold text-xl tracking-tight">Lumina</span>
            </Link>
            <p className="text-sm text-muted-foreground">
              Discover premium quality products at unbeatable prices. Your
              one-stop shop for all your needs.
            </p>
          </div>

          {/* Shop Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Shop</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                to={ROUTES.SHOP}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                All Products
              </Link>
              <Link
                to={ROUTES.FEATURED_PRODUCTS}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Featured
              </Link>
              <Link
                to={ROUTES.RECOMMENDED_PRODUCTS}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Recommended
              </Link>
            </nav>
          </div>

          {/* Account Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Account</h4>
            <nav className="flex flex-col space-y-2">
              <Link
                to={ROUTES.SIGNIN}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Sign In
              </Link>
              <Link
                to={ROUTES.SIGNUP}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Sign Up
              </Link>
              <Link
                to={ROUTES.ACCOUNT}
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                My Account
              </Link>
            </nav>
          </div>

          {/* Support Links */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold">Support</h4>
            <nav className="flex flex-col space-y-2">
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Help Center
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Shipping Info
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Returns
              </a>
              <a
                href="#"
                className="text-sm text-muted-foreground hover:text-primary transition-colors"
              >
                Contact Us
              </a>
            </nav>
          </div>
        </div>

        <Separator className="my-8" />

        {/* Bottom Section */}
        <div className="flex flex-col md:flex-row justify-between items-center space-y-4 md:space-y-0">
          <p className="text-sm text-muted-foreground">
            © {currentYear} Lumina Boutique. All rights reserved.
          </p>

          {/* Payment Methods */}
          <div className="flex items-center space-x-4">
            <img
              src="/images/creditcards.png"
              alt="Accepted payment methods"
              className="h-6 w-auto"
            />
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            <a
              href="https://github.com/chandrashekar19"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Github className="h-5 w-5" />
            </a>
            <a
              href="#"
              target="_blank"
              rel="noopener noreferrer"
              className="text-muted-foreground hover:text-primary transition-colors"
            >
              <Twitter className="h-5 w-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
