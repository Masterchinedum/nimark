'use client';

import Image from 'next/image';
import { X, Minus, Plus } from 'lucide-react';
import { Product } from '@/types';
import useCart from '@/hooks/use-cart';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';

interface CartItemProps {
  data: Product & { quantity: number };
}

const CartItem: React.FC<CartItemProps> = ({ data }) => {
  const cart = useCart();

  const onRemove = () => {
    cart.removeItem(data.id);
  };

  const onUpdateQuantity = (newQuantity: number) => {
    cart.updateQuantity(data.id, newQuantity);
  };

  return (
    <li className="flex border-b py-6">
      <div className="relative h-24 w-24 overflow-hidden rounded-md sm:h-32 sm:w-32">
        <Image
          fill
          src={data.images[0].url}
          alt=""
          className="object-cover object-center"
        />
      </div>
      <div className="relative ml-4 flex flex-1 flex-col justify-between sm:ml-6">
        <div className="absolute right-0 top-0 z-10">
          <Button onClick={onRemove} variant="ghost" size="icon">
            <X size={18} />
          </Button>
        </div>
        <div className="relative pr-9 sm:grid sm:grid-cols-2 sm:gap-x-6 sm:pr-0">
          <div className="flex justify-between">
            <p className="text-lg font-semibold text-black">{data.name}</p>
          </div>

          <div className="mt-1 flex text-sm">
            <p className="text-gray-500">{data.color.name}</p>
            <p className="ml-4 border-l border-gray-200 pl-4 text-gray-500">
              {data.size.name}
            </p>
          </div>
          <div className="mt-2 flex items-center gap-2">
            <Button
              onClick={() => onUpdateQuantity(data.quantity - 1)}
              variant="outline"
              size="icon"
              className="h-8 w-8"
            >
              <Minus size={14} />
            </Button>
            <Input
              type="number"
              value={data.quantity}
              onChange={(e) => onUpdateQuantity(parseInt(e.target.value) || 1)}
              className="h-8 w-16 text-center"
              min="1"
            />
            <Button
              onClick={() => onUpdateQuantity(data.quantity + 1)}
              variant="outline"
              size="icon"
              className="h-8 w-8"
            >
              <Plus size={14} />
            </Button>
          </div>
          <p className="mt-2 text-lg font-bold">₦{data.price}</p>
        </div>
      </div>
    </li>
  );
};

export default CartItem;
