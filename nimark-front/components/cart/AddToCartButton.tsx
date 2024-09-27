import React from 'react';
import { Button } from '@/components/ui/button';
import { Product } from '@/types/product';

interface AddToCartButtonProps {
  product: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ product }) => {
  const addToCart = () => {
    // Implement add to cart functionality
    console.log(`Added ${product.name} to cart`);
  };

  return (
    <Button onClick={addToCart} disabled={product.stock === 0}>
      {product.stock > 0 ? 'Add to Cart' : 'Out of Stock'}
    </Button>
  );
};

export default AddToCartButton;