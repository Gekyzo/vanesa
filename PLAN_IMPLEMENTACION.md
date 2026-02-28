# 📅 Plan de Implementación

## 📊 Resumen Ejecutivo

Este documento detalla el plan de implementación de la aplicación web personal, organizado en **9 fases** principales con tareas específicas, estimaciones de tiempo y dependencias.

### Tiempo Total Estimado

| Categoría | Horas Estimadas |
|-----------|-----------------|
| **Desarrollo Frontend** | 25-35 horas |
| **Backoffice Admin** | 22-30 horas |
| **Configuración y Despliegue** | 4-6 horas |
| **TOTAL** | **51-71 horas** |

---

## 📋 Fases del Proyecto

### Fase 1: Configuración Inicial

**Duración estimada**: 2-3 horas
**Tareas**: 6
**Prioridad**: Alta
**Dependencias**: Ninguna

#### Tareas

| # | Tarea | Tiempo | Descripción |
|---|-------|--------|-------------|
| 1.1 | Crear proyecto con Vite + React + TypeScript | 15 min | `npm create vite@latest` |
| 1.2 | Configurar Tailwind CSS | 20 min | Instalación y configuración |
| 1.3 | Inicializar shadcn/ui | 30 min | `npx shadcn-ui@latest init` |
| 1.4 | Instalar React Router | 15 min | Configuración básica de rutas |
| 1.5 | Configurar estructura de carpetas | 30 min | Crear carpetas según REQUISITOS_TECNICOS.md |
| 1.6 | Configurar ESLint y Prettier | 30 min | Linting y formateo de código |

#### Entregables

- ✅ Proyecto Vite funcional
- ✅ Tailwind CSS operativo
- ✅ shadcn/ui configurado
- ✅ Estructura de carpetas completa
- ✅ Configuración de calidad de código

#### Comandos

```bash
# Crear proyecto
npm create vite@latest vanesa-website -- --template react-ts
cd vanesa-website

# Instalar dependencias base
npm install

# Configurar Tailwind
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p

# Inicializar shadcn/ui
npx shadcn-ui@latest init

# Instalar React Router
npm install react-router-dom
npm install -D @types/react-router-dom
```

---

### Fase 2: Layout y Navegación

**Duración estimada**: 3-4 horas
**Tareas**: 5
**Prioridad**: Alta
**Dependencias**: Fase 1

#### Tareas

| # | Tarea | Tiempo | Descripción |
|---|-------|--------|-------------|
| 2.1 | Crear componente Header | 45 min | Logo, navegación principal |
| 2.2 | Crear componente Footer | 30 min | Enlaces y redes sociales |
| 2.3 | Implementar NavigationMenu (shadcn) | 1 hora | Menú responsive con submódulos |
| 2.4 | Configurar rutas principales | 45 min | React Router para todas las páginas |
| 2.5 | Implementar ThemeProvider (modo claro/oscuro) | 1 hora | Sistema de temas con persistencia |

#### Entregables

- ✅ Layout principal responsive
- ✅ Navegación funcional entre secciones
- ✅ Modo claro/oscuro operativo
- ✅ Header y Footer estilizados

#### Componentes shadcn Necesarios

```bash
npx shadcn-ui@latest add navigation-menu
npx shadcn-ui@latest add button
npx shadcn-ui@latest add toggle
```

---

### Fase 3: Sistema de Fichas de Razas

**Duración estimada**: 6-8 horas
**Tareas**: 7
**Prioridad**: Alta
**Dependencias**: Fase 2

#### Tareas

| # | Tarea | Tiempo | Descripción |
|---|-------|--------|-------------|
| 3.1 | Crear tipos TypeScript para Horse | 30 min | Interfaces y tipos en `/types/horse.ts` |
| 3.2 | Crear archivos JSON con datos de razas | 1.5 horas | Datos de razas españolas y mundiales |
| 3.3 | Desarrollar componente HorseCard | 1.5 horas | Card con imagen, badges, datos |
| 3.4 | Implementar buscador (HorseSearch) | 1 hora | Input con búsqueda en tiempo real |
| 3.5 | Desarrollar sistema de filtros (HorseFilters) | 2 horas | Filtros por país, tipo sangre, temperamento |
| 3.6 | Implementar ordenación | 45 min | Select para ordenar resultados |
| 3.7 | Crear páginas de Razas Españolas y Mundiales | 1 hora | Integrar componentes en páginas |

#### Entregables

