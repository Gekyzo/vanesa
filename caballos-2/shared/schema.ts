
import { pgTable, text, serial, boolean, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

// === TABLE DEFINITIONS ===

export const admins = pgTable("admins", {
  id: serial("id").primaryKey(),
  provider: text("provider"), // 'google', 'facebook', or 'local' (nullable for email/password)
  providerId: text("provider_id"), // OAuth provider ID (nullable for email/password)
  email: text("email").notNull().unique(),
  name: text("name").notNull(),
  passwordHash: text("password_hash"), // For email/password authentication
  emailVerified: boolean("email_verified").default(false).notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const breeds = pgTable("breeds", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  country: text("country").notNull(),
  region: text("region"), // 'España', 'Europa', 'Asia', 'África', 'Norteamérica', 'Centroamérica y Caribe', 'Sudamérica', 'Oceanía', 'Burros', 'Cebras', 'Híbridos'
  bloodType: text("blood_type").notNull(), // 'hot', 'cold', 'warm'
  temperament: text("temperament").notNull(),
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  isSpanish: boolean("is_spanish").default(false).notNull(),
  height: text("height"),
  uses: text("uses"),
  history: text("history"),
  breedingLocation: text("breeding_location"), // Where the breed is traditionally raised
  typicalCoats: text("typical_coats"), // Typical coat colors (e.g., "tordo, alazán, castaño")
});

export const coatCategories = pgTable("coat_categories", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  description: text("description"),
  displayOrder: integer("display_order").notNull().default(0),
});

export const coats = pgTable("coats", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(), // e.g., 'Alazán', 'Tordo'
  englishName: text("english_name"), // e.g., 'Chestnut', 'Gray'
  description: text("description").notNull(),
  imageUrl: text("image_url").notNull(),
  phenotypeImageUrl: text("phenotype_image_url"), // Visual appearance image

  // Genetic information
  geneticBase: text("genetic_base"), // Simplified genetic notation (e.g., "ee", "E_ A_")
  genotype: text("genotype"), // Detailed genotype (e.g., "EE aa", "Ee Aa")
  geneDominance: text("gene_dominance"), // 'dominant', 'recessive', 'co-dominant', 'incomplete-dominant'

  // Extension gene (E/e) - controls eumelanin production
  extensionGene: text("extension_gene"), // "EE", "Ee", "ee"

  // Agouti gene (A/a) - controls eumelanin distribution
  agoutiGene: text("agouti_gene"), // "AA", "Aa", "aa"

  // Dilution genes
  creamGene: text("cream_gene"), // "N/N", "N/Cr", "Cr/Cr"
  pearlGene: text("pearl_gene"), // "N/N", "N/Prl", "Prl/Prl"
  dunGene: text("dun_gene"), // "N/N", "N/D", "D/D"
  silverGene: text("silver_gene"), // "N/N", "N/Z", "Z/Z"
  champagneGene: text("champagne_gene"), // "N/N", "N/Ch", "Ch/Ch"

  // Pattern genes
  grayGene: text("gray_gene"), // "N/N", "N/G", "G/G" (lethal in G/G)
  roanGene: text("roan_gene"), // "N/N", "N/Rn", "Rn/Rn" (lethal in Rn/Rn)
  tobianoGene: text("tobiano_gene"), // "N/N", "N/TO", "TO/TO"
  frameGene: text("frame_gene"), // "N/N", "N/O" (lethal in O/O - OLWS)
  sabinoGene: text("sabino_gene"), // "N/N", "N/SB1", "SB1/SB1"
  splashedWhiteGene: text("splashed_white_gene"), // "N/N", "N/SW", "SW/SW"
  leopardComplexGene: text("leopard_complex_gene"), // "N/N", "N/LP", "LP/LP"

  // Modifiers
  pangareModifier: boolean("pangare_modifier").default(false),
  rabicanoModifier: boolean("rabicano_modifier").default(false),
  flaxenModifier: boolean("flaxen_modifier").default(false),
  sootyModifier: boolean("sooty_modifier").default(false),

  // Characteristics
  baseCoat: text("base_coat"), // 'alazán', 'castaño', 'negro'
  isDilution: boolean("is_dilution").default(false),
  isPattern: boolean("is_pattern").default(false),
  isLethal: boolean("is_lethal").default(false), // If homozygous is lethal

  // Phenotype details
  bodyColor: text("body_color"), // Description of body color
  maneColor: text("mane_color"), // Description of mane and tail color
  eyeColor: text("eye_color"), // Description of eye color
  skinColor: text("skin_color"), // Description of skin color

  // Additional info
  primitiveMarkings: boolean("primitive_markings").default(false), // Dorsal stripe, leg barring, etc.
  variants: text("variants"), // JSON array of variant names

  categoryId: integer("category_id").references(() => coatCategories.id),
  displayOrder: integer("display_order").notNull().default(0),
});

export const mediaEntries = pgTable("media_entries", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  type: text("type").notNull(), // 'movie', 'series', 'documentary', 'ad'
  description: text("description").notNull(),
  linkUrl: text("link_url"),
  imageUrl: text("image_url"),
});

