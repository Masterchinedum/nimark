// nimark-admin/app/(dashboard)/[storeId]/(routes)/categories/components/client.tsx

"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Plus, ChevronDown, ChevronRight } from "lucide-react"
import { useParams, useRouter } from "next/navigation"
import { CategoryColumn, columns } from "./columns"
import { DataTable } from "@/components/ui/data-table"
import { ApiList } from "@/components/ui/api-list"

interface CategoryClientProps {
    data: CategoryColumn[]
}

export const CategoryClient: React.FC<CategoryClientProps> = ({
    data
}) => {
    const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set());
    const router = useRouter();
    const params = useParams();

    const toggleCategory = (categoryId: string) => {
        setExpandedCategories(prev => {
            const newSet = new Set(prev);
            if (newSet.has(categoryId)) {
                newSet.delete(categoryId);
            } else {
                newSet.add(categoryId);
            }
            return newSet;
        });
    };

    const toggleAllCategories = () => {
        if (expandedCategories.size === 0) {
            setExpandedCategories(new Set(data.map(category => category.id)));
        } else {
            setExpandedCategories(new Set());
        }
    };

    const isExpanded = (categoryId: string) => expandedCategories.has(categoryId);

    const displayData = organizeHierarchy(data, expandedCategories);

    return (
        <>
            <div className="flex flex-col md:flex-row items-center justify-between mb-4 md:mb-8">
                <Heading
                    title={`Categories (${data?.length})`}
                    description="Manage categories for your store"/>
                <div className="flex items-center space-x-2">
                    <Button onClick={toggleAllCategories} variant="outline">
                        {expandedCategories.size === 0 ? <ChevronRight className="w-4 h-4 mr-2" /> : <ChevronDown className="w-4 h-4 mr-2" />}
                        {expandedCategories.size === 0 ? 'Expand' : 'Collapse'} All
                    </Button>
                    <Button onClick={() => router.push(`/${params.storeId}/categories/new`)} className="w-full md:w-auto">
                        <Plus className="w-4 h-4 mr-2" />
                        Add New
                    </Button>
                </div>
            </div>
            <Separator />
            <DataTable 
                columns={columns(toggleCategory, isExpanded)} 
                data={displayData} 
                searchKey="name"
            />
            <Heading title="API" description="API calls for Categories" />
            <Separator />
            <ApiList entityName="categories" entityIdName="categoryId" />
        </>
    )
}

function organizeHierarchy(categories: CategoryColumn[], expandedCategories: Set<string>): CategoryColumn[] {
    const topLevel = categories.filter(c => !c.parentId);
    const childrenMap = categories.reduce((acc, category) => {
        if (category.parentId) {
            if (!acc[category.parentId]) {
                acc[category.parentId] = [];
            }
            acc[category.parentId].push(category);
        }
        return acc;
    }, {} as Record<string, CategoryColumn[]>);

    function addChildren(category: CategoryColumn): CategoryColumn[] {
        const result = [category];
        if (expandedCategories.has(category.id) && childrenMap[category.id]) {
            childrenMap[category.id].forEach(child => {
                result.push(...addChildren(child));
            });
        }
        return result;
    }

    return topLevel.flatMap(addChildren);
}