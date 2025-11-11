import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const STORE_ID = '146d5c54-75b9-4197-8c94-78be27c89075'
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'

function productImageUrl(productName: string, index: number = 1): string {
  const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/products/mobile_phones/${slug}_${index}.jpg`
}

interface ProductTemplate {
  name: string
  desc: string
  price: number
  stock: number
  category: string
  featured?: boolean
  props: Record<string, any>
}

// Flagship Android Phones
const flagshipAndroid: ProductTemplate[] = [
  { name: 'Samsung Galaxy S24 Ultra', desc: '6.8" Dynamic AMOLED 2X, Snapdragon 8 Gen 3, 12GB RAM, 256GB storage. 200MP camera with AI Zoom, titanium frame, S Pen included.', price: 1299.99, stock: 45, category: 'Flagship Android Phones', featured: true, props: { display: '6.8" QHD+ 120Hz', processor: 'Snapdragon 8 Gen 3', ram: '12GB', storage: '256GB', camera: '200MP + 50MP + 12MP + 10MP', battery: '5000mAh', sPen: true } },
  { name: 'Samsung Galaxy S24+', desc: '6.7" Dynamic AMOLED 2X 120Hz, Snapdragon 8 Gen 3, 12GB RAM, 256GB storage. Triple camera system with AI enhancements.', price: 999.99, stock: 62, category: 'Flagship Android Phones', featured: true, props: { display: '6.7" QHD+ 120Hz', processor: 'Snapdragon 8 Gen 3', ram: '12GB', storage: '256GB', camera: '50MP + 12MP + 10MP', battery: '4900mAh' } },
  { name: 'Google Pixel 8 Pro', desc: '6.7" LTPO OLED 120Hz, Google Tensor G3, 12GB RAM, 128GB storage. Best-in-class AI photography and video editing features.', price: 999.99, stock: 38, category: 'Flagship Android Phones', featured: true, props: { display: '6.7" QHD+ 120Hz', processor: 'Google Tensor G3', ram: '12GB', storage: '128GB', camera: '50MP + 48MP + 48MP', battery: '5050mAh', aiFeatures: true } },
  { name: 'OnePlus 12', desc: '6.82" LTPO AMOLED 120Hz, Snapdragon 8 Gen 3, 16GB RAM, 256GB storage. Hasselblad cameras, 100W SuperVOOC charging.', price: 899.99, stock: 51, category: 'Flagship Android Phones', props: { display: '6.82" QHD+ 120Hz', processor: 'Snapdragon 8 Gen 3', ram: '16GB', storage: '256GB', camera: '50MP Hasselblad + 64MP + 48MP', battery: '5400mAh', fastCharging: '100W' } },
  { name: 'Xiaomi 14 Pro', desc: '6.73" LTPO AMOLED 120Hz, Snapdragon 8 Gen 3, 12GB RAM, 256GB storage. Leica optics, 120W HyperCharge.', price: 999.99, stock: 42, category: 'Flagship Android Phones', props: { display: '6.73" QHD+ 120Hz', processor: 'Snapdragon 8 Gen 3', ram: '12GB', storage: '256GB', camera: '50MP Leica + 50MP + 50MP', battery: '4880mAh', fastCharging: '120W' } },
  { name: 'OPPO Find X7 Ultra', desc: '6.82" LTPO AMOLED 120Hz, Snapdragon 8 Gen 3, 16GB RAM, 512GB storage. Dual periscope cameras, Hasselblad tuning.', price: 1199.99, stock: 28, category: 'Flagship Android Phones', props: { display: '6.82" QHD+ 120Hz', processor: 'Snapdragon 8 Gen 3', ram: '16GB', storage: '512GB', camera: '50MP + 50MP + 50MP + 50MP', battery: '5000mAh', periscope: 'Dual' } },
  { name: 'Vivo X100 Pro', desc: '6.78" LTPO AMOLED 120Hz, MediaTek Dimensity 9300, 16GB RAM, 512GB storage. ZEISS optics with 1" sensor.', price: 1099.99, stock: 33, category: 'Flagship Android Phones', props: { display: '6.78" QHD+ 120Hz', processor: 'Dimensity 9300', ram: '16GB', storage: '512GB', camera: '50MP ZEISS + 50MP + 50MP', battery: '5400mAh', oneinchSensor: true } },
  { name: 'Sony Xperia 1 VI', desc: '6.5" 4K HDR OLED 120Hz, Snapdragon 8 Gen 3, 12GB RAM, 256GB storage. ZEISS lenses, 3.5mm jack, microSD slot.', price: 1399.99, stock: 19, category: 'Flagship Android Phones', props: { display: '6.5" 4K 120Hz', processor: 'Snapdragon 8 Gen 3', ram: '12GB', storage: '256GB', camera: '52MP ZEISS + 12MP + 12MP', battery: '5000mAh', headphoneJack: true } },
  { name: 'ASUS ROG Phone 8 Pro', desc: '6.78" Samsung AMOLED 165Hz, Snapdragon 8 Gen 3, 24GB RAM, 1TB storage. Gaming powerhouse with AirTrigger controls.', price: 1499.99, stock: 15, category: 'Flagship Android Phones', props: { display: '6.78" FHD+ 165Hz', processor: 'Snapdragon 8 Gen 3', ram: '24GB', storage: '1TB', camera: '50MP + 13MP + 5MP', battery: '5500mAh', gaming: true, refreshRate: '165Hz' } },
]

// Mid-Range Android Phones
const midRangeAndroid: ProductTemplate[] = [
  { name: 'Samsung Galaxy A54 5G', desc: '6.4" Super AMOLED 120Hz, Exynos 1380, 8GB RAM, 256GB storage. Triple camera with OIS, IP67 water resistance.', price: 449.99, stock: 78, category: 'Mid-Range Android Phones', props: { display: '6.4" FHD+ 120Hz', processor: 'Exynos 1380', ram: '8GB', storage: '256GB', camera: '50MP + 12MP + 5MP', battery: '5000mAh', waterproof: 'IP67' } },
  { name: 'Google Pixel 7a', desc: '6.1" OLED 90Hz, Google Tensor G2, 8GB RAM, 128GB storage. Flagship camera experience at mid-range price.', price: 499.99, stock: 86, category: 'Mid-Range Android Phones', featured: true, props: { display: '6.1" FHD+ 90Hz', processor: 'Google Tensor G2', ram: '8GB', storage: '128GB', camera: '64MP + 13MP', battery: '4385mAh', wirelessCharging: true } },
  { name: 'OnePlus 12R', desc: '6.78" AMOLED 120Hz, Snapdragon 8 Gen 2, 8GB RAM, 128GB storage. Flagship performance at mid-range price, 100W charging.', price: 599.99, stock: 71, category: 'Mid-Range Android Phones', props: { display: '6.78" FHD+ 120Hz', processor: 'Snapdragon 8 Gen 2', ram: '8GB', storage: '128GB', camera: '50MP + 8MP + 2MP', battery: '5500mAh', fastCharging: '100W' } },
  { name: 'Xiaomi Redmi Note 13 Pro+', desc: '6.67" AMOLED 120Hz, MediaTek Dimensity 7200, 12GB RAM, 256GB storage. 200MP camera, 120W HyperCharge.', price: 399.99, stock: 94, category: 'Mid-Range Android Phones', props: { display: '6.67" FHD+ 120Hz', processor: 'Dimensity 7200', ram: '12GB', storage: '256GB', camera: '200MP + 8MP + 2MP', battery: '5000mAh', fastCharging: '120W' } },
  { name: 'Motorola Edge 40 Pro', desc: '6.67" pOLED 165Hz, Snapdragon 8 Gen 2, 12GB RAM, 256GB storage. Clean Android, 125W TurboPower charging.', price: 699.99, stock: 52, category: 'Mid-Range Android Phones', props: { display: '6.67" FHD+ 165Hz', processor: 'Snapdragon 8 Gen 2', ram: '12GB', storage: '256GB', camera: '50MP + 50MP + 12MP', battery: '4600mAh', fastCharging: '125W' } },
  { name: 'Nothing Phone 2', desc: '6.7" LTPO AMOLED 120Hz, Snapdragon 8+ Gen 1, 12GB RAM, 256GB storage. Unique Glyph Interface, wireless charging.', price: 599.99, stock: 63, category: 'Mid-Range Android Phones', props: { display: '6.7" FHD+ 120Hz', processor: 'Snapdragon 8+ Gen 1', ram: '12GB', storage: '256GB', camera: '50MP + 50MP', battery: '4700mAh', glyphInterface: true } },
  { name: 'OPPO Reno 11 Pro', desc: '6.7" AMOLED 120Hz, MediaTek Dimensity 8200, 12GB RAM, 256GB storage. Portrait camera expert, 80W SuperVOOC.', price: 549.99, stock: 58, category: 'Mid-Range Android Phones', props: { display: '6.7" FHD+ 120Hz', processor: 'Dimensity 8200', ram: '12GB', storage: '256GB', camera: '50MP + 32MP + 8MP', battery: '4600mAh', fastCharging: '80W' } },
  { name: 'Realme GT 5 Pro', desc: '6.78" LTPO AMOLED 144Hz, Snapdragon 8 Gen 3, 12GB RAM, 256GB storage. Flagship specs at mid-range price, 100W charging.', price: 649.99, stock: 47, category: 'Mid-Range Android Phones', props: { display: '6.78" QHD+ 144Hz', processor: 'Snapdragon 8 Gen 3', ram: '12GB', storage: '256GB', camera: '50MP + 50MP + 8MP', battery: '5400mAh', fastCharging: '100W' } },
  { name: 'Honor 90 Pro', desc: '6.78" AMOLED 120Hz, Snapdragon 8+ Gen 1, 12GB RAM, 512GB storage. 200MP main camera, 90W fast charging.', price: 599.99, stock: 54, category: 'Mid-Range Android Phones', props: { display: '6.78" FHD+ 120Hz', processor: 'Snapdragon 8+ Gen 1', ram: '12GB', storage: '512GB', camera: '200MP + 12MP + 2MP', battery: '5000mAh', fastCharging: '90W' } },
  { name: 'Samsung Galaxy A34 5G', desc: '6.6" Super AMOLED 120Hz, MediaTek Dimensity 1080, 8GB RAM, 256GB storage. Great display and battery life.', price: 379.99, stock: 89, category: 'Mid-Range Android Phones', props: { display: '6.6" FHD+ 120Hz', processor: 'Dimensity 1080', ram: '8GB', storage: '256GB', camera: '48MP + 8MP + 5MP', battery: '5000mAh', waterproof: 'IP67' } },
]

// Budget Android Phones
const budgetAndroid: ProductTemplate[] = [
  { name: 'Samsung Galaxy A14 5G', desc: '6.6" PLS LCD 90Hz, MediaTek Dimensity 700, 4GB RAM, 128GB storage. Affordable 5G with large display.', price: 199.99, stock: 142, category: 'Budget Android Phones', props: { display: '6.6" FHD+ 90Hz', processor: 'Dimensity 700', ram: '4GB', storage: '128GB', camera: '50MP + 2MP + 2MP', battery: '5000mAh', network: '5G' } },
  { name: 'Motorola Moto G Power 5G', desc: '6.5" IPS LCD 120Hz, MediaTek Dimensity 930, 6GB RAM, 256GB storage. Massive 5000mAh battery.', price: 299.99, stock: 118, category: 'Budget Android Phones', props: { display: '6.5" FHD+ 120Hz', processor: 'Dimensity 930', ram: '6GB', storage: '256GB', camera: '50MP + 2MP', battery: '5000mAh', network: '5G' } },
  { name: 'Xiaomi Redmi 12', desc: '6.79" IPS LCD 90Hz, MediaTek Helio G88, 8GB RAM, 256GB storage. Great value with large screen.', price: 179.99, stock: 167, category: 'Budget Android Phones', props: { display: '6.79" FHD+ 90Hz', processor: 'Helio G88', ram: '8GB', storage: '256GB', camera: '50MP + 8MP + 2MP', battery: '5000mAh', fastCharging: '18W' } },
  { name: 'OnePlus Nord N30 5G', desc: '6.72" IPS LCD 120Hz, Snapdragon 695, 8GB RAM, 128GB storage. Fast charging and clean OxygenOS.', price: 299.99, stock: 103, category: 'Budget Android Phones', props: { display: '6.72" FHD+ 120Hz', processor: 'Snapdragon 695', ram: '8GB', storage: '128GB', camera: '108MP + 2MP + 2MP', battery: '5000mAh', fastCharging: '50W' } },
  { name: 'Google Pixel 6a', desc: '6.1" OLED 60Hz, Google Tensor, 6GB RAM, 128GB storage. Excellent camera and software experience.', price: 349.99, stock: 78, category: 'Budget Android Phones', props: { display: '6.1" FHD+ 60Hz', processor: 'Google Tensor', ram: '6GB', storage: '128GB', camera: '12.2MP + 12MP', battery: '4410mAh', wirelessCharging: true } },
  { name: 'Nokia G42 5G', desc: '6.56" IPS LCD 90Hz, Snapdragon 480+, 6GB RAM, 128GB storage. Pure Android One experience, repairable design.', price: 249.99, stock: 95, category: 'Budget Android Phones', props: { display: '6.56" HD+ 90Hz', processor: 'Snapdragon 480+', ram: '6GB', storage: '128GB', camera: '50MP + 2MP + 2MP', battery: '5000mAh', androidOne: true } },
  { name: 'Realme C55', desc: '6.72" IPS LCD 90Hz, MediaTek Helio G88, 8GB RAM, 256GB storage. AI camera features, 33W fast charging.', price: 199.99, stock: 128, category: 'Budget Android Phones', props: { display: '6.72" FHD+ 90Hz', processor: 'Helio G88', ram: '8GB', storage: '256GB', camera: '64MP + 2MP', battery: '5000mAh', fastCharging: '33W' } },
  { name: 'TCL 40 SE', desc: '6.75" IPS LCD 90Hz, MediaTek Helio G37, 6GB RAM, 256GB storage. Large display on a budget.', price: 169.99, stock: 145, category: 'Budget Android Phones', props: { display: '6.75" HD+ 90Hz', processor: 'Helio G37', ram: '6GB', storage: '256GB', camera: '50MP + 2MP + 2MP', battery: '5000mAh' } },
  { name: 'OPPO A78 5G', desc: '6.56" IPS LCD 90Hz, MediaTek Dimensity 700, 8GB RAM, 128GB storage. 5G connectivity at budget price.', price: 249.99, stock: 112, category: 'Budget Android Phones', props: { display: '6.56" HD+ 90Hz', processor: 'Dimensity 700', ram: '8GB', storage: '128GB', camera: '50MP + 2MP', battery: '5000mAh', fastCharging: '33W' } },
  { name: 'Motorola Moto G Play 2024', desc: '6.5" IPS LCD, MediaTek Helio G37, 3GB RAM, 32GB storage. Ultra-budget with essential features.', price: 149.99, stock: 187, category: 'Budget Android Phones', props: { display: '6.5" HD+', processor: 'Helio G37', ram: '3GB', storage: '32GB', camera: '16MP + 2MP', battery: '5000mAh' } },
]

// iPhone Models
const iPhones: ProductTemplate[] = [
  { name: 'iPhone 15 Pro Max', desc: '6.7" Super Retina XDR, A17 Pro chip, 256GB storage. Titanium design, USB-C, 5x optical zoom camera.', price: 1199.99, stock: 54, category: 'iPhone 15 Pro Max', featured: true, props: { display: '6.7" OLED 120Hz', processor: 'A17 Pro', storage: '256GB', camera: '48MP + 12MP + 12MP (5x)', battery: '4422mAh', material: 'Titanium', actionButton: true } },
  { name: 'iPhone 15 Pro', desc: '6.1" Super Retina XDR, A17 Pro chip, 128GB storage. Titanium design, USB-C, 3x optical zoom camera.', price: 999.99, stock: 68, category: 'iPhone 15 Pro', featured: true, props: { display: '6.1" OLED 120Hz', processor: 'A17 Pro', storage: '128GB', camera: '48MP + 12MP + 12MP (3x)', battery: '3274mAh', material: 'Titanium', actionButton: true } },
  { name: 'iPhone 15 Plus', desc: '6.7" Super Retina XDR, A16 Bionic, 128GB storage. Large display, Dynamic Island, USB-C.', price: 899.99, stock: 72, category: 'iPhone 15 Plus', props: { display: '6.7" OLED 60Hz', processor: 'A16 Bionic', storage: '128GB', camera: '48MP + 12MP', battery: '4383mAh', dynamicIsland: true } },
  { name: 'iPhone 15', desc: '6.1" Super Retina XDR, A16 Bionic, 128GB storage. Dynamic Island, USB-C, improved camera system.', price: 799.99, stock: 95, category: 'iPhone 15', props: { display: '6.1" OLED 60Hz', processor: 'A16 Bionic', storage: '128GB', camera: '48MP + 12MP', battery: '3349mAh', dynamicIsland: true } },
  { name: 'iPhone 14 Pro Max', desc: '6.7" Super Retina XDR, A16 Bionic, 256GB storage. Dynamic Island, 48MP camera, Always-On display.', price: 1099.99, stock: 42, category: 'iPhone 14 Pro Max', props: { display: '6.7" OLED 120Hz', processor: 'A16 Bionic', storage: '256GB', camera: '48MP + 12MP + 12MP', battery: '4323mAh', alwaysOn: true } },
  { name: 'iPhone 14 Pro', desc: '6.1" Super Retina XDR, A16 Bionic, 128GB storage. Dynamic Island, 48MP camera, ProMotion display.', price: 899.99, stock: 51, category: 'iPhone 14 Pro', props: { display: '6.1" OLED 120Hz', processor: 'A16 Bionic', storage: '128GB', camera: '48MP + 12MP + 12MP', battery: '3200mAh', alwaysOn: true } },
  { name: 'iPhone 14 Plus', desc: '6.7" Super Retina XDR, A15 Bionic, 128GB storage. Large display with excellent battery life.', price: 799.99, stock: 63, category: 'iPhone 14 Plus', props: { display: '6.7" OLED 60Hz', processor: 'A15 Bionic', storage: '128GB', camera: '12MP + 12MP', battery: '4325mAh' } },
  { name: 'iPhone 14', desc: '6.1" Super Retina XDR, A15 Bionic, 128GB storage. Reliable iPhone experience with great cameras.', price: 699.99, stock: 84, category: 'iPhone 14', props: { display: '6.1" OLED 60Hz', processor: 'A15 Bionic', storage: '128GB', camera: '12MP + 12MP', battery: '3279mAh' } },
  { name: 'iPhone 13', desc: '6.1" Super Retina XDR, A15 Bionic, 128GB storage. Still a great choice with excellent performance.', price: 599.99, stock: 97, category: 'iPhone 13', props: { display: '6.1" OLED 60Hz', processor: 'A15 Bionic', storage: '128GB', camera: '12MP + 12MP', battery: '3240mAh' } },
  { name: 'iPhone SE (3rd generation)', desc: '4.7" Retina HD, A15 Bionic, 64GB storage. Compact iPhone with modern performance and Touch ID.', price: 429.99, stock: 118, category: 'iPhone SE (3rd generation)', props: { display: '4.7" LCD', processor: 'A15 Bionic', storage: '64GB', camera: '12MP', battery: '2018mAh', touchID: true } },
]

// Tablets
const tablets: ProductTemplate[] = [
  { name: 'iPad Pro 12.9" M2', desc: '12.9" Liquid Retina XDR, Apple M2 chip, 128GB storage. Pro performance with ProMotion and Face ID.', price: 1099.99, stock: 32, category: 'iPad Pro', featured: true, props: { display: '12.9" Mini-LED 120Hz', processor: 'Apple M2', storage: '128GB', camera: '12MP + 10MP', battery: '10758mAh', pencilSupport: '2nd gen' } },
  { name: 'iPad Air 5th Gen', desc: '10.9" Liquid Retina, Apple M1 chip, 64GB storage. Great balance of performance and price.', price: 599.99, stock: 47, category: 'iPad Air', props: { display: '10.9" LCD', processor: 'Apple M1', storage: '64GB', camera: '12MP', battery: '7606mAh', pencilSupport: '2nd gen' } },
  { name: 'iPad 10th Generation', desc: '10.9" Liquid Retina, A14 Bionic, 64GB storage. Modern design with USB-C and bright colors.', price: 449.99, stock: 68, category: 'iPad', props: { display: '10.9" LCD', processor: 'A14 Bionic', storage: '64GB', camera: '12MP', battery: '7606mAh', pencilSupport: '1st gen' } },
  { name: 'Samsung Galaxy Tab S9 Ultra', desc: '14.6" Dynamic AMOLED 2X 120Hz, Snapdragon 8 Gen 2, 12GB RAM, 256GB storage. S Pen included, IP68.', price: 1199.99, stock: 23, category: 'Android Tablets', featured: true, props: { display: '14.6" OLED 120Hz', processor: 'Snapdragon 8 Gen 2', ram: '12GB', storage: '256GB', battery: '11200mAh', sPen: true, waterproof: 'IP68' } },
  { name: 'Samsung Galaxy Tab S9+', desc: '12.4" Dynamic AMOLED 2X 120Hz, Snapdragon 8 Gen 2, 12GB RAM, 256GB storage. Premium tablet with S Pen.', price: 999.99, stock: 35, category: 'Android Tablets', props: { display: '12.4" OLED 120Hz', processor: 'Snapdragon 8 Gen 2', ram: '12GB', storage: '256GB', battery: '10090mAh', sPen: true, waterproof: 'IP68' } },
  { name: 'Samsung Galaxy Tab S9', desc: '11" Dynamic AMOLED 2X 120Hz, Snapdragon 8 Gen 2, 8GB RAM, 128GB storage. Compact premium tablet.', price: 799.99, stock: 48, category: 'Android Tablets', props: { display: '11" OLED 120Hz', processor: 'Snapdragon 8 Gen 2', ram: '8GB', storage: '128GB', battery: '8000mAh', sPen: true, waterproof: 'IP68' } },
  { name: 'Lenovo Tab P12 Pro', desc: '12.6" AMOLED 120Hz, Snapdragon 870, 8GB RAM, 256GB storage. Productivity powerhouse with keyboard support.', price: 699.99, stock: 29, category: 'Android Tablets', props: { display: '12.6" OLED 120Hz', processor: 'Snapdragon 870', ram: '8GB', storage: '256GB', battery: '10200mAh', stylus: 'Included' } },
  { name: 'OnePlus Pad', desc: '11.61" LCD 144Hz, MediaTek Dimensity 9000, 8GB RAM, 128GB storage. Fast refresh rate and great speakers.', price: 479.99, stock: 41, category: 'Android Tablets', props: { display: '11.61" LCD 144Hz', processor: 'Dimensity 9000', ram: '8GB', storage: '128GB', battery: '9510mAh', speakers: 'Quad' } },
  { name: 'Xiaomi Pad 6 Pro', desc: '11" LCD 120Hz, Snapdragon 8+ Gen 1, 8GB RAM, 256GB storage. Flagship performance at mid-range price.', price: 549.99, stock: 38, category: 'Android Tablets', props: { display: '11" LCD 120Hz', processor: 'Snapdragon 8+ Gen 1', ram: '8GB', storage: '256GB', battery: '8600mAh', keyboard: 'Optional' } },
  { name: 'Amazon Fire HD 10', desc: '10.1" Full HD, MediaTek MT8183, 3GB RAM, 32GB storage. Budget tablet with Alexa integration.', price: 149.99, stock: 124, category: 'Budget Tablets', props: { display: '10.1" LCD', processor: 'MediaTek MT8183', ram: '3GB', storage: '32GB', battery: '12-hour', alexa: true } },
]

const allProducts = [...flagshipAndroid, ...midRangeAndroid, ...budgetAndroid, ...iPhones, ...tablets]

async function main() {
  try {
    console.log('Starting Mobile Phones & Tablets product seeding...')
    console.log(`Store ID: ${STORE_ID}\n`)

    const store = await prisma.store.findUnique({ where: { id: STORE_ID } })
    if (!store) throw new Error(`Store not found: ${STORE_ID}`)
    console.log(`✓ Store: ${store.name}\n`)

    const allBrands = await prisma.brand.findMany({
      where: { storeId: STORE_ID },
      select: { id: true, name: true }
    })
    console.log(`✓ Found ${allBrands.length} brands`)

    const allColors = await prisma.color.findMany({
      where: { storeId: STORE_ID },
      select: { id: true, name: true }
    })
    console.log(`✓ Found ${allColors.length} colors`)

    const allSizes = await prisma.size.findMany({
      where: { storeId: STORE_ID },
      select: { id: true, name: true }
    })
    console.log(`✓ Found ${allSizes.length} sizes\n`)

    if (allBrands.length === 0 || allColors.length === 0 || allSizes.length === 0) {
      throw new Error('Missing required data: brands, colors, or sizes not seeded')
    }

    const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

    // Phone brands
    const phoneBrands = allBrands.filter(b =>
      ['Samsung', 'Google', 'OnePlus', 'Xiaomi', 'OPPO', 'Vivo', 'Sony', 'ASUS', 'Motorola', 'Nokia', 'Realme', 'TCL', 'Honor', 'Apple', 'Lenovo', 'Amazon'].some(name =>
        b.name.toLowerCase().includes(name.toLowerCase())
      )
    )
    const usableBrands = phoneBrands.length > 0 ? phoneBrands : allBrands

    // Phone colors
    const phoneColors = allColors.filter(c =>
      ['Black', 'White', 'Silver', 'Gray', 'Grey', 'Blue', 'Green', 'Purple', 'Pink', 'Red', 'Gold'].some(name =>
        c.name.toLowerCase().includes(name.toLowerCase())
      )
    )
    const usableColors = phoneColors.length > 0 ? phoneColors : allColors

    // Storage sizes
    const storageSizes = allSizes.filter(s =>
      ['64 GB', '128 GB', '256 GB', '512 GB', '1 TB'].some(size =>
        s.name.includes(size)
      )
    )
    const usableSizes = storageSizes.length > 0 ? storageSizes : allSizes

    let created = 0
    let skipped = 0

    for (const template of allProducts) {
      try {
        const existing = await prisma.product.findFirst({
          where: { storeId: STORE_ID, name: template.name }
        })
        if (existing) {
          console.log(`  ⊘ Skipped "${template.name}" (already exists)`)
          skipped++
          continue
        }

        const category = await prisma.category.findFirst({
          where: { storeId: STORE_ID, name: template.category }
        })
        if (!category) {
          console.log(`  ✗ Category "${template.category}" not found for "${template.name}"`)
          continue
        }

        const brand = randomItem(usableBrands)
        const color = randomItem(usableColors)
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

    console.log(`\n✓ Mobile Phones & Tablets seeding complete!`)
    console.log(`Products created: ${created}`)
    console.log(`Products skipped: ${skipped}`)
    console.log(`Total products in store: ${totalProducts}`)
  } catch (error) {
    console.error('Mobile seeding failed:', error)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

main()
