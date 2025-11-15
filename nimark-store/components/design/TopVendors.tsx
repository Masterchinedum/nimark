import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Storefront, Star, CheckCircle } from "@phosphor-icons/react"
import { motion } from "framer-motion"

const vendors = [
  {
    id: "1",
    name: "AudioTech Store",
    logo: "🎧",
    rating: 4.9,
    reviews: 2453,
    products: 156,
    verified: true,
    badge: "Top Rated"
  },
  {
    id: "2",
    name: "GameZone Elite",
    logo: "🎮",
    rating: 4.8,
    reviews: 1876,
    products: 234,
    verified: true,
    badge: "Popular"
  },
  {
    id: "3",
    name: "SmartGear Pro",
    logo: "⌚",
    rating: 4.9,
    reviews: 3201,
    products: 89,
    verified: true,
    badge: "Featured"
  },
  {
    id: "4",
    name: "PhotoPro",
    logo: "📷",
    rating: 4.7,
    reviews: 1534,
    products: 178,
    verified: true,
  },
  {
    id: "5",
    name: "KitchenMaster",
    logo: "🍳",
    rating: 4.8,
    reviews: 2987,
    products: 312,
    verified: true,
    badge: "Best Seller"
  },
  {
    id: "6",
    name: "FashionHub",
    logo: "👔",
    rating: 4.6,
    reviews: 1245,
    products: 567,
    verified: true,
  },
]

export function TopVendors() {
  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-secondary/10 rounded-xl flex items-center justify-center">
              <Storefront size={28} weight="fill" className="text-secondary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Top Vendors</h2>
              <p className="text-muted-foreground">Shop from verified and trusted sellers</p>
            </div>
          </div>

          <Button variant="outline" className="hidden md:flex">
            View All Vendors
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {vendors.map((vendor, index) => (
            <motion.div
              key={vendor.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
            >
              <Card className="p-6 hover:shadow-lg transition-all duration-300 border-border hover:border-secondary/50">
                <div className="flex items-start gap-4 mb-4">
                  <div className="w-16 h-16 bg-gradient-to-br from-secondary/20 to-primary/20 rounded-2xl flex items-center justify-center text-3xl flex-shrink-0">
                    {vendor.logo}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <h3 className="font-bold text-lg truncate">{vendor.name}</h3>
                      {vendor.verified && (
                        <CheckCircle size={18} weight="fill" className="text-success flex-shrink-0" />
                      )}
                    </div>
                    
                    <div className="flex items-center gap-2 mb-2">
                      <div className="flex items-center gap-1">
                        <Star size={16} weight="fill" className="text-yellow-500" />
                        <span className="font-semibold text-sm">{vendor.rating}</span>
                      </div>
                      <span className="text-sm text-muted-foreground">
                        ({vendor.reviews.toLocaleString()} reviews)
                      </span>
                    </div>

                    {vendor.badge && (
                      <Badge variant="secondary" className="bg-secondary/10 text-secondary">
                        {vendor.badge}
                      </Badge>
                    )}
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-border">
                  <div className="text-center flex-1">
                    <div className="text-2xl font-bold text-primary">{vendor.products}</div>
                    <div className="text-xs text-muted-foreground">Products</div>
                  </div>
                  <div className="h-10 w-px bg-border"></div>
                  <div className="text-center flex-1">
                    <div className="text-2xl font-bold text-secondary">{vendor.rating}</div>
                    <div className="text-xs text-muted-foreground">Rating</div>
                  </div>
                </div>

                <Button className="w-full mt-4 bg-secondary hover:bg-secondary/90">
                  Visit Store
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="text-center mt-8 md:hidden">
          <Button variant="outline">
            View All Vendors
          </Button>
        </div>
      </div>
    </section>
  )
}
