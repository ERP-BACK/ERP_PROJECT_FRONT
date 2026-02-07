// Purchase Order Status
export type PurchaseOrderStatus =
  | "draft"
  | "pending_approval"
  | "approved"
  | "sent"
  | "partial_received"
  | "received"
  | "invoiced"
  | "cancelled";

export const PURCHASE_ORDER_STATUS_OPTIONS = [
  { value: "draft", label: "Borrador" },
  { value: "pending_approval", label: "Pendiente Aprobación" },
  { value: "approved", label: "Aprobada" },
  { value: "sent", label: "Enviada" },
  { value: "partial_received", label: "Parcialmente Recibida" },
  { value: "received", label: "Recibida" },
  { value: "invoiced", label: "Facturada" },
  { value: "cancelled", label: "Cancelada" },
] as const;

// Purchase Order Line Status
export type PurchaseOrderLineStatus = "open" | "partial" | "completed" | "cancelled";

export const PURCHASE_ORDER_LINE_STATUS_OPTIONS = [
  { value: "open", label: "Abierta" },
  { value: "partial", label: "Parcial" },
  { value: "completed", label: "Completada" },
  { value: "cancelled", label: "Cancelada" },
] as const;

// Purchase Source Type
export type PurchaseSourceType = "requisition" | "manual" | "reorder";

export const PURCHASE_SOURCE_TYPE_OPTIONS = [
  { value: "requisition", label: "Requisición" },
  { value: "manual", label: "Manual" },
  { value: "reorder", label: "Reorden" },
] as const;

// Helper to get label from value
export function getPurchaseOrderStatusLabel(status: PurchaseOrderStatus): string {
  return PURCHASE_ORDER_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}

export function getPurchaseOrderLineStatusLabel(status: PurchaseOrderLineStatus): string {
  return PURCHASE_ORDER_LINE_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}

export function getPurchaseSourceTypeLabel(type: PurchaseSourceType): string {
  return PURCHASE_SOURCE_TYPE_OPTIONS.find((o) => o.value === type)?.label ?? type;
}

// Status color helpers for badges
export function getPurchaseOrderStatusColor(status: PurchaseOrderStatus): string {
  switch (status) {
    case "draft":
      return "bg-muted text-muted-foreground";
    case "pending_approval":
      return "bg-warning/15 text-warning";
    case "approved":
      return "bg-primary/15 text-primary";
    case "sent":
      return "bg-chart-2/15 text-chart-2";
    case "partial_received":
      return "bg-chart-4/15 text-chart-4";
    case "received":
      return "bg-success/15 text-success";
    case "invoiced":
      return "bg-success/15 text-success";
    case "cancelled":
      return "bg-destructive/15 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
}

// Requisition Status
export type RequisitionStatus =
  | "draft"
  | "pending_approval"
  | "approved"
  | "rejected"
  | "partially_ordered"
  | "ordered"
  | "cancelled";

export const REQUISITION_STATUS_OPTIONS = [
  { value: "draft", label: "Borrador" },
  { value: "pending_approval", label: "Pendiente Aprobación" },
  { value: "approved", label: "Aprobada" },
  { value: "rejected", label: "Rechazada" },
  { value: "partially_ordered", label: "Parcialmente Ordenada" },
  { value: "ordered", label: "Ordenada" },
  { value: "cancelled", label: "Cancelada" },
] as const;

export function getRequisitionStatusLabel(status: RequisitionStatus): string {
  return REQUISITION_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}

export function getRequisitionStatusColor(status: RequisitionStatus): string {
  switch (status) {
    case "draft":
      return "bg-muted text-muted-foreground";
    case "pending_approval":
      return "bg-warning/15 text-warning";
    case "approved":
      return "bg-primary/15 text-primary";
    case "rejected":
      return "bg-destructive/15 text-destructive";
    case "partially_ordered":
      return "bg-chart-2/15 text-chart-2";
    case "ordered":
      return "bg-success/15 text-success";
    case "cancelled":
      return "bg-destructive/15 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
}

// Receipt Status
export type ReceiptStatus =
  | "draft"
  | "pending_inspection"
  | "inspected"
  | "received"
  | "partial"
  | "cancelled";

export const RECEIPT_STATUS_OPTIONS = [
  { value: "draft", label: "Borrador" },
  { value: "pending_inspection", label: "Pendiente Inspección" },
  { value: "inspected", label: "Inspeccionado" },
  { value: "received", label: "Recibido" },
  { value: "partial", label: "Parcial" },
  { value: "cancelled", label: "Cancelado" },
] as const;

export function getReceiptStatusLabel(status: ReceiptStatus): string {
  return RECEIPT_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}

export function getReceiptStatusColor(status: ReceiptStatus): string {
  switch (status) {
    case "draft":
      return "bg-muted text-muted-foreground";
    case "pending_inspection":
      return "bg-warning/15 text-warning";
    case "inspected":
      return "bg-primary/15 text-primary";
    case "received":
      return "bg-success/15 text-success";
    case "partial":
      return "bg-chart-2/15 text-chart-2";
    case "cancelled":
      return "bg-destructive/15 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
}

// Vendor Evaluation Classification
export type VendorClassification = "A" | "B" | "C" | "D" | "F";

export const VENDOR_CLASSIFICATION_OPTIONS = [
  { value: "A", label: "Excelente (A)" },
  { value: "B", label: "Bueno (B)" },
  { value: "C", label: "Aceptable (C)" },
  { value: "D", label: "Deficiente (D)" },
  { value: "F", label: "Inaceptable (F)" },
] as const;

export function getVendorClassificationLabel(classification: VendorClassification): string {
  return VENDOR_CLASSIFICATION_OPTIONS.find((o) => o.value === classification)?.label ?? classification;
}

export function getVendorClassificationColor(classification: VendorClassification): string {
  switch (classification) {
    case "A":
      return "bg-success/15 text-success";
    case "B":
      return "bg-primary/15 text-primary";
    case "C":
      return "bg-warning/15 text-warning";
    case "D":
      return "bg-chart-4/15 text-chart-4";
    case "F":
      return "bg-destructive/15 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
}
