# 🎨 Three-Section Coats Page - Complete Guide

## 📋 Overview

The Coats page has been redesigned into **three distinct, educational sections** that provide a complete journey through horse coat genetics:

1. **Catálogo de Capas** - Poster-style gallery with expandable details
2. **Razas por Capa** - Breed associations for each coat color
3. **Simulador Genético** - Interactive breeding predictions

---

## 🎯 Page Structure

```
┌─────────────────────────────────────┐
│         Hero Header                 │
│  - Title & Description              │
│  - 3 Navigation Buttons             │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│   SECTION 1: Catálogo de Capas     │
│   🎨 Poster Gallery                │
│   - Large images with overlays      │
│   - Genetic notation display        │
│   - Expandable details              │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│   SECTION 2: Razas por Capa        │
│   📚 Breed Associations             │
│   - Which breeds have each coat     │
│   - Representative examples         │
└─────────────────────────────────────┘
                 ↓
┌─────────────────────────────────────┐
│   SECTION 3: Simulador Genético    │
│   🧬 Interactive Calculator         │
│   - Simple mode (2 generations)     │
│   - Advanced mode (3 generations)   │
└─────────────────────────────────────┘
```

---

## 🎨 SECTION 1: Catálogo de Capas

### Design Philosophy

**Educational + Beautiful** - Combines poster-style aesthetics with detailed scientific information

### Layout

**Grid System:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 2-3 columns
- Each card: ~600px height

### Card Structure

```
┌──────────────────────────────────────┐
│                                      │
│      LARGE POSTER IMAGE (320px)      │
│                                      │
│  ┌────────────────────────────────┐  │
│  │  Alazán          [ee]          │  │← Name + Genotype overlay
│  │  Chestnut                      │  │
│  └────────────────────────────────┘  │
├──────────────────────────────────────┤
│  ┌──────────┬──────────┐             │
│  │ E: ee    │ A: Aa    │             │← Extension & Agouti
│  └──────────┴──────────┘             │
│  ┌──────────┬──────────┐             │
│  │ Crema    │  Dun     │             │← Dilutions (if present)
│  └──────────┴──────────┘             │
│                                      │
│  [Dilución] [Patrón] [⚠️ Letal]     │← Badges
│                                      │
│  Short description text...           │
│                                      │
│  [▼ Ver Detalles Completos]         │← Expand button
├──────────────────────────────────────┤
│  EXPANDABLE SECTION (collapsed)      │
│  - Full genetic description          │
│  - Phenotype image                   │
│  - Physical characteristics          │
│  - Variants list                     │
└──────────────────────────────────────┘
```

### Features

**Poster Image Section:**
- ✅ 320px tall hero image
- ✅ Gradient overlay (black to transparent)
- ✅ Coat name in white (large, bold, 3xl)
- ✅ English name subtitle
- ✅ **Genotype badge** floating on image (white/translucent)
- ✅ Hover zoom effect (scale 110%)

**Compact Genetics:**
- ✅ 2x2 grid for genes (Extension, Agouti, Dilutions)
- ✅ Color-coded boxes:
  - Extension/Agouti: Gray muted
  - Cream: Amber/Gold
  - Dun: Yellow
  - Silver: Slate
- ✅ Only show dilutions if NOT "N/N" (clean display)

**Classification Badges:**
- ✅ Dilución - For diluted coats
- ✅ Patrón - For pattern coats
- ✅ ⚠️ Letal - Warning for lethal combos (red)
- ✅ Marcas Primitivas - For dun markings

**Expandable Details:**
- ✅ Click "Ver Detalles Completos" to expand
- ✅ Smooth height animation
- ✅ Shows:
  - **Full Description** - Complete genetic explanation
  - **Phenotype Image** - Second image showing coat detail
  - **Physical Characteristics** - Body, mane, eyes, skin
  - **Variants** - All color variations (badges)

---

## 📚 SECTION 2: Razas por Capa

### Purpose

Answer the question: **"Which breeds are known for this coat color?"**

### Design

**Card Grid:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns

### Card Structure

