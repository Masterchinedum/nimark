import prismadb from "@/lib/prismadb";
import paystack from "@/lib/paystack";
import { NextResponse } from "next/server";

const corsHeaders = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
    "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS() {
    return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
    const { productIds, email } = await req.json();

    if (!productIds || productIds.length === 0) {
        return new NextResponse("Product ids are required", { status: 400 });
    }

    if (!email) {
        return new NextResponse("Customer email is required", { status: 400 });
    }

    const products = await prismadb.product.findMany({
        where: {
            id: {
                in: productIds
            }
        }
    });

    const totalAmount = products.reduce((total, product) => total + Number(product.price), 0) * 100; // Amount in kobo

    const order = await prismadb.order.create({
        data: {
            storeId: params.storeId,
            isPaid: false,
            orderItems: {
                create: productIds.map((productId: string) => ({
                    product: {
                        connect: {
                            id: productId
                        }
                    }
                }))
            }
        }
    });

    try {
        // Convert metadata object to JSON string
        const metadata = JSON.stringify({
            order_id: order.id,
        });

        // Initialize Paystack transaction
        const response = await paystack.initializeTransaction({
            reference: `ORDER_${order.id}`,
            amount: totalAmount,
            email: email,
            callback_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1&reference=ORDER_${order.id}`,
            metadata: metadata, // Pass metadata as string
        });

        if (response.body.status === false) {
            throw new Error(response.body.message);
        }

        return NextResponse.json({ url: response.body.data.authorization_url }, {
            headers: corsHeaders,
        });
    } catch (error) {
        console.error('Paystack error:', error);
        return new NextResponse("Error initializing payment", { status: 500 });
    }
}

export async function GET(req: Request) {
    const { searchParams } = new URL(req.url);
    const reference = searchParams.get('reference');

    if (!reference) {
        return new NextResponse("Reference is required", { status: 400 });
    }

    try {
        const response = await paystack.verifyTransaction({ reference });

        if (response.body.data.status === 'success') {
            // Update order status here
            await prismadb.order.update({
                where: {
                    id: response.body.data.metadata.order_id,
                },
                data: {
                    isPaid: true,
                },
            });

            return NextResponse.json({ status: 'success' }, { headers: corsHeaders });
        } else {
            return NextResponse.json({ status: 'failed' }, { headers: corsHeaders });
        }
    } catch (error) {
        console.error('Payment verification error:', error);
        return new NextResponse("Error verifying payment", { status: 500 });
    }
}