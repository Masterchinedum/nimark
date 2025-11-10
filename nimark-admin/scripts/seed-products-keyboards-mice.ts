import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const STORE_ID = '146d5c54-75b9-4197-8c94-78be27c89075'
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'

function productImageUrl(productName: string, index: number = 1): string {
  const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/products/keyboards_mice/${slug}_${index}.jpg`
}

interface ProductTemplate {
  name: string;
  desc: string;
  price: number;
  stock: number;
  type: 'gaming' | 'office';
  featured?: boolean;
  props: Record<string, any>;
}

// Product templates - we'll assign real brands, colors, sizes from DB
const keyboardTemplates: ProductTemplate[] = [
  // Gaming Mechanical Keyboards
  { name: 'RGB Platinum XT Gaming Keyboard', desc: 'Premium mechanical gaming keyboard with RGB backlighting, dedicated macro keys, and aircraft-grade aluminum frame. Features 8MB onboard profile storage.', price: 199.99, stock: 45, type: 'gaming', featured: true, props: { switchType: 'Mechanical', connectivity: 'Wired USB', backlighting: 'RGB Per-Key', macroKeys: 6 } },
  { name: 'BlackWidow Pro Gaming Keyboard', desc: 'Wireless mechanical gaming keyboard with RGB lighting, multi-device connectivity, and up to 200 hours battery life.', price: 229.99, stock: 32, type: 'gaming', featured: true, props: { switchType: 'Mechanical', connectivity: 'Wireless + Wired', backlighting: 'RGB Chroma', batteryLife: '200 hours' } },
  { name: 'Pro X TKL Mechanical Gaming', desc: 'Tenkeyless gaming keyboard with swappable switches, detachable cable, and programmable RGB lighting. Designed for competitive esports.', price: 149.99, stock: 68, type: 'gaming', props: { switchType: 'Mechanical Linear', connectivity: 'Wired USB-C', backlighting: 'RGB Per-Key', formFactor: 'TKL' } },
  { name: 'Apex Pro Gaming Keyboard', desc: 'Adjustable mechanical gaming keyboard with smart display, aircraft-grade aluminum frame, and magnetic wrist rest.', price: 199.99, stock: 41, type: 'gaming', featured: true, props: { switchType: 'Mechanical Adjustable', connectivity: 'Wired USB', backlighting: 'RGB Per-Key', display: 'OLED' } },
  { name: 'Alloy Origins Core TKL', desc: 'Compact mechanical gaming keyboard with linear switches, aircraft-grade aluminum body, and RGB backlighting.', price: 89.99, stock: 92, type: 'gaming', props: { switchType: 'Mechanical Linear', connectivity: 'Wired USB-C', backlighting: 'RGB', formFactor: 'TKL' } },
  { name: 'One 2 Mini 60% RGB Keyboard', desc: '60% mechanical keyboard with dual-layer PCB and seamless RGB LED backlighting. Premium PBT keycaps.', price: 119.99, stock: 54, type: 'gaming', props: { switchType: 'Mechanical Tactile', connectivity: 'Wired USB-C', backlighting: 'RGB', formFactor: '60%', keycaps: 'PBT' } },
  { name: 'K70 RGB MK.2 Full Size', desc: 'Full-size mechanical gaming keyboard with aluminum frame, dedicated volume wheel, and customizable per-key RGB.', price: 169.99, stock: 63, type: 'gaming', props: { switchType: 'Mechanical Tactile', connectivity: 'Wired USB', backlighting: 'RGB Per-Key', mediaControls: true } },
  { name: 'G915 TKL Lightspeed Wireless', desc: 'Wireless mechanical gaming keyboard with low-profile design, RGB lighting, and 40-hour battery life.', price: 229.99, stock: 38, type: 'gaming', featured: true, props: { switchType: 'Low-Profile Tactile', connectivity: 'Wireless + Bluetooth', backlighting: 'RGB', batteryLife: '40 hours' } },
  { name: 'Huntsman Elite Opto-Mechanical', desc: 'Full-size opto-mechanical keyboard with hybrid switches, underglow lighting, and magnetic wrist rest.', price: 199.99, stock: 47, type: 'gaming', props: { switchType: 'Opto-Mechanical', connectivity: 'Wired USB', backlighting: 'RGB + Underglow', wristRest: true } },
  { name: 'ROG Strix Scope RX Gaming', desc: 'Gaming mechanical keyboard with optical switches, RGB lighting, extended Ctrl key, and aluminum top plate.', price: 129.99, stock: 71, type: 'gaming', props: { switchType: 'Optical Linear', connectivity: 'Wired USB', backlighting: 'RGB', features: 'Extended Ctrl Key' } },

  // Membrane Gaming Keyboards
  { name: 'Cynosa V2 RGB Gaming', desc: 'Gaming membrane keyboard with customizable RGB backlighting, dedicated media keys, and spill-resistant design.', price: 59.99, stock: 124, type: 'gaming', props: { switchType: 'Membrane', connectivity: 'Wired USB', backlighting: 'RGB', spillResistant: true } },
  { name: 'K55 RGB PRO Gaming', desc: 'Budget gaming keyboard with RGB backlighting, dedicated macro keys, dust and spill resistant design.', price: 49.99, stock: 156, type: 'gaming', props: { switchType: 'Membrane', connectivity: 'Wired USB', backlighting: 'RGB 5-Zone', macroKeys: 6 } },
  { name: 'G213 Prodigy Gaming', desc: 'RGB gaming keyboard with Mech-Dome keys, integrated palm rest, media controls, and adjustable feet.', price: 69.99, stock: 98, type: 'gaming', props: { switchType: 'Mech-Dome', connectivity: 'Wired USB', backlighting: 'RGB 5-Zone', palmRest: true } },
  { name: 'TUF Gaming K1 Membrane', desc: 'Membrane gaming keyboard with tactile switches, RGB backlighting, programmable keys, and spill resistance.', price: 59.99, stock: 111, type: 'gaming', props: { switchType: 'Membrane', connectivity: 'Wired USB', backlighting: 'RGB', spillResistant: true } },
  { name: 'Kumara Budget Gaming TKL', desc: 'Budget mechanical gaming keyboard with blue switches, red backlighting, and compact tenkeyless design.', price: 39.99, stock: 178, type: 'gaming', props: { switchType: 'Mechanical Clicky', connectivity: 'Wired USB', backlighting: 'Red LED', formFactor: 'TKL' } },

  // Office/Productivity Keyboards
  { name: 'MX Keys Advanced Wireless', desc: 'Advanced wireless illuminated keyboard with smart backlighting, multi-device connectivity, USB-C charging, and perfect key stability.', price: 119.99, stock: 87, type: 'office', featured: true, props: { connectivity: 'Bluetooth + USB Receiver', backlighting: 'Smart Illumination', batteryLife: '10 days', multiDevice: 3 } },
  { name: 'Surface Wireless Keyboard', desc: 'Bluetooth keyboard with low-profile design, chiclet keys, and seamless integration with Windows devices.', price: 99.99, stock: 64, type: 'office', props: { connectivity: 'Bluetooth', layout: 'Full-size', compatibility: 'Windows, Android, iOS' } },
  { name: 'Magic Keyboard Wireless', desc: 'Wireless rechargeable keyboard with optimized key travel, low-profile design, and seamless pairing.', price: 99.00, stock: 73, type: 'office', props: { connectivity: 'Bluetooth', batteryLife: '1 month', charging: 'Lightning' } },
  { name: 'K2 Wireless Mechanical 75%', desc: '75% layout mechanical keyboard with hot-swappable switches, RGB backlighting, and multi-OS compatibility.', price: 89.99, stock: 91, type: 'office', props: { switchType: 'Mechanical', connectivity: 'Bluetooth + Wired', backlighting: 'RGB', formFactor: '75%', hotSwap: true } },
  { name: 'Sculpt Ergonomic Wireless', desc: 'Wireless ergonomic keyboard with split keyset design, cushioned palm rest, and natural arc layout to reduce wrist strain.', price: 79.99, stock: 56, type: 'office', props: { connectivity: 'USB Wireless Receiver', layout: 'Split Ergonomic', palmRest: true, numPad: 'Separate' } },
  { name: 'Ergo K860 Split Wireless', desc: 'Wireless split keyboard with curved design, adjustable palm lift, and pillowed wrist rest for all-day comfort.', price: 129.99, stock: 42, type: 'office', props: { connectivity: 'Bluetooth + USB Receiver', layout: 'Split Curved', palmRest: 'Integrated', multiDevice: 3 } },
  { name: 'Freestyle Pro Split Mechanical', desc: 'Mechanical split keyboard with adjustable split distance and optional tenting accessories.', price: 179.99, stock: 28, type: 'office', props: { switchType: 'Mechanical', connectivity: 'Wired USB', layout: 'Split Adjustable', splitDistance: '0-20 inches' } },
  { name: 'Anne Pro 2 Compact 60%', desc: '60% mechanical keyboard with wireless connectivity, RGB per-key lighting, and programmable macro support.', price: 89.99, stock: 102, type: 'office', props: { switchType: 'Mechanical', connectivity: 'Bluetooth + Wired USB-C', backlighting: 'RGB Per-Key', formFactor: '60%' } },
  { name: 'Race 3 Compact 75%', desc: '75% layout mechanical keyboard with premium PBT keycaps and aluminum case.', price: 139.99, stock: 37, type: 'office', props: { switchType: 'Mechanical', connectivity: 'Wired USB', keycaps: 'PBT DSA', formFactor: '75%', case: 'Aluminum' } },
  { name: 'CK530 RGB Mechanical', desc: 'RGB mechanical keyboard with brushed aluminum top plate and on-the-fly controls.', price: 89.99, stock: 67, type: 'office', props: { switchType: 'Mechanical', connectivity: 'Wired USB', backlighting: 'RGB', topPlate: 'Aluminum' } },
  { name: 'Vulcan TKL Pro Optical', desc: 'Linear optical gaming keyboard with detachable USB-C cable and RGB lighting.', price: 159.99, stock: 39, type: 'gaming', props: { switchType: 'Optical Linear', connectivity: 'Wired USB-C', backlighting: 'RGB', formFactor: 'TKL' } },
  { name: 'Streak65 LP Low-Profile', desc: 'Low-profile 65% mechanical keyboard with hot-swappable PCB and programmable RGB.', price: 119.99, stock: 52, type: 'gaming', props: { switchType: 'Low-Profile Mechanical', connectivity: 'Wired USB-C', backlighting: 'RGB', formFactor: '65%', hotSwap: true } },
]

const mouseTemplates: ProductTemplate[] = [
  // Gaming Mice
  { name: 'G502 HERO Gaming Mouse', desc: 'High-performance gaming mouse with 25K sensor, 11 programmable buttons, adjustable weights, and RGB lighting.', price: 79.99, stock: 134, type: 'gaming', featured: true, props: { dpi: 25600, sensor: 'Optical', buttons: 11, weight: 'Adjustable', cable: 'Braided' } },
  { name: 'DeathAdder V3 Gaming', desc: 'Ergonomic gaming mouse with 30K optical sensor, lightweight design, and customizable RGB.', price: 69.99, stock: 118, type: 'gaming', featured: true, props: { dpi: 30000, sensor: 'Optical', buttons: 8, weight: '59g', cable: 'Speedflex' } },
  { name: 'Rival 3 Gaming Mouse', desc: 'Lightweight gaming mouse with precision sensor, RGB lighting, and durable mechanical switches.', price: 29.99, stock: 187, type: 'gaming', props: { dpi: 8500, sensor: 'Optical', buttons: 6, weight: '77g', switches: '60M clicks' } },
  { name: 'Dark Core RGB Pro Wireless', desc: 'Wireless gaming mouse with 18,000 DPI sensor, sub-1ms wireless, Qi charging, and customizable side grips.', price: 89.99, stock: 76, type: 'gaming', props: { dpi: 18000, sensor: 'Optical', buttons: 8, connectivity: 'Wireless + Bluetooth + Wired', charging: 'Qi + USB-C' } },
  { name: 'Viper Ultimate Wireless', desc: 'Ambidextrous wireless gaming mouse with optical sensor, 8 programmable buttons, and charging dock with RGB.', price: 149.99, stock: 54, type: 'gaming', featured: true, props: { dpi: 20000, sensor: 'Optical', buttons: 8, weight: '74g', batteryLife: '70 hours', dock: true } },
  { name: 'Pro X Superlight Wireless', desc: 'Ultra-lightweight wireless gaming mouse designed for esports with premium sensor and 70-hour battery life.', price: 159.99, stock: 48, type: 'gaming', featured: true, props: { dpi: 25600, sensor: 'Optical', buttons: 5, weight: '63g', batteryLife: '70 hours' } },
  { name: 'Model O Lightweight', desc: 'Lightweight honeycomb gaming mouse with RGB lighting and premium cable.', price: 49.99, stock: 143, type: 'gaming', props: { dpi: 12000, sensor: 'Optical', buttons: 6, weight: '67g', design: 'Honeycomb' } },
  { name: 'Ultralight 2 Gaming', desc: 'Ultra-lightweight gaming mouse with premium sensor and phantom cord.', price: 89.99, stock: 31, type: 'gaming', props: { dpi: 3200, sensor: 'Optical', buttons: 6, weight: '47g', cable: 'Phantom Cord' } },
  { name: 'Rival 600 Dual Sensor', desc: 'Dual sensor gaming mouse with customizable weight system and 96-zone RGB lighting.', price: 79.99, stock: 68, type: 'gaming', props: { dpi: 12000, sensor: 'Dual Optical', buttons: 7, weight: 'Adjustable 96g', dualSensor: true } },
  { name: 'Pulsefire Haste Lightweight', desc: 'Ultra-lightweight honeycomb shell gaming mouse with premium switches and flexible cable.', price: 49.99, stock: 96, type: 'gaming', props: { dpi: 16000, sensor: 'Optical', buttons: 6, weight: '59g', design: 'Honeycomb' } },
  { name: 'Basilisk V3 Gaming', desc: 'Ergonomic gaming mouse with 11 programmable buttons, RGB lighting, and customizable scroll wheel.', price: 69.99, stock: 87, type: 'gaming', props: { dpi: 26000, sensor: 'Optical', buttons: 11, backlighting: 'RGB 11-Zone', scrollWheel: 'Customizable' } },
  { name: 'G305 Lightspeed Wireless', desc: 'Wireless gaming mouse with HERO sensor, 250-hour battery life, and ultra-fast 1ms report rate.', price: 49.99, stock: 134, type: 'gaming', props: { dpi: 12000, sensor: 'Optical', buttons: 6, weight: '99g', batteryLife: '250 hours', reportRate: '1ms' } },

  // Office/Productivity Mice
  { name: 'MX Master 3S Wireless', desc: 'Advanced wireless mouse with 8K DPI sensor, quiet clicks, USB-C charging, and multi-device connectivity.', price: 99.99, stock: 92, type: 'office', featured: true, props: { dpi: 8000, sensor: 'Darkfield', buttons: 7, connectivity: 'Bluetooth + USB Receiver', batteryLife: '70 days', quietClicks: true } },
  { name: 'Surface Precision Mouse', desc: 'Bluetooth mouse with customizable buttons, adjustable scroll speed, and premium design for productivity.', price: 99.99, stock: 58, type: 'office', props: { dpi: 3200, buttons: 6, connectivity: 'Bluetooth', batteryLife: '3 months' } },
  { name: 'MX Anywhere 3 Compact', desc: 'Compact wireless mouse with 4,000 DPI sensor, fast scrolling, and portable design for on-the-go productivity.', price: 79.99, stock: 107, type: 'office', props: { dpi: 4000, sensor: 'Darkfield', buttons: 6, connectivity: 'Bluetooth + USB Receiver', batteryLife: '70 days', size: 'Compact' } },
  { name: 'Magic Mouse 2 Wireless', desc: 'Wireless rechargeable mouse with Multi-Touch surface and optimized design.', price: 79.00, stock: 81, type: 'office', props: { connectivity: 'Bluetooth', charging: 'Lightning', batteryLife: '1 month', multiTouch: true } },
  { name: 'MX Ergo Wireless Trackball', desc: 'Advanced wireless trackball with adjustable angle, precision mode button, and easy-reach buttons.', price: 99.99, stock: 47, type: 'office', props: { dpi: 2048, buttons: 8, connectivity: 'Bluetooth + USB Receiver', angle: 'Adjustable 0-20°', batteryLife: '4 months' } },
  { name: 'Expert Wireless Trackball', desc: 'Large trackball mouse with scroll ring, four customizable buttons, and ergonomic wrist rest.', price: 119.99, stock: 33, type: 'office', props: { connectivity: 'Wireless 2.4GHz', buttons: 4, scrollRing: true, wristRest: 'Detachable', batteryLife: '12 months' } },
]

const comboTemplates: ProductTemplate[] = [
  { name: 'MK545 Advanced Wireless Combo', desc: 'Wireless keyboard and mouse combo with unified receiver, cushioned palm rest, and comfortable contoured mouse.', price: 59.99, stock: 94, type: 'office', props: { connectivity: 'Unifying Receiver', keyboardBattery: '36 months', mouseBattery: '18 months', palmRest: true } },
  { name: 'K55 + Harpoon RGB Gaming Combo', desc: 'Gaming combo with RGB keyboard and 6-button gaming mouse, dedicated macro keys.', price: 79.99, stock: 72, type: 'gaming', props: { connectivity: 'Wired USB', keyboardBacklight: 'RGB 5-Zone', mouseDPI: 12000 } },
  { name: 'Turret for Xbox Wireless Combo', desc: 'Wireless keyboard and mouse combo designed for Xbox, with dedicated Xbox button and retractable mouse mat.', price: 249.99, stock: 24, type: 'gaming', props: { connectivity: 'Xbox Wireless', batteryLife: '43 hours', mouseMat: 'Retractable', xboxButton: true } },
  { name: 'Wireless Desktop 900 Combo', desc: 'Basic wireless keyboard and mouse combo with quiet keys and plug-and-play setup.', price: 29.99, stock: 156, type: 'office', props: { connectivity: 'Wireless 2.4GHz', batteryLife: '12 months', setup: 'Plug and Play' } },
  { name: 'MK270 Wireless Budget Combo', desc: 'Budget wireless combo with spill-resistant keyboard, comfortable mouse, and extended battery life.', price: 24.99, stock: 203, type: 'office', props: { connectivity: 'Unifying Receiver', keyboardBattery: '36 months', mouseBattery: '12 months', spillResistant: true } },
]

async function main() {
  try {
    console.log('Starting Keyboards & Mice product seeding...')
    console.log(`Store ID: ${STORE_ID}\n`)

    const store = await prisma.store.findUnique({ where: { id: STORE_ID } })
    if (!store) throw new Error(`Store not found: ${STORE_ID}`)
    console.log(`✓ Store: ${store.name}\n`)

    // Get the "Keyboards & Mice" category
    const category = await prisma.category.findFirst({
      where: { storeId: STORE_ID, name: 'Keyboards & Mice' }
    })
    if (!category) throw new Error('Category "Keyboards & Mice" not found')
    console.log(`✓ Category: ${category.name} (ID: ${category.id})\n`)

    // Get all available brands
    const allBrands = await prisma.brand.findMany({
      where: { storeId: STORE_ID },
      select: { id: true, name: true }
    })
    console.log(`✓ Found ${allBrands.length} brands\n`)

    // Get all available colors
    const allColors = await prisma.color.findMany({
      where: { storeId: STORE_ID },
      select: { id: true, name: true }
    })
    console.log(`✓ Found ${allColors.length} colors\n`)

    // Get all available sizes
    const allSizes = await prisma.size.findMany({
      where: { storeId: STORE_ID },
      select: { id: true, name: true }
    })
    console.log(`✓ Found ${allSizes.length} sizes\n`)

    if (allBrands.length === 0 || allColors.length === 0 || allSizes.length === 0) {
      throw new Error('Missing required data: brands, colors, or sizes not seeded')
    }

    // Helper to get random item from array
    const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

    // Preferred brands for gaming peripherals
    const gamingBrands = allBrands.filter(b => 
      ['Razer', 'Corsair', 'Logitech', 'SteelSeries', 'HyperX', 'ASUS', 'Asus', 'Cooler Master'].some(name => 
        b.name.toLowerCase().includes(name.toLowerCase())
      )
    )
    
    // Preferred brands for office peripherals
    const officeBrands = allBrands.filter(b => 
      ['Logitech', 'Microsoft', 'Apple', 'Dell', 'HP'].some(name => 
        b.name.toLowerCase().includes(name.toLowerCase())
      )
    )

    // Common colors for peripherals
    const peripheralColors = allColors.filter(c => 
      ['Black', 'White', 'Gray', 'Grey', 'Silver', 'Red'].some(name => 
        c.name.toLowerCase().includes(name.toLowerCase())
      )
    )

    // Standard sizes for peripherals (or just pick any)
    const peripheralSizes = allSizes.filter(s => 
      ['Standard', 'M', 'L', 'S', 'One Size'].some(name => 
        s.name.toLowerCase() === name.toLowerCase()
      )
    )

    // Fallback if no matching sizes found
    const usableSizes = peripheralSizes.length > 0 ? peripheralSizes : allSizes

    let created = 0

    // Seed keyboards
    for (const template of keyboardTemplates) {
      try {
        // Check if already exists
        const existing = await prisma.product.findFirst({
          where: { storeId: STORE_ID, name: template.name }
        })
        if (existing) {
          console.log(`  ⊘ Skipped "${template.name}" (already exists)`)
          continue
        }

        // Pick appropriate brand
        const brandPool = template.type === 'gaming' && gamingBrands.length > 0 ? gamingBrands : 
                         template.type === 'office' && officeBrands.length > 0 ? officeBrands : 
                         allBrands
        const brand = randomItem(brandPool)
        const color = peripheralColors.length > 0 ? randomItem(peripheralColors) : randomItem(allColors)
        const size = randomItem(usableSizes)

        // Create product with 1-3 images
        const imageCount = Math.floor(Math.random() * 3) + 1
        const images = Array.from({ length: imageCount }, (_, i) => ({
          url: productImageUrl(template.name, i + 1)
        }))

        await prisma.product.create({
          data: {
            storeId: STORE_ID,
            name: template.name,
            description: template.desc,
            price: template.price,
            stock: template.stock,
            categoryId: category.id,
            brandId: brand.id,
            colorId: color.id,
            sizeId: size.id,
            isFeatured: template.featured || false,
            isArchived: false,
            properties: template.props || {},
            images: {
              create: images
            }
          }
        })

        created++
        if (created % 10 === 0) {
          console.log(`  ✓ Created ${created} products...`)
        }
      } catch (error) {
        console.error(`  ✗ Failed to create "${template.name}":`, error instanceof Error ? error.message : error)
      }
    }

    // Seed mice
    for (const template of mouseTemplates) {
      try {
        const existing = await prisma.product.findFirst({
          where: { storeId: STORE_ID, name: template.name }
        })
        if (existing) {
          console.log(`  ⊘ Skipped "${template.name}" (already exists)`)
          continue
        }

        const brandPool = template.type === 'gaming' && gamingBrands.length > 0 ? gamingBrands : 
                         template.type === 'office' && officeBrands.length > 0 ? officeBrands : 
                         allBrands
        const brand = randomItem(brandPool)
        const color = peripheralColors.length > 0 ? randomItem(peripheralColors) : randomItem(allColors)
        const size = randomItem(usableSizes)

        const imageCount = Math.floor(Math.random() * 3) + 1
        const images = Array.from({ length: imageCount }, (_, i) => ({
          url: productImageUrl(template.name, i + 1)
        }))

        await prisma.product.create({
          data: {
            storeId: STORE_ID,
            name: template.name,
            description: template.desc,
            price: template.price,
            stock: template.stock,
            categoryId: category.id,
            brandId: brand.id,
            colorId: color.id,
            sizeId: size.id,
            isFeatured: template.featured || false,
            isArchived: false,
            properties: template.props || {},
            images: {
              create: images
            }
          }
        })

        created++
        if (created % 10 === 0) {
          console.log(`  ✓ Created ${created} products...`)
        }
      } catch (error) {
        console.error(`  ✗ Failed to create "${template.name}":`, error instanceof Error ? error.message : error)
      }
    }

    // Seed combos
    for (const template of comboTemplates) {
      try {
        const existing = await prisma.product.findFirst({
          where: { storeId: STORE_ID, name: template.name }
        })
        if (existing) {
          console.log(`  ⊘ Skipped "${template.name}" (already exists)`)
          continue
        }

        const brandPool = template.type === 'gaming' && gamingBrands.length > 0 ? gamingBrands : 
                         template.type === 'office' && officeBrands.length > 0 ? officeBrands : 
                         allBrands
        const brand = randomItem(brandPool)
        const color = peripheralColors.length > 0 ? randomItem(peripheralColors) : randomItem(allColors)
        const size = randomItem(usableSizes)

        const imageCount = Math.floor(Math.random() * 3) + 1
        const images = Array.from({ length: imageCount }, (_, i) => ({
          url: productImageUrl(template.name, i + 1)
        }))

        await prisma.product.create({
          data: {
            storeId: STORE_ID,
            name: template.name,
            description: template.desc,
            price: template.price,
            stock: template.stock,
            categoryId: category.id,
            brandId: brand.id,
            colorId: color.id,
            sizeId: size.id,
            isFeatured: template.featured || false,
            isArchived: false,
            properties: template.props || {},
            images: {
              create: images
            }
          }
        })

        created++
        if (created % 10 === 0) {
          console.log(`  ✓ Created ${created} products...`)
        }
      } catch (error) {
        console.error(`  ✗ Failed to create "${template.name}":`, error instanceof Error ? error.message : error)
      }
    }

    const totalProducts = await prisma.product.count({ where: { storeId: STORE_ID } })

    console.log(`\n✓ Product seeding complete!`)
    console.log(`Products created: ${created}`)
    console.log(`Total products in store: ${totalProducts}`)
  } catch (error) {
    console.error('Product seeding failed:', error)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

main()
