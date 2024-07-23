"use client";

import usePreviewModal from "@/hooks/use-preview-modal";
import Modal from '@/components/ui/modal';
import Gallery from "@/components/gallery";
import Info from "@/components/info";

const PreviewModal = () => {
    const previewModal = usePreviewModal();
    const product = usePreviewModal((state) => state.data);

    if(!product) {
        return null;
    }

    return (
                <div className="sm:col-span-4 lg:col-span-5">
                    Hello this is Preview Modal
                </div>
    )
}

export default PreviewModal;