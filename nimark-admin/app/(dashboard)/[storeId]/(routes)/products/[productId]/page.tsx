//nimark-admin/app/(dashboard)/[storeId]/(routes)/products/[productId]/page.tsx

import { Suspense } from 'react';
import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/ProductForm";
import LoadingSpinner from "@/components/ui/loading-spinner";

const ProductPage = async (props: { params: Promise<{ productId: string, storeId: string }> }) => {
    const params = await props.params;
    const product = await prismadb.product.findUnique({ 
        where: {
            id: params.productId
        },
        include: {
            images: true
        }
    });

    const categories = await prismadb.category.findMany({
        where: {
            storeId: params.storeId
        },
    });

    const sizes = await prismadb.size.findMany({
        where: {
            storeId: params.storeId
        },
    });

    const colors = await prismadb.color.findMany({
        where: {
            storeId: params.storeId
        },
    });

    const brands = await prismadb.brand.findMany({
        where: {
            storeId: params.storeId
        }
    });

    // Convert Decimal and JSON types for Client Component compatibility
    const serializedProduct = product ? {
        ...product,
        price: product.price.toNumber(),
        properties: product.properties as Record<string, string | string[]> | null
    } : null;

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <Suspense fallback={<LoadingSpinner />}>
                    <ProductForm
                        initialData={serializedProduct}
                        colors={colors}
                        sizes={sizes}
                        categories={categories}
                        brands={brands}
                    />
                </Suspense>
            </div>
        </div>
    );
};

export default ProductPage;