"use client";

import Image from "next/image";
import { useDispatch, useSelector } from "react-redux";

import Images from "@/images";
import { Input } from "@/components/ui/input";
import { RootState } from "@/redux/store/store";
import type { HeadersProps } from "@/types/table";
import { Button } from "@/components/ui/button";
import { entries } from "lodash";
import { useEffect } from "react";
import { setShow } from "@/redux/selectAllSlice";


const Headers = <TData,>({
  title,
  search,
  setSearch,
  AddedOptions,
  selectedData,
  refetch,
  resource,
  filters,
  setFilters,
}: HeadersProps<TData>) => {
  const dispatch = useDispatch()
  const { total } = useSelector((state: RootState) => state.pagination);
  const { show } = useSelector((state: RootState) => state.selectAll);
  useEffect(() => {
    return () => {
      dispatch(setShow(false));
    };
  }, []);

  return (
    <div>

      <div className="flex items-center justify-between mx-4">
        <div className="flex items-center gap-4 my-4 ">
          <span className="font-medium text-lg">{title}</span>
          <span className="rounded-full bg-[#F9F5FF] px-2 py-1 font-medium text-[#6941C6] text-sm">
            {total} Entries
          </span>
        </div>
        <div className="flex  gap-4 items-center">
          {AddedOptions && AddedOptions.map((Component: any, index: any) => (
            <Component filters={filters} setFilters={setFilters} key={index} data={selectedData} refetch={refetch} resource={resource} />
          ))}
          {/* <div className="relative w-72">
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
          </div> */}
        </div>

      </div>
      <div className={`${show ? "flex" : "hidden"}  justify-center items-center mb-1 gap-3`}>
        <div>
          All {selectedData.length} conversations on this page are selected.
        </div>
        <div className="  hover:bg-blue-200  bg-blue-100 text-black p-1 cursor-pointer rounded-md">Select all {total} {title}</div>
      </div>

    </div>
  );
};

export default Headers;
