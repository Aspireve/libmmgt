"use client";

import { ColumnDef } from "@tanstack/react-table";
import Datatable from "./data-table";
import { Pagination } from "./pagination";
import { FC, useEffect, useState } from "react";
import Headers from "./headers";
import { BaseRecord, LogicalFilter, useList } from "@refinedev/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { resetValues, setPaginationValues } from "@/redux/paginationSlice";
import { useRowSelection } from "@/hooks/checkbox-hook";

interface PageProps<TData extends BaseRecord> {
  title: string;
  isSelectable?: boolean;
  resource: string;
  columns: (params: { refetch: () => Promise<unknown> }) => ColumnDef<TData>[];
  AddedOptions?: FC<{
    data: TData[];
    refetch: () => Promise<unknown>;
    resource: string;
  }>[];
  query?: LogicalFilter[];
  idField?: keyof TData;
  onDataFetched?: (data: TData | null) => void;
  priorColumns?: (params: {
    refetch: () => Promise<unknown>;
  }) => ColumnDef<TData>[];
}

export default function MasterTable<TData extends BaseRecord>({
  title,
  isSelectable = true,
  resource,
  columns,
  AddedOptions,
  query = [],
  priorColumns,
  idField = "student_id" as keyof TData,
  onDataFetched,
}: PageProps<TData>) {
  // State
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    ascending: [],
    descending: [],
    filter: [],
  });
  const dispatch = useDispatch();
  const { page, limit } = useSelector((state: RootState) => state.pagination);

  const {
    data: listData,
    isLoading,
    refetch,
  } = useList<TData>({
    resource,
    pagination: { current: page, pageSize: limit },
    filters: [
      {
        field: "_search",
        operator: "eq",
        value: search,
      },
      ...query,
    ],
  });

  const { selectedData, columnsWithCheckbox, setSelectedData, columnsWithPrior } =
    useRowSelection<TData>(
      (row) => row?.[idField] as string | number,
      isSelectable,
      columns({ refetch }),
      listData?.data || [],
      priorColumns?.({ refetch })
    );

  useEffect(() => {
    if (listData?.pagination) {
      const { page, totalPages, total, limit } = listData.pagination;
      dispatch(
        setPaginationValues({
          limit,
          page,
          total,
          totalPages,
        })
      );
    }
    if (listData?.data) {
      setSelectedData([]);
    }
    if (listData?.data?.length && onDataFetched) {
      onDataFetched(listData.data[0]);
    }
    return () => {
      dispatch(resetValues());
      setSelectedData([]);
    };
  }, [listData, resource, onDataFetched,dispatch, setSelectedData]);

  return (
    <div className="my-6 border-2 border-[#E9EAEB] rounded-xl shadow-sm cursor-default">
      <Headers
        title={title}
        search={search}
        setSearch={setSearch}
        AddedOptions={AddedOptions}
        selectedData={selectedData}
        refetch={refetch}
        resource={resource}
      />
      <Datatable<TData>
        columns={columnsWithPrior}
        data={listData?.data || []}
        isLoading={isLoading}
      />
      <Pagination isLoading={isLoading} />
    </div>
  );
}
