import { SalesChannelsTablePage } from "./presentation/components/SalesChannelsTablePage";

export default function SalesChannelsPage() {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Canales de Ventas</h1>
        <p className="text-sm text-muted-foreground">Gestión de canales de ventas</p>
      </div>
      <SalesChannelsTablePage />
    </div>
  );
}
