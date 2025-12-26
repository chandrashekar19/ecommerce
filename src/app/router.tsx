import { Suspense, lazy } from "react";
import {
  createBrowserRouter,
  RouterProvider,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Header, Footer } from "@/components/layout";
import { CartSidebar } from "@/features/cart";
import { FullPagePreloader } from "@/components/shared";
import { ErrorBoundary } from "@/components/shared/error-boundary";
import { useAuthStore } from "@/features/auth/stores/auth-store";
import { ROUTES } from "@/constants/routes";

// Lazy load pages for code splitting
const HomePage = lazy(() =>
  import("@/pages/home").then((m) => ({ default: m.HomePage }))
);
const ShopPage = lazy(() =>
  import("@/pages/shop").then((m) => ({ default: m.ShopPage }))
);
const SignInPage = lazy(() =>
  import("@/pages/auth/sign-in").then((m) => ({ default: m.SignInPage }))
);
const SignUpPage = lazy(() =>
  import("@/pages/auth/sign-up").then((m) => ({ default: m.SignUpPage }))
);
const NotFoundPage = lazy(() =>
  import("@/pages/not-found").then((m) => ({ default: m.NotFoundPage }))
);
const FeaturedPage = lazy(() =>
  import("@/pages/featured").then((m) => ({ default: m.default }))
);
const RecommendedPage = lazy(() =>
  import("@/pages/recommended").then((m) => ({ default: m.default }))
);
const SearchPage = lazy(() =>
  import("@/pages/search").then((m) => ({ default: m.default }))
);
const ProductDetailPage = lazy(() =>
  import("@/pages/product-detail").then((m) => ({ default: m.default }))
);
const AccountPage = lazy(() =>
  import("@/pages/account/profile").then((m) => ({ default: m.default }))
);
const EditAccountPage = lazy(() =>
  import("@/pages/account/edit").then((m) => ({ default: m.default }))
);
const CheckoutStep1 = lazy(() =>
  import("@/pages/checkout/step-1").then((m) => ({ default: m.default }))
);
const CheckoutStep2 = lazy(() =>
  import("@/pages/checkout/step-2").then((m) => ({ default: m.default }))
);
const CheckoutStep3 = lazy(() =>
  import("@/pages/checkout/step-3").then((m) => ({ default: m.default }))
);

// Layout wrapper with header and footer
function RootLayout() {
  return (
    <div className="flex min-h-screen flex-col">
      <Header />
      <CartSidebar />
      <main className="flex-1">
        <ErrorBoundary>
          <Suspense fallback={<FullPagePreloader />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </div>
  );
}

// Protected route wrapper - requires authentication
function ProtectedRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAuthenticating } = useAuthStore();

  if (isAuthenticating) {
    return <FullPagePreloader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGNIN} replace />;
  }

  return <>{children}</>;
}

// Public route wrapper - redirects if already authenticated
function PublicRoute({ children }: { children: React.ReactNode }) {
  const { isAuthenticated, isAuthenticating } = useAuthStore();

  if (isAuthenticating) {
    return <FullPagePreloader />;
  }

  if (isAuthenticated) {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return <>{children}</>;
}

const AdminLayout = lazy(() =>
  import("@/components/layout/admin-layout").then((m) => ({ default: m.AdminLayout }))
);

const AdminDashboard = lazy(() =>
  import("@/pages/admin/dashboard").then((m) => ({ default: m.default }))
);

const AdminProducts = lazy(() =>
  import("@/pages/admin/products").then((m) => ({ default: m.default }))
);

const AddProduct = lazy(() =>
  import("@/pages/admin/add-product").then((m) => ({ default: m.default }))
);

const EditProduct = lazy(() =>
  import("@/pages/admin/edit-product").then((m) => ({ default: m.default }))
);

// Router configuration
const router = createBrowserRouter([
  {
    path: "/",
    element: <RootLayout />,
    children: [
      // ... (rest of public routes remain same)
      {
        index: true,
        element: <HomePage />,
      },
      {
        path: "shop",
        element: <ShopPage />,
      },
      {
        path: "featured",
        element: <FeaturedPage />,
      },
      {
        path: "recommended",
        element: <RecommendedPage />,
      },
      {
        path: "search/:searchKey",
        element: <SearchPage />,
      },
      {
        path: "product/:id",
        element: <ProductDetailPage />,
      },

      // Auth routes (public only)
      {
        path: "signin",
        element: (
          <PublicRoute>
            <SignInPage />
          </PublicRoute>
        ),
      },
      {
        path: "signup",
        element: (
          <PublicRoute>
            <SignUpPage />
          </PublicRoute>
        ),
      },
      {
        path: "forgot-password",
        element: (
          <PublicRoute>
            <SignInPage /> {/* TODO: Create ForgotPasswordPage */}
          </PublicRoute>
        ),
      },

      // Protected routes (requires authentication)
      {
        path: "account",
        element: (
          <ProtectedRoute>
            <AccountPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "account/edit",
        element: (
          <ProtectedRoute>
            <EditAccountPage />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout/step-1",
        element: (
          <ProtectedRoute>
            <CheckoutStep1 />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout/step-2",
        element: (
          <ProtectedRoute>
            <CheckoutStep2 />
          </ProtectedRoute>
        ),
      },
      {
        path: "checkout/step-3",
        element: (
          <ProtectedRoute>
            <CheckoutStep3 />
          </ProtectedRoute>
        ),
      },
    ],
  },
  {
    path: "/admin",
    element: (
      <Suspense fallback={<FullPagePreloader />}>
        <AdminLayout />
      </Suspense>
    ),
    children: [
      {
        path: "dashboard",
        element: <AdminDashboard />,
      },
      {
        path: "products",
        element: <AdminProducts />,
      },
      {
        path: "products/add",
        element: <AddProduct />,
      },
      {
        path: "products/edit/:id",
        element: <EditProduct />,
      },
    ],
  },
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export function AppRouter() {
  return <RouterProvider router={router} />;
}
