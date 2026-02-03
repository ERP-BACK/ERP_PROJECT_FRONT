import type { FormConfig } from "@/shared/presentation/types/form-config.types";

export const bankAccountFormConfig: FormConfig = {
  sections: [
    {
      title: "Datos de la Cuenta",
      fields: [
        { name: "bank_id", label: "ID del Banco", type: "text", required: true, placeholder: "UUID del banco" },
        { name: "account_number", label: "Número de Cuenta", type: "text", required: true, maxLength: 50 },
        { name: "account_name", label: "Nombre de Cuenta", type: "text", required: true, maxLength: 150 },
        {
          name: "account_type",
          label: "Tipo de Cuenta",
          type: "select",
          options: [
            { label: "Corriente", value: "checking" },
            { label: "Ahorros", value: "savings" },
            { label: "Mercado Monetario", value: "money_market" },
            { label: "Certificado", value: "certificate" },
            { label: "Moneda Extranjera", value: "foreign" },
          ],
          defaultValue: "checking",
        },
      ],
    },
    {
      title: "Titular",
      fields: [
        { name: "holder_name", label: "Nombre del Titular", type: "text", maxLength: 150 },
        { name: "holder_document", label: "Documento del Titular", type: "text", maxLength: 50 },
        { name: "branch_name", label: "Sucursal Bancaria", type: "text", maxLength: 150 },
      ],
    },
    {
      title: "Saldos",
      fields: [
        { name: "opening_balance", label: "Saldo Inicial", type: "number", min: 0, defaultValue: 0 },
        { name: "opening_balance_date", label: "Fecha Saldo Inicial", type: "date" },
        { name: "notes", label: "Notas", type: "textarea", gridCols: 2 },
        { name: "is_default", label: "Cuenta Predeterminada", type: "boolean", defaultValue: false },
        { name: "is_active", label: "Activo", type: "boolean", defaultValue: true },
      ],
    },
  ],
  fields: [],
};
