//nimark-admin/app/(dashboard)/[storeId]/brands/components/client.tsx

"use client"

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useParams, useRouter } from "next/navigation";
import { BrandColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";
import { ApiList } from "@/components/ui/api-list";

interface BrandClientProps {
    data: BrandColumn[]
}

export const BrandClient: React.FC<BrandClientProps> = ({
    data
}) => {
    const router = useRouter();
    const params = useParams();
    return (
        <>
            <div className="flex items-center justify-between">
                <Heading
                    title={`Brands (${data?.length})`}
                    description="Manage brands for your store"/>
                <Button onClick={() => router.push(`/${params.storeId}/brands/new`)}>
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="name" />
            <Heading title="API" description="API calls for Brands" />
            <Separator />
            <ApiList entityName="brands" entityIdName="brandId" />
        </>
    )
}