"use client";

import type { ColumnDef } from "@tanstack/react-table";
import { Badge } from "@/components/ui/badge";
import type { TaxCode } from "../../domain/entities/tax-code.entity";

export const columnsTaxCodes: ColumnDef<TaxCode>[] = [
  {
    accessorKey: "code",
    header: "Código",
    cell: ({ row }) => <span className="font-medium">{row.getValue("code")}</span>,
  },
  {
    accessorKey: "name",
    header: "Nombre",
  },
  {
    accessorKey: "tax_type",
    header: "Tipo",
  },
  {
    accessorKey: "tax_rate",
    header: "Tarifa",
    cell: ({ row }) => {
      const rate = row.getValue("tax_rate") as number;
      return <span>{rate}%</span>;
    },
  },
  {
    accessorKey: "is_active",
    header: "Estado",
    cell: ({ row }) => {
      const active = row.getValue("is_active") as boolean;
      return (
        <Badge variant={active ? "success" : "destructive"}>
          {active ? "Activo" : "Inactivo"}
        </Badge>
      );
    },
  },
];
