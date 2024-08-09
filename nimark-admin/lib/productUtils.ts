// nimark-admin/lib/productUtils.ts

import prismadb from "./prismadb";

export async function updateProductStock(productId: string, quantitySold: number) {
  const product = await prismadb.product.findUnique({
    where: { id: productId }
  });

  if (product) {
    const newStock = Math.max(product.stock - quantitySold, 0);  // Ensure stock doesn't go negative
    await prismadb.product.update({
      where: { id: productId },
      data: {
        stock: newStock,
        isArchived: newStock <= 0
      }
    });
    return newStock;
  }
  return null;
}