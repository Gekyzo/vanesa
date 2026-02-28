import { Link } from "react-router-dom"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function Home() {
  return (
    <div className="space-y-12">
      <section className="text-center py-12">
        <h1 className="text-5xl font-bold mb-4">Bienvenido a Mis Aficiones</h1>
        <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
          Un espacio dedicado a compartir conocimiento sobre caballos, cultura ecuestre y otras pasiones
        </p>
      </section>

      <section className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Link to="/caballos/razas-espanolas">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="text-4xl mb-2">🐴</div>
              <CardTitle>Caballos</CardTitle>
              <CardDescription>
                Explora razas equinas españolas y mundiales
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Descubre la historia, características y usos de las diferentes razas de caballos
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/caballos/simulador">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="text-4xl mb-2">🧬</div>
              <CardTitle>Simulador Genético</CardTitle>
              <CardDescription>
                Calcula probabilidades de capas en crías
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Herramienta educativa para entender la genética de las capas equinas
              </p>
            </CardContent>
          </Card>
        </Link>

        <Link to="/caballos/cine-tv">
          <Card className="hover:shadow-lg transition-shadow cursor-pointer h-full">
            <CardHeader>
              <div className="text-4xl mb-2">🎬</div>
              <CardTitle>Cine y TV</CardTitle>
              <CardDescription>
                Películas y series sobre caballos
              </CardDescription>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground">
                Descubre contenido audiovisual relacionado con el mundo ecuestre
              </p>
            </CardContent>
          </Card>
        </Link>

        <Card className="opacity-60 h-full">
          <CardHeader>
            <div className="text-4xl mb-2">💃</div>
            <CardTitle>Baile</CardTitle>
            <CardDescription>Próximamente</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Sección en construcción
            </p>
          </CardContent>
        </Card>

        <Card className="opacity-60 h-full">
          <CardHeader>
            <div className="text-4xl mb-2">🎵</div>
            <CardTitle>Música</CardTitle>
            <CardDescription>Próximamente</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Sección en construcción
            </p>
          </CardContent>
        </Card>

        <Card className="opacity-60 h-full">
          <CardHeader>
            <div className="text-4xl mb-2">✨</div>
            <CardTitle>Otros</CardTitle>
            <CardDescription>Próximamente</CardDescription>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              Sección en construcción
            </p>
          </CardContent>
        </Card>
      </section>

      <section className="text-center py-12 bg-muted rounded-lg">
        <h2 className="text-3xl font-bold mb-4">Explora el Mundo Ecuestre</h2>
        <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
          Comienza tu viaje aprendiendo sobre las diferentes razas de caballos, su historia y características únicas
        </p>
        <Link to="/caballos/razas-espanolas">
          <Button size="lg">Ver Razas Españolas</Button>
        </Link>
      </section>
    </div>
  )
}
