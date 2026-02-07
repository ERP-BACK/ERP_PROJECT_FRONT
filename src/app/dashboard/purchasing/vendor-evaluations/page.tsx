import { VendorEvaluationsTablePage } from "./presentation/components/VendorEvaluationsTablePage";

export default function VendorEvaluationsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Evaluación de Proveedores
        </h1>
        <p className="text-sm text-muted-foreground">
          Evalúa y califica el desempeño de los proveedores
        </p>
      </div>

      <VendorEvaluationsTablePage />
    </div>
  );
}
