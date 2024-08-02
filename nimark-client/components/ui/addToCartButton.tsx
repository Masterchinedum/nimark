'use client'

import { Product } from "@/types";
import Button from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";
import useCart from "@/hooks/use-cart";

interface AddToCartButtonProps {
    data: Product;
}

const AddToCartButton: React.FC<AddToCartButtonProps> = ({ data }) => {
    const cart = useCart();

    const handleAddToCart = () => {
        cart.addItem(data);
    }

    return (
        <Button onClick={handleAddToCart} className="flex items-center gap-x-2">
            Add To Cart
            <ShoppingCart />
        </Button>
    );
}

export default AddToCartButton;