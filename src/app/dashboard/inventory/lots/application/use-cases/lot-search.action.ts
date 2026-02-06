"use server";

import { createSearchAction } from "@/shared/application/use-cases/create-search-action";
import type { Lot } from "../../domain/entities/lot.entity";

const search = createSearchAction<Lot & Record<string, unknown>>(
  "/inventory/lots",
  {
    code: "lot_number",
    value: "lot_number",
    searchFields: ["lot_number", "internal_lot", "supplier_lot"],
    metaFields: ["lot_id", "product_id", "current_quantity", "expiration_date", "status"],
  }
);

export async function searchLots(query: string) {
  return search(query);
}
