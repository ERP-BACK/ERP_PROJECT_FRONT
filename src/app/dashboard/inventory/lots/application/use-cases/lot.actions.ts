"use server";

import { createPaginatedActions } from "@/shared/application/use-cases/create-paginated-actions";
import type { Lot } from "../../domain/entities/lot.entity";

const actions = createPaginatedActions<Lot>("/onerp/inventory/lots");

export const findAllPaginated = actions.findAllPaginated;
export const findById = actions.findById;
export const create = actions.create;
export const update = actions.update;
export const remove = actions.remove;
