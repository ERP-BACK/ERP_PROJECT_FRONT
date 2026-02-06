"use server";

import { createSearchAction } from "@/shared/application/use-cases/create-search-action";
import type { Warehouse } from "../../domain/entities/warehouse.entity";

const search = createSearchAction<Warehouse & Record<string, unknown>>(
  "/inventory/warehouses",
  {
    code: "code",
    value: "name",
    searchFields: ["code", "name"],
    metaFields: ["warehouse_id", "city", "is_default"],
  }
);

export async function searchWarehouses(query: string) {
  return search(query);
}
