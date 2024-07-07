"use client"

import { useStoreModal } from '@/hooks/use-store-modal';
import { Modal } from "@/components/ui/modal";


export const StoreModal = () => {
    const StoreModal = useStoreModal();

    return (
        <Modal
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={false}
            onClose={() => {}}
        >
            Future Create Stiore from
        </Moda
    );
};