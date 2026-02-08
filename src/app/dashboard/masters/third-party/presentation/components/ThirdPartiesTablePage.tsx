"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2, Filter, Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainDataTable } from "@/components/tables/MainTable";
import { Show } from "@/components/show/Show.component";
import { TableSkeleton } from "@/components/tables/TableSkeleton";
import { CrudFormDialog } from "@/shared/presentation/components/form-builder/CrudFormDialog";
import { ExcelImportDialog } from "@/components/import/excel-import-dialog";
import { useThirdParties } from "../hooks/use-third-parties";
import { columnsThirdParty } from "./columns-third-party";
import { thirdPartyFormConfig } from "../forms/third-party-form.config";
import type { ThirdParty } from "../../domain/entities/third-party.entity";

export function ThirdPartiesTablePage() {
  const {
    data,
    isLoading,
    pagination,
    setPagination,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useThirdParties();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<ThirdParty | null>(null);
  const [importOpen, setImportOpen] = useState(false);

  const handleCreate = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: ThirdParty) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleDelete = (item: ThirdParty) => {
    const id = item.third_party_id ?? item.id;
    deleteMutation.mutate(id);
  };

  const handleSubmit = (formData: Record<string, unknown>) => {
    if (editingItem) {
      const id = editingItem.third_party_id ?? editingItem.id;
      updateMutation.mutate(
        { id, data: formData },
        { onSuccess: () => setDialogOpen(false) }
      );
    } else {
      createMutation.mutate(formData, { onSuccess: () => setDialogOpen(false) });
    }
  };

  const columnsWithActions = [
    ...columnsThirdParty,
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }: { row: { original: ThirdParty } }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleEdit(row.original)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => handleDelete(row.original)}
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ),
    },
  ];

  return (
    <>
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-1.5 h-3.5 w-3.5" />
            Filtros
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <Button size="sm" variant="outline" onClick={() => setImportOpen(true)}>
            <Upload className="mr-1.5 h-3.5 w-3.5" />
            Importar Excel
          </Button>
          <Button size="sm" onClick={handleCreate}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Crear
          </Button>
        </div>
      </div>

      <Show when={!isLoading} fallback={<TableSkeleton columns={columnsThirdParty.length} />}>
        <MainDataTable
          columns={columnsWithActions}
          data={data?.data}
          pageCount={data?.pageCount}
          rowCount={data?.rowCount}
          isLoading={isLoading}
          onPaginationChange={setPagination}
          paginationState={data?.pageInfo ?? { limit: pagination.limit }}
        />
      </Show>

      <CrudFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingItem ? "Editar Tercero" : "Crear Tercero"}
        formConfig={thirdPartyFormConfig}
        defaultValues={editingItem ? (editingItem as unknown as Record<string, unknown>) : undefined}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />

      <ExcelImportDialog
        open={importOpen}
        onOpenChange={setImportOpen}
        moduleKey="third-parties"
        title="Importar Terceros desde Excel"
        onSuccess={() => {}}
      />
    </>
  );
}