- ✅ Sistema de fichas funcional
- ✅ Búsqueda en tiempo real
- ✅ Filtros combinables operativos
- ✅ Ordenación por múltiples criterios
- ✅ Al menos 10 razas documentadas

#### Componentes shadcn Necesarios

```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add badge
npx shadcn-ui@latest add input
npx shadcn-ui@latest add select
npx shadcn-ui@latest add checkbox
npx shadcn-ui@latest add popover
npx shadcn-ui@latest add dialog
```

#### Ejemplo de Datos

```json
// src/data/spanishBreeds.json
{
  "breeds": [
    {
      "id": "pre",
      "name": "Pura Raza Española (PRE)",
      "image": "/images/horses/pre.jpg",
      "country": "España",
      "bloodType": "caliente",
      "temperament": "equilibrado",
      "height": 155,
      "uses": ["doma clásica", "alta escuela", "paseo"],
      "history": "Raza con siglos de historia..."
    }
  ]
}
```

---

### Fase 4: Simulador Genético de Capas

**Duración estimada**: 8-10 horas
**Tareas**: 6
**Prioridad**: Media-Alta
**Dependencias**: Fase 3

#### Tareas

| # | Tarea | Tiempo | Descripción |
|---|-------|--------|-------------|
| 4.1 | Investigar y documentar genética equina | 2 horas | Genes Extension, Agouti, Cream, Gray, etc. |
| 4.2 | Crear tipos TypeScript para genética | 45 min | Interfaces de genes y fenotipos |
| 4.3 | Desarrollar lógica del simulador en `/lib/genetics.ts` | 3 horas | Algoritmo de cuadro de Punnett |
| 4.4 | Crear interfaz de selección de genotipos | 2 horas | Sliders, RadioGroups para seleccionar alelos |
| 4.5 | Implementar visualización de resultados | 1.5 horas | Tabla con probabilidades y gráficos |
| 4.6 | Añadir explicaciones educativas | 1 hora | Accordion con información genética |

#### Entregables

- ✅ Simulador genético funcional
- ✅ Cálculo preciso de probabilidades
- ✅ Visualización clara de resultados
- ✅ Contenido educativo sobre genética

#### Componentes shadcn Necesarios

```bash
npx shadcn-ui@latest add slider
npx shadcn-ui@latest add radio-group
npx shadcn-ui@latest add table
npx shadcn-ui@latest add accordion
npx shadcn-ui@latest add label
npx shadcn-ui@latest add separator
```

#### Lógica de Ejemplo

```typescript
// src/lib/genetics.ts
export interface Gene {
  name: string
  allele1: string
  allele2: string
}

export interface ParentGenotype {
  extension: Gene    // E/e (negro/rojo)
  agouti: Gene       // A/a (patrón)
  cream: Gene        // Cr/n (dilución)
  gray: Gene         // G/n (tordo)
}

export function calculateOffspringProbabilities(
  sire: ParentGenotype,
  dam: ParentGenotype
): CoatProbability[] {
  // Lógica de cuadro de Punnett
  // Retorna array de fenotipos con probabilidades
}
```

---

### Fase 5: Sección Cine y TV

**Duración estimada**: 3-4 horas
**Tareas**: 4
**Prioridad**: Media
**Dependencias**: Fase 2

#### Tareas

| # | Tarea | Tiempo | Descripción |
|---|-------|--------|-------------|
| 5.1 | Crear tipos TypeScript para Media | 30 min | Interfaces de películas, series, etc. |
| 5.2 | Recopilar datos de películas y series | 1.5 horas | JSON con información y enlaces |
| 5.3 | Desarrollar componente MovieCard | 1 hora | Card con póster, info, enlaces |
| 5.4 | Crear página CinemaTVPage | 1 hora | Grid de películas con filtros básicos |

#### Entregables

- ✅ Catálogo de al menos 10 películas/series
- ✅ Enlaces a tráilers funcionales
- ✅ Enlaces a plataformas de streaming
- ✅ Página responsive y atractiva

#### Componentes shadcn Necesarios

```bash
npx shadcn-ui@latest add card
npx shadcn-ui@latest add button
npx shadcn-ui@latest add badge
```

---

### Fase 6: Cultura Ecuestre

**Duración estimada**: 2-3 horas
**Tareas**: 3
**Prioridad**: Media-Baja
**Dependencias**: Fase 2

#### Tareas

