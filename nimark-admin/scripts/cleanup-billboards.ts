import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const STORE_ID = '146d5c54-75b9-4197-8c94-78be27c89075';

async function cleanup() {
  try {
    console.log('Cleaning up old billboard...\n');

    // Delete the "Main Categories" billboard
    const result = await prisma.billboard.deleteMany({
      where: {
        storeId: STORE_ID,
        label: 'Main Categories',
      },
    });

    console.log(`✓ Deleted ${result.count} old billboard(s)\n`);

    // Verify remaining billboards
    const remaining = await prisma.billboard.findMany({
      where: { storeId: STORE_ID },
      select: {
        label: true,
        _count: {
          select: { categories: true },
        },
      },
      orderBy: {
        label: 'asc',
      },
    });

    console.log('Remaining billboards:');
    remaining.forEach(b => {
      console.log(`  - ${b.label} (${b._count.categories} categories)`);
    });

    console.log(`\n✓ Cleanup completed! Total billboards: ${remaining.length}\n`);
  } catch (error) {
    console.error('Error during cleanup:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

cleanup();
