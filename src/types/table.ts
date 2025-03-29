import { FC } from "react";

export interface PaginationProps {
  isLoading: boolean;
}

export interface HeadersProps<TData> {
  title: string;
  search: string;
  setSearch: (e: string) => void;
  AddedOptions?:
    | FC<{ data: TData; refetch: () => Promise<unknown>; resource: string }>[]
    | undefined;
  selectedData: TData[];
  refetch: () => Promise<unknown>;
  resource: string;
}