export const cultureArticles = pgTable("culture_articles", {
  id: serial("id").primaryKey(),
  title: text("title").notNull(),
  category: text("category").notNull(), // 'psychology', 'history', 'mythology'
  content: text("content").notNull(),
  imageUrl: text("image_url"),
});

// === SCHEMAS ===

export const insertAdminSchema = createInsertSchema(admins).omit({ id: true, createdAt: true });
export const insertBreedSchema = createInsertSchema(breeds).omit({ id: true });
export const insertCoatCategorySchema = createInsertSchema(coatCategories).omit({ id: true });
export const insertCoatSchema = createInsertSchema(coats).omit({ id: true });
export const insertMediaEntrySchema = createInsertSchema(mediaEntries).omit({ id: true });
export const insertCultureArticleSchema = createInsertSchema(cultureArticles).omit({ id: true });

// === TYPES ===

export type Admin = typeof admins.$inferSelect;
export type InsertAdmin = z.infer<typeof insertAdminSchema>;

export type Breed = typeof breeds.$inferSelect;
export type InsertBreed = z.infer<typeof insertBreedSchema>;

export type CoatCategory = typeof coatCategories.$inferSelect;
export type InsertCoatCategory = z.infer<typeof insertCoatCategorySchema>;

export type Coat = typeof coats.$inferSelect;
export type InsertCoat = z.infer<typeof insertCoatSchema>;

export type MediaEntry = typeof mediaEntries.$inferSelect;
export type InsertMediaEntry = z.infer<typeof insertMediaEntrySchema>;

export type CultureArticle = typeof cultureArticles.$inferSelect;
export type InsertCultureArticle = z.infer<typeof insertCultureArticleSchema>;

// === COAT GENETICS ENUMS AND CONSTANTS ===

export const BASE_COATS = {
  ALAZAN: 'alazán',
  CASTANO: 'castaño',
  NEGRO: 'negro',
} as const;

export const GENE_DOMINANCE = {
  DOMINANT: 'dominant',
  RECESSIVE: 'recessive',
  CO_DOMINANT: 'co-dominant',
  INCOMPLETE_DOMINANT: 'incomplete-dominant',
} as const;

// Gene alleles
export const EXTENSION_ALLELES = ['EE', 'Ee', 'ee'] as const;
export const AGOUTI_ALLELES = ['AA', 'Aa', 'aa'] as const;
export const DILUTION_ALLELES = ['N/N', 'N/Cr', 'Cr/Cr', 'N/Prl', 'Prl/Prl', 'N/D', 'D/D', 'N/Z', 'Z/Z', 'N/Ch', 'Ch/Ch'] as const;
export const PATTERN_ALLELES = ['N/N', 'N/G', 'G/G', 'N/Rn', 'Rn/Rn', 'N/TO', 'TO/TO', 'N/O', 'N/SB1', 'SB1/SB1', 'N/SW', 'SW/SW', 'N/LP', 'LP/LP'] as const;

// Coat category types
export const COAT_CATEGORY_TYPES = {
  BASE: 'base',
  DILUTION_SIMPLE: 'dilution-simple',
  DILUTION_DOUBLE: 'dilution-double',
  PATTERN: 'pattern',
  MODIFIER: 'modifier',
  SPECIAL: 'special',
} as const;

export type BaseCoat = typeof BASE_COATS[keyof typeof BASE_COATS];
export type GeneDominance = typeof GENE_DOMINANCE[keyof typeof GENE_DOMINANCE];
export type ExtensionAllele = typeof EXTENSION_ALLELES[number];
export type AgoutiAllele = typeof AGOUTI_ALLELES[number];
export type CoatCategoryType = typeof COAT_CATEGORY_TYPES[keyof typeof COAT_CATEGORY_TYPES];

// Request Types
export type SimulateCoatRequest = {
  sireColor: string; // Father
  damColor: string;  // Mother
};

export type SimulationResult = {
  probabilities: {
    colorName: string;
    percentage: number;
  }[];
};

// Advanced simulation with full genetic data
export type GeneticProfile = {
  extensionGene: string;
  agoutiGene: string;
  creamGene?: string;
  pearlGene?: string;
  dunGene?: string;
  silverGene?: string;
  champagneGene?: string;
  grayGene?: string;
  roanGene?: string;
  tobianoGene?: string;
  frameGene?: string;
  sabinoGene?: string;
  splashedWhiteGene?: string;
  leopardComplexGene?: string;
  pangareModifier?: boolean;
  rabicanoModifier?: boolean;
  flaxenModifier?: boolean;
  sootyModifier?: boolean;
};

export type AdvancedSimulationRequest = {
  sireGenetics: GeneticProfile;
  damGenetics: GeneticProfile;
};

export type AdvancedSimulationResult = {
  offspring: {
    genetics: GeneticProfile;
    phenotype: string;
    probability: number;
  }[];
};
