import { db } from "./server/db";
import { coats, coatCategories } from "./shared/schema";

async function resetCoats() {
  console.log("Deleting existing coats and categories...");
  await db.delete(coats);
  await db.delete(coatCategories);
  console.log("Done! Restart the server to re-seed the data.");
  process.exit(0);
}

resetCoats().catch(console.error);
