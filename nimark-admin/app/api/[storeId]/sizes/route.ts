import { NextResponse } from "next/server";
import { requireAdmin, assertStoreAccess } from "@/lib/auth-helpers";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, props: { params: Promise<{ storeId: string }> }) {
    const params = await props.params;
    try {
        const { userId, role, error } = await requireAdmin();
        if (error) return error;
        const body = await req.json();

        const { name, value } = body; 

        

        if (!name) {
            return new NextResponse("Name is required", { status: 400});
        }

        if (!value) {
            return new NextResponse("Value is required", { status: 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 400});
        }

        const { hasAccess, error: accessError } = await assertStoreAccess(userId!, params.storeId, role!);
        if (accessError) return accessError;

        const size = await prismadb.size.create({
            data : {
                name,
                value,
                storeId: params.storeId
            }
        })

        return NextResponse.json(size);

    } catch (err) {
        console.log(`[SIZES_POST] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}

export async function GET(req: Request, props: { params: Promise<{ storeId: string }> }) {
    const params = await props.params;
    try {
        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 400});
        }

        const sizes = await prismadb.size.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(sizes);

    } catch (err) {
        console.log(`[SIZES_GET] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}