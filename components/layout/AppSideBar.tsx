"use client";

import * as React from "react";
import { HelpCircleIcon, SearchIcon, SettingsIcon } from "lucide-react";
import { NavMain } from "@/components/layout/NavMain";
import { NavUser } from "@/components/layout/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";
import { NavSecondary } from "./NavSecondary";
import {
  IconDashboard,
  IconListDetails,
  IconUsers,
  IconSchool,
} from "@tabler/icons-react";

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
  const { data: session } = useSession();
  const dataSession: any = session?.user;

  const user = {
    username: dataSession?.name ?? "",
    email: dataSession?.email ?? "",
    role: dataSession?.role ?? "",
  };

  const data = {
    user: {
      name: `${user?.username ?? ""}`,
      email: `${user?.email ?? ""}`,
    },
    navMain: [
      {
        title: "Нүүр хуудас",
        url: "/",
        icon: IconDashboard,
        show: true,
      },
      {
        title: "Санал хүсэлт",
        url: "/feedback",
        icon: IconListDetails,
        show: true,
      },

      {
        title: "Хэрэглэгчид",
        url: "/users",
        icon: IconUsers,
        show: user?.role === "admin",
      },
    ],

    navSecondary: [
      {
        title: "Settings",
        url: "/settings",
        icon: SettingsIcon,
      },
      {
        title: "Get Help",
        url: "#",
        icon: HelpCircleIcon,
      },
      {
        title: "Search",
        url: "/",
        icon: SearchIcon,
      },
    ],
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <div className="flex items-center gap-2">
              <IconSchool width={24} height={24} strokeWidth={2} />
              <span className="text-base font-semibold">
                Оюутны санал хүсэлт
              </span>
            </div>
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
  );
}
