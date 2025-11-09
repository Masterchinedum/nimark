import prismadb from "@/lib/prismadb";
import { auth } from "@/auth";
import { redirect } from "next/navigation";

export default async function SetupLayout ({
    children
}: {
    children: React.ReactNode;
}) {
    const session = await auth();

    if (!session?.user?.id) {
        redirect( '/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId: session.user.id
        }
    });

    if (store) {
        redirect(`/${store.id}`);
    }

    return (
        <>
        {children}
        </>
    );
};