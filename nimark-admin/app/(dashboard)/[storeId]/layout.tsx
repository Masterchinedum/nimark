import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function DashboardLayout(
    props: {
        children: React.ReactNode;
        params: Promise<{ storeId: string }>
    }
) {
    const params = await props.params;

    const {
        children
    } = props;

    const session = await auth();

    if (!session?.user?.id) {
        redirect( '/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId: session.user.id
        }
    });

    if (!store) {
        redirect('/');
    }

    return (
        <>
            <Navbar />
            {children}
        </>
    )
}