import Image from 'next/image';
import Link from 'next/link';
import { Product } from '@/types/product';

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  // Format the price in NGN currency
  const formattedPrice = new Intl.NumberFormat('en-NG', {
    style: 'currency',
    currency: 'NGN',
    minimumFractionDigits: 0,
  }).format(product.price);

  return (
    <Link href={`/products/${product.id}`} className="group block">
      <div className="relative aspect-[1/1] w-full overflow-hidden rounded-lg bg-gray-200">
        <Image 
          src={product.images[0].url} 
          alt={product.name}
          fill
          sizes="(min-width: 1280px) 300px, (min-width: 768px) 200px, 100vw"
          className="object-cover object-center transition-opacity duration-300 ease-in-out group-hover:opacity-75"
        />
        {product.stock === 0 && (
          <div className="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
            <span className="text-white text-lg font-semibold">Out of Stock</span>
          </div>
        )}
      </div>
      <div className="mt-4 flex justify-between items-start">
        <div>
          <h3 className="text-sm font-semibold text-gray-700 group-hover:text-gray-900 transition-colors duration-200">
            {product.name}
          </h3>
          <p className="mt-1 text-sm text-gray-500">{product.brand?.name}</p>
        </div>
        <p className="text-sm font-medium text-gray-900">{formattedPrice}</p>
      </div>
      <div className="mt-2 flex items-center space-x-2">
        <div 
          className="w-4 h-4 rounded-full border border-gray-300" 
          style={{ backgroundColor: product.color.value }}
        />
        <span className="text-sm text-gray-500">{product.size.value}</span>
      </div>
    </Link>
  );
};
