// nimark-admin/app/(dashboard)/[storeId]/(routes)/categories/[categoryId]/components/category-form.tsx

"use client";

import { useState, useEffect, useCallback } from "react";
import * as z from "zod";
import { Billboard, Category } from "@prisma/client";
import { Heading } from "@/components/ui/heading";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { Trash } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { toast } from "react-hot-toast";
import axios from "axios";
import { useParams, useRouter } from "next/navigation";
import { AlertModal } from "@/components/modals/alert-modal";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import Properties from "./properties";

interface SettingsFormProps {
  initialData: Category | null;
  billboards: Billboard[];
  categories: Category[];
}

const formSchema = z.object({
  name: z.string().min(1),
  billboardId: z.string().min(1),
  parentId: z.string().optional(),
  properties: z.array(z.object({
    name: z.string(),
    values: z.string()
  })).optional(),
});

type CategoryFormValues = z.infer<typeof formSchema>;

export const CategoryForm: React.FC<SettingsFormProps> = ({
  initialData,
  billboards,
  categories,
}) => {
  const params = useParams();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [availableParents, setAvailableParents] = useState<Category[]>([]);
  const [properties, setProperties] = useState<{name: string, values: string}[]>(
    initialData?.properties ? JSON.parse(initialData.properties as string) : []
  );

  const title = initialData ? "Edit category" : "Create category";
  const description = initialData ? "Edit a category" : "Add a new category";
  const toastMessage = initialData ? "Category updated." : "Category created.";
  const action = initialData ? "Save changes" : "Create";

  const form = useForm<CategoryFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData ? {
      name: initialData.name,
      billboardId: initialData.billboardId,
      parentId: initialData.parentId || "none" || undefined,
    } : {
      name: "",
      billboardId: "",
      parentId: undefined,
    },
  });

  const isDescendant = useCallback((category: Category, targetId: string): boolean => {
    if (category.id === targetId) return true;
    if (category.parentId) {
      const parent = categories.find((cat) => cat.id === category.parentId);
      return parent ? isDescendant(parent, targetId) : false;
    }
    return false;
  }, [categories]);

  useEffect(() => {
    if (initialData) {
      const filtered = categories.filter(
        (cat) => cat.id !== initialData.id && !isDescendant(cat, initialData.id)
      );
      setAvailableParents(filtered);
    } else {
      setAvailableParents(categories);
    }
  }, [categories, initialData, isDescendant]);

  const onSubmit = async (data: CategoryFormValues) => {
    try {
      setLoading(true);
      const submissionData = {
        ...data,
        parentId: data.parentId === "none" ? null : data.parentId,
        properties: JSON.stringify(properties)
      };
      if (initialData) {
        await axios.patch(
          `/api/${params.storeId}/categories/${params.categoryId}`,
          submissionData
        );
      } else {
        await axios.post(`/api/${params.storeId}/categories`, submissionData);
      }
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success(toastMessage);
    } catch (err) {
      toast.error("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  const onDelete = async () => {
    try {
      setLoading(true);
      await axios.delete(
        `/api/${params.storeId}/categories/${params.categoryId}`
      );
      router.refresh();
      router.push(`/${params.storeId}/categories`);
      toast.success("Category deleted.");
    } catch (err) {
      toast.error(
        "Make sure you removed all products using this category first."
      );
    } finally {
      setLoading(false);
      setOpen(false);
    }
  };

  return (
    <>
      <AlertModal
        isOpen={open}
        onClose={() => setOpen(false)}
        onConfirm={onDelete}
        loading={loading}
      />
      <div className="flex flex-col md:flex-row items-center justify-between">
        <Heading title={title} description={description} />
        {initialData && (
          <Button
            variant="destructive"
            size="sm"
            onClick={() => setOpen(true)}
            disabled={loading}
            className="mt-4 md:mt-0"
          >
            <Trash className="w-4 h-4" />
          </Button>
        )}
      </div>
      <Separator />
      <Card>
        <CardHeader>
          <CardTitle>{title}</CardTitle>
        </CardHeader>
        <CardContent>
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8 md:space-y-4">
              <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 md:grid-cols-3">
                <FormField
                  control={form.control}
                  name="name"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Name</FormLabel>
                      <FormControl>
                        <Input
                          disabled={loading}
                          placeholder="Category name"
                          {...field}
                          className="w-full"
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="billboardId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Billboard</FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value}
                        defaultValue={field.value}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue
                              defaultValue={field.value}
                              placeholder="Select a billboard"
                            />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          {billboards.map((billboard) => (
                            <SelectItem key={billboard.id} value={billboard.id}>
                              {billboard.label}
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
                  name="parentId"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Parent Category (Optional)</FormLabel>
                      <Select
                        disabled={loading}
                        onValueChange={field.onChange}
                        value={field.value || ""}
                      >
                        <FormControl>
                          <SelectTrigger className="w-full">
                            <SelectValue placeholder="Select a parent category" />
                          </SelectTrigger>
                        </FormControl>
                        <SelectContent>
                          <SelectItem value="none">None</SelectItem>
                          {availableParents.map((category) => (
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
              </div>
              <Properties
                properties={properties}
                onAddProperty={() => setProperties([...properties, {name: '', values: ''}])}
                onRemoveProperty={(index) => {
                  const newProperties = [...properties];
                  newProperties.splice(index, 1);
                  setProperties(newProperties);
                }}
                onNameChange={(index, property, name) => {
                  const newProperties = [...properties];
                  newProperties[index] = {...property, name};
                  setProperties(newProperties);
                }}
                onValuesChange={(index, property, values) => {
                  const newProperties = [...properties];
                  newProperties[index] = {...property, values};
                  setProperties(newProperties);
                }}
              />
              <Button disabled={loading} className="ml-auto" type="submit">
                {action}
              </Button>
            </form>
          </Form>
        </CardContent>
      </Card>
    </>
  );
};