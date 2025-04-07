"use client";

import { FC, useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useList } from "@refinedev/core";
import { debounce } from "lodash";
import { ChevronDown } from "lucide-react";
import { Label } from "../ui/label";

interface DynamicFilter {
  label: string;
  field: string;
  resource: string;
}

interface FilterProps {
  filtersConfig: DynamicFilter[];
  setFilters: (filters: {
    filter?: { field: string; operator: string; value: string[] }[];
  }) => void;
}

const Filter: FC<FilterProps> = ({ filtersConfig, setFilters }) => {
  const [open, setOpen] = useState(false);
  const [dropdownStates, setDropdownStates] = useState<Record<string, boolean>>({});
  const [selectedValues, setSelectedValues] = useState<Record<string, string[]>>({});

  // Store loaded options per resource
  const listData = filtersConfig.reduce((acc, { resource }) => {
    acc[resource] = useList({ resource });
    return acc;
  }, {} as Record<string, ReturnType<typeof useList>>);

  const applyFilters = useMemo(
    () =>
      debounce((values: Record<string, string[]>) => {
        const filters = Object.entries(values)
          .filter(([_, val]) => val.length > 0)
          .map(([field, val]) => ({
            field,
            operator: "eq",
            value: val,
          }));

        // setFilters((prev: any)=>({...prev, filter: filters });

        setFilters({filter: filters})
      }, 300),
    [setFilters]
  );

  useEffect(() => {
    applyFilters(selectedValues);
  }, [selectedValues, applyFilters]);

  const toggleValue = (field: string, value: string) => {
    setSelectedValues((prev) => {
      const current = prev[field] || [];
      const updated = current.includes(value)
        ? current.filter((v) => v !== value)
        : [...current, value];
      return { ...prev, [field]: updated };
    });
  };

  const toggleDropdown = (field: string) => {
    setDropdownStates((prev) => ({
      ...prev,
      [field]: !prev[field],
    }));
  };

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="border border-[#1E40AF] rounded-[8px] text-[#1E40AF] hover:text-[#1E40AF]"
        >
          Filter
        </Button>
      </PopoverTrigger>

      <PopoverContent className="p-4 space-y-4 w-64">
        {filtersConfig.map(({ label, field, resource }) => {
          const { data, isLoading } = listData[resource];
          const options = data?.data || [];
          const dropdownOpen = dropdownStates[field];
          const selected = selectedValues[field] || [];

          return (
            <div key={field} className="relative">
              <Button
                variant="outline"
                onClick={() => toggleDropdown(field)}
                className="w-full flex justify-between items-center px-3 py-2 border border-[#1E40AF] rounded-md text-sm text-[#1E40AF] hover:bg-[#1E40AF]/10"
              >
                {label}
                <ChevronDown className={`h-4 w-4 transition-transform ${dropdownOpen ? "rotate-180" : ""}`} />
              </Button>

              {dropdownOpen && (
                <div className="absolute z-10 mt-2 w-full max-h-48 overflow-y-auto bg-white border border-[#1E40AF] rounded-md shadow-md p-2 space-y-1">
                  {options.map((opt: any) => {
                    const value = opt;
                    const checked = selected.includes(value);
                    return (
                      <Label
                        key={value}
                        className="flex items-center space-x-2 text-sm text-[#1E40AF] cursor-pointer"
                      >
                        <input
                          type="checkbox"
                          value={value}
                          checked={checked}
                          onChange={() => toggleValue(field, value)}
                          className="accent-[#1E40AF]"
                        />
                        <span>{value}</span>
                      </Label>
                    );
                  })}
                  {isLoading && <p className="text-xs text-gray-500 px-1">Loading...</p>}
                  {!isLoading && options.length === 0 && (
                    <p className="text-xs text-gray-500 px-1">No options found</p>
                  )}
                </div>
              )}
            </div>
          );
        })}
      </PopoverContent>
    </Popover>
  );
};

export default Filter;