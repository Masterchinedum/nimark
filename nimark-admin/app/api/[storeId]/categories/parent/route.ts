// nimark-admin/app/api/[storeId]/categories/parent/route.ts

import { NextResponse } from "next/server";
import prismadb from "@/lib/prismadb";

export async function GET(req: Request, props: { params: Promise<{ storeId: string }> }) {
    const params = await props.params;
    try {
        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 400});
        }

        // Only fetch parent categories (parentId is null)
        const parentCategories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId,
                parentId: null
            },
            orderBy: {
                name: 'asc'
            },
            select: {
                id: true,
                name: true,
                billboardId: true,
                storeId: true,
                createdAt: true,
                updatedAt: true
            }
        });

        return NextResponse.json(parentCategories);

    } catch (err) {
        console.log(`[PARENT_CATEGORIES_GET] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}
