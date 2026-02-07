import { ReceiptsTablePage } from "./presentation/components/ReceiptsTablePage";

export default function ReceiptsPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">
          Recepciones
        </h1>
        <p className="text-sm text-muted-foreground">
          Gestiona las recepciones de mercancía de órdenes de compra
        </p>
      </div>

      <ReceiptsTablePage />
    </div>
  );
}
