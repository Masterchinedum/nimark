'use client'

import { useState, useTransition } from 'react'
import { useRouter } from 'next/navigation'
import { toast } from 'react-hot-toast'
import { Trash, Loader2, ImagePlus, X } from 'lucide-react'
import { CldUploadWidget } from 'next-cloudinary'
import Image from 'next/image'
import { Category, Size, Color, Brand } from '@prisma/client'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { Separator } from '@/components/ui/separator'
import { Heading } from '@/components/ui/heading'
import { AlertModal } from '@/components/modals/alert-modal'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { ColorSwatch } from './ColorSwatch'

import { createProduct, updateProduct, deleteProduct } from '../../actions'
import { useForm, SubmitHandler } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'

interface ProductFormProps {
  initialData: {
    id: string
    name: string
    description: string | null
    price: number
    stock: number
    categoryId: string
    sizeId: string
    colorId: string
    brandId: string
    isFeatured: boolean
    isArchived: boolean
    properties: Record<string, string | string[]> | null
    images: { id: string; url: string }[]
    relatedProductIds: string[]
  } | null
  categories: Category[]
  sizes: Size[]
  colors: Color[]
  brands: Brand[]
  storeId: string
}

const formSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  description: z.string().optional(),
  price: z.number().min(0.01, 'Price must be at least 0.01'),
  stock: z.number().int().min(0, 'Stock must be at least 0'),
  categoryId: z.string().min(1, 'Category is required'),
  sizeId: z.string().min(1, 'Size is required'),
  colorId: z.string().min(1, 'Color is required'),
  brandId: z.string().min(1, 'Brand is required'),
  isFeatured: z.boolean().default(false),
  isArchived: z.boolean().default(false),
  images: z.array(z.object({ url: z.string() })).min(1, 'At least one image is required'),
})

type ProductFormValues = z.infer<typeof formSchema>

