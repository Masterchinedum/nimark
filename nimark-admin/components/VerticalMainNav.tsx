"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

interface VerticalMainNavProps extends React.HTMLAttributes<HTMLElement> {
    className?: string
    userRole?: string
}

interface NavSection {
    title: string
    routes: Array<{
        href: string
        label: string
        active: boolean
    }>
}

export function VerticalMainNav({ className, userRole, ...props }: VerticalMainNavProps) {
    const pathname = usePathname()
    const params = useParams()

    const sections: NavSection[] = []

    // Platform Management (Admin Only)
    if (userRole === "ADMIN") {
        sections.push({
            title: "Platform Management",
            routes: [
                {
                    href: `/admin`,
                    label: 'Platform Overview',
                    active: pathname === `/admin`
                },
                {
                    href: `/admin/users`,
                    label: 'User Management',
                    active: pathname === `/admin/users`
                },
                {
                    href: `/admin/stores`,
                    label: 'Vendor Management',
                    active: pathname === `/admin/stores`
                },
            ]
        })
    }

    // Catalog Management (Admin Only - Global)
    if (userRole === "ADMIN" && params.storeId) {
        sections.push({
            title: "Catalog Management",
            routes: [
                {
                    href: `/${params.storeId}/billboards`,
                    label: 'Billboards',
                    active: pathname === `/${params.storeId}/billboards`
                },
                {
                    href: `/${params.storeId}/categories`,
                    label: 'Categories',
                    active: pathname === `/${params.storeId}/categories`
                },
                {
                    href: `/${params.storeId}/brands`,
                    label: 'Brands',
                    active: pathname === `/${params.storeId}/brands`
                },
                {
                    href: `/${params.storeId}/sizes`,
                    label: 'Sizes',
                    active: pathname === `/${params.storeId}/sizes`
                },
                {
                    href: `/${params.storeId}/colors`,
                    label: 'Colors',
                    active: pathname === `/${params.storeId}/colors`
                },
            ]
        })
    }

    // Store Operations (Vendors & Admins)
    if (params.storeId) {
        sections.push({
            title: userRole === "ADMIN" ? "Store Operations" : "Store Management",
            routes: [
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
                    label: 'Store Settings',
                    active: pathname === `/${params.storeId}/settings`
                },
            ]
        })
    }

    return (
        <nav className={cn("flex flex-col space-y-6 w-full", className)} {...props}>
            {sections.map((section, sectionIndex) => (
                <div key={sectionIndex} className="space-y-3">
                    <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider px-3">
                        {section.title}
                    </h3>
                    <div className="space-y-1">
                        {section.routes.map((route, routeIndex) => (
                            <Link
                                key={routeIndex}
                                href={route.href}
                                className={cn(
                                    "text-sm font-medium transition-colors w-full block px-3 py-2 rounded-md",
                                    route.active 
                                        ? "bg-secondary text-black dark:text-white" 
                                        : "text-muted-foreground hover:bg-secondary/50"
                                )}
                            >
                                {route.label}
                            </Link>
                        ))}
                    </div>
                </div>
            ))}
        </nav>
    )
}