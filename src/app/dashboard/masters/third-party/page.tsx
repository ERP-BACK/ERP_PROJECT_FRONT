import { MainTablePageThirparty } from "./ui/MainTablePageThirparty";

async function ThirdPartypage() {
  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Maestros</h1>
        <p className="text-sm text-muted-foreground">
          Gestion de terceros
        </p>
      </div>
      <MainTablePageThirparty />
    </div>
  );
}

export default ThirdPartypage;
