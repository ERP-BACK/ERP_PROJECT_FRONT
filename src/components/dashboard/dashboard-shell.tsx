"use client";

import type React from "react";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { DashboardHeader } from "@/components/dashboard/header";
import { DashboardSidebar } from "@/components/dashboard/sidebar";
import { FlotingChat } from "@/app/chatbot/ui/FlotingChat";

interface DashboardShellProps {
  children: React.ReactNode;
  roles?: string[];
  userName?: string;
  userEmail?: string;
}

export function DashboardShell({ children, roles, userName, userEmail }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const pathname = usePathname();

  return (
    <div className="flex min-h-screen bg-background">
      <DashboardSidebar
        open={sidebarOpen}
        pathname={pathname}
        roles={roles}
        userName={userName}
        userEmail={userEmail}
      />
      <div className="flex flex-col flex-1">
        <FlotingChat />
        <DashboardHeader onMenuClick={() => setSidebarOpen(!sidebarOpen)} />
        {children}
      </div>
    </div>
  );
}
