import prismadb from "@/lib/prismadb"
import { format } from "date-fns"
import { notFound } from "next/navigation"
import { VendorDetailsClient } from "./components/client"
import { StoreColumn } from "./components/columns"

export default async function VendorDetailsPage(
  props: {
    params: Promise<{ vendorId: string }>
  }
) {
  const params = await props.params

  const vendor = await prismadb.user.findUnique({
    where: {
      id: params.vendorId,
    },
    include: {
      stores: {
        include: {
          products: true,
          orders: true,
        },
        orderBy: {
          createdAt: "desc",
        },
      },
    },
  })

  if (!vendor) {
    notFound()
  }

  const formattedStores: StoreColumn[] = vendor.stores.map((store) => ({
    id: store.id,
    name: store.name,
    productCount: store.products.length,
    orderCount: store.orders.length,
    createdAt: format(store.createdAt, "MMMM do, yyyy"),
  }))

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <VendorDetailsClient
          vendor={{
            id: vendor.id,
            name: vendor.name || "N/A",
            email: vendor.email || "N/A",
            role: vendor.role,
            image: vendor.image,
            createdAt: format(vendor.createdAt, "MMMM do, yyyy"),
          }}
          stores={formattedStores}
        />
      </div>
    </div>
  )
}
