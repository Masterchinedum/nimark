// nimark-admin/app/api/webhooks/route.ts
import { headers } from 'next/headers';
import { NextResponse } from 'next/server';
import paystack from "@/lib/paystack";
import prismadb from "@/lib/prismadb";

export async function POST(req: Request) {
    const body = await req.text();
    const signature = headers().get("X-Paystack-Signature") as string;

    try {
        // Verify the webhook signature
        const isValid = paystack.verifyWebhook(body, signature);

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
                    // You might want to store additional payment details here
                },
                include: {
                    orderItems: true,
                }
            });

            // Update product inventory or perform any other necessary actions
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
        }

        return new NextResponse(null, { status: 200 });
    } catch (error) {
        console.error('Error processing webhook:', error);
        return new NextResponse(`Webhook error: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 400 });
    }
}