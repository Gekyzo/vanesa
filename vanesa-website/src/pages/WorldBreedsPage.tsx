import { useState } from "react"
import { HorseCard } from "@/components/horses/HorseCard"
import { HorseSearch } from "@/components/horses/HorseSearch"
import worldBreedsData from "@/data/worldBreeds.json"

export default function WorldBreedsPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const filteredBreeds = worldBreedsData.breeds.filter(horse =>
    horse.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    horse.country.toLowerCase().includes(searchTerm.toLowerCase())
  )

  return (
    <div className="space-y-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold">Razas Mundiales</h1>
        <p className="text-muted-foreground">
          Explora razas equinas de todo el mundo, cada una con características únicas
        </p>
      </div>

      <div className="max-w-md">
        <HorseSearch searchTerm={searchTerm} onSearchChange={setSearchTerm} />
      </div>

      <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBreeds.map(horse => (
          <HorseCard key={horse.id} horse={horse} />
        ))}
      </div>

      {filteredBreeds.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">
            No se encontraron razas que coincidan con tu búsqueda
          </p>
        </div>
      )}
    </div>
  )
}
