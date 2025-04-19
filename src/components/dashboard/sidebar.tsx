import Link from "next/link";
import {
  BarChart3,
  Box,
  Home,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";

interface SidebarProps {
  open: boolean;
  pathname: string;
}

export function DashboardSidebar({ open, pathname }: SidebarProps) {
  const modules = [
    {
      title: "Dashboard",
      href: "/dashboard",
      icon: LayoutDashboard,
    },
    {
      title: "Inventario",
      href: "/dashboard/inventory",
      icon: Package,
    },
    {
      title: "Ventas",
      href: "/dashboard/sales",
      icon: ShoppingCart,
    },
    {
      title: "Clientes",
      href: "/dashboard/customers",
      icon: Users,
    },
    {
      title: "Productos",
      href: "/dashboard/products",
      icon: Box,
    },
    {
      title: "Reportes",
      href: "/dashboard/reports",
      icon: BarChart3,
    },
  ];

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-40 flex-col border-r bg-white transition-transform duration-300 lg:static lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full"
      )}
    >
      <div className="flex h-16 items-center border-b px-6">
        <Link
          href="/dashboard"
          className="flex items-center gap-2 font-semibold"
        >
          <div className="flex justify-center">
            <img
              src="/logo_out.png"
              alt="Dashboard ERP"
              className="rounded-lg object-cover"
              width={100}
              height={200}
            />
          </div>
        </Link>
      </div>
      <nav className="flex-1 overflow-auto py-6 px-4">
        <div className="space-y-1">
          {modules.map((module) => (
            <Link key={module.href} href={module.href}>
              <Button
                variant={pathname === module.href ? "secondary" : "ghost"}
                className={cn(
                  "w-full justify-start",
                  pathname === module.href
                    ? "bg-gray-100 text-gray-900"
                    : "text-gray-500 hover:text-gray-900"
                )}
              >
                <module.icon className="mr-2 h-5 w-5" />
                {module.title}
              </Button>
            </Link>
          ))}
        </div>
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gray-200" />
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500">admin@example.com</p>
          </div>
        </div>
      </div>
    </div>
  );
}
