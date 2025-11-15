"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export type StoreColumn = {
  id: string
  name: string
  productCount: number
  orderCount: number
  createdAt: string
}

export const columns: ColumnDef<StoreColumn>[] = [
  {
    accessorKey: "name",
    header: "Store Name",
  },
  {
    accessorKey: "productCount",
    header: "Products",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.productCount}</div>
    ),
  },
  {
    accessorKey: "orderCount",
    header: "Orders",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.orderCount}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Link href={`/${row.original.id}`}>
        <Button variant="ghost" size="sm">
          Manage Store <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    ),
  },
]
