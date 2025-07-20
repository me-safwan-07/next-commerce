'use client'

import { cn } from '@/lib/utils'
import Link from 'next/link'
import { useParams, usePathname } from 'next/navigation'

interface MainNavProps extends React.HTMLAttributes<HTMLElement> {
   isAdmin?: boolean;
}
export function MainNav({
   className,
   isAdmin,
   ...props
}: MainNavProps) {
   const pathname = usePathname()

   const routes = [
      {
         href: `${isAdmin ? "/admin/banners" : "/banners"}`,
         label: 'Banners',
         active: pathname.includes(`/banners`),
      },
      {
         href: `${isAdmin ? "/admin/categories" : "/categories"}`,
         label: 'Categories',
         active: pathname.includes(`/categories`),
      },
      {
         href: `${isAdmin ? "/admin/products" : "/products"}`,
         label: 'Products',
         active: pathname.includes(`/products`),
      },
      {
         href: `${isAdmin ? "/admin/orders" : "/orders"}`,
         label: 'Orders',
         active: pathname.includes(`/orders`),
      },
      {
         href: `${isAdmin ? "/admin/payments" : "/payments"}`,
         label: 'Payments',
         active: pathname.includes(`/payments`),
      },
      {
         href: `${isAdmin ? "/admin/users" : "/users"}`,
         label: 'Users',
         active: pathname.includes(`/users`),
      },
      {
         href: `${isAdmin ? "/admin/brands" : "/brands"}`,
         label: 'Brands',
         active: pathname.includes(`/brands`),
      },
      {
         href: `${isAdmin ? "/admin/codes" : "/codes"}`,
         label: 'Codes',
         active: pathname.includes(`/codes`),
      },
   ];


   return (
      <nav
         className={cn('flex items-center space-x-4 lg:space-x-6', className)}
         {...props}
      >
         {routes.map((route) => (
            <Link
               key={route.href}
               href={route.href}
               className={cn(
                  'text-sm transition-colors hover:text-primary',
                  route.active
                     ? 'font-semibold'
                     : 'font-light text-muted-foreground'
               )}
            >
               {route.label}
            </Link>
         ))}
      </nav>
   )
}
