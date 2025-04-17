"use client";

import type React from "react";

import { useState } from "react";
import { usePathname } from "next/navigation";

import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import Providers from "../providres";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-gray-100">
      <DashboardSidebar open={sidebarOpen} pathname={pathname} />
      <div className="flex flex-col flex-1">
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        <Providers>{children}</Providers>
      </div>
    </div>
  );
}
