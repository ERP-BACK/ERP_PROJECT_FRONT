"use client";

import { usePaginatedModule } from "@/shared/presentation/hooks/use-paginated-module";
import * as actions from "../../application/use-cases/tax-code.actions";
import type { TaxCode } from "../../domain/entities/tax-code.entity";

export function useTaxCodes() {
  return usePaginatedModule<TaxCode>("tax-codes", actions);
}
