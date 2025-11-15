//nimark-admin/app/(dashboard)/[storeId]/(routes)/brands/new/page.tsx

import { BrandForm } from "../[brandId]/components/brand-form";

const NewBrandPage = () => {
    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <BrandForm initialData={null} />
            </div>
        </div>
    );
};

export default NewBrandPage;