"use client";

import React, { useState } from "react";
import { Store } from "@prisma/client";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon } from "lucide-react";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useParams, useRouter } from "next/navigation";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandList, CommandSeparator } from "./ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>;

interface StoreSwitcherProps extends PopoverTriggerProps {
  items: Store[];
}

export default function StoreSwitcher({
  className,
  items = []
}: StoreSwitcherProps) {
  const storeModal = useStoreModal();
  const params = useParams();
  const router = useRouter();

  const formattedItems = items.map((item) => ({
    label: item.name,
    value: item.id
  }));

  const currentStore = formattedItems.find((item) => item.value === params.storeId);

  const [open, setOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  const onStoreSelect = (store: { value: string, label: string }) => {
    setOpen(false);
    router.push(`/${store.value}`);
  };

  // Filter stores based on the search term
  const filteredStores = formattedItems.filter((store) =>
    store.label.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          size="lg"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[250px] bg-white border border-gray-300 rounded-lg shadow-lg flex items-center justify-between px-4 py-2 hover:bg-gray-100 transition-all duration-300", className)}
        >
          <StoreIcon className="w-5 h-5 text-gray-600" />
          <span className="text-gray-700">{currentStore?.label || "Select a store"}</span>
          <ChevronsUpDown className="w-5 h-5 text-gray-500" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[250px] p-0 bg-white border border-gray-300 rounded-lg shadow-lg">
        <div className="w-full p-2 border-b border-gray-300 bg-gray-50">
          <input
            type="text"
            placeholder="Search Store..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <Command>
          <CommandList className="max-h-60 overflow-y-auto">
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <Button
                  key={store.value}
                  onClick={() => onStoreSelect(store)}
                  className={cn(
                    "w-full justify-start text-sm text-gray-700 hover:bg-gray-100 transition-all duration-300",
                    currentStore?.value === store.value ? "bg-blue-100" : ""
                  )}
                >
                  <StoreIcon className="w-5 h-5 text-gray-500 mr-2" />
                  {store.label}
                  {currentStore?.value === store.value && (
                    <Check className="ml-auto h-5 w-5 text-blue-500" />
                  )}
                </Button>
              ))
            ) : (
              <CommandEmpty>No store found.</CommandEmpty>
            )}
          </CommandList>
          <CommandSeparator />
          <CommandList>
            <CommandGroup>
              <Button
                onClick={() => {
                  setOpen(false);
                  storeModal.onOpen();
                }}
                className="w-full justify-start text-sm text-gray-700 hover:bg-gray-100 transition-all duration-300"
              >
                <PlusCircle className="w-5 h-5 text-gray-500 mr-2" />
                Create Store
              </Button>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
