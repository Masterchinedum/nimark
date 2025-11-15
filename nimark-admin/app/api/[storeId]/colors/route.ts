import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-helpers";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request, props: { params: Promise<{ storeId: string }> }) {
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

        const color = await prismadb.color.create({
            data : {
                name,
                value
            }
        })

        return NextResponse.json(color);

    } catch (err) {
        console.log(`[COLORS_POST] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}

export async function GET(req: Request, props: { params: Promise<{ storeId: string }> }) {
    try {
        const colors = await prismadb.color.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(colors);

    } catch (err) {
        console.log(`[COLORS_GET] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}