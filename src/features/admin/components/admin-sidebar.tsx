import { Link, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  ShoppingBag,
  Users,
  Settings,
  PlusCircle,
  BarChart3,
  ChevronRight
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

const adminLinks = [
  {
    label: "Dashboard",
    icon: LayoutDashboard,
    href: ROUTES.ADMIN_DASHBOARD,
  },
  {
    label: "Products",
    icon: ShoppingBag,
    href: ROUTES.ADMIN_PRODUCTS,
  },
  {
    label: "Add Product",
    icon: PlusCircle,
    href: ROUTES.ADD_PRODUCT,
  },
  {
    label: "Customers",
    icon: Users,
    href: "#", // Placeholder
    disabled: true,
  },
  {
    label: "Analytics",
    icon: BarChart3,
    href: "#", // Placeholder
    disabled: true,
  },
  {
    label: "Settings",
    icon: Settings,
    href: "#", // Placeholder
    disabled: true,
  },
];

export function AdminSidebar() {
  const location = useLocation();

  return (
    <div className="flex h-full w-64 flex-col border-r bg-muted/30 pt-24">
      <div className="px-6 py-4">
        <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground">
          Admin Panel
        </h2>
      </div>
      <nav className="flex-1 space-y-1 px-3">
        {adminLinks.map((link) => {
          const isActive = location.pathname === link.href;
          const Icon = link.icon;

          return (
            <Link
              key={link.label}
              to={link.disabled ? "#" : link.href}
              className={cn(
                "group flex items-center justify-between rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200",
                isActive
                  ? "bg-primary text-primary-foreground shadow-lg shadow-primary/20"
                  : link.disabled
                    ? "cursor-not-allowed opacity-50"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
              )}
            >
              <div className="flex items-center gap-3">
                <Icon className={cn("h-5 w-5", isActive ? "text-primary-foreground" : "text-muted-foreground group-hover:text-foreground")} />
                {link.label}
              </div>
              {isActive && <ChevronRight className="h-4 w-4" />}
            </Link>
          );
        })}
      </nav>

      <div className="p-6">
        <div className="rounded-2xl bg-primary/10 p-4 border border-primary/20">
          <p className="text-xs font-bold text-primary uppercase tracking-tight">Pro Version</p>
          <p className="mt-1 text-[10px] text-muted-foreground leading-relaxed">
            Advanced analytics and customer insights modules.
          </p>
          <Button variant="link" size="sm" className="h-auto p-0 mt-2 text-[10px] font-bold">
            Upgrade Now
          </Button>
        </div>
      </div>
    </div>
  );
}

import { Button } from "@/components/ui/button";
