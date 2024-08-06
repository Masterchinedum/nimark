import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import crypto from 'crypto';
import prismadb from "@/lib/prismadb";

const secret = process.env.PAYSTACK_SECRET_KEY!;

function verifyWebhook(requestBody: string, signature: string): boolean {
    const hash = crypto.createHmac('sha512', secret).update(requestBody).digest('hex');
    return hash === signature;
}

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("X-Paystack-Signature") as string;

    try {
        // Verify the webhook signature
        const isValid = verifyWebhook(body, signature);

        if (!isValid) {
            return new NextResponse(`Invalid Paystack signature`, { status: 400 });
        }

        const event = JSON.parse(body);

        if (event.event === 'charge.success') {
            const data = event.data;
            const orderId = data.metadata.order_id;

            // Update the order in your database
            const order = await prismadb.order.update({
                where: {
                    id: orderId,
                },
                data: {
                    isPaid: true,
                },
                include: {
                    orderItems: true,
                }
            });

            // Archive products
            const productIds = order.orderItems.map(orderItem => orderItem.productId);
            await prismadb.product.updateMany({
                where: {
                    id: {
                        in: [...productIds]
                    },
                },
                data: {
                    isArchived: true,
                }
            });

            console.log(`Order ${orderId} has been marked as paid and products have been archived.`);
        }

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return new NextResponse(`Webhook error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 400 });
    }
}