# 🛠️ Requisitos Técnicos

## 📚 Stack Tecnológico

### Framework y Build Tools

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **React** | 18+ | Framework principal para UI |
| **Vite** | 5+ | Build tool y dev server de alto rendimiento |
| **TypeScript** | 5+ | Tipado estático y mejor DX |
| **React Router** | 6+ | Navegación y routing SPA |

### Estilos y UI

| Tecnología | Versión | Propósito |
|------------|---------|-----------|
| **Tailwind CSS** | 3+ | Framework de utilidades CSS |
| **shadcn/ui** | Latest | Biblioteca de componentes UI |
| **Radix UI** | Latest | Primitivos accesibles (base de shadcn) |
| **clsx** / **tailwind-merge** | Latest | Gestión de clases CSS |

### Herramientas Adicionales

| Tecnología | Propósito |
|------------|-----------|
| **ESLint** | Linting de código |
| **Prettier** | Formateo de código |
| **Husky** | Git hooks (opcional) |
| **gh-pages** | Despliegue a GitHub Pages |

---

## 🎨 Configuración de shadcn/ui

### Componentes Requeridos

Mapeo de funcionalidades a componentes específicos de shadcn/ui:

#### Sistema de Fichas y Navegación

| Componente | Uso en el Proyecto |
|------------|-------------------|
| `Card` | Fichas de razas equinas |
| `Tabs` | Navegación entre subsecciones (Razas Españolas, Mundiales, etc.) |
| `Badge` | Etiquetas de tipo de sangre, país, categorías |
| `NavigationMenu` | Menú principal de la aplicación |
| `Breadcrumb` | Navegación de rutas |

#### Búsqueda y Filtrado

| Componente | Uso en el Proyecto |
|------------|-------------------|
| `Input` | Campos de búsqueda de texto |
| `Command` | Búsqueda global (⌘K) |
| `Select` | Selección de opciones de ordenación |
| `DropdownMenu` | Menús de filtros |
| `Checkbox` | Filtros multi-selección |
| `Popover` | Paneles de filtros avanzados |

#### Visualización de Datos

| Componente | Uso en el Proyecto |
|------------|-------------------|
| `Table` | Resultados del simulador genético |
| `Carousel` | Galerías de imágenes de capas |
| `Accordion` | Explicaciones expandibles |
| `Dialog` | Detalles expandidos de fichas |
| `Sheet` | Panel lateral de filtros (móvil) |

#### Simulador Genético

| Componente | Uso en el Proyecto |
|------------|-------------------|
| `Slider` | Selección de alelos y genes |
| `RadioGroup` | Opciones de genotipos |
| `Label` | Etiquetas de formularios |
| `Separator` | Divisores visuales |

#### Acciones e Interacciones

| Componente | Uso en el Proyecto |
|------------|-------------------|
| `Button` | Acciones primarias y secundarias |
| `Toggle` | Switch de tema claro/oscuro |
| `Tooltip` | Ayuda contextual |
| `Alert` | Mensajes informativos |

### Instalación de shadcn/ui

```bash
# Inicializar shadcn/ui en el proyecto
npx shadcn-ui@latest init

# Configuración recomendada
# - TypeScript: Yes
# - Style: Default
# - Base color: Slate (o personalizado)
# - CSS variables: Yes
```

### Componentes a Instalar

```bash
# Navegación y layout
npx shadcn-ui@latest add navigation-menu
npx shadcn-ui@latest add breadcrumb
npx shadcn-ui@latest add tabs

# Fichas y contenido
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add carousel

# Búsqueda y filtros
npx shadcn-ui@latest add input
npx shadcn-ui@latest add command
npx shadcn-ui@latest add select
npx shadcn-ui@latest add dropdown-menu
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add popover

# Modales y overlays
npx shadcn-ui@latest add dialog
npx shadcn-ui@latest add sheet

# Formularios (simulador)
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add label

# Visualización de datos
npx shadcn-ui@latest add table
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add separator

# Utilidades
npx shadcn-ui@latest add button
npx shadcn-ui@latest add tooltip
npx shadcn-ui@latest add alert
npx shadcn-ui@latest add toggle
```

---

## 🎨 Diseño y Estilo

### Sistema de Temas

**Configuración de Tema**:
- Tema claro y oscuro mediante `ThemeProvider`
- Variables CSS personalizables
- Persistencia en `localStorage`

**Paleta de Colores Sugerida**:

