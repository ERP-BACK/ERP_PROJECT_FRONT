"use client";

import { usePaginatedModule } from "@/shared/presentation/hooks/use-paginated-module";
import * as actions from "../../application/use-cases/sales-channel.actions";
import type { SalesChannel } from "../../domain/entities/sales-channel.entity";

export function useSalesChannels() {
  return usePaginatedModule<SalesChannel>("sales-channels", actions);
}
