import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()
const STORE_ID = '146d5c54-75b9-4197-8c94-78be27c89075'
const CLOUD_NAME = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME || 'demo'

function productImageUrl(productName: string, index: number = 1): string {
  const slug = productName.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '')
  return `https://res.cloudinary.com/${CLOUD_NAME}/image/upload/products/laptops/${slug}_${index}.jpg`
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

// Gaming Laptops
const gamingLaptops: ProductTemplate[] = [
  { name: 'ASUS ROG Strix G16 Gaming Laptop', desc: '16" QHD 240Hz display, Intel Core i9-13980HX, RTX 4070 8GB, 32GB DDR5, 1TB PCIe SSD. RGB keyboard with per-key lighting.', price: 2299.99, stock: 18, category: 'Gaming Laptops', featured: true, props: { processor: 'Intel Core i9-13980HX', gpu: 'NVIDIA RTX 4070 8GB', ram: '32GB DDR5', storage: '1TB PCIe 4.0 SSD', display: '16" QHD 240Hz', battery: '90Wh', weight: '2.5kg' } },
  { name: 'MSI Raider GE78 HX Gaming Laptop', desc: '17.3" UHD 144Hz Mini LED, Intel Core i9-13950HX, RTX 4090 16GB, 64GB DDR5, 2TB NVMe SSD. Per-key RGB mechanical keyboard.', price: 3999.99, stock: 8, category: 'Gaming Laptops', featured: true, props: { processor: 'Intel Core i9-13950HX', gpu: 'NVIDIA RTX 4090 16GB', ram: '64GB DDR5', storage: '2TB NVMe SSD', display: '17.3" UHD 144Hz Mini LED', battery: '99.9Wh', weight: '3.1kg' } },
  { name: 'Razer Blade 15 Gaming Laptop', desc: '15.6" QHD 240Hz, Intel Core i7-13800H, RTX 4060 8GB, 16GB DDR5, 1TB SSD. CNC aluminum chassis with per-key RGB.', price: 1999.99, stock: 24, category: 'Gaming Laptops', featured: true, props: { processor: 'Intel Core i7-13800H', gpu: 'NVIDIA RTX 4060 8GB', ram: '16GB DDR5', storage: '1TB SSD', display: '15.6" QHD 240Hz', battery: '80Wh', weight: '2.01kg' } },
  { name: 'Alienware m17 R5 Gaming Laptop', desc: '17.3" FHD 360Hz, AMD Ryzen 9 6900HX, RTX 4080 12GB, 32GB DDR5, 2TB SSD. Advanced thermal management with dual fans.', price: 2799.99, stock: 15, category: 'Gaming Laptops', props: { processor: 'AMD Ryzen 9 6900HX', gpu: 'NVIDIA RTX 4080 12GB', ram: '32GB DDR5', storage: '2TB SSD', display: '17.3" FHD 360Hz', battery: '97Wh', weight: '3.3kg' } },
  { name: 'Lenovo Legion Pro 7i Gaming Laptop', desc: '16" WQXGA 240Hz, Intel Core i9-13900HX, RTX 4080 12GB, 32GB DDR5, 1TB SSD. AI-powered performance optimization.', price: 2599.99, stock: 21, category: 'Gaming Laptops', props: { processor: 'Intel Core i9-13900HX', gpu: 'NVIDIA RTX 4080 12GB', ram: '32GB DDR5', storage: '1TB PCIe 4.0 SSD', display: '16" WQXGA 240Hz', battery: '99.99Wh', weight: '2.8kg' } },
  { name: 'ASUS TUF Gaming A15 Laptop', desc: '15.6" FHD 144Hz, AMD Ryzen 7 7735HS, RTX 4050 6GB, 16GB DDR5, 512GB SSD. Military-grade durability with efficient cooling.', price: 1199.99, stock: 45, category: 'Gaming Laptops', props: { processor: 'AMD Ryzen 7 7735HS', gpu: 'NVIDIA RTX 4050 6GB', ram: '16GB DDR5', storage: '512GB SSD', display: '15.6" FHD 144Hz', battery: '90Wh', weight: '2.2kg' } },
  { name: 'HP Omen 16 Gaming Laptop', desc: '16.1" QHD 165Hz, Intel Core i7-13700HX, RTX 4070 8GB, 16GB DDR5, 1TB SSD. Omen Tempest Cooling technology.', price: 1799.99, stock: 32, category: 'Gaming Laptops', props: { processor: 'Intel Core i7-13700HX', gpu: 'NVIDIA RTX 4070 8GB', ram: '16GB DDR5', storage: '1TB SSD', display: '16.1" QHD 165Hz', battery: '83Wh', weight: '2.44kg' } },
  { name: 'Acer Predator Helios 300', desc: '15.6" FHD 165Hz, Intel Core i7-12700H, RTX 4060 8GB, 16GB DDR5, 512GB SSD. AeroBlade 3D fan technology.', price: 1499.99, stock: 38, category: 'Gaming Laptops', props: { processor: 'Intel Core i7-12700H', gpu: 'NVIDIA RTX 4060 8GB', ram: '16GB DDR5', storage: '512GB SSD', display: '15.6" FHD 165Hz', battery: '59Wh', weight: '2.3kg' } },
  { name: 'Gigabyte AORUS 17X Gaming Laptop', desc: '17.3" QHD 240Hz, Intel Core i9-13900HX, RTX 4090 16GB, 32GB DDR5, 2TB SSD. WINDFORCE cooling with 4 fans.', price: 3599.99, stock: 10, category: 'Gaming Laptops', featured: true, props: { processor: 'Intel Core i9-13900HX', gpu: 'NVIDIA RTX 4090 16GB', ram: '32GB DDR5', storage: '2TB SSD', display: '17.3" QHD 240Hz', battery: '99Wh', weight: '2.8kg' } },
  { name: 'MSI Katana 15 Gaming Laptop', desc: '15.6" FHD 144Hz, Intel Core i5-12450H, RTX 4050 6GB, 16GB DDR4, 512GB SSD. Budget gaming with solid performance.', price: 899.99, stock: 56, category: 'Gaming Laptops', props: { processor: 'Intel Core i5-12450H', gpu: 'NVIDIA RTX 4050 6GB', ram: '16GB DDR4', storage: '512GB SSD', display: '15.6" FHD 144Hz', battery: '53.5Wh', weight: '2.25kg' } },
  { name: 'ASUS ROG Zephyrus G14 Gaming', desc: '14" QHD 120Hz, AMD Ryzen 9 7940HS, RTX 4060 8GB, 16GB DDR5, 1TB SSD. Ultra-portable gaming powerhouse.', price: 1899.99, stock: 27, category: 'Gaming Laptops', featured: true, props: { processor: 'AMD Ryzen 9 7940HS', gpu: 'NVIDIA RTX 4060 8GB', ram: '16GB DDR5', storage: '1TB SSD', display: '14" QHD 120Hz', battery: '76Wh', weight: '1.65kg' } },
  { name: 'Razer Blade 14 Gaming Laptop', desc: '14" QHD 165Hz, AMD Ryzen 9 7940HS, RTX 4070 8GB, 16GB DDR5, 1TB SSD. Compact aluminum design with RGB.', price: 2299.99, stock: 19, category: 'Gaming Laptops', props: { processor: 'AMD Ryzen 9 7940HS', gpu: 'NVIDIA RTX 4070 8GB', ram: '16GB DDR5', storage: '1TB SSD', display: '14" QHD 165Hz', battery: '68.1Wh', weight: '1.84kg' } },
]

