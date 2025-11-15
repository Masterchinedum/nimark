import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import prismadb from "@/lib/prismadb"
import { Image, FolderTree, Tag, Ruler, Palette } from "lucide-react"
import Link from "next/link"

export default async function CatalogManagementPage() {
  const [
    billboardCount,
    categoryCount,
    brandCount,
    sizeCount,
    colorCount
  ] = await Promise.all([
    prismadb.billboard.count(),
    prismadb.category.count(),
    prismadb.brand.count(),
    prismadb.size.count(),
    prismadb.color.count(),
  ])

  const catalogSections = [
    {
      title: "Billboards",
      description: "Manage promotional banners and hero images",
      icon: Image,
      count: billboardCount,
      href: "/admin/catalog/billboards"
    },
    {
      title: "Categories",
      description: "Organize products into hierarchical categories",
      icon: FolderTree,
      count: categoryCount,
      href: "/admin/catalog/categories"
    },
    {
      title: "Brands",
      description: "Manage product brands and manufacturers",
      icon: Tag,
      count: brandCount,
      href: "/admin/catalog/brands"
    },
    {
      title: "Sizes",
      description: "Define available product sizes",
      icon: Ruler,
      count: sizeCount,
      href: "/admin/catalog/sizes"
    },
    {
      title: "Colors",
      description: "Manage product color options",
      icon: Palette,
      count: colorCount,
      href: "/admin/catalog/colors"
    },
  ]

  return (
    <div className="flex-col">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-3xl font-bold tracking-tight">Catalog Management</h2>
            <p className="text-muted-foreground">
              Manage global catalog settings used across all vendor stores
            </p>
          </div>
        </div>
        
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {catalogSections.map((section) => (
            <Card key={section.href} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <div className="space-y-1">
                  <CardTitle className="text-base font-semibold flex items-center gap-2">
                    <section.icon className="h-5 w-5" />
                    {section.title}
                  </CardTitle>
                  <CardDescription className="text-xs">
                    {section.description}
                  </CardDescription>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="text-2xl font-bold">{section.count}</div>
                <Link href={section.href}>
                  <Button className="w-full" variant="outline">
                    Manage {section.title}
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </div>
  )
}