```typescript
// tailwind.config.js - Variables CSS
{
  "colors": {
    "primary": "hsl(var(--primary))",      // Color principal (ej: marrón/tierra)
    "secondary": "hsl(var(--secondary))",  // Color secundario
    "accent": "hsl(var(--accent))",        // Color de acento
    "muted": "hsl(var(--muted))",          // Fondos suaves
    "destructive": "hsl(var(--destructive))" // Alertas/errores
  }
}
```

**Personalización Recomendada**:
- Colores tierra/naturales para tema ecuestre
- Contraste adecuado (WCAG AA mínimo)
- Consistencia entre modo claro y oscuro

### Tipografía

**Fuentes Recomendadas**:

| Uso | Fuente | Fallback |
|-----|--------|----------|
| **Encabezados** | Inter, Poppins | sans-serif |
| **Cuerpo** | Inter, System UI | sans-serif |
| **Monospace** | Fira Code, Consolas | monospace |

**Escala Tipográfica** (Tailwind):
- `text-xs`: 0.75rem (12px)
- `text-sm`: 0.875rem (14px)
- `text-base`: 1rem (16px)
- `text-lg`: 1.125rem (18px)
- `text-xl`: 1.25rem (20px)
- `text-2xl`: 1.5rem (24px)
- `text-3xl`: 1.875rem (30px)
- `text-4xl`: 2.25rem (36px)

### Espaciado y Layout

**Sistema de Grid**:
- 12 columnas para desktop
- 6 columnas para tablet
- 4 columnas para móvil

**Breakpoints** (Tailwind):
```typescript
{
  'sm': '640px',   // Móvil horizontal
  'md': '768px',   // Tablet
  'lg': '1024px',  // Laptop
  'xl': '1280px',  // Desktop
  '2xl': '1536px'  // Large desktop
}
```

**Espaciado Consistente**:
- Usar escala de Tailwind: 2, 4, 6, 8, 12, 16, 24, 32, 48, 64
- Padding de contenedores: `px-4 md:px-6 lg:px-8`
- Gap en grids: `gap-4 md:gap-6 lg:gap-8`

### Animaciones y Transiciones

```typescript
// Transiciones sutiles
{
  "transition": "all 0.2s ease-in-out",
  "hover:scale": "1.02",
  "hover:shadow": "lg"
}
```

---

## 📁 Estructura del Proyecto

```
📁 vanesa/
├── 📁 .github/
│   └── 📁 workflows/
│       └── deploy.yml         # GitHub Actions para CI/CD
│
├── 📁 public/
│   ├── favicon.ico
│   └── 📁 images/
│       ├── 📁 horses/         # Imágenes de razas
│       ├── 📁 coats/          # Imágenes de capas
│       └── 📁 movies/         # Pósters de películas
│
├── 📁 src/
│   ├── 📁 components/
│   │   ├── 📁 ui/             # Componentes shadcn
│   │   │   ├── button.tsx
│   │   │   ├── card.tsx
│   │   │   ├── input.tsx
│   │   │   └── ...
│   │   │
│   │   ├── 📁 horses/         # Componentes específicos de caballos
│   │   │   ├── HorseCard.tsx
│   │   │   ├── HorseFilters.tsx
│   │   │   ├── HorseSearch.tsx
│   │   │   ├── CoatSimulator.tsx
│   │   │   └── CoatGallery.tsx
│   │   │
│   │   ├── 📁 layout/         # Componentes de estructura
│   │   │   ├── Header.tsx
│   │   │   ├── Footer.tsx
│   │   │   ├── Navigation.tsx
│   │   │   └── Sidebar.tsx
│   │   │
│   │   └── 📁 shared/         # Componentes reutilizables
│   │       ├── SearchBar.tsx
│   │       ├── FilterPanel.tsx
│   │       └── ThemeToggle.tsx
│   │
│   ├── 📁 pages/              # Páginas de la aplicación
│   │   ├── Home.tsx
│   │   ├── HorsesPage.tsx
│   │   ├── SpanishBreedsPage.tsx
│   │   ├── WorldBreedsPage.tsx
│   │   ├── CoatsPage.tsx
│   │   ├── CulturePage.tsx
│   │   ├── CinemaTVPage.tsx
│   │   ├── DancePage.tsx
│   │   ├── MusicPage.tsx
│   │   └── OthersPage.tsx
│   │
│   ├── 📁 hooks/              # Custom React hooks
│   │   ├── useHorseFilter.ts
│   │   ├── useSearch.ts
│   │   ├── useTheme.ts
│   │   └── useLocalStorage.ts
│   │
│   ├── 📁 lib/                # Utilidades y helpers
│   │   ├── utils.ts           # shadcn utils (cn, etc.)
│   │   ├── genetics.ts        # Lógica del simulador genético
│   │   └── api.ts             # Funciones de API (si aplica)
│   │
│   ├── 📁 data/               # Datos estáticos
│   │   ├── spanishBreeds.json
│   │   ├── worldBreeds.json
│   │   ├── coats.json
│   │   ├── movies.json
│   │   └── genetics.json      # Datos genéticos para simulador
│   │
│   ├── 📁 types/              # Definiciones TypeScript
│   │   ├── horse.ts
│   │   ├── coat.ts
│   │   └── media.ts
│   │
│   ├── 📁 assets/             # Recursos estáticos
│   │   ├── 📁 icons/
│   │   └── 📁 styles/
│   │       └── globals.css
│   │
│   ├── App.tsx                # Componente raíz
│   ├── main.tsx               # Punto de entrada
│   └── vite-env.d.ts
│
├── .env.example               # Variables de entorno ejemplo
├── .eslintrc.cjs              # Configuración ESLint
├── .gitignore
├── .prettierrc                # Configuración Prettier
├── components.json            # Configuración shadcn/ui
├── index.html
├── package.json
├── postcss.config.js          # PostCSS para Tailwind
├── tailwind.config.js         # Configuración Tailwind
├── tsconfig.json              # Configuración TypeScript
├── tsconfig.node.json
└── vite.config.ts             # Configuración Vite
```

