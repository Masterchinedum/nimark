//nimark-admin/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/ProductForm.tsx

"use client"

import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useParams, useRouter } from 'next/navigation';
import { toast } from 'react-hot-toast';
import axios from 'axios';
import { Category, Color, Brand, Size, Product as PrismaProduct, Prisma } from "@prisma/client";
import { AlertModal } from '@/components/modals/alert-modal';
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import { Form } from '@/components/ui/form';
import ImageUploader from './ImageUploader';
import ProductDetails from './ProductDetails';
import ProductMetadata from './ProductMetadata';
import { getOrCreateDefaultBrand } from "@/lib/utils/brand";
import * as z from 'zod';
import CategoryProperties from './CategoryProperties';
import RelatedProducts from './RelatedProducts';


interface ExtendedPrismaProduct extends PrismaProduct {
    relatedTo?: { id: string }[];
}

interface ProductFromProps {
    initialData: ExtendedPrismaProduct & {
        images: Image[]
    } | null;
    categories: Category[];
    colors: Color[];
    sizes: Size[];
    brands: Brand[];
};

interface Image {
    id: string;
    productId: string;
    url: string;
}

type ProductWithPrice = PrismaProduct & {
    price: Prisma.Decimal;
}

const formSchema = z.object({
    name: z.string().min(1),
    price: z.coerce.number().min(1),
    stock: z.coerce.number().min(0),
    images: z.array(z.object({ url: z.string() })),
    categoryId: z.string().min(1),
    colorId: z.string().min(1),
    brandId: z.union([z.string().min(1), z.array(z.string().min(1))]).optional(),
    sizeId: z.string().min(1),
    description: z.string().optional(),
    relatedProductIds: z.array(z.string()).optional(),
    properties: z.record(z.string(), z.union([z.string(), z.array(z.string())])).optional(),
    isFeatured: z.boolean().default(false).optional(),
    isArchived: z.boolean().default(false).optional()
});

type UploadedImage = {
    url: string;
};

type ProductFormValues = z.infer<typeof formSchema> & {
    images: UploadedImage[];
};

export const ProductForm: React.FC<ProductFromProps> = ({
    initialData,
    categories,
    colors,
    sizes,
    brands,
}) => {
    const params = useParams();
    const router = useRouter();

    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const title = initialData ? 'Edit product' : 'Create product'
    const description = initialData ? 'Edit a product' : 'Add a new product'
    const toastMessage = initialData ? 'Product updated.' : 'Product created.'
    const action = initialData ? 'Save changes' : 'Create'
    const [images, setImages] = useState<UploadedImage[]>(initialData?.images || []);

    const form = useForm<ProductFormValues>({
        resolver: zodResolver(formSchema),
        defaultValues: initialData 
            ? {
                ...initialData,
                price: parseFloat(String(initialData?.price)),
                stock: initialData?.stock || 0,
                description: initialData.description || '',
                images: initialData.images || [],
                brandId: initialData.brandId || '',
                properties: initialData.properties 
                    ? JSON.parse(initialData.properties as string) 
                    : {},
                relatedProductIds: initialData.relatedTo?.map(product => product.id) || [],
        } : {
            name: '',
            price: 0,
            images: [],
            stock: 0,
            categoryId: '',
            brandId: '',
            colorId: '',
            sizeId: '',
            description: '',
            isFeatured: false,
            isArchived: false,
            properties: {},
            relatedProductIds: [],
        },
    });

    const [selectedCategory, setSelectedCategory] = useState<Category | null>(null);

    useEffect(() => {
        if (form.watch('categoryId')) {
            const category = categories.find(c => c.id === form.watch('categoryId'));
            setSelectedCategory(category || null);
        }
    }, [form.watch('categoryId'), categories]);

    const onSubmit = async (data: ProductFormValues) => {
        try {
            setLoading(true);
    
            let finalBrandId = data.brandId;
            if (!data.brandId) {
                const defaultBrand = await getOrCreateDefaultBrand(params.storeId as string);
                finalBrandId = defaultBrand.id;
            }
            const payload = {
                ...data,
                brandId: finalBrandId,
                properties: data.properties ? JSON.stringify(data.properties) : null,
            };
    
            if (initialData) {
                await axios.patch(`/api/${params.storeId}/products/${params.productId}`, payload);
            } else {
                await axios.post(`/api/${params.storeId}/products`, payload);
            }
            router.refresh();
            router.push(`/${params.storeId}/products`);
            toast.success(toastMessage)
        } catch(err) {
            toast.error("Something went wrong.");
        } finally {
            setLoading(false)
        }
    }

    const onDelete = async () => {
        try {
            setLoading(true);
            await axios.delete(`/api/${params.storeId}/products/${params.productId}`)
            router.refresh();
            router.push(`/${params.storeId}/products`)
            toast.success("Product deleted.")
        } catch(err) {
            toast.error("Something Went Wrong.");
        } finally {
            setLoading(false)
            setOpen(false);
        }
    }
    
    return (
        <div className="space-y-4 md:space-y-6 lg:space-y-8">
            <AlertModal
                isOpen={open}
                onClose={() => setOpen(false)}
                onConfirm={onDelete}
                loading={loading}
            />
            <div className="flex flex-col sm:flex-row items-center justify-between space-y-2 sm:space-y-0">
                <Heading title={title} description={description} />
                {initialData && (
                    <Button variant="destructive" size="sm" onClick={() => setOpen(true)} disabled={loading}>
                        <Trash className="w-4 h-4" />
                    </Button>
                )}
            </div>
            <Separator />
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6 md:space-y-8 lg:space-y-10">
                    <ImageUploader 
                        images={images} 
                        setImages={setImages} 
                        form={form}
                    />
                    <div className="space-y-6 p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-md">
                        <ProductDetails 
                            form={form}
                            loading={loading}
                            categories={categories}
                            sizes={sizes}
                            colors={colors}
                            brands={brands}
                        />
                        {selectedCategory && selectedCategory.properties && (
                            <CategoryProperties
                                form={form}
                                categoryProperties={JSON.parse(selectedCategory.properties as string)}
                            />
                        )}

                        <RelatedProducts
                            form={form}
                            storeId={params.storeId as string}
                        />
                    </div>
                    <ProductMetadata 
                        form={form}
                        loading={loading}
                    />
                    <Button type="submit" disabled={loading} className="w-full sm:w-auto">
                        {action}
                    </Button>
                </form>
            </Form>
        </div>
    )
}