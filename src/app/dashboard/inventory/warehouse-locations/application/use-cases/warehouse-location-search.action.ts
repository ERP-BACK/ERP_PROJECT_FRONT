"use server";

import { createSearchAction } from "@/shared/application/use-cases/create-search-action";
import type { WarehouseLocation } from "../../domain/entities/warehouse-location.entity";

const search = createSearchAction<WarehouseLocation & Record<string, unknown>>(
  "/inventory/warehouse-locations",
  {
    code: "code",
    value: "name",
    searchFields: ["code", "name", "full_path"],
    metaFields: ["location_id", "warehouse_id", "location_type"],
  }
);

export async function searchWarehouseLocations(query: string) {
  return search(query);
}
