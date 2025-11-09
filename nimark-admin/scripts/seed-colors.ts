import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const STORE_ID = '146d5c54-75b9-4197-8c94-78be27c89075'

interface ColorSeed { name: string; value: string }

// Core palettes
const basicColors: ColorSeed[] = [
  { name: 'Black', value: '#000000' },
  { name: 'White', value: '#FFFFFF' },
  { name: 'Red', value: '#FF0000' },
  { name: 'Green', value: '#00FF00' },
  { name: 'Blue', value: '#0000FF' },
  { name: 'Yellow', value: '#FFFF00' },
  { name: 'Cyan', value: '#00FFFF' },
  { name: 'Magenta', value: '#FF00FF' },
  { name: 'Orange', value: '#FFA500' },
  { name: 'Purple', value: '#800080' },
  { name: 'Pink', value: '#FFC0CB' },
  { name: 'Brown', value: '#8B4513' },
  { name: 'Gray', value: '#808080' },
  { name: 'Silver', value: '#C0C0C0' },
  { name: 'Gold', value: '#FFD700' },
]

// Extended grayscale (0%..100%)
const grayScale: ColorSeed[] = Array.from({ length: 21 }, (_, i) => {
  const pct = i * 5
  const hex = pct.toString(16).padStart(2, '0')
  return { name: `Gray ${pct}%`, value: `#${hex}${hex}${hex}` }
})

// Web named palette (subset)
const webNamed: ColorSeed[] = [
  'AliceBlue','AntiqueWhite','Aquamarine','Azure','Beige','Bisque','BlanchedAlmond','BlueViolet','BurlyWood','CadetBlue','Chartreuse','Chocolate','Coral','CornflowerBlue','Cornsilk','Crimson','DarkBlue','DarkCyan','DarkGoldenRod','DarkGray','DarkGreen','DarkKhaki','DarkMagenta','DarkOrange','DarkOrchid','DarkRed','DarkSalmon','DarkSeaGreen','DarkSlateBlue','DarkSlateGray','DarkTurquoise','DarkViolet','DeepPink','DeepSkyBlue','DimGray','DodgerBlue','FireBrick','FloralWhite','ForestGreen','Fuchsia','Gainsboro','GhostWhite','Gold','GoldenRod','GreenYellow','HoneyDew','HotPink','IndianRed','Indigo','Ivory','Khaki','Lavender','LavenderBlush','LawnGreen','LemonChiffon','LightBlue','LightCoral','LightCyan','LightGoldenRodYellow','LightGray','LightGreen','LightPink','LightSalmon','LightSeaGreen','LightSkyBlue','LightSlateGray','LightSteelBlue','LightYellow','Lime','LimeGreen','Linen','Maroon','MediumAquaMarine','MediumBlue','MediumOrchid','MediumPurple','MediumSeaGreen','MediumSlateBlue','MediumSpringGreen','MediumTurquoise','MediumVioletRed','MidnightBlue','MintCream','MistyRose','Moccasin','NavajoWhite','Navy','OldLace','Olive','OliveDrab','OrangeRed','Orchid','PaleGoldenRod','PaleGreen','PaleTurquoise','PaleVioletRed','PapayaWhip','PeachPuff','Peru','Plum','PowderBlue','RosyBrown','RoyalBlue','SaddleBrown','Salmon','SandyBrown','SeaGreen','SeaShell','Sienna','SkyBlue','SlateBlue','SlateGray','Snow','SpringGreen','SteelBlue','Tan','Teal','Thistle','Tomato','Turquoise','Violet','Wheat','WhiteSmoke','YellowGreen'
].map(n => ({ name: n, value: toCssColor(n) }))

// Helper to convert named to hex by letting browser parse (fallback hard-coded minimal map)
function toCssColor(name: string): string {
  // Minimal named color map (could be expanded). For now rely on dynamic approach is not possible server-side.
  // Hardcode a small subset fallback; rest we keep name but approximate via hashing.
  const fallback: Record<string,string> = {
    AliceBlue: '#F0F8FF', AntiqueWhite: '#FAEBD7', Aquamarine: '#7FFFD4', Azure: '#F0FFFF', Beige: '#F5F5DC', Bisque: '#FFE4C4', BlanchedAlmond: '#FFEBCD', BlueViolet: '#8A2BE2', BurlyWood: '#DEB887', CadetBlue: '#5F9EA0', Chartreuse: '#7FFF00', Chocolate: '#D2691E', Coral: '#FF7F50', CornflowerBlue: '#6495ED', Cornsilk: '#FFF8DC', Crimson: '#DC143C', DarkBlue: '#00008B', DarkCyan: '#008B8B', DarkGoldenRod: '#B8860B', DarkGray: '#A9A9A9', DarkGreen: '#006400', DarkKhaki: '#BDB76B', DarkMagenta: '#8B008B', DarkOrange: '#FF8C00', DarkOrchid: '#9932CC', DarkRed: '#8B0000', DarkSalmon: '#E9967A', DarkSeaGreen: '#8FBC8F', DarkSlateBlue: '#483D8B', DarkSlateGray: '#2F4F4F', DarkTurquoise: '#00CED1', DarkViolet: '#9400D3'
  }
  if (fallback[name]) return fallback[name]
  // Hash name to pseudo color
  let hash = 0
  for (let i=0;i<name.length;i++) hash = (hash*31 + name.charCodeAt(i)) >>> 0
  const r = (hash & 0xFF).toString(16).padStart(2,'0')
  const g = ((hash>>8) & 0xFF).toString(16).padStart(2,'0')
  const b = ((hash>>16) & 0xFF).toString(16).padStart(2,'0')
  return `#${r}${g}${b}`
}

