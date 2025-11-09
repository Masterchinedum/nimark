import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const STORE_ID = '146d5c54-75b9-4197-8c94-78be27c89075';

interface CategoryData {
  name: string;
  billboard?: string; // Billboard label for this category (optional, inherits from parent)
  children?: CategoryData[];
}

// Comprehensive billboard list
const billboards = [
  { label: 'Electronics & Gadgets', imageUrl: 'https://res.cloudinary.com/demo/image/upload/electronics_banner.jpg' },
  { label: 'Fashion & Apparel', imageUrl: 'https://res.cloudinary.com/demo/image/upload/fashion_banner.jpg' },
  { label: 'Home & Living', imageUrl: 'https://res.cloudinary.com/demo/image/upload/home_banner.jpg' },
  { label: 'Health & Beauty', imageUrl: 'https://res.cloudinary.com/demo/image/upload/beauty_banner.jpg' },
  { label: 'Sports & Fitness', imageUrl: 'https://res.cloudinary.com/demo/image/upload/sports_banner.jpg' },
  { label: 'Baby & Kids', imageUrl: 'https://res.cloudinary.com/demo/image/upload/baby_banner.jpg' },
  { label: 'Entertainment', imageUrl: 'https://res.cloudinary.com/demo/image/upload/entertainment_banner.jpg' },
  { label: 'Automotive', imageUrl: 'https://res.cloudinary.com/demo/image/upload/automotive_banner.jpg' },
  { label: 'Office & Stationery', imageUrl: 'https://res.cloudinary.com/demo/image/upload/office_banner.jpg' },
  { label: 'Food & Beverages', imageUrl: 'https://res.cloudinary.com/demo/image/upload/food_banner.jpg' },
  { label: 'Pet Care', imageUrl: 'https://res.cloudinary.com/demo/image/upload/pet_banner.jpg' },
  { label: 'Jewelry & Accessories', imageUrl: 'https://res.cloudinary.com/demo/image/upload/jewelry_banner.jpg' },
  { label: 'Industrial & Tools', imageUrl: 'https://res.cloudinary.com/demo/image/upload/industrial_banner.jpg' },
];

