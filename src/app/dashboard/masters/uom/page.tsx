import { UomTablePage } from "./presentation/components/UomTablePage";

export default function UomPage() {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Unidades de Medida</h1>
        <p className="text-sm text-muted-foreground">Gestión de unidades de medida</p>
      </div>
      <UomTablePage />
    </div>
  );
}
