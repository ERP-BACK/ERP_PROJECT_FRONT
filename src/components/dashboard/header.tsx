"use client"

import { Bell, LogOut, Menu, PanelLeftClose, PanelLeftOpen, Search } from "lucide-react"
import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  onMenuClick: () => void
  onCollapseToggle: () => void
  collapsed: boolean
}

export function DashboardHeader({ onMenuClick, onCollapseToggle, collapsed }: HeaderProps) {
  return (
    <header className="z-30 flex h-14 shrink-0 items-center gap-4 border-b border-border bg-card/80 px-6">
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

      <div className="flex-1">
        <div className="relative max-w-sm">
          <Search className="absolute left-2.5 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Buscar..."
            className="h-9 bg-muted/50 pl-8 text-sm border-transparent focus:border-border focus:bg-card"
          />
        </div>
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
