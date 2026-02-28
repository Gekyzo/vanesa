import type { Horse } from "@/types/horse"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"

interface HorseCardProps {
  horse: Horse
}

export function HorseCard({ horse }: HorseCardProps) {
  const bloodTypeColors: Record<string, string> = {
    'fría': 'bg-blue-500',
    'caliente': 'bg-red-500',
    'templada': 'bg-yellow-500'
  }

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow">
      <div className="aspect-video w-full overflow-hidden">
        <img
          src={horse.image}
          alt={horse.name}
          className="w-full h-full object-cover"
        />
      </div>
      <CardHeader>
        <CardTitle className="text-xl">{horse.name}</CardTitle>
        <CardDescription className="flex items-center gap-2">
          <span>{horse.country}</span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-2 mb-4">
          <Badge className={bloodTypeColors[horse.bloodType] || 'bg-gray-500'}>
            {horse.bloodType}
          </Badge>
          <Badge variant="outline">{horse.temperament}</Badge>
          <Badge variant="secondary">{horse.height}cm</Badge>
        </div>
        <p className="text-sm text-muted-foreground line-clamp-3">
          {horse.history}
        </p>
      </CardContent>
      <CardFooter>
        <div className="text-sm text-muted-foreground">
          <strong>Usos:</strong> {horse.uses.join(", ")}
        </div>
      </CardFooter>
    </Card>
  )
}
