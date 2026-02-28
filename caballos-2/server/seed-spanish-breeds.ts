import { db } from "./db";
import { breeds } from "../shared/schema";
import { SPANISH_BREEDS_DATA } from "./spanish-breeds-seed-data";
import { eq } from "drizzle-orm";

/**
 * Seed Spanish Breeds Data
 *
 * This script populates the breeds table with all 17 Spanish horse breeds.
 * Run this script using: tsx server/seed-spanish-breeds.ts
 */

async function seedSpanishBreeds() {
  try {
    console.log("🐴 Starting Spanish breeds seed...");

    // Clear existing Spanish breeds
    console.log("Clearing existing Spanish breeds...");
    await db.delete(breeds).where(eq(breeds.isSpanish, true));

    // Insert Spanish breeds
    console.log(`Inserting ${SPANISH_BREEDS_DATA.length} Spanish breeds...`);
    for (const breed of SPANISH_BREEDS_DATA) {
      await db.insert(breeds).values(breed);
      console.log(`✓ Added: ${breed.name}`);
    }

    console.log("✨ Spanish breeds seed completed successfully!");
    console.log(`Total breeds added: ${SPANISH_BREEDS_DATA.length}`);

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding Spanish breeds:", error);
    process.exit(1);
  }
}

seedSpanishBreeds();