// Business Laptops
const businessLaptops: ProductTemplate[] = [
  { name: 'Dell Latitude 9430 2-in-1', desc: '14" QHD+ touchscreen, Intel Core i7-1265U, Iris Xe Graphics, 16GB LPDDR5, 512GB SSD. Premium business convertible with pen support.', price: 1899.99, stock: 28, category: 'Business Laptops', featured: true, props: { processor: 'Intel Core i7-1265U', gpu: 'Intel Iris Xe', ram: '16GB LPDDR5', storage: '512GB SSD', display: '14" QHD+ Touch', battery: '60Wh', weight: '1.46kg' } },
  { name: 'HP EliteBook 840 G9', desc: '14" FHD, Intel Core i7-1255U, Iris Xe, 16GB DDR5, 512GB SSD. Enhanced security with Sure View privacy screen.', price: 1599.99, stock: 35, category: 'Business Laptops', props: { processor: 'Intel Core i7-1255U', gpu: 'Intel Iris Xe', ram: '16GB DDR5', storage: '512GB SSD', display: '14" FHD IPS', battery: '51Wh', weight: '1.36kg' } },
  { name: 'Lenovo ThinkPad X1 Carbon Gen 11', desc: '14" WUXGA, Intel Core i7-1365U, Iris Xe, 32GB LPDDR5, 1TB SSD. Legendary ThinkPad keyboard and durability.', price: 2199.99, stock: 22, category: 'Business Laptops', featured: true, props: { processor: 'Intel Core i7-1365U', gpu: 'Intel Iris Xe', ram: '32GB LPDDR5', storage: '1TB SSD', display: '14" WUXGA IPS', battery: '57Wh', weight: '1.12kg' } },
  { name: 'Microsoft Surface Laptop 5', desc: '13.5" PixelSense touchscreen, Intel Core i7-1255U, Iris Xe, 16GB LPDDR5x, 512GB SSD. Premium design with Alcantara keyboard.', price: 1699.99, stock: 31, category: 'Business Laptops', props: { processor: 'Intel Core i7-1255U', gpu: 'Intel Iris Xe', ram: '16GB LPDDR5x', storage: '512GB SSD', display: '13.5" PixelSense Touch', battery: '47.4Wh', weight: '1.27kg' } },
  { name: 'Dell XPS 13 Plus Business', desc: '13.4" FHD+, Intel Core i7-1360P, Iris Xe, 16GB LPDDR5, 512GB SSD. Edge-to-edge keyboard with capacitive touch function row.', price: 1799.99, stock: 26, category: 'Business Laptops', props: { processor: 'Intel Core i7-1360P', gpu: 'Intel Iris Xe', ram: '16GB LPDDR5', storage: '512GB SSD', display: '13.4" FHD+ InfinityEdge', battery: '55Wh', weight: '1.24kg' } },
  { name: 'Lenovo ThinkPad T14 Gen 4', desc: '14" WUXGA, Intel Core i5-1335U, Iris Xe, 16GB DDR5, 256GB SSD. Reliable business workhorse with TPM 2.0.', price: 1199.99, stock: 47, category: 'Business Laptops', props: { processor: 'Intel Core i5-1335U', gpu: 'Intel Iris Xe', ram: '16GB DDR5', storage: '256GB SSD', display: '14" WUXGA IPS', battery: '52.5Wh', weight: '1.46kg' } },
  { name: 'HP ProBook 450 G10', desc: '15.6" FHD, Intel Core i5-1335U, Iris Xe, 8GB DDR4, 256GB SSD. Affordable business laptop with essential security features.', price: 899.99, stock: 62, category: 'Business Laptops', props: { processor: 'Intel Core i5-1335U', gpu: 'Intel Iris Xe', ram: '8GB DDR4', storage: '256GB SSD', display: '15.6" FHD', battery: '45Wh', weight: '1.79kg' } },
  { name: 'ASUS ExpertBook B9 OLED', desc: '14" OLED FHD, Intel Core i7-1355U, Iris Xe, 16GB LPDDR5, 1TB SSD. Ultra-lightweight with 16-hour battery life.', price: 1899.99, stock: 18, category: 'Business Laptops', featured: true, props: { processor: 'Intel Core i7-1355U', gpu: 'Intel Iris Xe', ram: '16GB LPDDR5', storage: '1TB SSD', display: '14" OLED FHD', battery: '63Wh', weight: '0.99kg' } },
  { name: 'Acer TravelMate P6 Business', desc: '14" FHD, Intel Core i7-1355U, Iris Xe, 16GB DDR5, 512GB SSD. Military-standard durability with 20-hour battery.', price: 1399.99, stock: 33, category: 'Business Laptops', props: { processor: 'Intel Core i7-1355U', gpu: 'Intel Iris Xe', ram: '16GB DDR5', storage: '512GB SSD', display: '14" FHD IPS', battery: '56Wh', weight: '1.1kg' } },
  { name: 'LG Gram 17 Business Edition', desc: '17" WQXGA, Intel Core i7-1360P, Iris Xe, 16GB LPDDR5, 512GB SSD. Ultra-light 17" laptop with impressive battery.', price: 1799.99, stock: 24, category: 'Business Laptops', props: { processor: 'Intel Core i7-1360P', gpu: 'Intel Iris Xe', ram: '16GB LPDDR5', storage: '512GB SSD', display: '17" WQXGA IPS', battery: '80Wh', weight: '1.35kg' } },
]

