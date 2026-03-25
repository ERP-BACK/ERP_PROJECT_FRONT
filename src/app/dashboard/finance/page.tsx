import { KPICard } from "@/components/cards/kpiCard.component";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
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
  Car,
} from "lucide-react";
import Link from "next/link";
import { ChartAreaInteractive } from "./components/Chart";

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
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">Total CxC: $30,000M</p>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Agin de Cartera</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between ">
                      <span>Vigente</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black">$15,000</span>
                        <div className=" rounded-full bg-green-500 h-4 w-4" />
                      </div>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>1-30 días</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black">$10,000M</span>
                        <div className=" rounded-full bg-yellow-600 h-4 w-4" />
                      </div>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>31-60 días</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black">$2,000M</span>
                        <div className=" rounded-full bg-orange-500 h-4 w-4" />
                      </div>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>61-90 días</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black">$2,000M</span>
                        <div className=" rounded-full bg-red-500 h-4 w-4" />
                      </div>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>{`>90 días`}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black">$2,000M</span>
                        <div className=" rounded-full bg-gray-500 h-4 w-4" />
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </CardContent>
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
          <CardContent className="flex flex-col gap-4">
            <p className="text-sm text-muted-foreground">Total CxP: $20,000M</p>
            <Card>
              <CardHeader>
                <CardTitle className="text-sm">Vencimientos próximos</CardTitle>
              </CardHeader>
              <CardContent>
                <div>
                  <ul className="space-y-2">
                    <li className="flex items-center justify-between ">
                      <span>Esta semana</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black">$10,789M</span>
                        <div className=" rounded-full bg-green-500 h-4 w-4" />
                      </div>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Prox. semana</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black">$5,753M</span>
                        <div className=" rounded-full bg-yellow-600 h-4 w-4" />
                      </div>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>Este mes</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black">$3,987M</span>
                        <div className=" rounded-full bg-orange-500 h-4 w-4" />
                      </div>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>61-90 días</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black">$1,789M</span>
                        <div className=" rounded-full bg-red-500 h-4 w-4" />
                      </div>
                    </li>
                    <li className="flex items-center justify-between">
                      <span>{`>30 días`}</span>
                      <div className="flex items-center gap-2">
                        <span className="font-bold text-black">$1,7865M</span>
                        <div className=" rounded-full bg-gray-500 h-4 w-4" />
                      </div>
                    </li>
                  </ul>
                </div>
              </CardContent>
            </Card>
          </CardContent>
        </Card>
      </div>
      <Card>
        <CardHeader>
          <CardTitle className="text-sm">Agin de Proveedores</CardTitle>
        </CardHeader>
        <CardContent>
          <ChartAreaInteractive />
        </CardContent>
      </Card>
    </div>
  );
}
