"use client"

import { ColumnDef } from "@tanstack/react-table"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { ArrowUpRight } from "lucide-react"
import { Badge } from "@/components/ui/badge"

export type VendorColumn = {
  id: string
  name: string
  email: string
  role: string
  storeCount: number
  productCount: number
  orderCount: number
  createdAt: string
}

export const columns: ColumnDef<VendorColumn>[] = [
  {
    accessorKey: "name",
    header: "Vendor Name",
  },
  {
    accessorKey: "email",
    header: "Email",
  },
  {
    accessorKey: "role",
    header: "Role",
    cell: ({ row }) => (
      <Badge variant={row.original.role === "ADMIN" ? "default" : "secondary"}>
        {row.original.role}
      </Badge>
    ),
  },
  {
    accessorKey: "storeCount",
    header: "Stores",
    cell: ({ row }) => (
      <div className="font-medium">{row.original.storeCount}</div>
    ),
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
    header: "Joined",
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <Link href={`/admin/vendors/${row.original.id}`}>
        <Button variant="ghost" size="sm">
          View Details <ArrowUpRight className="ml-2 h-4 w-4" />
        </Button>
      </Link>
    ),
  },
]
