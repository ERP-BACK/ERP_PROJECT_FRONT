import { Construction } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

export default function ReturnsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Devoluciones
        </h1>
        <p className="text-sm text-muted-foreground">
          Gestiona las devoluciones y RMAs de clientes
        </p>
      </div>

      <Card className="relative overflow-hidden">
        <div className="absolute inset-y-0 left-0 w-0.5 bg-warning" />
        <CardContent className="p-12 flex flex-col items-center justify-center gap-4">
          <div className="rounded-full bg-warning/10 p-4">
            <Construction className="h-8 w-8 text-warning" />
          </div>
          <div className="text-center">
            <h3 className="font-semibold text-lg">Módulo en Desarrollo</h3>
            <p className="text-sm text-muted-foreground mt-1">
              La funcionalidad de devoluciones estará disponible próximamente
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