```
┌────────────────────────────┐
│  [🧬]  Alazán              │
│                            │
│  • Pura Raza Español       │
│  • Quarter Horse           │
│  • Morgan                  │
└────────────────────────────┘
```

**Elements:**
- ✅ DNA icon in primary color circle
- ✅ Coat name (large, bold, primary color)
- ✅ Breed list with bullet points
- ✅ Hover effect (shadow + border color shift)

### Data Structure

Currently uses example data:
```typescript
const BREED_COAT_ASSOCIATIONS = {
  "Alazán": ["Pura Raza Español", "Quarter Horse", "Morgan"],
  "Castaño": ["Pura Raza Español", "Andaluz", "Lusitano"],
  "Negro": "Frisón", // Single breed (string)
  "Palomino": ["Quarter Horse", "Tennessee Walker"],
  // ... more associations
};
```

### Future Enhancement

**Database Integration:**
```sql
CREATE TABLE breed_coat_associations (
  id SERIAL PRIMARY KEY,
  breed_id INTEGER REFERENCES breeds(id),
  coat_id INTEGER REFERENCES coats(id),
  is_representative BOOLEAN DEFAULT false
);
```

This would allow:
- Dynamic breed-coat relationships
- Admin management
- "Representative breed" highlighting
- Statistics (% of breed with this coat)

---

## 🧬 SECTION 3: Simulador Genético

### Purpose

Interactive tool to **predict offspring coat colors** based on parental genetics

### Two Modes

**Simple Mode (2 Generations):**
```
Padre (EE/Ee/ee) + Madre (EE/Ee/ee)
              ↓
        Potro (probabilities)
```

**Advanced Mode (3 Generations):**
```
Gen 1: 4 Abuelos
       ↓         ↓
Gen 2: Padre + Madre (calculated)
       ↓
Gen 3: Potro Final
```

### UI Components

**Input Section:**
- ✅ Dropdown selectors for coat colors
- ✅ Labels: "Padre (Semental)" / "Madre (Yegua)"
- ✅ Color-coded sections (blue/pink for lineages)
- ✅ Disabled state when selections incomplete

**Results Display:**
- ✅ **Pie Chart** with Recharts
- ✅ Percentage labels on segments
- ✅ Color-coded segments
- ✅ Legend at bottom
- ✅ Animated arrows between generations

**Button States:**
- Enabled: "Calcular Probabilidades"
- Loading: "Calculando Genética..."
- Reset: Available after results shown

---

## 🎨 Visual Design System

### Hero Section

**Layout:**
- ✅ Large, dramatic header (py-24)
- ✅ Background gradient + dot pattern (subtle)
- ✅ Badge: "Genética Equina Completa"
- ✅ Title: 6xl/7xl responsive
- ✅ Subtitle: 2-line description
- ✅ 3 navigation buttons (primary, outline, secondary)

**Typography:**
```
Title: text-6xl md:text-7xl font-display
Subtitle: text-xl md:text-2xl font-light
Buttons: text-lg h-14 px-8
```

### Section Headers

**Consistent Format:**
```
┌─────────────────────────┐
│  [Icon] Sección N       │← Badge
│                         │
│  Large Section Title    │← 5xl/6xl
│                         │
│  Description text       │← xl, muted
└─────────────────────────┘
```

**Spacing:**
- mb-16 between header and content
- space-y-32 between sections
- Generous padding throughout

### Color Palette

**Genetics Boxes:**
- Extension/Agouti: `bg-muted/50` + `border-border/50`
- Cream: `bg-amber-500/10` + `border-amber-500/30`
- Dun: `bg-yellow-500/10` + `border-yellow-500/30`
- Silver: `bg-slate-500/10` + `border-slate-500/30`

**Lineage Colors (Advanced Simulator):**
- Paternal: `bg-blue-50 dark:bg-blue-950/20`
- Maternal: `bg-pink-50 dark:bg-pink-950/20`

**Badges:**
- Dilución: `variant="secondary"`
- Patrón: `variant="secondary"`
- Letal: `variant="destructive"` (red)
- Primitivas: `variant="outline"`

### Animations

