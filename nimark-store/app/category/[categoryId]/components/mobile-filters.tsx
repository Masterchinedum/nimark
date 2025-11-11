'use client';

import { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Color, Size } from '@/types';
import { Button } from '@/components/ui/button';
import { Sheet, SheetContent, SheetTrigger } from '@/components/ui/sheet';
import Filter from './filter';

interface MobileFiltersProps {
  sizes: Size[];
  colors: Color[];
}

const MobileFilters: React.FC<MobileFiltersProps> = ({ sizes, colors }) => {
  const [open, setOpen] = useState(false);

  const onOpen = () => setOpen(true);
  const onClose = () => setOpen(false);

  return (
    <>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetTrigger asChild>
          <Button onClick={onOpen} className="flex items-center gap-x-2 lg:hidden">
            Filters
            <Plus size={20} />
          </Button>
        </SheetTrigger>
        <SheetContent side="left" className="w-[300px]">
          <div className="flex items-center justify-between p-4">
            <p className="text-lg font-semibold">Filters</p>
            <Button
              onClick={onClose}
              variant="ghost"
              size="icon"
              className="rounded-full"
            >
              <X size={20} />
            </Button>
          </div>
          <div className="p-4">
            <Filter valueKey="sizeId" name="Sizes" data={sizes} />
            <Filter valueKey="colorId" name="Colors" data={colors} />
          </div>
        </SheetContent>
      </Sheet>
    </>
  );
};

export default MobileFilters;
