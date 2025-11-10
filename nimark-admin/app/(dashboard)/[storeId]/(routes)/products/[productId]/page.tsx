import { notFound } from 'next/navigation'
import prismadb from '@/lib/prismadb'
import { ProductForm } from './components/product-form'

interface ProductPageProps {
  params: Promise<{
    storeId: string
    productId: string
  }>
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { storeId, productId } = await params
  
  // Fetch product if editing
  const product = productId !== 'new' 
    ? await prismadb.product.findUnique({
        where: { id: productId, storeId },
        include: {
          images: {
            orderBy: { createdAt: 'asc' }
          },
          relatedTo: {
            select: { id: true, name: true }
          }
        }
      })
    : null

  if (productId !== 'new' && !product) {
    notFound()
  }

  // Fetch categories for the store
  const categories = await prismadb.category.findMany({
    where: { storeId },
    orderBy: { name: 'asc' }
  })

  // Fetch sizes for the store
  const sizes = await prismadb.size.findMany({
    where: { storeId },
    orderBy: { name: 'asc' }
  })

  // Fetch colors for the store
  const colors = await prismadb.color.findMany({
    where: { storeId },
    orderBy: { name: 'asc' }
  })

  // Fetch brands for the store
  const brands = await prismadb.brand.findMany({
    where: { storeId },
    orderBy: { name: 'asc' }
  })

  // Serialize product data for client component
  const serializedProduct = product ? {
    id: product.id,
    name: product.name,
    description: product.description,
    price: product.price.toNumber(),
    stock: product.stock,
    categoryId: product.categoryId,
    sizeId: product.sizeId,
    colorId: product.colorId,
    brandId: product.brandId || '',
    isFeatured: product.isFeatured,
    isArchived: product.isArchived,
    properties: product.properties as Record<string, string | string[]> | null,
    images: product.images.map(img => ({ id: img.id, url: img.url })),
    relatedProductIds: product.relatedTo?.map(p => p.id) || [],
  } : null

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <ProductForm
          initialData={serializedProduct}
          categories={categories}
          sizes={sizes}
          colors={colors}
          brands={brands}
          storeId={storeId}
        />
      </div>
    </div>
  )
}
