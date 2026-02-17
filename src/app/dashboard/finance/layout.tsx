import { PageSideTitle } from "@/components/pagetabComponent/PageSideTitle";

export default function InventoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col gap-6 p-6">
      <PageSideTitle
        title="Finanzas"
        subtitle="Gestión de finanzas, presupuestos y reportes financieros"
      >
        {children}
      </PageSideTitle>
    </div>
  );
}
