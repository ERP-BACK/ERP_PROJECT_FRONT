import type { FormConfig } from "@/shared/presentation/types/form-config.types";

export const taxCodeFormConfig: FormConfig = {
  fields: [
    { name: "code", label: "Código", type: "text", required: true, maxLength: 30 },
    { name: "name", label: "Nombre", type: "text", required: true, maxLength: 150 },
    { name: "description", label: "Descripción", type: "textarea", maxLength: 500, gridCols: 2 },
    {
      name: "tax_type",
      label: "Tipo de Impuesto",
      type: "select",
      required: true,
      options: [
        { label: "IVA", value: "iva" },
        { label: "ICO", value: "ico" },
        { label: "ICA", value: "ica" },
        { label: "Retención en la Fuente", value: "retefuente" },
        { label: "ReteIVA", value: "reteiva" },
        { label: "ReteICA", value: "reteica" },
        { label: "Otro", value: "other" },
      ],
    },
    { name: "tax_rate", label: "Tarifa (%)", type: "number", required: true, min: 0 },
    {
      name: "applies_to",
      label: "Aplica a",
      type: "select",
      options: [
        { label: "Ventas", value: "sales" },
        { label: "Compras", value: "purchases" },
        { label: "Ambos", value: "both" },
      ],
      defaultValue: "both",
    },
    { name: "is_inclusive", label: "Incluido en precio", type: "boolean", defaultValue: false },
    { name: "is_default", label: "Predeterminado", type: "boolean", defaultValue: false },
    { name: "is_active", label: "Activo", type: "boolean", defaultValue: true },
  ],
};
