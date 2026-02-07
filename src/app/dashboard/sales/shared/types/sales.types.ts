// Sales Order Status
export type SalesOrderStatus =
  | "draft"
  | "pending_approval"
  | "approved"
  | "confirmed"
  | "partial_shipped"
  | "completed"
  | "cancelled";

export const SALES_ORDER_STATUS_OPTIONS = [
  { value: "draft", label: "Borrador" },
  { value: "pending_approval", label: "Pendiente Aprobación" },
  { value: "approved", label: "Aprobada" },
  { value: "confirmed", label: "Confirmada" },
  { value: "partial_shipped", label: "Parcialmente Enviada" },
  { value: "completed", label: "Completada" },
  { value: "cancelled", label: "Cancelada" },
] as const;

// Sales Order Approval Status
export type SalesOrderApprovalStatus = "pending" | "approved" | "rejected";

export const SALES_ORDER_APPROVAL_STATUS_OPTIONS = [
  { value: "pending", label: "Pendiente" },
  { value: "approved", label: "Aprobado" },
  { value: "rejected", label: "Rechazado" },
] as const;

// Sales Order Line Status
export type SalesOrderLineStatus = "open" | "partial" | "completed" | "cancelled";

export const SALES_ORDER_LINE_STATUS_OPTIONS = [
  { value: "open", label: "Abierta" },
  { value: "partial", label: "Parcial" },
  { value: "completed", label: "Completada" },
  { value: "cancelled", label: "Cancelada" },
] as const;

// Helper to get label from value
export function getSalesOrderStatusLabel(status: SalesOrderStatus): string {
  return SALES_ORDER_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}

export function getSalesOrderApprovalStatusLabel(status: SalesOrderApprovalStatus): string {
  return SALES_ORDER_APPROVAL_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}

export function getSalesOrderLineStatusLabel(status: SalesOrderLineStatus): string {
  return SALES_ORDER_LINE_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}

// Status color helpers for badges
export function getSalesOrderStatusColor(status: SalesOrderStatus): string {
  switch (status) {
    case "draft":
      return "bg-muted text-muted-foreground";
    case "pending_approval":
      return "bg-warning/15 text-warning";
    case "approved":
      return "bg-primary/15 text-primary";
    case "confirmed":
      return "bg-success/15 text-success";
    case "partial_shipped":
      return "bg-chart-2/15 text-chart-2";
    case "completed":
      return "bg-success/15 text-success";
    case "cancelled":
      return "bg-destructive/15 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
}

// Quotation Status
export type QuotationStatus = "draft" | "sent" | "accepted" | "rejected" | "expired" | "converted";

export const QUOTATION_STATUS_OPTIONS = [
  { value: "draft", label: "Borrador" },
  { value: "sent", label: "Enviada" },
  { value: "accepted", label: "Aceptada" },
  { value: "rejected", label: "Rechazada" },
  { value: "expired", label: "Expirada" },
  { value: "converted", label: "Convertida" },
] as const;

export function getQuotationStatusLabel(status: QuotationStatus): string {
  return QUOTATION_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}

export function getQuotationStatusColor(status: QuotationStatus): string {
  switch (status) {
    case "draft":
      return "bg-muted text-muted-foreground";
    case "sent":
      return "bg-primary/15 text-primary";
    case "accepted":
      return "bg-success/15 text-success";
    case "rejected":
      return "bg-destructive/15 text-destructive";
    case "expired":
      return "bg-warning/15 text-warning";
    case "converted":
      return "bg-chart-2/15 text-chart-2";
    default:
      return "bg-muted text-muted-foreground";
  }
}

// Shipment Status
export type ShipmentStatus = "draft" | "ready" | "shipped" | "delivered" | "cancelled";

export const SHIPMENT_STATUS_OPTIONS = [
  { value: "draft", label: "Borrador" },
  { value: "ready", label: "Listo para Envío" },
  { value: "shipped", label: "Enviado" },
  { value: "delivered", label: "Entregado" },
  { value: "cancelled", label: "Cancelado" },
] as const;

export function getShipmentStatusLabel(status: ShipmentStatus): string {
  return SHIPMENT_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}

export function getShipmentStatusColor(status: ShipmentStatus): string {
  switch (status) {
    case "draft":
      return "bg-muted text-muted-foreground";
    case "ready":
      return "bg-primary/15 text-primary";
    case "shipped":
      return "bg-chart-2/15 text-chart-2";
    case "delivered":
      return "bg-success/15 text-success";
    case "cancelled":
      return "bg-destructive/15 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
}

// Return Status
export type ReturnStatus = "draft" | "pending_approval" | "approved" | "received" | "processed" | "cancelled";

export const RETURN_STATUS_OPTIONS = [
  { value: "draft", label: "Borrador" },
  { value: "pending_approval", label: "Pendiente Aprobación" },
  { value: "approved", label: "Aprobada" },
  { value: "received", label: "Recibida" },
  { value: "processed", label: "Procesada" },
  { value: "cancelled", label: "Cancelada" },
] as const;

export function getReturnStatusLabel(status: ReturnStatus): string {
  return RETURN_STATUS_OPTIONS.find((o) => o.value === status)?.label ?? status;
}

export function getReturnStatusColor(status: ReturnStatus): string {
  switch (status) {
    case "draft":
      return "bg-muted text-muted-foreground";
    case "pending_approval":
      return "bg-warning/15 text-warning";
    case "approved":
      return "bg-primary/15 text-primary";
    case "received":
      return "bg-chart-2/15 text-chart-2";
    case "processed":
      return "bg-success/15 text-success";
    case "cancelled":
      return "bg-destructive/15 text-destructive";
    default:
      return "bg-muted text-muted-foreground";
  }
}
