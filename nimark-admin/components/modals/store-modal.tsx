"use client"

import * as z from 'zod';
import { useStoreModal } from '@/hooks/use-store-modal';
import { Modal } from "@/components/ui/modal";
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';


const formSchema = z.object({
    name: z.string().min(1)
});

export const StoreModal = () => {
    const StoreModal = useStoreModal();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            name: ""
        }
    })

    return (
        <Modal
            title="Create Store"
            description="Add a new store to manage products and categories"
            isOpen={StoreModal.isOpen}
            onClose={StoreModal.onClose}
        >
            Future Create Stiore from
        </Modal>
    );
};