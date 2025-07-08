'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { 
  LayoutDashboard, 
  Package, 
  ShoppingCart, 
  Users, 
  FolderTree, 
  BarChart3, 
  Settings,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

const AdminSidebar = () => {
  const pathname = usePathname();

  const menuItems = [
    {
      title: 'Dashboard',
      href: '/admin',
      icon: LayoutDashboard
    },
    {
      title: 'Products',
      href: '/admin/products',
      icon: Package
    },
    {
      title: 'Orders',
      href: '/admin/orders',
      icon: ShoppingCart
    },
    {
      title: 'Users',
      href: '/admin/users',
      icon: Users
    },
    {
      title: 'Categories',
      href: '/admin/categories',
      icon: FolderTree
    },
    {
      title: 'Reports',
      href: '/admin/reports',
      icon: BarChart3
    },
    {
      title: 'Settings',
      href: '/admin/settings',
      icon: Settings
    }
  ];

  return (
    <div className="w-64 bg-white border-r border-gray-200 h-screen sticky top-0">
      <div className="p-6 border-b border-gray-200">
        <Link href="/admin" className="text-2xl font-bold text-blue-600">
          ShopKart Admin
        </Link>
      </div>
      
      <nav className="p-4 space-y-2">
        {menuItems.map((item) => {
          const Icon = item.icon;
          const isActive = pathname === item.href;
          
          return (
            <Link key={item.href} href={item.href}>
              <Button
                variant={isActive ? 'default' : 'ghost'}
                className={cn(
                  'w-full justify-start',
                  isActive && 'bg-blue-600 text-white hover:bg-blue-700'
                )}
              >
                <Icon className="mr-3 h-4 w-4" />
                {item.title}
              </Button>
            </Link>
          );
        })}
        
        <div className="pt-4 border-t border-gray-200 mt-4">
          <Button variant="ghost" className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50">
            <LogOut className="mr-3 h-4 w-4" />
            Logout
          </Button>
        </div>
      </nav>
    </div>
  );
};

export default AdminSidebar;