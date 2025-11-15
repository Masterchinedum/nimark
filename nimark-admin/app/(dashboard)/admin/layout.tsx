import { redirect } from "next/navigation"
import { auth } from "@/auth"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const session = await auth()

  if (!session?.user?.id) {
    redirect("/sign-in")
  }

  if (session.user.role !== "ADMIN") {
    redirect("/")
  }

  return <>{children}</>
}
