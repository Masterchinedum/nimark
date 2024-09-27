//nimark-front/app/(routes)/products/[productId]/page.tsx

import { notFound } from 'next/navigation';
import { getProduct } from '@/lib/api';
import ProductDetailPage from '@/components/product/ProductDetailPage';
import { ProductDetails } from '@/types/product'; // You might want to move the interface to a separate file

export default async function ProductPage({ params }: { params: { productId: string } }) {
  const product = await getProduct(params.productId) as ProductDetails;

  if (!product) {
    notFound();
  }

  return <ProductDetailPage product={product} />;
}