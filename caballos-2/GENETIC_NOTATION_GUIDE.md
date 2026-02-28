# 🧬 Horse Coat Genetics - Quick Reference Guide

## Gene Notation System

### Core Genes

| Gene | Symbol | Alleles | Function |
|------|--------|---------|----------|
| **Extension** | E/e | E (dominant), e (recessive) | Controls eumelanin production |
| **Agouti** | A/a | A (dominant), a (recessive) | Controls eumelanin distribution |

### Dilution Genes

| Gene | Symbol | Alleles | Effect |
|------|--------|---------|--------|
| **Cream** | Cr | N/N, N/Cr, Cr/Cr | Dilutes red to gold, black slightly |
| **Pearl** | Prl | N/N, N/Prl, Prl/Prl | Dilution (visible in homozygous or with Cr) |
| **Dun** | D | N/N, N/D, D/D | Body dilution + primitive markings |
| **Silver** | Z | N/N, N/Z, Z/Z | Dilutes eumelanin (black → chocolate, mane → silver) |
| **Champagne** | Ch | N/N, N/Ch, Ch/Ch | Overall dilution + metallic sheen |

### Pattern Genes

| Gene | Symbol | Alleles | Effect | Notes |
|------|--------|---------|--------|-------|
| **Gray** | G | N/N, N/G, G/G | Progressive graying with age | ⚠️ G/G may be lethal |
| **Roan** | Rn | N/N, N/Rn, Rn/Rn | White hairs mixed with base color | ⚠️ Rn/Rn may be lethal |
| **Tobiano** | TO | N/N, N/TO, TO/TO | White crosses back, defined edges | |
| **Frame Overo** | O | N/N, N/O | White doesn't cross back | ⚠️ O/O is LETHAL (OLWS) |
| **Sabino** | SB1 | N/N, N/SB1, SB1/SB1 | White on face, legs, belly | |
| **Splashed White** | SW | N/N, N/SW, SW/SW | Looks "dipped in white paint" | |
| **Leopard Complex** | LP | N/N, N/LP, LP/LP | Appaloosa patterns | |

### Modifiers

| Modifier | Effect |
|----------|--------|
| **Pangaré** | Lightens muzzle, eyes, belly, flanks |
| **Rabicano** | White hairs in flanks and tail base |
| **Flaxen** | Lightens mane/tail on chestnuts |
| **Sooty** | Darker hairs throughout coat |

---

## Base Coat Determination

### The Three Base Coats

| Genotype | Base Coat | English | Description |
|----------|-----------|---------|-------------|
| **ee** (any A) | Alazán | Chestnut/Sorrel | Red body, red mane/tail |
| **E_ aa** | Negro | Black | Black body, black mane/tail |
| **E_ A_** | Castaño | Bay | Brown body, black points |

**Key Rule:** Extension gene (E/e) is read first, then Agouti (A/a).

---

## Common Coat Combinations

### Simple Dilutions

| Base | + Dilution | = Result | Genotype |
|------|-----------|----------|----------|
| Alazán | + 1 Cream | Palomino | ee N/Cr |
| Castaño | + 1 Cream | Buckskin | E_ A_ N/Cr |
| Negro | + 1 Cream | Smoky Black | E_ aa N/Cr |
| Alazán | + Dun | Red Dun | ee N/D |
| Castaño | + Dun | Bay Dun | E_ A_ N/D |
| Negro | + Dun | Grullo | E_ aa N/D |
| Castaño | + Silver | Silver Bay | E_ A_ N/Z |
| Negro | + Silver | Silver Black | E_ aa N/Z |

### Double Dilutions

| Base | + Dilution | = Result | Genotype |
|------|-----------|----------|----------|
| Alazán | + 2 Cream | Cremello | ee Cr/Cr |
| Castaño | + 2 Cream | Perlino | E_ A_ Cr/Cr |
| Negro | + 2 Cream | Smoky Cream | E_ aa Cr/Cr |

**Characteristics:** Very pale cream/white color, pink skin, blue eyes

### Roan Patterns

| Base | + Roan | = Result |
|------|--------|----------|
| Alazán | + Roan | Red Roan |
| Castaño | + Roan | Bay Roan |
| Negro | + Roan | Blue Roan |

---

## Genotype Reading Examples

### Example 1: Alazán (Chestnut)
```
Genotype: ee AA
         ││ └─ Agouti (doesn't matter since no eumelanin)
         └└─ Extension (homozygous recessive)

Result: Red coat, red mane/tail
Why: No eumelanin produced, only phaeomelanin (red)
```

### Example 2: Castaño (Bay)
```
Genotype: Ee Aa
         ││ └─ Agouti (heterozygous, restricts black to points)
         └└─ Extension (heterozygous, allows eumelanin)

Result: Brown body, black mane/tail/legs
Why: Eumelanin produced but restricted to extremities
```

