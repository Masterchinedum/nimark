// nimark-admin/app/(dashboard)/[storeId]/(routes)/categories/[categoryId]/page.tsx

import prismadb from "@/lib/prismadb";
import { CategoryForm } from "./components/category-form";

const CategoryPage = async ({ 
  params 
}: { 
  params: { categoryId: string, storeId: string } 
}) => {
  const category = await prismadb.category.findUnique({
    where: {
      id: params.categoryId
    }
  });

  const billboards = await prismadb.billboard.findMany({
    where: {
      storeId: params.storeId
    }
  });

  const categories = await prismadb.category.findMany({
    where: {
      storeId: params.storeId
    }
  });

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <CategoryForm 
          initialData={category}
          billboards={billboards}
          categories={categories}
        />
      </div>
    </div>
  );
}

export default CategoryPage;