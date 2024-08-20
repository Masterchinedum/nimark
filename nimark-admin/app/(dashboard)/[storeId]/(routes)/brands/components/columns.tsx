//nimark-admin/app/(dashboard)/[storeId]/brands/components/columns.tsx

"use client"
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type BrandColumn = {
    id: string
    name: string
    imageUrl: string
    createdAt: string
}

export const columns: ColumnDef<BrandColumn>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'imageUrl',
        header: 'Image',
        cell: ({ row }) => (
            <div className="flex items-center">
                <img src={row.original.imageUrl} alt={row.original.name} className="w-10 h-10 rounded-full mr-2" />
            </div>
        ),
    },
    {
        accessorKey: 'createdAt',
        header: 'Date',
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]