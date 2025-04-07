"use client";

import { useRef } from "react";
import Image from "next/image";

import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { BaseRecord } from "@refinedev/core";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { useVirtualizer } from "@tanstack/react-virtual";
import Images from "@/images";

interface DataTableProps<TData> {
  columns: ColumnDef<TData>[];
  data: TData[];
  isLoading: boolean;
}

export function Datatable<TData extends BaseRecord>({
  columns,
  data,
  isLoading,
}: DataTableProps<TData>) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  const { rows } = table.getRowModel();

  const parentRef = useRef<HTMLDivElement>(null);

  const virtualizer = useVirtualizer({
    count: rows.length,
    getScrollElement: () => parentRef.current,
    estimateSize: () => 53,
    overscan: 20,
  });
  console.log(virtualizer.getTotalSize(), rows.length);

  const SkeletonRow = ({ index }: { index: number }) => (
    <TableRow
      className="animate-fade-in border border-gray-100"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {columns.map((_, colIndex) => (
        <TableCell key={colIndex} className="py-4">
          <Skeleton className="h-4 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <div ref={parentRef} className="rounded-md flex flex-col gap-4">
      <div
        className="w-full scrollbar-none"
        // style={{ height: `${virtualizer.getTotalSize()}px` }}
      >
        <Table className="font-inter">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup, idex) => (
              <TableRow
                key={`${headerGroup.id}-head-${idex}`}
                className="border-b border-[#E9EAEB] bg-[#FAFAFA]"
              >
                {headerGroup.headers.map((header, ind) => (
                  <TableHead
                    key={`${header.id}-head-${ind}`}
                    className="text-sm py-2 text-[#535862] text-left bg-[#F0F1F3]"
                  >
                    {isLoading ? (
                      <Skeleton className="h-4 w-20 mx-auto animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]" />
                    ) : (
                      flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array(5)
                .fill(null)
                .map((_, index) => <SkeletonRow key={index} index={index} />)
            ) : table.getRowModel().rows.length ? (
              // table.getRowModel().rows.map((row, idx) => {
              virtualizer.getVirtualItems().map((virtualRow, index) => {
                const row = rows[virtualRow.index];
                return (
                  <TableRow
                    // key={`${row.id}-${idx}-ind`}
                    key={row.id}
                    className="border-b border-gray-300 text-left transition-opacity duration-300 hover:bg-gray-50"
                    style={{
                      height: `${virtualRow.size}px`,
                      transform: `translateY(${
                        virtualRow.start - index * virtualRow.size
                      }px)`,
                    }}
                  >
                    {row.getVisibleCells().map((cell, ide) => (
                      <TableCell
                        // key={`${cell.id}-${ide}-tab`}
                        key={cell.id}
                        className="py-4 text-[#535862]  font-medium"
                      >
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                );
              })
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="text-center py-4 text-gray-500 animate-fade-in"
                >
                  <div className="flex flex-col items-center justify-center">
                    <Image
                      src={Images.NoBookIllustration}
                      alt="No data available"
                      width={200}
                      height={200}
                    />
                    <h2 className="text-xl font-semibold mt-4">
                      📚 No data available
                    </h2>
                    <p className="text-gray-600 mt-2">
                      There is no data available at the moment.
                    </p>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default Datatable;
