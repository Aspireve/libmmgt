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
import { UseFormRegister, FieldErrors } from "react-hook-form";

interface InstituteDropdownProps {
  options?: string[];
  label?: string;
  placeholder?: string;
  onSelect?: (value: string) => void;
  selectedValue?: string;
  register: UseFormRegister<any>; // You can replace `any` with your form data type
  errors?: FieldErrors;
  name: string;
  validation?: Record<string, any>;
  disabled?: boolean;
  readonly?: boolean;
  required?: boolean;
}

const InstituteDropdown = ({
  register,
  errors,
  name,
  options = [],
  label = "Institute",
  placeholder = "Select Option",
  onSelect,
  selectedValue = "",
  validation,
  disabled = false,
  readonly = false,
  required = false,
}: InstituteDropdownProps) => {
  const [open, setOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(selectedValue);
  const [dropdownOptions, setDropdownOptions] = useState<string[]>(options);

  // Sync selectedOption with selectedValue prop
  useEffect(() => {
    setSelectedOption(selectedValue);
  }, [selectedValue]);

  // Sync dropdownOptions with options prop
  useEffect(() => {
    setDropdownOptions(options);
  }, [options]);

  const handleSelect = (option: string) => {
    setSelectedOption(option);
    setOpen(false);
    if (onSelect) {
      onSelect(option);
    }
  };

  const handleInputChange = (value: string) => {
    setSelectedOption(value);
    if (onSelect) {
      onSelect(value); // Update form value as user types
    }
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
      <Label>
        {label}
        {required && <span className="text-red-500"> *</span>}
      </Label>
      <Popover open={open} onOpenChange={setOpen}>
        <PopoverTrigger asChild>
          <Input
            className="text-[#717680]"
            type="text"
            value={selectedOption} // Controlled input
            {...register(name, validation)}
            placeholder={placeholder}
            disabled={disabled}
            readOnly={readonly}
            onClick={() => !disabled && !readonly && setOpen(true)}
          />
        </PopoverTrigger>
        <PopoverContent className="w-full p-0 z-50 relative bg-white shadow-md border border-gray-200">
          <Command>
            <CommandInput
              placeholder={`Search or add ${label.toLowerCase()}...`}
              value={selectedOption}
              onValueChange={handleInputChange}
              onKeyDown={handleKeyDown}
              className="p-2"
            />
            <CommandEmpty>No results found.</CommandEmpty>
            <CommandGroup className="cursor-pointer w-full max-h-[200px] overflow-auto">
              {dropdownOptions.map((option, index) => (
                <CommandItem
                  key={`${option}-${index}`}
                  onSelect={() => handleSelect(option)}
                  className="hover:bg-gray-100 px-2 py-2"
                >
                  {option}
                </CommandItem>
              ))}
            </CommandGroup>
          </Command>
        </PopoverContent>
      </Popover>
      {errors?.[name] && (
        <p className="text-red-500 text-sm mt-1">
          {errors[name]?.message as string}
        </p>
      )}
    </div>
  );
};

export default InstituteDropdown;
