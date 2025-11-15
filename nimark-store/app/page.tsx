
import { Hero } from "@/components/design/Hero"
import { FlashDeals } from "@/components/design/FlashDeals"
import { FeaturedProducts } from "@/components/design/FeaturedProducts"
import { TopVendors } from "@/components/design/TopVendors"
import { Toaster } from "@/components/ui/sonner"

function App() {
  return (
    <div className="min-h-screen bg-background">

      <Hero />
      <FlashDeals />
      <FeaturedProducts />
      <TopVendors />
      <Toaster />
    </div>
  )
}

export default App