# ERP Frontend — AI Agent Ruleset

> **Skills Reference**: For detailed patterns, use these skills on demand:
>
> ### Project Skills (ERP-specific)
> - [`nextjs-16/data-fetching`](../skills/nextjs-16/data-fetching/SKILL.md) — Entity, Server Actions, hook con TanStack Query
> - [`nextjs-16/form-builder`](../skills/nextjs-16/form-builder/SKILL.md) — FormConfig declarativo, CrudFormDialog, autocomplete
> - [`nextjs-16/main-page`](../skills/nextjs-16/main-page/SKILL.md) — page.tsx, columnas TanStack Table, XxxTablePage completo
>
> ### SDD Planning Skills
> - [`sdd-explore`](~/.claude/skills/sdd-explore/SKILL.md) — Explorar ideas antes de implementar
> - [`sdd-propose`](~/.claude/skills/sdd-propose/SKILL.md) — Propuesta de cambio con alcance y enfoque
> - [`sdd-design`](~/.claude/skills/sdd-design/SKILL.md) — Diseño técnico con decisiones de arquitectura
> - [`sdd-tasks`](~/.claude/skills/sdd-tasks/SKILL.md) — Desglose en tareas de implementación

### Auto-invoke Skills

When performing these actions, ALWAYS invoke the corresponding skill FIRST:

| Action | Skill |
|--------|-------|
| Creating a new frontend module (masters, inventory, etc.) | `nextjs-16/data-fetching` + `nextjs-16/form-builder` + `nextjs-16/main-page` |
| Adding data fetching to a module | `nextjs-16/data-fetching` |
| Building or modifying a form | `nextjs-16/form-builder` |
| Creating or modifying a list/table page | `nextjs-16/main-page` |
| Adding an autocomplete field | `nextjs-16/form-builder` + `nextjs-16/data-fetching` |
| Planning a multi-file or multi-module change | `sdd-explore` → `sdd-propose` → `sdd-design` → `sdd-tasks` |

---

## CRITICAL RULES — NON-NEGOTIABLE

### Server Actions

- ALWAYS: `"use server"` at the top of every file in `application/use-cases/`
- ALWAYS: use `apiClient` — NEVER call `fetch` directly
- NEVER: catch errors in actions unless transforming the message. Let them bubble to `usePaginatedModule` + `useToast`

### Client Components

- ALWAYS: `"use client"` at the top of any component that uses hooks, state, or browser APIs
- NEVER: add `"use client"` to `page.tsx` — pages are Server Components (thin shells only)

### React Imports

- ALWAYS: `import { useState, useEffect } from "react"`
- NEVER: `import React`, `import * as React`

### Entities

- ALWAYS: define as `interface`, never `class`
- ALWAYS: extend `BaseEntity` from `@/shared/domain/base/base-entity.types`
- NEVER: use `type` unions for entity shapes (`type T = "a" | "b"` only for discriminated unions)

### Styling

- Single class: `className="bg-slate-800 text-white"`
- Dynamic classes: `className={cn(BASE, condition && "extra-class")}`
- Dynamic values: `style={{ width: "50%" }}`
- NEVER: CSS modules, styled-components, hex colors in className, `var()` in className

### State

- TanStack Query → all server state (fetch, cache, invalidation)
- Zustand → global UI state only (e.g., `module-search.store.ts`)
- NEVER: `useState` for data that belongs in TanStack Query cache

### Imports

- ALWAYS: `@/` path alias for everything under `src/`
- Shared factories/hooks: `@/shared/...`
- Domain entities: relative paths within the feature module

### Language

- ALWAYS: all user-facing strings in **Spanish** (labels, toasts, titles, error messages)

---

## DECISION TREES

### Component Placement

```
New page? → page.tsx (Server Component, no directive) → renders Presentation component
New interactive component?
  ├── Used in 1 feature only? → feature/presentation/components/
  └── Used in 2+ features?   → src/components/{domain}/
Need hooks/state?            → "use client" at the top
```

### Code Location

