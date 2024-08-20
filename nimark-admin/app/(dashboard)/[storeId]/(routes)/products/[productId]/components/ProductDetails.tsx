//nimark-admin/app/(dashboard)/[storeId]/(routes)/products/[productId]/components/ProductDettails.tsx

import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Textarea } from "@/components/ui/textarea";
import { Category, Color, Size, Brand } from "@prisma/client";

interface ProductDetailsProps {
  form: any;
  loading: boolean;
  categories: Category[];
  sizes: Size[];
  colors: Color[];
  brands: Brand[];
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ 
  form, 
  loading, 
  categories, 
  sizes, 
  colors,
  brands, 
}) => {
  return (
    <div className='grid grid-cols-3 gap-8'>
      <FormField
        control={form.control} 
        name="name"
        render={({field}) => (
          <FormItem>
            <FormLabel>Name</FormLabel>
            <FormControl>
              <Input disabled={loading} placeholder='Product Name' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      
      <FormField
        control={form.control} 
        name="price"
        render={({field}) => (
          <FormItem>
            <FormLabel>Price</FormLabel>
            <FormControl>
              <Input type="number" disabled={loading} placeholder='Product Price' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control} 
        name="stock"
        render={({field}) => (
          <FormItem>
            <FormLabel>Stock</FormLabel>
            <FormControl>
              <Input type="number" disabled={loading} placeholder='Product Stock' {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />

      <FormField
        control={form.control} 
        name="categoryId"
        render={({field}) => (
          <FormItem>
            <FormLabel>Category</FormLabel>
            <Select
              disabled={loading}
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    defaultValue={field.value}
                    placeholder='Select a Category'
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {categories.map(category => (
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
          render={({field}) => (
              <FormItem>
                  <FormLabel>Brand</FormLabel>
                  <Select
                      disabled={loading}
                      onValueChange={field.onChange}
                      value={field.value}
                      defaultValue={field.value}
                  >
                      <FormControl>
                          <SelectTrigger>
                              <SelectValue
                                  defaultValue={field.value}
                                  placeholder='Select a Brand'
                              />
                          </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                          <SelectItem key="default" value="">Other</SelectItem>
                          {brands.map(brand => (
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
        render={({field}) => (
          <FormItem>
            <FormLabel>Size</FormLabel>
            <Select
              disabled={loading}
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    defaultValue={field.value}
                    placeholder='Select a size'
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {sizes.map(size => (
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
        render={({field}) => (
          <FormItem>
            <FormLabel>Color</FormLabel>
            <Select
              disabled={loading}
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue
                    defaultValue={field.value}
                    placeholder='Select a color'
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {colors.map(color => (
                  <SelectItem style={{ display: 'flex' }} key={color.id} value={color.id}>
                    <span style={{ color: color.value }}>{color.name}</span>
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
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl>
              <Textarea 
                disabled={loading} 
                placeholder="Product description" 
                {...field} 
              />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductDetails;