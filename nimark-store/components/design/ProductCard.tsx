import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Heart, ShoppingCart, Star, Storefront } from "@phosphor-icons/react"
import { motion } from "framer-motion"
import { useState } from "react"

interface ProductCardProps {
  id: string
  name: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  vendor: string
  badge?: string
  isFeatured?: boolean
}

export function ProductCard({
  name,
  price,
  originalPrice,
  image,
  rating,
  reviews,
  vendor,
  badge
}: ProductCardProps) {
  const [isWished, setIsWished] = useState(false)
  const discount = originalPrice ? Math.round(((originalPrice - price) / originalPrice) * 100) : 0

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
    >
      <Card className="group overflow-hidden border-border hover:shadow-lg transition-all duration-300">
        <div className="relative aspect-square overflow-hidden bg-muted">
          <div 
            className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
            style={{ backgroundImage: `url(${image})` }}
          />
          
          <div className="absolute top-3 left-3 flex gap-2">
            {badge && (
              <Badge className="bg-accent text-accent-foreground font-semibold">
                {badge}
              </Badge>
            )}
            {discount > 0 && (
              <Badge className="bg-primary text-primary-foreground font-semibold">
                -{discount}%
              </Badge>
            )}
          </div>

          <Button
            size="icon"
            variant="secondary"
            className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity"
            onClick={() => setIsWished(!isWished)}
          >
            <Heart size={18} weight={isWished ? "fill" : "regular"} className={isWished ? "text-red-500" : ""} />
          </Button>

          <div className="absolute bottom-3 left-3 right-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
            <Button className="flex-1 bg-primary hover:bg-primary/90 text-primary-foreground">
              <ShoppingCart size={18} className="mr-2" />
              Add to Cart
            </Button>
          </div>
        </div>

        <div className="p-4">
          <div className="flex items-center gap-2 mb-2">
            <Storefront size={14} className="text-muted-foreground" />
            <span className="text-xs text-muted-foreground">{vendor}</span>
          </div>
          
          <h3 className="font-semibold text-sm mb-2 line-clamp-2 min-h-10">
            {name}
          </h3>

          <div className="flex items-center gap-1 mb-3">
            <div className="flex items-center gap-0.5">
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={14}
                  weight="fill"
                  className={i < Math.floor(rating) ? "text-yellow-500" : "text-gray-300"}
                />
              ))}
            </div>
            <span className="text-xs text-muted-foreground ml-1">({reviews})</span>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-lg font-bold text-primary">
              ${price.toFixed(2)}
            </span>
            {originalPrice && (
              <span className="text-sm text-muted-foreground line-through">
                ${originalPrice.toFixed(2)}
              </span>
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  )
}
