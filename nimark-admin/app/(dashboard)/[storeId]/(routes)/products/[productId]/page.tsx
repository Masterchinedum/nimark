//nimark-admin/app/(dashboard)/[storeId]/(routes)/products/[productId]/page.tsx

import prismadb from "@/lib/prismadb";
import { ProductForm } from "./components/product-form";

const ProductPage = async ({ params }: { params: { productId: string, storeId: string } }) => {
    const product = await prismadb.product.findUnique({ 
        where: {
            id: params.productId
        },
        include: {
            images: true,
            relatedTo: true
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

    const products = await prismadb.product.findMany({
        where: {
            storeId: params.storeId
        },
        include: {
            images: true,
            category: true,
            size: true,
            color: true
        }
    });

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <ProductForm
                    initialData={product}
                    colors={colors}
                    sizes={sizes}
                    categories={categories}
                    products={products}
                />
            </div>
        </div>
    );
};

export default ProductPage;