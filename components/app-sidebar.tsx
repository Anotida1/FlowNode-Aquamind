"use client"

import * as React from "react"
import { NavMain } from "@/components/nav-main"
import { NavSecondary } from "@/components/nav-secondary"
import { NavUser } from "@/components/nav-user"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"
import {
  BarChart3Icon,
  BookOpenIcon,
  BotIcon,
  CloudSunIcon,
  CommandIcon,
  CircleHelpIcon,
  DropletsIcon,
  LayoutDashboardIcon,
  LeafIcon,
  MicIcon,
} from "lucide-react"
import Image from "next/image"

const data = {
  user: {
    name: "Joseph",
    email: "joseph@aquamind.com",
    avatar: "/profile.avif",
  },
  navMain: [
    {
      title: "Dashboard",
      url: "/dashboard",
      icon: <LayoutDashboardIcon className="size-4" />,
    },
    {
      title: "AI",
      url: "/ai",
      icon: <BotIcon className="size-4" />,
    },
    {
      title: "Voice Assistant",
      url: "/voice",
      icon: <MicIcon className="size-4" />,
    },
    {
      title: "Learning Hub",
      url: "/learn",
      icon: <BookOpenIcon className="size-4" />,
    },
    {
      title: "Analytics",
      url: "/analytics",
      icon: <BarChart3Icon className="size-4" />,
    },
    {
      title: "Crop Scan",
      url: "/crop",
      icon: <LeafIcon className="size-4" />,
    },
    {
      title: "Crop Water",
      url: "/crop-water",
      icon: <DropletsIcon className="size-4" />,
    },
    {
      title: "Weather",
      url: "/weather",
      icon: <CloudSunIcon className="size-4" />,
    },
  ],
  navSecondary: [
    {
      title: "Get Help",
      url: "/help",
      icon: (
        <CircleHelpIcon
        />
      ),
    },
  ]
}
export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              className="data-[slot=sidebar-menu-button]:p-1.5!"
              render={<a href="/dashboard" />}
            >
              <Image src="/logo.png" height={24} width={24} alt="Aquamind Logo" />
              <span className="text-base font-semibold"><span className="text-primary">Aqua</span>Mind</span>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        <NavSecondary items={data.navSecondary} className="mt-auto" />
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  )
}
