import Link from "next/link";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChevronRight,
  BarChart3,
  Users,
  Settings,
  Database,
  Shield,
} from "lucide-react";
import { signIn } from "@/auth";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="px-4 lg:px-6 h-16 flex items-center justify-between border-b">
        <div className="flex items-center gap-2">
          <img
            src="/logo_out.png"
            alt="Dashboard ERP"
            className="rounded-lg object-cover"
            width={100}
            height={200}
          />
          <Database className="h-6 w-6" />
          <div className="flex justify-center"></div>
        </div>
        <form
          action={async () => {
            "use server";
            await signIn("keycloak");
          }}
        >
          <button type="submit">Iniciar Sesion</button>
        </form>
      </header>
      <main className="flex-1">
        <section className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-muted/50 to-muted">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Sistema ERP completo para su empresa
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Gestione todos los aspectos de su negocio con nuestra
                  plataforma integral de planificación de recursos
                  empresariales.
                </p>
                <div className="flex flex-col gap-2 sm:flex-row">
                  <form
                    action={async () => {
                      "use server";
                      await signIn("keycloak");
                    }}
                  >
                    <Button size="lg" className="gap-1" type="submit">
                      Iniciar Sesión
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </form>
                  <Link href="/contact">
                    <Button variant="outline" size="lg">
                      Solicitar Demo
                    </Button>
                  </Link>
                </div>
              </div>
              <div className="flex justify-center">
                <img
                  src="/presentation.png"
                  alt="Dashboard ERP"
                  className="rounded-lg object-cover shadow-lg"
                  width={500}
                  height={400}
                />
              </div>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  Características Principales
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Nuestro ERP ofrece todas las herramientas que necesita para
                  optimizar sus operaciones comerciales.
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 mt-8">
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <BarChart3 className="h-8 w-8" />
                  <CardTitle>Análisis Financiero</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Obtenga información detallada sobre el rendimiento
                    financiero de su empresa con informes personalizables.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Users className="h-8 w-8" />
                  <CardTitle>Gestión de RRHH</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Administre fácilmente la información de los empleados,
                    nóminas y procesos de contratación.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Database className="h-8 w-8" />
                  <CardTitle>Inventario</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Controle su inventario en tiempo real y optimice los niveles
                    de stock para reducir costos.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Settings className="h-8 w-8" />
                  <CardTitle>Operaciones</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Automatice y optimice los procesos operativos para aumentar
                    la eficiencia.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Shield className="h-8 w-8" />
                  <CardTitle>Seguridad</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Proteja sus datos empresariales con nuestras avanzadas
                    medidas de seguridad.
                  </CardDescription>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center gap-4">
                  <Users className="h-8 w-8" />
                  <CardTitle>CRM</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Gestione las relaciones con sus clientes y mejore la
                    satisfacción del cliente.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        <section className="w-full py-12 md:py-24 lg:py-32 bg-muted">
          <div className="container px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
                  ¿Listo para empezar?
                </h2>
                <p className="max-w-[600px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  Acceda a su cuenta o solicite una demostración para ver cómo
                  nuestro ERP puede transformar su negocio.
                </p>
              </div>
              <div className="flex flex-col gap-2 sm:flex-row">
                <form
                  action={async () => {
                    "use server";
                    await signIn("keycloak");
                  }}
                >
                  <Button size="lg" className="gap-1" type="submit">
                    Iniciar Sesión
                    <ChevronRight className="h-4 w-4" />
                  </Button>
                </form>
                <Link href="/contacto">
                  <Button variant="outline" size="lg">
                    Solicitar Demo
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <footer className="flex flex-col gap-2 sm:flex-row py-6 w-full border-t px-4 md:px-6">
        <p className="text-xs text-muted-foreground">
          © 2025 ERP System. Todos los derechos reservados.
        </p>
        <nav className="sm:ml-auto flex gap-4 sm:gap-6">
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Términos de Servicio
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Política de Privacidad
          </Link>
          <Link className="text-xs hover:underline underline-offset-4" href="#">
            Contacto
          </Link>
        </nav>
      </footer>
    </div>
  );
}
