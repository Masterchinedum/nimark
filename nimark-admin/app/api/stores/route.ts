import { NextResponse } from "next/server";
import { requireAuth } from '@/lib/auth-helpers';
import prismadb from "@/lib/prismadb";

export async function POST(
    req: Request,
) {
    try {
        const { userId, error } = await requireAuth();
        if (error) return error;
        
        const body = await req.json();

        const { name } = body; 

        if (!name) {
            return new NextResponse("Name is required", { status: 400});
        }

        const store = await prismadb.store.create({
            data : {
                name,
                userId: userId!,
            }
        });

        return NextResponse.json(store);

    } catch (err) {
        console.log(`[STORES_POST] ${err}`);
        return new NextResponse(`Internal error`, { status: 500})
    }
}