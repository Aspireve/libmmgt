"use client";

import { useState } from "react";
import {
  ColumnDef,
  flexRender,
  SortingState,
  getCoreRowModel,
  getSortedRowModel,
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
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Previous from '../../images/arrow-left.png'
import Next from '../../images/arrow-right.png'

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  isLoading?: boolean;
}

export function DataTable<TData, TValue>({ 
  columns, 
  data, 
  isLoading = false 
}: DataTableProps<TData, TValue>) {
  const [sorting, setSorting] = useState<SortingState>([]);

  const table = useReactTable({
    data,
    columns,
    initialState: { pagination: { pageSize: 5 } },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    state: { sorting },
    onSortingChange: setSorting,
  });

  const SkeletonRow = ({ index }: { index: number }) => (
    <TableRow 
      className="animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      {columns.map((_, colIndex) => (
        <TableCell key={colIndex} className="py-4">
          <Skeleton 
            className="h-4 w-full animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"
          />
        </TableCell>
      ))}
    </TableRow>
  );

  return (
    <>
      <style jsx>{`
        @keyframes fadeIn {
          from {
            opacity: 0;
            transform: translateY(10px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        
        .animate-fade-in {
          animation: fadeIn 0.5s ease-out forwards;
        }
        
        .animate-pulse {
          animation: pulse 2s infinite;
          background-size: 200% 100%;
          animation: pulseGradient 2s ease-in-out infinite;
        }
        
        @keyframes pulseGradient {
          0% {
            background-position: 200% 0;
          }
          100% {
            background-position: -200% 0;
          }
        }
      `}</style>

      <div className="rounded-md flex flex-col gap-4">
        <Table className="font-inter w-full">
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="border-b border-gray-300">
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="py-4 text-[#535862] text-center">
                    {isLoading ? (
                      <Skeleton 
                        className="h-4 w-20 mx-auto animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"
                      />
                    ) : (
                      flexRender(header.column.columnDef.header, header.getContext())
                    )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>

          <TableBody>
            {isLoading ? (
              Array(5).fill(null).map((_, index) => (
                <SkeletonRow key={index} index={index} />
              ))
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow 
                  key={row.id} 
                  className="border-b border-gray-300 text-center transition-opacity duration-300 hover:bg-gray-50"
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
                  className="text-center py-4 text-gray-500 animate-fade-in"
                >
                  No data available
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      <div className="flex items-center justify-between py-4">
        <Button 
          onClick={() => table.previousPage()} 
          disabled={!table.getCanPreviousPage() || isLoading}
          className="transition-all duration-200 hover:scale-105 disabled:opacity-50"
        >
          <Image src={Previous} alt="Previous Icon"/>
          Previous
        </Button>

        <span className="text-[#535862]">
          {isLoading ? (
            <Skeleton 
              className="h-4 w-20 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"
            />
          ) : (
            <span className="animate-fade-in">
              {table.getState().pagination.pageIndex + 1} ... {table.getPageCount()}
            </span>
          )}
        </span>

        <Button 
          onClick={() => table.nextPage()} 
          disabled={!table.getCanNextPage() || isLoading}
          className="transition-all duration-200 hover:scale-105 disabled:opacity-50"
        >
          Next
          <Image src={Next} alt="Next Icon"/>
        </Button>
      </div>
    </>
  );
}