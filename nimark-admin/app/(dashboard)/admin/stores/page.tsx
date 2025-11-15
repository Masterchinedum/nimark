import prismadb from "@/lib/prismadb"
import { format } from "date-fns"
import { StoreColumn } from "./components/columns"
import { StoresClient } from "./components/client"

export default async function StoresPage() {
  const stores = await prismadb.store.findMany({
    include: {
      user: {
        select: {
          name: true,
          email: true,
        },
      },
      products: true,
      orders: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedStores: StoreColumn[] = stores.map((store) => ({
    id: store.id,
    name: store.name,
    ownerName: store.user.name || "N/A",
    ownerEmail: store.user.email || "N/A",
    productCount: store.products.length,
    orderCount: store.orders.length,
    createdAt: format(store.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <StoresClient data={formattedStores} />
      </div>
    </div>
  )
}
