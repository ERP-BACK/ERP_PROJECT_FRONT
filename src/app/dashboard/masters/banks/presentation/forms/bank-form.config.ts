import type { FormConfig } from "@/shared/presentation/types/form-config.types";

export const bankFormConfig: FormConfig = {
  fields: [
    { name: "bank_code", label: "Código del Banco", type: "text", required: true, maxLength: 20 },
    { name: "bank_name", label: "Nombre del Banco", type: "text", required: true, maxLength: 150 },
    { name: "short_name", label: "Nombre Corto", type: "text", maxLength: 50 },
    { name: "swift_code", label: "Código SWIFT", type: "text", maxLength: 20, placeholder: "Ej: BABORABB" },
    { name: "country_id", label: "ID País", type: "text", required: true, placeholder: "UUID del país" },
    { name: "website", label: "Sitio Web", type: "text", maxLength: 255, placeholder: "https://www.banco.com" },
    { name: "is_active", label: "Activo", type: "boolean", defaultValue: true },
  ],
};