**Entry Animations:**
```typescript
// Staggered cards
initial={{ opacity: 0, y: 30 }}
whileInView={{ opacity: 1, y: 0 }}
transition={{ delay: idx * 0.1, duration: 0.5 }}
viewport={{ once: true }}
```

**Expand/Collapse:**
```typescript
<AnimatePresence>
  <motion.div
    initial={{ height: 0, opacity: 0 }}
    animate={{ height: "auto", opacity: 1 }}
    exit={{ height: 0, opacity: 0 }}
    transition={{ duration: 0.3 }}
  />
</AnimatePresence>
```

**Hover Effects:**
- Image: `group-hover:scale-110` (700ms)
- Card: `hover:shadow-2xl` + border color shift
- Smooth transitions: `transition-all duration-500`

---

## 📱 Responsive Behavior

### Breakpoints

**Section 1 - Gallery:**
- Mobile: 1 column
- `lg:`: 2 columns
- `xl:`: 3 columns

**Section 2 - Breeds:**
- Mobile: 1 column
- `md:`: 2 columns
- `lg:`: 3 columns

**Section 3 - Simulator:**
- Mobile: Stacked
- `lg:`: Side-by-side (input + chart)

### Mobile Optimizations

- ✅ Larger touch targets (h-14 buttons)
- ✅ Readable font sizes (never below 14px)
- ✅ Proper spacing for thumbs
- ✅ Cards stack vertically
- ✅ Hero title scales down (6xl → 5xl)

---

## 🎯 User Journey

### 1. Landing

**First Impression:**
- Large, beautiful hero
- Clear value proposition
- 3 obvious next steps (buttons)

### 2. Exploration (Section 1)

**Coat Discovery:**
1. Scroll to gallery
2. See poster-style cards
3. Identify coat by image + name
4. Check genotype at a glance
5. Click "Ver Detalles" for full info
6. View phenotype image
7. Read complete genetic description
8. Check variants

**Information Density:**
- **Collapsed**: Quick reference (name, image, genotype)
- **Expanded**: Deep dive (full description, images, characteristics)

### 3. Context (Section 2)

**Breed Association:**
- See which breeds have this coat
- Understand prevalence
- Make connections (e.g., "Frisón = Negro")

### 4. Application (Section 3)

**Practical Use:**
- Plan breeding
- Predict offspring colors
- Understand probability
- See 3-generation inheritance

---

## 🔧 Technical Implementation

### State Management

```typescript
// Expandable cards
const [expandedCoat, setExpandedCoat] = useState<number | null>(null);

// Simulator - Simple
const [simpleSire, setSimpleSire] = useState<CoatColor>("");
const [simpleDam, setSimpleDam] = useState<CoatColor>("");
const [simpleResults, setSimpleResults] = useState<CoatResult[] | null>(null);

// Simulator - Advanced
const [gen1SireGrandpa, setGen1SireGrandpa] = useState<CoatColor>("");
// ... 3 more grandparents
const [gen2SireResult, setGen2SireResult] = useState<CoatResult[] | null>(null);
const [gen2DamResult, setGen2DamResult] = useState<CoatResult[] | null>(null);
const [gen3Result, setGen3Result] = useState<CoatResult[] | null>(null);
```

### API Integration

**Hooks:**
- `useCoats()` - Fetch all coats
- `useSimulateCoat()` - Breeding simulation

**Data Flow:**
```
API → useCoats() → coats array → map() → Cards
User Input → handleSimulate() → useSimulateCoat() → Results → Pie Chart
```

### Scroll Behavior

**Smooth Navigation:**
```typescript
onClick={() => document.getElementById('gallery')?.scrollIntoView({ behavior: 'smooth' })}
```

**Section IDs:**
- `id="gallery"` - Section 1
- `id="breeds"` - Section 2
- `id="simulator"` - Section 3

**Scroll Margin:**
```css
.scroll-mt-20 /* Offset for fixed headers */
```

---

## 📊 Content Requirements

### For Each Coat

**Minimum Data (Collapsed View):**
- ✅ name
- ✅ englishName
- ✅ imageUrl
- ✅ geneticBase
- ✅ extensionGene
- ✅ agoutiGene
- ✅ Short description

