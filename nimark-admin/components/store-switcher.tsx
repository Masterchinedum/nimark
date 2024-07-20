"use client";

import React, { useState } from "react";
import { Store } from "@prisma/client";
import { Check, ChevronsUpDown, PlusCircle, Store as StoreIcon} from "lucide-react";
import { useStoreModal } from "@/hooks/use-store-modal";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { useParams, useRouter } from "next/navigation";
import { Button }  from "./ui/button";
import { cn } from "@/lib/utils";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList, CommandSeparator } from "@/components/ui/command";

type PopoverTriggerProps = React.ComponentPropsWithoutRef<typeof PopoverTrigger>

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

    const onStoreSelect = (store: { value: string, label: string }) => {
        console.log("Store selected:", store);
        setOpen(false);
        router.push(`/${store.value}`);
    }

    return (
        <Popover 
            open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    onClick={() => {
                        console.log('onClick triggeredbutton');
                      }}
                    size="sm"
                    role="combobox"
                    aria-expanded={open}
                    aria-label="Select a store"
                    className={cn("w-[200px] justify-between", className)}
                >
                    <StoreIcon className="w-4 h-4 mr-2" />
                    {currentStore?.label}
                    <ChevronsUpDown className="w-4 h-4 ml-auto opacity-50 shrink-0" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[200px] p-0">
                <Command>
                    <CommandList>
                        <CommandInput placeholder="Search Store..." />
                        <CommandEmpty>No store found.</CommandEmpty>
                        <CommandGroup heading="Stores">
                            {formattedItems.map((store) => (
                                <CommandItem
                                    key={store.value}
                                    onSelect={() => {
                                        console.log("Store item clicked:", store);
                                        onStoreSelect(store)
                                    }}
                                    onClick={() => {
                                        console.log('onClick triggered');
                                        // onStoreSelect(store);
                                      }}
                                    className="text-sm"
                                    style={{ backgroundColor: 'black', color: "pink", border: "1px solid orange", padding: "5px" }}
                                >
                                    <StoreIcon className="w-4 h-4 mr-2" />
                                    {store.label}
                                    <Check
                                        className={cn(
                                            "ml-auto h-4 w-4",
                                            currentStore?.value === store.value
                                                ? "opacity-100"
                                                : "opacity-0"
                                        )}
                                    />
                                </CommandItem>
                            ))}
                        </CommandGroup>
                    </CommandList>
                    <CommandSeparator />
                    <CommandList>
                        <CommandGroup>
                            <CommandItem
                                onSelect={() => {
                                    console.log("Create store clicked");
                                    setOpen(false);
                                    storeModal.onOpen();
                                }}
                                style={{ backgroundColor: "black", color: "white", border: "1px solid blue", padding: "5px" }}
                            >
                                <PlusCircle className="w-5 h-5 mr-2" />
                                Create Store
                            </CommandItem>
                        </CommandGroup>
                    </CommandList>
                </Command>
            </PopoverContent>
        </Popover>
    )
}