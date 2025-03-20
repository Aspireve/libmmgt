"use client";

import { ColumnDef } from "@tanstack/react-table";
import Datatable from "./data-table";
import { Student } from "../student-page/studentcolumns";
import { Pagination } from "./pagination";
import { useEffect, useState } from "react";
import Headers from "./headers";
import { useList } from "@refinedev/core";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { setPaginationValues } from "@/redux/paginationSlice";
import { useRowSelection } from "@/hooks/checkbox-hook";

export default function TestTable() {
  // Make Props
  const isSelectable = true;
  const resource = "student/all";
  const columns: ColumnDef<Partial<Student>>[] = [
    { accessorKey: "student_id", header: "Student Id" },
    { accessorKey: "email", header: "Email" },
    { accessorKey: "address", header: "Address" },
  ];
  const data = [
    {
      id: 1,
      email: "steve18fernandes@gmail.com",
      address: "Home",
    },
    {
      id: 2,
      email: "steve18fernandes@gmail.com",
      address: "Home",
    },
    {
      id: 3,
      email: "steve18fernandes@gmail.com",
      address: "Home",
    },
  ];
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

  // State
  const [search, setSearch] = useState("");
  const [filters, setFilters] = useState({
    ascending: [],
    descending: [],
    search: [],
    filter: [],
  });
  const dispatch = useDispatch();
  const { page, limit } = useSelector((state: RootState) => state.pagination);

  const { data: listData, isLoading } = useList({
    resource,
    pagination: { current: page, pageSize: limit },
    filters: Object.values(filters ?? {}).flat(),
  });

  const {
    selectedData,
    columnsWithCheckbox,
  } = useRowSelection<any>(
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

  console.log({ listData, isLoading });

  return (
    <div className="m-10 border-2 border-[#E9EAEB] rounded-xl shadow-sm ">
      <Headers
        title="Students"
        search={search}
        setSearch={setSearch}
        AddedOptions={[TP]}
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
