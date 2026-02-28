import { Link } from "react-router-dom"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function HorsesPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Caballos</h1>
        <p className="text-muted-foreground">
          Explora el fascinante mundo ecuestre a través de razas, genética y cultura
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/caballos/razas-espanolas">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle>Razas Españolas</CardTitle>
              <CardDescription>Caballos autóctonos de España</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Descubre razas con siglos de historia como el PRE, Hispano-Árabe, Asturcón y más
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/caballos/razas-mundiales">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle>Razas Mundiales</CardTitle>
              <CardDescription>Caballos de todo el mundo</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Explora razas internacionales como el Árabe, Frisón, Quarter Horse y Appaloosa
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/caballos/simulador">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle>Simulador Genético</CardTitle>
              <CardDescription>Genética de capas equinas</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Calcula las probabilidades de capas en crías utilizando genética básica
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/caballos/cine-tv">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <CardTitle>Cine y TV</CardTitle>
              <CardDescription>Contenido audiovisual</CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Películas, series y documentales sobre el mundo ecuestre
              </p>
            </CardContent>
          </Card>
        </Link>

        <Card className="opacity-60 h-full">
          <CardHeader>
            <CardTitle>Cultura Ecuestre</CardTitle>
            <CardDescription>Próximamente</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Psicología, historia y mitología ecuestre
            </p>
          </CardContent>
        </Card>

        <Card className="opacity-60 h-full">
          <CardHeader>
            <CardTitle>Capas y Colores</CardTitle>
            <CardDescription>Próximamente</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Galería visual de las diferentes capas equinas
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
