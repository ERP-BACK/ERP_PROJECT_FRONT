import type { FormConfig } from "@/shared/presentation/types/form-config.types";

export const salesChannelFormConfig: FormConfig = {
  fields: [
    { name: "code", label: "Código", type: "text", required: true, maxLength: 30 },
    { name: "name", label: "Nombre", type: "text", required: true, maxLength: 150 },
    { name: "description", label: "Descripción", type: "textarea", maxLength: 500, gridCols: 2 },
    {
      name: "channel_type",
      label: "Tipo de Canal",
      type: "select",
      required: true,
      options: [
        { label: "Físico", value: "physical" },
        { label: "En línea", value: "online" },
        { label: "Mayorista", value: "wholesale" },
        { label: "Minorista", value: "retail" },
        { label: "Televentas", value: "telesales" },
        { label: "Otro", value: "other" },
      ],
    },
    { name: "is_active", label: "Activo", type: "boolean", defaultValue: true },
  ],
};
