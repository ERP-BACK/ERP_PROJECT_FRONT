"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Plus, Pencil, Trash2, Filter, Upload, Eye, Gauge } from "lucide-react";
import { Button } from "@/components/ui/button";
import { MainDataTable } from "@/components/tables/MainTable";
import { Show } from "@/components/show/Show.component";
import { TableSkeleton } from "@/components/tables/TableSkeleton";
import { CrudFormDialog } from "@/shared/presentation/components/form-builder/CrudFormDialog";
import { useAssets } from "../hooks/use-assets";
import { columnsAsset } from "./columns-asset";
import { assetFormConfig } from "../forms/asset-form.config";
import type { MaintenanceAsset } from "../../domain/entities/asset.entity";

export function AssetsTablePage() {
  const router = useRouter();
  const {
    data,
    isLoading,
    pagination,
    setPagination,
    createMutation,
    updateMutation,
    deleteMutation,
  } = useAssets();
  const [dialogOpen, setDialogOpen] = useState(false);
  const [editingItem, setEditingItem] = useState<MaintenanceAsset | null>(null);

  const handleCreate = () => {
    setEditingItem(null);
    setDialogOpen(true);
  };

  const handleEdit = (item: MaintenanceAsset) => {
    setEditingItem(item);
    setDialogOpen(true);
  };

  const handleView = (item: MaintenanceAsset) => {
    router.push(`/dashboard/maintenance/assets/${item.asset_id}`);
  };

  const handleDelete = (item: MaintenanceAsset) => {
    deleteMutation.mutate(item.asset_id);
  };

  const handleSubmit = (formData: Record<string, unknown>) => {
    if (editingItem) {
      updateMutation.mutate(
        { id: editingItem.asset_id, data: formData },
        { onSuccess: () => setDialogOpen(false) }
      );
    } else {
      createMutation.mutate(formData, { onSuccess: () => setDialogOpen(false) });
    }
  };

  const columnsWithActions = [
    ...columnsAsset,
    {
      id: "actions",
      header: "Acciones",
      cell: ({ row }: { row: { original: MaintenanceAsset } }) => (
        <div className="flex items-center gap-1">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleView(row.original)}
            title="Ver detalle"
          >
            <Eye className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            onClick={() => handleEdit(row.original)}
            title="Editar"
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8 text-destructive"
            onClick={() => handleDelete(row.original)}
            title="Eliminar"
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
          <Button size="sm" onClick={handleCreate}>
            <Plus className="mr-1.5 h-3.5 w-3.5" />
            Nuevo Activo
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2 text-muted-foreground mb-1">
            <Gauge className="h-4 w-4" />
            <span className="text-xs font-medium uppercase tracking-wide">Total</span>
          </div>
          <p className="text-2xl font-semibold tabular-nums">{data?.rowCount || 0}</p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2 text-success mb-1">
            <span className="h-2 w-2 rounded-full bg-success" />
            <span className="text-xs font-medium uppercase tracking-wide">Operativos</span>
          </div>
          <p className="text-2xl font-semibold tabular-nums">
            {data?.data?.filter((a) => a.status === "operational").length || 0}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2 text-warning mb-1">
            <span className="h-2 w-2 rounded-full bg-warning" />
            <span className="text-xs font-medium uppercase tracking-wide">En Mantenimiento</span>
          </div>
          <p className="text-2xl font-semibold tabular-nums">
            {data?.data?.filter((a) => a.status === "under_maintenance").length || 0}
          </p>
        </div>
        <div className="rounded-lg border bg-card p-4">
          <div className="flex items-center gap-2 text-destructive mb-1">
            <span className="h-2 w-2 rounded-full bg-destructive" />
            <span className="text-xs font-medium uppercase tracking-wide">Críticos</span>
          </div>
          <p className="text-2xl font-semibold tabular-nums">
            {data?.data?.filter((a) => a.criticality === "critical").length || 0}
          </p>
        </div>
      </div>

      <Show when={!isLoading} fallback={<TableSkeleton columns={columnsAsset.length} />}>
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
        title={editingItem ? "Editar Activo" : "Nuevo Activo"}
        description="Registre los datos del equipo o maquinaria"
        formConfig={assetFormConfig}
        defaultValues={editingItem ? (editingItem as unknown as Record<string, unknown>) : undefined}
        onSubmit={handleSubmit}
        isLoading={createMutation.isPending || updateMutation.isPending}
      />
    </>
  );
}
