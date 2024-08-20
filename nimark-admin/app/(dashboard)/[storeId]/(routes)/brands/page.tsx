//nimark-admin/app/(dashboard)/[storeId]/brands/page.tsx

import { format } from 'date-fns';
import prismadb from '@/lib/prismadb'
import { BrandClient } from './components/client'
import { BrandColumn } from './components/columns'

const BrandsPage = async ({ 
    params
}: { 
    params: { storeId: string }
}) => {
    const brands = await prismadb.brand.findMany({
        where: {
            storeId: params.storeId,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedBrands: BrandColumn[] = brands.map(item => ({
        id: item.id,
        name: item.name,
        imageUrl: item.imageUrl,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
    }));

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <BrandClient data={formattedBrands} />
            </div>
        </div>
    )
}

export default BrandsPage;