// Comprehensive category structure inspired by Jumia, Konga, AliExpress
const categoryStructure: CategoryData[] = [
  {
    name: 'Electronics',
    billboard: 'Electronics & Gadgets',
    children: [
      {
        name: 'Mobile Phones & Tablets',
        children: [
          {
            name: 'Smartphones',
            children: [
              { name: 'Android Phones' },
              { name: 'iOS Phones' },
              { name: 'Feature Phones' },
              { name: 'Refurbished Phones' },
              { name: 'Gaming Phones' },
            ],
          },
          {
            name: 'Tablets',
            children: [
              { name: 'Android Tablets' },
              { name: 'iOS Tablets' },
              { name: 'Windows Tablets' },
              { name: 'Kids Tablets' },
            ],
          },
          {
            name: 'Mobile Phone Accessories',
            children: [
              { name: 'Phone Cases & Covers' },
              { name: 'Screen Protectors' },
              { name: 'Chargers & Cables' },
              { name: 'Power Banks' },
              { name: 'Phone Holders & Stands' },
              { name: 'Selfie Sticks & Tripods' },
              { name: 'Mobile Phone Lenses' },
            ],
          },
          { name: 'Smartwatches & Fitness Trackers' },
        ],
      },
      {
        name: 'Computers & Laptops',
        children: [
          {
            name: 'Laptops',
            children: [
              { name: 'Gaming Laptops' },
              { name: 'Business Laptops' },
              { name: 'Student Laptops' },
              { name: 'Ultrabooks' },
              { name: '2-in-1 Laptops' },
              { name: 'Chromebooks' },
              { name: 'Refurbished Laptops' },
            ],
          },
          {
            name: 'Desktop Computers',
            children: [
              { name: 'Gaming Desktops' },
              { name: 'All-in-One PCs' },
              { name: 'Workstations' },
              { name: 'Mini PCs' },
            ],
          },
          {
            name: 'Computer Accessories',
            children: [
              { name: 'Keyboards & Mice' },
              { name: 'Monitors' },
              { name: 'Webcams' },
              { name: 'Laptop Bags & Cases' },
              { name: 'Cooling Pads' },
              { name: 'USB Hubs' },
              { name: 'KVM Switches' },
            ],
          },
          {
            name: 'Computer Components',
            children: [
              { name: 'Processors (CPUs)' },
              { name: 'Graphics Cards (GPUs)' },
              { name: 'Motherboards' },
              { name: 'RAM Memory' },
              { name: 'Hard Drives & SSDs' },
              { name: 'Power Supplies' },
              { name: 'PC Cases' },
              { name: 'Cooling Systems' },
            ],
          },
        ],
      },
      {
        name: 'TVs & Audio',
        children: [
          {
            name: 'Televisions',
            children: [
              { name: 'Smart TVs' },
              { name: '4K Ultra HD TVs' },
              { name: '8K TVs' },
              { name: 'OLED TVs' },
              { name: 'QLED TVs' },
              { name: 'LED TVs' },
              { name: 'Curved TVs' },
            ],
          },
          {
            name: 'Home Audio',
            children: [
              { name: 'Soundbars' },
              { name: 'Home Theater Systems' },
              { name: 'Bluetooth Speakers' },
              { name: 'Portable Speakers' },
              { name: 'Smart Speakers' },
              { name: 'Subwoofers' },
            ],
          },
          {
            name: 'Headphones & Earphones',
            children: [
              { name: 'Over-Ear Headphones' },
              { name: 'On-Ear Headphones' },
              { name: 'In-Ear Earphones' },
              { name: 'True Wireless Earbuds' },
              { name: 'Gaming Headsets' },
              { name: 'Sports Earphones' },
              { name: 'Noise Cancelling Headphones' },
            ],
          },
          { name: 'TV Accessories' },
          { name: 'Projectors & Screens' },
        ],
      },
      {
        name: 'Cameras & Photography',
        children: [
          {
            name: 'Digital Cameras',
            children: [
              { name: 'DSLR Cameras' },
              { name: 'Mirrorless Cameras' },
              { name: 'Point & Shoot Cameras' },
              { name: 'Action Cameras' },
              { name: 'Instant Cameras' },
            ],
          },
          {
            name: 'Camera Lenses',
            children: [
              { name: 'Wide Angle Lenses' },
              { name: 'Telephoto Lenses' },
              { name: 'Prime Lenses' },
              { name: 'Macro Lenses' },
            ],
          },
          {
            name: 'Camera Accessories',
            children: [
              { name: 'Camera Bags' },
              { name: 'Tripods & Monopods' },
              { name: 'Camera Straps' },
              { name: 'Memory Cards' },
              { name: 'Camera Batteries & Chargers' },
              { name: 'Lighting & Studio Equipment' },
              { name: 'Gimbals & Stabilizers' },
            ],
          },
          { name: 'Drones & Accessories' },
          { name: 'Binoculars & Telescopes' },
        ],
      },
      {
        name: 'Video Games & Consoles',
        children: [
          {
            name: 'Gaming Consoles',
            children: [
              { name: 'PlayStation' },
              { name: 'Xbox' },
              { name: 'Nintendo' },
              { name: 'Handheld Consoles' },
            ],
          },
          {
            name: 'Video Games',
            children: [
              { name: 'PlayStation Games' },
              { name: 'Xbox Games' },
              { name: 'Nintendo Games' },
              { name: 'PC Games' },
            ],
          },
          {
            name: 'Gaming Accessories',
            children: [
              { name: 'Controllers & Gamepads' },
              { name: 'Gaming Headsets' },
              { name: 'Gaming Keyboards & Mice' },
              { name: 'Gaming Chairs' },
              { name: 'VR Headsets' },
              { name: 'Racing Wheels' },
            ],
          },
        ],
      },
      {
        name: 'Home Appliances',
        children: [
          { name: 'Air Conditioners' },
          { name: 'Refrigerators' },
          { name: 'Washing Machines' },
          { name: 'Microwaves' },
          { name: 'Vacuum Cleaners' },
          { name: 'Fans' },
          { name: 'Water Dispensers' },
          { name: 'Irons & Steamers' },
        ],
      },
      { name: 'Printers & Scanners' },
      { name: 'Networking Devices' },
      { name: 'Security & Surveillance' },
    ],
  },
  {
    name: 'Fashion',
    billboard: 'Fashion & Apparel',
    children: [
      {
        name: "Men's Fashion",
        children: [
          {
            name: 'Clothing',
            children: [
              { name: 'T-Shirts & Polos' },
              { name: 'Shirts' },
              { name: 'Jeans' },
              { name: 'Trousers & Chinos' },
              { name: 'Shorts' },
              { name: 'Suits & Blazers' },
              { name: 'Jackets & Coats' },
              { name: 'Sweaters & Hoodies' },
              { name: 'Traditional Wear' },
              { name: 'Underwear & Sleepwear' },
              { name: 'Sportswear' },
            ],
          },
          {
            name: 'Shoes',
            children: [
              { name: 'Sneakers' },
              { name: 'Formal Shoes' },
              { name: 'Boots' },
              { name: 'Sandals & Slippers' },
              { name: 'Sports Shoes' },
              { name: 'Casual Shoes' },
            ],
          },
          {
            name: 'Accessories',
            children: [
              { name: 'Watches' },
              { name: 'Belts' },
              { name: 'Wallets' },
              { name: 'Sunglasses' },
              { name: 'Ties & Bow Ties' },
              { name: 'Caps & Hats' },
              { name: 'Bags & Backpacks' },
              { name: 'Jewelry' },
              { name: 'Socks' },
            ],
          },
        ],
      },
      {
        name: "Women's Fashion",
        children: [
          {
            name: 'Clothing',
            children: [
              { name: 'Dresses' },
              { name: 'Tops & Blouses' },
              { name: 'T-Shirts' },
              { name: 'Jeans' },
              { name: 'Trousers & Pants' },
              { name: 'Skirts' },
              { name: 'Shorts' },
              { name: 'Jumpsuits & Rompers' },
              { name: 'Jackets & Coats' },
              { name: 'Sweaters & Cardigans' },
              { name: 'Traditional Wear' },
              { name: 'Lingerie & Sleepwear' },
              { name: 'Sportswear & Activewear' },
              { name: 'Maternity Wear' },
            ],
          },
          {
            name: 'Shoes',
            children: [
              { name: 'Heels' },
              { name: 'Flats' },
              { name: 'Sneakers' },
              { name: 'Boots' },
              { name: 'Sandals' },
              { name: 'Wedges' },
              { name: 'Slippers' },
            ],
          },
          {
            name: 'Bags',
            children: [
              { name: 'Handbags' },
              { name: 'Shoulder Bags' },
              { name: 'Crossbody Bags' },
              { name: 'Tote Bags' },
              { name: 'Clutches' },
              { name: 'Backpacks' },
              { name: 'Wallets & Purses' },
            ],
          },
          {
            name: 'Accessories',
            children: [
              { name: 'Jewelry' },
              { name: 'Watches' },
              { name: 'Sunglasses' },
              { name: 'Scarves & Wraps' },
              { name: 'Hats & Caps' },
              { name: 'Belts' },
              { name: 'Hair Accessories' },
            ],
          },
        ],
      },
      {
        name: 'Kids Fashion',
        children: [
          {
            name: 'Boys Fashion',
            children: [
              { name: 'T-Shirts & Shirts' },
              { name: 'Pants & Jeans' },
              { name: 'Shorts' },
              { name: 'Jackets & Coats' },
              { name: 'Shoes' },
              { name: 'Accessories' },
            ],
          },
          {
            name: 'Girls Fashion',
            children: [
              { name: 'Dresses' },
              { name: 'Tops & T-Shirts' },
              { name: 'Pants & Jeans' },
              { name: 'Skirts & Shorts' },
              { name: 'Jackets & Coats' },
              { name: 'Shoes' },
              { name: 'Accessories' },
            ],
          },
          {
            name: 'Baby Fashion',
            children: [
              { name: 'Baby Boy Clothing' },
              { name: 'Baby Girl Clothing' },
              { name: 'Baby Shoes' },
              { name: 'Baby Accessories' },
            ],
          },
        ],
      },
      {
        name: 'Jewelry & Watches',
        children: [
          { name: 'Fine Jewelry' },
          { name: 'Fashion Jewelry' },
          { name: 'Luxury Watches' },
          { name: 'Smart Watches' },
        ],
      },
      { name: 'Luggage & Travel Gear' },
    ],
  },
  {
    name: 'Home & Living',
    billboard: 'Home & Living',
    children: [
      {
        name: 'Furniture',
        children: [
          {
            name: 'Living Room Furniture',
            children: [
              { name: 'Sofas & Couches' },
              { name: 'Coffee Tables' },
              { name: 'TV Stands & Entertainment Centers' },
              { name: 'Bookcases & Shelves' },
              { name: 'Accent Chairs' },
            ],
          },
          {
            name: 'Bedroom Furniture',
            children: [
              { name: 'Beds & Bed Frames' },
              { name: 'Mattresses' },
              { name: 'Wardrobes & Closets' },
              { name: 'Dressers & Chests' },
              { name: 'Nightstands' },
            ],
          },
          {
            name: 'Dining Room Furniture',
            children: [
              { name: 'Dining Tables' },
              { name: 'Dining Chairs' },
              { name: 'Bar Stools' },
              { name: 'Buffets & Sideboards' },
            ],
          },
          {
            name: 'Office Furniture',
            children: [
              { name: 'Office Desks' },
              { name: 'Office Chairs' },
              { name: 'Filing Cabinets' },
              { name: 'Bookshelves' },
            ],
          },
          { name: 'Outdoor Furniture' },
          { name: 'Kids Furniture' },
        ],
      },
      {
        name: 'Home Decor',
        children: [
          { name: 'Wall Art & Paintings' },
          { name: 'Mirrors' },
          { name: 'Clocks' },
          { name: 'Vases & Planters' },
          { name: 'Candles & Holders' },
          { name: 'Picture Frames' },
          { name: 'Cushions & Throws' },
          { name: 'Rugs & Carpets' },
          { name: 'Curtains & Blinds' },
        ],
      },
      {
        name: 'Kitchen & Dining',
        children: [
          {
            name: 'Cookware',
            children: [
              { name: 'Pots & Pans' },
              { name: 'Pressure Cookers' },
              { name: 'Woks' },
              { name: 'Bakeware' },
            ],
          },
          {
            name: 'Kitchen Appliances',
            children: [
              { name: 'Blenders' },
              { name: 'Food Processors' },
              { name: 'Juicers' },
              { name: 'Coffee Makers' },
              { name: 'Toasters' },
              { name: 'Electric Kettles' },
              { name: 'Rice Cookers' },
            ],
          },
          {
            name: 'Dinnerware & Tableware',
            children: [
              { name: 'Dinner Sets' },
              { name: 'Glassware' },
              { name: 'Cutlery' },
              { name: 'Serving Dishes' },
            ],
          },
          { name: 'Kitchen Tools & Gadgets' },
          { name: 'Storage & Organization' },
        ],
      },
      {
        name: 'Bedding & Bath',
        children: [
          { name: 'Bed Sheets & Pillowcases' },
          { name: 'Comforters & Duvets' },
          { name: 'Pillows' },
          { name: 'Blankets & Throws' },
          { name: 'Towels' },
          { name: 'Bath Mats' },
          { name: 'Shower Curtains' },
          { name: 'Bathroom Accessories' },
        ],
      },
      {
        name: 'Lighting',
        children: [
          { name: 'Ceiling Lights' },
          { name: 'Table Lamps' },
          { name: 'Floor Lamps' },
          { name: 'Wall Lights' },
          { name: 'String Lights' },
          { name: 'Smart Lighting' },
        ],
      },
      { name: 'Home Improvement' },
      { name: 'Garden & Outdoor' },
    ],
  },
  {
    name: 'Health & Beauty',
    billboard: 'Health & Beauty',
    children: [
      {
        name: 'Beauty & Personal Care',
        children: [
          {
            name: 'Makeup',
            children: [
              { name: 'Face Makeup' },
              { name: 'Eye Makeup' },
              { name: 'Lip Makeup' },
              { name: 'Makeup Tools & Brushes' },
              { name: 'Makeup Sets & Kits' },
            ],
          },
          {
            name: 'Skincare',
            children: [
              { name: 'Cleansers & Toners' },
              { name: 'Moisturizers & Creams' },
              { name: 'Serums & Treatments' },
              { name: 'Face Masks' },
              { name: 'Sunscreen' },
              { name: 'Anti-Aging Products' },
            ],
          },
          {
            name: 'Hair Care',
            children: [
              { name: 'Shampoos & Conditioners' },
              { name: 'Hair Treatments' },
              { name: 'Hair Styling Products' },
              { name: 'Hair Coloring' },
              { name: 'Hair Tools & Accessories' },
            ],
          },
          {
            name: 'Fragrances',
            children: [
              { name: 'Perfumes for Women' },
              { name: 'Perfumes for Men' },
              { name: 'Body Sprays' },
              { name: 'Essential Oils' },
            ],
          },
          {
            name: 'Personal Care',
            children: [
              { name: 'Oral Care' },
              { name: 'Bath & Body' },
              { name: 'Deodorants' },
              { name: 'Shaving & Hair Removal' },
            ],
          },
        ],
      },
      {
        name: 'Health & Wellness',
        children: [
          {
            name: 'Vitamins & Supplements',
            children: [
              { name: 'Multivitamins' },
              { name: 'Vitamin C' },
              { name: 'Vitamin D' },
              { name: 'Omega-3 & Fish Oil' },
              { name: 'Protein Supplements' },
              { name: 'Weight Management' },
            ],
          },
          {
            name: 'Medical Supplies',
            children: [
              { name: 'First Aid' },
              { name: 'Blood Pressure Monitors' },
              { name: 'Thermometers' },
              { name: 'Mobility Aids' },
            ],
          },
          { name: 'Sexual Wellness' },
          { name: 'Health Monitors' },
        ],
      },
      {
        name: 'Beauty Tools & Appliances',
        children: [
          { name: 'Hair Dryers & Straighteners' },
          { name: 'Electric Shavers' },
          { name: 'Facial Steamers' },
          { name: 'Massage Devices' },
        ],
      },
    ],
  },
  {
    name: 'Sports & Outdoors',
    billboard: 'Sports & Fitness',
    children: [
      {
        name: 'Exercise & Fitness',
        children: [
          {
            name: 'Cardio Equipment',
            children: [
              { name: 'Treadmills' },
              { name: 'Exercise Bikes' },
              { name: 'Elliptical Machines' },
              { name: 'Rowing Machines' },
            ],
          },
          {
            name: 'Strength Training',
            children: [
              { name: 'Dumbbells & Weights' },
              { name: 'Weight Benches' },
              { name: 'Resistance Bands' },
              { name: 'Kettlebells' },
              { name: 'Power Racks' },
            ],
          },
          { name: 'Yoga & Pilates' },
          { name: 'Fitness Accessories' },
          { name: 'Fitness Trackers' },
        ],
      },
      {
        name: 'Team Sports',
        children: [
          {
            name: 'Football',
            children: [
              { name: 'Footballs' },
              { name: 'Football Boots' },
              { name: 'Goalkeeper Gloves' },
              { name: 'Training Equipment' },
            ],
          },
          { name: 'Basketball' },
          { name: 'Volleyball' },
          { name: 'Cricket' },
          { name: 'Rugby' },
        ],
      },
      {
        name: 'Outdoor Recreation',
        children: [
          {
            name: 'Camping & Hiking',
            children: [
              { name: 'Tents' },
              { name: 'Sleeping Bags' },
              { name: 'Backpacks' },
              { name: 'Camping Furniture' },
              { name: 'Cooking Equipment' },
            ],
          },
          { name: 'Cycling' },
          { name: 'Fishing' },
          { name: 'Swimming' },
          { name: 'Climbing' },
        ],
      },
      {
        name: 'Sports Apparel',
        children: [
          { name: 'Sports Shoes' },
          { name: 'Sports Clothing' },
          { name: 'Sports Bags' },
        ],
      },
    ],
  },
  {
    name: 'Baby & Kids',
    billboard: 'Baby & Kids',
    children: [
      {
        name: 'Baby Care',
        children: [
          {
            name: 'Diapering',
            children: [
              { name: 'Disposable Diapers' },
              { name: 'Cloth Diapers' },
              { name: 'Diaper Bags' },
              { name: 'Wipes & Holders' },
              { name: 'Changing Tables' },
            ],
          },
          {
            name: 'Feeding',
            children: [
              { name: 'Baby Bottles' },
              { name: 'Breast Pumps' },
              { name: 'Baby Food' },
              { name: 'High Chairs' },
              { name: 'Bibs & Burp Cloths' },
            ],
          },
          {
            name: 'Baby Safety',
            children: [
              { name: 'Baby Monitors' },
              { name: 'Safety Gates' },
              { name: 'Cabinet Locks' },
            ],
          },
          { name: 'Baby Health' },
          { name: 'Baby Bathing' },
        ],
      },
      {
        name: 'Baby Gear',
        children: [
          { name: 'Strollers' },
          { name: 'Car Seats' },
          { name: 'Baby Carriers' },
          { name: 'Playpens' },
          { name: 'Bouncers & Swings' },
        ],
      },
      {
        name: 'Nursery',
        children: [
          { name: 'Cribs & Cots' },
          { name: 'Nursery Furniture' },
          { name: 'Bedding' },
          { name: 'Nursery Decor' },
        ],
      },
      {
        name: 'Toys & Games',
        children: [
          { name: 'Educational Toys' },
          { name: 'Dolls & Action Figures' },
          { name: 'Building & Construction Toys' },
          { name: 'Puzzles' },
          { name: 'Outdoor Play' },
          { name: 'Ride-On Toys' },
          { name: 'Board Games' },
        ],
      },
      { name: 'School Supplies' },
    ],
  },
  {
    name: 'Books, Movies & Music',
    billboard: 'Entertainment',
    children: [
      {
        name: 'Books',
        children: [
          { name: 'Fiction' },
          { name: 'Non-Fiction' },
          { name: 'Business & Economics' },
          { name: 'Self-Help' },
          { name: "Children's Books" },
          { name: 'Educational Books' },
          { name: 'Comics & Graphic Novels' },
        ],
      },
      {
        name: 'Movies & TV Shows',
        children: [
          { name: 'DVDs' },
          { name: 'Blu-rays' },
        ],
      },
      {
        name: 'Music',
        children: [
          { name: 'CDs' },
          { name: 'Vinyl Records' },
        ],
      },
      { name: 'Musical Instruments' },
    ],
  },
  {
    name: 'Automotive',
    billboard: 'Automotive',
    children: [
      {
        name: 'Car Electronics',
        children: [
          { name: 'Car Audio Systems' },
          { name: 'GPS Navigation' },
          { name: 'Dash Cams' },
          { name: 'Car Chargers' },
        ],
      },
      {
        name: 'Car Parts & Accessories',
        children: [
          { name: 'Tires & Wheels' },
          { name: 'Car Batteries' },
          { name: 'Brake Parts' },
          { name: 'Lights & Lighting' },
          { name: 'Wipers' },
        ],
      },
      {
        name: 'Car Care',
        children: [
          { name: 'Cleaning Products' },
          { name: 'Polishes & Waxes' },
          { name: 'Air Fresheners' },
        ],
      },
      {
        name: 'Interior Accessories',
        children: [
          { name: 'Seat Covers' },
          { name: 'Floor Mats' },
          { name: 'Steering Wheel Covers' },
        ],
      },
      { name: 'Motorcycle Parts & Accessories' },
    ],
  },
  {
    name: 'Office Products',
    billboard: 'Office & Stationery',
    children: [
      {
        name: 'Office Supplies',
        children: [
          { name: 'Writing Instruments' },
          { name: 'Paper Products' },
          { name: 'Filing & Organization' },
          { name: 'Desk Accessories' },
          { name: 'Staplers & Punches' },
        ],
      },
      {
        name: 'Office Electronics',
        children: [
          { name: 'Calculators' },
          { name: 'Laminators' },
          { name: 'Shredders' },
          { name: 'Label Makers' },
        ],
      },
      { name: 'Office Furniture' },
      { name: 'Presentation Supplies' },
    ],
  },
  {
    name: 'Food & Beverages',
    billboard: 'Food & Beverages',
    children: [
      {
        name: 'Groceries',
        children: [
          { name: 'Rice & Grains' },
          { name: 'Pasta & Noodles' },
          { name: 'Canned Foods' },
          { name: 'Cooking Oils' },
          { name: 'Spices & Seasonings' },
          { name: 'Sauces & Condiments' },
        ],
      },
      {
        name: 'Beverages',
        children: [
          { name: 'Coffee' },
          { name: 'Tea' },
          { name: 'Soft Drinks' },
          { name: 'Juices' },
          { name: 'Energy Drinks' },
          { name: 'Water' },
        ],
      },
      {
        name: 'Snacks',
        children: [
          { name: 'Chips & Crisps' },
          { name: 'Chocolates & Candy' },
          { name: 'Cookies & Biscuits' },
          { name: 'Nuts & Seeds' },
        ],
      },
      { name: 'Breakfast Foods' },
      { name: 'Baking Supplies' },
    ],
  },
  {
    name: 'Pet Supplies',
    billboard: 'Pet Care',
    children: [
      {
        name: 'Dog Supplies',
        children: [
          { name: 'Dog Food' },
          { name: 'Dog Treats' },
          { name: 'Dog Toys' },
          { name: 'Dog Beds & Furniture' },
          { name: 'Dog Collars & Leashes' },
          { name: 'Dog Grooming' },
        ],
      },
      {
        name: 'Cat Supplies',
        children: [
          { name: 'Cat Food' },
          { name: 'Cat Treats' },
          { name: 'Cat Toys' },
          { name: 'Cat Litter & Accessories' },
          { name: 'Cat Beds & Furniture' },
          { name: 'Cat Grooming' },
        ],
      },
      { name: 'Fish & Aquatic Pets' },
      { name: 'Small Animal Supplies' },
      { name: 'Bird Supplies' },
    ],
  },
  {
    name: 'Jewelry & Accessories',
    billboard: 'Jewelry & Accessories',
    children: [
      {
        name: 'Fine Jewelry',
        children: [
          { name: 'Diamond Jewelry' },
          { name: 'Gold Jewelry' },
          { name: 'Silver Jewelry' },
          { name: 'Platinum Jewelry' },
        ],
      },
      {
        name: 'Fashion Jewelry',
        children: [
          { name: 'Necklaces & Pendants' },
          { name: 'Earrings' },
          { name: 'Bracelets & Bangles' },
          { name: 'Rings' },
          { name: 'Brooches & Pins' },
        ],
      },
      { name: 'Wedding Jewelry' },
      { name: 'Body Jewelry' },
    ],
  },
  {
    name: 'Industrial & Scientific',
    billboard: 'Industrial & Tools',
    children: [
      {
        name: 'Lab & Scientific',
        children: [
          { name: 'Lab Equipment' },
          { name: 'Lab Supplies' },
          { name: 'Microscopes' },
        ],
      },
      {
        name: 'Industrial Tools',
        children: [
          { name: 'Power Tools' },
          { name: 'Hand Tools' },
          { name: 'Measuring Tools' },
          { name: 'Welding Equipment' },
        ],
      },
      { name: 'Safety Equipment' },
      { name: 'Material Handling' },
    ],
  },
];

