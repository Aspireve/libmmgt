"use client";

import { ColumnDef } from "@tanstack/react-table";
import Datatable from "./data-table";
import { Student } from "../student-page/studentcolumns";
import { Pagination } from "./pagination";
import { ReactNode, useEffect, useState } from "react";
import Headers from "./headers";
import { useList } from "@refinedev/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { setPaginationValues } from "@/redux/paginationSlice";
import { useRowSelection } from "@/hooks/checkbox-hook";

const TP = ({
  data,
  filters,
  setFilters,
}: {
  data: any;
  filters: any;
  setFilters: any;
}) => {
  return <div onClick={() => console.log(data)}>Hello</div>;
};

export default function MasterTable({
  title,
  isSelectable = true,
  resource,
  columns,
  AddedOptions,
}: {
  title: string;
  isSelectable?: boolean;
  resource: string;
  columns: ColumnDef<any>[];
  AddedOptions?: ReactNode[];
}) {
  // State
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    ascending: [],
    descending: [],
    filter: [],
  });
  const dispatch = useDispatch();
  const { page, limit } = useSelector((state: RootState) => state.pagination);

  const { data: listData, isLoading } = useList({
    resource,
    pagination: { current: page, pageSize: limit },
    filters: [
      {
        field: "_search",
        operator: "eq",
        value: search,
      },
    ],
  });

  const { selectedData, columnsWithCheckbox } = useRowSelection<any>(
    (row) => row.student_id,
    isSelectable,
    columns,
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
  }, [listData]);

  return (
    <div className="m-10 border-2 border-[#E9EAEB] rounded-xl shadow-sm cursor-default">
      <Headers
        title={title}
        search={search}
        setSearch={setSearch}
        AddedOptions={AddedOptions}
        selectedData={selectedData}
      />
      <Datatable
        columns={columnsWithCheckbox}
        data={listData?.data || []}
        isLoading={isLoading}
      />
      <Pagination isLoading={isLoading} />
    </div>
  );
}
