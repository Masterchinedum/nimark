import { Lightning } from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { ProductCard } from "./ProductCard"
import { useEffect, useState } from "react"

const flashDeals = [
  {
    id: "1",
    name: "Wireless Bluetooth Headphones with Noise Cancellation",
    price: 79.99,
    originalPrice: 159.99,
    image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
    rating: 4.5,
    reviews: 234,
    vendor: "AudioTech Store",
    badge: "Hot Deal"
  },
  {
    id: "2",
    name: "Smart Watch Series 7 - Health & Fitness Tracker",
    price: 299.99,
    originalPrice: 499.99,
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
    rating: 4.8,
    reviews: 456,
    vendor: "SmartGear Pro",
    badge: "Limited"
  },
  {
    id: "3",
    name: "4K Ultra HD Action Camera - Waterproof",
    price: 149.99,
    originalPrice: 299.99,
    image: "https://images.unsplash.com/photo-1526170375885-4d8ecf77b99f?w=400&h=400&fit=crop",
    rating: 4.6,
    reviews: 189,
    vendor: "CamWorld",
    badge: "50% Off"
  },
  {
    id: "4",
    name: "Mechanical Gaming Keyboard RGB Backlit",
    price: 89.99,
    originalPrice: 149.99,
    image: "https://images.unsplash.com/photo-1587829741301-dc798b83add3?w=400&h=400&fit=crop",
    rating: 4.7,
    reviews: 312,
    vendor: "GameZone Elite",
    badge: "Flash Sale"
  }
]

export function FlashDeals() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 12,
    minutes: 34,
    seconds: 56
  })

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        let { hours, minutes, seconds } = prev
        
        if (seconds > 0) {
          seconds--
        } else {
          seconds = 59
          if (minutes > 0) {
            minutes--
          } else {
            minutes = 59
            if (hours > 0) {
              hours--
            }
          }
        }
        
        return { hours, minutes, seconds }
      })
    }, 1000)

    return () => clearInterval(timer)
  }, [])

  return (
    <section className="py-12 bg-background">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-primary/10 rounded-xl flex items-center justify-center">
              <Lightning size={28} weight="fill" className="text-primary" />
            </div>
            <div>
              <h2 className="text-3xl font-bold">Flash Deals</h2>
              <p className="text-muted-foreground">Limited time offers - grab them now!</p>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-3">
            <span className="text-sm font-medium text-muted-foreground">Ends in:</span>
            <div className="flex items-center gap-2">
              <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 min-w-[60px] text-center">
                <div className="text-2xl font-bold">{String(timeLeft.hours).padStart(2, '0')}</div>
                <div className="text-xs">Hours</div>
              </div>
              <span className="text-2xl font-bold">:</span>
              <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 min-w-[60px] text-center">
                <div className="text-2xl font-bold">{String(timeLeft.minutes).padStart(2, '0')}</div>
                <div className="text-xs">Mins</div>
              </div>
              <span className="text-2xl font-bold">:</span>
              <div className="bg-primary text-primary-foreground rounded-lg px-3 py-2 min-w-[60px] text-center">
                <div className="text-2xl font-bold">{String(timeLeft.seconds).padStart(2, '0')}</div>
                <div className="text-xs">Secs</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
          {flashDeals.map((product) => (
            <ProductCard key={product.id} {...product} isFeatured />
          ))}
        </div>

        <div className="text-center">
          <Button size="lg" variant="outline" className="border-primary text-primary hover:bg-primary hover:text-primary-foreground">
            View All Flash Deals
          </Button>
        </div>
      </div>
    </section>
  )
}
