# 🐴 How to Use the Comprehensive Coat System

## 🚀 Quick Start

### 1. Load the Comprehensive Coat Data

You now have a **"Reset & Seed Data"** button in the Admin Coats page!

**Steps:**
1. Navigate to the admin panel: `/admin/login`
2. Log in with your admin credentials
3. Go to **Admin → Coats**
4. Click the **"Reset & Seed Data"** button (with refresh icon)
5. Confirm the action

**What happens:**
- Deletes all existing coats and categories
- Creates **9 coat categories**
- Seeds **29 comprehensive coats** with full genetic data
- Displays success message with counts

**Result:**
- ✅ 9 categories (Capas Base, Diluciones Simples, Diluciones Dobles, etc.)
- ✅ 29 coats (Alazán, Castaño, Negro, Palomino, Buckskin, Grullo, etc.)
- ✅ Full genetic notation for each coat
- ✅ Spanish and English names
- ✅ Detailed phenotype descriptions

---

## 📖 What's Included

### The 29 Coats

#### Base Coats (3)
1. **Alazán** (Chestnut) - ee
2. **Castaño** (Bay) - E_ A_
3. **Negro** (Black) - E_ aa

#### Simple Dilutions (8)
4. **Palomino** - Alazán + Cream
5. **Buckskin** - Castaño + Cream
6. **Smoky Black** - Negro + Cream
7. **Red Dun** - Alazán + Dun
8. **Bay Dun** - Castaño + Dun
9. **Grullo** - Negro + Dun
10. **Silver Bay** - Castaño + Silver
11. **Silver Black** - Negro + Silver

#### Double Dilutions (3)
12. **Cremello** - Alazán + Double Cream
13. **Perlino** - Castaño + Double Cream
14. **Smoky Cream** - Negro + Double Cream

#### Gray (1)
15. **Tordo** (Gray) - Progressive graying

#### Roans (3)
16. **Red Roan** - Alazán + Roan
17. **Bay Roan** - Castaño + Roan
18. **Blue Roan** - Negro + Roan

#### Pintos (4)
19. **Tobiano**
20. **Frame Overo** (⚠️ lethal when homozygous)
21. **Sabino**
22. **Splashed White**

#### Appaloosa (3)
23. **Leopardo** (Leopard)
24. **Manta** (Blanket)
25. **Copo de Nieve** (Snowflake)

#### Modifiers (3)
26. **Pangaré** (Mealy)
27. **Rabicano**
28. **Flaxen**

#### Special (1)
29. **Blanco Dominante** (Dominant White)

---

## 🧬 Genetic Information Included

Each coat includes:

### Core Genetics
- ✅ **geneticBase** - Simplified notation (e.g., "ee", "E_ A_")
- ✅ **genotype** - Detailed genotype
- ✅ **extensionGene** - E/e alleles
- ✅ **agoutiGene** - A/a alleles

### Dilution Genes
- ✅ **creamGene** - N/Cr
- ✅ **pearlGene** - N/Prl
- ✅ **dunGene** - N/D
- ✅ **silverGene** - N/Z
- ✅ **champagneGene** - N/Ch

### Pattern Genes
- ✅ **grayGene** - N/G
- ✅ **roanGene** - N/Rn
- ✅ **tobianoGene** - N/TO
- ✅ **frameGene** - N/O
- ✅ **sabinoGene** - N/SB1
- ✅ **splashedWhiteGene** - N/SW
- ✅ **leopardComplexGene** - N/LP

### Modifiers
- ✅ **pangareModifier** - Boolean
- ✅ **rabicanoModifier** - Boolean
- ✅ **flaxenModifier** - Boolean
- ✅ **sootyModifier** - Boolean

### Phenotype Details
- ✅ **bodyColor** - Description
- ✅ **maneColor** - Description
- ✅ **eyeColor** - Description
- ✅ **skinColor** - Description
- ✅ **primitiveMarkings** - Boolean (dorsal stripe, leg barring)
- ✅ **variants** - JSON array of variant names

### Classification
- ✅ **baseCoat** - alazán, castaño, or negro
- ✅ **isDilution** - Boolean
- ✅ **isPattern** - Boolean
- ✅ **isLethal** - Boolean (if homozygous)
- ✅ **englishName** - English translation

---

## 🧪 Test the Genetics Simulator

### Using the Public Coat Simulator

1. Navigate to **Coats** page (public)
2. Select a **sire color** (father)
3. Select a **dam color** (mother)
4. Click **"Simulate Breeding"**
5. View offspring probabilities

**Example Test:**
- Sire: Palomino
- Dam: Buckskin
- Result: Will show probabilities for Castaño, Alazán, Buckskin, Palomino, Perlino, Cremello, etc.

The simulator now uses **real Mendelian genetics** based on Extension (E/e) and Agouti (A/a) genes!

---

## 📊 View Coat Data

### Admin Panel

**Navigate to:** `/admin/coats`

**Features:**
- View all coats in a table
- Filter by category
- See genotype and dominance for each coat
- Edit coat details
- Delete coats
- Add new coats
- **Reset & Seed Data** button (new!)

### Public Coat Gallery

**Navigate to:** `/coats`

**Features:**
- Browse all available coats
- View coat images
- See genetic information
- Use breeding simulator
- Advanced mode for 3-generation predictions

---

## 🎯 API Endpoints

### Public Endpoints

```bash
# Get all coats
GET /api/coats

# Simulate breeding
POST /api/coats/simulate
Body: { sireColor: "Palomino", damColor: "Buckskin" }
```

### Admin Endpoints (Requires Authentication)

