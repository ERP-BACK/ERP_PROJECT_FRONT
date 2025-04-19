"use client";

import { useState } from "react";
import {
  DollarSign,
  Download,
  Plus,
  Search,
  Users,
  UserCheck,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Badge } from "@/components/ui/badge";

// Datos de ejemplo para clientes
const clientes = [
  {
    id: 1,
    nombre: "Empresa ABC",
    contacto: "Juan Pérez",
    email: "juan@empresaabc.com",
    telefono: "+1 234 567 890",
    estado: "Activo",
    ultimaCompra: "2023-04-10",
    totalCompras: 15420.5,
  },
  {
    id: 2,
    nombre: "Corporación XYZ",
    contacto: "María López",
    email: "maria@corpxyz.com",
    telefono: "+1 987 654 321",
    estado: "Activo",
    ultimaCompra: "2023-04-05",
    totalCompras: 8750.75,
  },
  {
    id: 3,
    nombre: "Industrias Omega",
    contacto: "Carlos Rodríguez",
    email: "carlos@omega.com",
    telefono: "+1 555 123 456",
    estado: "Inactivo",
    ultimaCompra: "2023-02-20",
    totalCompras: 4320.25,
  },
  {
    id: 4,
    nombre: "Servicios Delta",
    contacto: "Ana Martínez",
    email: "ana@delta.com",
    telefono: "+1 333 444 555",
    estado: "Activo",
    ultimaCompra: "2023-04-12",
    totalCompras: 12680.0,
  },
  {
    id: 5,
    nombre: "Grupo Gamma",
    contacto: "Roberto Sánchez",
    email: "roberto@gamma.com",
    telefono: "+1 222 333 444",
    estado: "Activo",
    ultimaCompra: "2023-03-28",
    totalCompras: 6540.3,
  },
  {
    id: 6,
    nombre: "Soluciones Beta",
    contacto: "Laura González",
    email: "laura@beta.com",
    telefono: "+1 111 222 333",
    estado: "Inactivo",
    ultimaCompra: "2023-01-15",
    totalCompras: 2180.9,
  },
];