export function ProductForm({
  initialData,
  categories,
  sizes,
  colors,
  brands,
  storeId,
}: ProductFormProps) {
  const router = useRouter()
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [images, setImages] = useState<{ url: string }[]>(
    initialData?.images.map(img => ({ url: img.url })) || []
  )

  const title = initialData ? 'Edit product' : 'Create product'
  const description = initialData ? 'Edit product details' : 'Add a new product'
  const toastMessage = initialData ? 'Product updated' : 'Product created'
  const action = initialData ? 'Save changes' : 'Create product'

  const form = useForm<ProductFormValues>({
    resolver: zodResolver(formSchema) as any,
    defaultValues: initialData
      ? {
          name: initialData.name,
          description: initialData.description || '',
          price: initialData.price,
          stock: initialData.stock,
          categoryId: initialData.categoryId,
          sizeId: initialData.sizeId,
          colorId: initialData.colorId,
          brandId: initialData.brandId,
          isFeatured: initialData.isFeatured,
          isArchived: initialData.isArchived,
          images: initialData.images.map(img => ({ url: img.url })),
        }
      : {
          name: '',
          description: '',
          price: 0,
          stock: 0,
          categoryId: '',
          sizeId: '',
          colorId: '',
          brandId: '',
          isFeatured: false,
          isArchived: false,
          images: [],
        },
  })

  const onSubmit: SubmitHandler<ProductFormValues> = async (data) => {
    startTransition(async () => {
      const formData = new FormData()
      
      Object.entries(data).forEach(([key, value]) => {
        if (key === 'images') {
          formData.append(key, JSON.stringify(value))
        } else if (typeof value === 'boolean') {
          formData.append(key, String(value))
        } else {
          formData.append(key, String(value))
        }
      })

      const result = initialData
        ? await updateProduct(storeId, initialData.id, formData)
        : await createProduct(storeId, formData)

      if (result?.success === false) {
        toast.error(result.message)
        if (result.errors) {
          Object.entries(result.errors).forEach(([field, messages]) => {
            const messageArray = Array.isArray(messages) ? messages : [String(messages)]
            form.setError(field as any, { message: messageArray.join(', ') })
          })
        }
      } else {
        toast.success(toastMessage)
        router.refresh()
      }
    })
  }

  const onDelete = async () => {
    if (!initialData) return

    startTransition(async () => {
      const result = await deleteProduct(storeId, initialData.id)
      
      if (result?.success === false) {
        toast.error(result.message)
        setOpen(false)
      } else {
        toast.success('Product deleted')
        router.refresh()
      }
    })
  }

  const onUpload = (result: any) => {
    const newImages = [...images, { url: result?.info?.secure_url }]
    setImages(newImages)
    form.setValue('images', newImages)
  }

  const onRemoveImage = (url: string) => {
    const newImages = images.filter(img => img.url !== url)
    setImages(newImages)
    form.setValue('images', newImages)
  }

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={isPending}
      />
      
      <div className="flex items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            disabled={isPending}
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
          >
            <Trash className="h-4 w-4" />
          </Button>
        )}
      </div>
      
      <Separator />

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          <Tabs defaultValue="basic" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="basic">Basic Info</TabsTrigger>
              <TabsTrigger value="images">Images</TabsTrigger>
              <TabsTrigger value="settings">Settings</TabsTrigger>
            </TabsList>

            <TabsContent value="basic" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Details</CardTitle>
                  <CardDescription>
                    Enter the basic information about your product
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="name"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Name</FormLabel>
                        <FormControl>
                          <Input
                            disabled={isPending}
                            placeholder="Product name"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea
                            disabled={isPending}
                            placeholder="Product description"
                            className="resize-none"
                            rows={4}
                            {...field}
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="price"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Price</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              step="0.01"
                              disabled={isPending}
                              placeholder="9.99"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="stock"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Stock</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              disabled={isPending}
                              placeholder="100"
                              {...field}
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Product Attributes</CardTitle>
                  <CardDescription>
                    Select category, size, color and brand
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <FormField
                      control={form.control}
                      name="categoryId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Category</FormLabel>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a category" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {categories.map((category) => (
                                <SelectItem key={category.id} value={category.id}>
                                  {category.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="brandId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Brand</FormLabel>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a brand" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {brands.map((brand) => (
                                <SelectItem key={brand.id} value={brand.id}>
                                  {brand.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="sizeId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Size</FormLabel>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a size" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {sizes.map((size) => (
                                <SelectItem key={size.id} value={size.id}>
                                  {size.name}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    <FormField
                      control={form.control}
                      name="colorId"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Color</FormLabel>
                          <Select
                            disabled={isPending}
                            onValueChange={field.onChange}
                            value={field.value}
                            defaultValue={field.value}
                          >
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select a color" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {colors.map((color) => (
                                <SelectItem key={color.id} value={color.id}>
                                  <div className="flex items-center gap-2">
                                    <ColorSwatch color={color.value} name={color.name} size="sm" />
                                    {color.name}
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="images" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Images</CardTitle>
                  <CardDescription>
                    Upload images for your product (at least one required)
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="mb-4 flex items-center gap-4">
                    <CldUploadWidget
                      onSuccess={onUpload}
                      uploadPreset={process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET}
                    >
                      {({ open }) => (
                        <Button
                          type="button"
                          disabled={isPending}
                          variant="secondary"
                          onClick={() => open()}
                        >
                          <ImagePlus className="h-4 w-4 mr-2" />
                          Upload an Image
                        </Button>
                      )}
                    </CldUploadWidget>
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {images.map((image) => (
                      <div
                        key={image.url}
                        className="relative aspect-square rounded-md overflow-hidden group"
                      >
                        <div className="absolute z-10 top-2 right-2">
                          <Button
                            type="button"
                            onClick={() => onRemoveImage(image.url)}
                            variant="destructive"
                            size="icon"
                            className="h-8 w-8 opacity-0 group-hover:opacity-100 transition"
                          >
                            <X className="h-4 w-4" />
                          </Button>
                        </div>
                        <Image
                          fill
                          className="object-cover"
                          alt="Product image"
                          src={image.url}
                        />
                      </div>
                    ))}
                  </div>

                  <FormField
                    control={form.control}
                    name="images"
                    render={() => (
                      <FormItem className="mt-4">
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="settings" className="space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Product Settings</CardTitle>
                  <CardDescription>
                    Configure product visibility and status
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <FormField
                    control={form.control}
                    name="isFeatured"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isPending}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Featured</FormLabel>
                          <FormDescription>
                            This product will appear on the home page
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="isArchived"
                    render={({ field }) => (
                      <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4">
                        <FormControl>
                          <Checkbox
                            checked={field.value}
                            onCheckedChange={field.onChange}
                            disabled={isPending}
                          />
                        </FormControl>
                        <div className="space-y-1 leading-none">
                          <FormLabel>Archived</FormLabel>
                          <FormDescription>
                            This product will not appear anywhere in the store
                          </FormDescription>
                        </div>
                      </FormItem>
                    )}
                  />
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>

          <div className="flex items-center gap-2">
            <Button disabled={isPending} className="ml-auto" type="submit">
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              {action}
            </Button>
          </div>
        </form>
      </Form>
    </>
  )
}
