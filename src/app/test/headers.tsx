"use client";

import Image from "next/image";
import { useSelector } from "react-redux";

import Images from "@/images";
import { Input } from "@/components/ui/input";
import { RootState } from "@/redux/store/store";
import type { HeadersProps } from "@/types/table";


const Headers = <TData,>({
  title,
  search,
  setSearch,
  AddedOptions,
  selectedData,
  refetch,
  resource
}: HeadersProps<TData>) => {
  const { total } = useSelector((state: RootState) => state.pagination);
  return (
    <div className="flex items-center justify-between mx-4">
      <div className="flex items-center gap-4 my-4 ">
        <span className="font-medium text-lg">{title}</span>
        <span className="rounded-full bg-[#F9F5FF] px-2 py-1 font-medium text-[#6941C6] text-sm">
          {total} Enteries
        </span>
      </div>
      <div className="flex  gap-4 items-center">
        {AddedOptions && AddedOptions.map((Component: any, index: any) => (
          <Component key={index} data={selectedData} refetch={refetch} resource={resource}/>
        ))}
        <div className="relative w-72">
          <Image
            src={Images.Search}
            alt="search-icon"
            className="absolute left-3 top-1/2 -translate-y-1/2"
          />
          <Input
            placeholder="Search"
            className="w-full pl-10 rounded-[8px] border border-[#D5D7DA] text-black"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>
    </div>
  );
};

export default Headers;
