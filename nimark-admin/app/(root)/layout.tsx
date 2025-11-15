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

    // Admins should be redirected to admin dashboard if they have no stores
    if (session.user.role === "ADMIN") {
        const store = await prismadb.store.findFirst({
            where: {
                userId: session.user.id
            }
        });

        if (store) {
            redirect(`/${store.id}`);
        } else {
            // Admin with no store goes to admin dashboard
            redirect('/admin');
        }
    }

    // Vendors must have a store
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