// Student Laptops
const studentLaptops: ProductTemplate[] = [
  { name: 'HP Pavilion 15 Student Laptop', desc: '15.6" FHD, Intel Core i5-1235U, Iris Xe, 8GB DDR4, 512GB SSD. Perfect balance of performance and affordability for students.', price: 649.99, stock: 73, category: 'Student Laptops', props: { processor: 'Intel Core i5-1235U', gpu: 'Intel Iris Xe', ram: '8GB DDR4', storage: '512GB SSD', display: '15.6" FHD', battery: '41Wh', weight: '1.75kg' } },
  { name: 'Lenovo IdeaPad 3 Student', desc: '15.6" FHD, AMD Ryzen 5 5500U, Radeon Graphics, 8GB DDR4, 256GB SSD. Budget-friendly with solid performance for coursework.', price: 499.99, stock: 98, category: 'Student Laptops', props: { processor: 'AMD Ryzen 5 5500U', gpu: 'AMD Radeon', ram: '8GB DDR4', storage: '256GB SSD', display: '15.6" FHD', battery: '45Wh', weight: '1.7kg' } },
  { name: 'Acer Aspire 5 Student Edition', desc: '15.6" FHD, Intel Core i3-1215U, UHD Graphics, 8GB DDR4, 256GB SSD. Reliable performance for everyday student tasks.', price: 449.99, stock: 115, category: 'Student Laptops', props: { processor: 'Intel Core i3-1215U', gpu: 'Intel UHD', ram: '8GB DDR4', storage: '256GB SSD', display: '15.6" FHD', battery: '50Wh', weight: '1.8kg' } },
  { name: 'ASUS VivoBook 15 Student', desc: '15.6" FHD, Intel Core i5-1235U, Iris Xe, 12GB DDR4, 512GB SSD. Lightweight with fingerprint sensor.', price: 599.99, stock: 86, category: 'Student Laptops', props: { processor: 'Intel Core i5-1235U', gpu: 'Intel Iris Xe', ram: '12GB DDR4', storage: '512GB SSD', display: '15.6" FHD', battery: '42Wh', weight: '1.7kg' } },
  { name: 'Dell Inspiron 15 3000 Student', desc: '15.6" FHD, Intel Core i3-1115G4, UHD Graphics, 8GB DDR4, 256GB SSD. Essential laptop for students on a budget.', price: 429.99, stock: 124, category: 'Student Laptops', props: { processor: 'Intel Core i3-1115G4', gpu: 'Intel UHD', ram: '8GB DDR4', storage: '256GB SSD', display: '15.6" FHD', battery: '41Wh', weight: '1.85kg' } },
  { name: 'Microsoft Surface Go 3 Student', desc: '10.5" PixelSense touchscreen, Intel Pentium Gold 6500Y, UHD 615, 8GB RAM, 128GB SSD. Ultra-portable with pen support.', price: 549.99, stock: 65, category: 'Student Laptops', props: { processor: 'Intel Pentium Gold 6500Y', gpu: 'Intel UHD 615', ram: '8GB LPDDR3', storage: '128GB SSD', display: '10.5" PixelSense Touch', battery: '28Wh', weight: '0.544kg' } },
  { name: 'HP Chromebook 14 Student', desc: '14" HD, Intel Celeron N4500, UHD Graphics, 4GB RAM, 64GB eMMC. Chrome OS laptop for cloud-based learning.', price: 299.99, stock: 142, category: 'Student Laptops', props: { processor: 'Intel Celeron N4500', gpu: 'Intel UHD', ram: '4GB', storage: '64GB eMMC', display: '14" HD', battery: '47Wh', weight: '1.4kg', os: 'Chrome OS' } },
  { name: 'Lenovo Chromebook Flex 5 Student', desc: '13.3" FHD touchscreen, Intel Core i3-10110U, UHD Graphics, 4GB RAM, 64GB eMMC. Convertible Chromebook for versatile learning.', price: 379.99, stock: 78, category: 'Student Laptops', props: { processor: 'Intel Core i3-10110U', gpu: 'Intel UHD', ram: '4GB', storage: '64GB eMMC', display: '13.3" FHD Touch', battery: '51Wh', weight: '1.35kg', os: 'Chrome OS' } },
  { name: 'ASUS Chromebook Plus CX34', desc: '14" FHD, Intel Core i3-1215U, UHD Graphics, 8GB RAM, 128GB SSD. Premium Chromebook with AI features.', price: 449.99, stock: 91, category: 'Student Laptops', props: { processor: 'Intel Core i3-1215U', gpu: 'Intel UHD', ram: '8GB', storage: '128GB SSD', display: '14" FHD', battery: '50Wh', weight: '1.4kg', os: 'Chrome OS' } },
  { name: 'Acer Chromebook Spin 714', desc: '14" WUXGA touchscreen, Intel Core i5-1235U, Iris Xe, 8GB RAM, 256GB SSD. Premium convertible Chromebook for advanced students.', price: 729.99, stock: 52, category: 'Student Laptops', props: { processor: 'Intel Core i5-1235U', gpu: 'Intel Iris Xe', ram: '8GB', storage: '256GB SSD', display: '14" WUXGA Touch', battery: '56Wh', weight: '1.4kg', os: 'Chrome OS' } },
]

