"use client";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import Image from "next/image";
import Images from "@/images/index";
import { options } from "@/constants/tables";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { nextPage, prevPage, setLimit } from "@/redux/paginationSlice";
import { PaginationProps } from "@/types/table";

export function Pagination({ isLoading }: PaginationProps) {
  const dispatch = useDispatch();
  const {
    page,
    limit,
    totalPages,
  } = useSelector((state: RootState) => state.pagination);
  return (
    <div className="flex items-center justify-between py-4 cursor-pointer border-t border-[#cdcecf] px-10">
      <Button
        onClick={() => dispatch(prevPage())}
        disabled={page === 1 || isLoading}
        className="transition-all duration-200 disabled:opacity-50 border-2 border-[#D5D7DA] shadow-none rounded-xl text-[#414651]"
      >
        <Image src={Images.ArrowLeft} alt="Previous Icon" />
        Previous
      </Button>

      <div className="text-[#535862] flex gap-11 items-center">
        {isLoading ? (
          <span className="animate-pulse">Loading...</span>
        ) : (
          <span className="animate-fade-in">
            {page} ... {totalPages}
          </span>
        )}
        <Select onValueChange={(value) => dispatch(setLimit(Number(value)))}>
          <SelectTrigger className="w-[120px] border-[#717680] rounded-[10px]">
            <SelectValue placeholder={`${limit} rows`} />
          </SelectTrigger>
          <SelectContent className="bg-[#fff]">
            <SelectGroup>
              <SelectLabel>No of rows</SelectLabel>
              {options.map((option) => (
                <SelectItem key={option} value={option.toString()}>
                  {option}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      <Button
        onClick={() => dispatch(nextPage())}
        disabled={page >= totalPages || isLoading}
        className="transition-all duration-200 disabled:opacity-50 border-2 border-[#D5D7DA] shadow-none rounded-xl text-[#414651]"
      >
        Next
        <Image src={Images.ArrowRight} alt="Next Icon" />
      </Button>
    </div>
  );
}
