"use client";

import { useId } from "react";
import Link from "next/link";
import {
  BarChart3,
  Box,
  Building2,
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

  return (
    <div
      className={cn(
        "fixed inset-y-0 left-0 z-50 flex w-40 flex-col border-r bg-white transition-transform duration-300 lg:static lg:translate-x-0",
        open ? "translate-x-0" : "-translate-x-full",
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
                  <AccordionItem value="item-1" id={accordionId}>
                    <AccordionTrigger>Maestros</AccordionTrigger>
                    <AccordionContent className="flex flex-col gap-4 text-balance">
                      {"element" in module &&
                        module.element &&
                        module.element.map((singleModule) => (
                          <Link
                            key={singleModule.href}
                            href={singleModule.href}
                          >
                            <Button
                              variant={
                                pathname === singleModule.href
                                  ? "secondary"
                                  : "ghost"
                              }
                              className={cn(
                                "w-full justify-start",
                                pathname === module.href
                                  ? "bg-gray-100 text-gray-900"
                                  : "text-gray-500 hover:text-gray-900",
                              )}
                            >
                              <singleModule.icon className="mr-2 h-5 w-5" />
                              {singleModule.title}
                            </Button>
                          </Link>
                        ))}
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              }
            >
              <Link key={module.href} href={module.href}>
                <Button
                  variant={pathname === module.href ? "secondary" : "ghost"}
                  className={cn(
                    "w-full justify-start",
                    pathname === module.href
                      ? "bg-gray-100 text-gray-900"
                      : "text-gray-500 hover:text-gray-900",
                  )}
                >
                  {"icon" in module && module.icon ? (
                    <module.icon
                      className="mr-2 h-5 w-5"
                      aria-label="icono del módulo"
                    />
                  ) : null}
                  {module.title}
                </Button>
              </Link>
            </Show>
          ))}
        </div>
      </nav>
      <div className="border-t p-4">
        <div className="flex items-center gap-3">
          <div className="h-9 w-9 rounded-full bg-gray-200" />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium truncate">{userName ?? "Usuario"}</p>
            <p className="text-xs text-gray-500 truncate">{userEmail ?? ""}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
