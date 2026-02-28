# Spanish Horse Breeds - Implementation Guide

This document describes the Spanish horse breeds data implementation for the Caballos-2 project.

## Overview

The project now includes comprehensive data for **17 Spanish horse breeds**, covering their characteristics, history, uses, and breeding locations.

## Database Schema Changes

Two new fields have been added to the `breeds` table:

### New Fields

1. **breedingLocation** (`breeding_location`)
   - Type: `text` (optional)
   - Description: Geographic location where the breed is traditionally raised
   - Example: "Jerez de la Frontera", "Montañas de Asturias"

2. **typicalCoats** (`typical_coats`)
   - Type: `text` (optional)
   - Description: Typical coat colors for the breed
   - Example: "Tordo, alazán, castaño", "Negro"

### Updated Schema Location

The schema has been updated in:
- [shared/schema.ts](shared/schema.ts) - Lines 31-32

## Data Files

### 1. Seed Data File

**Location:** [server/spanish-breeds-seed-data.ts](server/spanish-breeds-seed-data.ts)

This file contains:
- `SPANISH_BREEDS_DATA`: Array of 17 Spanish breed objects
- `EXTINCT_SPANISH_BREEDS_NOTES`: Historical notes about extinct Spanish breeds

### 2. Seed Script

**Location:** [server/seed-spanish-breeds.ts](server/seed-spanish-breeds.ts)

This script:
- Clears existing Spanish breeds from the database
- Inserts all 17 Spanish breeds
- Provides console feedback during the process

## Spanish Breeds Included

1. **Andaluz (Pura Raza Española – PRE)** - Jerez de la Frontera
2. **Cartujano** - Cartuja de Jerez de la Frontera
3. **Asturcón** - Montañas de Asturias
4. **Burguete** - Valle del Pirineo Navarro y zona de Roncal
5. **Caballo de Deporte Español (CDE)** - Castilla y León
6. **Gallego** - Galicia
7. **Hispano-Árabe** - España central y sur
8. **Hispano-Bretón** - Pirineos, León y Palencia
9. **Hispano-Luso** - Salamanca y Zamora
10. **Jaca Navarra** - Pirineos de Navarra
11. **Losino** - Losas, Burgos
12. **Mallorquín** - Mallorca
13. **Marismeño** - Marismas del Guadalquivir, Sevilla
14. **Menorquín** - Menorca
15. **Monchino** - Sierra de Huelva
16. **Pottoka** - Montes de Navarra y País Vasco
17. **Trotador Español** - Cataluña

## Usage

### Running the Seed Script

To populate the database with Spanish breeds data:

```bash
npm run seed:spanish-breeds
```

This command:
1. Clears any existing Spanish breeds (`isSpanish: true`)
2. Inserts all 17 breeds from the seed data
3. Displays progress for each breed added

### Accessing Spanish Breeds

The Spanish breeds can be accessed via:

1. **Frontend Route:** `http://localhost:5000/breeds-spanish`
   - Automatically filters to show only Spanish breeds
   - Shows Spanish title: "Razas Españolas"
   - Description in Spanish highlighting all 17 breeds
   - All Spanish breeds are displayed by default

2. **API Endpoint:** `http://localhost:5000/api/breeds?isSpanish=true`
   - Returns JSON array of Spanish breeds only
   - Can be combined with other filters (search, bloodType)
   - Example: `/api/breeds?isSpanish=true&bloodType=hot`

3. **All Breeds Page:** `http://localhost:5000/breeds`
   - Shows all breeds with filtering options
   - Toggle "Spanish Breeds Only" switch to filter
   - Currently contains only Spanish breeds (world breeds to be added separately)

### Data Structure

Each breed object includes:

```typescript
{
  name: string;              // Breed name
  country: string;           // "España"
  bloodType: string;         // "hot", "warm", or "cold"
  temperament: string;       // Personality traits
  description: string;       // Detailed description
  imageUrl: string;          // Image path
  isSpanish: boolean;        // true for all Spanish breeds
  height: string;            // Height range and weight
  uses: string;              // Primary uses
  history: string;           // Historical information
  breedingLocation: string;  // Where traditionally bred
  typicalCoats: string;      // Typical coat colors
}
```

## Blood Types

The breeds are categorized by blood type:

- **Hot Blood (Sangre caliente)**: 9 breeds
  - Andaluz, Cartujano, CDE, Hispano-Árabe, Mallorquín, Marismeño, Menorquín, Hispano-Luso, Trotador Español

- **Warm Blood (Sangre templada)**: 8 breeds
  - Asturcón, Burguete, Gallego, Hispano-Bretón, Jaca Navarra, Losino, Monchino, Pottoka

## Extinct Breeds

Historical notes about extinct Spanish breeds are included in the data file:
- Pura Raza Española antigua (ancient local forms)
- Caballos de tiro de León y Castilla antiguos (ancient draft horses)

These are documented for historical preservation purposes.

## Next Steps

### Suggested Implementations

1. **Frontend Display**
   - Create a Spanish breeds page/section
   - Display breeds by region on a map
   - Filter by blood type, height, or use

2. **Image Assets**
   - Add actual images to `/public/images/breeds/`
   - Current paths are placeholders

3. **API Endpoints**
   - Add endpoint to fetch Spanish breeds: `GET /api/breeds?isSpanish=true`
   - Add endpoint to filter by region/location

4. **Internationalization**
   - Add English translations for breed names and descriptions
   - Store translations in i18n system

## Database Migration

The schema changes have been applied via:

```bash
npm run db:push
```

This command synchronized the schema with the database, adding the two new fields to the `breeds` table.

## Notes

- All breeds have `isSpanish: true` flag for easy filtering
- Image URLs are placeholders and should be replaced with actual images
- The data includes comprehensive historical and cultural information
- Breeding locations use the original Spanish locality names
- Typical coats are listed in Spanish (tordo, alazán, castaño, negro)

## References

Original data source format included:
- Localidad de cría (Breeding location)
- Tipo de sangre (Blood type)
- Altura y peso (Height and weight)
- Capa típica (Typical coat)
- Uso habitual (Typical use)
- Notas / Caballos históricos (Notes / Historical horses)

All this information has been properly structured and integrated into the database schema.
