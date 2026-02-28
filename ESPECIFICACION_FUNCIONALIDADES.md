# ⚙️ Especificación de Funcionalidades

## 📋 Índice de Secciones

1. [Caballos 🐴](#1--caballos-sección-principal)
2. [Baile 💃](#2--baile)
3. [Música 🎵](#3--música)
4. [Otros ✨](#4--otros)

---

## 1. 🐴 CABALLOS (Sección Principal)

### 📇 Sistema de Fichas Interactivas

Sistema central de la aplicación que permite visualizar, buscar y filtrar información sobre razas equinas.

#### Estructura de Cada Ficha

Cada raza se mostrará en formato de tarjeta (card) con los siguientes datos:

| Campo | Descripción | Tipo |
|-------|-------------|------|
| **Imagen destacada** | Fotografía representativa de la raza | Imagen |
| **Nombre de la raza** | Denominación oficial | Texto |
| **País de origen** | País o región de procedencia | Texto + Bandera |
| **Tipo de sangre** | Clasificación: fría, caliente o templada | Badge/Etiqueta |
| **Comportamiento** | Temperamento característico | Texto descriptivo |
| **Altura** | Alzada promedio en manos o cm | Número |
| **Usos principales** | Disciplinas o trabajos típicos | Lista |
| **Historia** | Breve reseña histórica | Texto |
| **Datos adicionales** | Información complementaria | Texto |

#### Funcionalidades Interactivas

##### 🔍 Buscador

- **Tipo**: Input de texto con búsqueda en tiempo real
- **Alcance**: Búsqueda por nombre de raza
- **Comportamiento**: Filtrado instantáneo mientras se escribe
- **Componente**: shadcn `Input` + `Command`

##### 🔄 Ordenación

Permite ordenar las fichas según diferentes criterios:

- **Por país de origen** (alfabético)
- **Por tipo de sangre** (fría → templada → caliente)
- **Por comportamiento** (dócil → enérgico)
- **Por nombre** (A-Z)
- **Componente**: shadcn `Select` o `DropdownMenu`

##### 🏷️ Filtros Combinables

Sistema de filtros que se pueden aplicar simultáneamente:

| Filtro | Opciones | Tipo |
|--------|----------|------|
| **Tipo de sangre** | Fría, Caliente, Templada | Multi-select |
| **País/Continente** | España, Europa, América, Asia, etc. | Multi-select |
| **Comportamiento** | Dócil, Enérgico, Equilibrado | Multi-select |
| **Uso** | Silla, Tiro, Deporte, Trabajo | Multi-select |

**Comportamiento**:
- Los filtros se acumulan (AND lógico)
- Indicador visual de filtros activos
- Botón para limpiar todos los filtros
- **Componente**: shadcn `Checkbox` + `Popover` o `Sheet`

##### 🔗 Enlaces Contextuales Automáticos

Palabras clave en las fichas se convierten en enlaces clickeables:

- **"Sangre caliente"** → Sección explicativa sobre tipos de sangre
- **"España"** → Filtro automático de razas españolas
- **"Equinoterapia"** → Sección de Psicología en Cultura
- **"Percherón"** → Ficha específica de esa raza

**Implementación**: React Router `Link` con detección automática de keywords

---

### 📂 Subsecciones de Caballos

#### 1.1 Razas Españolas

Listado de razas autóctonas de España con sistema de fichas completo.

**Razas incluidas** (ejemplos):
- PRE (Pura Raza Española)
- Hispano-Árabe
- Losino
- Asturcón
- Caballo de las Retuertas
- Jaca Navarra
- Menorquín

**Características especiales**:
- Destacar razas en peligro de extinción
- Información sobre asociaciones de criadores
- Historia específica de cada raza en España

#### 1.2 Razas Mundiales

Catálogo internacional de razas con sistema de fichas completo.

**Razas incluidas** (ejemplos):
- Árabe (Medio Oriente)
- Frisón (Países Bajos)
- Mustang (EE.UU.)
- Percherón (Francia)
- Appaloosa (EE.UU.)
- Hannoveriano (Alemania)
- Lipizzano (Austria)
- Quarter Horse (EE.UU.)
- Clydesdale (Escocia)

**Organización**:
- Por continente
- Por popularidad
- Por tipo de disciplina

---

#### 1.3 Capas y Colores

Galería visual educativa sobre la variedad de capas equinas.

##### Galería de Capas

Catálogo visual con imágenes y descripciones de:

**Capas Básicas**:
- Alazán (chestnut)
- Negro (black)
- Castaño (bay)
- Tordo (gray)

**Capas Diluidas**:
- Palomino
- Isabelo (buckskin)
- Cremello
- Perlino

**Capas Manchadas**:
- Pío/Pintado (pinto)
- Appaloosa (leopard, blanket, etc.)
- Overo
- Tobiano

**Otras Características**:
- Marcas blancas (estrella, cordón, calcetines)
- Capas raras (champagne, silver dapple)

**Componente**: shadcn `Carousel` o grid de `Card`

---

##### 🧬 SIMULADOR GENÉTICO DE CAPAS

Herramienta interactiva educativa para calcular probabilidades de capas en crías.

**Funcionalidad Principal**:

1. **Selección de Genotipos Parentales**
   - Interfaz para seleccionar genes del padre
   - Interfaz para seleccionar genes de la madre
   - **Genes incluidos**:
     - Extension (E/e) - determina negro/rojo
     - Agouti (A/a) - patrón de distribución
     - Cream (Cr/n) - dilución
     - Gray (G/n) - tordo
     - Dun (D/nd1/nd2) - primitivo
     - Otros según complejidad

2. **Cálculo de Probabilidades**
   - Algoritmo de cuadro de Punnett automático
   - Cálculo de todas las combinaciones posibles
   - Porcentajes para cada fenotipo resultante

3. **Visualización de Resultados**
   - Tabla con probabilidades por capa
   - Gráfico visual (barras o torta)
   - Imágenes representativas de cada capa posible
   - **Componente**: shadcn `Table` + Chart library

4. **Explicación Educativa**
   - Descripción de genes involucrados
   - Explicación de dominancia/recesividad
   - Ejemplos visuales
   - Glosario de términos genéticos
   - **Componente**: shadcn `Accordion` o `Tabs`

**Interfaz**:
- shadcn `Slider` para visualización de alelos
- shadcn `Select` para elección de genotipos
- shadcn `RadioGroup` para opciones simples
- shadcn `Button` para calcular resultados
- shadcn `Dialog` para explicaciones detalladas

**Ejemplo de Uso**:
```
Padre: E/E, A/a, Cr/n (Palomino)
Madre: E/e, a/a, n/n (Negro)

Resultados posibles:
- 50% Castaño (E/e, A/a, n/n)
- 25% Negro (E/e, a/a, n/n)
- 25% Isabelo (E/e, A/a, Cr/n)
```

---

#### 1.4 Caballos en la Cultura

Contenido educativo sobre el impacto cultural de los caballos.

##### Psicología

- **Equinoterapia**: Beneficios terapéuticos
- **Vínculo humano-caballo**: Aspectos emocionales
- **Comportamiento equino**: Etología básica
- **Comunicación**: Lenguaje corporal

##### Historia

- **Domesticación**: Origen histórico
- **Caballos en guerras**: Rol militar a través de la historia
- **Civilizaciones**: Importancia en diferentes culturas
- **Mitología**: Caballos en leyendas y mitos
- **Evolución**: De Eohippus al caballo moderno

**Formato**: Artículos con imágenes, líneas de tiempo interactivas

---

#### 1.5 Cine y TV

Directorio de contenido audiovisual relacionado con caballos.

##### Categorías

###### 🎬 Películas

Listado de películas con información detallada:

**Ejemplos**:
- Seabiscuit (2003)
- Spirit: El corcel indomable (2002)
- War Horse (2011)
- Secretariat (2010)
- The Black Stallion (1979)
- Hidalgo (2004)

**Información por entrada**:
- Título original y traducido
- Año de estreno
- Director
- Sinopsis breve
- Género
- Calificación/Rating
- Póster oficial

###### 📺 Series

- Heartland
- Free Rein
- Black Beauty (series)

###### 📢 Anuncios Publicitarios

- Anuncios icónicos con caballos
- Campañas memorables

###### 🎥 Documentales

- Documentales sobre comportamiento equino
- Crianza y entrenamiento
- Razas específicas

##### 🔗 Enlaces Directos

Cada entrada incluirá botones/enlaces a:

1. **Tráilers y Videos Oficiales**
   - YouTube
   - Vimeo
   - Sitios oficiales

2. **Plataformas de Streaming**
   - Netflix
   - Disney+
   - Amazon Prime Video
   - HBO Max
   - Apple TV+
   - Disponibilidad por región

3. **Información Adicional**
   - IMDb
   - Rotten Tomatoes
   - Wikipedia
   - Sitios oficiales

**Componente**: shadcn `Card` con `Button` y iconos externos

**Diseño**: Grid responsive de tarjetas con imágenes

---

## 2. 💃 BAILE

_[Contenido por definir - Sección pendiente]_

### Estructura Propuesta

- Estilos de baile
- Videos y tutoriales
- Eventos y presentaciones
- Recursos de aprendizaje

---

## 3. 🎵 MÚSICA

_[Contenido por definir - Sección pendiente]_

### Estructura Propuesta

- Géneros favoritos
- Artistas destacados
- Playlists
- Recomendaciones

---

## 4. ✨ OTROS

_[Contenido por definir - Sección pendiente]_

### Estructura Propuesta

- Otras aficiones e intereses
- Proyectos personales
- Blog o diario
- Galería fotográfica

---

## 🔄 Funcionalidades Transversales

### Navegación

- **Menú principal**: Acceso a todas las secciones
- **Breadcrumbs**: Indicador de ubicación
- **Menú móvil**: Hamburger menu responsive
- **Footer**: Enlaces rápidos y redes sociales
- **Componente**: shadcn `NavigationMenu`

### Búsqueda Global

- Búsqueda en todo el sitio
- Sugerencias automáticas
- **Componente**: shadcn `Command` (cmd+k)

### Tema Visual

- **Modo claro/oscuro**: Toggle de tema
- **Persistencia**: Guardar preferencia en localStorage
- **Componente**: shadcn `ThemeProvider` + toggle button

### Responsive Design

- **Mobile first**: Diseño optimizado para móvil
- **Breakpoints**: sm, md, lg, xl, 2xl (Tailwind)
- **Touch friendly**: Botones y elementos táctiles adecuados

### Accesibilidad

- Navegación por teclado
- Atributos ARIA
- Contraste de colores adecuado
- Textos alternativos en imágenes

### Performance

- Lazy loading de imágenes
- Code splitting por rutas
- Optimización de bundle size
- Caché de datos estáticos
