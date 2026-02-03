import { RegionsZonesTablePage } from "./presentation/components/RegionsZonesTablePage";

export default function RegionZonePage() {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Regiones y Zonas</h1>
        <p className="text-sm text-muted-foreground">Gestión de regiones y zonas</p>
      </div>
      <RegionsZonesTablePage />
    </div>
  );
}
