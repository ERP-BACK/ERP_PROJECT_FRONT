"use server";

import { createSearchAction } from "@/shared/application/use-cases/create-search-action";
import type { ProductCategory } from "../../domain/entities/product-category.entity";

const search = createSearchAction<ProductCategory & Record<string, unknown>>(
  "/inventory/product-categories",
  {
    code: "code",
    value: "name",
    searchFields: ["code", "name"],
    metaFields: ["category_id", "level", "path"],
  }
);

export async function searchProductCategories(query: string) {
  return search(query);
}
