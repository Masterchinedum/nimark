//nimark-admin/lib/utils/brand.ts

import prismadb from "@/lib/prismadb";

export async function getOrCreateDefaultBrand(storeId: string) {
  let defaultBrand = await prismadb.brand.findFirst({
    where: { storeId, isDefault: true }
  });

  if (!defaultBrand) {
    defaultBrand = await prismadb.brand.create({
      data: {
        name: "Other",
        imageUrl: "./cardboard-box.png", // Replace with an actual default image path
        isDefault: true,
        storeId,
      }
    });
  }

  return defaultBrand;
}