// Skin tone palette (approx Fitzpatrick inspired + cosmetics range)
const skinTones: ColorSeed[] = [
  '#FFE0D6','#F7C9B6','#E7B396','#D29C7C','#BC856B','#A36F58','#8C5A47','#734838','#5A362A'
].map((hex, i) => ({ name: `Skin Tone ${i+1}`, value: hex }))

// Metallic & material special
const specialMaterials: ColorSeed[] = [
  { name: 'Rose Gold', value: '#B76E79' },
  { name: 'Gunmetal', value: '#2C3539' },
  { name: 'Copper', value: '#B87333' },
  { name: 'Bronze', value: '#CD7F32' },
  { name: 'Brass', value: '#B5A642' },
  { name: 'Platinum', value: '#E5E4E2' },
  { name: 'Titanium', value: '#878681' },
  { name: 'Carbon Fiber', value: '#2B2B2B' },
]

// Neon / vibrant palette
const neonColors: ColorSeed[] = [
  { name: 'Neon Green', value: '#39FF14' },
  { name: 'Neon Pink', value: '#FF6EC7' },
  { name: 'Neon Blue', value: '#1F51FF' },
  { name: 'Neon Orange', value: '#FF5F1F' },
  { name: 'Neon Yellow', value: '#E3FF00' },
  { name: 'Neon Purple', value: '#BC13FE' },
  { name: 'Neon Cyan', value: '#00FEFC' },
  { name: 'Neon Red', value: '#FF3131' },
]

// Pastel palette
const pastelColors: ColorSeed[] = [
  { name: 'Pastel Pink', value: '#FFD1DC' },
  { name: 'Pastel Blue', value: '#AEC6CF' },
  { name: 'Pastel Green', value: '#C5E1A5' },
  { name: 'Pastel Yellow', value: '#FFF9C4' },
  { name: 'Pastel Purple', value: '#D7BDE2' },
  { name: 'Pastel Orange', value: '#FFDAB9' },
  { name: 'Pastel Mint', value: '#AAF0D1' },
  { name: 'Pastel Coral', value: '#F7C6C7' },
]

// Generate HSL-based spectrum (e.g., every 10° hue × fixed saturation/lightness)
function generateSpectrum(): ColorSeed[] {
  const out: ColorSeed[] = []
  for (let h=0; h<360; h+=15) { // 24 hues
    out.push({ name: `Hue ${h}`, value: hslToHex(h,70,50) })
  }
  return out
}

function hslToHex(h:number,s:number,l:number): string {
  s/=100; l/=100
  const k = (n:number)=> (n + h/30) % 12
  const a = s * Math.min(l,1-l)
  const f = (n:number)=> l - a * Math.max(-1, Math.min(k(n)-3, Math.min(9-k(n),1)))
  const r = Math.round(255 * f(0)).toString(16).padStart(2,'0')
  const g = Math.round(255 * f(8)).toString(16).padStart(2,'0')
  const b = Math.round(255 * f(4)).toString(16).padStart(2,'0')
  return `#${r}${g}${b}`
}

// Utility: ensure unique by value for the store
async function ensureColors(storeId: string, group: string, colors: ColorSeed[]) {
  let created = 0
  console.log(`\nSeeding color group: ${group} (${colors.length} items)`) 
  for (const c of colors) {
    const exists = await prisma.color.findFirst({ where: { storeId, value: c.value } })
    if (exists) continue
    await prisma.color.create({ data: { storeId, name: c.name, value: c.value } })
    created++
    if (created && created % 50 === 0) console.log(`  + ${created} created in ${group}...`)
  }
  console.log(`  ✓ ${group}: created ${created}, skipped ${colors.length - created}`)
  return created
}

async function main() {
  try {
    console.log('Starting wide color seeding...')
    const store = await prisma.store.findUnique({ where: { id: STORE_ID } })
    if (!store) throw new Error(`Store not found: ${STORE_ID}`)
    console.log(`✓ Store: ${store.name}`)

    let total = 0
    total += await ensureColors(STORE_ID, 'Basic', basicColors)
    total += await ensureColors(STORE_ID, 'Gray Scale', grayScale)
    total += await ensureColors(STORE_ID, 'Web Named', webNamed)
    total += await ensureColors(STORE_ID, 'Skin Tones', skinTones)
    total += await ensureColors(STORE_ID, 'Special Materials', specialMaterials)
    total += await ensureColors(STORE_ID, 'Neon', neonColors)
    total += await ensureColors(STORE_ID, 'Pastel', pastelColors)
    total += await ensureColors(STORE_ID, 'Spectrum', generateSpectrum())

    const count = await prisma.color.count({ where: { storeId: STORE_ID } })
    console.log(`\n✓ Color seeding complete. New colors created: ${total}`)
    console.log(`Total colors in store now: ${count}`)
  } catch (e) {
    console.error('Color seeding failed:', e)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

main()
