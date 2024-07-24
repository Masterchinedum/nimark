"use client"

import Button from '@/components/ui/button';
import { ShoppingBag } from 'lucide-react';

const NavbarActions = () => {

    return (
        <div className="flex items-center ml-auto gap-x-4">
            <Button className='flex items-center px-4 py-2 bg-black rounded-full'>
                <ShoppingBag 
                    size={20}
                    color='white'
                />
            </Button>
            This is an action
        </div>
    )
}

export default NavbarActions;