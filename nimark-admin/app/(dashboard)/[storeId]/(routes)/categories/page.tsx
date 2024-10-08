// nimark-admin/app/(dashboard)/[storeId]/(routes)/categories/page.tsx

import { format } from 'date-fns'
import prismadb from '@/lib/prismadb'
import { CategoryClient } from './components/client'
import { CategoryColumn } from './components/columns'

const CategoriesPage = async ({ 
    params
}: { 
    params: { storeId: string }
}) => {

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId,
        },
        include: {
            billboard: true,
            parent: true,
            children: true,
        },
        orderBy: {
            createdAt: 'desc'
        }
    })

    const formattedCategories: CategoryColumn[] = categories.map(item => ({
        id: item.id,
        name: item.name,
        billboardLabel: item.billboard.label,
        createdAt: format(item.createdAt, "MMMM do, yyyy"),
        parentId: item.parentId,
        level: getLevel(item, categories),
        childrenCount: item.children.length
    }));

    function getLevel(category: any, allCategories: any[]): number {
        let level = 0;
        let current = category;
        while (current.parentId) {
            level++;
            current = allCategories.find(c => c.id === current.parentId);
        }
        return level;
    }

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <CategoryClient data={formattedCategories} />
            </div>
        </div>
    )
}

export default CategoriesPage;