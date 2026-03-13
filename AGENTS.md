# AGENTS.md — AI Agent Convention File

This file documents conventions, architecture, and patterns for AI agents working in this codebase. Read it before making any changes.

---

## Project Overview

An ERP system built with Next.js App Router. The backend is a separate API service; this repo is the frontend only. All data access goes through `apiClient` calling a REST API. The app is deployed in a containerized environment where the server-side API URL differs from the browser-side URL.

**Language**: TypeScript (strict). All UI strings are in Spanish.

---

## Stack

| Concern | Library |
|---|---|
| Framework | Next.js 16.1.6 (App Router) |
| UI | React 19 |
| Styling | Tailwind CSS v4 |
| Component library | shadcn/ui (new-york variant) via Radix UI primitives |
| Icons | lucide-react |
| Data fetching | TanStack Query v5 |
| Tables | TanStack Table v8 |
| Forms | react-hook-form v7 + zod v3 |
| Global state | Zustand v5 |
| Auth | next-auth v5 beta (Keycloak OIDC) |
| Charts | Recharts |
| HTTP client | `src/lib/api.ts` (`apiClient`) |

No test framework is present.

---

## Architecture: Clean Architecture per Feature Module

Every feature module lives under `src/app/dashboard/{domain}/{feature}/` and is split into three layers:

```
{feature}/
  domain/
    entities/           # TypeScript interfaces extending BaseEntity
  application/
    use-cases/          # Server Actions ("use server") calling apiClient
  presentation/
    components/         # "use client" React components (table pages, form pages)
    hooks/              # Custom hooks wrapping usePaginatedModule / TanStack Query
    forms/              # Form configs, zod schemas (sometimes co-located in components)
  page.tsx              # Next.js page — thin shell that renders a presentation component
  [id]/
    edit/
      page.tsx
```

The `page.tsx` at the feature root is a **Server Component** — it simply renders the corresponding presentation component.

---

## Domains

```
src/app/dashboard/
  purchasing/         # purchase-orders, receipts, requisitions, vendor-invoices, vendor-evaluations
  inventory/          # products, warehouses, warehouse-locations, stock-levels, kardex, lots, adjustments, inventory-counts, movement-reasons, product-categories
  sales/              # sales-orders, quotations, price-lists, shipments, invoices, credit-notes, returns
  masters/            # currencies, countries, regions-zones, city, banks, bank-accounts, branches, carriers, payment-terms, payment-methods, third-party, uom, tax-codes, tax-responsibilities, document-types, document-sequences, incoterms, shipping-methods, economic-activities, sales-channels
  finance/            # dashboard and KPI cards
  admin/              # user/role management
  customers/          # customer-related features
```

---

## Key Shared Infrastructure

### `src/lib/api.ts` — `apiClient`

The single HTTP client for all server-side and client-side API calls.

- Server-side (Server Actions, SSR): uses `process.env.API_URL` (defaults to `http://erp-gateway:3000`)
- Client-side (browser): uses `process.env.NEXT_PUBLIC_API_URL` (defaults to `http://localhost:3009`)
- Attaches the Keycloak Bearer token from the next-auth session automatically
- Throws `AuthenticationError` on 401 or `RefreshTokenError`
- Parses class-validator error arrays from the API automatically

**Always use `apiClient` — never call `fetch` directly.**

### `src/shared/domain/base/base-entity.types.ts`

- `BaseEntity`: `{ id, is_active?, created_at?, updated_at? }`
- `PaginatedResponse<T>`: cursor-paginated response shape with `data`, `pageCount`, `rowCount`, `pageInfo`

### Shared Action Factories (`src/shared/application/use-cases/`)

Use these factories instead of writing CRUD actions from scratch:

| Factory | Purpose |
|---|---|
| `createPaginatedActions<T>(basePath)` | Returns `findAllPaginated`, `findById`, `create`, `update`, `remove` |
| `createSearchAction<T>(basePath, mapping)` | Returns a search function that maps results to `AutocompleteOption[]` |
| `createListActions.ts` | For non-paginated list endpoints |

**Pattern for a new module's actions file:**

