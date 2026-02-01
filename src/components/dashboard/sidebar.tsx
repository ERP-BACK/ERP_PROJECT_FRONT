"use client";

import { useId } from "react";
import Link from "next/link";
import {
  BarChart3,
  Box,
  Building2,
  ChevronRight,
  Home,
  LayoutDashboard,
  Package,
  ShoppingCart,
  Users,
} from "lucide-react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Show } from "../show/Show.component";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ScrollArea } from "../ui/scroll-area";

interface SidebarProps {
  open: boolean;
  pathname: string;
  roles?: string[];
  userName?: string;
  userEmail?: string;
}

const adminModules = [
  {
    title: "Compañías",
    href: "/dashboard/admin/companies",
    icon: Building2,
    type: "NA",
  },
  {
    title: "Usuarios",
    href: "/dashboard/admin/users",
    icon: Users,
    type: "NA",
  },
];

const erpModules = [
  {
    title: "Dashboard",
    href: "/dashboard",
    icon: LayoutDashboard,
    type: "NA",
  },
  {
    title: "practica",
    href: "/practica",
    icon: Home,
    type: "NA",
  },
  {
    title: "Maestros",
    href: "/dashboard/masters/third-party",
    type: "Accordion",
    element: [
      {
        title: "Terceros",
        href: "/dashboard/masters/third-party",
        icon: Box,
      },
    ],
  },
  {
    title: "Inventario",
    href: "/dashboard/inventory",
    icon: Package,
    type: "NA",
  },
  {
    title: "Ventas",
    href: "/dashboard/sales",
    icon: ShoppingCart,
    type: "NA",
  },
  {
    title: "Clientes",
    href: "/dashboard/customers",
    icon: Users,
    type: "NA",
  },
  {
    title: "Productos",
    href: "/dashboard/products",
    type: "NA",
    icon: Box,
  },
  {
    title: "Reportes",
    href: "/dashboard/reports",
    icon: BarChart3,
    type: "NA",
  },
];

export function DashboardSidebar({ open, pathname, roles, userName, userEmail }: SidebarProps) {
  const accordionId = useId();
  const isSysAdmin = roles?.includes("sysAdmin") ?? false;
  const modules = isSysAdmin ? adminModules : erpModules;

  const initials = userName
    ? userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-56 flex-col border-r border-sidebar-border bg-sidebar transition-transform duration-200 ease-out lg:static lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
      )}
    >
      {/* Logo */}
      <div className="flex h-16 shrink-0 items-center border-b border-sidebar-border px-5">
        <Link
          href="/dashboard"
          className="flex items-center gap-2"
        >
          <img
            src="/logo_out.png"
            alt="Dashboard ERP"
            className="h-8 w-auto object-contain"
          />
        </Link>
      </div>

      {/* Navigation */}
      <ScrollArea className="flex-1 py-3">
        <nav className="px-3">
          <div className="space-y-0.5">
            {modules.map((module) => (
              <Show
                key={module.title}
                when={!(module.type === "Accordion")}
                fallback={
                  <Accordion
                    type="single"
                    collapsible
                    className="w-full"
                    defaultValue="item-1"
                  >
                    <AccordionItem value="item-1" id={accordionId} className="border-none">
                      <AccordionTrigger className="py-2 px-3 text-sm font-medium text-sidebar-foreground/70 hover:no-underline hover:text-sidebar-foreground">
                        Maestros
                      </AccordionTrigger>
                      <AccordionContent className="pb-1 pl-2">
                        {"element" in module &&
                          module.element &&
                          module.element.map((singleModule) => (
                            <Link
                              key={singleModule.href}
                              href={singleModule.href}
                            >
                              <button
                                className={cn(
                                  "flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                                  pathname === singleModule.href
                                    ? "bg-primary/10 text-primary font-medium"
                                    : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                                )}
                              >
                                {pathname === singleModule.href && (
                                  <span className="absolute left-0 h-5 w-0.5 rounded-r bg-primary" />
                                )}
                                <singleModule.icon className="h-4 w-4 shrink-0" />
                                {singleModule.title}
                              </button>
                            </Link>
                          ))}
                      </AccordionContent>
                    </AccordionItem>
                  </Accordion>
                }
              >
                <Link key={module.href} href={module.href}>
                  <button
                    className={cn(
                      "relative flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors",
                      pathname === module.href
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                    )}
                  >
                    {pathname === module.href && (
                      <span className="absolute left-0 h-5 w-0.5 rounded-r bg-primary" />
                    )}
                    {"icon" in module && module.icon ? (
                      <module.icon className="h-4 w-4 shrink-0" />
                    ) : null}
                    {module.title}
                  </button>
                </Link>
              </Show>
            ))}
          </div>
        </nav>
      </ScrollArea>

      {/* User profile */}
      <div className="border-t border-sidebar-border p-3">
        <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
            {initials}
          </div>
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium text-sidebar-foreground">
              {userName ?? "Usuario"}
            </p>
            <p className="truncate text-xs text-sidebar-foreground/50">
              {userEmail ?? ""}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
