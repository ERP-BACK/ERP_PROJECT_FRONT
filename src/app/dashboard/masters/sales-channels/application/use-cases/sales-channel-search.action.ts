"use server";

import { createSearchAction } from "@/shared/application/use-cases/create-search-action";
import type { SalesChannel } from "../../domain/entities/sales-channel.entity";

const search = createSearchAction<SalesChannel & Record<string, unknown>>(
  "/onerp/sales-channels",
  {
    code: "sales_channel_id",
    value: "name",
    searchFields: ["code", "name"],
    metaFields: ["code", "channel_type"],
  }
);

export async function searchSalesChannels(query: string) {
  return search(query);
}
