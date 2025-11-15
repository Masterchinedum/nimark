"use client"

import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { UserColumn, columns } from "./columns"

interface UsersClientProps {
  data: UserColumn[]
}

export const UsersClient: React.FC<UsersClientProps> = ({ data }) => {
  return (
    <>
      <Heading
        title={`Users (${data.length})`}
        description="Manage platform users and their roles"
      />
      <Separator />
      <DataTable searchKey="email" columns={columns} data={data} />
    </>
  )
}