```
Server action                → {feature}/application/use-cases/{feature}.actions.ts
Search/autocomplete action   → {feature}/application/use-cases/{feature}-search.action.ts
Entity interface             → {feature}/domain/entities/{feature}.entity.ts
Module hook                  → {feature}/presentation/hooks/use-{feature}s.ts
Form config                  → {feature}/presentation/forms/{feature}-form.config.ts
Table columns                → {feature}/presentation/components/columns-{feature}.tsx
Table page component         → {feature}/presentation/components/{Feature}TablePage.tsx
Shared hook (2+ modules)     → src/shared/presentation/hooks/
Shared types (2+ modules)    → src/shared/presentation/types/
Shared component (2+ modules)→ src/shared/presentation/components/
Global UI component          → src/components/{domain}/
Zustand store                → src/stores/
Utilities                    → src/lib/utils.ts
```

---

## PATTERNS

### New Module — Checklist

1. `domain/entities/{module}.entity.ts` → interface extending `BaseEntity`
2. `application/use-cases/{module}.actions.ts` → `createPaginatedActions<T>("/onerp/...")`
3. `application/use-cases/{module}-search.action.ts` → `createSearchAction<T>(...)` (if used as autocomplete)
4. `presentation/hooks/use-{module}s.ts` → `usePaginatedModule<T>("key", actions)`
5. `presentation/forms/{module}-form.config.ts` → `FormConfig` object
6. `presentation/components/columns-{module}.tsx` → `ColumnDef<T>[]`
7. `presentation/components/{Module}TablePage.tsx` → Client Component with full CRUD
8. `page.tsx` → Server Component shell

### Entity

```typescript
import type { BaseEntity } from "@/shared/domain/base/base-entity.types";

export interface Country extends BaseEntity {
  iso_code: string;
  name: string;
  phone_code: string;
  currency_code: string;
  is_active: boolean;
}
```

### Actions

```typescript
"use server";

import { createPaginatedActions } from "@/shared/application/use-cases/create-paginated-actions";
import type { Country } from "../../domain/entities/country.entity";

const BASE_PATH = "/onerp/countries";
const actions = createPaginatedActions<Country>(BASE_PATH);

export const findAllPaginated = actions.findAllPaginated;
export const findById         = actions.findById;
export const create           = actions.create;
export const update           = actions.update;
export const remove           = actions.remove;

// Acciones de dominio adicionales:
export async function activate(id: string) {
  return apiClient<Country>(`${BASE_PATH}/${id}/activate`, { method: "POST" });
}
```

### Search Action (autocomplete)

```typescript
"use server";

import { createSearchAction } from "@/shared/application/use-cases/create-search-action";
import type { Country } from "../../domain/entities/country.entity";

const search = createSearchAction<Country & Record<string, unknown>>("/onerp/countries", {
  code: "id",
  value: "name",
  searchFields: ["name", "iso_code"],
});

export async function searchCountries(query: string) {
  return search(query);
}
```

### Hook

```typescript
"use client";

import { usePaginatedModule } from "@/shared/presentation/hooks/use-paginated-module";
import * as actions from "../../application/use-cases/country.actions";
import type { Country } from "../../domain/entities/country.entity";

export function useCountries() {
  return usePaginatedModule<Country>("countries", actions);
}
```

### Form Config

```typescript
import type { FormConfig } from "@/shared/presentation/types/form-config.types";
import { searchCurrencies } from "@/app/dashboard/masters/currencies/application/use-cases/currency-search.action";

export const countryFormConfig: FormConfig = {
  fields: [
    { name: "iso_code",   label: "Código ISO",    type: "text",         required: true, maxLength: 3 },
    { name: "name",       label: "Nombre",        type: "text",         required: true, maxLength: 150 },
    { name: "phone_code", label: "Código Tel.",   type: "text",         required: true, maxLength: 3 },
    {
      name: "currency_id",
      label: "Moneda",
      type: "autocomplete",
      required: true,
      autocompleteConfig: {
        searchAction: searchCurrencies,
        returnMode: "code",
        placeholder: "Buscar moneda...",
      },
    },
    { name: "is_active",  label: "Activo",        type: "switch" },
  ],
};
```

### page.tsx (Server Component)

```typescript
import { CountriesTablePage } from "./presentation/components/CountriesTablePage";

export default function CountryPage() {
  return (
    <div className="flex h-full flex-col gap-6 p-6">
      <div className="flex flex-col gap-1">
        <h1 className="text-2xl font-semibold tracking-tight">Países</h1>
        <p className="text-sm text-muted-foreground">
          Gestión de países para la organización.
        </p>
      </div>
      <CountriesTablePage />
    </div>
  );
}
```

### Dialog State Pattern

