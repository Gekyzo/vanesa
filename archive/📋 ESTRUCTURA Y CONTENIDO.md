Quiero crear una página web personal sobre mis aficiones principales.
Necesito que sea visualmente atractiva, fácil de navegar y responsive.

## 📋 ESTRUCTURA Y CONTENIDO:

### 1. 🐴 CABALLOS (Sección Principal)

#### 📇 Sistema de Fichas Interactivas

Cada raza se mostrará en formato ficha con:

- Imagen destacada
- País de origen
- Tipo de sangre (fría, caliente, templada)
- Comportamiento/temperamento
- Otros datos relevantes (altura, usos, historia)

**Funcionalidades de las fichas:**

- 🔍 Buscador por nombre de raza
- 🔄 Ordenación por: país, tipo de sangre, comportamiento
- 🏷️ Filtros combinables
- 🔗 Enlaces automáticos en palabras clave que conecten con otros apartados de la web (ej: "sangre caliente" → sección explicativa, "España" → razas españolas)

#### Subsecciones:

**Razas Españolas**

- PRE (Pura Raza Española), Hispano-Árabe, Losino, Asturcón, etc.
- Fichas con el sistema descrito arriba

**Razas Mundiales**

- Árabe, Frisón, Mustang, Percherón, Appaloosa, etc.
- Fichas con el sistema descrito arriba

**Capas y Colores**

- Galería visual: Alazán, tordo, castaño, palomino, pío, etc.
- 🧬 **SIMULADOR GENÉTICO DE CAPAS:**
  - Interfaz para seleccionar bases genéticas de padre y madre
  - Cálculo de probabilidades de capas resultantes en crías
  - Visualización gráfica del resultado
  - Explicación de la genética involucrada (genes Extension, Agouti, Cream, etc.)

**Caballos en la Cultura**

- Psicología: equinoterapia, vínculo humano-caballo
- Historia: caballos en guerras, civilizaciones, mitología

**Cine y TV**

- Películas (Seabiscuit, Spirit, War Horse...)
- Series
- Anuncios publicitarios
- Documentales
- 🔗 **Cada entrada incluirá enlaces directos** a:
  - Tráilers/vídeos oficiales
  - Plataformas de streaming donde verlos
  - Información adicional (IMDb, etc.)

---

### 2. 💃 BAILE

_[TBD - Contenido por definir]_

### 3. 🎵 MÚSICA

_[TBD - Contenido por definir]_

### 4. ✨ OTROS

_[TBD - Contenido por definir]_

---

## 🎨 ESPECIFICACIONES TÉCNICAS:

### Stack Tecnológico:

| Tecnología       | Uso                  |
| ---------------- | -------------------- |
| **React 18+**    | Framework principal  |
| **Vite**         | Bundler y dev server |
| **TypeScript**   | Tipado estático      |
| **Tailwind CSS** | Estilos utilitarios  |
| **shadcn/ui**    | Componentes UI       |
| **React Router** | Navegación SPA       |

### Componentes shadcn/ui sugeridos:

- `Card` → Fichas de razas
- `Input` + `Command` → Buscador
- `Select` / `DropdownMenu` → Filtros y ordenación
- `Tabs` → Navegación entre subsecciones
- `Dialog` / `Sheet` → Detalles expandidos de fichas
- `Badge` → Etiquetas (tipo sangre, país, etc.)
- `Button` → Acciones e interacciones
- `Carousel` → Galerías de imágenes
- `Slider` → Simulador genético
- `Table` → Resultados del simulador

### Diseño:

- Estilo: [moderno/minimalista/rústico/elegante]
- Paleta de colores: [usar sistema de temas de shadcn]
- Modo claro/oscuro con `ThemeProvider`
- Tipografía: Inter o similar (legible y moderna)

### Funcionalidades:

- Menú de navegación fijo (shadcn `NavigationMenu`)
- Galerías de imágenes interactivas
- Diseño responsive (móvil/tablet/desktop)
- Sistema de fichas con búsqueda y filtros
- Simulador genético interactivo
- [Opcional: formulario de contacto, blog, redes sociales]

---

## 🚀 DESPLIEGUE EN GITHUB PAGES:

### Configuración necesaria:

**1. vite.config.ts:**

```typescript
export default defineConfig({
  base: '/<nombre-repositorio>/',
  plugins: [react()],
})
2. Package.json - Scripts:

JSON

{
  "scripts": {
    "dev": "vite",
    "build": "tsc && vite build",
    "preview": "vite preview",
    "deploy": "gh-pages -d dist"
  }
}
3. Dependencias adicionales:

Bash

npm install -D gh-pages
4. GitHub Actions (opcional - CI/CD automático):
Crear .github/workflows/deploy.yml para despliegue automático en cada push a main.

5. Configuración React Router para GitHub Pages:

Usar HashRouter en lugar de BrowserRouter
O configurar archivo 404.html con redirección
Estructura del proyecto:
text

📁 src/
├── 📁 components/
│   ├── 📁 ui/          (componentes shadcn)
│   ├── 📁 horses/      (fichas, filtros, simulador)
│   ├── 📁 layout/      (header, footer, nav)
│   └── 📁 shared/      (componentes reutilizables)
├── 📁 pages/
├── 📁 hooks/
├── 📁 lib/
├── 📁 data/            (JSON con datos de razas, capas, etc.)
└── 📁 assets/
📄 PÁGINAS NECESARIAS:
Inicio (presentación personal + resumen de aficiones)
Página individual por cada afición
[Opcional: Sobre mí, Contacto, Blog]
text


---

## 📊 Resumen de funcionalidades clave:

| Funcionalidad | Tecnología |
|---------------|------------|
| **Fichas interactivas** | shadcn `Card` + `Badge` |
| **Buscador + Filtros** | shadcn `Input` + `Select` + `Command` |
| **Enlaces contextuales** | React Router `Link` |
| **Simulador genético** | shadcn `Slider` + `Table` + lógica custom |
| **Enlaces multimedia** | shadcn `Button` con iconos externos |
| **Tema claro/oscuro** | shadcn `ThemeProvider` |
| **Hosting gratuito** | GitHub Pages |
```
