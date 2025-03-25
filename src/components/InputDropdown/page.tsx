"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "cmdk";

const InstituteDropdown = ({
  options,
  label = "Institute",
  placeholder = "Select Option",
  onSelect,
}: {
  options: string[];
  label?: string;
  placeholder?: string;
  onSelect?: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  return (
    <div>
      <Label>{label}</Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            type="text"
            placeholder={placeholder}
            className="w-full cursor-pointer"
            value={selectedOption}
            readOnly
            onClick={() => setOpen(true)}
          />
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 z-50 relative bg-white shadow-md border border-gray-200">
          <Command>
            <CommandInput
              placeholder={`Search ${label.toLowerCase()}...`}
              value={selectedOption}
              onValueChange={setSelectedOption}
            />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="cursor-pointer">
              {options
                .filter((opt) =>
                  opt.toLowerCase().includes(selectedOption.toLowerCase())
                )
                .map((option) => (
                  <CommandItem
                    key={option}
                    onSelect={() => handleSelect(option)}
                    className="hover:bg-gray-100"
                  >
                    {option}
                  </CommandItem>
                ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default InstituteDropdown;
