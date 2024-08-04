import prismadb from "@/lib/prismadb";

export const getoutofStockCount = async (storeId: string) => {
    const outStock = await prismadb.product.count({
        where: {
            storeId,
            isArchived: true,
        }
    });

    return outStock;
}