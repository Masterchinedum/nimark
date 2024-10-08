//nimark-admin/app/api/[storeId]/products/route.ts

import { NextResponse } from "next/server";
import { auth } from "@clerk/nextjs/server";
import prismadb from "@/lib/prismadb";
import { getOrCreateDefaultBrand } from "@/lib/utils/brand";


export async function POST(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { userId } = auth();
        const body = await req.json();

        const {
            name,
            price,
            categoryId,
            colorId,
            sizeId,
            images,
            isFeatured,
            isArchived,
            stock, 
            description,
            brandId,
            properties,
            relatedProductIds,
        } = body; 

        if (!userId) {
            return new NextResponse("Unauthenticated", { status: 401 });
        }

        if (!name) {
            return new NextResponse("Name is required", { status: 400});
        }

        if (!price) {
            return new NextResponse("Price is required", { status: 400});
        }

        if (!categoryId) {
            return new NextResponse("Category id is required", { status: 400});
        }

        if (!colorId) {
            return new NextResponse("Color id is required", { status: 400});
        }

        if (!sizeId) {
            return new NextResponse("Size id is required", { status: 400});
        }

        if (stock === undefined) {
            return new NextResponse("Stock is required", { status: 400});
        }

        if (stock < 0) {
            return new NextResponse("Stock cannot be negative", { status: 400 });
          }

        if (!images || !images.length) {
            return new NextResponse("Image is required", { status: 400});
        }

        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 400});
        }

        let finalBrandId = brandId;
        if (!brandId) {
        const defaultBrand = await getOrCreateDefaultBrand(params.storeId);
        finalBrandId = defaultBrand.id;
        }

        const storeByUserId = await prismadb.store.findFirst({
            where: {
                id: params.storeId,
                userId
            }
        });

        if (!storeByUserId) {
            return new NextResponse("Unauthorized", { status: 403 });
        }

        const product = await prismadb.product.create({
            data: {
              name,
              price,
              isFeatured,
              isArchived: stock === 0 ? true : isArchived,
              categoryId,
              sizeId,
              colorId,
              stock,
              description,
              brandId: finalBrandId,
              storeId: params.storeId,
              properties: properties ? JSON.parse(JSON.stringify(properties)) : null,
              images: {
                createMany: {
                  data: images.map((image: { url: string }) => ({ url: image.url }))
                }
              },
              relatedTo: {
                connect: relatedProductIds ? relatedProductIds.map((id: string) => ({ id })) : []
              }
            }
          });
      
          return NextResponse.json(product);
        } catch (err) {
          console.log(`[PRODUCTS_POST] ${err}`);
          return new NextResponse(`Internal error`, { status: 500 });
        }
      }

export async function GET(
    req: Request,
    { params }: { params: { storeId: string } }
) {
    try {
        const { searchParams } = new URL(req.url);
        const categoryId = searchParams.get('categoryId') || undefined;
        const sizeId = searchParams.get('sizeId') || undefined;
        const brandId = searchParams.get('brandId') || undefined;
        const colorId = searchParams.get('colorId') || undefined;
        const isFeatured = searchParams.get('isFeatured');
        const isLowStock = searchParams.get('isLowStock'); 

        if (!params.storeId) {
            return new NextResponse("Store Id is required", { status: 400});
        }

        const products = await prismadb.product.findMany({
            where: {
                storeId: params.storeId,
                categoryId,
                colorId,
                brandId,
                sizeId,
                isFeatured: isFeatured ? true : undefined,
                isArchived: false,
                stock: isLowStock === 'true' ? { lte: 5 } : undefined 
            },
            include: {
                images: true,
                category: true,
                color: true,
                size: true,
                brand: true,
            },
            orderBy: {
                createdAt: 'desc'
            }
        });

        return NextResponse.json(products);

    } catch (err) {
        console.log(`[PRODUCTS_GET] ${err}`);
        return new NextResponse(`Internal error`, { status: 500});
    }
}