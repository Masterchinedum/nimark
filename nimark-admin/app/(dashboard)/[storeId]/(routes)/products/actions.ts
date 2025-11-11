'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'
import { z } from 'zod'
import prismadb from '@/lib/prismadb'
import { auth } from '@/auth'

// Validation schema
const productSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.coerce.number().min(0.01, 'Price must be at least 0.01'),
  stock: z.coerce.number().int().min(0, 'Stock must be at least 0'),
  categoryId: z.string().min(1, 'Category is required'),
  sizeId: z.string().min(1, 'Size is required'),
  colorId: z.string().min(1, 'Color is required'),
  brandId: z.string().min(1, 'Brand is required'),
  isFeatured: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  properties: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
  images: z.array(z.object({
    url: z.string().url()
  })).min(1, 'At least one image is required'),
  relatedProductIds: z.array(z.string()).optional()
})

type ProductFormData = z.infer<typeof productSchema>

export type ActionState = {
  success: boolean
  message: string
  errors?: Record<string, string[]>
}

async function verifyStoreAccess(storeId: string, userId: string) {
  const store = await prismadb.store.findFirst({
    where: {
      id: storeId,
      userId
    }
  })
  
  if (!store) {
    throw new Error('Unauthorized access to store')
  }
  
  return store
}

export async function createProduct(
  storeId: string,
  formData: FormData
): Promise<ActionState> {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { success: false, message: 'Unauthorized' }
    }

    await verifyStoreAccess(storeId, session.user.id)

    // Parse form data
    const rawData = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      stock: formData.get('stock'),
      categoryId: formData.get('categoryId'),
      sizeId: formData.get('sizeId'),
      colorId: formData.get('colorId'),
      brandId: formData.get('brandId'),
      isFeatured: formData.get('isFeatured') === 'true',
      isArchived: formData.get('isArchived') === 'true',
      properties: formData.get('properties') ? JSON.parse(formData.get('properties') as string) : {},
      images: JSON.parse(formData.get('images') as string || '[]'),
      relatedProductIds: formData.get('relatedProductIds') ? JSON.parse(formData.get('relatedProductIds') as string) : []
    }

    // Validate data
    const validatedData = productSchema.parse(rawData)

    // Create product
    const product = await prismadb.product.create({
      data: {
        storeId,
        name: validatedData.name,
        description: validatedData.description || null,
        price: validatedData.price,
        stock: validatedData.stock,
        categoryId: validatedData.categoryId,
        sizeId: validatedData.sizeId,
        colorId: validatedData.colorId,
        brandId: validatedData.brandId,
        isFeatured: validatedData.isFeatured,
        isArchived: validatedData.isArchived,
        properties: validatedData.properties || {},
        images: {
          create: validatedData.images
        }
      }
    })

    // Handle related products if provided
    if (validatedData.relatedProductIds && validatedData.relatedProductIds.length > 0) {
      await prismadb.product.update({
        where: { id: product.id },
        data: {
          relatedTo: {
            connect: validatedData.relatedProductIds.map(id => ({ id }))
          }
        }
      })
    }

    revalidatePath(`/${storeId}/products`)
    redirect(`/${storeId}/products`)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation failed',
        errors: error.flatten().fieldErrors as Record<string, string[]>
      }
    }

    console.error('Create product error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to create product'
    }
  }
}

export async function updateProduct(
  storeId: string,
  productId: string,
  formData: FormData
): Promise<ActionState> {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { success: false, message: 'Unauthorized' }
    }

    await verifyStoreAccess(storeId, session.user.id)

    // Verify product belongs to store
    const existingProduct = await prismadb.product.findFirst({
      where: {
        id: productId,
        storeId
      }
    })

    if (!existingProduct) {
      return { success: false, message: 'Product not found' }
    }

    // Parse form data
    const rawData = {
      name: formData.get('name'),
      description: formData.get('description'),
      price: formData.get('price'),
      stock: formData.get('stock'),
      categoryId: formData.get('categoryId'),
      sizeId: formData.get('sizeId'),
      colorId: formData.get('colorId'),
      brandId: formData.get('brandId'),
      isFeatured: formData.get('isFeatured') === 'true',
      isArchived: formData.get('isArchived') === 'true',
      properties: formData.get('properties') ? JSON.parse(formData.get('properties') as string) : {},
      images: JSON.parse(formData.get('images') as string || '[]'),
      relatedProductIds: formData.get('relatedProductIds') ? JSON.parse(formData.get('relatedProductIds') as string) : []
    }

    // Validate data
    const validatedData = productSchema.parse(rawData)

    // Delete existing images
    await prismadb.image.deleteMany({
      where: {
        productId
      }
    })

    // Update product
    await prismadb.product.update({
      where: { id: productId },
      data: {
        name: validatedData.name,
        description: validatedData.description || null,
        price: validatedData.price,
        stock: validatedData.stock,
        categoryId: validatedData.categoryId,
        sizeId: validatedData.sizeId,
        colorId: validatedData.colorId,
        brandId: validatedData.brandId,
        isFeatured: validatedData.isFeatured,
        isArchived: validatedData.isArchived,
        properties: validatedData.properties || {},
        images: {
          create: validatedData.images
        },
        relatedTo: {
          set: [],
          connect: validatedData.relatedProductIds?.map(id => ({ id })) || []
        }
      }
    })

    revalidatePath(`/${storeId}/products`)
    revalidatePath(`/${storeId}/products/${productId}`)
    redirect(`/${storeId}/products`)
  } catch (error) {
    if (error instanceof z.ZodError) {
      return {
        success: false,
        message: 'Validation failed',
        errors: error.flatten().fieldErrors as Record<string, string[]>
      }
    }

    // Don't log NEXT_REDIRECT errors - they're intentional
    if (error && typeof error === 'object' && 'digest' in error && 
        typeof error.digest === 'string' && error.digest.includes('NEXT_REDIRECT')) {
      throw error
    }

    console.error('Update product error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to update product'
    }
  }
}

export async function deleteProduct(
  storeId: string,
  productId: string
): Promise<ActionState> {
  try {
    const session = await auth()
    
    if (!session?.user?.id) {
      return { success: false, message: 'Unauthorized' }
    }

    await verifyStoreAccess(storeId, session.user.id)

    // Verify product belongs to store
    const existingProduct = await prismadb.product.findFirst({
      where: {
        id: productId,
        storeId
      }
    })

    if (!existingProduct) {
      return { success: false, message: 'Product not found' }
    }

    // Delete product (images will be cascade deleted)
    await prismadb.product.delete({
      where: { id: productId }
    })

    revalidatePath(`/${storeId}/products`)
    redirect(`/${storeId}/products`)
  } catch (error) {
    console.error('Delete product error:', error)
    return {
      success: false,
      message: error instanceof Error ? error.message : 'Failed to delete product'
    }
  }
}
