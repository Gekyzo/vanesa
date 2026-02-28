import { Search } from "lucide-react"
import { Input } from "@/components/ui/input"

interface HorseSearchProps {
  searchTerm: string
  onSearchChange: (value: string) => void
}

export function HorseSearch({ searchTerm, onSearchChange }: HorseSearchProps) {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Buscar razas..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="pl-10"
      />
    </div>
  )
}
