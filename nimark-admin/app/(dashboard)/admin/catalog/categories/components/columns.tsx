// nimark-admin/app/(dashboard)/[storeId]/(routes)/categories/components/columns.tsx

"use client"

import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';
import { Button } from "@/components/ui/button";
import { ChevronRight, ChevronDown } from "lucide-react";

export type CategoryColumn = {
    id: string
    name: string
    billboardLabel: string
    createdAt: string
    parentId: string | null
    level: number
}

export const columns = (
    toggleCategory: (id: string) => void,
    isExpanded: (id: string) => boolean
): ColumnDef<CategoryColumn>[] => [
    {
        accessorKey: 'name',
        header: 'Name',
        cell: ({ row }) => {
            const category = row.original;
            return (
                <div className="flex items-center" style={{ paddingLeft: `${category.level * 20}px` }}>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="p-0 mr-2"
                        onClick={() => toggleCategory(category.id)}
                    >
                        {isExpanded(category.id) ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
                    </Button>
                    {category.name}
                </div>
            );
        },
    },
    {
        accessorKey: 'billboardLabel',
        header: 'Billboard',
    },
    {
        accessorKey: 'createdAt',
        header: 'Date',
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
];