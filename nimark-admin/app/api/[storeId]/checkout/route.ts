import { flutterwave, flutterwaveEncKey } from "@/lib/flutterwave";
import prismadb from "@/lib/prismadb";
import { NextResponse } from "next/server";
import Cors from 'cors';

// Initialize the cors middleware
const cors = Cors({
  methods: ['GET', 'HEAD', 'POST', 'OPTIONS'],
  origin: '*', // Be more specific in production
  credentials: true,
});

// Helper method to wait for a middleware to execute before continuing
function runMiddleware(req: Request, res: NextResponse, fn: Function) {
  return new Promise((resolve, reject) => {
    fn(req, res, (result: any) => {
      if (result instanceof Error) {
        return reject(result);
      }
      return resolve(result);
    });
  });
}

export async function OPTIONS(req: Request) {
  const res = new NextResponse();
  await runMiddleware(req, res, cors);
  return res;
}

export async function POST(req: Request, { params }: { params: { storeId: string } }) {
  const res = new NextResponse();
  await runMiddleware(req, res, cors);

  console.log("Flutterwave Enc Key:", flutterwaveEncKey);

  const { productIds, customerEmail } = await req.json();

  if (!productIds || productIds.length === 0) {
    return new NextResponse("Product ids are required", { status: 400 });
  }

  if (!customerEmail) {
    return new NextResponse("Customer email is required", { status: 400 });
  }

  const products = await prismadb.product.findMany({
    where: {
      id: {
        in: productIds
      }
    }
  });

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

  const totalAmount = products.reduce((total, product) => total + Number(product.price), 0);

  const payload = {
    tx_ref: order.id,
    amount: totalAmount,
    currency: "NGN",
    redirect_url: `${process.env.FRONTEND_STORE_URL}/cart?success=1`,
    customer: {
      email: customerEmail,
    },
    customizations: {
      title: "Your Store Name",
      logo: "https://your-logo-url.com",
    },
    meta: {
      orderId: order.id
    }
  };

  try {
    console.log("Payload:", { ...payload, enckey: flutterwaveEncKey });
    const response = await flutterwave.Charge.card({
      ...payload,
      enckey: flutterwaveEncKey,
    });
    
    if (response.status === 'success') {
      return NextResponse.json({ url: response.data.link });
    } else {
      throw new Error('Flutterwave charge creation failed');
    }
  } catch (error) {
    console.error('Flutterwave error:', error);
    return new NextResponse(`Error creating payment: ${error instanceof Error ? error.message : 'Unknown error'}`, { status: 500 });
  }
}