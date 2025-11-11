'use client';

import { ShoppingCart } from 'lucide-react';
import { Product } from '@/types';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import useCart from '@/hooks/use-cart';

interface InfoProps {
  data: Product;
}

const Info: React.FC<InfoProps> = ({ data }) => {
  const cart = useCart();

  const onAddToCart = () => {
    cart.addItem(data);
  };

  return (
    <div>
      <h1 className="text-3xl font-bold text-gray-900">{data.name}</h1>
      <div className="mt-3 flex items-end justify-between">
        <p className="text-2xl text-gray-900">₦{data.price}</p>
      </div>
      <Separator className="my-4" />
      <div className="flex flex-col gap-y-6">
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Size:</h3>
          <div>{data?.size?.name}</div>
        </div>
        <div className="flex items-center gap-x-4">
          <h3 className="font-semibold text-black">Color:</h3>
          <div
            className="h-6 w-6 rounded-full border border-gray-600"
            style={{ backgroundColor: data?.color?.value }}
          />
        </div>
        {data?.brand && (
          <div className="flex items-center gap-x-4">
            <h3 className="font-semibold text-black">Brand:</h3>
            <div>{data.brand.name}</div>
          </div>
        )}
      </div>
      {data.description && (
        <>
          <Separator className="my-4" />
          <div>
            <h3 className="mb-2 font-semibold text-black">Description:</h3>
            <p className="text-sm text-gray-600">{data.description}</p>
          </div>
        </>
      )}
      <div className="mt-10 flex items-center gap-x-3">
        <Button onClick={onAddToCart} className="flex items-center gap-x-2">
          Add To Cart
          <ShoppingCart size={20} />
        </Button>
      </div>
    </div>
  );
};

export default Info;
