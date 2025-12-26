import { useNavigate } from "react-router-dom";
import {
  ShoppingBag,
  Users,
  DollarSign,
  TrendingUp,
  Package,
  ArrowUpRight,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useDocumentTitle, useScrollTop } from "@/hooks";
import { useAuthStore } from "@/features/auth/stores/auth-store";
import { formatPrice } from "@/lib/utils";
import { ROUTES } from "@/constants/routes";

export default function AdminDashboardPage() {
  const navigate = useNavigate();
  const { user } = useAuthStore();

  useScrollTop();
  useDocumentTitle("Admin Dashboard | Lumina Boutique");

  if (user?.role !== "ADMIN") {
    navigate(ROUTES.HOME);
    return null;
  }

  const stats = [
    {
      title: "Total Products",
      value: "42",
      icon: Package,
      description: "+2 from last week",
      color: "text-blue-500",
      bg: "bg-blue-500/10",
    },
    {
      title: "Total Users",
      value: "1,284",
      icon: Users,
      description: "+180 this month",
      color: "text-purple-500",
      bg: "bg-purple-500/10",
    },
    {
      title: "Total Revenue",
      value: formatPrice(15240),
      icon: DollarSign,
      description: "+12.5% increment",
      color: "text-emerald-500",
      bg: "bg-emerald-500/10",
    },
    {
      title: "Conversion Rate",
      value: "3.2%",
      icon: TrendingUp,
      description: "+0.4% from yesterday",
      color: "text-orange-500",
      bg: "bg-orange-500/10",
    },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Overview</h1>
        <p className="text-muted-foreground">Welcome back, {user.fullname}. Here's what's happening today.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat) => (
          <Card key={stat.title} className="border-none bg-muted/30 shadow-none">
            <CardHeader className="flex flex-row items-center justify-between pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground uppercase tracking-widest">
                {stat.title}
              </CardTitle>
              <div className={`rounded-xl p-2 ${stat.bg}`}>
                <stat.icon className={`h-5 w-5 ${stat.color}`} />
              </div>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold">{stat.value}</div>
              <p className="text-xs text-muted-foreground mt-2 flex items-center gap-1">
                <ArrowUpRight className="h-3 w-3 text-emerald-500" />
                <span className="text-emerald-500 font-bold">{stat.description.split(' ')[0]}</span>
                {stat.description.split(' ').slice(1).join(' ')}
              </p>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid gap-6 lg:grid-cols-7">
        {/* Recent Activity Placeholder */}
        <Card className="lg:col-span-4 border-none bg-muted/30 shadow-none">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5 text-primary" />
              Recent Activities
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-6">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="h-10 w-10 rounded-full bg-background flex items-center justify-center font-bold text-xs">
                    {i}
                  </div>
                  <div className="flex-1 space-y-1">
                    <p className="text-sm font-medium">New order placed #ORD-583{i}</p>
                    <p className="text-xs text-muted-foreground">User {i === 1 ? 'John Doe' : 'Anonymous'} purchased Premium Leather Sneakers</p>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {i * 2} mins ago
                  </div>
                </div>
              ))}
            </div>
            <Button variant="ghost" className="w-full mt-6 text-primary hover:text-primary hover:bg-primary/5">
              View All Activities
            </Button>
          </CardContent>
        </Card>

        {/* Quick Actions */}
        <Card className="lg:col-span-3 border-none bg-muted/30 shadow-none">
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <Button
              className="w-full justify-start h-14 rounded-xl px-6 text-base"
              onClick={() => navigate(ROUTES.ADD_PRODUCT)}
            >
              <ShoppingBag className="mr-3 h-5 w-5" />
              Upload New Product
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start h-14 rounded-xl px-6 text-base border-muted-foreground/20"
              onClick={() => navigate(ROUTES.ADMIN_PRODUCTS)}
            >
              <Package className="mr-3 h-5 w-5" />
              Manage Inventory
            </Button>
            <div className="pt-6">
              <h4 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 px-2">System Status</h4>
              <div className="space-y-4 rounded-2xl bg-background p-4 border shadow-sm">
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Database</span>
                  <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">Storage</span>
                  <span className="flex items-center gap-1.5 text-emerald-500 font-bold">
                    <div className="h-2 w-2 rounded-full bg-emerald-500" />
                    Operational
                  </span>
                </div>
                <div className="flex items-center justify-between text-sm">
                  <span className="text-muted-foreground">API Latency</span>
                  <span className="text-primary font-bold">142ms</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
