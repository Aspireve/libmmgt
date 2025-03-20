"use Client"

import { BaseRecord, CrudFilters, CrudOperators, LogicalFilter, useList } from "@refinedev/core";
import { useState } from "react";
import { DataTable } from "./data-table";
import { ColumnDef } from "@tanstack/react-table";

interface MainTableProps<TData extends BaseRecord, TValue> {
    columns: ColumnDef<TData, any>[];
    resource: string;
    search?: string;
    filters?: LogicalFilter[];
}

export function MainTable<TData extends BaseRecord, TValue>({
    columns,
    resource,
    search = "",
    filters = [],
}: MainTableProps<TData, TValue>) {
    const [page, setPage] = useState<number>(1);
    const [limit, setLimit] = useState<number>(5);
    const { data, isLoading } = useList<TData>({
        resource,
        pagination: {
            current: page,
            pageSize: limit,
        },
        filters: [
            {
                field: "_search",
                operator: "eq",
                value: search,
            },
            ...(filters ?? []),
        ],
    });
    
    return (
        <>
            <DataTable
                columns={columns}
                data={data?.data?.copies ?? data?.data ?? []}
                isLoading={isLoading}
                page={page}
                setPage={setPage}
                setLimit={setLimit}
                limit={limit}
                totalPages={data?.pagination?.totalPages || 1}
            />
        </>
    )
}