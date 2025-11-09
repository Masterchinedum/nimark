import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const STORE_ID = '146d5c54-75b9-4197-8c94-78be27c89075';

async function main() {
  try {
    // Get all billboards for this store
    const billboards = await prisma.billboard.findMany({
      where: { storeId: STORE_ID },
      include: {
        categories: {
          select: {
            id: true,
            name: true,
          },
        },
      },
    });

    console.log('\n=== BILLBOARDS IN DATABASE ===\n');
    
    for (const billboard of billboards) {
      console.log(`Billboard: "${billboard.label}"`);
      console.log(`  ID: ${billboard.id}`);
      console.log(`  Categories using this billboard: ${billboard.categories.length}`);
      if (billboard.categories.length > 0 && billboard.categories.length <= 5) {
        console.log(`  Sample categories:`);
        billboard.categories.slice(0, 5).forEach(cat => {
          console.log(`    - ${cat.name}`);
        });
      }
      console.log('');
    }

    console.log(`\nTotal billboards: ${billboards.length}`);
    
    // Get total categories
    const totalCategories = await prisma.category.count({
      where: { storeId: STORE_ID },
    });
    
    console.log(`Total categories: ${totalCategories}\n`);
  } catch (error) {
    console.error('Error:', error);
  } finally {
    await prisma.$disconnect();
  }
}

main();
