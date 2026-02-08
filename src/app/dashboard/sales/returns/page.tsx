import { ReturnsTablePage } from "./presentation/components/ReturnsTablePage";

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

      <ReturnsTablePage />
    </div>
  );
}
