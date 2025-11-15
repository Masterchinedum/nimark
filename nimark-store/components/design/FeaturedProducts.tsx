import { ProductCard } from "./ProductCard"
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs"

const products = {
  trending: [
    {
      id: "t1",
      name: "Premium Leather Laptop Bag - Professional Business Briefcase",
      price: 89.99,
      originalPrice: 129.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 142,
      vendor: "LeatherCraft Co.",
      badge: "Trending"
    },
    {
      id: "t2",
      name: "Wireless Gaming Mouse - 16000 DPI RGB",
      price: 59.99,
      image: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 289,
      vendor: "GameZone Elite",
    },
    {
      id: "t3",
      name: "Portable Bluetooth Speaker - 360° Sound",
      price: 79.99,
      originalPrice: 119.99,
      image: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 567,
      vendor: "SoundWave Tech",
    },
    {
      id: "t4",
      name: "USB-C Charging Station - 6 Ports Fast Charger",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1583863788434-e58a36330cf0?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 234,
      vendor: "PowerHub",
    },
    {
      id: "t5",
      name: "HD Webcam 1080p with Microphone",
      price: 69.99,
      originalPrice: 99.99,
      image: "https://images.unsplash.com/photo-1593642532400-2682810df593?w=400&h=400&fit=crop",
      rating: 4.4,
      reviews: 178,
      vendor: "VisionTech",
      badge: "Popular"
    },
    {
      id: "t6",
      name: "Ergonomic Office Chair - Lumbar Support",
      price: 249.99,
      originalPrice: 399.99,
      image: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 423,
      vendor: "ComfortFirst",
    },
    {
      id: "t7",
      name: "LED Desk Lamp with Wireless Charging",
      price: 45.99,
      image: "https://images.unsplash.com/photo-1507473885765-e6ed057f782c?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 201,
      vendor: "BrightSpace",
    },
    {
      id: "t8",
      name: "Minimalist Backpack - Water Resistant",
      price: 69.99,
      originalPrice: 89.99,
      image: "https://images.unsplash.com/photo-1553062407-98eeb64c6a62?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 312,
      vendor: "UrbanStyle",
    }
  ],
  newArrivals: [
    {
      id: "n1",
      name: "Smart Home Hub - Voice Control",
      price: 129.99,
      image: "https://images.unsplash.com/photo-1558089687-e476fbbc5861?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 89,
      vendor: "SmartHome Plus",
      badge: "New"
    },
    {
      id: "n2",
      name: "Fitness Tracker Band - Heart Rate Monitor",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1575311373937-040b8e1fd5b6?w=400&h=400&fit=crop",
      rating: 4.3,
      reviews: 67,
      vendor: "FitLife",
      badge: "New"
    },
    {
      id: "n3",
      name: "Electric Toothbrush - Sonic Technology",
      price: 89.99,
      image: "https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 123,
      vendor: "DentalCare Pro",
      badge: "New"
    },
    {
      id: "n4",
      name: "Coffee Maker - Programmable Timer",
      price: 79.99,
      image: "https://images.unsplash.com/photo-1517668808822-9ebb02f2a0e6?w=400&h=400&fit=crop",
      rating: 4.7,
      reviews: 156,
      vendor: "BrewMaster",
      badge: "New"
    },
    {
      id: "n5",
      name: "Air Purifier - HEPA Filter",
      price: 159.99,
      image: "https://images.unsplash.com/photo-1585771724684-38269d6639fd?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 234,
      vendor: "PureAir Tech",
      badge: "New"
    },
    {
      id: "n6",
      name: "Robot Vacuum Cleaner - Auto Navigation",
      price: 299.99,
      image: "https://images.unsplash.com/photo-1558317374-067fb5f30001?w=400&h=400&fit=crop",
      rating: 4.6,
      reviews: 189,
      vendor: "CleanBot",
      badge: "New"
    },
    {
      id: "n7",
      name: "Smart Doorbell - HD Camera",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop",
      rating: 4.5,
      reviews: 145,
      vendor: "SecureHome",
      badge: "New"
    },
    {
      id: "n8",
      name: "Wireless Earbuds Pro - Active Noise Cancelling",
      price: 179.99,
      image: "https://images.unsplash.com/photo-1590658268037-6bf12165a8df?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 467,
      vendor: "AudioTech Store",
      badge: "New"
    }
  ],
  topRated: [
    {
      id: "r1",
      name: "Professional DSLR Camera - 24MP",
      price: 899.99,
      originalPrice: 1199.99,
      image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 678,
      vendor: "PhotoPro",
    },
    {
      id: "r2",
      name: "Noise Cancelling Over-Ear Headphones",
      price: 249.99,
      originalPrice: 349.99,
      image: "https://images.unsplash.com/photo-1546435770-a3e426bf472b?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 892,
      vendor: "AudioTech Store",
    },
    {
      id: "r3",
      name: "Ultra-Wide Gaming Monitor 34 inch",
      price: 499.99,
      image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 534,
      vendor: "DisplayMasters",
    },
    {
      id: "r4",
      name: "Premium Standing Desk - Electric Adjustable",
      price: 599.99,
      originalPrice: 799.99,
      image: "https://images.unsplash.com/photo-1595515106969-1ce29566ff1c?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 423,
      vendor: "WorkSpace Pro",
    },
    {
      id: "r5",
      name: "High-Performance Blender - 1500W",
      price: 149.99,
      image: "https://images.unsplash.com/photo-1585515320310-259814833e62?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 756,
      vendor: "KitchenMaster",
    },
    {
      id: "r6",
      name: "Smart Thermostat - Energy Saving",
      price: 199.99,
      originalPrice: 249.99,
      image: "https://images.unsplash.com/photo-1545259741-2ea3ebf61fa3?w=400&h=400&fit=crop",
      rating: 4.8,
      reviews: 612,
      vendor: "EcoHome",
    },
    {
      id: "r7",
      name: "Premium Yoga Mat - Non-Slip Eco-Friendly",
      price: 49.99,
      image: "https://images.unsplash.com/photo-1601925260368-ae2f83cf8b7f?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 834,
      vendor: "ZenFitness",
    },
    {
      id: "r8",
      name: "Electric Pressure Cooker - 8 Quart",
      price: 119.99,
      originalPrice: 179.99,
      image: "https://images.unsplash.com/photo-1585659722983-3a675dabf23d?w=400&h=400&fit=crop",
      rating: 4.9,
      reviews: 923,
      vendor: "KitchenMaster",
    }
  ]
}

export function FeaturedProducts() {
  return (
    <section className="py-12 bg-muted/30">
      <div className="max-w-7xl mx-auto px-4">
        <div className="mb-8">
          <h2 className="text-3xl font-bold mb-2">Featured Products</h2>
          <p className="text-muted-foreground">Discover our handpicked selection</p>
        </div>

        <Tabs defaultValue="trending" className="w-full">
          <TabsList className="mb-8">
            <TabsTrigger value="trending">Trending Now</TabsTrigger>
            <TabsTrigger value="newArrivals">New Arrivals</TabsTrigger>
            <TabsTrigger value="topRated">Top Rated</TabsTrigger>
          </TabsList>

          <TabsContent value="trending">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.trending.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="newArrivals">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.newArrivals.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </TabsContent>

          <TabsContent value="topRated">
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.topRated.map((product) => (
                <ProductCard key={product.id} {...product} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}
