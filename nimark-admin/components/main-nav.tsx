"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"
import { VerticalMainNav } from "./VerticalMainNav"

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
    className?: string
    userRole?: string
}

export function MainNav({ className, userRole, ...props }: MainNavProps) {
    const pathname = usePathname()
    const params = useParams()

    // Platform Management (Admin Only)
    const platformRoutes = userRole === "ADMIN" ? [
        {
            href: `/admin`,
            label: 'Platform',
            active: pathname === `/admin`
        },
        {
            href: `/admin/users`,
            label: 'Users',
            active: pathname === `/admin/users`
        },
        {
            href: `/admin/stores`,
            label: 'Vendors',
            active: pathname === `/admin/stores`
        },
        {
            href: `/admin/catalog`,
            label: 'Catalog',
            active: pathname.startsWith(`/admin/catalog`)
        },
    ] : []

    // Catalog routes removed - now under /admin/catalog

    // Store Operations (Vendors & Admins)
    const storeRoutes = params.storeId ? [
        {
            href: `/${params.storeId}`,
            label: 'Dashboard',
            active: pathname === `/${params.storeId}`
        },
        {
            href: `/${params.storeId}/products`,
            label: 'Products',
            active: pathname === `/${params.storeId}/products`
        },
        {
            href: `/${params.storeId}/orders`,
            label: 'Orders',
            active: pathname === `/${params.storeId}/orders`
        },
        {
            href: `/${params.storeId}/settings`,
            label: 'Settings',
            active: pathname === `/${params.storeId}/settings`
        },
    ] : []

    const routes = [...platformRoutes, ...storeRoutes]

    return (
        <nav className={cn("flex items-center space-x-4 lg:space-x-6", className)} {...props}>
            {routes.map((route, index) => (
                <Link
                    key={index}
                    href={route.href}
                    className={cn(
                        "text-sm font-medium transition-colors hover:text-primary",
                        route.active ? "text-black dark:text-white" : "text-muted-foreground"
                    )}
                >
                    {route.label}
                </Link>
            ))}
        </nav>
    )
}