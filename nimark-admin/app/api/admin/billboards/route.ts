import { NextResponse } from "next/server";
import { requireAdmin } from "@/lib/auth-helpers";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
    try {
        const { userId, role, error } = await requireAdmin();
        if (error) return error;
        const body = await req.json();

        const { label, imageUrl } = body; 

        if (!label) {
            return new NextResponse("Label is required", { status: 400});
        }

        if (!imageUrl) {
            return new NextResponse("Image Url is required", { status: 400});
        }

        const billboard = await prismadb.billboard.create({
            data : {
                label,
                imageUrl
            }
        })

        return NextResponse.json(billboard);

    } catch (err) {
        console.log(`[ADMIN_BILLBOARDS_POST] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}

export async function GET(req: Request) {
    try {
        const billboards = await prismadb.billboard.findMany({
            orderBy: {
                createdAt: 'desc'
            }
        })

        return NextResponse.json(billboards);

    } catch (err) {
        console.log(`[ADMIN_BILLBOARDS_GET] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}
