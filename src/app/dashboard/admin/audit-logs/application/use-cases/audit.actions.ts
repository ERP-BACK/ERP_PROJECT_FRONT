"use server";

import { apiClient } from "@/lib/api";
import type {
  AuditLog,
  AuditFilters,
  AuditReportFilters,
  AuditLogsPaginated,
} from "../../domain/entities/audit-log.entity";

export type { AuditFilters, AuditReportFilters };

export async function getAuditLogs(filters: AuditFilters): Promise<AuditLogsPaginated> {
  return apiClient<AuditLogsPaginated>('/onerp/system/audit/logs', {
    method: 'POST',
    body: JSON.stringify(filters),
  });
}

export async function getEntityHistory(
  entityType: string,
  entityId: string
): Promise<AuditLog[]> {
  return apiClient<AuditLog[]>('/onerp/system/audit/entity-history', {
    method: 'POST',
    body: JSON.stringify({ entity_type: entityType, entity_id: entityId }),
  });
}

export async function getAuditReport(filters: AuditReportFilters): Promise<Blob> {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_API_URL}/onerp/system/audit/report`,
    {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(filters),
    }
  );

  if (!response.ok) {
    throw new Error('Error al generar el reporte');
  }

  return response.blob();
}