// 2-in-1 Laptops
const twoInOneLaptops: ProductTemplate[] = [
  { name: 'HP Spectre x360 14 2-in-1', desc: '13.5" OLED 3K2K touchscreen, Intel Core i7-1355U, Iris Xe, 16GB LPDDR4x, 512GB SSD. Premium convertible with pen and privacy screen.', price: 1699.99, stock: 23, category: '2-in-1 Laptops', featured: true, props: { processor: 'Intel Core i7-1355U', gpu: 'Intel Iris Xe', ram: '16GB LPDDR4x', storage: '512GB SSD', display: '13.5" OLED 3K2K Touch', battery: '66Wh', weight: '1.36kg', penIncluded: true } },
  { name: 'Lenovo Yoga 9i Gen 8 2-in-1', desc: '14" OLED 2.8K touchscreen, Intel Core i7-1360P, Iris Xe, 16GB LPDDR5, 512GB SSD. Rotating soundbar hinge with premium leather cover.', price: 1599.99, stock: 28, category: '2-in-1 Laptops', featured: true, props: { processor: 'Intel Core i7-1360P', gpu: 'Intel Iris Xe', ram: '16GB LPDDR5', storage: '512GB SSD', display: '14" OLED 2.8K Touch', battery: '75Wh', weight: '1.38kg', soundbar: true } },
  { name: 'Dell Inspiron 14 2-in-1 7435', desc: '14" FHD+ touchscreen, AMD Ryzen 7 7730U, Radeon Graphics, 16GB DDR4, 512GB SSD. Versatile 2-in-1 with active pen support.', price: 899.99, stock: 42, category: '2-in-1 Laptops', props: { processor: 'AMD Ryzen 7 7730U', gpu: 'AMD Radeon', ram: '16GB DDR4', storage: '512GB SSD', display: '14" FHD+ Touch', battery: '54Wh', weight: '1.59kg' } },
  { name: 'ASUS ZenBook Flip 14 OLED', desc: '14" OLED 2.8K touchscreen, Intel Core i7-1260P, Iris Xe, 16GB LPDDR5, 512GB SSD. Premium OLED display with stylus support.', price: 1299.99, stock: 31, category: '2-in-1 Laptops', props: { processor: 'Intel Core i7-1260P', gpu: 'Intel Iris Xe', ram: '16GB LPDDR5', storage: '512GB SSD', display: '14" OLED 2.8K Touch', battery: '63Wh', weight: '1.5kg', stylusIncluded: true } },
  { name: 'Microsoft Surface Pro 9 2-in-1', desc: '13" PixelSense Flow touchscreen, Intel Core i7-1255U, Iris Xe, 16GB LPDDR5, 256GB SSD. Detachable tablet with keyboard cover.', price: 1399.99, stock: 35, category: '2-in-1 Laptops', props: { processor: 'Intel Core i7-1255U', gpu: 'Intel Iris Xe', ram: '16GB LPDDR5', storage: '256GB SSD', display: '13" PixelSense Flow', battery: '47.7Wh', weight: '0.879kg', kickstand: true } },
  { name: 'HP Envy x360 15 2-in-1', desc: '15.6" FHD touchscreen, AMD Ryzen 7 5825U, Radeon Graphics, 16GB DDR4, 512GB SSD. Large screen convertible with pen support.', price: 999.99, stock: 38, category: '2-in-1 Laptops', props: { processor: 'AMD Ryzen 7 5825U', gpu: 'AMD Radeon', ram: '16GB DDR4', storage: '512GB SSD', display: '15.6" FHD Touch', battery: '51Wh', weight: '1.86kg' } },
  { name: 'Lenovo ThinkPad X1 Yoga Gen 8', desc: '14" WUXGA touchscreen, Intel Core i7-1355U, Iris Xe, 16GB LPDDR5, 512GB SSD. Business 2-in-1 with integrated pen.', price: 1899.99, stock: 19, category: '2-in-1 Laptops', props: { processor: 'Intel Core i7-1355U', gpu: 'Intel Iris Xe', ram: '16GB LPDDR5', storage: '512GB SSD', display: '14" WUXGA Touch', battery: '57Wh', weight: '1.38kg', penGarage: true } },
  { name: 'Acer Spin 5 2-in-1 Laptop', desc: '14" WUXGA touchscreen, Intel Core i5-1235U, Iris Xe, 8GB LPDDR4x, 512GB SSD. Affordable convertible with active stylus.', price: 849.99, stock: 46, category: '2-in-1 Laptops', props: { processor: 'Intel Core i5-1235U', gpu: 'Intel Iris Xe', ram: '8GB LPDDR4x', storage: '512GB SSD', display: '14" WUXGA Touch', battery: '56Wh', weight: '1.5kg' } },
  { name: 'HP Pavilion x360 14 2-in-1', desc: '14" FHD touchscreen, Intel Core i3-1215U, UHD Graphics, 8GB DDR4, 256GB SSD. Budget-friendly convertible for everyday use.', price: 599.99, stock: 67, category: '2-in-1 Laptops', props: { processor: 'Intel Core i3-1215U', gpu: 'Intel UHD', ram: '8GB DDR4', storage: '256GB SSD', display: '14" FHD Touch', battery: '43Wh', weight: '1.51kg' } },
  { name: 'ASUS VivoBook Flip 14 2-in-1', desc: '14" FHD touchscreen, Intel Core i5-1135G7, Iris Xe, 8GB DDR4, 512GB SSD. Lightweight convertible with fingerprint sensor.', price: 699.99, stock: 54, category: '2-in-1 Laptops', props: { processor: 'Intel Core i5-1135G7', gpu: 'Intel Iris Xe', ram: '8GB DDR4', storage: '512GB SSD', display: '14" FHD Touch', battery: '42Wh', weight: '1.5kg' } },
]

