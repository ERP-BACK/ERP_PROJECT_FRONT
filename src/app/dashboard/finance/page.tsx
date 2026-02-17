import { KPICard } from "@/components/cards/kpiCard.component";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Wrench,
  Cog,
  ClipboardList,
  TrendingUp,
  TrendingDown,
  Clock,
  AlertTriangle,
  CheckCircle2,
  XCircle,
  Timer,
  Gauge,
  CalendarClock,
  Activity,
  ArrowRight,
  PlayCircle,
  PauseCircle,
} from "lucide-react";
import Link from "next/link";

const cardData: Array<{
  title: string;
  value: string;
  unit: string;
  icon: typeof Activity;
  trend: "up" | "down" | "neutral";
  trendValue: string;
  variant: "default" | "success" | "warning" | "destructive";
}> = [
  {
    title: "Ingresos Totales",
    value: "$120,000",
    unit: "",
    icon: Activity,
    trend: "up",
    trendValue: "+5% vs mes anterior",
    variant: "success",
  },
  {
    title: "Gastos Totales",
    value: "$80,000",
    unit: "",
    icon: Activity,
    trend: "down",
    trendValue: "-3% vs mes anterior",
    variant: "destructive",
  },
  {
    title: "Utilidad Neta",
    value: "$40,000",
    unit: "",
    icon: Activity,
    trend: "up",
    trendValue: "+10% vs mes anterior",
    variant: "success",
  },
  {
    title: "Caja Actual",
    value: "$25,000",
    unit: "",
    icon: Activity,
    trend: "neutral",
    trendValue: "Sin cambios",
    variant: "default",
  },
];

export default function FinanceDashboard() {
  return (
    <div className="space-y-6 scroll-auto">
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {cardData.map((card, index) => (
          <KPICard key={index} {...card} />
        ))}
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Cuentas por cobrar
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/maintenance/work-orders">
                  Ver detalle CxC
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
        </Card>
        <Card className="lg:col-span-1">
          <CardHeader>
            <div className="flex items-center justify-between">
              <CardTitle className="flex items-center gap-2">
                <ClipboardList className="h-5 w-5" />
                Cuentas por pagar
              </CardTitle>
              <Button variant="ghost" size="sm" asChild>
                <Link href="/dashboard/maintenance/work-orders">
                  Ver detalle CxP
                  <ArrowRight className="ml-1 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </CardHeader>
        </Card>
      </div>
    </div>
  );
}