---

## ⚙️ Configuración de Vite

### vite.config.ts

```typescript
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import path from 'path'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  // IMPORTANTE: Cambiar '<nombre-repositorio>' por el nombre real
  base: '/<nombre-repositorio>/',

  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },

  build: {
    outDir: 'dist',
    sourcemap: false,
    minify: 'esbuild',
  },
})
```

---

## 📦 package.json - Scripts

```json
{
  "name": "vanesa-personal-website",
  "private": true,
  "version": "1.0.0",
  "type": "module",
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "lint": "eslint . --ext ts,tsx --report-unused-disable-directives --max-warnings 0",
    "format": "prettier --write \"src/**/*.{ts,tsx,css}\"",
    "predeploy": "npm run build",
    "deploy": "gh-pages -d dist"
  },
  "dependencies": {
    "react": "^18.2.0",
    "react-dom": "^18.2.0",
    "react-router-dom": "^6.20.0",
    "clsx": "^2.0.0",
    "tailwind-merge": "^2.0.0",
    "@radix-ui/react-slot": "^1.0.2"
  },
  "devDependencies": {
    "@types/react": "^18.2.0",
    "@types/react-dom": "^18.2.0",
    "@typescript-eslint/eslint-plugin": "^6.0.0",
    "@typescript-eslint/parser": "^6.0.0",
    "@vitejs/plugin-react": "^4.2.0",
    "autoprefixer": "^10.4.16",
    "eslint": "^8.55.0",
    "eslint-plugin-react-hooks": "^4.6.0",
    "eslint-plugin-react-refresh": "^0.4.5",
    "gh-pages": "^6.1.0",
    "postcss": "^8.4.32",
    "prettier": "^3.1.1",
    "tailwindcss": "^3.3.6",
    "typescript": "^5.2.2",
    "vite": "^5.0.8"
  }
}
```

### Instalación de Dependencias

```bash
# Instalar dependencias base
npm install

# Instalar gh-pages para despliegue
npm install -D gh-pages

# Inicializar shadcn/ui (instala componentes según necesidad)
npx shadcn-ui@latest init
```

---

## 🚀 Configuración de GitHub Pages

### 1. React Router - HashRouter

Para evitar problemas con GitHub Pages y rutas:

```typescript
// src/main.tsx
import { HashRouter } from 'react-router-dom'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <HashRouter>
      <App />
    </HashRouter>
  </React.StrictMode>,
)
```

**Alternativa**: Usar `BrowserRouter` con archivo `404.html` de redirección.

### 2. GitHub Actions - CI/CD Automático

Crear `.github/workflows/deploy.yml`:

