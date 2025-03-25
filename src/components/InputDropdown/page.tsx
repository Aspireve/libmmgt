"use client";

import { useState, useEffect } from "react";
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
  options = [],
  label = "Institute",
  placeholder = "Select Option",
  onSelect,
  selectedValue = "", // Add this prop
}: {
  options?: string[];
  label?: string;
  placeholder?: string;
  onSelect?: (value: string) => void;
  selectedValue?: string; // Allow passing an initial selected value
}) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selectedValue); // Initialize with selectedValue
  const [dropdownOptions, setDropdownOptions] = useState<string[]>(options);

  useEffect(() => {
    setSelectedOption(selectedValue); // Update when selectedValue changes
  }, [selectedValue]);

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
              placeholder={`Search or add ${label.toLowerCase()}...`}
              value={selectedOption}
              onValueChange={setSelectedOption}
            />
            <CommandEmpty>No results found. Press Enter to add.</CommandEmpty>
            <CommandGroup className="cursor-pointer">
              {dropdownOptions.map((option) => (
                <CommandItem
                  key={option}
                  onSelect={() => {
                    setSelectedOption(option);
                    if (onSelect) onSelect(option);
                    setOpen(false);
                  }}
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
