import {
  ArrowDown,
  ArrowUp,
  BarChart3,
  Box,
  DollarSign,
  Package,
  ShoppingCart,
  TrendingUp,
  Users,
} from "lucide-react";
import Link from "next/link";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

function MetricCard({
  label,
  value,
  change,
  trend,
  icon: Icon,
}: {
  label: string;
  value: string;
  change: string;
  trend: "up" | "down";
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Card className="relative overflow-hidden">
      <div
        className={`absolute inset-y-0 left-0 w-0.5 ${
          trend === "up" ? "bg-success" : "bg-destructive"
        }`}
      />
      <CardContent className="p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-2">
            <p className="text-sm text-muted-foreground">{label}</p>
            <p className="text-2xl font-semibold tracking-tight">{value}</p>
          </div>
          <div className="rounded-lg bg-muted p-2">
            <Icon className="h-4 w-4 text-muted-foreground" />
          </div>
        </div>
        <div className="mt-3 flex items-center gap-1.5 text-xs">
          {trend === "up" ? (
            <span className="flex items-center gap-0.5 text-success">
              <ArrowUp className="h-3 w-3" />
              {change}
            </span>
          ) : (
            <span className="flex items-center gap-0.5 text-destructive">
              <ArrowDown className="h-3 w-3" />
              {change}
            </span>
          )}
          <span className="text-muted-foreground">vs. mes anterior</span>
        </div>
      </CardContent>
    </Card>
  );
}

function ModuleLink({
  href,
  title,
  description,
  icon: Icon,
}: {
  href: string;
  title: string;
  description: string;
  icon: React.ComponentType<{ className?: string }>;
}) {
  return (
    <Link href={href}>
      <div className="group flex items-start gap-3 rounded-lg border border-transparent p-3 transition-colors hover:border-border hover:bg-accent/50">
        <div className="rounded-md bg-primary/8 p-2 transition-colors group-hover:bg-primary/12">
          <Icon className="h-4 w-4 text-primary" />
        </div>
        <div className="min-w-0 flex-1">
          <p className="text-sm font-medium text-foreground">{title}</p>
          <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}

const activities = [
  { action: "Venta completada", user: "Maria Lopez", time: "5 min" },
  { action: "Producto actualizado", user: "Juan Perez", time: "15 min" },
  { action: "Nuevo cliente", user: "Admin", time: "1 h" },
  { action: "Inventario actualizado", user: "Carlos Ruiz", time: "3 h" },
  { action: "Reporte generado", user: "Admin", time: "5 h" },
];

export default async function Dashboard() {
  return (
    <div className="space-y-6 p-6">
      {/* Page header */}
      <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Dashboard</h1>
          <p className="text-sm text-muted-foreground">
            Panel de control del sistema ERP
          </p>
        </div>
        <Button size="sm" variant="outline">
          Descargar Reporte
        </Button>
      </div>

      {/* KPI metrics */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <MetricCard
          label="Ventas Totales"
          value="$45,231.89"
          change="+20.1%"
          trend="up"
          icon={DollarSign}
        />
        <MetricCard
          label="Productos"
          value="573"
          change="-4.5%"
          trend="down"
          icon={Package}
        />
        <MetricCard
          label="Clientes"
          value="2,350"
          change="+10.1%"
          trend="up"
          icon={Users}
        />
        <MetricCard
          label="Ordenes Activas"
          value="12,234"
          change="+19%"
          trend="up"
          icon={ShoppingCart}
        />
      </div>

      {/* Main content grid */}
      <div className="grid gap-6 lg:grid-cols-5">
        {/* Modules */}
        <Card className="lg:col-span-3">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Modulos</CardTitle>
            <CardDescription>
              Acceso rapido a las areas del sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="grid gap-1 sm:grid-cols-2">
              <ModuleLink
                href="/dashboard/masters/third-party"
                title="Terceros"
                description="Gestion de terceros, carga y actualizacion"
                icon={Box}
              />
              <ModuleLink
                href="/dashboard/inventory"
                title="Inventario"
                description="Productos, stock y categorias"
                icon={Package}
              />
              <ModuleLink
                href="/dashboard/sales"
                title="Ventas"
                description="Ordenes, facturacion y clientes"
                icon={ShoppingCart}
              />
              <ModuleLink
                href="/dashboard/customers"
                title="Clientes"
                description="Gestion de clientes y contactos"
                icon={Users}
              />
              <ModuleLink
                href="/dashboard/reports"
                title="Reportes"
                description="Analisis y rendimiento"
                icon={BarChart3}
              />
            </div>
          </CardContent>
        </Card>

        {/* Activity feed */}
        <Card className="lg:col-span-2">
          <CardHeader className="pb-3">
            <CardTitle className="text-base">Actividad Reciente</CardTitle>
            <CardDescription>
              Ultimas acciones en el sistema
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-1">
              {activities.map((activity, i) => (
                <div
                  key={i}
                  className="flex items-center gap-3 rounded-md px-2 py-2.5"
                >
                  <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-muted text-xs font-medium text-muted-foreground">
                    {i + 1}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-medium leading-none">
                      {activity.action}
                    </p>
                    <p className="mt-1 text-xs text-muted-foreground">
                      {activity.user}
                    </p>
                  </div>
                  <span className="shrink-0 text-xs text-muted-foreground/60">
                    {activity.time}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
