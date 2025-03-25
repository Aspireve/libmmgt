"use client";

import { ColumnDef } from "@tanstack/react-table";
import Datatable from "./data-table";
import { Pagination } from "./pagination";
import { useEffect, useState } from "react";
import Headers from "./headers";
import { LogicalFilter, useList } from "@refinedev/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { resetValues, setPaginationValues } from "@/redux/paginationSlice";
import { useRowSelection } from "@/hooks/checkbox-hook";

interface PageProps {
  title: string;
  isSelectable?: boolean;
  resource: string;
  columns: (e: any) => ColumnDef<any>[];
  AddedOptions?: any[];
  query?: LogicalFilter[];
}

export default function MasterTable({
  title,
  isSelectable = true,
  resource,
  columns,
  AddedOptions,
  query = [],
}: PageProps): any {
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
  } = useList({
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

  const { selectedData, columnsWithCheckbox, setSelectedData } =
    useRowSelection<any>(
      (row) => row.student_id,
      isSelectable,
      columns({ refetch }),
      listData?.data || []
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
    return () => {
      dispatch(resetValues());
      setSelectedData([]);
    };
  }, [listData, resource]);

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
      <Datatable<any>
        columns={columnsWithCheckbox}
        data={listData?.data || []}
        isLoading={isLoading}
      />
      <Pagination isLoading={isLoading} />
    </div>
  );
}
