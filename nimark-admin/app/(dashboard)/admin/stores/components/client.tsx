"use client"

import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { StoreColumn, columns } from "./columns"

interface StoresClientProps {
  data: StoreColumn[]
}

export const StoresClient: React.FC<StoresClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Stores (${data.length})`}
        description="View and manage all vendor stores"
      />
      <Separator />
      <DataTable searchKey="name" columns={columns} data={data} />
    </>
  )
}