async function createBillboards(storeId: string) {
  const createdBillboards = new Map<string, string>();
  
  console.log('Creating billboards...');
  for (const billboard of billboards) {
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

async function createCategories(
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
      await createCategories(
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
    console.log('Starting category seeding...');
    console.log(`Store ID: ${STORE_ID}`);

    // Verify store exists
    const store = await prisma.store.findUnique({
      where: { id: STORE_ID },
    });

    if (!store) {
      throw new Error(`Store with ID ${STORE_ID} not found`);
    }

    console.log(`✓ Store found: ${store.name}\n`);

    // Create all billboards
    console.log('Setting up billboards...\n');
    const billboardsMap = await createBillboards(STORE_ID);
    console.log(`✓ ${billboardsMap.size} billboards ready\n`);

    // Create categories
    console.log('Creating categories...\n');
    await createCategories(STORE_ID, billboardsMap, categoryStructure);

    console.log('\n✓ Category seeding completed successfully!');

    // Count total categories created
    const totalCategories = await prisma.category.count({
      where: { storeId: STORE_ID },
    });

    console.log(`\nTotal categories in store: ${totalCategories}`);
  } catch (error) {
    console.error('Error seeding categories:', error);
    throw error;
  } finally {
    await prisma.$disconnect();
  }
}

main();