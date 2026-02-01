import Link from "next/link";
import { getAllCompanies } from "@/action/company/get-all-companies.action";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Plus } from "lucide-react";

export default async function CompaniesPage() {
  let companies: Awaited<ReturnType<typeof getAllCompanies>> = [];
  let error: string | null = null;

  try {
    companies = await getAllCompanies();
  } catch (e) {
    error = e instanceof Error ? e.message : "Error al cargar compañías";
  }

  return (
    <main className="flex-1 p-6">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Compañías</h1>
        <Link href="/dashboard/admin/companies/create">
          <Button>
            <Plus className="mr-2 h-4 w-4" />
            Crear Compañía
          </Button>
        </Link>
      </div>

      {error ? (
        <div className="rounded-md border border-red-200 bg-red-50 p-4 text-red-700">
          {error}
        </div>
      ) : (
        <div className="rounded-md border bg-white">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Nombre</TableHead>
                <TableHead>NIT / Tax ID</TableHead>
                <TableHead>Email</TableHead>
                <TableHead>Estado Tenant</TableHead>
                <TableHead>Fecha Creación</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {companies.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="text-center text-gray-500 py-8">
                    No hay compañías registradas
                  </TableCell>
                </TableRow>
              ) : (
                companies.map((company) => (
                  <TableRow key={company.company_Id}>
                    <TableCell className="font-medium">{company.name}</TableCell>
                    <TableCell>{company.tax_id}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>
                      <span
                        className={
                          company.tenant_status === "provisioned"
                            ? "inline-flex items-center rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-800"
                            : company.tenant_status === "failed"
                            ? "inline-flex items-center rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-800"
                            : "inline-flex items-center rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800"
                        }
                      >
                        {company.tenant_status}
                      </span>
                    </TableCell>
                    <TableCell>
                      {new Date(company.created_at).toLocaleDateString("es-CO")}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      )}
    </main>
  );
}
