import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

const STORE_ID = '146d5c54-75b9-4197-8c94-78be27c89075'
const PART2_OFFSET = 10001
const PART2_COUNT = 1700 // Aim to reach ~3,500 total after part 2

const SEGMENTS = [
  'Phones','Tablets','Laptops','Desktops','Components','Monitors','Networking','Audio','Cameras','Printers','Storage','Power','PC Cases','Cooling','Wearables','Gaming','Drones','Security'
]

const adjectives = ['Nova','Hyper','Aero','Quantum','Vertex','Prime','Ultra','Apex','Omega','Turbo','Fusion','Pixel','Nimbus','Polar','Vortex','Pioneer','Falcon','Crystal','Sonic','Orion','Zenith','Atlas','Titan','Aurora','Spectra','Echo','Magnet','Neon','Stellar']
const techWords = ['Tech','Logic','Dynamics','Systems','Labs','Works','Electrics','Digital','Micro','Nano','Circuit','Compute','Mobile','Photon','Quantum','Gear','Core','Matrix','Signal','Wave','Link','Pulse','Drive','Fusion','Net','Grid','Orbit','Forge','Node','Flow']

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'
function brandImageUrl(name: string) {
  const seed = slugify(name)
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/brand_placeholders/brand_${seed}.jpg`
}
function generateBrandNames(offset: number, count: number): string[] {
  const out: string[] = []
  for (let i = 0; i < count; i++) {
    const idx = offset + i
    const adj = adjectives[idx % adjectives.length]
    const word = techWords[(idx * 7) % techWords.length]
    const segment = SEGMENTS[(idx * 13) % SEGMENTS.length]
    const code = String(idx).padStart(5, '0')
    out.push(`${adj}${word} ${segment} ${code}`)
  }
  return out
}

async function ensureBrands(storeId: string, names: string[]) {
  let created = 0
  for (const name of names) {
    const exists = await prisma.brand.findFirst({ where: { storeId, name } })
    if (exists) continue
    await prisma.brand.create({ data: { storeId, name, imageUrl: brandImageUrl(name), isDefault: false } })
    created++
    if (created % 250 === 0) console.log(`  + Created ${created} brands so far...`)
  }
  return created
}

async function main() {
  try {
    console.log('Seeding brands - Part 2 (generated)')
    const store = await prisma.store.findUnique({ where: { id: STORE_ID } })
    if (!store) throw new Error(`Store not found: ${STORE_ID}`)
    console.log(`✓ Store: ${store.name}`)

    const names = generateBrandNames(PART2_OFFSET, PART2_COUNT)
    console.log(`Preparing to insert ${names.length} brands (Part 2) from offset ${PART2_OFFSET}`)
    const created = await ensureBrands(STORE_ID, names)
    console.log(`\n✓ Brands created in Part 2: ${created}`)
    const total = await prisma.brand.count({ where: { storeId: STORE_ID } })
    console.log(`Total brands in store now: ${total}`)
  } catch (e) {
    console.error('Brand seeding failed (Part 2):', e)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

main()
