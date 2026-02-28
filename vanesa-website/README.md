# Vanesa - Mis Aficiones 🐴

Sitio web personal dedicado a compartir conocimiento sobre caballos, cultura ecuestre y otras pasiones.

## Características

- **Razas Equinas**: Catálogo interactivo de razas españolas y mundiales
- **Búsqueda y Filtros**: Sistema de búsqueda en tiempo real
- **Simulador Genético**: Herramienta educativa para entender la genética de capas (próximamente)
- **Cine y TV**: Catálogo de películas y series sobre caballos con enlaces a tráilers y plataformas de streaming
- **Modo Claro/Oscuro**: Tema adaptable con persistencia en localStorage
- **Diseño Responsive**: Optimizado para móvil, tablet y desktop

## Tecnologías

- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite 7
- **Estilos**: Tailwind CSS 4 + shadcn/ui
- **Routing**: React Router 7 (HashRouter para GitHub Pages)
- **Deploy**: GitHub Pages con GitHub Actions

## Instalación

```bash
# Clonar el repositorio
git clone <repository-url>
cd vanesa-website

# Instalar dependencias
npm install

# Ejecutar en desarrollo
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Despliegue a GitHub Pages (manual)
npm run deploy
```

## Estructura del Proyecto

```
src/
├── components/
│   ├── ui/              # Componentes shadcn/ui (Button, Card, Badge, Input)
│   ├── horses/          # Componentes específicos (HorseCard, HorseSearch)
│   ├── layout/          # Header, Footer, Navigation
│   └── shared/          # ThemeProvider, ThemeToggle
├── pages/               # Páginas de la aplicación
│   ├── Home.tsx
│   ├── HorsesPage.tsx
│   ├── SpanishBreedsPage.tsx
│   ├── WorldBreedsPage.tsx
│   ├── CinemaTVPage.tsx
│   └── GeneticSimulatorPage.tsx
├── data/                # Datos en JSON
│   ├── spanishBreeds.json
│   ├── worldBreeds.json
│   └── movies.json
├── types/               # Definiciones TypeScript
│   ├── horse.ts
│   ├── coat.ts
│   └── media.ts
└── lib/                 # Utilidades (cn)
```

## Razas Incluidas

### Razas Españolas
- Pura Raza Española (PRE)
- Hispano-Árabe
- Asturcón
- Menorquín

### Razas Mundiales
- Árabe
- Frisón
- Percherón
- Quarter Horse
- Appaloosa
- Lipizzano

## Películas Incluidas

- Seabiscuit (2003)
- Spirit: El corcel indomable (2002)
- Caballo de batalla (2011)
- Secretariat (2010)
- El corcel negro (1979)
- Hidalgo (2004)

## Despliegue

Este proyecto está configurado para desplegarse automáticamente en GitHub Pages:

1. Push a la rama `main`
2. GitHub Actions ejecuta el build
3. Se despliega automáticamente a GitHub Pages

**Configuración manual**:
1. En Settings > Pages
2. Seleccionar "GitHub Actions" como source
3. Guardar cambios

## Próximas Funcionalidades

- Simulador genético completo con cálculo de probabilidades
- Galería de capas y colores equinos
- Sección de Cultura (Psicología e Historia)
- Secciones de Baile, Música y Otros
- Más razas equinas
- Filtros avanzados por tipo de sangre y temperamento

## Licencia

© 2025 Vanesa. Todos los derechos reservados.
