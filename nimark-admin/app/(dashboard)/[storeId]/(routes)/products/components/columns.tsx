//nimark-admin/app/(dashboard)/[storeId]/(routes)/products/components/column.tsx
"use client"
import { ColumnDef } from '@tanstack/react-table';
import { CellAction } from './cell-action';

export type ProductColumn = {
    id: string
    name: string
    price: string
    size: string
    category: string
    color: string
    isFeatured: boolean
    isArchived: boolean
    createdAt: string
    stock: number
}

export const columns: ColumnDef<ProductColumn>[] = [
    {
        accessorKey: 'name',
        header: 'Name',
    },
    {
        accessorKey: 'isArchived',
        header: 'Archived',
        cell: ({ row }) => (
          <div>{row.original.isArchived ? 'Yes' : 'No'}</div>
        )
    },
    {
        accessorKey: 'isFeatured',
        header: 'Featured',
    },
    {
        accessorKey: 'price',
        header: 'Price',
    },
    {
        accessorKey: 'stock',
        header: 'Stock',
        cell: ({ row }) => {
            const stock = row.original.stock;
            let className = '';
            if (stock === 0) {
                className = 'text-red-600 font-bold';
            } else if (stock <= 5) {
                className = 'text-yellow-600 font-bold';
            }
            return <div className={className}>{stock}</div>;
        }
    },
    {
        accessorKey: 'stockStatus',
        header: 'Stock Status',
        cell: ({ row }) => {
            const stock = row.original.stock;
            if (stock === 0) {
                return <div className="text-red-600">Out of Stock</div>;
            } else if (stock <= 5) {
                return <div className="text-yellow-600">Low Stock</div>;
            } else {
                return <div className="text-green-600">In Stock</div>;
            }
        }
    },
    {
        accessorKey: 'category',
        header: 'Category',
    },
    {
        accessorKey: 'size',
        header: 'Size',
    },
    {
        accessorKey: 'color',
        header: 'Color',
        cell: ({ row }) => (
            <div className='flex items-center gap-x-2'>
                {row.original.color}
                <div className='w-6 h-6 border rounded-full' style={{ backgroundColor: row.original.color }} />
            </div>
        )
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