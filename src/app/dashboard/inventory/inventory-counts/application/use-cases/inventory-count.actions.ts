"use server";

import { createPaginatedActions } from "@/shared/application/use-cases/create-paginated-actions";
import type { InventoryCount } from "../../domain/entities/inventory-count.entity";

const actions = createPaginatedActions<InventoryCount>("/inventory/inventory-counts");

export const findAllPaginated = actions.findAllPaginated;
export const findById = actions.findById;
export const create = actions.create;
export const update = actions.update;
export const remove = actions.remove;
