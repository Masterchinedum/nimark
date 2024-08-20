//nimark-admin/app/(dashboard)/[storeId]/brands/[brandId]/page.tsx

import prismadb from "@/lib/prismadb";
import { BrandForm } from "./components/brand-form";

const BrandPage = async ({ params }: { params: { brandId?: string } }) => {
    if (!params.brandId) {
        return <div>Brand ID not provided</div>;
    }

    const brand = await prismadb.brand.findUnique({ 
        where: {
            id: params.brandId
        }
    });

    if (!brand) {
        return <div>Brand not found</div>;
    }

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <BrandForm initialData={brand} />
            </div>
        </div>
    )
}

export default BrandPage;