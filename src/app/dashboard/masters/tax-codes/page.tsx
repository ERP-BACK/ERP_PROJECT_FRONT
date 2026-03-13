import { TaxCodesTablePage } from "./presentation/components/TaxCodesTablePage";

export default function TaxCodesPage() {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Códigos de Impuesto</h1>
        <p className="text-sm text-muted-foreground">Gestión de códigos de impuesto</p>
      </div>
      <TaxCodesTablePage />
    </div>
  );
}