**Full Data (Expanded View):**
- ✅ phenotypeImageUrl
- ✅ Full description
- ✅ bodyColor, maneColor, eyeColor, skinColor
- ✅ variants (JSON array)
- ✅ All dilution genes
- ✅ Classification booleans

### For Breed Associations

**Current:** Hardcoded example object

**Future:** Database table linking breeds ↔ coats

---

## 🚀 Future Enhancements

### Section 1 - Gallery

1. **Filter by Category**
   - Tabs: Base | Dilutions | Patterns | Modifiers
   - Search by name or genotype

2. **Comparison Mode**
   - Select 2-3 coats
   - Side-by-side genetic comparison

3. **Download Cards**
   - Export individual reference cards as PNG
   - Printable fact sheets

### Section 2 - Breeds

1. **Database Integration**
   - Dynamic breed-coat relationships
   - Admin CRUD interface
   - Representative breed flagging

2. **Breed Images**
   - Show example horse photos
   - Click to see breed details

3. **Statistics**
   - "80% of Friesians are black"
   - Rarity indicators

### Section 3 - Simulator

1. **Full Genetic Profiles**
   - Use complete genotype from database
   - Not just simple coat names
   - Show Punnett squares

2. **Export Results**
   - Download probability chart
   - PDF breeding report

3. **Breeding History**
   - Save simulations
   - Compare scenarios

---

## ✨ Key Improvements Over Previous Design

### 1. Better Information Architecture

**Before:**
- Coats and simulator mixed together
- No context about breeds
- All info visible at once (overwhelming)

**After:**
- Three clear sections
- Logical progression (explore → contextualize → apply)
- Progressive disclosure (expand for details)

### 2. Enhanced Visuals

**Before:**
- Small images (192px)
- Genetic info in small badges
- No secondary images

**After:**
- Large poster images (320px)
- Prominent genetic display
- Phenotype images in expanded view
- Genotype badge on image overlay

### 3. Educational Value

**Before:**
- Just coat gallery + simulator

**After:**
- Coat gallery (what)
- Breed associations (who)
- Simulator (how)
- Expandable details (why)

### 4. User Experience

**Before:**
- Long page with everything
- No clear navigation
- Information overload

**After:**
- Hero with 3 clear CTAs
- Smooth scroll navigation
- Expandable sections
- Progressive disclosure
- Generous whitespace

---

## 📐 Layout Measurements

### Section Spacing

```css
Hero Header: py-24 mb-20
Container: space-y-32 (128px between sections)
Section Headers: mb-16
Card Gaps: gap-8
```

### Card Dimensions

```
Gallery Card:
- Image: h-80 (320px)
- Total (collapsed): ~600px
- Total (expanded): Dynamic (auto)

Breed Card:
- Height: Auto (content-driven)
- Padding: p-6

Simulator:
- Chart: h-[350px]
- Input height: Auto
```

### Typography Scale

```
Hero Title: text-6xl md:text-7xl (60px → 72px+)
Section Title: text-5xl md:text-6xl (48px → 60px)
Card Title: text-3xl (30px)
Body: text-xl (20px) for descriptions
Small: text-sm (14px) for labels
Tiny: text-xs (12px) for badges
```

---

## 🎨 Summary

The new three-section Coats page provides:

1. **Catálogo de Capas** - Beautiful poster gallery with expandable scientific details
2. **Razas por Capa** - Contextual breed associations
3. **Simulador Genético** - Interactive breeding predictions

**Benefits:**
- ✅ Better information architecture
- ✅ Progressive disclosure (not overwhelming)
- ✅ Educational progression (explore → context → apply)
- ✅ Beautiful poster-style aesthetics
- ✅ Expandable details for deep dives
- ✅ Smooth animations and transitions
- ✅ Fully responsive
- ✅ Clear navigation

**User Flow:**
1. Land on hero → Choose section
2. Explore coats → Expand for details
3. See breed context → Make connections
4. Use simulator → Plan breeding

The page is now a **comprehensive educational resource** with professional design and intuitive UX! 🐴✨