```typescript
// Siempre un único objeto de estado para todos los dialogs
const [dialogOpen, setDialogOpen] = useState({ editOpen: false, importOpen: false });

// Actualizar sin afectar otros dialogs
setDialogOpen((prev) => ({ ...prev, editOpen: true }));
```

---

## KEY SHARED INFRASTRUCTURE

### `src/lib/api.ts` — `apiClient`

- Server-side (Server Actions): usa `process.env.API_URL` → `http://erp-gateway:3000`
- Client-side (browser): usa `process.env.NEXT_PUBLIC_API_URL` → `http://localhost:3009`
- Adjunta automáticamente el Bearer token de Keycloak (next-auth session)
- Lanza `AuthenticationError` en 401 / `RefreshTokenError`
- Parsea arrays de errores de class-validator del backend

**NUNCA** usar `fetch` directamente. Solo `apiClient`.

### `src/lib/api-upload.ts` — Upload client

Separado para el import service (puerto 3004). Provee:
- `apiUpload()` — FormData (archivos Excel)
- `apiImport()` — JSON con opciones de tipo de respuesta
- `apiImportDownload()` — Blob para descarga de reportes

### Shared Factories

| Factory | Import | Propósito |
|---------|--------|-----------|
| `createPaginatedActions<T>(basePath)` | `@/shared/application/use-cases/create-paginated-actions` | CRUD completo paginado |
| `createSearchAction<T>(basePath, mapping)` | `@/shared/application/use-cases/create-search-action` | Búsqueda para autocomplete |
| `createListActions` | `@/shared/application/use-cases/create-list-actions` | Listas sin paginación |

### Shared Hooks

| Hook | Propósito |
|------|-----------|
| `usePaginatedModule<T>(key, actions)` | TanStack Query con cursor pagination; devuelve `data`, `isLoading`, `pagination`, `setPagination`, `createMutation`, `updateMutation`, `deleteMutation` |
| `useListModule` | Para listas sin paginación |
| `useAutocompleteSearch` | Para inputs de búsqueda dinámica |

### Global Components

| Componente | Import | Propósito |
|------------|--------|-----------|
| `MainDataTable` | `@/components/tables/MainTable` | Tabla paginada estándar (TanStack Table) |
| `TableSkeleton` | `@/components/tables/TableSkeleton` | Skeleton de carga (pasar `columns` count) |
| `PageHeader` | `@/components/dashboard/PageHeader` | Cabecera con botones de acción |
| `Show` | `@/components/show/Show.component` | Renderizado condicional con fallback |
| `CrudFormDialog` | `@/shared/presentation/components/form-builder/CrudFormDialog` | Dialog crear/editar con FormConfig |
| `ExcelImportDialog` | `@/components/import/excel-import-dialog` | Dialog importación Excel masiva |
| `Badge` | `@/components/ui/badge` | Estado (variant: `success`, `destructive`) |

---

## TECH STACK

| Concern | Library | Version |
|---------|---------|---------|
| Framework | Next.js (App Router, standalone output) | 16.1.6 |
| UI | React | 19.2.4 |
| Styling | Tailwind CSS | 4.1.12 |
| Component library | shadcn/ui (new-york, neutral) via Radix UI | — |
| Icons | lucide-react | 0.488.0 |
| Data fetching | TanStack Query | 5.85.5 |
| Tables | TanStack Table | 8.21.3 |
| Forms | react-hook-form + zod | 7.62.0 + 3.25.76 |
| Global state | Zustand | 5.0.11 |
| Auth | next-auth (Keycloak OIDC) | 5.0.0-beta.25 |
| Charts | Recharts | 2.15.4 |
| HTTP client | `src/lib/api.ts` (`apiClient`) | — |
| Language | TypeScript (strict) | 5.9.2 |

> **Zod**: versión 3.x — usar `z.string().email()` y `z.string().uuid()`, NO `z.email()` ni `z.uuid()` (eso es Zod 4).

---

## PROJECT STRUCTURE

