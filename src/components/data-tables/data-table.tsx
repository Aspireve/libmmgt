"use client";

import { useState } from "react";

import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
import { Button } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import Image from "next/image";
import Previous from '../../images/arrow-left.png'
import Next from '../../images/arrow-right.png'
import { BaseRecord, useList } from "@refinedev/core";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  resource: string;
  isLoading?:boolean
}

export function DataTable<TData extends BaseRecord, TValue>({
  columns,
  resource,
  isLoading=false
}: DataTableProps<TData, TValue>) {

  const [page, setPage] = useState<number>(1);

  const {data} = useList<TData>({
    resource,
    pagination:{
      current:page,
      pageSize:5
    }
  })
  const totalPages = data?.pagination?.totalPages  || []
  const table = useReactTable({
    data: data?.data ?? [],
    columns,
    pageCount: totalPages,
    getCoreRowModel: getCoreRowModel(),
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

            {/* Pagination Controls */}
      <div className="flex items-center justify-between py-4 cursor-pointer">
        <Button
          onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
          disabled={page === 1 || isLoading}
          className="transition-all duration-200 hover:scale-105 disabled:opacity-50 ml-10"
        >
          <Image src={Previous} alt="Previous Icon" />
          Previous
        </Button>

        <div>
          <div className="text-[#535862] flex gap-11 items-center">
            {isLoading ? (
              <Skeleton
                className="h-4 w-20 animate-pulse bg-gradient-to-r from-gray-200 via-gray-300 to-gray-200 bg-[length:200%_100%]"
              />
            ) : (
              <>
              <span className="animate-fade-in">
                {table.getState().pagination.pageIndex + 1} ... {table.getPageCount()}
              </span>
              <Select>
              <SelectTrigger className="w-[120px] border-[#717680] rounded-[10px]">
            <SelectValue placeholder="No of rows" />
          </SelectTrigger>
                <SelectContent className="bg-[#fff]">
                  <SelectGroup>
                  <SelectLabel>No of pages</SelectLabel>
                    <SelectItem value="5">5</SelectItem>
                    <SelectItem value="10">10</SelectItem>
                    <SelectItem value="15">15</SelectItem>
                  </SelectGroup>
                </SelectContent>
              </Select>
              </>
            )}
          </div>  

          
        </div>
        <Button
          onClick={() => setPage((prev) => Math.min(prev + 1, totalPages))}
          disabled={page === totalPages || isLoading}
          className="transition-all duration-200 hover:scale-105 disabled:opacity-50 mr-10"
        >
          Next
          <Image src={Next} alt="Next Icon" />
        </Button>
      </div>
    </>
  )}