### Example 3: Negro (Black)
```
Genotype: EE aa
         ││ └─ Agouti (homozygous recessive, no restriction)
         └└─ Extension (homozygous dominant, full eumelanin)

Result: Black coat, black mane/tail
Why: Eumelanin throughout, no restriction
```

### Example 4: Palomino
```
Genotype: ee Aa N/Cr
         ││ ││ └──┴─ Cream gene (heterozygous)
         ││ └─┴─ Agouti (doesn't affect result)
         └└─ Extension (chestnut base)

Result: Golden body, white/cream mane/tail
Why: Red base diluted by one cream gene
```

### Example 5: Grullo
```
Genotype: Ee aa N/D
         ││ ││ └─┴─ Dun gene
         ││ └─┴─ Agouti (black base)
         └└─ Extension (allows eumelanin)

Result: Slate gray body, black mane/tail, dorsal stripe
Why: Black base diluted by dun + primitive markings
```

### Example 6: Blue Roan
```
Genotype: EE aa N/Rn
         ││ ││ └──┴─ Roan gene
         ││ └─┴─ Black base (aa)
         └└─ Extension (eumelanin)

Result: Black and white hairs mixed (blue appearance)
Why: Black base with roan pattern (uniform white hairs)
```

---

## Punnett Square Examples

### Cross 1: Alazán × Castaño

**Sire (Alazán):** ee Aa
**Dam (Castaño):** Ee Aa

**Extension:**
```
     E    e
e   Ee   ee
e   Ee   ee
```
Result: 50% Ee, 50% ee

**Agouti:**
```
     A    a
A   AA   Aa
a   Aa   aa
```
Result: 25% AA, 50% Aa, 25% aa

**Offspring Possibilities:**
- 50% Castaño (E_ A_): 37.5%
- 50% Alazán (ee): 50%
- Negro (E_ aa): 12.5%

### Cross 2: Buckskin × Buckskin

**Both:** Ee Aa N/Cr

**Possible Offspring:**
- Castaño (no dilution): 18.75%
- Buckskin (1 cream): 37.5%
- Perlino (2 cream): 9.375%
- Alazán: 12.5%
- Palomino: 25%
- Cremello: 6.25%
- Negro: 3.125%
- Smoky Black: 6.25%
- Smoky Cream: 1.5625%

---

## Lethal Combinations ⚠️

| Genotype | Result | Why |
|----------|--------|-----|
| **O/O** | Lethal | OLWS (Overo Lethal White Syndrome) - foals die shortly after birth |
| **G/G** | Potentially lethal | May cause embryonic death or high melanoma risk |
| **Rn/Rn** | Potentially lethal | May be embryonically lethal |

**Important:** Never breed two Frame Overo horses without genetic testing!

---

## Quick Identification Guide

### Is it Alazán (Chestnut)?
✅ Body is red/brown
✅ Mane and tail are NEVER black (same color as body or lighter)
✅ Genetically always **ee**

### Is it Castaño (Bay)?
✅ Body is brown
✅ Mane, tail, and lower legs are BLACK
✅ Genetically **E_ A_**

### Is it Negro (Black)?
✅ Entire coat is black (including mane and tail)
✅ Doesn't lighten to brown in sun (true black)
✅ Genetically **E_ aa**

### Is it Tordo (Gray) or Ruano (Roan)?
**Tordo:**
- Changes with age (born dark, gets lighter)
- Head and legs gray too
- Eventually becomes very light/white

**Ruano:**
- Stable from birth
- Head and legs stay base color
- Body has mixed white and colored hairs

### Is it Pío (Pinto) or Apalusa (Appaloosa)?
**Pío:**
- Large white patches
- Clean edges (usually)
- Normal skin under white

**Apalusa:**
- Spotted patterns
- Mottled skin (nose, genitals)
- Striped hooves
- Visible sclera (white of eye)

---

## Genetic Notation Symbols

| Symbol | Meaning |
|--------|---------|
| **E_** | At least one E allele (EE or Ee) |
| **A_** | At least one A allele (AA or Aa) |
| **N/N** | Homozygous normal (no copy of the allele) |
| **N/X** | Heterozygous (one copy of allele X) |
| **X/X** | Homozygous (two copies of allele X) |

---

## Resources

For detailed information, see:
- [COAT_IMPLEMENTATION.md](COAT_IMPLEMENTATION.md) - Full implementation details
- [coat-seed-data.ts](server/coat-seed-data.ts) - All 29 coat definitions
- [genetics-simulator.ts](server/genetics-simulator.ts) - Simulation engine

---

**Remember:** Coat color is complex! Multiple genes interact to produce the final phenotype. Always describe as: **Base + Dilution + Pattern + Modifiers**
