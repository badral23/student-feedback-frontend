// components/layout/Sidebar.tsx
"use client";

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FaChartBar, FaList, FaSignOutAlt, FaUser } from "react-icons/fa";
import { HiOutlineOfficeBuilding } from "react-icons/hi";
import { BiCategory } from "react-icons/bi";

export default function Sidebar() {
  const { user, logout } = useAuth();
  const pathname = usePathname();

  const isActive = (path: string) => {
    return pathname === path;
  };

  const navItems = [
    { name: "Dashboard", href: "/dashboard", icon: FaChartBar, show: true },
    { name: "Feedback", href: "/feedback", icon: FaList, show: true },
    { name: "Profile", href: "/profile", icon: FaUser, show: true },
    {
      name: "Departments",
      href: "/admin/departments",
      icon: HiOutlineOfficeBuilding,
      show: user?.role === "admin",
    },
    {
      name: "Categories",
      href: "/admin/categories",
      icon: BiCategory,
      show: user?.role === "admin",
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: FaUser,
      show: user?.role === "admin",
    },
  ];

  return (
    <div className="h-full flex flex-col bg-gray-800 text-white w-64 fixed inset-y-0 left-0">
      <div className="flex items-center justify-center h-16 bg-gray-900">
        <h1 className="text-xl font-bold">Feedback System</h1>
      </div>

      <div className="p-4 border-b border-gray-700">
        <div className="flex items-center">
          <div className="ml-2">
            <p className="text-sm font-medium">{user?.username}</p>
            <p className="text-xs text-gray-400 capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {navItems
          .filter((item) => item.show)
          .map((item) => (
            <Link
              key={item.name}
              href={item.href}
              className={`${
                isActive(item.href)
                  ? "bg-gray-900 text-white"
                  : "text-gray-300 hover:bg-gray-700 hover:text-white"
              } group flex items-center px-2 py-2 text-sm font-medium rounded-md`}
            >
              <item.icon className="mr-3 h-5 w-5" />
              {item.name}
            </Link>
          ))}
      </nav>

      <div className="p-4 border-t border-gray-700">
        <button
          onClick={logout}
          className="flex items-center w-full px-2 py-2 text-sm font-medium text-gray-300 rounded-md hover:bg-gray-700 hover:text-white"
        >
          <FaSignOutAlt className="mr-3 h-5 w-5" />
          Logout
        </button>
      </div>
    </div>
  );
}
