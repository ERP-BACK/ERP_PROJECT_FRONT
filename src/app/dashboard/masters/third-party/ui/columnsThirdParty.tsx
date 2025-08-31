"use client";

import { Badge } from "@/components/ui/badge";
import { ColumnDef } from "@tanstack/react-table";

export type thirdPartyColumns = {
  third_party_id: string;
  comercial_name: string;
  credit_limit: number;
  balance: number;
  email: string;
  tax_regime: string;
  status: string;
  Type: string;
};

export const columnsThirdParty: ColumnDef<thirdPartyColumns>[] = [
  {
    accessorKey: "comercial_name",
    header: "Nombre comercial",
  },
  {
    accessorKey: "credit_limit",
    header: "Limite de credito",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("credit_limit"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "balance",
    header: "Balance",
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("balance"));
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);
      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "tax_regime",
    header: "Regimen",
  },
  {
    accessorKey: "status",
    header: "Estatus",
    cell: ({ row }) => {
      const status: string = row.getValue("status");
      return (
        <Badge
          variant={
            status === "active"
              ? "success"
              : status === "inactive"
              ? "warning"
              : status === "inactivea"
              ? "destructive"
              : "outline"
          }
        >
          {status}
        </Badge>
      );
    },
  },
];
