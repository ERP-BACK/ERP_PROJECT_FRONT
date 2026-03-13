"use client";

import { usePaginatedModule } from "@/shared/presentation/hooks/use-paginated-module";
import * as actions from "../../application/use-cases/uom.actions";
import type { Uom } from "../../domain/entities/uom.entity";

export function useUoms() {
  return usePaginatedModule<Uom>("uom", actions);
}
