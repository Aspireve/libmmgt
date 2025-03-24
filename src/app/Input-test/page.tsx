"use client"

import { Input } from '@/components/ui/input';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from 'cmdk';
import React, { useState } from 'react';

const institutes = [
    "TIA",
    "TCSC",
    "TIM",
  ];    

const Institute_Dropdown = () => {
    const [open, setOpen] = useState(false);
    const [selectedInstitute, setSelectedInstitute] = useState("");
  
  return  (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Input
          type="text"
          placeholder="Select Institute"
          className="w-[200px] cursor-pointer"
          value={selectedInstitute}
          onChange={(e) => setSelectedInstitute(e.target.value)}
        />
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandEmpty>No results found.</CommandEmpty>
          <CommandGroup className='cursor-pointer'>
            {institutes
              .filter((inst) => inst.toLowerCase().includes(selectedInstitute.toLowerCase()))
              .map((institute) => (
                <CommandItem
                  key={institute}
                  onSelect={() => {
                    setSelectedInstitute(institute);
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
}

export default Institute_Dropdown;