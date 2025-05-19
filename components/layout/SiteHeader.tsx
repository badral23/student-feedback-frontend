"use client";

import { Separator } from "@/components/ui/separator";
import { SidebarTrigger } from "@/components/ui/sidebar";
import { useSession } from "next-auth/react";

export function SiteHeader() {
  const { data: session } = useSession();

  const dataSession: any = session?.user;

  const user = {
    email: dataSession?.email ?? "",
    role: dataSession?.role ?? "",
  };

  return (
    <header className="group-has-data-[collapsible=icon]/sidebar-wrapper:h-12 flex h-12 shrink-0 items-center gap-2 border-b transition-[width,height] ease-linear">
      <div className="flex w-full items-center gap-1 px-4 lg:gap-2 lg:px-6">
        <SidebarTrigger className="-ml-1" />
        <Separator
          orientation="vertical"
          className="mx-2 data-[orientation=vertical]:h-4"
        />
        <h1 className="text-base font-medium">
          {user?.role.slice(0, 1).toUpperCase()}
          {user?.role.slice(1)} Dashboard
        </h1>
      </div>
    </header>
  );
}
