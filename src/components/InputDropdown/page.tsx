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
  options = [],
  label = "Institute",
  placeholder = "Select Option",
  onSelect,
}: {
  options?: string[];
  label?: string;
  placeholder?: string;
  onSelect?: (value: string) => void;
}) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState("");
  const [dropdownOptions, setDropdownOptions] = useState<string[]>(options);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  const handleInputChange = (value: string) => {
    setSelectedOption(value);
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter" && selectedOption.trim() !== "") {
      if (!dropdownOptions.includes(selectedOption)) {
        setDropdownOptions([...dropdownOptions, selectedOption]);
      }
      handleSelect(selectedOption);
      event.preventDefault();
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
              placeholder={`Search or add ${label.toLowerCase()}...`}
              value={selectedOption}
              onValueChange={handleInputChange}
              onKeyDown={handleKeyDown}
            />
            <CommandEmpty>No results found. Press Enter to add.</CommandEmpty>
            <CommandGroup className="cursor-pointer">
              {dropdownOptions.map((option) => (
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
