import { PurchaseOrdersTablePage } from "./presentation/components/PurchaseOrdersTablePage";

export default function PurchaseOrdersPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Órdenes de Compra
        </h1>
        <p className="text-sm text-muted-foreground">
          Gestiona las órdenes de compra, desde borradores hasta recepción
        </p>
      </div>

      <PurchaseOrdersTablePage />
    </div>
  );
}
