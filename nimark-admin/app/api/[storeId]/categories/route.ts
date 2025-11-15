// nimark-admin/app/api/[storeId]/categories/route.ts

import { NextResponse } from "next/server";
import { requireAdmin, assertStoreAccess } from "@/lib/auth-helpers";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, props: { params: Promise<{ storeId: string }> }) {
    const params = await props.params;
    try {
        const { userId, role, error } = await requireAdmin();
        if (error) return error;
        const body = await req.json();

        const { name, billboardId, parentId, properties } = body; 

        

        if (!name) {
            return new NextResponse("Name is required", { status: 400});
        }

        if (!billboardId) {
            return new NextResponse("Billboard id is required", { status: 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 400});
        }

        const { hasAccess, error: accessError } = await assertStoreAccess(userId!, params.storeId, role!);
        if (accessError) return accessError;

        const category = await prismadb.category.create({
            data : {
                name,
                billboardId,
                storeId: params.storeId,
                parentId: parentId || null,
                properties: properties || null
            }
        })

        return NextResponse.json(category);

    } catch (err) {
        console.log(`[CATEGORIES_POST] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}

export async function GET(req: Request, props: { params: Promise<{ storeId: string }> }) {
    const params = await props.params;
    try {
        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 400});
        }

        const categories = await prismadb.category.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(categories);

    } catch (err) {
        console.log(`[CATEGORIES_GET] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}