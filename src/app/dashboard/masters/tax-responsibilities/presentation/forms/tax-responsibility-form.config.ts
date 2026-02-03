import type { FormConfig } from "@/shared/presentation/types/form-config.types";

export const taxResponsibilityFormConfig: FormConfig = {
  fields: [
    { name: "code", label: "Código", type: "text", required: true, maxLength: 30 },
    { name: "name", label: "Nombre", type: "text", required: true, maxLength: 150 },
    { name: "description", label: "Descripción", type: "textarea", maxLength: 500, gridCols: 2 },
    { name: "dian_code", label: "Código DIAN", type: "text", maxLength: 20 },
    {
      name: "responsibility_type",
      label: "Tipo de Responsabilidad",
      type: "select",
      options: [
        { label: "Impuesto de Renta", value: "income_tax" },
        { label: "Impuesto de Ventas (IVA)", value: "sales_tax" },
        { label: "Retención en la Fuente", value: "withholding" },
        { label: "Informante", value: "informant" },
        { label: "Otro", value: "other" },
      ],
      defaultValue: "other",
    },
    { name: "country_id", label: "ID País", type: "text", required: true, placeholder: "UUID del país" },
    { name: "is_active", label: "Activo", type: "boolean", defaultValue: true },
  ],
};
