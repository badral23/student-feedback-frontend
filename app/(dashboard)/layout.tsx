import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/layout/AppSideBar";
import { SiteHeader } from "@/components/layout/SiteHeader";
import { SessionProvider } from "next-auth/react";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <SidebarProvider>
        <AppSidebar variant="inset" />
        <SidebarInset>
          <SiteHeader />
          <main className="p-4">{children}</main>
        </SidebarInset>
      </SidebarProvider>
    </SessionProvider>
  );
}
