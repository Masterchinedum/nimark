import prismadb from "@/lib/prismadb"
import { format } from "date-fns"
import { UserColumn } from "./components/columns"
import { UsersClient } from "./components/client"

export default async function UsersPage() {
  const users = await prismadb.user.findMany({
    include: {
      stores: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedUsers: UserColumn[] = users.map((user) => ({
    id: user.id,
    name: user.name || "N/A",
    email: user.email || "N/A",
    role: user.role,
    storeCount: user.stores.length,
    createdAt: format(user.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <UsersClient data={formattedUsers} />
      </div>
    </div>
  )
}
