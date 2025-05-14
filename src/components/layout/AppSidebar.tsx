"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  CalendarDays,
  LayoutDashboard,
  Target,
  Settings,
  BookText,
} from 'lucide-react';

import {
  Sidebar,
  SidebarHeader,
  SidebarContent,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarFooter,
  useSidebar,
} from '@/components/ui/sidebar';
import { Logo } from '@/components/Logo';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';

const menuItems = [
  { href: '/', label: 'Today', icon: LayoutDashboard },
  { href: '/weekly-planning', label: 'Weekly Plan', icon: CalendarDays },
  { href: '/annual-goals', label: 'Annual Goals', icon: Target },
  // { href: '/reports', label: 'Reports', icon: BarChart3 }, // Future
  // { href: '/settings', label: 'Settings', icon: Settings }, // Future
];

export function AppSidebar() {
  const pathname = usePathname();
  const { state: sidebarState } = useSidebar();
  const isCollapsed = sidebarState === 'collapsed';

  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <Logo collapsed={isCollapsed} />
      </SidebarHeader>
      <Separator className="my-1 bg-sidebar-border" />
      <SidebarContent>
        <SidebarMenu>
          {menuItems.map((item) => (
            <SidebarMenuItem key={item.href}>
              <SidebarMenuButton
                asChild
                isActive={pathname === item.href}
                tooltip={{ children: item.label, className: "capitalize"}}
              >
                <Link href={item.href}>
                  <item.icon />
                  <span>{item.label}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>
      <SidebarFooter className="mt-auto">
        <Separator className="my-1 bg-sidebar-border" />
         <SidebarMenu>
            <SidebarMenuItem>
              <SidebarMenuButton 
                asChild
                tooltip={{ children: "User Manual", className: "capitalize"}}
              >
                <Link href="/manual">
                  <BookText />
                  <span>User Manual</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
          </SidebarMenu>
      </SidebarFooter>
    </Sidebar>
  );
}
