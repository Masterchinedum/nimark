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
          size="sm"
          role="combobox"
          aria-expanded={open}
          aria-label="Select a store"
          className={cn("w-[200px] justify-between", className)}
        >
          <StoreIcon className="w-4 h-4 mr-2" />
          {currentStore?.label || "Select a store"}
          <ChevronsUpDown className="w-4 h-4 ml-auto opacity-50 shrink-0" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <div className="w-full p-2">
          <input
            type="text"
            placeholder="Search Store..."
            value={searchTerm}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setSearchTerm(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded-md"
          />
        </div>
        <Command>
          <CommandList>
            {filteredStores.length > 0 ? (
              filteredStores.map((store) => (
                <Button
                  key={store.value}
                  onClick={() => onStoreSelect(store)}
                  className={cn(
                    "w-full justify-start text-sm",
                    currentStore?.value === store.value ? "bg-gray-100" : ""
                  )}
                >
                  <StoreIcon className="w-4 h-4 mr-2" />
                  {store.label}
                  {currentStore?.value === store.value && (
                    <Check className="ml-auto h-4 w-4" />
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
                className="w-full justify-start text-sm"
              >
                <PlusCircle className="w-5 h-5 mr-2" />
                Create Store
              </Button>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  );
}
