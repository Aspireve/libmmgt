"use client";

import { ColumnDef } from "@tanstack/react-table";
import Datatable from "./data-table";
import { Student } from "../student-page/studentcolumns";
import { Pagination } from "./pagination";
import { useState } from "react";
import Headers from "./headers";

export default function TestTable() {
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 3,
    total: 6,
    limit: 15,
  });

  const setCurrentPageTo = (currentPage: number) => {
    setPagination((prev) => ({
      ...prev,
      currentPage,
    }));
  };
  const setLimitTo = (limit: number) => {
    setPagination((prev) => ({
      ...prev,
      limit,
    }));
  };
  const columns: ColumnDef<Partial<Student>>[] = [
    { accessorKey: "email", header: "Email" },
    { accessorKey: "address", header: "Address" },
  ];
  const data = [
    {
      email: "steve18fernandes@gmail.com",
      address: "Home",
    },
    {
      email: "steve18fernandes@gmail.com",
      address: "Home",
    },
  ];

  const TP = () => {
    return <>Hello</>;
  };
  return (
    <div className="m-10 border-2 border-[#E9EAEB] rounded-xl shadow-sm ">
      <Headers
        title="Students"
        total={pagination.total}
        search={search}
        setSearch={setSearch}
        AddedOptions={[TP]}
      />
      <Datatable columns={columns} data={data} isLoading={false} />
      <Pagination
        page={pagination.currentPage}
        limit={pagination.limit}
        totalPages={pagination.totalPages}
        setPage={setCurrentPageTo}
        setLimit={setLimitTo}
        isLoading={false}
      />
    </div>
  );
}
