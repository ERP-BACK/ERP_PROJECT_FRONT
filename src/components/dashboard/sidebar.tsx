"use client";

import { useId, useState } from "react";
import Link from "next/link";
import {
  BarChart3,
  Banknote,
  Box,
  Building2,
  ChevronLeft,
  ChevronRight,
  CircleDollarSign,
  CreditCard,
  Database,
  FileText,
  Globe,
  Hash,
  Landmark,
  LayoutDashboard,
  LogOut,
  MapPin,
  Package,
  Receipt,
  Settings,
  ShoppingCart,
  Ship,
  Store,
  Truck,
  Users,
  Wallet,
} from "lucide-react";
import { signOut } from "next-auth/react";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "../ui/accordion";
import { ScrollArea } from "../ui/scroll-area";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip";

interface SidebarProps {
  open: boolean;
  collapsed: boolean;
  onToggleCollapse: () => void;
  onClose: () => void;
  pathname: string;
  roles?: string[];
  userName?: string;
  userEmail?: string;
}

// ── Admin modules ──────────────────────────────────────────────
const adminSections = [
  {
    label: "ADMINISTRACIÓN",
    items: [
      { title: "Compañías", href: "/dashboard/admin/companies", icon: Building2 },
      { title: "Usuarios", href: "/dashboard/admin/users", icon: Users },
    ],
  },
];

// ── Maestros sub-groups ────────────────────────────────────────
const maestrosSubGroups = [
  {
    label: "Entidades",
    items: [
      { title: "Terceros", href: "/dashboard/masters/third-party", icon: Users },
      { title: "Transportistas", href: "/dashboard/masters/carriers", icon: Truck },
      { title: "Sucursales", href: "/dashboard/masters/branches", icon: Store },
    ],
  },
  {
    label: "Documentos",
    items: [
      { title: "Tipos de documento", href: "/dashboard/masters/document-types", icon: FileText },
      { title: "Secuencias", href: "/dashboard/masters/document-sequences", icon: Hash },
    ],
  },
  {
    label: "Pagos",
    items: [
      { title: "Condiciones de pago", href: "/dashboard/masters/payment-terms", icon: Receipt },
      { title: "Métodos de pago", href: "/dashboard/masters/payment-methods", icon: CreditCard },
      { title: "Bancos", href: "/dashboard/masters/banks", icon: Landmark },
      { title: "Cuentas bancarias", href: "/dashboard/masters/bank-accounts", icon: Wallet },
    ],
  },
  {
    label: "Fiscal",
    items: [
      { title: "Responsab. tributarias", href: "/dashboard/masters/tax-responsibilities", icon: CircleDollarSign },
      { title: "Actividades económicas", href: "/dashboard/masters/economic-activities", icon: Banknote },
      { title: "Monedas", href: "/dashboard/masters/currencies", icon: Banknote },
    ],
  },
  {
    label: "Envío",
    items: [
      { title: "Métodos de envío", href: "/dashboard/masters/shipping-methods", icon: Ship },
      { title: "Incoterms", href: "/dashboard/masters/incoterms", icon: Globe },
    ],
  },
  {
    label: "Geografía",
    items: [
      { title: "Regiones y zonas", href: "/dashboard/masters/regions-zones", icon: MapPin },
      { title: "Países", href: "/dashboard/masters/countries", icon: Globe },
      { title: "Departamentos", href: "/dashboard/masters/state-deparment", icon: MapPin },
      { title: "Ciudades", href: "/dashboard/masters/city", icon: Building2 },
    ],
  },
];

// ── ERP sections ───────────────────────────────────────────────
const erpSections = [
  {
    label: "PRINCIPAL",
    items: [
      { title: "Dashboard", href: "/dashboard", icon: LayoutDashboard },
    ],
  },
  {
    label: "OPERACIONES",
    items: [
      { title: "Ventas", href: "/dashboard/sales", icon: ShoppingCart },
      { title: "Inventario", href: "/dashboard/inventory", icon: Package },
      { title: "Productos", href: "/dashboard/products", icon: Box },
      { title: "Clientes", href: "/dashboard/customers", icon: Users },
    ],
  },
  {
    label: "MAESTROS",
    accordion: true,
  },
  {
    label: "ANÁLISIS",
    items: [
      { title: "Reportes", href: "/dashboard/reports", icon: BarChart3 },
    ],
  },
];

// ── Helpers ────────────────────────────────────────────────────

function NavItem({
  href,
  icon: Icon,
  title,
  active,
  collapsed,
  onClick,
}: {
  href: string;
  icon: React.ComponentType<{ className?: string }>;
  title: string;
  active: boolean;
  collapsed: boolean;
  onClick?: () => void;
}) {
  const inner = (
    <Link href={href} onClick={onClick}>
      <button
        className={cn(
          "relative flex w-full items-center gap-2.5 rounded-md px-3 py-2 text-sm transition-colors duration-150",
          collapsed && "justify-center px-0",
          active
            ? "bg-primary/10 text-primary font-medium"
            : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground",
        )}
      >
        {active && (
          <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r bg-primary" />
        )}
        <Icon className="h-4 w-4 shrink-0" />
        {!collapsed && <span>{title}</span>}
      </button>
    </Link>
  );

  if (collapsed) {
    return (
      <Tooltip>
        <TooltipTrigger asChild>{inner}</TooltipTrigger>
        <TooltipContent side="right">{title}</TooltipContent>
      </Tooltip>
    );
  }

  return inner;
}

