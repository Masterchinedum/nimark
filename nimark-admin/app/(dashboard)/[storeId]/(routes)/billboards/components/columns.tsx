//nimark-admin/app/(dashboard)/[storeId]/billboards/components/columns.tsx

"use client"
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type BillboardColumn = {
    id: string
    label: string
    createdAt: string
}

export const columns: ColumnDef<BillboardColumn>[] = [
    {
        accessorKey: 'label',
        header: 'Label',
    },
    {
        accessorKey: 'createdAt',
        header: 'Date / Time',
    },
    {
        id: 'actions',
        cell: ({ row }) => <CellAction data={row.original} />
    }
]