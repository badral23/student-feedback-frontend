"use client";

import * as React from "react";
import {
  ArrowUpCircleIcon,
  ChartBarStacked,
  Flame,
  LayoutDashboardIcon,
  MessageSquareText,
  UserRoundPen,
  UsersRound,
} from "lucide-react";
import { NavMain } from "@/components/layout/NavMain";
import { NavUser } from "@/components/layout/NavUser";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

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
        icon: LayoutDashboardIcon,
        show: true,
      },
      // {
      //   title: "Feedback",
      //   url: "/feedback",
      //   icon: MessageSquareText,
      //   show: true,
      // },
      // { title: "Profile", url: "/profile", icon: UserRoundPen, show: true },
      {
        title: "Departments",
        url: "/admin/departments",
        icon: Flame,
        show: user?.role === "admin",
      },
      {
        title: "Users",
        url: "/admin/users",
        icon: UsersRound,
        show: user?.role === "admin",
      },
    ],

    // navSecondary: [
    //   {
    //     title: "Settings",
    //     url: "#",
    //     icon: SettingsIcon,
    //   },
    //   {
    //     title: "Get Help",
    //     url: "#",
    //     icon: HelpCircleIcon,
    //   },
    //   {
    //     title: "Search",
    //     url: "#",
    //     icon: SearchIcon,
    //   },
    // ],
    // documents: [
    //   {
    //     name: "Data Library",
    //     url: "#",
    //     icon: DatabaseIcon,
    //   },
    //   {
    //     name: "Reports",
    //     url: "#",
    //     icon: ClipboardListIcon,
    //   },
    //   {
    //     name: "Word Assistant",
    //     url: "#",
    //     icon: FileIcon,
    //   },
    // ],
  };
  return (
    <Sidebar collapsible="offcanvas" {...props}>
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton
              asChild
              className="data-[slot=sidebar-menu-button]:!p-1.5"
            >
              <a href="#">
                <ArrowUpCircleIcon className="h-5 w-5" />
                <span className="text-base font-semibold">
                  Оюутны санал хүсэлт
                </span>
              </a>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <NavMain items={data.navMain} />
        {/* <NavDocuments items={data.documents} />
        <NavSecondary items={data.navSecondary} className="mt-auto" /> */}
      </SidebarContent>
      <SidebarFooter>
        <NavUser user={data.user} />
      </SidebarFooter>
    </Sidebar>
  );
}
