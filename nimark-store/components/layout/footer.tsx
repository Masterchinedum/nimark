import { ShoppingCart, EnvelopeSimple, Phone, MapPin } from "@phosphor-icons/react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

export function Footer() {
  return (
    <footer className="bg-secondary text-secondary-foreground">
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-primary rounded-lg flex items-center justify-center">
                <ShoppingCart size={24} weight="bold" className="text-primary-foreground" />
              </div>
              <span className="text-2xl font-bold">MarketHub</span>
            </div>
            <p className="text-secondary-foreground/80 mb-4">
              Your trusted multi-vendor marketplace for quality products from verified sellers worldwide.
            </p>
            <div className="flex gap-3">
              <button className="w-10 h-10 bg-secondary-foreground/10 hover:bg-secondary-foreground/20 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-xl">𝕏</span>
              </button>
              <button className="w-10 h-10 bg-secondary-foreground/10 hover:bg-secondary-foreground/20 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-xl">f</span>
              </button>
              <button className="w-10 h-10 bg-secondary-foreground/10 hover:bg-secondary-foreground/20 rounded-lg flex items-center justify-center transition-colors">
                <span className="text-xl">in</span>
              </button>
            </div>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Quick Links</h3>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Become a Vendor</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Affiliate Program</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Careers</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Contact Us</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Customer Care</h3>
            <ul className="space-y-2 text-secondary-foreground/80">
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Help Center</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Track Order</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Returns & Refunds</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">Shipping Info</a></li>
              <li><a href="#" className="hover:text-secondary-foreground transition-colors">FAQs</a></li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Newsletter</h3>
            <p className="text-secondary-foreground/80 mb-4">
              Subscribe to get special offers and updates
            </p>
            <div className="flex gap-2">
              <Input 
                type="email" 
                placeholder="Your email" 
                className="bg-secondary-foreground/10 border-secondary-foreground/20 text-secondary-foreground placeholder:text-secondary-foreground/50"
              />
              <Button className="bg-primary hover:bg-primary/90 text-primary-foreground">
                Subscribe
              </Button>
            </div>
            
            <div className="mt-6 space-y-2 text-sm text-secondary-foreground/80">
              <div className="flex items-center gap-2">
                <Phone size={16} />
                <span>+1 (555) 123-4567</span>
              </div>
              <div className="flex items-center gap-2">
                <EnvelopeSimple size={16} />
                <span>support@markethub.com</span>
              </div>
              <div className="flex items-center gap-2">
                <MapPin size={16} />
                <span>123 Market St, NY 10001</span>
              </div>
            </div>
          </div>
        </div>

        <div className="border-t border-secondary-foreground/20 pt-8">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-secondary-foreground/80 text-sm">
              © 2024 MarketHub. All rights reserved.
            </p>
            <div className="flex gap-6 text-sm text-secondary-foreground/80">
              <a href="#" className="hover:text-secondary-foreground transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-secondary-foreground transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-secondary-foreground transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}
