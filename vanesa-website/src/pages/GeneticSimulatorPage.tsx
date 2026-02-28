import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"

export default function GeneticSimulatorPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Simulador Genético de Capas</h1>
        <p className="text-muted-foreground">
          Herramienta educativa para calcular probabilidades de capas en crías equinas
        </p>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Próximamente</CardTitle>
          <CardDescription>
            El simulador genético está en desarrollo
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p className="text-muted-foreground">
            Esta herramienta permitirá calcular las probabilidades de diferentes capas en las crías
            basándose en la genética de los padres. Incluirá:
          </p>
          <ul className="list-disc list-inside mt-4 space-y-2 text-muted-foreground">
            <li>Selección de genotipos parentales (Extension, Agouti, Cream, Gray)</li>
            <li>Cálculo automático de probabilidades mediante cuadro de Punnett</li>
            <li>Visualización gráfica de resultados</li>
            <li>Explicaciones educativas sobre genética equina</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}