// Refurbished Laptops
const refurbishedLaptops: ProductTemplate[] = [
  { name: 'Refurbished Dell XPS 13 9310', desc: 'Certified refurbished. 13.4" FHD+, Intel Core i7-1165G7, Iris Xe, 16GB LPDDR4x, 512GB SSD. Like-new condition with warranty.', price: 899.99, stock: 15, category: 'Refurbished Laptops', props: { processor: 'Intel Core i7-1165G7', gpu: 'Intel Iris Xe', ram: '16GB LPDDR4x', storage: '512GB SSD', display: '13.4" FHD+', condition: 'Certified Refurbished', warranty: '90 days' } },
  { name: 'Refurbished MacBook Air M1 2020', desc: 'Apple certified refurbished. 13.3" Retina, Apple M1, 8-core GPU, 8GB unified, 256GB SSD. Excellent condition.', price: 799.99, stock: 12, category: 'Refurbished Laptops', props: { processor: 'Apple M1', gpu: '8-core GPU', ram: '8GB Unified', storage: '256GB SSD', display: '13.3" Retina', condition: 'Apple Certified', warranty: '1 year' } },
  { name: 'Refurbished HP EliteBook 840 G7', desc: 'Certified refurbished. 14" FHD, Intel Core i5-10310U, UHD Graphics, 16GB DDR4, 256GB SSD. Business-grade quality.', price: 649.99, stock: 23, category: 'Refurbished Laptops', props: { processor: 'Intel Core i5-10310U', gpu: 'Intel UHD', ram: '16GB DDR4', storage: '256GB SSD', display: '14" FHD', condition: 'Certified Refurbished', warranty: '90 days' } },
  { name: 'Refurbished Lenovo ThinkPad T480', desc: 'Manufacturer refurbished. 14" FHD, Intel Core i5-8350U, UHD 620, 8GB DDR4, 256GB SSD. Classic ThinkPad reliability.', price: 499.99, stock: 34, category: 'Refurbished Laptops', props: { processor: 'Intel Core i5-8350U', gpu: 'Intel UHD 620', ram: '8GB DDR4', storage: '256GB SSD', display: '14" FHD', condition: 'Manufacturer Refurbished', warranty: '90 days' } },
  { name: 'Refurbished ASUS ROG Zephyrus G14', desc: 'Certified refurbished gaming. 14" QHD, AMD Ryzen 9 5900HS, RTX 3060 6GB, 16GB DDR4, 1TB SSD. Gaming at a discount.', price: 1099.99, stock: 9, category: 'Refurbished Laptops', props: { processor: 'AMD Ryzen 9 5900HS', gpu: 'NVIDIA RTX 3060 6GB', ram: '16GB DDR4', storage: '1TB SSD', display: '14" QHD', condition: 'Certified Refurbished', warranty: '90 days' } },
  { name: 'Refurbished Microsoft Surface Laptop 4', desc: 'Microsoft certified. 13.5" PixelSense, Intel Core i5-1135G7, Iris Xe, 8GB RAM, 256GB SSD. Premium design.', price: 749.99, stock: 18, category: 'Refurbished Laptops', props: { processor: 'Intel Core i5-1135G7', gpu: 'Intel Iris Xe', ram: '8GB', storage: '256GB SSD', display: '13.5" PixelSense', condition: 'Microsoft Certified', warranty: '1 year' } },
  { name: 'Refurbished MacBook Pro 13" M1', desc: 'Apple certified refurbished. 13.3" Retina, Apple M1, 8-core GPU, 16GB unified, 512GB SSD. Pro performance.', price: 1199.99, stock: 8, category: 'Refurbished Laptops', props: { processor: 'Apple M1', gpu: '8-core GPU', ram: '16GB Unified', storage: '512GB SSD', display: '13.3" Retina', condition: 'Apple Certified', warranty: '1 year' } },
  { name: 'Refurbished Dell Latitude 7420', desc: 'Certified refurbished business. 14" FHD, Intel Core i7-1185G7, Iris Xe, 16GB DDR4, 512GB SSD. Enterprise quality.', price: 849.99, stock: 21, category: 'Refurbished Laptops', props: { processor: 'Intel Core i7-1185G7', gpu: 'Intel Iris Xe', ram: '16GB DDR4', storage: '512GB SSD', display: '14" FHD', condition: 'Certified Refurbished', warranty: '90 days' } },
  { name: 'Refurbished HP ZBook Studio G7', desc: 'Certified refurbished workstation. 15.6" FHD, Intel Core i7-10750H, Quadro T1000 4GB, 32GB DDR4, 512GB SSD. Pro creative work.', price: 1299.99, stock: 7, category: 'Refurbished Laptops', props: { processor: 'Intel Core i7-10750H', gpu: 'NVIDIA Quadro T1000 4GB', ram: '32GB DDR4', storage: '512GB SSD', display: '15.6" FHD', condition: 'Certified Refurbished', warranty: '90 days' } },
  { name: 'Refurbished Lenovo Yoga C940', desc: 'Manufacturer refurbished 2-in-1. 14" FHD touch, Intel Core i7-1065G7, Iris Plus, 12GB DDR4, 512GB SSD. Convertible design.', price: 699.99, stock: 16, category: 'Refurbished Laptops', props: { processor: 'Intel Core i7-1065G7', gpu: 'Intel Iris Plus', ram: '12GB DDR4', storage: '512GB SSD', display: '14" FHD Touch', condition: 'Manufacturer Refurbished', warranty: '90 days' } },
]

