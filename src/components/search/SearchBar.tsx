import Image from "next/image";
import { Input } from "@/components/ui/input";
import SearchIcon from "@/images/search.png";

type SearchBarProps = {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
};

export const SearchBar = ({ value, onChange, placeholder = "Search" }: SearchBarProps) => (
  <div className="relative w-72">
    <Image
      src={SearchIcon}
      alt="search-icon"
      className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-500"
    />
    <Input
      placeholder={placeholder}
      className="w-full pl-10 rounded-[8px] border border-[#D5D7DA] text-black"
      value={value}
      onChange={(e) => onChange(e.target.value)}
    />
  </div>
);