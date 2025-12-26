import { Link } from "react-router-dom";
import { ArrowRight, Sparkles, TrendingUp } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useDocumentTitle } from "@/hooks";
import { ROUTES } from "@/constants/routes";
import { ProductShowcaseGrid } from "@/features/products/components/product-showcase-grid";
import { useFeaturedProducts } from "@/features/products/hooks/use-featured";

export function HomePage() {
  useDocumentTitle("Home");
  const { data: featuredProducts, isLoading: isLoadingFeatured } = useFeaturedProducts(6);

  return (
    <main>
      {/* Hero Section */}
      <section className="relative min-h-[600px] flex items-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('/images/banners/pattern.svg')] bg-repeat" />
        </div>

        <div className="container px-4 py-20 relative z-10">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Content */}
            <div className="text-white space-y-6">
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm px-4 py-2 rounded-full text-sm">
                <Sparkles className="h-4 w-4 text-yellow-400" />
                <span>New Collection Available</span>
              </div>

              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
                Discover Your
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-400">
                  Perfect Style
                </span>
              </h1>

              <p className="text-lg text-gray-300 max-w-lg">
                Explore our curated collection of premium products. From everyday
                essentials to luxury items, find everything you need in one place.
              </p>

              <div className="flex flex-wrap gap-4">
                <Button size="lg" asChild className="group">
                  <Link to={ROUTES.SHOP}>
                    Shop Now
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Link>
                </Button>
                <Button size="lg" variant="outline" asChild className="bg-transparent border-white text-white hover:bg-white hover:text-slate-900">
                  <Link to={ROUTES.FEATURED_PRODUCTS}>View Featured</Link>
                </Button>
              </div>

              {/* Stats */}
              <div className="flex gap-8 pt-8">
                <div>
                  <p className="text-3xl font-bold">200+</p>
                  <p className="text-gray-400 text-sm">Products</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">50+</p>
                  <p className="text-gray-400 text-sm">Brands</p>
                </div>
                <div>
                  <p className="text-3xl font-bold">10K+</p>
                  <p className="text-gray-400 text-sm">Customers</p>
                </div>
              </div>
            </div>

            {/* Hero Image */}
            <div className="relative hidden lg:block">
              <div className="absolute -inset-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full blur-3xl opacity-20" />
              <img
                src="/images/banners/banner-girl-1.png"
                alt="Fashion Model"
                className="relative z-10 w-full max-w-md mx-auto drop-shadow-2xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-6 rounded-lg bg-background shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Premium Quality</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  All products are carefully selected for quality and durability.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-lg bg-background shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Fast Delivery</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Quick and reliable shipping to your doorstep.
                </p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 rounded-lg bg-background shadow-sm">
              <div className="p-3 rounded-full bg-primary/10">
                <svg className="h-6 w-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Secure Payments</h3>
                <p className="text-sm text-muted-foreground mt-1">
                  Your transactions are safe and protected.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Categories */}
      <section className="py-16">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-8">
            <div>
              <h2 className="text-2xl font-bold">Shop by Category</h2>
              <p className="text-muted-foreground mt-1">
                Browse our popular categories
              </p>
            </div>
            <Button variant="outline" asChild>
              <Link to={ROUTES.SHOP}>
                View All
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { name: "Men's Fashion", image: "/images/banners/banner-guy.png" },
              { name: "Women's Fashion", image: "/images/banners/banner-girl.png" },
              { name: "Accessories", image: "/images/products/salt-image-1.png" },
              { name: "New Arrivals", image: "/images/products/salt-image-2.png" },
            ].map((category) => (
              <Link
                key={category.name}
                to={ROUTES.SHOP}
                className="group relative h-64 rounded-xl overflow-hidden"
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <h3 className="text-white font-semibold text-lg">
                    {category.name}
                  </h3>
                  <p className="text-white/70 text-sm flex items-center gap-1 group-hover:text-white transition-colors">
                    Shop Now
                    <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </p>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Trending Section */}
      <section className="py-16 bg-muted/50">
        <div className="container px-4">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-2">
              <TrendingUp className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Trending Now</h2>
            </div>
            <Button variant="ghost" asChild>
              <Link to={ROUTES.SHOP} className="group">
                View All
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
          </div>

          <ProductShowcaseGrid
            products={featuredProducts || []}
            isLoading={isLoadingFeatured}
            skeletonCount={6}
          />
        </div>
      </section>

      {/* Newsletter Section */}
      <section className="py-16 bg-primary text-primary-foreground">
        <div className="container px-4 text-center">
          <h2 className="text-2xl font-bold">Stay Updated</h2>
          <p className="mt-2 max-w-md mx-auto opacity-90">
            Subscribe to our newsletter for exclusive deals and new arrivals.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto mt-6">
            <input
              type="email"
              placeholder="Enter your email"
              className="flex-1 px-4 py-2 rounded-md bg-primary-foreground text-primary placeholder:text-primary/50"
            />
            <Button variant="secondary">Subscribe</Button>
          </div>
        </div>
      </section>
    </main>
  );
}
