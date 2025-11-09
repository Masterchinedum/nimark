import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const STORE_ID = '146d5c54-75b9-4197-8c94-78be27c89075'

type SizeItem = { name: string; value: string }

async function ensureSizes(storeId: string, group: string, items: SizeItem[]) {
  let created = 0
  console.log(`\nSeeding size group: ${group} (${items.length} items)`) 
  for (const s of items) {
    const exists = await prisma.size.findFirst({ where: { storeId, value: s.value } })
    if (exists) continue
    await prisma.size.create({ data: { storeId, name: s.name, value: s.value } })
    created++
    if (created && created % 50 === 0) console.log(`  + ${created} created in ${group}...`)
  }
  console.log(`  ✓ ${group}: created ${created}, skipped ${items.length - created}`)
  return created
}

function range(start: number, end: number, step = 1): number[] {
  const out: number[] = []
  for (let v = start; v <= end; v = Math.round((v + step) * 100) / 100) out.push(v)
  return out
}

function apparelAlpha(): SizeItem[] {
  const vals = ['XXS','XS','S','M','L','XL','XXL','3XL','4XL','5XL']
  return vals.map(v => ({ name: v, value: v }))
}

function apparelNumericWomenUS(): SizeItem[] {
  return range(0, 20, 1).map(n => ({ name: `Women US ${n}`, value: `W-US-${n}` }))
}

function apparelNumericMenSuit(): SizeItem[] {
  return range(34, 52, 2).map(n => ({ name: `Men Suit ${n}`, value: `M-SUIT-${n}` }))
}

function pantsWaistInches(): SizeItem[] {
  return range(26, 44, 1).map(n => ({ name: `Waist ${n}\"`, value: `W${n}` }))
}

function pantsInseamInches(): SizeItem[] {
  return [28, 30, 32, 34, 36].map(n => ({ name: `Inseam ${n}\"`, value: `L${n}` }))
}

function shoesMenUS(): SizeItem[] {
  const nums: number[] = []
  for (let n = 6; n <= 14; n += 0.5) nums.push(Math.round(n * 2) / 2)
  return nums.map(n => ({ name: `Men US ${n}`, value: `M-US-${n}` }))
}

function shoesWomenUS(): SizeItem[] {
  const nums: number[] = []
  for (let n = 5; n <= 12; n += 0.5) nums.push(Math.round(n * 2) / 2)
  return nums.map(n => ({ name: `Women US ${n}`, value: `W-US-${n}` }))
}

function shoesEU(): SizeItem[] {
  return range(36, 48, 1).map(n => ({ name: `EU ${n}`, value: `EU-${n}` }))
}

function shoesUK(): SizeItem[] {
  return range(3, 13, 0.5).map(n => ({ name: `UK ${n}`, value: `UK-${n}` }))
}

function ringUS(): SizeItem[] {
  return range(4, 13, 0.5).map(n => ({ name: `Ring US ${n}`, value: `R-US-${n}` }))
}

function bras(): SizeItem[] {
  const bands = [30, 32, 34, 36, 38, 40, 42, 44]
  const cups = ['A','B','C','D','DD','E','F']
  const out: SizeItem[] = []
  for (const b of bands) for (const c of cups) out.push({ name: `${b}${c}`, value: `${b}${c}` })
  return out
}

function hats(): SizeItem[] {
  const alpha = ['S','M','L','XL']
  const numeric = ['6 7/8','7','7 1/8','7 1/4','7 3/8','7 1/2','7 5/8','7 3/4','7 7/8','8']
  return [
    ...alpha.map(v => ({ name: `Hat ${v}`, value: `H-${v}` })),
    ...numeric.map(v => ({ name: `Hat ${v}`, value: `H-${v.replace(/\s/,'-')}` })),
  ]
}

function gloves(): SizeItem[] {
  const alpha = ['XS','S','M','L','XL','XXL']
  const numeric = range(6, 11, 1).map(n => String(n))
  return [
    ...alpha.map(v => ({ name: `Glove ${v}`, value: `G-${v}` })),
    ...numeric.map(v => ({ name: `Glove ${v}`, value: `G-${v}` })),
  ]
}

function kids(): SizeItem[] {
  const vals = ['0-3M','3-6M','6-9M','9-12M','12-18M','18-24M','2T','3T','4T','5T','6T','7','8','9','10','11','12','13','14']
  return vals.map(v => ({ name: v, value: v }))
}

