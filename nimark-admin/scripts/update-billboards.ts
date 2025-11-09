import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const STORE_ID = '146d5c54-75b9-4197-8c94-78be27c89075';

// Map of category names to their billboard labels
const categoryBillboardMap: Record<string, string> = {
  'Electronics': 'Electronics & Gadgets',
  'Fashion': 'Fashion & Apparel',
  'Home & Living': 'Home & Living',
  'Health & Beauty': 'Health & Beauty',
  'Sports & Outdoors': 'Sports & Fitness',
  'Baby & Kids': 'Baby & Kids',
  'Books, Movies & Music': 'Entertainment',
  'Automotive': 'Automotive',
  'Office Products': 'Office & Stationery',
  'Food & Beverages': 'Food & Beverages',
  'Pet Supplies': 'Pet Care',
  'Jewelry & Accessories': 'Jewelry & Accessories',
  'Industrial & Scientific': 'Industrial & Tools',
};

async function updateCategoryBillboards() {
  try {
    console.log('Starting billboard reassignment...\n');

    // Get all billboards
    const billboards = await prisma.billboard.findMany({
      where: { storeId: STORE_ID },
    });

    const billboardMap = new Map<string, string>();
    billboards.forEach(b => billboardMap.set(b.label, b.id));

    console.log(`Found ${billboards.length} billboards\n`);

    // Get all top-level categories (no parent)
    const topCategories = await prisma.category.findMany({
      where: {
        storeId: STORE_ID,
        parentId: null,
      },
    });

    console.log(`Found ${topCategories.length} top-level categories\n`);

    // Update each top-level category and its children
    for (const topCategory of topCategories) {
      const billboardLabel = categoryBillboardMap[topCategory.name];
      
      if (!billboardLabel) {
        console.log(`⚠️  No billboard mapping for: ${topCategory.name}`);
        continue;
      }

      const billboardId = billboardMap.get(billboardLabel);
      
      if (!billboardId) {
        console.log(`⚠️  Billboard not found: ${billboardLabel}`);
        continue;
      }

      console.log(`Updating "${topCategory.name}" and its children to use "${billboardLabel}"...`);

      // Get all descendants of this category
      const descendants = await getAllDescendants(topCategory.id);
      const allCategoryIds = [topCategory.id, ...descendants];

      console.log(`  Found ${descendants.length} child categories`);

      // Update all categories in this tree
      const result = await prisma.category.updateMany({
        where: {
          id: { in: allCategoryIds },
          storeId: STORE_ID,
        },
        data: {
          billboardId: billboardId,
        },
      });

      console.log(`  ✓ Updated ${result.count} categories\n`);
    }

    console.log('\n=== VERIFICATION ===\n');

    // Verify the update
    for (const billboard of billboards) {
      const count = await prisma.category.count({
        where: {
          storeId: STORE_ID,
          billboardId: billboard.id,
        },
      });
      
      if (count > 0) {
        console.log(`${billboard.label}: ${count} categories`);
      }
    }

    console.log('\n✓ Billboard reassignment completed!\n');
  } catch (error) {
    console.error('Error updating billboards:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

async function getAllDescendants(categoryId: string): Promise<string[]> {
  const children = await prisma.category.findMany({
    where: { parentId: categoryId },
    select: { id: true },
  });

  if (children.length === 0) {
    return [];
  }

  const childIds = children.map(c => c.id);
  const grandchildren: string[] = [];

  for (const childId of childIds) {
    const descendants = await getAllDescendants(childId);
    grandchildren.push(...descendants);
  }

  return [...childIds, ...grandchildren];
}

updateCategoryBillboards();