```
src/
├── app/
│   ├── dashboard/
│   │   ├── admin/            # audit-logs, feature-flags, preferences
│   │   ├── customers/
│   │   ├── finance/          # KPI dashboard
│   │   ├── inventory/        # products, warehouses, stock, kardex, lots, adjustments...
│   │   ├── maintenance/      # assets, work-orders, plans, failure-codes...
│   │   ├── masters/          # currencies, countries, banks, third-party, uom, tax-codes...
│   │   ├── purchasing/       # purchase-orders, receipts, requisitions, vendor-invoices...
│   │   └── sales/            # sales-orders, quotations, price-lists, shipments, invoices...
│   ├── login/
│   └── auth/logout/
├── auth.ts                   # next-auth config (Keycloak)
├── auth.config.ts
├── middleware.ts             # Route protection
├── components/
│   ├── ui/                   # shadcn/ui primitives (button, card, input, dialog, badge...)
│   ├── tables/               # MainTable, TableSkeleton
│   ├── dashboard/            # PageHeader, sidebar, header, shell
│   ├── show/                 # Show (conditional render)
│   ├── import/               # ExcelImportDialog, import-preview-table
│   ├── documents/            # DocumentActionsDropdown, SendDocumentEmailDialog
│   └── workflow/             # StatusStepper
├── shared/
│   ├── application/use-cases/  # createPaginatedActions, createSearchAction, createListActions
│   ├── domain/base/            # BaseEntity, PaginatedResponse, base-repository.interface
│   └── presentation/
│       ├── components/         # Autocomplete, SimpleDataTable, document-detail, form-builder, order-form, order-lines
│       ├── hooks/              # usePaginatedModule, useListModule, useAutocompleteSearch
│       ├── types/              # AutocompleteOption, FormConfig, FormFieldConfig
│       └── validators/         # build-zod-schema.ts
├── stores/
│   └── module-search.store.ts  # Zustand store
├── lib/
│   ├── api.ts                  # apiClient (único cliente HTTP)
│   ├── api-upload.ts           # Upload/import client (puerto 3004)
│   └── utils.ts                # cn(), formatDate(), formatCurrency()
├── infrastruture/              # ⚠️ typo intencional — no corregir
│   └── user/
├── types/
│   ├── next-auth.d.ts
│   └── react.d.ts
└── stores/
    └── module-search.store.ts
```

---

## COMMANDS

```bash
# Desarrollo
pnpm install
pnpm run dev          # Next.js con Turbopack

# Calidad de código
pnpm run lint         # ESLint
pnpm run build        # Verificación de tipos + build de producción
```

---

## KNOWN ISSUES / GOTCHAS

1. **Typo en path**: La carpeta de infraestructura se llama `src/infrastruture/` (falta la 'c'). **No corregir** — rompe imports.

2. **Dual API URLs**: `apiClient` selecciona automáticamente la URL según `typeof window`. Los Server Actions siempre usan la URL interna (`API_URL`); el navegador usa `NEXT_PUBLIC_API_URL`. No hardcodear URLs.

3. **Entity ID duality**: Las entidades tienen `id: string` (de `BaseEntity`) Y un ID de dominio específico (`purchase_order_id`, etc.). El API retorna el ID de dominio; usarlo para navegación y mutaciones.

4. **Pagination es cursor-based**: El API usa `afterCursor`/`beforeCursor`. No hay paginación por offset. El endpoint siempre es `POST {basePath}/pagination` con JSON body.

5. **next-auth v5 beta**: La auth está en `src/auth.ts`. Los errores `RefreshTokenError` hacen que `apiClient` lance `AuthenticationError`. El middleware en `src/middleware.ts` protege las rutas del dashboard.

6. **Sin tests**: No hay framework de testing. No agregar archivos de test a menos que el usuario lo pida explícitamente.

7. **Strings en español**: Todos los labels, toasts, títulos y mensajes de error del usuario deben estar en español.

8. **Zod v3**: Se usa Zod 3.x. Usar `z.string().email()`, `z.string().uuid()` — NO `z.email()` ni `z.uuid()` (eso es Zod 4).

---

## QA CHECKLIST BEFORE COMMIT

- [ ] No hay llamadas directas a `fetch` — solo `apiClient`
- [ ] Todos los archivos en `application/use-cases/` tienen `"use server"`
- [ ] Todos los componentes con hooks/state tienen `"use client"`
- [ ] `page.tsx` es Server Component (sin directiva)
- [ ] Todos los strings de UI están en español
- [ ] Los estados de carga, error y vacío están manejados
- [ ] La columna de acciones está en `XxxTablePage`, no en `columns-xxx.tsx`
- [ ] El dialog se cierra solo en `onSuccess` de la mutación
- [ ] No hay secretos hardcodeados (usar `.env.local`)
- [ ] `pnpm run build` pasa sin errores de TypeScript
