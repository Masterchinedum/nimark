import prismadb from "@/lib/prismadb";
import { requireAuth } from "@/lib/auth-helpers";
import { NextResponse } from "next/server"

export async function PATCH(req: Request, props: { params: Promise<{ storeId: string }>}) {
    const params = await props.params;
    try {
        const { userId, error } = await requireAuth();
        if (error) return error;
        
        const body = await req.json();

        const { name } = body;

        if (!name) {
            return new NextResponse("Name is required", { status: 400 });
        }

        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await prismadb.store.updateMany({
            where: {
                id: params.storeId,
                userId: userId!
            },
            data: {
                name
            }
        });

        return NextResponse.json(store);
    } catch (err) {
        console.log('[STORE_PATCH]', err)
        return new NextResponse('Internal error', { status: 500 })
    } finally {

    }
};

//// Delete Method

export async function DELETE(req: Request, props: { params: Promise<{ storeId: string }>}) {
    const params = await props.params;
    try {
        const { userId, error } = await requireAuth();
        if (error) return error;

        if(!params.storeId) {
            return new NextResponse("Store id is required", { status: 400 });
        }

        const store = await prismadb.store.deleteMany({
            where: {
                id: params.storeId,
                userId: userId!
            }
        })

        return NextResponse.json(store);
    } catch (err) {
        console.log('[STORE_DELETE]', err)
        return new NextResponse('Internal error', { status: 500 })
    } finally {

    }
}