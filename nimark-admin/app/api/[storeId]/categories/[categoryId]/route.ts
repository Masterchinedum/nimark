// nimark-admin/app/api/[storeId]/categories/[categoryId]/route.ts

import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { NextResponse } from "next/server"

export async function GET (
    req: Request,
    { params }: { params: { categoryId: string }}
) {
    try {
        if(!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        const category = await prismadb.category.findUnique({
            where: {
                id: params.categoryId,
            },
            include: {
                billboard: true,
                parent: true,
                children: true
            }
        })

        return NextResponse.json(category);
    } catch (err) {
        console.log('[CATEGORY_GET]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function PATCH (
    req: Request,
    { params }: { params: { storeId: string, categoryId: string }}
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const { name, billboardId,  parentId, properties } = body;

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
        }

        if(!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const category = await prismadb.category.update({
            where: {
                id: params.categoryId
            },
            data: {
                name,
                billboardId,
                parentId: parentId || null,
                properties: properties || null
            }
        })

        return NextResponse.json(category);
    } catch (err) {
        console.log('[CATEGORY_PATCH]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function DELETE (
    req: Request,
    { params }: { params: { storeId: string, categoryId: string }}
) {
    try {
        const { userId } = auth();

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if(!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        // First, update children categories to remove the parent reference
        await prismadb.category.updateMany({
            where: {
                parentId: params.categoryId
            },
            data: {
                parentId: null
            }
        })

        // Then delete the category
        const category = await prismadb.category.delete({
            where: {
                id: params.categoryId,
            }
        })

        return NextResponse.json(category);
    } catch (err) {
        console.log('[CATEGORY_DELETE]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}