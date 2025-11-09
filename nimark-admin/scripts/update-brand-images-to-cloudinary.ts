import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const STORE_ID = '146d5c54-75b9-4197-8c94-78be27c89075'

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'
function cloudinaryBrandUrl(name: string) {
  const seed = slugify(name)
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/brand_placeholders/brand_${seed}.jpg`
}

async function main() {
  try {
    console.log('Updating existing brand image URLs to Cloudinary...')
    const brands = await prisma.brand.findMany({ where: { storeId: STORE_ID }, select: { id: true, name: true, imageUrl: true } })
    let updateCount = 0
    for (const b of brands) {
      if (b.imageUrl.includes('picsum.photos')) {
        const newUrl = cloudinaryBrandUrl(b.name)
        await prisma.brand.update({ where: { id: b.id }, data: { imageUrl: newUrl } })
        updateCount++
        if (updateCount % 500 === 0) console.log(`  • Updated ${updateCount} brand images...`)
      }
    }
    console.log(`\n✓ Completed. Updated ${updateCount} brand images to Cloudinary.`)
  } catch (e) {
    console.error('Failed to update brand images:', e)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

main()
