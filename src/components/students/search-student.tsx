import { debounce } from "lodash";
import { useCallback, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import Image from "next/image";
import images from "@/images";
import { Input } from "../ui/input";

interface SearchFilterProps {
  setFilters: (filters: any) => void;
  options: { label: string; value: string }[];
  placeholder?: string;
}

export const SearchFilter = ({ setFilters, options, placeholder = "Search" }: SearchFilterProps) => {
  const { register, watch, setValue } = useForm({
    defaultValues: {
      search: "",
      selectedField: options[0]?.value || "",
    },
  });
  const search = watch("search") || "";
  const selectedField = watch("selectedField") || "student_id";

  const updateFilters = useCallback(
    debounce((field, value) => {
      setFilters((prev: any) => ({
        ...prev,
        search: [{ field, value }],
      }));
    }, 300), // Adjust delay as needed
    [setFilters]
  );

  useEffect(() => {
    updateFilters(selectedField, search);
  }, [selectedField, search]);

  return (
    <div className="flex">
      <Select
        onValueChange={(value) => setValue("selectedField", value)}
        defaultValue={options[0]?.value}
      >
        <SelectTrigger className="w-fit p-2 h-full border rounded-x-[8px] border-transparent rounded-l-[8px] rounded-tr-none rounded-br-none border-[#D5D7DA]">
          <SelectValue placeholder="Field" />
        </SelectTrigger>
        <SelectContent className="bg-white border-[#D5D7DA] rounded shadow-md">
          {options.map(({ label, value }) => (
            <SelectItem key={value} value={value}>
              {label}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
      <div className="relative w-72 border border-[#D5D7DA] border-l-0">
        <Image
          src={images.Search}
          alt="search-icon"
          className="absolute left-3 top-1/2 -translate-y-1/2"
        />
        <Input
          placeholder={placeholder}
          className="w-full pl-10 rounded-[60px] rounded-bl-none border-transparent  text-black placeholder:text-[#aaa]"
          {...register("search")}
        />
      </div>
    </div>
  );
};
