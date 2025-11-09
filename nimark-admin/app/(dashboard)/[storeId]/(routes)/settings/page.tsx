import { auth } from "@/auth";
import { redirect } from "next/navigation";
import  prismadb from '@/lib/prismadb';
import { SettingsForm } from "./components/settings-form";

interface SettingsPageProps {
    params: {
        storeId: string;
    }
};
const SettingsPage: React.FC<SettingsPageProps> = async props => {
    const params = await props.params;
    const session = await auth();

    if(!session?.user?.id) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: session.user.id
        }
    })

    if (!store) {
        redirect('/');
    }

    return (
        <div className="flex-col">
            <div className="flex-1 p-8 pt-6 space-y-4">
                <SettingsForm initialData={store} />
            </div>
        </div>
    )
}

export default SettingsPage