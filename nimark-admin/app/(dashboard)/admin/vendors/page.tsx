import prismadb from "@/lib/prismadb"
import { format } from "date-fns"
import { VendorColumn } from "./components/columns"
import { VendorsClient } from "./components/client"

export default async function VendorsPage() {
  // Fetch all vendors (users with stores)
  const vendors = await prismadb.user.findMany({
    where: {
      stores: {
        some: {}, // Has at least one store
      },
    },
    include: {
      stores: {
        include: {
          products: true,
          orders: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  })

  const formattedVendors: VendorColumn[] = vendors.map((vendor) => {
    const totalProducts = vendor.stores.reduce(
      (acc, store) => acc + store.products.length,
      0
    )
    const totalOrders = vendor.stores.reduce(
      (acc, store) => acc + store.orders.length,
      0
    )

    return {
      id: vendor.id,
      name: vendor.name || "N/A",
      email: vendor.email || "N/A",
      role: vendor.role,
      storeCount: vendor.stores.length,
      productCount: totalProducts,
      orderCount: totalOrders,
      createdAt: format(vendor.createdAt, "MMMM do, yyyy"),
    }
  })

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <VendorsClient data={formattedVendors} />
      </div>
    </div>
  )
}
