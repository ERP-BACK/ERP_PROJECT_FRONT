"use client"

import { Bell, LogOut, Menu, Search } from "lucide-react"
import { signOut } from "next-auth/react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

interface HeaderProps {
  onMenuClick: () => void
}

export function DashboardHeader({ onMenuClick }: HeaderProps) {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-4 border-b bg-white px-6">
      <Button variant="ghost" size="icon" className="lg:hidden" onClick={onMenuClick}>
        <Menu className="h-6 w-6" />
        <span className="sr-only">Toggle menu</span>
      </Button>
      <div className="w-full flex-1">
        <form>
          <div className="relative">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
            <Input type="search" placeholder="Buscar..." className="w-full bg-white pl-8 md:w-2/3 lg:w-1/3" />
          </div>
        </form>
      </div>
      <Button variant="ghost" size="icon">
        <Bell className="h-5 w-5" />
        <span className="sr-only">Notificaciones</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => signOut({ redirectTo: "/" })}
        title="Cerrar Sesión"
      >
        <LogOut className="h-5 w-5" />
        <span className="sr-only">Cerrar Sesión</span>
      </Button>
    </header>
  )
}
