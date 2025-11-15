import prismadb from "@/lib/prismadb";
import { requireAdmin, assertStoreAccess } from "@/lib/auth-helpers";
import { NextResponse } from "next/server"

export async function GET(req: Request, props: { params: Promise<{ colorId: string }>}) {
    const params = await props.params;
    try {
        if(!params.colorId) {
            return new NextResponse("Color id is required", { status: 400 });
        }

        const color = await prismadb.color.findUnique({
            where: {
                id: params.colorId,
            }
        })

        return NextResponse.json(color);
    } catch (err) {
        console.log('[COLOR_GET]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    props: { params: Promise<{ storeId: string, colorId: string }>}
) {
    const params = await props.params;
    try {
        const { userId, role, error } = await requireAdmin();
        if (error) return error;
        const body = await req.json();

        const { name, value } = body;

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!value) {
            return new NextResponse("Value is required", { status: 400 });
        }

        if(!params.colorId) {
            return new NextResponse("Color id is required", { status: 400 });
        }

        const { hasAccess, error: accessError } = await assertStoreAccess(userId!, params.storeId, role!);
        if (accessError) return accessError;

        const color = await prismadb.color.updateMany({
            where: {
                id: params.colorId
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(color);
    } catch (err) {
        console.log('[COLOR_PATCH]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}

//// Delete Method

export async function DELETE(
    req: Request,
    props: { params: Promise<{ storeId: string, colorId: string }>}
) {
    const params = await props.params;
    try {
        const { userId, role, error } = await requireAdmin();
        if (error) return error;

        if(!params.colorId) {
            return new NextResponse("Color id is required", { status: 400 });
        }

        const { hasAccess, error: accessError } = await assertStoreAccess(userId!, params.storeId, role!);
        if (accessError) return accessError;

        const color = await prismadb.color.deleteMany({
            where: {
                id: params.colorId,
            }
        })

        return NextResponse.json(color);
    } catch (err) {
        console.log('[COLOR_DELETE]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}