function SectionHeader({
  label,
  collapsed,
  first,
}: {
  label: string;
  collapsed: boolean;
  first?: boolean;
}) {
  if (collapsed) return null;
  return (
    <p
      className={cn(
        "text-[11px] font-medium uppercase tracking-wide text-sidebar-foreground/40 px-3 mb-1.5",
        first ? "mt-0" : "mt-6",
      )}
    >
      {label}
    </p>
  );
}

// ── Collapsed maestros popover ─────────────────────────────────

function CollapsedMaestrosButton({
  pathname,
}: {
  pathname: string;
}) {
  const [popoverOpen, setPopoverOpen] = useState(false);
  const isAnyActive = maestrosSubGroups.some((g) =>
    g.items.some((i) => pathname === i.href),
  );

  return (
    <div className="relative">
      <Tooltip>
        <TooltipTrigger asChild>
          <button
            onClick={() => setPopoverOpen((v) => !v)}
            className={cn(
              "relative flex w-full items-center justify-center rounded-md py-2 text-sm transition-colors duration-150",
              isAnyActive
                ? "bg-primary/10 text-primary font-medium"
                : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground",
            )}
          >
            {isAnyActive && (
              <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r bg-primary" />
            )}
            <Database className="h-4 w-4 shrink-0" />
          </button>
        </TooltipTrigger>
        <TooltipContent side="right">Maestros</TooltipContent>
      </Tooltip>

      {popoverOpen && (
        <>
          {/* backdrop to close */}
          <div
            className="fixed inset-0 z-40"
            onClick={() => setPopoverOpen(false)}
          />
          <div className="absolute left-full top-0 z-50 ml-2 w-56 max-h-[70vh] overflow-y-auto rounded-lg border border-sidebar-border bg-sidebar p-2 shadow-lg">
            {maestrosSubGroups.map((group) => (
              <div key={group.label} className="mb-2 last:mb-0">
                <p className="text-[10px] font-medium uppercase tracking-wide text-sidebar-foreground/40 px-2 mb-1">
                  {group.label}
                </p>
                {group.items.map((item) => (
                  <Link
                    key={item.href}
                    href={item.href}
                    onClick={() => setPopoverOpen(false)}
                  >
                    <button
                      className={cn(
                        "flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-sm transition-colors duration-150",
                        pathname === item.href
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                      )}
                    >
                      <item.icon className="h-3.5 w-3.5 shrink-0" />
                      {item.title}
                    </button>
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

// ── Expanded maestros accordion ────────────────────────────────

function ExpandedMaestrosAccordion({ pathname, onNavigate }: { pathname: string; onNavigate?: () => void }) {
  const accordionId = useId();

  return (
    <Accordion type="single" collapsible className="w-full" defaultValue="maestros">
      <AccordionItem value="maestros" id={accordionId} className="border-none">
        <AccordionTrigger className="py-2 px-3 text-sm font-medium text-sidebar-foreground/70 hover:no-underline hover:text-sidebar-foreground">
          <span className="flex items-center gap-2.5">
            <Database className="h-4 w-4 shrink-0" />
            Maestros
          </span>
        </AccordionTrigger>
        <AccordionContent className="pb-1">
          {maestrosSubGroups.map((group) => (
            <div key={group.label} className="mb-1 last:mb-0">
              <p className="text-[10px] font-medium uppercase tracking-wide text-sidebar-foreground/40 pl-7 pr-3 mt-2 mb-1">
                {group.label}
              </p>
              <div className="ml-5 border-l border-sidebar-border/50 pl-2">
                {group.items.map((item) => (
                  <Link key={item.href} href={item.href} onClick={onNavigate}>
                    <button
                      className={cn(
                        "relative flex w-full items-center gap-2.5 rounded-md px-3 py-1.5 text-sm transition-colors duration-150",
                        pathname === item.href
                          ? "bg-primary/10 text-primary font-medium"
                          : "text-sidebar-foreground/65 hover:bg-sidebar-accent hover:text-sidebar-foreground",
                      )}
                    >
                      {pathname === item.href && (
                        <span className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r bg-primary" />
                      )}
                      <item.icon className="h-4 w-4 shrink-0" />
                      {item.title}
                    </button>
                  </Link>
                ))}
              </div>
            </div>
          ))}
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}

// ── Main Sidebar ───────────────────────────────────────────────

export function DashboardSidebar({
  open,
  collapsed,
  onToggleCollapse,
  onClose,
  pathname,
  roles,
  userName,
  userEmail,
}: SidebarProps) {
  const isSysAdmin = roles?.includes("sysAdmin") ?? false;
  const sections = isSysAdmin ? adminSections : erpSections;

  const initials = userName
    ? userName.split(" ").map((n) => n[0]).join("").toUpperCase().slice(0, 2)
    : "U";

  const roleBadge = isSysAdmin ? "Admin" : "ERP";

  const handleMobileClose = () => {
    onClose();
  };

  return (
    <TooltipProvider delayDuration={0}>
      {/* Mobile backdrop */}
      {open && (
        <div
          className="fixed inset-0 z-40 bg-black/50 lg:hidden"
          onClick={handleMobileClose}
        />
      )}
      <div
        className={cn(
          "h-screen shrink-0 flex-col border-r border-sidebar-border bg-sidebar transition-[width] duration-200 ease-out",
          "max-lg:fixed max-lg:inset-y-0 max-lg:left-0 max-lg:z-50 max-lg:transition-transform max-lg:duration-200 max-lg:ease-out",
          "lg:relative lg:flex lg:translate-x-0",
          open ? "max-lg:translate-x-0 max-lg:flex" : "max-lg:-translate-x-full max-lg:hidden",
          collapsed ? "w-[52px]" : "w-56",
        )}
      >
        {/* Logo */}
        <div className="flex h-16 shrink-0 items-center border-b border-sidebar-border px-5">
          <Link href="/dashboard" className="flex items-center gap-2">
            <img
              src="/logo_out.png"
              alt="Dashboard ERP"
              className={cn(
                "h-8 w-auto object-contain transition-opacity duration-200",
                collapsed && "hidden",
              )}
            />
            {collapsed && (
              <img
                src="/logo_out.png"
                alt="Dashboard ERP"
                className="h-6 w-6 object-contain object-left"
              />
            )}
          </Link>
        </div>

        {/* Navigation */}
        <ScrollArea className="min-h-0 flex-1 py-3">
          <nav className={cn("px-3", collapsed && "px-1.5")}>
            <div className="space-y-0.5">
              {sections.map((section, sIdx) => {
                // Maestros accordion section
                if ("accordion" in section && section.accordion) {
                  return (
                    <div key={section.label}>
                      <SectionHeader
                        label={section.label}
                        collapsed={collapsed}
                        first={sIdx === 0}
                      />
                      {collapsed ? (
                        <CollapsedMaestrosButton pathname={pathname} />
                      ) : (
                        <ExpandedMaestrosAccordion pathname={pathname} onNavigate={handleMobileClose} />
                      )}
                    </div>
                  );
                }

                // Regular section
                return (
                  <div key={section.label}>
                    <SectionHeader
                      label={section.label}
                      collapsed={collapsed}
                      first={sIdx === 0}
                    />
                    {"items" in section &&
                      section.items?.map((item) => (
                        <NavItem
                          key={item.href}
                          href={item.href}
                          icon={item.icon}
                          title={item.title}
                          active={pathname === item.href}
                          collapsed={collapsed}
                          onClick={handleMobileClose}
                        />
                      ))}
                  </div>
                );
              })}
            </div>
          </nav>
        </ScrollArea>

        {/* Collapse toggle (desktop only) */}
        <div className="hidden lg:flex justify-center border-t border-sidebar-border py-2">
          <button
            onClick={onToggleCollapse}
            className="flex h-7 w-7 items-center justify-center rounded-md text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors duration-150"
          >
            {collapsed ? (
              <ChevronRight className="h-4 w-4" />
            ) : (
              <ChevronLeft className="h-4 w-4" />
            )}
          </button>
        </div>

        {/* User profile */}
        <div className="border-t border-sidebar-border p-3">
          {collapsed ? (
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="flex justify-center">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                    {initials}
                  </div>
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">
                <p className="font-medium">{userName ?? "Usuario"}</p>
                <p className="text-[10px] opacity-70">{userEmail ?? ""}</p>
              </TooltipContent>
            </Tooltip>
          ) : (
            <div className="flex items-center gap-2.5 rounded-md px-2 py-1.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">
                {initials}
              </div>
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium text-sidebar-foreground">
                  {userName ?? "Usuario"}
                </p>
                <span className="inline-block rounded bg-primary/10 px-1.5 py-0.5 text-[10px] font-medium text-primary">
                  {roleBadge}
                </span>
              </div>
              <div className="flex items-center gap-0.5">
                <Link href="/dashboard/settings">
                  <button className="flex h-7 w-7 items-center justify-center rounded-md text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors duration-150">
                    <Settings className="h-3.5 w-3.5" />
                  </button>
                </Link>
                <button
                  onClick={() => signOut({ redirectTo: "/" })}
                  className="flex h-7 w-7 items-center justify-center rounded-md text-sidebar-foreground/50 hover:bg-sidebar-accent hover:text-sidebar-foreground transition-colors duration-150"
                  title="Cerrar sesión"
                >
                  <LogOut className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </TooltipProvider>
  );
}
