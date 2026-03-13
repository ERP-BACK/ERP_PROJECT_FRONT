import type { FormConfig } from "@/shared/presentation/types/form-config.types";

export const uomFormConfig: FormConfig = {
  fields: [
    { name: "code", label: "Código", type: "text", required: true, maxLength: 20 },
    { name: "name", label: "Nombre", type: "text", required: true, maxLength: 100 },
    { name: "description", label: "Descripción", type: "textarea", maxLength: 255, gridCols: 2 },
    {
      name: "category",
      label: "Categoría",
      type: "select",
      required: true,
      options: [
        { label: "Unidad", value: "unit" },
        { label: "Peso", value: "weight" },
        { label: "Longitud", value: "length" },
        { label: "Volumen", value: "volume" },
        { label: "Área", value: "area" },
        { label: "Tiempo", value: "time" },
        { label: "Otro", value: "other" },
      ],
    },
    { name: "conversion_factor", label: "Factor de Conversión", type: "number", min: 0, defaultValue: 1 },
    { name: "is_base", label: "Unidad Base", type: "boolean", defaultValue: false },
    { name: "is_active", label: "Activo", type: "boolean", defaultValue: true },
  ],
};
