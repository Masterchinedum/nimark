//nimark-admin/app/api/[storeId]/brands/route.ts

import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-helpers";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, props: { params: Promise<{ storeId: string }> }) {
    try {
        const { userId, role, error } = await requireAdmin();
        if (error) return error;
        const body = await req.json();

        const { name, imageUrl } = body; 

        if (!name) {
            return new NextResponse("Name is required", { status: 400});
        }

        if (!imageUrl) {
            return new NextResponse("Value is required", { status: 400});
        }

        const brand = await prismadb.brand.create({
            data : {
                name,
                imageUrl
            }
        })

        return NextResponse.json(brand);

    } catch (err) {
        console.log(`[BRAND_POST] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}

export async function GET(req: Request, props: { params: Promise<{ storeId: string }> }) {
    try {
        const brands = await prismadb.brand.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(brands);

    } catch (err) {
        console.log(`[COLORS_GET] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}