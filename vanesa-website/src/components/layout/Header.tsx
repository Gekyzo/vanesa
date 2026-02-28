import { Link } from "react-router-dom"
import { ThemeToggle } from "@/components/shared/ThemeToggle"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl">🐴</span>
          <span className="font-bold text-xl">Mis Aficiones</span>
        </Link>

        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          <Link to="/caballos">
            <Button variant="ghost">Caballos</Button>
          </Link>
          <Link to="/baile">
            <Button variant="ghost">Baile</Button>
          </Link>
          <Link to="/musica">
            <Button variant="ghost">Música</Button>
          </Link>
          <Link to="/otros">
            <Button variant="ghost">Otros</Button>
          </Link>
        </nav>

        <ThemeToggle />
      </div>
    </header>
  )
}