const allLaptops = [...gamingLaptops, ...businessLaptops, ...studentLaptops, ...twoInOneLaptops, ...refurbishedLaptops]

async function main() {
  try {
    console.log('Starting Laptop product seeding...')
    console.log(`Store ID: ${STORE_ID}\n`)

    const store = await prisma.store.findUnique({ where: { id: STORE_ID } })
    if (!store) throw new Error(`Store not found: ${STORE_ID}`)
    console.log(`✓ Store: ${store.name}\n`)

    // Get all available brands, colors, and sizes
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

    // Helper to get random item
    const randomItem = <T,>(arr: T[]): T => arr[Math.floor(Math.random() * arr.length)]

    // Laptop brands
    const laptopBrands = allBrands.filter(b => 
      ['ASUS', 'MSI', 'Razer', 'Alienware', 'Dell', 'Lenovo', 'HP', 'Acer', 'Gigabyte', 'Microsoft', 'LG', 'Apple', 'Samsung'].some(name =>
        b.name.toLowerCase().includes(name.toLowerCase())
      )
    )
    const usableBrands = laptopBrands.length > 0 ? laptopBrands : allBrands

    // Common laptop colors
    const laptopColors = allColors.filter(c =>
      ['Black', 'Silver', 'Gray', 'Grey', 'White', 'Gold', 'Blue'].some(name =>
        c.name.toLowerCase().includes(name.toLowerCase())
      )
    )
    const usableColors = laptopColors.length > 0 ? laptopColors : allColors

    // Laptop sizes (screen sizes)
    const laptopSizes = allSizes.filter(s =>
      ['11.6"', '12.5"', '13.3"', '14"', '15"', '15.6"', '16"', '17"', '17.3"'].some(size =>
        s.name.includes(size)
      )
    )
    const usableSizes = laptopSizes.length > 0 ? laptopSizes : allSizes

    let created = 0
    let skipped = 0

    for (const template of allLaptops) {
      try {
        // Check if already exists
        const existing = await prisma.product.findFirst({
          where: { storeId: STORE_ID, name: template.name }
        })
        if (existing) {
          console.log(`  ⊘ Skipped "${template.name}" (already exists)`)
          skipped++
          continue
        }

        // Get the category
        const category = await prisma.category.findFirst({
          where: { storeId: STORE_ID, name: template.category }
        })
        if (!category) {
          console.log(`  ✗ Category "${template.category}" not found for "${template.name}"`)
          continue
        }

        // Assign brand, color, size
        const brand = randomItem(usableBrands)
        const color = randomItem(usableColors)
        const size = randomItem(usableSizes)

        // Create 1-3 images
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

    console.log(`\n✓ Laptop seeding complete!`)
    console.log(`Products created: ${created}`)
    console.log(`Products skipped: ${skipped}`)
    console.log(`Total products in store: ${totalProducts}`)
  } catch (error) {
    console.error('Laptop seeding failed:', error)
    process.exitCode = 1
  } finally {
    await prisma.$disconnect()
  }
}

main()
