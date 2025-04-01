"use client";

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
import Images from "@/images"

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

  const SkeletonRow = ({ index }: { index: number }) => (
    <TableRow
      className="animate-fade-in"
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
    <div className="rounded-md flex flex-col gap-4">
      <Table className="font-inter w-full">
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow
              key={headerGroup.id}
              className="border-b border-[#E9EAEB] bg-[#FAFAFA]"
            >
              {headerGroup.headers.map((header) => (
                <TableHead
                  key={header.id}
                  className="text-sm py-2 text-[#535862] text-left"
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
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                className="border-b border-gray-300 text-left transition-opacity duration-300 hover:bg-gray-50"
              >
                {row.getVisibleCells().map((cell) => (
                  <TableCell
                    key={cell.id}
                    className="py-4 text-[#535862]  font-medium"
                  >
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
  );
}

export default Datatable;
