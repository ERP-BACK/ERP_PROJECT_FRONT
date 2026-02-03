import type { FormConfig } from "@/shared/presentation/types/form-config.types";

export const cityFormConfig: FormConfig = {
  fields: [
    { name: "state_id", label: "ID Departamento", type: "text", required: true, placeholder: "UUID del departamento" },
    { name: "code", label: "Código", type: "text", required: true, maxLength: 20 },
    { name: "name", label: "Nombre", type: "text", required: true, maxLength: 150 },
    { name: "dane_code", label: "Código DANE", type: "text", required: true, maxLength: 20, placeholder: "Código DANE" },
    { name: "postal_code", label: "Código Postal", type: "text", maxLength: 20 },
    { name: "iso_code", label: "Código ISO", type: "text", maxLength: 20 },
    { name: "is_capital", label: "Es Capital", type: "boolean", defaultValue: false },
    { name: "is_active", label: "Activo", type: "boolean", defaultValue: true },
  ],
};