| # | Tarea | Tiempo | Descripción |
|---|-------|--------|-------------|
| 6.1 | Crear contenido sobre Psicología Equina | 1 hora | Artículo sobre equinoterapia, vínculo |
| 6.2 | Crear contenido sobre Historia | 1 hora | Domesticación, guerras, civilizaciones |
| 6.3 | Desarrollar página CulturePage | 1 hora | Layout con tabs o accordion |

#### Entregables

- ✅ Contenido educativo de calidad
- ✅ Página bien estructurada
- ✅ Imágenes y referencias

#### Componentes shadcn Necesarios

```bash
npx shadcn-ui@latest add tabs
npx shadcn-ui@latest add accordion
```

---

### Fase 7: Secciones Pendientes (Baile, Música, Otros)

**Duración estimada**: 1-2 horas
**Tareas**: 3
**Prioridad**: Baja
**Dependencias**: Fase 2

#### Tareas

| # | Tarea | Tiempo | Descripción |
|---|-------|--------|-------------|
| 7.1 | Crear páginas placeholder | 30 min | Páginas básicas con "En construcción" |
| 7.2 | Definir estructura futura | 30 min | Planificación de contenido |
| 7.3 | Añadir enlaces de navegación | 30 min | Integrar en menú principal |

#### Entregables

- ✅ Páginas básicas creadas
- ✅ Navegación funcional
- ✅ Estructura preparada para contenido futuro

---

### Fase 8: Despliegue en GitHub Pages

**Duración estimada**: 2-3 horas
**Tareas**: 5
**Prioridad**: Alta
**Dependencias**: Todas las anteriores

#### Tareas

| # | Tarea | Tiempo | Descripción |
|---|-------|--------|-------------|
| 8.1 | Configurar vite.config.ts para GitHub Pages | 30 min | Ajustar `base` path |
| 8.2 | Configurar HashRouter | 30 min | Cambiar de BrowserRouter a HashRouter |
| 8.3 | Instalar y configurar gh-pages | 30 min | `npm install -D gh-pages` |
| 8.4 | Crear GitHub Actions workflow | 45 min | CI/CD automático |
| 8.5 | Realizar primer deploy y verificar | 45 min | Pruebas y ajustes finales |

#### Entregables

- ✅ Aplicación desplegada en GitHub Pages
- ✅ URL pública funcional
- ✅ CI/CD automático configurado
- ✅ Todas las funcionalidades operativas

#### Configuración

```typescript
// vite.config.ts
export default defineConfig({
  base: '/vanesa-website/', // Cambiar por nombre del repo
  plugins: [react()],
})
```

```json
// package.json
{
  "scripts": {
    "deploy": "gh-pages -d dist"
  }
}
```

---

### Fase 9: Backoffice Admin (Opcional/Futuro)

**Duración estimada**: 22-30 horas
**Tareas**: 8
**Prioridad**: Baja (Post-MVP)
**Dependencias**: Fase 8

#### Descripción

Sistema administrativo para gestionar contenido sin modificar archivos JSON manualmente.

#### Tareas

| # | Tarea | Tiempo | Descripción |
|---|-------|--------|-------------|
| 9.1 | Diseñar arquitectura del backoffice | 2 horas | Planificación técnica |
| 9.2 | Configurar backend (Node.js/Firebase) | 4 horas | API REST o BaaS |
| 9.3 | Implementar autenticación | 3 horas | Sistema de login seguro |
| 9.4 | Crear CRUD de razas equinas | 5 horas | Formularios de creación/edición |
| 9.5 | Crear CRUD de contenido multimedia | 4 horas | Gestión de películas/series |
| 9.6 | Implementar subida de imágenes | 3 horas | Upload a cloud storage |
| 9.7 | Desarrollar dashboard de administración | 4 horas | Interfaz admin con estadísticas |
| 9.8 | Testing y seguridad | 3 horas | Validación y protección |

#### Entregables

- ✅ Panel de administración funcional
- ✅ CRUD completo de contenidos
- ✅ Sistema de autenticación
- ✅ Subida de imágenes
- ✅ Documentación de uso

#### Tecnologías Sugeridas

- **Backend**: Node.js + Express, o Firebase/Supabase (BaaS)
- **Autenticación**: Firebase Auth o JWT
- **Base de datos**: Firestore, MongoDB, o PostgreSQL
- **Storage**: Cloudinary, Firebase Storage, o AWS S3

#### Notas

Esta fase es **opcional** y puede realizarse después del lanzamiento del MVP. Permite gestionar contenido de forma dinámica sin necesidad de redesplegar la aplicación.