function mattress(): SizeItem[] {
  const vals = ['Twin','Twin XL','Full','Queen','King','California King']
  return vals.map(v => ({ name: v, value: v.replace(/\s/g,'-').toUpperCase() }))
}

function tvInches(): SizeItem[] {
  const vals = [24,32,40,43,50,55,60,65,70,75,85]
  return vals.map(v => ({ name: `${v}\"`, value: `${v}-INCH` }))
}

function laptopInches(): SizeItem[] {
  const vals = [11.6,12.5,13.3,14,15,15.6,16,17,17.3]
  return vals.map(v => ({ name: `${v}\"`, value: `${v}-INCH` }))
}

function storageCapacities(): SizeItem[] {
  const gb = [16,32,64,128,256,512].map(n => ({ name: `${n} GB`, value: `${n}GB` }))
  const tb = [1,2,4].map(n => ({ name: `${n} TB`, value: `${n}TB` }))
  return [...gb, ...tb]
}

function ramCapacities(): SizeItem[] {
  return [4,8,16,32,64,128].map(n => ({ name: `${n} GB RAM`, value: `${n}GB-RAM` }))
}

function belts(): SizeItem[] {
  return range(30, 44, 2).map(n => ({ name: `Belt ${n}\"`, value: `BELT-${n}` }))
}

function intlClothingEU(): SizeItem[] {
  return range(44, 62, 2).map(n => ({ name: `EU ${n}`, value: `EU-${n}` }))
}

function intlClothingUK(): SizeItem[] {
  return range(4, 20, 1).map(n => ({ name: `UK ${n}`, value: `UK-${n}` }))
}

async function main() {
  try {
    console.log('Starting wide size seeding...')

    const store = await prisma.store.findUnique({ where: { id: STORE_ID } })
    if (!store) throw new Error(`Store not found: ${STORE_ID}`)
    console.log(`✓ Store: ${store.name}`)

    let totalCreated = 0

    totalCreated += await ensureSizes(STORE_ID, 'Apparel Alpha', apparelAlpha())
    totalCreated += await ensureSizes(STORE_ID, 'Apparel Numeric (Women US)', apparelNumericWomenUS())
    totalCreated += await ensureSizes(STORE_ID, 'Apparel Numeric (Men Suit)', apparelNumericMenSuit())
    totalCreated += await ensureSizes(STORE_ID, 'Pants Waist (inches)', pantsWaistInches())
    totalCreated += await ensureSizes(STORE_ID, 'Pants Inseam (inches)', pantsInseamInches())

    totalCreated += await ensureSizes(STORE_ID, 'Shoes Men US', shoesMenUS())
    totalCreated += await ensureSizes(STORE_ID, 'Shoes Women US', shoesWomenUS())
    totalCreated += await ensureSizes(STORE_ID, 'Shoes EU', shoesEU())
    totalCreated += await ensureSizes(STORE_ID, 'Shoes UK', shoesUK())

    totalCreated += await ensureSizes(STORE_ID, 'Rings US', ringUS())
    totalCreated += await ensureSizes(STORE_ID, 'Bras', bras())
    totalCreated += await ensureSizes(STORE_ID, 'Hats', hats())
    totalCreated += await ensureSizes(STORE_ID, 'Gloves', gloves())
    totalCreated += await ensureSizes(STORE_ID, 'Kids', kids())
    totalCreated += await ensureSizes(STORE_ID, 'Belts', belts())

    totalCreated += await ensureSizes(STORE_ID, 'Mattress', mattress())
    totalCreated += await ensureSizes(STORE_ID, 'TV (inches)', tvInches())
    totalCreated += await ensureSizes(STORE_ID, 'Laptop (inches)', laptopInches())
    totalCreated += await ensureSizes(STORE_ID, 'Storage Capacity', storageCapacities())
    totalCreated += await ensureSizes(STORE_ID, 'RAM Capacity', ramCapacities())

    totalCreated += await ensureSizes(STORE_ID, 'Clothing EU', intlClothingEU())
    totalCreated += await ensureSizes(STORE_ID, 'Clothing UK', intlClothingUK())

    const totalSizes = await prisma.size.count({ where: { storeId: STORE_ID } })
    console.log(`\n✓ Size seeding complete. New sizes created: ${totalCreated}`)
    console.log(`Total sizes in store now: ${totalSizes}`)
  } catch (e) {
    console.error('Size seeding failed:', e)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

main()
