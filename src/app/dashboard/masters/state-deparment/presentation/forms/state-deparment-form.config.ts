import type { FormConfig } from "@/shared/presentation/types/form-config.types";

export const stateDeparmentFormConfig: FormConfig = {
  fields: [
    { name: "country_id", label: "ID País", type: "text", required: true, placeholder: "UUID del país" },
    { name: "code", label: "Código", type: "text", required: true, maxLength: 20 },
    { name: "name", label: "Nombre", type: "text", required: true, maxLength: 150 },
    { name: "dane_code", label: "Código DANE", type: "text", required: true, maxLength: 20, placeholder: "Código DANE" },
    { name: "iso_code", label: "Código ISO", type: "text", maxLength: 20 },
    { name: "is_active", label: "Activo", type: "boolean", defaultValue: true },
  ],
};
