//nimark-admin/app/(dashboard)/admin/catalog/billboards/components/client.tsx

"use client"

import { Button } from "@/components/ui/button";
import { Heading } from "@/components/ui/heading";
import { Separator } from "@/components/ui/separator";
import { Plus } from "lucide-react";
import { useRouter } from "next/navigation";
import { BillboardColumn, columns } from "./columns";
import { DataTable } from "@/components/ui/data-table";

interface BillboardClientProps {
    data: BillboardColumn[]
}

export const BillboardClient: React.FC<BillboardClientProps> = ({
    data
}) => {
    const router = useRouter();
    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-8">
                <Heading
                    title={`Billboards (${data?.length})`}
                    description="Manage global billboards used across all stores"/>
                <Button onClick={() => router.push(`/admin/catalog/billboards/new`)} className="w-full md:w-auto">
                    <Plus className="w-4 h-4 mr-2" />
                    Add New
                </Button>
            </div>
            <Separator />
            <DataTable columns={columns} data={data} searchKey="label" />
        </>
    )
}