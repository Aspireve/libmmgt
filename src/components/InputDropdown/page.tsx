"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "cmdk";

const InstituteDropdown = ({ institutes }: { institutes: string[] }) => {
  const [open, setOpen] = useState(false);
  const [selectedInstitute, setSelectedInstitute] = useState("");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input
          type="text"
          placeholder="Select Institute"
          className="w-[200px] cursor-pointer"
          value={selectedInstitute}
          onChange={(e) => setSelectedInstitute(e.target.value)}
          onFocus={() => setOpen(true)}
        />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder="Search institute..." />
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className="cursor-pointer">
            {institutes
              .filter((inst) => inst.toLowerCase().includes(selectedInstitute.toLowerCase()))
              .map((institute) => (
                <CommandItem
                  key={institute}
                  onSelect={() => {
                    setSelectedInstitute(institute);
                    setOpen(false);
                  }}
                >
                  {institute}
                </CommandItem>
              ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

export default InstituteDropdown;