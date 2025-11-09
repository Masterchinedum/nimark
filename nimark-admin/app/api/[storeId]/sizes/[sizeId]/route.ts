import prismadb from "@/lib/prismadb";
import { requireAuth } from "@/lib/auth-helpers";
import { NextResponse } from "next/server"

export async function GET(req: Request, props: { params: Promise<{ sizeId: string }>}) {
    const params = await props.params;
    try {
        if(!params.sizeId) {
            return new NextResponse("Size id is required", { status: 400 });
        }

        const size = await prismadb.size.findUnique({
            where: {
                id: params.sizeId,
            }
        })

        return NextResponse.json(size);
    } catch (err) {
        console.log('[SIZE_GET]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}

export async function PATCH(
    req: Request,
    props: { params: Promise<{ storeId: string, sizeId: string }>}
) {
    const params = await props.params;
    try {
        const { userId, error } = await requireAuth();
        if (error) return error;
        const body = await req.json();

        const { name, value } = body;

        if (!userId!) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if (!value) {
            return new NextResponse("Value is required", { status: 400 });
        }

        if(!params.sizeId) {
            return new NextResponse("Size id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: userId!
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const size = await prismadb.size.updateMany({
            where: {
                id: params.sizeId
            },
            data: {
                name,
                value
            }
        })

        return NextResponse.json(size);
    } catch (err) {
        console.log('[SIZE_PATCH]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}

//// Delete Method

export async function DELETE(
    req: Request,
    props: { params: Promise<{ storeId: string, sizeId: string }>}
) {
    const params = await props.params;
    try {
        const { userId, error } = await requireAuth();
        if (error) return error;

        if (!userId!) {
            return new NextResponse("Unauthenticated", { status: 401 })
        }

        if(!params.sizeId) {
            return new NextResponse("Size id is required", { status: 400 });
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId: userId!
            }
        })

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const size = await prismadb.size.deleteMany({
            where: {
                id: params.sizeId,
            }
        })

        return NextResponse.json(size);
    } catch (err) {
        console.log('[SIZE_DELETE]', err)
        return new NextResponse('Internal error', { status: 500 })
    }
}