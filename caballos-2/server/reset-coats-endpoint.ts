/**
 * Admin utility endpoint to reset coat data
 * This will be added as a protected admin route
 */

import { db } from "./db";
import { coats, coatCategories } from "../shared/schema";
import { COAT_CATEGORIES, COATS_DATA } from "./coat-seed-data";

export async function resetAndSeedCoats() {
  console.log("🗑️  Deleting existing coats...");
  await db.delete(coats);

  console.log("🗑️  Deleting existing categories...");
  await db.delete(coatCategories);

  console.log("📦 Seeding coat categories...");
  const createdCategories = [];
  for (const category of COAT_CATEGORIES) {
    const [created] = await db.insert(coatCategories).values(category).returning();
    createdCategories.push(created);
  }

  console.log("📦 Seeding coats...");
  const categoryMap = new Map(
    createdCategories.map(cat => [cat.name, cat.id])
  );

  // Assign coats to categories
  const coatAssignments = [
    { start: 0, end: 3, categoryName: "Capas Base" },
    { start: 3, end: 11, categoryName: "Diluciones Simples" },
    { start: 11, end: 14, categoryName: "Diluciones Dobles" },
    { start: 14, end: 15, categoryName: "Tordos" },
    { start: 15, end: 18, categoryName: "Ruanos" },
    { start: 18, end: 22, categoryName: "Píos" },
    { start: 22, end: 25, categoryName: "Apalusa" },
    { start: 25, end: 28, categoryName: "Modificadores" },
    { start: 28, end: 29, categoryName: "Capas Especiales" },
  ];

  let totalCreated = 0;
  for (const assignment of coatAssignments) {
    const categoryId = categoryMap.get(assignment.categoryName);
    if (!categoryId) continue;

    for (let i = assignment.start; i < assignment.end; i++) {
      const coatData = COATS_DATA[i];
      if (coatData) {
        await db.insert(coats).values({
          ...coatData,
          categoryId,
        });
        totalCreated++;
      }
    }
  }

  console.log(`✅ Successfully created ${createdCategories.length} categories and ${totalCreated} coats!`);

  return {
    categoriesCreated: createdCategories.length,
    coatsCreated: totalCreated,
  };
}
