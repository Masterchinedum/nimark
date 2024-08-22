//nimark-admin/app/(dashboard)/[storeId]/(routes)/products/components/client.tsx
"use client"

import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
// import { Billboard } from "@prisma/client"
import { Plus } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { ProductColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface ProductClientProps {
    data: ProductColumn[]
}

export const ProductClient: React.FC<ProductClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    return (
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                <Heading
                    title={`Products (${data?.length})`}
                    description="Manage products for your store"
                />
                <Button onClick={() => router.push(`/${params.storeId}/products/new`)} className="w-full sm:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <div className="overflow-x-auto">
                <DataTable columns={columns} data={data} searchKey="name" />
            </div>
            <Heading title="API" description="API calls for Products"  />
            <Separator />
            <ApiList entityName="products" entityIdName="productId" />
        </div>
    )
}