```ts
"use server";
import { apiClient } from "@/lib/api";
import { createPaginatedActions } from "@/shared/application/use-cases/create-paginated-actions";
import type { MyEntity } from "../../domain/entities/my-entity.entity";

const BASE_PATH = "/onerp/{domain}/{resource}";
const actions = createPaginatedActions<MyEntity>(BASE_PATH);

export const findAllPaginated = actions.findAllPaginated;
export const findById = actions.findById;
export const create = actions.create;
export const update = actions.update;
export const remove = actions.remove;

// Add domain-specific actions below:
export async function approveMyEntity(id: string): Promise<{ message: string }> {
  return apiClient<{ message: string }>(`${BASE_PATH}/${id}/approve`, { method: "POST" });
}
```

### Shared Presentation Hooks (`src/shared/presentation/hooks/`)

| Hook | Purpose |
|---|---|
| `usePaginatedModule<T>(queryKey, actions)` | Wraps TanStack Query for cursor-paginated tables; returns `data`, `isLoading`, `pagination`, `setPagination`, `createMutation`, `updateMutation`, `deleteMutation` |
| `use-list-module.ts` | For non-paginated lists |
| `use-autocomplete-search.ts` | For autocomplete/search inputs |

**Pattern for a module hook:**

```ts
"use client";
import { usePaginatedModule } from "@/shared/presentation/hooks/use-paginated-module";
import * as actions from "../../application/use-cases/my-entity.actions";
import type { MyEntity } from "../../domain/entities/my-entity.entity";

export function useMyEntity() {
  return usePaginatedModule<MyEntity>("my-entity", actions);
}
```

### Shared Presentation Components (`src/shared/presentation/components/`)

- `autocomplete/Autocomplete` — search-as-you-type dropdown backed by `AutocompleteOption[]`
- `SimpleDataTable` — lightweight table
- `document-detail/` — shared detail/form layout for document-style entities
- `order-form/` and `order-lines/` — reusable order form and line-item components
- `form-builder/` — generic form builder

### Global Components (`src/components/`)

| Path | Purpose |
|---|---|
| `components/ui/` | shadcn/ui components (button, card, input, select, dialog, etc.) |
| `components/tables/MainTable.tsx` | `MainDataTable` — the standard paginated table |
| `components/tables/TableSkeleton.tsx` | Loading skeleton for tables |
| `components/dashboard/PageHeader.tsx` | Standard page header with filter/action buttons |
| `components/show/Show.component.tsx` | Conditional render helper (`<Show when fallback>`) |
| `components/dashboard/sidebar.tsx` | App sidebar |

---

## Coding Conventions

### Server Actions

- All files in `application/use-cases/` that call `apiClient` must have `"use server"` at the top.
- Use `apiClient` — never raw `fetch`.
- Do not catch errors in actions unless you need to transform the error message. Let errors bubble; `usePaginatedModule` and `useToast` handle them.

### Client Components

- Add `"use client"` at the top of any component that uses hooks, state, or browser APIs.
- Page-level `page.tsx` files are Server Components — keep them thin (just render the presentation component).

### Entities

- Define as TypeScript `interface`, not `class`.
- Extend `BaseEntity` from `@/shared/domain/base/base-entity.types`.
- Domain-specific ID fields follow the pattern `{entity_name}_id` (e.g., `purchase_order_id`), separate from the inherited `id: string`.
- Related entities are typed as inline nested interfaces inside the parent, not imported separately.

### Forms

- Use `react-hook-form` with `zodResolver`.
- Define the zod schema and `type FormData = z.infer<typeof schema>` in the same file as the form component (or in a dedicated `form.config.ts` if complex).
- UI fields use shadcn `<Form>`, `<FormField>`, `<FormItem>`, `<FormLabel>`, `<FormControl>`, `<FormMessage>`.

### Tables

- Define columns in a `columns-{entity}.tsx` file co-located with the table page component.
- Actions column is added inline in the table page component, not in the columns file.
- Use `MainDataTable` from `@/components/tables/MainTable` for all paginated tables.
- Use `<Show when={!isLoading} fallback={<TableSkeleton />}>` wrapping the table.

### Imports

