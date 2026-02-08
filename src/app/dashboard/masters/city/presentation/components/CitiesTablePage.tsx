"use client";

import { useState } from "react";
import { Plus, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { SimpleDataTable } from "@/shared/presentation/components/SimpleDataTable";
import { Show } from "@/components/show/Show.component";
import { TableSkeleton } from "@/components/tables/TableSkeleton";
import { CrudFormDialog } from "@/shared/presentation/components/form-builder/CrudFormDialog";
import { useCities } from "../hooks/use-cities";
import { columnsCities } from "./columns-city";
import { cityFormConfig } from "../forms/city-form.config";
import type { City } from "../../domain/entities/city.entity";

export function CitiesTablePage() {
  const { data, isLoading, createMutation, updateMutation, deleteMutation } =
    useCities();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<City | null>(null);

  const handleCreate = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: City) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    deleteMutation.mutate(id);
  };

  const handleSubmit = (formData: Record<string, unknown>) => {
    if (editingItem) {
      updateMutation.mutate(
        { id: editingItem.id, data: formData },
        { onSuccess: () => setDialogOpen(false) }
      );
    } else {
      createMutation.mutate(formData, {
        onSuccess: () => setDialogOpen(false),
      });
    }
  };

  const columnsWithActions = [
    ...columnsCities,
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }: { row: { original: City } }) => (
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
            onClick={() => handleDelete(row.original.id)}
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
        <div />
        <Button size="sm" onClick={handleCreate}>
          <Plus className="mr-1.5 h-3.5 w-3.5" />
          Crear
        </Button>
      </div>

      <Show
        when={!isLoading}
        fallback={<TableSkeleton columns={columnsCities.length} />}
      >
        <SimpleDataTable
          columns={columnsWithActions}
          data={data}
          isLoading={isLoading}
        />
      </Show>

      <CrudFormDialog
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        title={editingItem ? "Editar Ciudad" : "Crear Ciudad"}
        formConfig={cityFormConfig}
        defaultValues={
          editingItem
            ? (editingItem as unknown as Record<string, unknown>)
            : undefined
        }
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </>
  );
}
