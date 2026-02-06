"use server";

import { createPaginatedActions } from "@/shared/application/use-cases/create-paginated-actions";
import type { Warehouse } from "../../domain/entities/warehouse.entity";

const actions = createPaginatedActions<Warehouse>("/inventory/warehouses");

export const findAllPaginated = actions.findAllPaginated;
export const findById = actions.findById;
export const create = actions.create;
export const update = actions.update;
export const remove = actions.remove;
