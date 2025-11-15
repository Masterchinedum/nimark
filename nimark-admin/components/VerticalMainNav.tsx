"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

interface VerticalMainNavProps extends React.HTMLAttributes<HTMLElement> {
    className?: string
    userRole?: string
}

export function VerticalMainNav({ className, userRole, ...props }: VerticalMainNavProps) {
    const pathname = usePathname()
    const params = useParams()

    // Admin-only routes
    const adminRoutes = userRole === "ADMIN" ? [
        {
            href: `/admin`,
            label: 'Admin Dashboard',
            active: pathname === `/admin`
        },
        {
            href: `/admin/users`,
            label: 'Users',
            active: pathname === `/admin/users`
        },
        {
            href: `/admin/stores`,
            label: 'All Stores',
            active: pathname === `/admin/stores`
        },
    ] : []

    // Vendor routes (also available to admins when viewing a specific store)
    const storeRoutes = params.storeId ? [{
          href: `/${params.storeId}`,
          label: 'Overview',
          active: pathname === `/${params.storeId}`
      }, {
          href: `/${params.storeId}/billboards`,
          label: 'Billboards',
          active: pathname === `/${params.storeId}/billboards`,
          adminOnly: true
      }, {
          href: `/${params.storeId}/categories`,
          label: 'Categories',
          active: pathname === `/${params.storeId}/categories`,
          adminOnly: true
      },{
          href: `/${params.storeId}/brands`,
          label: 'Brands',
          active: pathname === `/${params.storeId}/brands`,
          adminOnly: true
      }, {
          href: `/${params.storeId}/sizes`,
          label: 'Sizes',
          active: pathname === `/${params.storeId}/sizes`,
          adminOnly: true
      }, {
          href: `/${params.storeId}/colors`,
          label: 'Colors',
          active: pathname === `/${params.storeId}/colors`,
          adminOnly: true
      }, {
          href: `/${params.storeId}/products`,
          label: 'Products',
          active: pathname === `/${params.storeId}/products`
      }, {
          href: `/${params.storeId}/orders`,
          label: 'Orders',
          active: pathname === `/${params.storeId}/orders`
      }, {
          href: `/${params.storeId}/settings`,
          label: 'Settings',
          active: pathname === `/${params.storeId}/settings`
      }].filter(route => !route.adminOnly || userRole === "ADMIN") : []

    const routes = [...adminRoutes, ...storeRoutes]

    return (
        <nav className={cn("flex flex-col space-y-3 w-full", className)} {...props}>
            {routes.map((route, index) => (
                <Link
                    key={index}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors w-full block",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}