import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { FormField, FormItem, FormLabel, FormControl, FormMessage } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Checkbox } from '@/components/ui/checkbox';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface CategoryPropertiesProps {
    form: UseFormReturn<any>;
    categoryProperties: {
        name: string;
        values: string;
    }[];
}

const CategoryProperties: React.FC<CategoryPropertiesProps> = ({ form, categoryProperties }) => {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-medium">Category Properties</h3>
            {categoryProperties.map((property, index) => (
                <FormField
                    key={index}
                    control={form.control}
                    name={`properties.${property.name}`}
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>{property.name}</FormLabel>
                            <FormControl>
                                {property.values.includes(',') ? (
                                    <Select
                                        onValueChange={field.onChange}
                                        defaultValue={field.value}
                                    >
                                        <FormControl>
                                            <SelectTrigger>
                                                <SelectValue placeholder={`Select ${property.name}`} />
                                            </SelectTrigger>
                                        </FormControl>
                                        <SelectContent>
                                            {property.values.split(',').map((value) => (
                                                <SelectItem key={value.trim()} value={value.trim()}>
                                                    {value.trim()}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                ) : (
                                    property.values === 'boolean' ? (
                                        <Checkbox
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    ) : (
                                        <Input {...field} />
                                    )
                                )}
                            </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            ))}
        </div>
    );
};

export default CategoryProperties;