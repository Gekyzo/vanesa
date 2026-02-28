import { db } from "./db";
import { breeds } from "../shared/schema";
import { WORLD_BREEDS_DATA } from "./world-breeds-seed-data";
import { eq } from "drizzle-orm";

/**
 * Seed World Breeds Data
 *
 * This script populates the breeds table with horse breeds from around the world.
 * Organized by continents: Europe, Asia, Africa, North America, Central America & Caribbean,
 * South America, and Oceania, plus special categories (donkeys, zebras, hybrids).
 *
 * Run this script using: tsx server/seed-world-breeds.ts
 */

async function seedWorldBreeds() {
  try {
    console.log("🌍 Starting world breeds seed...");

    // Clear existing non-Spanish breeds
    console.log("Clearing existing non-Spanish breeds...");
    await db.delete(breeds).where(eq(breeds.isSpanish, false));

    // Insert world breeds
    console.log(`\nInserting ${WORLD_BREEDS_DATA.length} world breeds...`);

    let count = 0;
    for (const breed of WORLD_BREEDS_DATA) {
      await db.insert(breeds).values(breed);
      count++;
      console.log(`✓ [${count}/${WORLD_BREEDS_DATA.length}] Added: ${breed.name} (${breed.country})`);
    }

    console.log("\n✨ World breeds seed completed successfully!");
    console.log(`Total breeds added: ${WORLD_BREEDS_DATA.length}`);

    // Summary by region
    const regions = WORLD_BREEDS_DATA.reduce((acc, breed) => {
      const region = breed.region || "Unknown";
      acc[region] = (acc[region] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);

    console.log("\n📊 Breeds by region:");
    Object.entries(regions)
      .sort(([, a], [, b]) => b - a)
      .forEach(([region, count]) => {
        console.log(`   ${region}: ${count} breeds`);
      });

    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding world breeds:", error);
    process.exit(1);
  }
}

seedWorldBreeds();
