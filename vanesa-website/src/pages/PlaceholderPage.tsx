import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

interface PlaceholderPageProps {
  title: string
  description: string
  icon: string
}

export default function PlaceholderPage({ title, description, icon }: PlaceholderPageProps) {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold flex items-center gap-3">
          <span className="text-5xl">{icon}</span>
          {title}
        </h1>
        <p className="text-muted-foreground">{description}</p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>En construcción</CardTitle>
          <CardDescription>Esta sección estará disponible próximamente</CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Estamos trabajando en traer contenido interesante a esta sección. ¡Vuelve pronto!
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
