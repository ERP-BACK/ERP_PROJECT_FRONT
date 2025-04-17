"use client";

import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { Download, Filter, Package, Plus, RefreshCcw } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

// Datos de ejemplo para el inventario
const inventoryData = [
  {
    id: 1,
    name: "Laptop HP Pavilion",
    category: "Electrónicos",
    stock: 45,
    price: 899.99,
    status: "En stock",
  },
  {
    id: 2,
    name: 'Monitor Dell 27"',
    category: "Electrónicos",
    stock: 30,
    price: 349.99,
    status: "En stock",
  },
  {
    id: 3,
    name: "Teclado Mecánico",
    category: "Accesorios",
    stock: 100,
    price: 79.99,
    status: "En stock",
  },
  {
    id: 4,
    name: "Mouse Inalámbrico",
    category: "Accesorios",
    stock: 75,
    price: 29.99,
    status: "En stock",
  },
  {
    id: 5,
    name: "Impresora HP LaserJet",
    category: "Electrónicos",
    stock: 15,
    price: 299.99,
    status: "Bajo stock",
  },
  {
    id: 6,
    name: "Auriculares Bluetooth",
    category: "Audio",
    stock: 60,
    price: 129.99,
    status: "En stock",
  },
  {
    id: 7,
    name: "Tablet Samsung",
    category: "Electrónicos",
    stock: 5,
    price: 449.99,
    status: "Crítico",
  },
  {
    id: 8,
    name: "Cámara Web HD",
    category: "Accesorios",
    stock: 0,
    price: 89.99,
    status: "Sin stock",
  },
];

// Datos para el gráfico de barras
const stockByCategory = [
  { name: "Electrónicos", stock: 95 },
  { name: "Accesorios", stock: 175 },
  { name: "Audio", stock: 60 },
  { name: "Cables", stock: 120 },
  { name: "Almacenamiento", stock: 80 },
];

// Datos para el gráfico circular
const stockStatus = [
  { name: "En stock", value: 310 },
  { name: "Bajo stock", value: 15 },
  { name: "Crítico", value: 5 },
  { name: "Sin stock", value: 0 },
];

const COLORS = ["#4ade80", "#facc15", "#f97316", "#ef4444"];

export default function InventoryPage() {
  const [searchTerm, setSearchTerm] = useState("");

  const filteredInventory = inventoryData.filter(
    (item) =>
      item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.category.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-6 m-2">
      <Tabs defaultValue="estadisticas" className="w-full">
        <div className="flex justify-evenly items-center mb-4">
          <div className="w-full">
            <h2 className="text-3xl font-bold tracking-tight">Inventario</h2>
            <p className="text-muted-foreground">
              Gestión de productos, stock y categorías
            </p>
          </div>
          <div className="flex items-center justify-center mb-4 w-full">
            <TabsList className="grid min-w-20 max-w-80 grid-cols-2 mb-6 justify-center">
              <TabsTrigger value="estadisticas">Estadísticas</TabsTrigger>
              <TabsTrigger value="tabla">Tabla de Clientes</TabsTrigger>
            </TabsList>
          </div>
          <div className="flex items-center gap-2 w-full justify-end">
            <Button variant="outline" size="sm">
              <Download className="mr-2 h-4 w-4" />
              Exportar
            </Button>
            <Button size="sm">
              <Plus className="mr-2 h-4 w-4" />
              Nuevo Producto
            </Button>
          </div>
        </div>

        <TabsContent value="estadisticas">
          <div className="grid gap-6 md:grid-cols-3 mb-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Total de Productos
                </CardTitle>
                <Package className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">573</div>
                <p className="text-xs text-muted-foreground">
                  8 categorías diferentes
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Valor del Inventario
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">$125,430.89</div>
                <p className="text-xs text-muted-foreground">
                  +2.5% desde el mes pasado
                </p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  Productos sin Stock
                </CardTitle>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  className="h-4 w-4 text-muted-foreground"
                >
                  <rect width="20" height="14" x="2" y="5" rx="2" />
                  <path d="M2 10h20" />
                </svg>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">12</div>
                <p className="text-xs text-muted-foreground">
                  5 productos en estado crítico
                </p>
              </CardContent>
            </Card>
          </div>

          <div className="grid gap-6 md:grid-cols-2 ">
            <Card>
              <CardHeader>
                <CardTitle>Stock por Categoría</CardTitle>
                <CardDescription>
                  Distribución de productos por categoría
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                      data={stockByCategory}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="name" />
                      <YAxis />
                      <Tooltip />
                      <Bar dataKey="stock" fill="#3b82f6" />
                    </BarChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
            <Card>
              <CardHeader>
                <CardTitle>Estado del Inventario</CardTitle>
                <CardDescription>
                  Distribución por estado de stock
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="h-[300px]">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={stockStatus}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        {stockStatus.map((entry, index) => (
                          <Cell
                            key={`cell-${index}`}
                            fill={COLORS[index % COLORS.length]}
                          />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
        <TabsContent value="tabla">
          <Card>
            <CardHeader>
              <CardTitle>Lista de Productos</CardTitle>
              <CardDescription>
                Gestione su inventario de productos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex w-full max-w-sm items-center space-x-2">
                  <Input
                    placeholder="Buscar productos..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                  <Button type="submit" size="sm" variant="ghost">
                    <RefreshCcw className="h-4 w-4" />
                    <span className="sr-only">Buscar</span>
                  </Button>
                </div>
                <div className="flex items-center space-x-2">
                  <Select defaultValue="all">
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Categoría" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">Todas las categorías</SelectItem>
                      <SelectItem value="electronics">Electrónicos</SelectItem>
                      <SelectItem value="accessories">Accesorios</SelectItem>
                      <SelectItem value="audio">Audio</SelectItem>
                    </SelectContent>
                  </Select>
                  <Button variant="outline" size="sm">
                    <Filter className="mr-2 h-4 w-4" />
                    Filtros
                  </Button>
                </div>
              </div>
              <div className="mt-6 rounded-md border">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Nombre</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Precio</TableHead>
                      <TableHead>Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredInventory.map((item) => (
                      <TableRow key={item.id}>
                        <TableCell>{item.id}</TableCell>
                        <TableCell className="font-medium">
                          {item.name}
                        </TableCell>
                        <TableCell>{item.category}</TableCell>
                        <TableCell>{item.stock}</TableCell>
                        <TableCell>${item.price.toFixed(2)}</TableCell>
                        <TableCell>
                          <Badge
                            variant={
                              item.status === "En stock"
                                ? "success"
                                : item.status === "Bajo stock"
                                ? "warning"
                                : item.status === "Crítico"
                                ? "destructive"
                                : "outline"
                            }
                          >
                            {item.status}
                          </Badge>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}
