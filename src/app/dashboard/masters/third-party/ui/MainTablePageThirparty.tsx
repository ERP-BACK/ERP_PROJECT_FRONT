"use client";

import { useState } from "react";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
import { getAllThirdPartyPagination } from "@/action/third-party/get-all-third-party-pagination";
import { MainDataTable } from "@/components/tables/MainTable";
import { Show } from "@/components/show/Show.component";
import { TableSkeleton } from "@/components/tables/TableSkeleton";
import { columnsThirdParty } from "./columnsThirdParty";
import { Button } from "@/components/ui/button";
import { ExcelImportDialog } from "@/components/import/excel-import-dialog";
import { Filter, Upload } from "lucide-react";

interface CursorPaginationState {
  limit: number;
  startCursor?: string | null;
  endCursor?: string | null;
}

export const MainTablePageThirparty = () => {
  const [pagination, setPagination] = useState<CursorPaginationState>({
    limit: 10,
    startCursor: null,
    endCursor: null,
  });
  const [importOpen, setImportOpen] = useState(false);
  const queryClient = useQueryClient();

  const { data, isLoading } = useQuery({
    queryKey: ["allThirdPartyPagination", pagination],
    queryFn: async () => {
      const objPagination = {
        limit: pagination.limit,
        afterCursor: pagination.startCursor,
        beforeCursor: pagination.endCursor,
      };
      const response = await getAllThirdPartyPagination(objPagination);
      return response;
    },
    placeholderData: keepPreviousData,
  });

  const handlePaginationChange = (newPagination: CursorPaginationState) => {
    setPagination(newPagination);
  };

  const handleImportSuccess = () => {
    queryClient.invalidateQueries({ queryKey: ["allThirdPartyPagination"] });
  };

  return (
    <>
      {/* Toolbar */}
      <div className="flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm">
            <Filter className="mr-1.5 h-3.5 w-3.5" />
            Filtros
          </Button>
        </div>
        <Button size="sm" variant="outline" onClick={() => setImportOpen(true)}>
          <Upload className="mr-1.5 h-3.5 w-3.5" />
          Importar Excel
        </Button>
      </div>

      {/* Table */}
      <Show
        when={!isLoading || false}
        fallback={<TableSkeleton columns={columnsThirdParty.length} />}
      >
        <MainDataTable
          columns={columnsThirdParty}
          data={data?.data}
          pageCount={data?.pageCount}
          rowCount={data?.rowCount}
          isLoading={isLoading}
          onPaginationChange={handlePaginationChange}
          paginationState={data?.pageInfo}
        />
      </Show>

      <ExcelImportDialog
        open={importOpen}
        onOpenChange={setImportOpen}
        moduleKey="third-parties"
        title="Importar Terceros desde Excel"
        onSuccess={handleImportSuccess}
      />
    </>
  );
};
