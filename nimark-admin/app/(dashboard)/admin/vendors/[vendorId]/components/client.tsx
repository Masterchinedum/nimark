"use client"

import { DataTable } from "@/components/ui/data-table"
import { Heading } from "@/components/ui/heading"
import { Separator } from "@/components/ui/separator"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { StoreColumn, columns } from "./columns"
import { Button } from "@/components/ui/button"
import { ArrowLeft } from "lucide-react"
import { useRouter } from "next/navigation"

interface VendorDetailsClientProps {
  vendor: {
    id: string
    name: string
    email: string
    role: string
    image: string | null
    createdAt: string
  }
  stores: StoreColumn[]
}

export const VendorDetailsClient: React.FC<VendorDetailsClientProps> = ({
  vendor,
  stores,
}) => {
  const router = useRouter()

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
  }

  return (
    <>
      <Button
        variant="ghost"
        onClick={() => router.push("/admin/vendors")}
        className="mb-4"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to Vendors
      </Button>

      <Card>
        <CardHeader>
          <div className="flex items-center space-x-4">
            <Avatar className="h-20 w-20">
              <AvatarImage src={vendor.image || undefined} alt={vendor.name} />
              <AvatarFallback className="text-2xl">
                {getInitials(vendor.name)}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1">
              <CardTitle className="text-2xl">{vendor.name}</CardTitle>
              <CardDescription className="text-base mt-1">
                {vendor.email}
              </CardDescription>
              <div className="mt-2 flex items-center space-x-2">
                <Badge variant={vendor.role === "ADMIN" ? "default" : "secondary"}>
                  {vendor.role}
                </Badge>
                <span className="text-sm text-muted-foreground">
                  Joined {vendor.createdAt}
                </span>
              </div>
            </div>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid gap-4 md:grid-cols-3">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Stores</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stores.length}</div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Products</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stores.reduce((acc, store) => acc + store.productCount, 0)}
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium">Total Orders</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  {stores.reduce((acc, store) => acc + store.orderCount, 0)}
                </div>
              </CardContent>
            </Card>
          </div>
        </CardContent>
      </Card>

      <div className="mt-8">
        <Heading
          title={`Vendor Stores (${stores.length})`}
          description="View and manage stores owned by this vendor"
        />
        <Separator className="my-4" />
        <DataTable searchKey="name" columns={columns} data={stores} />
      </div>
    </>
  )
}
