import { redirect } from "next/navigation"
import { auth } from "@/auth"
import Navbar from "@/components/navbar"
import prismadb from "@/lib/prismadb"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  console.log("[Admin Layout] Session:", session?.user)

  if (!session?.user?.id) {
    console.log("[Admin Layout] No user, redirecting to sign-in")
    redirect("/sign-in")
  }

  if (session.user.role !== "ADMIN") {
    console.log("[Admin Layout] User is not admin, role:", session.user.role)
    // Redirect vendors to their first store or setup page
    const vendorStore = await prismadb.store.findFirst({
      where: { userId: session.user.id }
    })
    redirect(vendorStore ? `/${vendorStore.id}` : "/")
  }

  console.log("[Admin Layout] User is admin, rendering admin layout")

  return (
    <>
      <Navbar />
      {children}
    </>
  )
}
