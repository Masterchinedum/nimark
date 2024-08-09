import prismadb from "./prismadb";

export async function updateProductStock(productId: string, quantitySold: number) {
  const product = await prismadb.product.findUnique({
    where: { id: productId }
  });

  if (product) {
    const newStock = product.stock - quantitySold;
    await prismadb.product.update({
      where: { id: productId },
      data: {
        stock: newStock,
        isArchived: newStock <= 0
      }
    });
  }
}