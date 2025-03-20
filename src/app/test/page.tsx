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
  const [selectedData, setSelectedData] = useState<any>([]);
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

  const isRowSelected = (row: any) => {
    return selectedData?.some(
      (selected: any) => selected.student_id === row.student_id
    );
  };

  const toggleRowSelection = (row: any) => {
    setSelectedData((prev: any) =>
      isRowSelected(row)
        ? prev.filter((selected: any) => selected.student_id !== row.student_id)
        : [...prev, row]
    );
  };

  const toggleAllRows = (isChecked: boolean) => {
    console.log(listData);
    setSelectedData(isChecked ? listData?.data || [] : []);
  };

  const columnsWithCheckbox: ColumnDef<any, any>[] = isSelectable
    ? [
        {
          id: "select",
          header: () => (
            <input
              type="checkbox"
              checked={
                selectedData.length === listData?.data?.length &&
                (listData?.data?.length || 0) > 0
              }
              onChange={(e) => toggleAllRows(e.target.checked)}
            />
          ),
          cell: ({ row }) => (
            <input
              type="checkbox"
              checked={isRowSelected(row.original)}
              onChange={() => toggleRowSelection(row.original)}
            />
          ),
        },
        ...columns,
      ]
    : columns;

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
        // total={6}
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
