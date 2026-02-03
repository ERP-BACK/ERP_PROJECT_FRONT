import { CountriesTablePage } from "./presentation/components/CountriesTablePage";

export default function CountryPage() {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Países</h1>
        <p className="text-sm text-muted-foreground">Gestión de países</p>
      </div>
      <CountriesTablePage />
    </div>
  );
}
