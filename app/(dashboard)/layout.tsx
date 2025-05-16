"use client";

import { useAuth } from "@/contexts/AuthContext";
import { Toaster } from "react-hot-toast";
import Sidebar from "@/components/layout/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user } = useAuth();

  if (!user) {
    return null;
  }

  return (
    <div className="flex h-screen bg-gray-100">
      <Sidebar />

      <div className="flex-1 ml-64 overflow-auto">
        <main className="p-6">{children}</main>
      </div>

      <Toaster position="top-right" />
    </div>
  );
}
