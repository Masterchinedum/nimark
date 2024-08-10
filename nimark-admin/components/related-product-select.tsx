// app/components/ui/related-product-select.tsx
import { useState } from 'react';
import { Check, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Product } from "@prisma/client";

interface RelatedProductSelectProps {
  products: Product[];
  selectedProductIds: string[];
  onChange: (value: string[]) => void;
}

export const RelatedProductSelect: React.FC<RelatedProductSelectProps> = ({
  products,
  selectedProductIds,
  onChange
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-full justify-between"
        >
          {selectedProductIds.length > 0
            ? `${selectedProductIds.length} products selected`
            : "Select related products..."}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0">
        <Command>
          <CommandInput placeholder="Search products..." />
          <CommandEmpty>No product found.</CommandEmpty>
          <CommandGroup>
            {products.map((product) => (
              <CommandItem
                key={product.id}
                onSelect={() => {
                  onChange(
                    selectedProductIds.includes(product.id)
                      ? selectedProductIds.filter((id) => id !== product.id)
                      : [...selectedProductIds, product.id]
                  );
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    selectedProductIds.includes(product.id) ? "opacity-100" : "opacity-0"
                  )}
                />
                {product.name}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
}