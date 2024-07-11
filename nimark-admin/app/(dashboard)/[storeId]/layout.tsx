// import Navbar from "@/components/navbar";
import prismadb from "@/lib/prismadb";
import { auth } from "@clerk/nextjs/server";
import { Heading1 } from "lucide-react";
import { redirect } from "next/navigation";

export default async function DashboardLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { storeId: string }
}) {
    const { userId } = auth();

    if (!userId) {
        redirect( '/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            id: params.storeId,
            userId
        }
    });

    if (!store) {
        redirect('/');
    }

    return (
        <>
            {/* <Navbar /> */}
            <div> <h1 className="text-4xl font-bold mb-4 text-gray-900"> This will be a Navbar </h1> </div>
            {children}
        </>
    )
}