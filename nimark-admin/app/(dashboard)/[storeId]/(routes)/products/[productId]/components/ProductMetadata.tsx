import { FormField, FormItem, FormControl, FormLabel, FormDescription } from '@/components/ui/form';
import { Checkbox } from '@/components/ui/checkbox';

interface ProductMetadataProps {
  form: any; // You might want to use a more specific type here
  loading: boolean;
}

const ProductMetadata: React.FC<ProductMetadataProps> = ({ form, loading }) => {
  return (
    <div className="space-y-4">
      <FormField
        control={form.control} 
        name="isFeatured"
        render={({field}) => (
          <FormItem className='flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md'>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={loading}
              />
            </FormControl>
            <div className='space-y-1 leading-none'>
              <FormLabel>
                Featured
              </FormLabel>
              <FormDescription>
                The product will appear on the home page.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
      <FormField
        control={form.control} 
        name="isArchived"
        render={({field}) => (
          <FormItem className='flex flex-row items-start p-4 space-x-3 space-y-0 border rounded-md'>
            <FormControl>
              <Checkbox
                checked={field.value}
                onCheckedChange={field.onChange}
                disabled={loading}
              />
            </FormControl>
            <div className='space-y-1 leading-none'>
              <FormLabel>
                Archived
              </FormLabel>
              <FormDescription>
                The product will not be visible to customers.
              </FormDescription>
            </div>
          </FormItem>
        )}
      />
    </div>
  );
};

export default ProductMetadata;