---

## 📊 Diagrama de Dependencias

```
Fase 1 (Configuración Inicial)
   ↓
Fase 2 (Layout y Navegación)
   ↓
   ├─→ Fase 3 (Fichas de Razas) → Fase 4 (Simulador Genético)
   ├─→ Fase 5 (Cine y TV)
   ├─→ Fase 6 (Cultura)
   └─→ Fase 7 (Otras Secciones)
   ↓
Fase 8 (Despliegue)
   ↓
Fase 9 (Backoffice) [Opcional]
```

---

## 🎯 Hitos del Proyecto

### Hito 1: Infraestructura Básica ✅
**Fases**: 1-2
**Tiempo**: 5-7 horas
**Criterio de éxito**: Proyecto configurado, navegación funcional, temas operativos

### Hito 2: MVP - Sección de Caballos ✅
**Fases**: 3-4
**Tiempo**: 14-18 horas
**Criterio de éxito**: Fichas interactivas y simulador genético funcionando

### Hito 3: Contenido Completo ✅
**Fases**: 5-7
**Tiempo**: 6-9 horas
**Criterio de éxito**: Todas las secciones con contenido básico

### Hito 4: Producción ✅
**Fase**: 8
**Tiempo**: 2-3 horas
**Criterio de éxito**: Aplicación desplegada y accesible públicamente

### Hito 5: Backoffice (Opcional) ⏳
**Fase**: 9
**Tiempo**: 22-30 horas
**Criterio de éxito**: Panel admin funcional con gestión de contenido

---

## 📝 Checklist General

### Pre-Desarrollo
- [ ] Revisar DEFINICION_APLICACION.md
- [ ] Revisar ESPECIFICACION_FUNCIONALIDADES.md
- [ ] Revisar REQUISITOS_TECNICOS.md
- [ ] Configurar entorno de desarrollo
- [ ] Crear repositorio en GitHub

### Durante Desarrollo
- [ ] Commits frecuentes y descriptivos
- [ ] Probar en diferentes navegadores
- [ ] Verificar responsive design
- [ ] Revisar accesibilidad básica
- [ ] Optimizar imágenes

### Pre-Lanzamiento
- [ ] Testing completo de funcionalidades
- [ ] Verificar enlaces externos
- [ ] Comprobar SEO básico
- [ ] Optimizar performance
- [ ] Configurar analytics (opcional)

### Post-Lanzamiento
- [ ] Monitorear errores
- [ ] Recopilar feedback
- [ ] Planificar mejoras
- [ ] Actualizar contenido regularmente

---

## 🚀 Estrategia de Lanzamiento

### Fase de Desarrollo (Semanas 1-2)
- Completar Fases 1-7
- Testing interno
- Ajustes de diseño

### Lanzamiento MVP (Semana 3)
- Desplegar Fase 8
- Compartir con círculo cercano
- Recopilar feedback inicial

### Iteración y Mejora (Semanas 4+)
- Añadir contenido adicional
- Implementar mejoras sugeridas
- Considerar Fase 9 si hay necesidad

---

## 💡 Recomendaciones

1. **Priorizar MVP**: Enfocarse en Fases 1-8 antes de considerar Fase 9
2. **Contenido gradual**: No es necesario tener todas las razas desde el inicio
3. **Testing continuo**: Probar en múltiples dispositivos desde el principio
4. **Documentación**: Mantener comentarios claros en código complejo
5. **Backup**: Versionar datos JSON en el repositorio
6. **Performance**: Optimizar imágenes (usar WebP, lazy loading)
7. **SEO**: Añadir metadatos relevantes en cada página

---

## 📞 Próximos Pasos

1. ✅ **Revisar documentación completa**
   - DEFINICION_APLICACION.md
   - ESPECIFICACION_FUNCIONALIDADES.md
   - REQUISITOS_TECNICOS.md
   - PLAN_IMPLEMENTACION.md (este documento)

2. 🔨 **Comenzar Fase 1**: Configuración Inicial
   - Crear proyecto Vite
   - Configurar herramientas
   - Establecer estructura base

3. 🎨 **Diseño visual**: Definir paleta de colores específica

4. 📸 **Recursos**: Recopilar imágenes de razas equinas

5. 🚀 **¡Empezar a construir!**

---

**Última actualización**: 2025-12-28
**Versión**: 1.0
**Estado**: Planificación Completa
