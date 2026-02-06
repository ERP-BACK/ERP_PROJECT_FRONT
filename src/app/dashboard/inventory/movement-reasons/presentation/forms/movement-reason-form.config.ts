import type { FormConfig } from "@/shared/presentation/types/form-config.types";

export const movementReasonFormConfig: FormConfig = {
  fields: [
    {
      name: "code",
      label: "Código",
      type: "text",
      required: true,
      maxLength: 50,
      placeholder: "Ej: ADJ-001",
    },
    {
      name: "name",
      label: "Nombre",
      type: "text",
      required: true,
      maxLength: 200,
      placeholder: "Nombre de la razón de movimiento",
    },
    {
      name: "description",
      label: "Descripción",
      type: "textarea",
      gridCols: 2,
      placeholder: "Descripción detallada (opcional)",
    },
    {
      name: "requires_approval",
      label: "Requiere Aprobación",
      type: "boolean",
      defaultValue: false,
    },
    {
      name: "is_active",
      label: "Activo",
      type: "boolean",
      defaultValue: true,
    },
  ],
};
