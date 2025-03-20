import images from "@/images";
import Image from "next/image";
import React from "react";
import Images from "@/images";
import { Input } from "@/components/ui/input";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

const Headers = ({
  title,
  // total = 0,
  search,
  setSearch,
  AddedOptions,
  selectedData,
}: {
  title: string;
  // total: number;
  search: string;
  setSearch: (e: string) => void;
  AddedOptions: any;
  selectedData: any;
}) => {
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
        {AddedOptions.map((Component: any, index: any) => (
          <Component key={index} data={selectedData} />
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
