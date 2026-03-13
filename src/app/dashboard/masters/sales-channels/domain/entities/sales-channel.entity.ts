import type { BaseEntity } from "@/shared/domain/base/base-entity.types";

export interface SalesChannel extends BaseEntity {
  code: string;
  name: string;
  description?: string;
  channel_type: string;
  is_active: boolean;
}