```yaml
name: Deploy to GitHub Pages

on:
  push:
    branches:
      - main

permissions:
  contents: read
  pages: write
  id-token: write

jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout
        uses: actions/checkout@v4

      - name: Setup Node
        uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'

      - name: Install dependencies
        run: npm ci

      - name: Build
        run: npm run build

      - name: Upload artifact
        uses: actions/upload-pages-artifact@v3
        with:
          path: ./dist

  deploy:
    environment:
      name: github-pages
      url: ${{ steps.deployment.outputs.page_url }}
    runs-on: ubuntu-latest
    needs: build
    steps:
      - name: Deploy to GitHub Pages
        id: deployment
        uses: actions/deploy-pages@v4
```

### 3. Configuración del Repositorio

1. Ir a **Settings** > **Pages**
2. En **Source** seleccionar **GitHub Actions**
3. Guardar cambios

### 4. Despliegue Manual (Opcional)

```bash
# Construir y desplegar manualmente
npm run deploy
```

Esto ejecutará:
1. `npm run build` (compila el proyecto)
2. `gh-pages -d dist` (publica la carpeta dist en la rama gh-pages)

---

## 🔒 Variables de Entorno

Si se requieren API keys o configuraciones:

```bash
# .env.example
VITE_APP_TITLE=Vanesa - Mis Aficiones
VITE_API_URL=https://api.example.com
# Añadir otras variables según necesidad
```

**Nota**: En Vite, las variables deben empezar con `VITE_` para estar disponibles en el cliente.

---

## ✅ TypeScript - Tipos Principales

### Ejemplo de Tipos

```typescript
// src/types/horse.ts
export type BloodType = 'fría' | 'caliente' | 'templada'

export type Temperament = 'dócil' | 'enérgico' | 'equilibrado'

export interface Horse {
  id: string
  name: string
  image: string
  country: string
  bloodType: BloodType
  temperament: Temperament
  height: number // en cm o manos
  uses: string[]
  history: string
  additionalInfo?: string
}

// src/types/coat.ts
export interface Coat {
  id: string
  name: string
  nameEnglish: string
  description: string
  image: string
  genetics: string[]
  rarity: 'común' | 'poco común' | 'raro'
}

// src/types/media.ts
export interface Movie {
  id: string
  title: string
  titleOriginal?: string
  year: number
  director: string
  synopsis: string
  poster: string
  rating?: number
  trailerUrl?: string
  streamingLinks: StreamingLink[]
  genre: string[]
}

export interface StreamingLink {
  platform: 'Netflix' | 'Disney+' | 'Amazon Prime' | 'HBO Max' | 'Apple TV+'
  url: string
  available: boolean
}
```

---

## 🧪 Testing (Opcional - Fase Futura)

Si se desea añadir testing:

```bash
# Vitest + React Testing Library
npm install -D vitest @testing-library/react @testing-library/jest-dom
```

---

## 📊 Performance y Optimización

### Estrategias

1. **Lazy Loading de Imágenes**
   ```typescript
   <img loading="lazy" src={horse.image} alt={horse.name} />
   ```

2. **Code Splitting por Rutas**
   ```typescript
   const HorsesPage = lazy(() => import('./pages/HorsesPage'))
   ```

3. **Optimización de Bundle**
   - Vite realiza tree-shaking automático
   - Minimizar dependencias innecesarias

4. **Caché de Datos Estáticos**
   - Usar `useMemo` para cálculos costosos
   - `localStorage` para preferencias de usuario

---

## 🌐 SEO y Metadatos

```html
<!-- index.html -->
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <meta name="description" content="Página personal sobre caballos, razas equinas, genética y cultura ecuestre" />
  <meta name="keywords" content="caballos, razas equinas, genética, equitación, PRE, simulador genético" />
  <meta name="author" content="Vanesa" />
  <title>Vanesa - Mis Aficiones</title>
</head>
```

---

## 🔧 Herramientas de Desarrollo

### Extensiones VS Code Recomendadas

- **ESLint**: Linting en tiempo real
- **Prettier**: Formateo automático
- **Tailwind CSS IntelliSense**: Autocompletado de clases
- **TypeScript Vue Plugin (Volar)**: Mejor soporte TypeScript

### Comandos Útiles

```bash
# Desarrollo local
npm run dev

# Build de producción
npm run build

# Preview del build
npm run preview

# Linting
npm run lint

# Formateo
npm run format

# Despliegue
npm run deploy
```
