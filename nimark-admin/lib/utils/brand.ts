//nimark-admin/lib/utils/brand.ts

import prismadb from "@/lib/prismadb";

export async function getOrCreateDefaultBrand(storeId: string | string[]) {
  let defaultBrand = await prismadb.brand.findFirst({
    where: { 
      storeId: typeof storeId === 'string' ? storeId : storeId[0],
      isDefault: true 
    }
  });

  if (!defaultBrand) {
    defaultBrand = await prismadb.brand.create({
      data: {
        name: "Other",
        imageUrl: "./cardboard-box.png", // Replace with an actual default image path
        isDefault: true,
        storeId: typeof storeId === 'string' ? storeId : storeId[0],
      }
    });
  }

  return defaultBrand;
}