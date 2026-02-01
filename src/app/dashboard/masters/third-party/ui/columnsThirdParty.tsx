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

const currency = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export const columnsThirdParty: ColumnDef<thirdPartyColumns>[] = [
  {
    accessorKey: "comercial_name",
    header: "Nombre comercial",
    cell: ({ row }) => (
      <span className="font-medium">{row.getValue("comercial_name")}</span>
    ),
  },
  {
    accessorKey: "credit_limit",
    header: () => <span className="block text-right">Limite de credito</span>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("credit_limit"));
      return (
        <div className="text-right tabular-nums">
          {currency.format(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "balance",
    header: () => <span className="block text-right">Balance</span>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("balance"));
      return (
        <div className="text-right tabular-nums">
          {currency.format(amount)}
        </div>
      );
    },
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => (
      <span className="text-muted-foreground">{row.getValue("email")}</span>
    ),
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
