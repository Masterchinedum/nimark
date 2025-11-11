'use client';

import Image from 'next/image';
import { MouseEventHandler } from 'react';
import { Expand, ShoppingCart } from 'lucide-react';
import { useRouter } from 'next/navigation';

import { Product } from '@/types';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import useCart from '@/hooks/use-cart';

interface ProductCardProps {
  data: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ data }) => {
  const cart = useCart();
  const router = useRouter();

  const handleClick = () => {
    router.push(`/product/${data?.id}`);
  };

  const onAddToCart: MouseEventHandler<HTMLButtonElement> = (event) => {
    event.stopPropagation();
    cart.addItem(data);
  };

  return (
    <Card
      onClick={handleClick}
      className="group cursor-pointer overflow-hidden transition-all hover:shadow-lg"
    >
      <CardContent className="p-0">
        <div className="relative aspect-square overflow-hidden bg-gray-100">
          <Image
            src={data.images?.[0]?.url || '/placeholder.png'}
            alt={data.name}
            fill
            className="object-cover transition-all duration-300 group-hover:scale-105"
          />
          {data.isFeatured && (
            <Badge className="absolute left-2 top-2">Featured</Badge>
          )}
          <div className="absolute inset-0 flex items-center justify-center gap-x-2 opacity-0 transition-opacity group-hover:opacity-100">
            <Button
              onClick={handleClick}
              variant="secondary"
              size="icon"
              className="h-10 w-10"
            >
              <Expand className="h-5 w-5" />
            </Button>
            <Button
              onClick={onAddToCart}
              variant="secondary"
              size="icon"
              className="h-10 w-10"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex flex-col items-start gap-2 p-4">
        <p className="text-lg font-semibold">{data.name}</p>
        <p className="text-sm text-muted-foreground">{data.category?.name}</p>
        <div className="flex w-full items-center justify-between">
          <p className="text-xl font-bold">₦{data.price}</p>
        </div>
      </CardFooter>
    </Card>
  );
};

export default ProductCard;
