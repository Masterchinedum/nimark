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
    <div className="space-y-6 p-4 md:p-6 lg:p-8 bg-white rounded-lg shadow-md">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control} 
          name="name"
          render={({field}) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Name</FormLabel>
              <FormControl>
                <Input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" disabled={loading} placeholder='Product Name' {...field} />
              </FormControl>
              <FormMessage className="text-xs text-red-500 mt-1" />
            </FormItem>
          )}
        />
        
        <FormField
          control={form.control} 
          name="price"
          render={({field}) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Price</FormLabel>
              <FormControl>
                <Input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="number" disabled={loading} placeholder='Product Price' {...field} />
              </FormControl>
              <FormMessage className="text-xs text-red-500 mt-1" />
            </FormItem>
          )}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control} 
          name="stock"
          render={({field}) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Stock</FormLabel>
              <FormControl>
                <Input className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" type="number" disabled={loading} placeholder='Product Stock' {...field} />
              </FormControl>
              <FormMessage className="text-xs text-red-500 mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control} 
          name="categoryId"
          render={({field}) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Category</FormLabel>
              <Select
                disabled={loading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
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
              <FormMessage className="text-xs text-red-500 mt-1" />
            </FormItem>
          )}
        />
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <FormField
          control={form.control} 
          name="brandId"
          render={({field}) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Brand</FormLabel>
              <Select
                disabled={loading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                    <SelectValue
                      defaultValue={field.value}
                      placeholder='Select a Brand'
                    />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem key="default" value="default">Other</SelectItem>
                  {brands.map(brand => (
                    <SelectItem key={brand.id} value={brand.id}>
                      {brand.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <FormMessage className="text-xs text-red-500 mt-1" />
            </FormItem>
          )}
        />

        <FormField
          control={form.control} 
          name="sizeId"
          render={({field}) => (
            <FormItem>
              <FormLabel className="text-sm font-medium text-gray-700">Size</FormLabel>
              <Select
                disabled={loading}
                onValueChange={field.onChange}
                value={field.value}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
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
              <FormMessage className="text-xs text-red-500 mt-1" />
            </FormItem>
          )}
        />
      </div>

      <FormField
        control={form.control} 
        name="colorId"
        render={({field}) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">Color</FormLabel>
            <Select
              disabled={loading}
              onValueChange={field.onChange}
              value={field.value}
              defaultValue={field.value}
            >
              <FormControl>
                <SelectTrigger className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50">
                  <SelectValue
                    defaultValue={field.value}
                    placeholder='Select a color'
                  />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {colors.map(color => (
                  <SelectItem className="flex items-center" key={color.id} value={color.id}>
                    <span className="w-4 h-4 rounded-full mr-2" style={{ backgroundColor: color.value }}></span>
                    <span>{color.name}</span>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />

      <FormField
        control={form.control}
        name="description"
        render={({ field }) => (
          <FormItem>
            <FormLabel className="text-sm font-medium text-gray-700">Description</FormLabel>
            <FormControl>
              <Textarea 
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
                disabled={loading} 
                placeholder="Product description" 
                {...field} 
              />
            </FormControl>
            <FormMessage className="text-xs text-red-500 mt-1" />
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductDetails;