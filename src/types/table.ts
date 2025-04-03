import { FC } from "react";

export interface PaginationProps {
  isLoading: boolean;
}

export interface HeadersProps<TData> {
  title: string;
  search: string;
  setSearch: (e: string) => void;
  AddedOptions?:
    | FC<{
        data: TData[];
        refetch: () => Promise<unknown>;
        resource: string;
        filters: {
          ascending: any[];
          descending: any[];
          filter: any[];
          search: any[];
        };
        setFilters: (filters: any) => void;
      }>[]
    | undefined;
  selectedData: TData[];
  refetch: () => Promise<unknown>;
  resource: string;
  filters: {
    ascending: any[];
    descending: any[];
    filter: any[];
    search: any[];
  };
  setFilters: (filters: any) => void;
}
