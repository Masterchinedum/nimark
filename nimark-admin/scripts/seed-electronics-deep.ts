import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const STORE_ID = '146d5c54-75b9-4197-8c94-78be27c89075';

interface CategoryData {
  name: string;
  billboard?: string; // Billboard label for this category (optional, inherits from parent)
  children?: CategoryData[];
}

// Comprehensive electronics-focused billboard list
const electronicsBillboards = [
  { label: 'Mobile Phones & Tablets', imageUrl: 'https://res.cloudinary.com/demo/image/upload/mobile_phones_banner.jpg' },
  { label: 'Computers & Laptops', imageUrl: 'https://res.cloudinary.com/demo/image/upload/computers_banner.jpg' },
  { label: 'TVs & Home Entertainment', imageUrl: 'https://res.cloudinary.com/demo/image/upload/tvs_banner.jpg' },
  { label: 'Audio & Headphones', imageUrl: 'https://res.cloudinary.com/demo/image/upload/audio_banner.jpg' },
  { label: 'Cameras & Photography', imageUrl: 'https://res.cloudinary.com/demo/image/upload/cameras_banner.jpg' },
  { label: 'Gaming & Consoles', imageUrl: 'https://res.cloudinary.com/demo/image/upload/gaming_banner.jpg' },
  { label: 'Computer Components', imageUrl: 'https://res.cloudinary.com/demo/image/upload/components_banner.jpg' },
  { label: 'Networking & Smart Home', imageUrl: 'https://res.cloudinary.com/demo/image/upload/networking_banner.jpg' },
  { label: 'Wearables & Smart Devices', imageUrl: 'https://res.cloudinary.com/demo/image/upload/wearables_banner.jpg' },
  { label: 'Accessories & Peripherals', imageUrl: 'https://res.cloudinary.com/demo/image/upload/accessories_banner.jpg' },
  { label: 'Power & Batteries', imageUrl: 'https://res.cloudinary.com/demo/image/upload/power_banner.jpg' },
  { label: 'Storage & Memory', imageUrl: 'https://res.cloudinary.com/demo/image/upload/storage_banner.jpg' },
  { label: 'Printers & Office Electronics', imageUrl: 'https://res.cloudinary.com/demo/image/upload/printers_banner.jpg' },
  { label: 'Security & Surveillance', imageUrl: 'https://res.cloudinary.com/demo/image/upload/security_banner.jpg' },
  { label: 'Drones & Robotics', imageUrl: 'https://res.cloudinary.com/demo/image/upload/drones_banner.jpg' },
];

