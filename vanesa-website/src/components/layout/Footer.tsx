export function Footer() {
  return (
    <footer className="border-t">
      <div className="container py-8 md:py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-bold text-lg mb-4">Mis Aficiones</h3>
            <p className="text-sm text-muted-foreground">
              Un espacio personal dedicado a compartir conocimiento sobre caballos, cultura ecuestre y otras pasiones.
            </p>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Secciones</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Razas Españolas</li>
              <li>Razas Mundiales</li>
              <li>Simulador Genético</li>
              <li>Cine y TV</li>
            </ul>
          </div>

          <div>
            <h3 className="font-bold text-lg mb-4">Enlaces</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li>Inicio</li>
              <li>Caballos</li>
              <li>Cultura</li>
            </ul>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>© 2025 Vanesa. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  )
}
