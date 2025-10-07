"use client";

import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[] | undefined;
  pageCount?: number;
  rowCount?: number;
  isLoading?: boolean;
  onPaginationChange?: (pagination: PaginationState) => void;
  paginationState: PaginationState;
}

interface PaginationState {
  limit: number;
  hasNextPage?: boolean;
  hasPreviousPage?: boolean;
  startCursor?: string | null;
  endCursor?: string | null;
}

export function MainDataTable<TData, TValue>({
  columns,
  data,
  pageCount,
  rowCount,
  isLoading = false,
  onPaginationChange,
  paginationState,
}: DataTableProps<TData, TValue>) {
  console.log(paginationState, "paginationState");
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
    manualPagination: true,
    pageCount: pageCount || 0,
  });

  const handleFirstPage = () => {
    if (onPaginationChange) {
      onPaginationChange({
        limit: paginationState.limit,
        startCursor: null,
        endCursor: null,
      });
    }
  };

  const handlePreviousPage = () => {
    if (onPaginationChange && paginationState.hasPreviousPage) {
      onPaginationChange({
        limit: paginationState.limit,
        startCursor: null,
        endCursor: paginationState.startCursor,
      });
    }
  };

  const handleNextPage = () => {
    if (onPaginationChange && paginationState.hasNextPage) {
      console.log({
        limit: paginationState.limit,
        startCursor: paginationState.endCursor,
        endCursor: null,
      });
      onPaginationChange({
        limit: paginationState.limit,
        startCursor: paginationState.endCursor,
        endCursor: null,
      });
    }
  };

  const handleLastPage = () => {
    if (onPaginationChange) {
      onPaginationChange({
        limit: paginationState.limit,
        startCursor: null,
        endCursor: null,
      });
    }
  };

  const handlePageSizeChange = (newPageSize: number) => {
    if (onPaginationChange) {
      onPaginationChange({
        limit: newPageSize,
        startCursor: null,
        endCursor: null,
      });
    }
  };

  // Calcular el rango actual de elementos mostrados
  const currentPageSize = paginationState?.limit || 0;
  const totalRows = rowCount || 0;
  const currentRows = table.getRowModel().rows.length;

  // Para cursor-based pagination, es difícil calcular el rango exacto
  // pero podemos mostrar el número de elementos actuales
  const startRange = 1;
  const endRange = currentRows;

  return (
    <div className="flex flex-col h-full overflow-hidden rounded-md border">
      <Table className="flex-1">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody className="flex-1">
          {table.getRowModel().rows && table.getRowModel().rows.length > 0 ? (
            <>
              {table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))}
              {/* Filas vacías para llenar el espacio restante */}
              {Array.from({
                length: Math.max(0, paginationState.limit - currentRows),
              }).map((_, index) => (
                <TableRow key={`empty-${index}`} className="h-12">
                  {columns.map((_, colIndex) => (
                    <TableCell
                      key={`empty-cell-${index}-${colIndex}`}
                      className="border-b"
                    >
                      &nbsp;
                    </TableCell>
                  ))}
                </TableRow>
              ))}
            </>
          ) : (
            <>
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No hay resultados.
                </TableCell>
              </TableRow>
              {/* Filas vacías para llenar el espacio cuando no hay datos */}
              {Array.from({ length: paginationState.limit - 1 }).map(
                (_, index) => (
                  <TableRow key={`empty-no-data-${index}`} className="h-12">
                    {columns.map((_, colIndex) => (
                      <TableCell
                        key={`empty-no-data-cell-${index}-${colIndex}`}
                        className="border-b"
                      >
                        &nbsp;
                      </TableCell>
                    ))}
                  </TableRow>
                )
              )}
            </>
          )}
        </TableBody>
      </Table>

      {/* Paginación con el estilo de la imagen */}
      <div className="flex items-center justify-between px-4 py-3 border-t bg-gray-50 flex-shrink-0">
        <div className="flex items-center space-x-2">
          <span className="text-sm text-gray-700">Rows per page:</span>
          <select
            value={paginationState.limit || 5}
            onChange={(e) => {
              handlePageSizeChange(Number(e.target.value));
            }}
            className="border border-gray-300 rounded px-2 py-1 text-sm bg-white focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            {[10, 20, 30, 40, 50].map((pageSize) => (
              <option key={pageSize} value={pageSize}>
                {pageSize}
              </option>
            ))}
          </select>
        </div>

        <div className="flex items-center space-x-4">
          <span className="text-sm text-gray-700">
            {currentRows > 0 ? `${startRange}-${endRange}` : "0"} of {totalRows}
          </span>

          <div className="flex items-center space-x-1">
            <button
              className={`p-1 rounded ${
                paginationState.hasPreviousPage
                  ? "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                  : "text-gray-300 cursor-not-allowed"
              }`}
              onClick={handlePreviousPage}
              disabled={!paginationState.hasPreviousPage}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M12.707 5.293a1 1 0 010 1.414L9.414 10l3.293 3.293a1 1 0 01-1.414 1.414l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>

            <button
              className={`p-1 rounded ${
                paginationState.hasNextPage
                  ? "text-gray-600 hover:text-gray-800 hover:bg-gray-200"
                  : "text-gray-300 cursor-not-allowed"
              }`}
              onClick={handleNextPage}
              disabled={!paginationState.hasNextPage}
            >
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path
                  fillRule="evenodd"
                  d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>
        </div>

        {isLoading && <div className="text-sm text-gray-500">Cargando...</div>}
      </div>
    </div>
  );
}
