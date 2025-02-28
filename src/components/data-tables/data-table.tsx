"use client";

import { useState } from "react";
import Image from "next/image";
import arrowLeft from "../../images/arrow-left.png";
import arrowRight from "../../images/arrow-right.png";

import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
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

import { Button } from "@/components/ui/button";


function getPaginationNumbers(current: number, total: number): (number | string)[] {
  const delta = 2; // how many pages before/after current page
  const range: (number | string)[] = [];


  for (let i = Math.max(1, current - delta); i <= Math.min(total, current + delta); i++) {
    range.push(i);
  }

  
  if (typeof range[0] === "number" && range[0] > 1) {
    range.unshift(1);
    if (typeof range[2] === "number" && range[2] > 2) {
      range.splice(1, 0, "...");
    }
  }


  if (
    range.length > 0 &&
    typeof range[range.length - 1] === "number" &&
    (range[range.length - 1] as number) < total
  ) {
    range.push(total);

    if (
      range.length > 2 &&
      typeof range[range.length - 3] === "number" &&
      (range[range.length - 3] as number) < total - 1
    ) {
      range.splice(range.length - 2, 0, "...");
    }
  }

  return range;
}


interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
}

export function DataTable<TData, TValue>({
  columns,
  data,
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);


  const table = useReactTable({
    data,
    columns,
    initialState: {
      pagination: {
        pageSize: 5,
      },
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: {
      sorting,
    },
    onSortingChange: setSorting,
  });

  // Calculate current page (1-based) and total pages
  const currentPage = table.getState().pagination.pageIndex + 1;
  const totalPages = table.getPageCount();


  const pageNumbers = getPaginationNumbers(currentPage, totalPages);

  return (
    <>
      {/* Table */}
      <div className="rounded-md flex flex-col gap-4">
        <Table className="font-inter w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-300">
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className="py-4 text-[#535862] text-center"
                  >
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-300 last:border-b-0 text-center"
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="py-4 text-[#535862] text-sm">
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4 text-gray-500"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between py-4">
        {/* Previous Button */}
        <Button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="flex items-center gap-2 px-4 ml-5 py-2 border border-gray-300 rounded-[8px] text-gray-700 hover:bg-gray-100"
        >
          <Image src={arrowLeft} alt="Previous" width={16} height={16} />
          <span>Previous</span>
        </Button>

        {/* Page Numbers */}
        <div className="flex items-center gap-2">
          {pageNumbers.map((page, i) => {
            if (typeof page === "number") {
              return (
                <Button
                  key={i}
                  onClick={() => table.setPageIndex(page - 1)}
                  className={`h-8 w-8 rounded-[5px] text-sm transition-colors ${
                    currentPage === page
                      ? ""
                      : ""
                  }`}
                >
                  {page}
                </Button>
              );
            } else {
              // Ellipsis
              return (
                <span key={i} className="px-2 text-gray-500">
                  {page}
                </span>
              );
            }
          })}
        </div>

        {/* Next Button */}
        <Button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="flex items-center gap-2 mr-5 px-4 py-2 border border-gray-300 rounded-[8px] text-gray-700 hover:bg-gray-100"
        >
          <span>Next</span>
          <Image src={arrowRight} alt="Next" width={16} height={16} />
        </Button>
      </div>
    </>
  );
}