// Ultra-comprehensive electronics category structure
const electronicsCategoryStructure: CategoryData[] = [
  {
    name: 'Mobile Phones & Tablets',
    billboard: 'Mobile Phones & Tablets',
    children: [
      {
        name: 'Smartphones',
        children: [
          {
            name: 'Android Smartphones',
            children: [
              {
                name: 'Flagship Android Phones',
                children: [
                  { name: 'Samsung Galaxy S Series' },
                  { name: 'Samsung Galaxy Note Series' },
                  { name: 'Google Pixel Pro Series' },
                  { name: 'OnePlus Flagship Series' },
                  { name: 'Xiaomi Mi Series' },
                  { name: 'Huawei P Series' },
                  { name: 'Sony Xperia Pro Series' },
                  { name: 'LG V Series' },
                  { name: 'Asus Zenfone Pro Series' },
                  { name: 'Nokia PureView Series' },
                ],
              },
              {
                name: 'Mid-Range Android Phones',
                children: [
                  { name: 'Samsung Galaxy A Series' },
                  { name: 'Google Pixel A Series' },
                  { name: 'OnePlus Nord Series' },
                  { name: 'Xiaomi Redmi Series' },
                  { name: 'Huawei Nova Series' },
                  { name: 'Sony Xperia XA Series' },
                  { name: 'Motorola Moto G Series' },
                  { name: 'Realme Series' },
                  { name: 'Oppo A Series' },
                  { name: 'Vivo Y Series' },
                ],
              },
              {
                name: 'Budget Android Phones',
                children: [
                  { name: 'Samsung Galaxy M Series' },
                  { name: 'Xiaomi Redmi A Series' },
                  { name: 'Nokia C Series' },
                  { name: 'Motorola Moto E Series' },
                  { name: 'Infinix Series' },
                  { name: 'Tecno Series' },
                  { name: 'Itel Series' },
                  { name: 'Oppo A1 Series' },
                  { name: 'Vivo Y1 Series' },
                  { name: 'Honor Play Series' },
                ],
              },
              {
                name: 'Gaming Android Phones',
                children: [
                  { name: 'Asus ROG Phone Series' },
                  { name: 'Black Shark Gaming Phones' },
                  { name: 'Lenovo Legion Phone' },
                  { name: 'Nubia Red Magic Series' },
                  { name: 'TCL Gaming Phones' },
                  { name: 'ZTE Gaming Phones' },
                ],
              },
              {
                name: 'Foldable Android Phones',
                children: [
                  { name: 'Samsung Galaxy Z Fold Series' },
                  { name: 'Samsung Galaxy Z Flip Series' },
                  { name: 'Huawei Mate X Series' },
                  { name: 'Motorola Razr Series' },
                  { name: 'Oppo Find N Series' },
                  { name: 'Vivo X Fold Series' },
                ],
              },
              {
                name: 'Rugged Android Phones',
                children: [
                  { name: 'Samsung Galaxy XCover Series' },
                  { name: 'Kyocera DuraForce Series' },
                  { name: 'Sonim XP Series' },
                  { name: 'Ulefone Armor Series' },
                  { name: 'Doogee Series' },
                  { name: 'Oukitel Series' },
                ],
              },
            ],
          },
          {
            name: 'iOS Smartphones',
            children: [
              {
                name: 'iPhone Pro & Pro Max Series',
                children: [
                  { name: 'iPhone 15 Pro' },
                  { name: 'iPhone 15 Pro Max' },
                  { name: 'iPhone 14 Pro' },
                  { name: 'iPhone 14 Pro Max' },
                  { name: 'iPhone 13 Pro' },
                  { name: 'iPhone 13 Pro Max' },
                  { name: 'iPhone 12 Pro' },
                  { name: 'iPhone 12 Pro Max' },
                ],
              },
              {
                name: 'iPhone Standard Series',
                children: [
                  { name: 'iPhone 15' },
                  { name: 'iPhone 15 Plus' },
                  { name: 'iPhone 14' },
                  { name: 'iPhone 14 Plus' },
                  { name: 'iPhone 13' },
                  { name: 'iPhone 13 Mini' },
                  { name: 'iPhone 12' },
                  { name: 'iPhone 12 Mini' },
                ],
              },
              {
                name: 'iPhone SE Series',
                children: [
                  { name: 'iPhone SE (3rd generation)' },
                  { name: 'iPhone SE (2nd generation)' },
                  { name: 'iPhone SE (1st generation)' },
                ],
              },
              {
                name: 'iPhone XR/11 Series',
                children: [
                  { name: 'iPhone 11' },
                  { name: 'iPhone 11 Pro' },
                  { name: 'iPhone 11 Pro Max' },
                  { name: 'iPhone XR' },
                ],
              },
            ],
          },
          {
            name: 'Refurbished & Used Phones',
            children: [
              { name: 'Refurbished Android Phones' },
              { name: 'Refurbished iPhones' },
              { name: 'Used Android Phones' },
              { name: 'Used iPhones' },
              { name: 'Unlocked Phones' },
              { name: 'Carrier-Specific Phones' },
            ],
          },
          {
            name: 'Feature Phones',
            children: [
              { name: 'Basic Feature Phones' },
              { name: 'Senior Citizen Phones' },
              { name: 'Kids Phones' },
              { name: 'Emergency Phones' },
            ],
          },
        ],
      },
      {
        name: 'Tablets',
        children: [
          {
            name: 'Android Tablets',
            children: [
              {
                name: 'Samsung Galaxy Tab Series',
                children: [
                  { name: 'Galaxy Tab S Series' },
                  { name: 'Galaxy Tab A Series' },
                  { name: 'Galaxy Tab Active Series' },
                  { name: 'Galaxy Tab E Series' },
                ],
              },
              {
                name: 'Lenovo Tab Series',
                children: [
                  { name: 'Lenovo Tab P Series' },
                  { name: 'Lenovo Tab M Series' },
                  { name: 'Lenovo Yoga Tab Series' },
                ],
              },
              {
                name: 'Amazon Fire HD Series',
                children: [
                  { name: 'Fire HD 10' },
                  { name: 'Fire HD 8' },
                  { name: 'Fire HD 7' },
                  { name: 'Fire 7' },
                ],
              },
              { name: 'Google Pixel Tablet' },
              { name: 'Huawei MediaPad Series' },
              { name: 'Xiaomi Pad Series' },
              { name: 'Oppo Pad Series' },
            ],
          },
          {
            name: 'iOS Tablets',
            children: [
              {
                name: 'iPad Pro Series',
                children: [
                  { name: '12.9-inch iPad Pro' },
                  { name: '11-inch iPad Pro' },
                  { name: '10.5-inch iPad Pro' },
                  { name: '9.7-inch iPad Pro' },
                ],
              },
              {
                name: 'iPad Air Series',
                children: [
                  { name: 'iPad Air (5th generation)' },
                  { name: 'iPad Air (4th generation)' },
                  { name: 'iPad Air (3rd generation)' },
                  { name: 'iPad Air (2nd generation)' },
                ],
              },
              {
                name: 'iPad Series',
                children: [
                  { name: 'iPad (10th generation)' },
                  { name: 'iPad (9th generation)' },
                  { name: 'iPad (8th generation)' },
                  { name: 'iPad (7th generation)' },
                ],
              },
              {
                name: 'iPad Mini Series',
                children: [
                  { name: 'iPad Mini (6th generation)' },
                  { name: 'iPad Mini (5th generation)' },
                  { name: 'iPad Mini (4th generation)' },
                ],
              },
            ],
          },
          {
            name: 'Windows Tablets',
            children: [
              {
                name: 'Microsoft Surface Series',
                children: [
                  { name: 'Surface Pro Series' },
                  { name: 'Surface Go Series' },
                  { name: 'Surface Book Series' },
                ],
              },
              { name: 'Lenovo ThinkPad Tablets' },
              { name: 'HP ElitePad Series' },
              { name: 'Dell Latitude Tablets' },
            ],
          },
          {
            name: 'Kids Tablets',
            children: [
              { name: 'Amazon Fire HD Kids' },
              { name: 'Samsung Galaxy Tab Kids' },
              { name: 'LeapFrog LeapPad' },
              { name: 'VTech Kids Tablets' },
              { name: 'Osmo Learning Tablets' },
            ],
          },
          {
            name: 'E-Reader Tablets',
            children: [
              { name: 'Amazon Kindle Paperwhite' },
              { name: 'Amazon Kindle Oasis' },
              { name: 'Kobo Libra' },
              { name: 'Barnes & Noble Nook' },
            ],
          },
        ],
      },
      {
        name: 'Phone Accessories',
        children: [
          {
            name: 'Phone Cases & Covers',
            children: [
              {
                name: 'Silicone Cases',
                children: [
                  { name: 'Clear Silicone Cases' },
                  { name: 'Colored Silicone Cases' },
                  { name: 'Patterned Silicone Cases' },
                  { name: 'Shockproof Silicone Cases' },
                ],
              },
              {
                name: 'Leather Cases',
                children: [
                  { name: 'Genuine Leather Cases' },
                  { name: 'PU Leather Cases' },
                  { name: 'Wallet Style Cases' },
                  { name: 'Book Style Cases' },
                ],
              },
              {
                name: 'Hard Shell Cases',
                children: [
                  { name: 'Plastic Hard Cases' },
                  { name: 'Metal Hard Cases' },
                  { name: 'Carbon Fiber Cases' },
                  { name: 'Military Grade Cases' },
                ],
              },
              {
                name: 'Wallet Cases',
                children: [
                  { name: 'Card Holder Cases' },
                  { name: 'Money Clip Cases' },
                  { name: 'ID Holder Cases' },
                ],
              },
              {
                name: 'Custom & Designer Cases',
                children: [
                  { name: 'Personalized Cases' },
                  { name: 'Brand Designer Cases' },
                  { name: 'Limited Edition Cases' },
                ],
              },
              {
                name: 'Screen Protector Cases',
                children: [
                  { name: 'Built-in Screen Protectors' },
                  { name: 'Flip Cases with Screen Protection' },
                ],
              },
            ],
          },
          {
            name: 'Screen Protectors',
            children: [
              {
                name: 'Tempered Glass Screen Protectors',
                children: [
                  { name: 'Full Coverage Glass' },
                  { name: 'Edge-to-Edge Glass' },
                  { name: 'Curved Glass Protectors' },
                  { name: 'Anti-Blue Light Glass' },
                ],
              },
              {
                name: 'Plastic Film Protectors',
                children: [
                  { name: 'Matte Film Protectors' },
                  { name: 'Glossy Film Protectors' },
                  { name: 'Privacy Film Protectors' },
                ],
              },
              {
                name: 'Privacy Screen Protectors',
                children: [
                  { name: 'Anti-Peek Protectors' },
                  { name: 'Anti-Glare Protectors' },
                  { name: 'UV Blocking Protectors' },
                ],
              },
              {
                name: 'Color Screen Protectors',
                children: [
                  { name: 'Black Screen Protectors' },
                  { name: 'White Screen Protectors' },
                  { name: 'Custom Color Protectors' },
                ],
              },
            ],
          },
          {
            name: 'Chargers & Cables',
            children: [
              {
                name: 'USB-C Cables',
                children: [
                  { name: 'USB-C to USB-C Cables' },
                  { name: 'USB-C to USB-A Cables' },
                  { name: 'USB-C to Lightning Cables' },
                  { name: 'USB-C to HDMI Cables' },
                  { name: 'Braided USB-C Cables' },
                  { name: 'Fast Charging USB-C Cables' },
                ],
              },
              {
                name: 'Lightning Cables',
                children: [
                  { name: 'Lightning to USB-A Cables' },
                  { name: 'Lightning to USB-C Cables' },
                  { name: 'MFi Certified Cables' },
                  { name: 'Braided Lightning Cables' },
                ],
              },
              {
                name: 'Micro USB Cables',
                children: [
                  { name: 'Micro USB to USB-A Cables' },
                  { name: 'Micro USB to USB-C Cables' },
                  { name: 'Fast Charging Micro USB Cables' },
                ],
              },
              {
                name: 'Wireless Chargers',
                children: [
                  { name: 'Qi Wireless Chargers' },
                  { name: 'Fast Wireless Chargers' },
                  { name: 'Wireless Charging Pads' },
                  { name: 'Wireless Charging Stands' },
                  { name: 'Multi-Device Chargers' },
                ],
              },
              {
                name: 'Wall Chargers',
                children: [
                  { name: 'USB Wall Chargers' },
                  { name: 'Wireless Wall Chargers' },
                  { name: 'Multi-Port Wall Chargers' },
                  { name: 'Travel Wall Chargers' },
                ],
              },
              {
                name: 'Car Chargers',
                children: [
                  { name: 'USB Car Chargers' },
                  { name: 'Wireless Car Chargers' },
                  { name: 'Multi-Port Car Chargers' },
                ],
              },
            ],
          },
          {
            name: 'Power Banks',
            children: [
              {
                name: 'Portable Power Banks',
                children: [
                  { name: '10000mAh Power Banks' },
                  { name: '20000mAh Power Banks' },
                  { name: '30000mAh Power Banks' },
                  { name: '50000mAh Power Banks' },
                  { name: 'Ultra-High Capacity Power Banks' },
                ],
              },
              {
                name: 'Solar Power Banks',
                children: [
                  { name: 'Foldable Solar Panels' },
                  { name: 'Solar Power Bank Combo' },
                  { name: 'Outdoor Solar Chargers' },
                ],
              },
              {
                name: 'Wireless Power Banks',
                children: [
                  { name: 'Qi Wireless Power Banks' },
                  { name: 'Magnetic Wireless Power Banks' },
                  { name: 'Multi-Device Wireless Power Banks' },
                ],
              },
              {
                name: 'Power Bank Accessories',
                children: [
                  { name: 'Power Bank Cases' },
                  { name: 'Carrying Pouches' },
                  { name: 'Power Bank Stands' },
                ],
              },
            ],
          },
          {
            name: 'Phone Holders & Stands',
            children: [
              {
                name: 'Car Phone Mounts',
                children: [
                  { name: 'Dashboard Mounts' },
                  { name: 'Vent Mounts' },
                  { name: 'CD Slot Mounts' },
                  { name: 'Magnetic Car Mounts' },
                  { name: 'Suction Cup Mounts' },
                ],
              },
              {
                name: 'Desk Stands',
                children: [
                  { name: 'Adjustable Desk Stands' },
                  { name: 'Wireless Charging Stands' },
                  { name: 'Foldable Desk Stands' },
                  { name: 'Multi-Angle Stands' },
                ],
              },
              {
                name: 'Wall Mounts',
                children: [
                  { name: 'Fixed Wall Mounts' },
                  { name: 'Adjustable Wall Mounts' },
                  { name: 'Magnetic Wall Mounts' },
                ],
              },
              {
                name: 'Bed & Pillow Mounts',
                children: [
                  { name: 'Bedside Mounts' },
                  { name: 'Pillow Clips' },
                  { name: 'Bed Rail Mounts' },
                ],
              },
            ],
          },
          {
            name: 'Selfie Sticks & Tripods',
            children: [
              {
                name: 'Bluetooth Selfie Sticks',
                children: [
                  { name: 'Basic Selfie Sticks' },
                  { name: 'Extendable Selfie Sticks' },
                  { name: 'Stabilizing Selfie Sticks' },
                ],
              },
              {
                name: 'Tripods',
                children: [
                  { name: 'Mini Tripods' },
                  { name: 'Full-Size Tripods' },
                  { name: 'Travel Tripods' },
                  { name: 'Selfie Tripods' },
                ],
              },
              {
                name: 'Gimbals & Stabilizers',
                children: [
                  { name: 'Handheld Gimbals' },
                  { name: 'Phone Gimbals' },
                  { name: 'Stabilizer Accessories' },
                ],
              },
            ],
          },
          {
            name: 'Phone Lenses & Optics',
            children: [
              {
                name: 'Wide Angle Lenses',
                children: [
                  { name: '0.6x Wide Angle Lenses' },
                  { name: '0.4x Wide Angle Lenses' },
                  { name: 'Fisheye Lenses' },
                ],
              },
              {
                name: 'Macro Lenses',
                children: [
                  { name: '10x Macro Lenses' },
                  { name: '15x Macro Lenses' },
                  { name: '20x Macro Lenses' },
                ],
              },
              {
                name: 'Telephoto Lenses',
                children: [
                  { name: '2x Telephoto Lenses' },
                  { name: '3x Telephoto Lenses' },
                  { name: '5x Telephoto Lenses' },
                ],
              },
              {
                name: 'Lens Kits',
                children: [
                  { name: 'Complete Lens Kits' },
                  { name: 'Professional Lens Kits' },
                  { name: 'Budget Lens Kits' },
                ],
              },
            ],
          },
          {
            name: 'Phone Cleaning & Maintenance',
            children: [
              { name: 'Cleaning Cloths' },
              { name: 'Cleaning Kits' },
              { name: 'Screen Cleaning Sprays' },
              { name: 'Phone Cleaning Brushes' },
            ],
          },
          {
            name: 'Phone Skins & Wraps',
            children: [
              { name: 'Vinyl Skins' },
              { name: 'Carbon Fiber Skins' },
              { name: 'Wood Grain Skins' },
              { name: 'Custom Printed Skins' },
            ],
          },
        ],
      },
      {
        name: 'Tablet Accessories',
        children: [
          {
            name: 'Tablet Cases & Covers',
            children: [
              { name: 'Folio Cases' },
              { name: 'Sleeve Cases' },
              { name: 'Keyboard Cases' },
              { name: 'Stand Cases' },
            ],
          },
          {
            name: 'Tablet Screen Protectors',
            children: [
              { name: 'Tempered Glass Protectors' },
              { name: 'Plastic Film Protectors' },
              { name: 'Privacy Protectors' },
            ],
          },
          {
            name: 'Tablet Styluses',
            children: [
              { name: 'Capacitive Styluses' },
              { name: 'Active Styluses' },
              { name: 'Bluetooth Styluses' },
            ],
          },
          {
            name: 'Tablet Stands & Holders',
            children: [
              { name: 'Adjustable Stands' },
              { name: 'Car Mounts' },
              { name: 'Wall Mounts' },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Computers & Laptops',
    billboard: 'Computers & Laptops',
    children: [
      {
        name: 'Laptops',
        children: [
          {
            name: 'Gaming Laptops',
            children: [
              {
                name: 'High-End Gaming Laptops',
                children: [
                  { name: 'RTX 40 Series Gaming Laptops' },
                  { name: 'RTX 30 Series Gaming Laptops' },
                  { name: 'Dual GPU Gaming Laptops' },
                  { name: '4K Gaming Laptops' },
                ],
              },
              {
                name: 'Mid-Range Gaming Laptops',
                children: [
                  { name: 'RTX 30 Series Mid-Range' },
                  { name: 'GTX 16 Series Gaming Laptops' },
                  { name: '1650 Gaming Laptops' },
                  { name: '1660 Gaming Laptops' },
                ],
              },
              {
                name: 'Budget Gaming Laptops',
                children: [
                  { name: 'GTX 1650 Budget Laptops' },
                  { name: 'Integrated Graphics Gaming' },
                  { name: 'Entry-Level Gaming Laptops' },
                ],
              },
              {
                name: 'Brand Gaming Laptops',
                children: [
                  { name: 'Alienware Gaming Laptops' },
                  { name: 'MSI Gaming Laptops' },
                  { name: 'ASUS ROG Gaming Laptops' },
                  { name: 'Razer Blade Gaming Laptops' },
                  { name: 'Lenovo Legion Gaming Laptops' },
                  { name: 'HP Omen Gaming Laptops' },
                  { name: 'Acer Predator Gaming Laptops' },
                  { name: 'Dell G Series Gaming Laptops' },
                ],
              },
            ],
          },
          {
            name: 'Business Laptops',
            children: [
              {
                name: 'Ultrabooks',
                children: [
                  { name: '13-inch Ultrabooks' },
                  { name: '14-inch Ultrabooks' },
                  { name: '15-inch Ultrabooks' },
                  { name: 'Touchscreen Ultrabooks' },
                ],
              },
              {
                name: 'Workstation Laptops',
                children: [
                  { name: 'Mobile Workstations' },
                  { name: 'CAD Workstations' },
                  { name: 'Engineering Laptops' },
                  { name: 'Content Creation Laptops' },
                ],
              },
              {
                name: 'Brand Business Laptops',
                children: [
                  { name: 'ThinkPad Business Laptops' },
                  { name: 'Dell Latitude Business Laptops' },
                  { name: 'HP EliteBook Business Laptops' },
                  { name: 'Lenovo ThinkBook Business Laptops' },
                  { name: 'Apple MacBook Pro Business' },
                  { name: 'Surface Laptop Business' },
                ],
              },
            ],
          },
          {
            name: 'Student Laptops',
            children: [
              {
                name: 'Budget Student Laptops',
                children: [
                  { name: 'Under $300 Student Laptops' },
                  { name: 'Under $500 Student Laptops' },
                  { name: 'Chromebooks for Students' },
                  { name: 'Basic Windows Student Laptops' },
                ],
              },
              {
                name: 'Premium Student Laptops',
                children: [
                  { name: 'MacBook Air for Students' },
                  { name: 'Surface Laptop for Students' },
                  { name: 'Lightweight Student Laptops' },
                  { name: 'Long Battery Life Student Laptops' },
                ],
              },
            ],
          },
          {
            name: '2-in-1 Laptops',
            children: [
              {
                name: 'Touchscreen 2-in-1',
                children: [
                  { name: '13-inch 2-in-1 Laptops' },
                  { name: '15-inch 2-in-1 Laptops' },
                  { name: 'Premium 2-in-1 Laptops' },
                  { name: 'Budget 2-in-1 Laptops' },
                ],
              },
              {
                name: 'Brand 2-in-1 Laptops',
                children: [
                  { name: 'Surface Pro 2-in-1' },
                  { name: 'Lenovo Yoga 2-in-1' },
                  { name: 'HP Spectre 2-in-1' },
                  { name: 'Dell XPS 2-in-1' },
                ],
              },
            ],
          },
          {
            name: 'Chromebooks',
            children: [
              {
                name: 'Premium Chromebooks',
                children: [
                  { name: 'Pixelbook Chromebooks' },
                  { name: 'High-End Chromebooks' },
                  { name: 'Touchscreen Chromebooks' },
                ],
              },
              {
                name: 'Budget Chromebooks',
                children: [
                  { name: 'Basic Chromebooks' },
                  { name: 'Student Chromebooks' },
                  { name: 'Entry-Level Chromebooks' },
                ],
              },
              {
                name: 'Brand Chromebooks',
                children: [
                  { name: 'Acer Chromebooks' },
                  { name: 'ASUS Chromebooks' },
                  { name: 'HP Chromebooks' },
                  { name: 'Lenovo Chromebooks' },
                  { name: 'Samsung Chromebooks' },
                ],
              },
            ],
          },
          {
            name: 'MacBooks',
            children: [
              {
                name: 'MacBook Pro',
                children: [
                  { name: '14-inch MacBook Pro' },
                  { name: '16-inch MacBook Pro' },
                  { name: 'M1 MacBook Pro' },
                  { name: 'M2 MacBook Pro' },
                  { name: 'M3 MacBook Pro' },
                ],
              },
              {
                name: 'MacBook Air',
                children: [
                  { name: '13-inch MacBook Air' },
                  { name: '15-inch MacBook Air' },
                  { name: 'M1 MacBook Air' },
                  { name: 'M2 MacBook Air' },
                  { name: 'M3 MacBook Air' },
                ],
              },
              {
                name: 'MacBook',
                children: [
                  { name: '12-inch MacBook' },
                  { name: 'Retina MacBook' },
                ],
              },
            ],
          },
          {
            name: 'Refurbished Laptops',
            children: [
              { name: 'Refurbished Gaming Laptops' },
              { name: 'Refurbished Business Laptops' },
              { name: 'Refurbished Student Laptops' },
              { name: 'Certified Refurbished Laptops' },
            ],
          },
        ],
      },
      {
        name: 'Desktop Computers',
        children: [
          {
            name: 'Gaming Desktops',
            children: [
              {
                name: 'High-End Gaming PCs',
                children: [
                  { name: 'RTX 40 Series Gaming PCs' },
                  { name: 'RTX 30 Series Gaming PCs' },
                  { name: 'Dual GPU Gaming PCs' },
                  { name: '4K Gaming PCs' },
                ],
              },
              {
                name: 'Mid-Range Gaming PCs',
                children: [
                  { name: 'RTX 30 Series Mid-Range PCs' },
                  { name: 'GTX 16 Series Gaming PCs' },
                  { name: '1650 Gaming PCs' },
                  { name: '1660 Gaming PCs' },
                ],
              },
              {
                name: 'Budget Gaming PCs',
                children: [
                  { name: 'GTX 1650 Budget PCs' },
                  { name: 'Integrated Graphics Gaming PCs' },
                  { name: 'Entry-Level Gaming PCs' },
                ],
              },
              {
                name: 'Pre-Built Gaming PCs',
                children: [
                  { name: 'Alienware Gaming PCs' },
                  { name: 'Corsair Gaming PCs' },
                  { name: 'iBUYPOWER Gaming PCs' },
                  { name: 'CyberPowerPC Gaming PCs' },
                  { name: 'Maingear Gaming PCs' },
                ],
              },
            ],
          },
          {
            name: 'Workstation Desktops',
            children: [
              {
                name: 'Professional Workstations',
                children: [
                  { name: 'CAD Workstations' },
                  { name: 'Video Editing Workstations' },
                  { name: '3D Rendering Workstations' },
                  { name: 'Scientific Computing Workstations' },
                ],
              },
              {
                name: 'Brand Workstations',
                children: [
                  { name: 'Dell Precision Workstations' },
                  { name: 'HP Z Series Workstations' },
                  { name: 'Lenovo ThinkStation Workstations' },
                  { name: 'Apple Mac Pro' },
                  { name: 'Apple Mac Studio' },
                ],
              },
            ],
          },
          {
            name: 'All-in-One PCs',
            children: [
              {
                name: 'Premium All-in-One PCs',
                children: [
                  { name: '27-inch All-in-One PCs' },
                  { name: '32-inch All-in-One PCs' },
                  { name: 'Touchscreen All-in-One PCs' },
                ],
              },
              {
                name: 'Budget All-in-One PCs',
                children: [
                  { name: '21-inch All-in-One PCs' },
                  { name: '24-inch All-in-One PCs' },
                  { name: 'Basic All-in-One PCs' },
                ],
              },
              {
                name: 'Brand All-in-One PCs',
                children: [
                  { name: 'iMac All-in-One' },
                  { name: 'Surface Studio All-in-One' },
                  { name: 'HP Envy All-in-One' },
                  { name: 'Lenovo IdeaCentre All-in-One' },
                ],
              },
            ],
          },
          {
            name: 'Mini PCs',
            children: [
              {
                name: 'Intel NUC Mini PCs',
                children: [
                  { name: 'NUC 11 Mini PCs' },
                  { name: 'NUC 12 Mini PCs' },
                  { name: 'NUC 13 Mini PCs' },
                ],
              },
              {
                name: 'Brand Mini PCs',
                children: [
                  { name: 'Apple Mac Mini' },
                  { name: 'ASUS PN Series Mini PCs' },
                  { name: 'HP Mini PCs' },
                  { name: 'Lenovo ThinkCentre Mini PCs' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Computer Accessories',
        children: [
          {
            name: 'Keyboards & Mice',
            children: [
              {
                name: 'Gaming Keyboards',
                children: [
                  {
                    name: 'Mechanical Gaming Keyboards',
                    children: [
                      { name: 'Cherry MX Red Keyboards' },
                      { name: 'Cherry MX Blue Keyboards' },
                      { name: 'Cherry MX Brown Keyboards' },
                      { name: 'Cherry MX Black Keyboards' },
                      { name: 'RGB Mechanical Keyboards' },
                      { name: 'TKL Mechanical Keyboards' },
                      { name: 'Full-Size Mechanical Keyboards' },
                    ],
                  },
                  {
                    name: 'Membrane Gaming Keyboards',
                    children: [
                      { name: 'RGB Membrane Keyboards' },
                      { name: 'Budget Gaming Keyboards' },
                      { name: 'Compact Gaming Keyboards' },
                    ],
                  },
                  {
                    name: 'Brand Gaming Keyboards',
                    children: [
                      { name: 'Razer Gaming Keyboards' },
                      { name: 'Corsair Gaming Keyboards' },
                      { name: 'Logitech Gaming Keyboards' },
                      { name: 'SteelSeries Gaming Keyboards' },
                      { name: 'HyperX Gaming Keyboards' },
                    ],
                  },
                ],
              },
              {
                name: 'Office Keyboards',
                children: [
                  {
                    name: 'Wireless Office Keyboards',
                    children: [
                      { name: 'Bluetooth Keyboards' },
                      { name: 'RF Wireless Keyboards' },
                      { name: 'Multi-Device Keyboards' },
                    ],
                  },
                  {
                    name: 'Ergonomic Keyboards',
                    children: [
                      { name: 'Split Ergonomic Keyboards' },
                      { name: 'Curved Ergonomic Keyboards' },
                      { name: 'Standing Desks Keyboards' },
                    ],
                  },
                  {
                    name: 'Compact Keyboards',
                    children: [
                      { name: '60% Keyboards' },
                      { name: '75% Keyboards' },
                      { name: 'Tenkeyless Keyboards' },
                    ],
                  },
                ],
              },
              {
                name: 'Gaming Mice',
                children: [
                  {
                    name: 'Wired Gaming Mice',
                    children: [
                      { name: '1000Hz Gaming Mice' },
                      { name: '2000Hz Gaming Mice' },
                      { name: '8000Hz Gaming Mice' },
                      { name: 'Lightweight Gaming Mice' },
                    ],
                  },
                  {
                    name: 'Wireless Gaming Mice',
                    children: [
                      { name: '2.4GHz Wireless Gaming Mice' },
                      { name: 'Bluetooth Gaming Mice' },
                      { name: 'Hybrid Wireless Gaming Mice' },
                    ],
                  },
                  {
                    name: 'Brand Gaming Mice',
                    children: [
                      { name: 'Razer Gaming Mice' },
                      { name: 'Logitech Gaming Mice' },
                      { name: 'Corsair Gaming Mice' },
                      { name: 'SteelSeries Gaming Mice' },
                      { name: 'HyperX Gaming Mice' },
                    ],
                  },
                ],
              },
              {
                name: 'Office Mice',
                children: [
                  {
                    name: 'Wireless Office Mice',
                    children: [
                      { name: 'Bluetooth Office Mice' },
                      { name: 'RF Wireless Office Mice' },
                      { name: 'Ergonomic Wireless Mice' },
                    ],
                  },
                  {
                    name: 'Trackball Mice',
                    children: [
                      { name: 'Wired Trackball Mice' },
                      { name: 'Wireless Trackball Mice' },
                      { name: 'Ergonomic Trackball Mice' },
                    ],
                  },
                ],
              },
              {
                name: 'Keyboard & Mouse Combos',
                children: [
                  { name: 'Gaming KM Combos' },
                  { name: 'Office KM Combos' },
                  { name: 'Wireless KM Combos' },
                  { name: 'RGB KM Combos' },
                ],
              },
            ],
          },
          {
            name: 'Monitors',
            children: [
              {
                name: 'Gaming Monitors',
                children: [
                  {
                    name: '144Hz Gaming Monitors',
                    children: [
                      { name: '24-inch 144Hz Monitors' },
                      { name: '27-inch 144Hz Monitors' },
                      { name: '32-inch 144Hz Monitors' },
                    ],
                  },
                  {
                    name: '240Hz Gaming Monitors',
                    children: [
                      { name: '24-inch 240Hz Monitors' },
                      { name: '27-inch 240Hz Monitors' },
                      { name: '32-inch 240Hz Monitors' },
                    ],
                  },
                  {
                    name: '4K Gaming Monitors',
                    children: [
                      { name: '27-inch 4K Monitors' },
                      { name: '32-inch 4K Monitors' },
                      { name: '43-inch 4K Monitors' },
                    ],
                  },
                  {
                    name: 'Ultra-Wide Gaming Monitors',
                    children: [
                      { name: '29-inch Ultra-Wide Monitors' },
                      { name: '34-inch Ultra-Wide Monitors' },
                      { name: '38-inch Ultra-Wide Monitors' },
                    ],
                  },
                  {
                    name: 'Curved Gaming Monitors',
                    children: [
                      { name: '24-inch Curved Monitors' },
                      { name: '27-inch Curved Monitors' },
                      { name: '32-inch Curved Monitors' },
                      { name: '35-inch Curved Monitors' },
                    ],
                  },
                ],
              },
              {
                name: 'Professional Monitors',
                children: [
                  {
                    name: '4K Professional Monitors',
                    children: [
                      { name: '27-inch 4K Pro Monitors' },
                      { name: '32-inch 4K Pro Monitors' },
                      { name: '43-inch 4K Pro Monitors' },
                    ],
                  },
                  {
                    name: 'Color Accurate Monitors',
                    children: [
                      { name: '99% sRGB Monitors' },
                      { name: '100% sRGB Monitors' },
                      { name: 'Adobe RGB Monitors' },
                      { name: 'DCI-P3 Monitors' },
                    ],
                  },
                  {
                    name: 'CAD Monitors',
                    children: [
                      { name: 'Dual Monitor Setups' },
                      { name: 'Ultra-Wide CAD Monitors' },
                      { name: 'High PPI CAD Monitors' },
                    ],
                  },
                ],
              },
              {
                name: 'Office Monitors',
                children: [
                  {
                    name: '24-inch Office Monitors',
                    children: [
                      { name: '1080p Office Monitors' },
                      { name: '1440p Office Monitors' },
                      { name: '4K Office Monitors' },
                    ],
                  },
                  {
                    name: '27-inch Office Monitors',
                    children: [
                      { name: '1440p Office Monitors' },
                      { name: '4K Office Monitors' },
                      { name: 'Ultrawide Office Monitors' },
                    ],
                  },
                  {
                    name: 'Dual Monitor Setups',
                    children: [
                      { name: 'Matching Dual Monitors' },
                      { name: 'Mixed Dual Monitors' },
                      { name: 'Vertical Dual Monitors' },
                    ],
                  },
                ],
              },
              {
                name: 'Portable Monitors',
                children: [
                  {
                    name: '15-inch Portable Monitors',
                    children: [
                      { name: '1080p Portable Monitors' },
                      { name: '2K Portable Monitors' },
                    ],
                  },
                  {
                    name: '17-inch Portable Monitors',
                    children: [
                      { name: '1080p Portable Monitors' },
                      { name: '4K Portable Monitors' },
                    ],
                  },
                  {
                    name: 'Brand Portable Monitors',
                    children: [
                      { name: 'ASUS Portable Monitors' },
                      { name: 'HP Portable Monitors' },
                      { name: 'Lenovo Portable Monitors' },
                    ],
                  },
                ],
              },
              {
                name: 'Monitor Accessories',
                children: [
                  { name: 'Monitor Arms' },
                  { name: 'Monitor Stands' },
                  { name: 'VESA Mounts' },
                  { name: 'Monitor Light Bars' },
                  { name: 'Screen Protectors' },
                ],
              },
            ],
          },
          {
            name: 'Webcams',
            children: [
              {
                name: '4K Webcams',
                children: [
                  { name: 'Logitech 4K Webcams' },
                  { name: 'Razer 4K Webcams' },
                  { name: 'Sony 4K Webcams' },
                ],
              },
              {
                name: '1080p Webcams',
                children: [
                  { name: 'Logitech 1080p Webcams' },
                  { name: 'Microsoft 1080p Webcams' },
                  { name: 'AverMedia 1080p Webcams' },
                ],
              },
              {
                name: 'Streaming Webcams',
                children: [
                  { name: 'Ring Light Webcams' },
                  { name: 'Green Screen Webcams' },
                  { name: 'Wide Angle Streaming Webcams' },
                ],
              },
              {
                name: 'Business Webcams',
                children: [
                  { name: 'Conference Room Webcams' },
                  { name: 'PTZ Webcams' },
                  { name: '4K Conference Webcams' },
                ],
              },
            ],
          },
          {
            name: 'Laptop Bags & Cases',
            children: [
              {
                name: 'Backpack Laptop Bags',
                children: [
                  { name: '15-inch Laptop Backpacks' },
                  { name: '17-inch Laptop Backpacks' },
                  { name: '13-inch Laptop Backpacks' },
                  { name: 'Business Laptop Backpacks' },
                ],
              },
              {
                name: 'Messenger Laptop Bags',
                children: [
                  { name: '15-inch Messenger Bags' },
                  { name: '13-inch Messenger Bags' },
                  { name: 'Professional Messenger Bags' },
                ],
              },
              {
                name: 'Sleeve Laptop Cases',
                children: [
                  { name: '15-inch Sleeves' },
                  { name: '13-inch Sleeves' },
                  { name: '17-inch Sleeves' },
                  { name: 'Padded Sleeves' },
                ],
              },
              {
                name: 'Rolling Laptop Cases',
                children: [
                  { name: '15-inch Rolling Cases' },
                  { name: '17-inch Rolling Cases' },
                  { name: 'Business Rolling Cases' },
                ],
              },
            ],
          },
          {
            name: 'Cooling Pads',
            children: [
              {
                name: 'Active Cooling Pads',
                children: [
                  { name: 'USB Powered Cooling Pads' },
                  { name: 'Multi-Fan Cooling Pads' },
                  { name: 'RGB Cooling Pads' },
                ],
              },
              {
                name: 'Passive Cooling Pads',
                children: [
                  { name: 'Aluminum Cooling Pads' },
                  { name: 'Mesh Cooling Pads' },
                  { name: 'Height Adjustable Pads' },
                ],
              },
              {
                name: 'Brand Cooling Pads',
                children: [
                  { name: 'Cooler Master Cooling Pads' },
                  { name: 'Thermaltake Cooling Pads' },
                  { name: 'Corsair Cooling Pads' },
                ],
              },
            ],
          },
          {
            name: 'USB Hubs',
            children: [
              {
                name: 'USB-C Hubs',
                children: [
                  { name: '7-in-1 USB-C Hubs' },
                  { name: '10-in-1 USB-C Hubs' },
                  { name: '13-in-1 USB-C Hubs' },
                  { name: '100W USB-C Hubs' },
                ],
              },
              {
                name: 'USB-A Hubs',
                children: [
                  { name: '4-Port USB Hubs' },
                  { name: '7-Port USB Hubs' },
                  { name: '10-Port USB Hubs' },
                ],
              },
              {
                name: 'Brand USB Hubs',
                children: [
                  { name: 'Anker USB Hubs' },
                  { name: 'Satechi USB Hubs' },
                  { name: 'Baseus USB Hubs' },
                ],
              },
            ],
          },
          {
            name: 'KVM Switches',
            children: [
              {
                name: 'USB KVM Switches',
                children: [
                  { name: '2-Port KVM Switches' },
                  { name: '4-Port KVM Switches' },
                  { name: '8-Port KVM Switches' },
                ],
              },
              {
                name: 'IP KVM Switches',
                children: [
                  { name: 'Network KVM Switches' },
                  { name: 'Remote KVM Switches' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
  {
    name: 'Computer Components',
    billboard: 'Computer Components',
    children: [
      {
        name: 'Processors (CPUs)',
        children: [
          {
            name: 'Intel Processors',
            children: [
              {
                name: 'Intel Core i9',
                children: [
                  { name: '13th Gen Core i9' },
                  { name: '12th Gen Core i9' },
                  { name: '11th Gen Core i9' },
                  { name: '10th Gen Core i9' },
                ],
              },
              {
                name: 'Intel Core i7',
                children: [
                  { name: '13th Gen Core i7' },
                  { name: '12th Gen Core i7' },
                  { name: '11th Gen Core i7' },
                  { name: '10th Gen Core i7' },
                ],
              },
              {
                name: 'Intel Core i5',
                children: [
                  { name: '13th Gen Core i5' },
                  { name: '12th Gen Core i5' },
                  { name: '11th Gen Core i5' },
                  { name: '10th Gen Core i5' },
                ],
              },
              {
                name: 'Intel Core i3',
                children: [
                  { name: '13th Gen Core i3' },
                  { name: '12th Gen Core i3' },
                  { name: '11th Gen Core i3' },
                  { name: '10th Gen Core i3' },
                ],
              },
              {
                name: 'Intel Xeon',
                children: [
                  { name: 'Xeon W Series' },
                  { name: 'Xeon Scalable Series' },
                  { name: 'Xeon Bronze Series' },
                ],
              },
              {
                name: 'Intel Celeron & Pentium',
                children: [
                  { name: 'Celeron G Series' },
                  { name: 'Pentium Gold Series' },
                ],
              },
            ],
          },
          {
            name: 'AMD Processors',
            children: [
              {
                name: 'AMD Ryzen 9',
                children: [
                  { name: 'Ryzen 9 7000 Series' },
                  { name: 'Ryzen 9 5000 Series' },
                  { name: 'Ryzen 9 3000 Series' },
                ],
              },
              {
                name: 'AMD Ryzen 7',
                children: [
                  { name: 'Ryzen 7 7000 Series' },
                  { name: 'Ryzen 7 5000 Series' },
                  { name: 'Ryzen 7 3000 Series' },
                ],
              },
              {
                name: 'AMD Ryzen 5',
                children: [
                  { name: 'Ryzen 5 7000 Series' },
                  { name: 'Ryzen 5 5000 Series' },
                  { name: 'Ryzen 5 3000 Series' },
                ],
              },
              {
                name: 'AMD Ryzen 3',
                children: [
                  { name: 'Ryzen 3 7000 Series' },
                  { name: 'Ryzen 3 5000 Series' },
                  { name: 'Ryzen 3 3000 Series' },
                ],
              },
              {
                name: 'AMD Ryzen Threadripper',
                children: [
                  { name: 'Threadripper 7000 Series' },
                  { name: 'Threadripper 5000 Series' },
                  { name: 'Threadripper 3000 Series' },
                ],
              },
              {
                name: 'AMD Athlon',
                children: [
                  { name: 'Athlon 3000 Series' },
                  { name: 'Athlon Silver Series' },
                ],
              },
            ],
          },
          {
            name: 'Apple Silicon',
            children: [
              { name: 'Apple M3 Series' },
              { name: 'Apple M2 Series' },
              { name: 'Apple M1 Series' },
              { name: 'Apple M1 Ultra' },
              { name: 'Apple M1 Max' },
              { name: 'Apple M1 Pro' },
            ],
          },
        ],
      },
      {
        name: 'Graphics Cards (GPUs)',
        children: [
          {
            name: 'NVIDIA GeForce RTX',
            children: [
              {
                name: 'RTX 40 Series',
                children: [
                  { name: 'RTX 4090' },
                  { name: 'RTX 4080' },
                  { name: 'RTX 4070 Ti' },
                  { name: 'RTX 4070' },
                  { name: 'RTX 4060 Ti' },
                  { name: 'RTX 4060' },
                ],
              },
              {
                name: 'RTX 30 Series',
                children: [
                  { name: 'RTX 3090 Ti' },
                  { name: 'RTX 3090' },
                  { name: 'RTX 3080 Ti' },
                  { name: 'RTX 3080' },
                  { name: 'RTX 3070 Ti' },
                  { name: 'RTX 3070' },
                  { name: 'RTX 3060 Ti' },
                  { name: 'RTX 3060' },
                  { name: 'RTX 3050' },
                ],
              },
              {
                name: 'RTX 20 Series',
                children: [
                  { name: 'RTX 2080 Ti' },
                  { name: 'RTX 2080 Super' },
                  { name: 'RTX 2080' },
                  { name: 'RTX 2070 Super' },
                  { name: 'RTX 2070' },
                  { name: 'RTX 2060 Super' },
                  { name: 'RTX 2060' },
                ],
              },
            ],
          },
          {
            name: 'NVIDIA GeForce GTX',
            children: [
              {
                name: 'GTX 16 Series',
                children: [
                  { name: 'GTX 1660 Ti' },
                  { name: 'GTX 1660 Super' },
                  { name: 'GTX 1660' },
                  { name: 'GTX 1650 Super' },
                  { name: 'GTX 1650' },
                ],
              },
              {
                name: 'GTX 10 Series',
                children: [
                  { name: 'GTX 1080 Ti' },
                  { name: 'GTX 1080' },
                  { name: 'GTX 1070 Ti' },
                  { name: 'GTX 1070' },
                  { name: 'GTX 1060' },
                  { name: 'GTX 1050 Ti' },
                  { name: 'GTX 1050' },
                ],
              },
            ],
          },
          {
            name: 'AMD Radeon RX',
            children: [
              {
                name: 'RX 7000 Series',
                children: [
                  { name: 'RX 7900 XTX' },
                  { name: 'RX 7900 XT' },
                  { name: 'RX 7800 XT' },
                  { name: 'RX 7700 XT' },
                  { name: 'RX 7600' },
                ],
              },
              {
                name: 'RX 6000 Series',
                children: [
                  { name: 'RX 6950 XT' },
                  { name: 'RX 6900 XT' },
                  { name: 'RX 6800 XT' },
                  { name: 'RX 6800' },
                  { name: 'RX 6750 XT' },
                  { name: 'RX 6700 XT' },
                  { name: 'RX 6650 XT' },
                  { name: 'RX 6600 XT' },
                  { name: 'RX 6600' },
                  { name: 'RX 6500 XT' },
                  { name: 'RX 6400' },
                ],
              },
              {
                name: 'RX 5000 Series',
                children: [
                  { name: 'RX 5700 XT' },
                  { name: 'RX 5700' },
                  { name: 'RX 5600 XT' },
                  { name: 'RX 5500 XT' },
                ],
              },
            ],
          },
          {
            name: 'Integrated Graphics',
            children: [
              { name: 'Intel Integrated Graphics' },
              { name: 'AMD Integrated Graphics' },
              { name: 'Apple Integrated Graphics' },
            ],
          },
          {
            name: 'Workstation GPUs',
            children: [
              {
                name: 'NVIDIA RTX A Series',
                children: [
                  { name: 'RTX A6000' },
                  { name: 'RTX A5000' },
                  { name: 'RTX A4000' },
                  { name: 'RTX A2000' },
                ],
              },
              {
                name: 'AMD Radeon Pro',
                children: [
                  { name: 'Radeon Pro W6000 Series' },
                  { name: 'Radeon Pro W5000 Series' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Motherboards',
        children: [
          {
            name: 'Intel Motherboards',
            children: [
              {
                name: 'Z790 Motherboards',
                children: [
                  { name: 'ATX Z790 Motherboards' },
                  { name: 'Micro-ATX Z790 Motherboards' },
                  { name: 'Mini-ITX Z790 Motherboards' },
                ],
              },
              {
                name: 'Z690 Motherboards',
                children: [
                  { name: 'ATX Z690 Motherboards' },
                  { name: 'Micro-ATX Z690 Motherboards' },
                  { name: 'Mini-ITX Z690 Motherboards' },
                ],
              },
              {
                name: 'B760 Motherboards',
                children: [
                  { name: 'ATX B760 Motherboards' },
                  { name: 'Micro-ATX B760 Motherboards' },
                  { name: 'Mini-ITX B760 Motherboards' },
                ],
              },
              {
                name: 'H770 Motherboards',
                children: [
                  { name: 'ATX H770 Motherboards' },
                  { name: 'Micro-ATX H770 Motherboards' },
                ],
              },
              {
                name: 'H610 Motherboards',
                children: [
                  { name: 'Micro-ATX H610 Motherboards' },
                  { name: 'Mini-ITX H610 Motherboards' },
                ],
              },
            ],
          },
          {
            name: 'AMD Motherboards',
            children: [
              {
                name: 'X670E Motherboards',
                children: [
                  { name: 'ATX X670E Motherboards' },
                  { name: 'Micro-ATX X670E Motherboards' },
                  { name: 'Mini-ITX X670E Motherboards' },
                ],
              },
              {
                name: 'X670 Motherboards',
                children: [
                  { name: 'ATX X670 Motherboards' },
                  { name: 'Micro-ATX X670 Motherboards' },
                  { name: 'Mini-ITX X670 Motherboards' },
                ],
              },
              {
                name: 'B650E Motherboards',
                children: [
                  { name: 'ATX B650E Motherboards' },
                  { name: 'Micro-ATX B650E Motherboards' },
                  { name: 'Mini-ITX B650E Motherboards' },
                ],
              },
              {
                name: 'B650 Motherboards',
                children: [
                  { name: 'ATX B650 Motherboards' },
                  { name: 'Micro-ATX B650 Motherboards' },
                  { name: 'Mini-ITX B650 Motherboards' },
                ],
              },
              {
                name: 'A620 Motherboards',
                children: [
                  { name: 'Micro-ATX A620 Motherboards' },
                  { name: 'Mini-ITX A620 Motherboards' },
                ],
              },
            ],
          },
          {
            name: 'Brand Motherboards',
            children: [
              {
                name: 'ASUS Motherboards',
                children: [
                  { name: 'ASUS ROG Strix Motherboards' },
                  { name: 'ASUS TUF Gaming Motherboards' },
                  { name: 'ASUS Prime Motherboards' },
                  { name: 'ASUS ProArt Motherboards' },
                ],
              },
              {
                name: 'MSI Motherboards',
                children: [
                  { name: 'MSI MPG Motherboards' },
                  { name: 'MSI MAG Motherboards' },
                  { name: 'MSI PRO Motherboards' },
                ],
              },
              {
                name: 'Gigabyte Motherboards',
                children: [
                  { name: 'Gigabyte AORUS Motherboards' },
                  { name: 'Gigabyte Gaming Motherboards' },
                  { name: 'Gigabyte Ultra Durable Motherboards' },
                ],
              },
              {
                name: 'ASRock Motherboards',
                children: [
                  { name: 'ASRock Steel Legend Motherboards' },
                  { name: 'ASRock Taichi Motherboards' },
                  { name: 'ASRock Phantom Gaming Motherboards' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'RAM Memory',
        children: [
          {
            name: 'DDR5 RAM',
            children: [
              {
                name: 'DDR5-5600',
                children: [
                  { name: '16GB DDR5-5600' },
                  { name: '32GB DDR5-5600' },
                  { name: '64GB DDR5-5600' },
                ],
              },
              {
                name: 'DDR5-5200',
                children: [
                  { name: '16GB DDR5-5200' },
                  { name: '32GB DDR5-5200' },
                  { name: '64GB DDR5-5200' },
                ],
              },
              {
                name: 'DDR5-4800',
                children: [
                  { name: '16GB DDR5-4800' },
                  { name: '32GB DDR5-4800' },
                  { name: '64GB DDR5-4800' },
                ],
              },
            ],
          },
          {
            name: 'DDR4 RAM',
            children: [
              {
                name: 'DDR4-3600',
                children: [
                  { name: '8GB DDR4-3600' },
                  { name: '16GB DDR4-3600' },
                  { name: '32GB DDR4-3600' },
                  { name: '64GB DDR4-3600' },
                ],
              },
              {
                name: 'DDR4-3200',
                children: [
                  { name: '8GB DDR4-3200' },
                  { name: '16GB DDR4-3200' },
                  { name: '32GB DDR4-3200' },
                  { name: '64GB DDR4-3200' },
                ],
              },
              {
                name: 'DDR4-2666',
                children: [
                  { name: '8GB DDR4-2666' },
                  { name: '16GB DDR4-2666' },
                  { name: '32GB DDR4-2666' },
                ],
              },
            ],
          },
          {
            name: 'DDR3 RAM',
            children: [
              {
                name: 'DDR3-1600',
                children: [
                  { name: '4GB DDR3-1600' },
                  { name: '8GB DDR3-1600' },
                  { name: '16GB DDR3-1600' },
                ],
              },
              {
                name: 'DDR3-1333',
                children: [
                  { name: '4GB DDR3-1333' },
                  { name: '8GB DDR3-1333' },
                  { name: '16GB DDR3-1333' },
                ],
              },
            ],
          },
          {
            name: 'RAM Kits',
            children: [
              {
                name: 'Dual Channel Kits',
                children: [
                  { name: '2x8GB RAM Kits' },
                  { name: '2x16GB RAM Kits' },
                  { name: '2x32GB RAM Kits' },
                ],
              },
              {
                name: 'Quad Channel Kits',
                children: [
                  { name: '4x8GB RAM Kits' },
                  { name: '4x16GB RAM Kits' },
                  { name: '4x32GB RAM Kits' },
                ],
              },
              {
                name: 'RGB RAM Kits',
                children: [
                  { name: 'RGB DDR4 Kits' },
                  { name: 'RGB DDR5 Kits' },
                  { name: 'Addressable RGB RAM' },
                ],
              },
            ],
          },
          {
            name: 'Brand RAM',
            children: [
              {
                name: 'Corsair RAM',
                children: [
                  { name: 'Corsair Vengeance RAM' },
                  { name: 'Corsair Dominator RAM' },
                  { name: 'Corsair ValueSelect RAM' },
                ],
              },
              {
                name: 'G.Skill RAM',
                children: [
                  { name: 'G.Skill Ripjaws RAM' },
                  { name: 'G.Skill Trident Z RAM' },
                  { name: 'G.Skill Aegis RAM' },
                ],
              },
              {
                name: 'Kingston RAM',
                children: [
                  { name: 'Kingston HyperX RAM' },
                  { name: 'Kingston ValueRAM' },
                  { name: 'Kingston Server Premier RAM' },
                ],
              },
              {
                name: 'Crucial RAM',
                children: [
                  { name: 'Crucial Ballistix RAM' },
                  { name: 'Crucial Value RAM' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Hard Drives & SSDs',
        children: [
          {
            name: 'NVMe SSDs',
            children: [
              {
                name: 'PCIe 5.0 NVMe SSDs',
                children: [
                  { name: '1TB PCIe 5.0 SSDs' },
                  { name: '2TB PCIe 5.0 SSDs' },
                  { name: '4TB PCIe 5.0 SSDs' },
                  { name: '8TB PCIe 5.0 SSDs' },
                ],
              },
              {
                name: 'PCIe 4.0 NVMe SSDs',
                children: [
                  { name: '500GB PCIe 4.0 SSDs' },
                  { name: '1TB PCIe 4.0 SSDs' },
                  { name: '2TB PCIe 4.0 SSDs' },
                  { name: '4TB PCIe 4.0 SSDs' },
                ],
              },
              {
                name: 'PCIe 3.0 NVMe SSDs',
                children: [
                  { name: '250GB PCIe 3.0 SSDs' },
                  { name: '500GB PCIe 3.0 SSDs' },
                  { name: '1TB PCIe 3.0 SSDs' },
                  { name: '2TB PCIe 3.0 SSDs' },
                ],
              },
            ],
          },
          {
            name: 'SATA SSDs',
            children: [
              {
                name: '2.5-inch SATA SSDs',
                children: [
                  { name: '120GB SATA SSDs' },
                  { name: '250GB SATA SSDs' },
                  { name: '500GB SATA SSDs' },
                  { name: '1TB SATA SSDs' },
                  { name: '2TB SATA SSDs' },
                ],
              },
              {
                name: 'M.2 SATA SSDs',
                children: [
                  { name: '120GB M.2 SATA SSDs' },
                  { name: '250GB M.2 SATA SSDs' },
                  { name: '500GB M.2 SATA SSDs' },
                  { name: '1TB M.2 SATA SSDs' },
                ],
              },
            ],
          },
          {
            name: 'HDDs',
            children: [
              {
                name: '3.5-inch HDDs',
                children: [
                  { name: '500GB HDDs' },
                  { name: '1TB HDDs' },
                  { name: '2TB HDDs' },
                  { name: '3TB HDDs' },
                  { name: '4TB HDDs' },
                  { name: '6TB HDDs' },
                  { name: '8TB HDDs' },
                  { name: '10TB HDDs' },
                  { name: '12TB HDDs' },
                  { name: '14TB HDDs' },
                  { name: '16TB HDDs' },
                  { name: '18TB HDDs' },
                  { name: '20TB HDDs' },
                ],
              },
              {
                name: '2.5-inch HDDs',
                children: [
                  { name: '320GB 2.5-inch HDDs' },
                  { name: '500GB 2.5-inch HDDs' },
                  { name: '1TB 2.5-inch HDDs' },
                  { name: '2TB 2.5-inch HDDs' },
                ],
              },
              {
                name: 'External HDDs',
                children: [
                  { name: '500GB External HDDs' },
                  { name: '1TB External HDDs' },
                  { name: '2TB External HDDs' },
                  { name: '4TB External HDDs' },
                  { name: '5TB External HDDs' },
                  { name: '8TB External HDDs' },
                ],
              },
            ],
          },
          {
            name: 'SSD Brands',
            children: [
              {
                name: 'Samsung SSDs',
                children: [
                  { name: 'Samsung 980 PRO' },
                  { name: 'Samsung 970 EVO Plus' },
                  { name: 'Samsung 870 EVO' },
                  { name: 'Samsung T7 Shield' },
                ],
              },
              {
                name: 'Western Digital SSDs',
                children: [
                  { name: 'WD Black SN850X' },
                  { name: 'WD Blue SN570' },
                  { name: 'WD Red SA500' },
                ],
              },
              {
                name: 'Seagate SSDs',
                children: [
                  { name: 'Seagate FireCuda 530' },
                  { name: 'Seagate Barracuda Q5' },
                  { name: 'Seagate IronWolf 525' },
                ],
              },
              {
                name: 'Crucial SSDs',
                children: [
                  { name: 'Crucial P5 Plus' },
                  { name: 'Crucial MX500' },
                  { name: 'Crucial BX500' },
                ],
              },
              {
                name: 'Kingston SSDs',
                children: [
                  { name: 'Kingston KC3000' },
                  { name: 'Kingston A2000' },
                  { name: 'Kingston NV2' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Power Supplies',
        children: [
          {
            name: 'ATX Power Supplies',
            children: [
              {
                name: '80 Plus Bronze PSUs',
                children: [
                  { name: '450W Bronze PSUs' },
                  { name: '550W Bronze PSUs' },
                  { name: '650W Bronze PSUs' },
                  { name: '750W Bronze PSUs' },
                ],
              },
              {
                name: '80 Plus Gold PSUs',
                children: [
                  { name: '550W Gold PSUs' },
                  { name: '650W Gold PSUs' },
                  { name: '750W Gold PSUs' },
                  { name: '850W Gold PSUs' },
                  { name: '1000W Gold PSUs' },
                ],
              },
              {
                name: '80 Plus Platinum PSUs',
                children: [
                  { name: '650W Platinum PSUs' },
                  { name: '750W Platinum PSUs' },
                  { name: '850W Platinum PSUs' },
                  { name: '1000W Platinum PSUs' },
                  { name: '1200W Platinum PSUs' },
                ],
              },
              {
                name: '80 Plus Titanium PSUs',
                children: [
                  { name: '750W Titanium PSUs' },
                  { name: '850W Titanium PSUs' },
                  { name: '1000W Titanium PSUs' },
                  { name: '1300W Titanium PSUs' },
                ],
              },
            ],
          },
          {
            name: 'SFX Power Supplies',
            children: [
              {
                name: 'SFX-L PSUs',
                children: [
                  { name: '450W SFX-L PSUs' },
                  { name: '600W SFX-L PSUs' },
                  { name: '700W SFX-L PSUs' },
                ],
              },
              {
                name: 'SFX PSUs',
                children: [
                  { name: '450W SFX PSUs' },
                  { name: '600W SFX PSUs' },
                  { name: '700W SFX PSUs' },
                ],
              },
            ],
          },
          {
            name: 'Modular Power Supplies',
            children: [
              {
                name: 'Semi-Modular PSUs',
                children: [
                  { name: 'Semi-Modular Gold PSUs' },
                  { name: 'Semi-Modular Platinum PSUs' },
                  { name: 'Semi-Modular Titanium PSUs' },
                ],
              },
              {
                name: 'Fully Modular PSUs',
                children: [
                  { name: 'Fully Modular Gold PSUs' },
                  { name: 'Fully Modular Platinum PSUs' },
                  { name: 'Fully Modular Titanium PSUs' },
                ],
              },
            ],
          },
          {
            name: 'Brand Power Supplies',
            children: [
              {
                name: 'Corsair Power Supplies',
                children: [
                  { name: 'Corsair RMx Series' },
                  { name: 'Corsair HX Series' },
                  { name: 'Corsair CX Series' },
                ],
              },
              {
                name: 'Seasonic Power Supplies',
                children: [
                  { name: 'Seasonic Prime Series' },
                  { name: 'Seasonic Focus Series' },
                  { name: 'Seasonic Core Series' },
                ],
              },
              {
                name: 'EVGA Power Supplies',
                children: [
                  { name: 'EVGA SuperNOVA Series' },
                  { name: 'EVGA BR Series' },
                  { name: 'EVGA GD Series' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'PC Cases',
        children: [
          {
            name: 'Full Tower Cases',
            children: [
              {
                name: 'Premium Full Tower Cases',
                children: [
                  { name: 'RGB Full Tower Cases' },
                  { name: 'Tempered Glass Full Tower Cases' },
                  { name: 'Modular Full Tower Cases' },
                ],
              },
              {
                name: 'Budget Full Tower Cases',
                children: [
                  { name: 'Basic Full Tower Cases' },
                  { name: 'Airflow Focused Full Tower Cases' },
                ],
              },
            ],
          },
          {
            name: 'Mid Tower Cases',
            children: [
              {
                name: 'Premium Mid Tower Cases',
                children: [
                  { name: 'RGB Mid Tower Cases' },
                  { name: 'Tempered Glass Mid Tower Cases' },
                  { name: 'Compact Mid Tower Cases' },
                ],
              },
              {
                name: 'Budget Mid Tower Cases',
                children: [
                  { name: 'Basic Mid Tower Cases' },
                  { name: 'Airflow Mid Tower Cases' },
                ],
              },
            ],
          },
          {
            name: 'Mini-ITX Cases',
            children: [
              {
                name: 'Premium Mini-ITX Cases',
                children: [
                  { name: 'RGB Mini-ITX Cases' },
                  { name: 'Compact Mini-ITX Cases' },
                  { name: 'HTPC Mini-ITX Cases' },
                ],
              },
              {
                name: 'Budget Mini-ITX Cases',
                children: [
                  { name: 'Basic Mini-ITX Cases' },
                  { name: 'Node 202 Mini-ITX Cases' },
                ],
              },
            ],
          },
          {
            name: 'Open-Air Cases',
            children: [
              {
                name: 'Test Bench Cases',
                children: [
                  { name: 'Aluminum Test Benches' },
                  { name: 'Acrylic Test Benches' },
                  { name: 'Wood Test Benches' },
                ],
              },
              {
                name: 'Open-Air Display Cases',
                children: [
                  { name: 'RGB Open-Air Cases' },
                  { name: 'Minimalist Open-Air Cases' },
                ],
              },
            ],
          },
          {
            name: 'Brand PC Cases',
            children: [
              {
                name: 'Fractal Design Cases',
                children: [
                  { name: 'Fractal Define Series' },
                  { name: 'Fractal Meshify Series' },
                  { name: 'Fractal Core Series' },
                ],
              },
              {
                name: 'Corsair Cases',
                children: [
                  { name: 'Corsair 5000D Airflow' },
                  { name: 'Corsair 4000D Airflow' },
                  { name: 'Corsair 7000X Series' },
                ],
              },
              {
                name: 'Lian Li Cases',
                children: [
                  { name: 'Lian Li Lancool Series' },
                  { name: 'Lian Li O11 Series' },
                  { name: 'Lian Li PC-O Series' },
                ],
              },
              {
                name: 'be quiet! Cases',
                children: [
                  { name: 'be quiet! Dark Base Series' },
                  { name: 'be quiet! Silent Base Series' },
                ],
              },
            ],
          },
        ],
      },
      {
        name: 'Cooling Systems',
        children: [
          {
            name: 'Air Coolers',
            children: [
              {
                name: 'CPU Air Coolers',
                children: [
                  {
                    name: 'Top-Flow Air Coolers',
                    children: [
                      { name: 'Noctua NH-D15' },
                      { name: 'be quiet! Dark Rock Pro 4' },
                      { name: 'Cooler Master Hyper 212' },
                      { name: 'Corsair H100i Elite Capellix' },
                    ],
                  },
                  {
                    name: 'Tower Air Coolers',
                    children: [
                      { name: 'Noctua NH-U12S' },
                      { name: 'be quiet! Pure Rock 2' },
                      { name: 'Cooler Master Hyper 612' },
                      { name: 'Arctic Freezer 34' },
                    ],
                  },
                  {
                    name: 'Low-Profile Air Coolers',
                    children: [
                      { name: 'Noctua NH-L9a' },
                      { name: 'be quiet! Pure Rock Slim' },
                      { name: 'Cooler Master Hyper T2' },
                    ],
                  },
                ],
              },
              {
                name: 'Case Fans',
                children: [
                  {
                    name: '120mm Case Fans',
                    children: [
                      { name: 'Noctua NF-A12x25' },
                      { name: 'be quiet! Silent Wings 3' },
                      { name: 'Corsair ML120' },
                      { name: 'Arctic P12' },
                    ],
                  },
                  {
                    name: '140mm Case Fans',
                    children: [
                      { name: 'Noctua NF-A14' },
                      { name: 'be quiet! Silent Wings Pro 4' },
                      { name: 'Corsair ML140' },
                      { name: 'Arctic P14' },
                    ],
                  },
                  {
                    name: 'Fan Controllers',
                    children: [
                      { name: 'Manual Fan Controllers' },
                      { name: 'Automatic Fan Controllers' },
                      { name: 'RGB Fan Controllers' },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Liquid Coolers',
            children: [
              {
                name: 'AIO Liquid Coolers',
                children: [
                  {
                    name: '240mm AIO Coolers',
                    children: [
                      { name: 'Corsair H100i Elite Capellix' },
                      { name: 'NZXT Kraken X63' },
                      { name: 'Cooler Master MasterLiquid ML240L' },
                    ],
                  },
                  {
                    name: '280mm AIO Coolers',
                    children: [
                      { name: 'Corsair H115i Elite Capellix' },
                      { name: 'NZXT Kraken X73' },
                      { name: 'Cooler Master MasterLiquid ML280' },
                    ],
                  },
                  {
                    name: '360mm AIO Coolers',
                    children: [
                      { name: 'Corsair H150i Elite Capellix' },
                      { name: 'NZXT Kraken Z73' },
                      { name: 'Cooler Master MasterLiquid ML360' },
                    ],
                  },
                ],
              },
              {
                name: 'Custom Loop Components',
                children: [
                  {
                    name: 'Water Blocks',
                    children: [
                      { name: 'CPU Water Blocks' },
                      { name: 'GPU Water Blocks' },
                      { name: 'Motherboard Water Blocks' },
                    ],
                  },
                  {
                    name: 'Radiators',
                    children: [
                      { name: '120mm Radiators' },
                      { name: '140mm Radiators' },
                      { name: '240mm Radiators' },
                      { name: '280mm Radiators' },
                      { name: '360mm Radiators' },
                    ],
                  },
                  {
                    name: 'Pumps & Reservoirs',
                    children: [
                      { name: 'D5 Pumps' },
                      { name: 'D5 Pumps with Reservoirs' },
                      { name: 'External Pumps' },
                    ],
                  },
                  {
                    name: 'Tubing & Fittings',
                    children: [
                      { name: 'PETG Tubing' },
                      { name: 'Acrylic Tubing' },
                      { name: 'Compression Fittings' },
                    ],
                  },
                ],
              },
            ],
          },
          {
            name: 'Thermal Paste',
            children: [
              {
                name: 'Premium Thermal Paste',
                children: [
                  { name: 'Thermal Grizzly Kryonaut' },
                  { name: 'Arctic MX-5' },
                  { name: 'Noctua NT-H1' },
                ],
              },
              {
                name: 'Budget Thermal Paste',
                children: [
                  { name: 'Arctic Silver 5' },
                  { name: 'Cooler Master MasterGel' },
                  { name: 'Corsair XTM50' },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
];

async function createElectronicsBillboards(storeId: string) {
  const createdBillboards = new Map<string, string>();

  console.log('Creating electronics billboards...');
  for (const billboard of electronicsBillboards) {
    const existing = await prisma.billboard.findFirst({
      where: {
        storeId,
        label: billboard.label,
      },
    });

    if (existing) {
      console.log(`  ✓ Billboard exists: ${billboard.label}`);
      createdBillboards.set(billboard.label, existing.id);
    } else {
      const created = await prisma.billboard.create({
        data: {
          storeId,
          label: billboard.label,
          imageUrl: billboard.imageUrl,
        },
      });
      console.log(`  ✓ Created billboard: ${billboard.label}`);
      createdBillboards.set(billboard.label, created.id);
    }
  }

  return createdBillboards;
}

async function createElectronicsCategories(
  storeId: string,
  billboardsMap: Map<string, string>,
  categories: CategoryData[],
  parentId: string | null = null,
  parentBillboard: string | null = null,
  depth: number = 0
) {
  for (const category of categories) {
    console.log(`${'  '.repeat(depth)}Creating: ${category.name}`);

    // Determine which billboard to use
    const billboardLabel = category.billboard || parentBillboard;
    if (!billboardLabel) {
      throw new Error(`No billboard specified for category: ${category.name}`);
    }

    const billboardId = billboardsMap.get(billboardLabel);
    if (!billboardId) {
      throw new Error(`Billboard not found: ${billboardLabel}`);
    }

    // Check if category already exists
    const existing = await prisma.category.findFirst({
      where: {
        storeId,
        name: category.name,
        parentId,
      },
    });

    let categoryId: string;

    if (existing) {
      console.log(`${'  '.repeat(depth)}✓ Already exists: ${category.name}`);
      categoryId = existing.id;
    } else {
      const newCategory = await prisma.category.create({
        data: {
          storeId,
          name: category.name,
          billboardId,
          parentId,
        },
      });
      categoryId = newCategory.id;
      console.log(`${'  '.repeat(depth)}✓ Created: ${category.name}`);
    }

    // Recursively create children
    if (category.children && category.children.length > 0) {
      await createElectronicsCategories(
        storeId,
        billboardsMap,
        category.children,
        categoryId,
        billboardLabel,
        depth + 1
      );
    }
  }
}

async function main() {
  try {
    console.log('Starting ultra-deep electronics category seeding...');
    console.log(`Store ID: ${STORE_ID}`);

    // Verify store exists
    const store = await prisma.store.findUnique({
      where: { id: STORE_ID },
    });

    if (!store) {
      throw new Error(`Store with ID ${STORE_ID} not found`);
    }

    console.log(`✓ Store found: ${store.name}\n`);

    // Create all electronics billboards
    console.log('Setting up electronics billboards...\n');
    const billboardsMap = await createElectronicsBillboards(STORE_ID);
    console.log(`✓ ${billboardsMap.size} electronics billboards ready\n`);

    // Create electronics categories
    console.log('Creating ultra-deep electronics categories...\n');
    await createElectronicsCategories(STORE_ID, billboardsMap, electronicsCategoryStructure);

    console.log('\n✓ Ultra-deep electronics category seeding completed successfully!');

    // Count total categories created
    const totalCategories = await prisma.category.count({
      where: { storeId: STORE_ID },
    });

    console.log(`\nTotal categories in store: ${totalCategories}`);

    // Count electronics categories specifically
    let electronicsCategoryCount = 0;
    for (const billboardLabel of billboardsMap.keys()) {
      const billboardId = billboardsMap.get(billboardLabel);
      if (billboardId) {
        const count = await prisma.category.count({
          where: {
            storeId: STORE_ID,
            billboardId: billboardId,
          },
        });
        electronicsCategoryCount += count;
        console.log(`${billboardLabel}: ${count} categories`);
      }
    }

    console.log(`\nElectronics categories added: ${electronicsCategoryCount}`);
  } catch (error) {
    console.error('Error seeding electronics categories:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();
