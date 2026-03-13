"use server";

import { createPaginatedActions } from "@/shared/application/use-cases/create-paginated-actions";
import type { SalesChannel } from "../../domain/entities/sales-channel.entity";

const actions = createPaginatedActions<SalesChannel>("/onerp/sales-channels");

export const findAllPaginated = actions.findAllPaginated;
export const findById = actions.findById;
export const create = actions.create;
export const update = actions.update;
export const remove = actions.remove;
