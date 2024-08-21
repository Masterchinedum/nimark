"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { useParams, usePathname } from "next/navigation"

interface VerticalMainNavProps extends React.HTMLAttributes<HTMLElement> {
    className?: string
}

export function VerticalMainNav({ className, ...props }: VerticalMainNavProps) {
    const pathname = usePathname()
    const params = useParams()

    const routes = [{
          href: `/${params.storeId}`,
          label: 'Overview',
          active: pathname === `/${params.storeId}`
      }, {
          href: `/${params.storeId}/billboards`,
          label: 'Billboards',
          active: pathname === `/${params.storeId}/billboards`
      }, {
          href: `/${params.storeId}/categories`,
          label: 'Categories',
          active: pathname === `/${params.storeId}/categories`
      },{
          href: `/${params.storeId}/brands`,
          label: 'Brands',
          active: pathname === `/${params.storeId}/brands`
      }, {
          href: `/${params.storeId}/sizes`,
          label: 'Sizes',
          active: pathname === `/${params.storeId}/sizes`
      }, {
          href: `/${params.storeId}/colors`,
          label: 'Colors',
          active: pathname === `/${params.storeId}/colors`
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
      }];

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