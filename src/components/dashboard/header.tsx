"use client"

import { Bell, LogOut, Menu, PanelLeftClose, PanelLeftOpen } from "lucide-react"
import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"

interface HeaderProps {
  onMenuClick: () => void
  onCollapseToggle: () => void
  collapsed: boolean
}

export function DashboardHeader({ onMenuClick, onCollapseToggle, collapsed }: HeaderProps) {
  return (
    <header className="z-30 flex h-14 shrink-0 items-center justify-between border-b border-border bg-card/80 px-6">
      <div className="flex items-center gap-2">
        {/* Mobile menu toggle */}
        <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
          <Menu className="h-5 w-5" />
          <span className="sr-only">Toggle menu</span>
        </Button>

        {/* Desktop collapse toggle */}
        <Button
          variant="ghost"
          size="icon"
          className="hidden lg:inline-flex h-9 w-9 text-muted-foreground hover:text-foreground"
          onClick={onCollapseToggle}
        >
          {collapsed ? (
            <PanelLeftOpen className="h-4 w-4" />
          ) : (
            <PanelLeftClose className="h-4 w-4" />
          )}
          <span className="sr-only">Toggle sidebar</span>
        </Button>
      </div>

      <div className="flex items-center gap-1">
        <Button variant="ghost" size="icon" className="h-9 w-9 text-muted-foreground hover:text-foreground">
          <Bell className="h-4 w-4" />
          <span className="sr-only">Notificaciones</span>
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="h-9 w-9 text-muted-foreground hover:text-foreground"
          onClick={() => signOut({ redirectTo: "/" })}
          title="Cerrar Sesión"
        >
          <LogOut className="h-4 w-4" />
          <span className="sr-only">Cerrar Sesión</span>
        </Button>
      </div>
    </header>
  )
}
