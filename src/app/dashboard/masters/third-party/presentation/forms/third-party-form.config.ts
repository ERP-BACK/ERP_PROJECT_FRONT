import type { FormConfig } from "@/shared/presentation/types/form-config.types";

export const thirdPartyFormConfig: FormConfig = {
  fields: [],
  sections: [
    {
      title: "Datos principales",
      description: "Identificación y clasificación del tercero",
      fields: [
        {
          name: "type",
          label: "Tipo",
          type: "select",
          required: true,
          options: [
            { label: "Cliente", value: "customer" },
            { label: "Proveedor", value: "supplier" },
            { label: "Ambos", value: "both" },
            { label: "Empleado", value: "employee" },
            { label: "Contratista", value: "contractor" },
          ],
          gridCols: 1,
        },
        {
          name: "status",
          label: "Estado",
          type: "select",
          required: true,
          options: [
            { label: "Activo", value: "active" },
            { label: "Inactivo", value: "inactive" },
            { label: "Suspendido", value: "suspended" },
            { label: "Bloqueado", value: "blocked" },
          ],
          gridCols: 1,
        },
        { name: "tax_id", label: "NIT / Identificación", type: "text", required: true, maxLength: 30, gridCols: 1 },
        { name: "verification_dv", label: "DV", type: "text", maxLength: 2, gridCols: 1 },
        { name: "legal_name", label: "Razón Social", type: "text", required: true, maxLength: 150, gridCols: 2 },
        { name: "comercial_name", label: "Nombre Comercial", type: "text", maxLength: 150, gridCols: 2 },
      ],
    },
    {
      title: "Contacto",
      description: "Datos de comunicación de la empresa",
      fields: [
        { name: "email", label: "Email", type: "text", maxLength: 100, placeholder: "correo@ejemplo.com", gridCols: 1 },
        { name: "phone", label: "Teléfono", type: "text", maxLength: 25, gridCols: 1 },
        { name: "mobili", label: "Celular", type: "text", maxLength: 25, gridCols: 1 },
        { name: "website", label: "Sitio web", type: "text", maxLength: 255, gridCols: 1 },
      ],
    },
    {
      title: "Información fiscal",
      description: "Régimen tributario y crédito",
      fields: [
        { name: "tax_regime", label: "Régimen Tributario", type: "text", required: true, maxLength: 50, gridCols: 1 },
        { name: "credit_limit", label: "Límite de Crédito", type: "number", min: 0, gridCols: 1 },
      ],
    },
    {
      title: "Dirección principal",
      description: "Ubicación de facturación o envío",
      fields: [
        {
          name: "address_label",
          label: "Tipo de Dirección",
          type: "select",
          options: [
            { label: "Facturación", value: "billing" },
            { label: "Envío", value: "shopping" },
            { label: "Oficina", value: "office" },
            { label: "Bodega", value: "warehouse" },
            { label: "Otro", value: "other" },
          ],
          defaultValue: "billing",
          gridCols: 1,
        },
        { name: "address_country", label: "País", type: "text", gridCols: 1 },
        { name: "address_state", label: "Departamento", type: "text", gridCols: 1 },
        { name: "address_city", label: "Ciudad", type: "text", gridCols: 1 },
        { name: "address_street_line1", label: "Dirección línea 1", type: "text", gridCols: 2 },
        { name: "address_street_line2", label: "Dirección línea 2", type: "text", gridCols: 2 },
        { name: "address_postal_code", label: "Código Postal", type: "text", maxLength: 20, gridCols: 1 },
      ],
    },
    {
      title: "Contacto principal",
      description: "Persona de referencia en la empresa",
      fields: [
        { name: "contact_full_name", label: "Nombre del Contacto", type: "text", gridCols: 1 },
        { name: "contact_role", label: "Cargo", type: "text", gridCols: 1 },
        { name: "contact_email", label: "Email del Contacto", type: "text", gridCols: 1 },
        { name: "contact_phone", label: "Teléfono del Contacto", type: "text", gridCols: 1 },
      ],
    },
    {
      title: "Cuenta bancaria",
      description: "Datos para pagos y transferencias",
      fields: [
        { name: "bank_name", label: "Banco", type: "text", gridCols: 1 },
        {
          name: "bank_account_type",
          label: "Tipo de Cuenta",
          type: "select",
          options: [
            { label: "Corriente", value: "checking" },
            { label: "Ahorros", value: "savings" },
            { label: "Otro", value: "other" },
          ],
          defaultValue: "checking",
          gridCols: 1,
        },
        { name: "bank_account_number", label: "Número de Cuenta", type: "text", gridCols: 1 },
        { name: "bank_currency", label: "Moneda", type: "text", maxLength: 10, placeholder: "COP", gridCols: 1 },
      ],
    },
  ],
};
