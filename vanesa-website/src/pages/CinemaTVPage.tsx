import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ExternalLink, Play } from "lucide-react"
import moviesData from "@/data/movies.json"

export default function CinemaTVPage() {
  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Cine y TV</h1>
        <p className="text-muted-foreground">
          Descubre películas, series y documentales sobre caballos
        </p>
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {moviesData.movies.map(movie => (
          <Card key={movie.id} className="overflow-hidden flex flex-col">
            <div className="aspect-[2/3] w-full overflow-hidden">
              <img
                src={movie.poster}
                alt={movie.title}
                className="w-full h-full object-cover"
              />
            </div>
            <CardHeader>
              <CardTitle>{movie.title}</CardTitle>
              <CardDescription>
                {movie.director} • {movie.year}
              </CardDescription>
            </CardHeader>
            <CardContent className="flex-1">
              <div className="flex flex-wrap gap-2 mb-4">
                {movie.genre.map(g => (
                  <Badge key={g} variant="secondary">{g}</Badge>
                ))}
              </div>
              <p className="text-sm text-muted-foreground line-clamp-3">
                {movie.synopsis}
              </p>
            </CardContent>
            <CardFooter className="flex gap-2">
              {movie.trailerUrl && (
                <Button variant="outline" size="sm" asChild className="flex-1">
                  <a href={movie.trailerUrl} target="_blank" rel="noopener noreferrer">
                    <Play className="h-4 w-4 mr-2" />
                    Tráiler
                  </a>
                </Button>
              )}
              {movie.streamingLinks[0] && (
                <Button variant="default" size="sm" asChild className="flex-1">
                  <a href={movie.streamingLinks[0].url} target="_blank" rel="noopener noreferrer">
                    <ExternalLink className="h-4 w-4 mr-2" />
                    Ver
                  </a>
                </Button>
              )}
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  )
}
