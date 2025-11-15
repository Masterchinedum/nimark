"use client"

import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { VendorColumn, columns } from "./columns"

interface VendorsClientProps {
  data: VendorColumn[]
}

export const VendorsClient: React.FC<VendorsClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Vendors (${data.length})`}
        description="View and manage all vendors and their stores"
      />
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  )
}
