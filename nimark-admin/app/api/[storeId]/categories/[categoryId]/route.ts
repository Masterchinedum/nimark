// nimark-admin/app/api/[storeId]/categories/[categoryId]/route.ts

import prismadb from "@/lib/prismadb";
import { requireAdmin, assertStoreAccess } from "@/lib/auth-helpers";
import { NextResponse } from "next/server"

export async function GET(req: Request, props: { params: Promise<{ categoryId: string }>}) {
    const params = await props.params;
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

export async function PATCH(
    req: Request,
    props: { params: Promise<{ storeId: string, categoryId: string }>}
) {
    const params = await props.params;
    try {
        const { userId, role, error } = await requireAdmin();
        if (error) return error;
        const body = await req.json();

        const { name, billboardId,  parentId, properties } = body;

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!billboardId) {
            return new NextResponse("Billboard id is required", { status: 400 });
        }

        if(!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        const { hasAccess, error: accessError } = await assertStoreAccess(userId!, params.storeId, role!);
        if (accessError) return accessError;

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

export async function DELETE(
    req: Request,
    props: { params: Promise<{ storeId: string, categoryId: string }>}
) {
    const params = await props.params;
    try {
        const { userId, role, error } = await requireAdmin();
        if (error) return error;

        if(!params.categoryId) {
            return new NextResponse("Category id is required", { status: 400 });
        }

        const { hasAccess, error: accessError } = await assertStoreAccess(userId!, params.storeId, role!);
        if (accessError) return accessError;

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