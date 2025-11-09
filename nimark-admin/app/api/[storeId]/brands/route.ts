//nimark-admin/app/api/[storeId]/brands/route.ts

import { NextResponse } from "next/server";
import { requireAuth } from "@/lib/auth-helpers";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, props: { params: Promise<{ storeId: string }> }) {
    const params = await props.params;
    try {
        const { userId, error } = await requireAuth();
        if (error) return error;
        const body = await req.json();

        const { name, imageUrl } = body; 

        

        if (!name) {
            return new NextResponse("Name is required", { status: 400});
        }

        if (!imageUrl) {
            return new NextResponse("Value is required", { status: 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 400});
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

        const brand = await prismadb.brand.create({
            data : {
                name,
                imageUrl,
                storeId: params.storeId
            }
        })

        return NextResponse.json(brand);

    } catch (err) {
        console.log(`[BRAND_POST] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}

export async function GET(req: Request, props: { params: Promise<{ storeId: string }> }) {
    const params = await props.params;
    try {
        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 400});
        }

        const brands = await prismadb.brand.findMany({
            where: {
                storeId: params.storeId
            }
        })

        return NextResponse.json(brands);

    } catch (err) {
        console.log(`[COLORS_GET] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}