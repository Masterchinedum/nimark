import { 
  DeviceMobile, 
  Laptop, 
  Watch, 
  Headphones, 
  GameController, 
  Camera,
  Dress,
  Sneaker,
  House,
  Barbell
} from "@phosphor-icons/react"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"

const categories = [
  { icon: DeviceMobile, label: "Phones & Tablets" },
  { icon: Laptop, label: "Computers" },
  { icon: Watch, label: "Smartwatches" },
  { icon: Headphones, label: "Audio" },
  { icon: GameController, label: "Gaming" },
  { icon: Camera, label: "Cameras" },
  { icon: Dress, label: "Fashion" },
  { icon: Sneaker, label: "Shoes" },
  { icon: House, label: "Home & Living" },
  { icon: Barbell, label: "Sports" },
]

export function Hero() {
  return (
    <section className="bg-muted/30">
      <div className="max-w-7xl mx-auto px-4 py-6">
        <div className="grid lg:grid-cols-[280px_1fr] gap-6">
          <Card className="hidden lg:block p-3 h-fit">
            <div className="space-y-1">
              {categories.map((category) => (
                <button
                  key={category.label}
                  className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg hover:bg-muted transition-colors text-left"
                >
                  <category.icon size={20} className="text-primary" />
                  <span className="text-sm font-medium">{category.label}</span>
                </button>
              ))}
            </div>
          </Card>

          <div className="relative overflow-hidden rounded-2xl bg-linear-to-br from-primary/90 via-accent/80 to-secondary/90 text-white">
            <div className="relative z-10 px-8 md:px-12 py-12 md:py-16">
              <div className="max-w-xl">
                <div className="inline-block px-4 py-1.5 bg-white/20 backdrop-blur-sm rounded-full text-sm font-medium mb-4">
                  🎉 Grand Opening Sale
                </div>
                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight tracking-tight">
                  Shop from<br />Trusted Vendors
                </h1>
                <p className="text-lg md:text-xl mb-8 text-white/90">
                  Discover amazing deals from verified sellers. Up to 70% off on selected items.
                </p>
                <div className="flex flex-wrap gap-3">
                  <Button size="lg" className="bg-white text-primary hover:bg-white/90 font-semibold">
                    Shop Now
                  </Button>
                  <Button size="lg" variant="outline" className="border-white text-white hover:bg-white/10">
                    Explore Vendors
                  </Button>
                </div>
              </div>
            </div>
            
            <div className="absolute top-0 right-0 w-1/2 h-full opacity-10">
              <div className="absolute top-10 right-10 w-32 h-32 bg-white rounded-full blur-3xl"></div>
              <div className="absolute bottom-10 right-20 w-40 h-40 bg-white rounded-full blur-3xl"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
