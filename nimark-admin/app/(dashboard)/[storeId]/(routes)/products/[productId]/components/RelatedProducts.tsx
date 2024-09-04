// nimark-admin/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/RelatedProducts.tsx

import React, { useEffect, useState } from 'react';
import { UseFormReturn } from 'react-hook-form';
import { Product } from '@prisma/client';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormField, FormItem, FormLabel, FormControl } from '@/components/ui/form';
import axios from 'axios';

interface RelatedProductsProps {
    form: UseFormReturn<any>;
    storeId: string;
}

const RelatedProducts: React.FC<RelatedProductsProps> = ({ form, storeId }) => {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get(`/api/${storeId}/products`);
                setProducts(response.data);
            } catch (error) {
                console.error('Failed to fetch products:', error);
            }
        };

        fetchProducts();
    }, [storeId]);

    return (
        <FormField
            control={form.control}
            name="relatedProductIds"
            render={({ field }) => (
                <FormItem>
                    <FormLabel>Related Products</FormLabel>
                    <FormControl>
                        <Select
                            onValueChange={(value) => field.onChange([...field.value, value])}
                            value=""
                        >
                            <SelectTrigger>
                                <SelectValue placeholder="Select related products" />
                            </SelectTrigger>
                            <SelectContent>
                                {products.map((product) => (
                                    <SelectItem key={product.id} value={product.id}>
                                        {product.name}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </FormControl>
                    <div className="mt-2">
                        {field.value.map((id: string) => {
                            const product = products.find(p => p.id === id);
                            return product ? (
                                <div key={id} className="flex items-center justify-between bg-gray-100 p-2 rounded mb-1">
                                    <span>{product.name}</span>
                                    <button
                                        type="button"
                                        onClick={() => field.onChange(field.value.filter((v: string) => v !== id))}
                                        className="text-red-500"
                                    >
                                        Remove
                                    </button>
                                </div>
                            ) : null;
                        })}
                    </div>
                </FormItem>
            )}
        />
    );
};

export default RelatedProducts;