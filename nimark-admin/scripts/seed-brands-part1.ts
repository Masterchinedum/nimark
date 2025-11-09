import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

// Target store
const STORE_ID = '146d5c54-75b9-4197-8c94-78be27c89075'

// How many brands to generate in this part (aiming ~1,800 for part 1)
const TARGET_COUNT_PART1 = 1800

// Segments aligned with seeded electronics categories
const SEGMENTS = [
  'Phones',
  'Tablets',
  'Laptops',
  'Desktops',
  'Components',
  'Monitors',
  'Networking',
  'Audio',
  'Cameras',
  'Printers',
  'Storage',
  'Power',
  'PC Cases',
  'Cooling',
  'Wearables',
  'Gaming',
  'Drones',
  'Security',
]

// Known real-world electronics brands (curated subset)
const curatedBrands = [
  'Apple', 'Samsung', 'Google', 'Huawei', 'Xiaomi', 'OnePlus', 'Oppo', 'Vivo', 'Realme', 'Sony', 'LG', 'Motorola', 'Nokia', 'Honor', 'Asus', 'Lenovo', 'HP', 'Dell', 'Acer', 'MSI', 'Razer', 'Alienware', 'Toshiba',
  'Microsoft', 'Surface', 'Chromebook', 'Panasonic', 'Sharp', 'Philips', 'Hisense', 'TCL', 'Vizio', 'BenQ', 'AOC', 'ViewSonic', 'Gigabyte', 'ASRock', 'Biostar',
  'Intel', 'AMD', 'NVIDIA', 'Qualcomm', 'MediaTek', 'Apple Silicon',
  'Corsair', 'G.Skill', 'Kingston', 'Crucial', 'Patriot', 'TeamGroup', 'Micron',
  'Seagate', 'Western Digital', 'WD', 'SanDisk', 'Samsung SSD', 'Kioxia', 'Kingston SSD',
  'Netgear', 'TP-Link', 'Ubiquiti', 'Cisco', 'D-Link', 'Tenda', 'MikroTik', 'Linksys',
  'Logitech', 'SteelSeries', 'Razer Peripherals', 'HyperX', 'Corsair Gaming', 'Roccat', 'Zowie', 'Glorious', 'Cooler Master', 'NZXT', 'Thermaltake', 'Noctua', 'be quiet!', 'Arctic', 'DeepCool', 'Phanteks', 'Fractal Design', 'Lian Li', 'SilverStone', 'InWin',
  'EVGA', 'Seasonic', 'Antec', 'FSP', 'XPG', 'Behringer',
  'Canon', 'Nikon', 'Sony Imaging', 'Fujifilm', 'Panasonic Lumix', 'Olympus', 'Leica', 'GoPro',
  'DJI', 'Parrot', 'Autel Robotics',
  'Bose', 'JBL', 'Sennheiser', 'Audio-Technica', 'Sony Audio', 'Beats', 'Anker Soundcore', 'Marshall', 'Shure', 'Rode',
  'HP Printers', 'Canon Printers', 'Epson', 'Brother', 'Xerox', 'Kyocera', 'Ricoh',
  'Hikvision', 'Dahua', 'Arlo', 'Ring', 'Blink', 'Wyze', 'TP-Link Tapo',
]

const adjectives = [
  'Nova', 'Hyper', 'Aero', 'Quantum', 'Vertex', 'Prime', 'Ultra', 'Apex', 'Omega', 'Turbo', 'Fusion', 'Pixel', 'Nimbus', 'Polar', 'Vortex', 'Pioneer', 'Falcon', 'Crystal', 'Sonic', 'Vertex', 'Orion', 'Zenith', 'Atlas', 'Titan', 'Aurora', 'Spectra', 'Echo', 'Magnet', 'Neon', 'Stellar',
]

const techWords = [
  'Tech', 'Logic', 'Dynamics', 'Systems', 'Labs', 'Works', 'Electrics', 'Digital', 'Micro', 'Nano', 'Circuit', 'Compute', 'Mobile', 'Photon', 'Quantum', 'Gear', 'Core', 'Matrix', 'Signal', 'Wave', 'Link', 'Pulse', 'Drive', 'Fusion', 'Net', 'Grid', 'Orbit', 'Forge', 'Node', 'Flow',
]

function slugify(s: string) {
  return s.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
}

// Generates a deterministic Cloudinary placeholder image URL for a brand.
// Uses your Cloudinary cloud name from NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME, falling back to 'demo'.
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'
function brandImageUrl(name: string) {
  const seed = slugify(name)
  // Using text overlays would require a signed URL or transformation; keep simple placeholder.
  // Path pattern: https://res.cloudinary.com/demo/image/upload/<folder>/brand_<seed>.jpg
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/brand_placeholders/brand_${seed}.jpg`
}

// Deterministic generator so parts can be split without overlap
function generateBrandNames(offset: number, count: number): string[] {
  const out: string[] = []
  for (let i = 0; i < count; i++) {
    const idx = offset + i
    const adj = adjectives[idx % adjectives.length]
    const word = techWords[(idx * 7) % techWords.length]
    const segment = SEGMENTS[(idx * 13) % SEGMENTS.length]
    const code = String(idx).padStart(4, '0')
    out.push(`${adj}${word} ${segment} ${code}`)
  }
  return out
}

async function ensureBrands(storeId: string, names: string[]) {
  let created = 0
  for (const name of names) {
    const exists = await prisma.brand.findFirst({ where: { storeId, name } })
    if (exists) continue
    await prisma.brand.create({
      data: {
        storeId,
        name,
        imageUrl: brandImageUrl(name),
        isDefault: false,
      },
    })
    created++
    if (created % 250 === 0) console.log(`  + Created ${created} brands so far...`)
  }
  return created
}

async function main() {
  try {
    console.log('Seeding brands - Part 1 (curated + generated)')

    // Verify store exists
    const store = await prisma.store.findUnique({ where: { id: STORE_ID } })
    if (!store) throw new Error(`Store not found: ${STORE_ID}`)
    console.log(`✓ Store: ${store.name}`)

    const namesSet = new Set<string>()

    // 1) Add curated brand names first
    curatedBrands.forEach((b) => namesSet.add(b))

    // 2) Generate additional brand names to reach target for part 1
    // Use offset 0.. so that part2/part3 can use higher offsets to avoid overlap
    const needed = Math.max(0, TARGET_COUNT_PART1 - namesSet.size)
    const generated = generateBrandNames(1, needed)
    generated.forEach((b) => namesSet.add(b))

    const allNames = Array.from(namesSet)
    console.log(`Preparing to insert ${allNames.length} brands (Part 1 target ~${TARGET_COUNT_PART1})`)

    const created = await ensureBrands(STORE_ID, allNames)
    console.log(`\n✓ Brands created in Part 1: ${created}`)

    const totalBrands = await prisma.brand.count({ where: { storeId: STORE_ID } })
    console.log(`Total brands in store now: ${totalBrands}`)
  } catch (err) {
    console.error('Brand seeding failed (Part 1):', err)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

main()