```bash
# List coats (optional category filter)
GET /api/admin/coats?categoryId=1

# Get specific coat
GET /api/admin/coats/:id

# Create coat
POST /api/admin/coats
Body: InsertCoat object

# Update coat
PUT /api/admin/coats/:id
Body: InsertCoat object

# Delete coat
DELETE /api/admin/coats/:id

# Reset and seed all coat data (NEW!)
POST /api/admin/coats/reset-seed
```

---

## 🔬 Understanding Genetic Notation

### Quick Reference

| Notation | Meaning |
|----------|---------|
| **ee** | Homozygous recessive Extension (Alazán base) |
| **E_** | At least one E allele (Castaño or Negro base) |
| **aa** | Homozygous recessive Agouti (Negro if E_) |
| **A_** | At least one A allele (Castaño if E_) |
| **N/N** | No copies of dilution/pattern gene |
| **N/Cr** | One copy of Cream gene (heterozygous) |
| **Cr/Cr** | Two copies of Cream gene (homozygous) |

### Example Breakdown

**Palomino:**
```
Genotype: ee N/Cr
         ││ └──┴─ One Cream allele
         └└─ Chestnut base (no black pigment)

Result: Red base diluted to gold
```

**Grullo:**
```
Genotype: E_ aa N/D
         ││ ││ └─┴─ One Dun allele
         ││ └─┴─ Black base (no Agouti restriction)
         └└─ Produces eumelanin

Result: Black base diluted to slate gray + primitive markings
```

For more details, see: [GENETIC_NOTATION_GUIDE.md](GENETIC_NOTATION_GUIDE.md)

---

## 🎨 What You Can Do Now

### 1. Browse Comprehensive Coat Data
- View all 29 coats with full genetic information
- Filter by category (9 categories)
- See Spanish and English names

### 2. Use Genetic Simulator
- Test breeding combinations
- See realistic offspring probabilities
- Based on actual Mendelian genetics

### 3. Manage Coats (Admin)
- Add custom coats
- Edit existing coats
- Organize by categories
- Reset to comprehensive seed data anytime

### 4. Learn Horse Genetics
- Each coat includes educational descriptions
- Genetic notation explained
- Phenotype characteristics detailed

---

## 🛠️ Troubleshooting

### "I only see 3 old coats"

**Solution:** Click the **"Reset & Seed Data"** button in the Admin Coats page.

### "The simulator shows simple results"

**Cause:** The simulator currently maps coat names to basic genetic profiles.

**Future Enhancement:** Link coats to database for full genetic profile simulation.

### "I want to add a new coat"

**Steps:**
1. Go to Admin → Coats
2. Click "Add Coat"
3. Fill in the form (name, description, genetics, etc.)
4. Select appropriate category
5. Save

---

## 📚 Additional Resources

### Documentation Files

- **[COAT_IMPLEMENTATION.md](COAT_IMPLEMENTATION.md)** - Complete technical implementation
- **[GENETIC_NOTATION_GUIDE.md](GENETIC_NOTATION_GUIDE.md)** - Genetic notation reference
- **[server/coat-seed-data.ts](server/coat-seed-data.ts)** - All 29 coat definitions
- **[server/genetics-simulator.ts](server/genetics-simulator.ts)** - Simulation engine

### Original Guide

Based on: **"Capas del Caballo – Guía genética y fenotípica completa"**

### Key Genetic Principles

1. **Extension gene (E/e)** - Controls black pigment production
2. **Agouti gene (A/a)** - Controls black pigment distribution
3. **Alazán is always recessive (ee)**
4. **True black requires E_ + aa**
5. **Multiple genes create final phenotype**

---

## 🎓 Educational Features

### Coat Variants Included

Each coat lists its variants. For example:

**Alazán variants:**
- Alazán claro (light)
- Alazán medio (medium)
- Alazán oscuro (dark)
- Alazán tostado (liver)
- Alazán cobrizo (copper)
- Alazán flaxen (light mane)

### Lethal Combinations Marked

Coats with lethal homozygous forms are flagged:
- ⚠️ **Frame Overo** (O/O) - OLWS (Lethal)
- ⚠️ **Gray** (G/G) - May be lethal
- ⚠️ **Roan** (Rn/Rn) - May be lethal

### Phenotype Characteristics

Each coat describes:
- Body color appearance
- Mane and tail color
- Eye color
- Skin color
- Special markings (if any)

---

## 🚀 Next Steps

### Immediate
1. ✅ Click "Reset & Seed Data" to load all 29 coats
2. ✅ Browse the coats in the admin panel
3. ✅ Test the breeding simulator
4. ✅ Explore the genetic notation

### Future Enhancements
- Link simulator to full genetic profiles from database
- Add visual genetic diagrams
- Create interactive Punnett squares
- Add breed-specific coat associations
- Implement multi-generation predictions

---

## 💡 Tips

1. **Start Fresh:** Use the "Reset & Seed Data" button to get the comprehensive dataset
2. **Explore Categories:** Use the category filter to focus on specific coat types
3. **Learn by Simulating:** Try different breeding combinations to understand genetics
4. **Read Descriptions:** Each coat has detailed genetic and phenotype information
5. **Check Variants:** Many coats have multiple variants listed

---

**🎉 You now have a complete, genetically accurate horse coat system with 29 comprehensive coats!**

For questions or issues, refer to:
- [COAT_IMPLEMENTATION.md](COAT_IMPLEMENTATION.md)
- [GENETIC_NOTATION_GUIDE.md](GENETIC_NOTATION_GUIDE.md)
