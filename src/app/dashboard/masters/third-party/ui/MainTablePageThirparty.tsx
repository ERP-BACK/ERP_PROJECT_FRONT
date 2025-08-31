"use client";

import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { keepPreviousData } from "@tanstack/react-query";
import { getAllThirdPartyPagination } from "@/action/third-party/get-all-third-party-pagination";
import { MainDataTable } from "@/components/tables/MainTable";
import { CardPagesComponent } from "@/components/cards/CardPages.component";
import { Show } from "@/components/show/Show.component";
import { TableSkeleton } from "@/components/tables/TableSkeleton";
import { columnsThirdParty } from "./columnsThirdParty";

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

  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["allThirdPartyPagination", pagination],
    queryFn: async () => {
      console.log(pagination);
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

  // Determinar si hay páginas siguiente y anterior basado en los cursores
  const hasNextPage = Boolean(data?.hasNextPage || data?.afterCursor);
  const hasPreviousPage = Boolean(data?.hasPreviousPage || data?.beforeCursor);

  const handlePaginationChange = (newPagination: CursorPaginationState) => {
    setPagination(newPagination);
  };

  return (
    <div className="h-full flex flex-col">
      <CardPagesComponent
        cardTitle={"Lista terceros"}
        CardSubtitle={"Gestion de terceros"}
      >
        <div className="flex-1 flex flex-col min-h-0">
          <Show
            when={!isLoading || false}
            fallback={<TableSkeleton columns={columnsThirdParty.length} />}
          >
            <div className="flex-1 min-h-0">
              <MainDataTable
                columns={columnsThirdParty}
                data={data?.data}
                pageCount={data?.pageCount}
                rowCount={data?.rowCount}
                isLoading={isLoading}
                onPaginationChange={handlePaginationChange}
                paginationState={data?.pageInfo}
              />
            </div>
          </Show>
        </div>
      </CardPagesComponent>
    </div>
  );
};