export default function ClientesPage() {
  const [searchTerm, setSearchTerm] = useState("");

  // Filtrar clientes basado en el término de búsqueda
  const clientesFiltrados = clientes.filter(
    (cliente) =>
      cliente.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.email.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Calcular estadísticas
  const totalClientes = clientes.length;
  const clientesActivos = clientes.filter((c) => c.estado === "Activo").length;
  const totalVentas = clientes.reduce(
    (sum, cliente) => sum + cliente.totalCompras,
    0
  );

  return (
    <div className="space-y-6 m-2">
      <Tabs defaultValue="estadisticas" className="w-full">
        <div className="flex justify-evenly items-center mb-4">
          <div className="w-full">
            <h2 className="text-3xl font-bold tracking-tight">
              Gestión de Clientes
            </h2>
            <p className="text-muted-foreground">Gestión de clientes</p>
          </div>
          <div className="flex items-center justify-center mb-4 w-full">
            <TabsList className="grid min-w-20 max-w-80 grid-cols-2 mb-6 justify-center">
              <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
              <TabsTrigger value="tabla">Tabla de ventas</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex items-center gap-2 w-full justify-end">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo cliente
            </Button>
          </div>
        </div>
        {/* Pestaña de Estadísticas */}
        <TabsContent value="estadisticas">
          <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3 mb-6">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Clientes
                </CardTitle>
                <Users className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{totalClientes}</div>
                <p className="text-xs text-muted-foreground">
                  +2 desde el último mes
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Clientes Activos
                </CardTitle>
                <UserCheck className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{clientesActivos}</div>
                <p className="text-xs text-muted-foreground">
                  {Math.round((clientesActivos / totalClientes) * 100)}% del
                  total
                </p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total Ventas
                </CardTitle>
                <DollarSign className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">
                  $
                  {totalVentas.toLocaleString("es-ES", {
                    minimumFractionDigits: 2,
                  })}
                </div>
                <p className="text-xs text-muted-foreground">
                  +5% desde el último trimestre
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Distribución de Ventas por Cliente</CardTitle>
                <CardDescription>
                  Top 5 clientes por volumen de ventas
                </CardDescription>
              </CardHeader>
              <CardContent className="pl-2">
                <BarChartDemo />
              </CardContent>
            </Card>

            <Card className="col-span-1">
              <CardHeader>
                <CardTitle>Actividad Reciente</CardTitle>
                <CardDescription>
                  Últimas interacciones con clientes
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {clientes
                    .sort(
                      (a, b) =>
                        new Date(b.ultimaCompra).getTime() -
                        new Date(a.ultimaCompra).getTime()
                    )
                    .slice(0, 5)
                    .map((cliente) => (
                      <div key={cliente.id} className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-primary/10 flex items-center justify-center mr-3">
                          <span className="font-semibold text-primary">
                            {cliente.nombre.substring(0, 2).toUpperCase()}
                          </span>
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">
                            {cliente.nombre}
                          </p>
                          <p className="text-xs text-muted-foreground">
                            Última compra:{" "}
                            {new Date(
                              cliente.ultimaCompra
                            ).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-sm font-medium">
                          $
                          {cliente.totalCompras.toLocaleString("es-ES", {
                            minimumFractionDigits: 2,
                          })}
                        </div>
                      </div>
                    ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Pestaña de Tabla */}
        <TabsContent value="tabla">
          <div className="flex items-center justify-between mb-4">
            <div className="flex items-center gap-2">
              <div className="relative w-64">
                <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Buscar clientes..."
                  className="pl-8"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                />
              </div>
            </div>
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" /> Exportar
            </Button>
          </div>

          <div className="rounded-md border">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>ID</TableHead>
                  <TableHead>Nombre</TableHead>
                  <TableHead>Contacto</TableHead>
                  <TableHead className="hidden md:table-cell">Email</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Teléfono
                  </TableHead>
                  <TableHead>Estado</TableHead>
                  <TableHead className="hidden md:table-cell">
                    Última Compra
                  </TableHead>
                  <TableHead className="text-right">Total Compras</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {clientesFiltrados.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-4">
                      No se encontraron clientes
                    </TableCell>
                  </TableRow>
                ) : (
                  clientesFiltrados.map((cliente) => (
                    <TableRow key={cliente.id}>
                      <TableCell className="font-medium">
                        {cliente.id}
                      </TableCell>
                      <TableCell>{cliente.nombre}</TableCell>
                      <TableCell>{cliente.contacto}</TableCell>
                      <TableCell className="hidden md:table-cell">
                        {cliente.email}
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {cliente.telefono}
                      </TableCell>
                      <TableCell>
                        <Badge
                          variant={
                            cliente.estado === "Activo"
                              ? "default"
                              : "secondary"
                          }
                        >
                          {cliente.estado}
                        </Badge>
                      </TableCell>
                      <TableCell className="hidden md:table-cell">
                        {new Date(cliente.ultimaCompra).toLocaleDateString()}
                      </TableCell>
                      <TableCell className="text-right">
                        $
                        {cliente.totalCompras.toLocaleString("es-ES", {
                          minimumFractionDigits: 2,
                        })}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                              <span className="sr-only">Abrir menú</span>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                className="h-4 w-4"
                              >
                                <circle cx="12" cy="12" r="1" />
                                <circle cx="12" cy="5" r="1" />
                                <circle cx="12" cy="19" r="1" />
                              </svg>
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end">
                            <DropdownMenuLabel>Acciones</DropdownMenuLabel>
                            <DropdownMenuItem>Ver detalles</DropdownMenuItem>
                            <DropdownMenuItem>Editar cliente</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem className="text-destructive">
                              Eliminar cliente
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Componente de gráfico de barras para la visualización
function BarChartDemo() {
  // Ordenar clientes por total de compras y tomar los 5 primeros
  const topClientes = [...clientes]
    .sort((a, b) => b.totalCompras - a.totalCompras)
    .slice(0, 5);

  // Encontrar el valor máximo para calcular porcentajes
  const maxValue = Math.max(...topClientes.map((c) => c.totalCompras));

  return (
    <div className="w-full space-y-4">
      {topClientes.map((cliente) => (
        <div key={cliente.id} className="space-y-1">
          <div className="flex items-center justify-between text-sm">
            <div
              className="font-medium truncate max-w-[180px]"
              title={cliente.nombre}
            >
              {cliente.nombre}
            </div>
            <div>
              $
              {cliente.totalCompras.toLocaleString("es-ES", {
                minimumFractionDigits: 2,
              })}
            </div>
          </div>
          <div className="h-2 w-full bg-muted rounded-full overflow-hidden">
            <div
              className="h-full bg-primary rounded-full"
              style={{ width: `${(cliente.totalCompras / maxValue) * 100}%` }}
            />
          </div>
        </div>
      ))}
    </div>
  );
}
