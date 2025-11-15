"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"

export type StoreColumn = {
  id: string
  name: string
  ownerName: string
  ownerEmail: string
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
    accessorKey: "ownerName",
    header: "Owner",
  },
  {
    accessorKey: "ownerEmail",
    header: "Owner Email",
  },
  {
    accessorKey: "productCount",
    header: "Products",
  },
  {
    accessorKey: "orderCount",
    header: "Orders",
  },
  {
    accessorKey: "createdAt",
    header: "Created",
  },
  {
    id: "actions",
    cell: ({ row }) => (
      <Link href={`/${row.original.id}`}>
        <Button variant="ghost" size="sm">
          View <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    ),
  },
]
