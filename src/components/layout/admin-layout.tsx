import { Outlet, Navigate } from "react-router-dom";
import { AdminSidebar } from "@/features/admin/components/admin-sidebar";
import { useAuthStore } from "@/features/auth/stores/auth-store";
import { ROUTES } from "@/constants/routes";
import { FullPagePreloader } from "@/components/shared";

export function AdminLayout() {
  const { user, isAuthenticated, isAuthenticating } = useAuthStore();

  if (isAuthenticating) {
    return <FullPagePreloader />;
  }

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.SIGNIN} replace />;
  }

  if (user?.role !== "ADMIN") {
    return <Navigate to={ROUTES.HOME} replace />;
  }

  return (
    <div className="flex min-h-screen bg-background text-foreground">
      {/* Sidebar */}
      <AdminSidebar />

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto pt-24 pb-12 px-8 lg:px-12">
        <div className="mx-auto max-w-6xl">
          <Outlet />
        </div>
      </main>
    </div>
  );
}