- Use the `@/` path alias for everything under `src/`.
- Import shared types and factories from `@/shared/...`.
- Import domain entities with relative paths from within the feature module.

### Naming

- Files: kebab-case for all files (`purchase-order.actions.ts`, `use-purchase-orders.ts`).
- Components: PascalCase exports (`PurchaseOrdersTablePage`).
- Hooks: camelCase with `use` prefix (`usePurchaseOrders`).
- Actions: named exports in camelCase matching their HTTP intent (`findAllPaginated`, `create`, `approvePurchaseOrder`).

### State Management

- TanStack Query manages all server state (fetching, caching, invalidation).
- Zustand is used for global UI state (e.g., `src/stores/module-search.store.ts`).
- Do not use `useState` for data that belongs in TanStack Query cache.

### UI / Styling

- Tailwind CSS v4 only — no CSS modules, no styled-components.
- Use shadcn/ui components from `@/components/ui/` for all form inputs, buttons, dialogs, cards, badges.
- Icons from `lucide-react` only.
- Standard icon sizes: `h-4 w-4` for inline, `h-3.5 w-3.5` for button icons.
- Ghost icon buttons: `variant="ghost" size="icon" className="h-7 w-7"`.

---

## Directory Structure Reference

```
src/
  app/
    dashboard/
      {domain}/
        {feature}/
          domain/entities/         # Entity interfaces
          application/use-cases/   # Server Actions (CRUD + domain actions)
          presentation/
            components/            # Table page, form page components
            hooks/                 # Module hooks
            forms/                 # Form configs / schemas (optional)
          page.tsx                 # Server Component shell
          [id]/edit/page.tsx       # Edit page
          new/page.tsx             # Create page
    layout.tsx
    page.tsx
  auth.ts                          # next-auth configuration (Keycloak)
  auth.config.ts
  middleware.ts                    # Route protection via next-auth
  components/
    ui/                            # shadcn/ui primitives
    tables/                        # MainTable, TableSkeleton
    dashboard/                     # PageHeader, sidebar, header, shell
    show/                          # Show conditional component
    cards/
    import/
    workflow/
  shared/
    application/use-cases/         # createPaginatedActions, createSearchAction, createListActions
    domain/base/                   # BaseEntity, PaginatedResponse, repository interfaces
    presentation/
      components/                  # Autocomplete, SimpleDataTable, order-form, order-lines, form-builder
      hooks/                       # usePaginatedModule, useListModule, useAutocompleteSearch
      types/                       # AutocompleteOption, etc.
      validators/
  infrastruture/                   # NOTE: intentional typo — missing 'c' (infrastructure)
    user/                          # User-related infrastructure (currently only user/)
  stores/
    module-search.store.ts         # Zustand store for module search
  lib/
    api.ts                         # apiClient — the only HTTP client
  types/
  util/
  domain/                          # Top-level shared domain (rare)
```

---

## Known Issues / Gotchas

1. **Typo in path**: The infrastructure folder is named `src/infrastruture/` (missing the 'c' in "infra**s**tructure"). Do not "fix" this — it will break imports.

2. **Dual API URLs**: `apiClient` auto-selects the correct URL based on `typeof window`. Server Actions always use the internal URL (`API_URL`); browser calls use `NEXT_PUBLIC_API_URL`. Do not hardcode URLs.

3. **Entity ID duality**: Entities have both the generic `id: string` (from `BaseEntity`) and a domain-specific ID like `purchase_order_id`. The API returns the domain-specific ID; use it for navigation and mutations. `id` may or may not be populated depending on the endpoint.

4. **Pagination is cursor-based**: The API uses `afterCursor`/`beforeCursor` parameters. Offset pagination is not used. The paginated endpoint is always `POST {basePath}/pagination` with a JSON body.

5. **next-auth v5 beta**: Auth is at `src/auth.ts`. Session errors `RefreshTokenError` cause `apiClient` to throw `AuthenticationError`. The middleware at `src/middleware.ts` protects dashboard routes.

6. **No tests**: There is no test framework. Do not add test files unless the user explicitly asks.

7. **Spanish UI**: All user-facing labels, toasts, page titles, and error messages are in Spanish. Keep new UI strings in Spanish.
