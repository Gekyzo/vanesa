
import {
  breeds, coats, coatCategories, mediaEntries, cultureArticles, admins,
  type Breed, type InsertBreed,
  type Coat, type InsertCoat,
  type CoatCategory, type InsertCoatCategory,
  type MediaEntry, type InsertMediaEntry,
  type CultureArticle, type InsertCultureArticle,
  type Admin, type InsertAdmin
} from "@shared/schema";
import { db } from "./db";
import { eq, ilike, or, and, asc } from "drizzle-orm";

export interface IStorage {
  // Admins
  getAdminById(id: number): Promise<Admin | undefined>;
  getAdminByProviderId(provider: string, providerId: string): Promise<Admin | undefined>;
  getAdminByEmail(email: string): Promise<Admin | undefined>;
  createAdmin(admin: InsertAdmin): Promise<Admin>;

  // Breeds
  getBreeds(filters?: { search?: string, isSpanish?: boolean, bloodType?: string }): Promise<Breed[]>;
  getBreed(id: number): Promise<Breed | undefined>;
  createBreed(breed: InsertBreed): Promise<Breed>;

  // Coats
  getCoats(filters?: { categoryId?: number }): Promise<Coat[]>;
  getCoat(id: number): Promise<Coat | undefined>;
  createCoat(coat: InsertCoat): Promise<Coat>;
  updateCoat(id: number, coat: InsertCoat): Promise<Coat | undefined>;
  deleteCoat(id: number): Promise<boolean>;

  // Coat Categories
  getCoatCategories(): Promise<CoatCategory[]>;
  getCoatCategory(id: number): Promise<CoatCategory | undefined>;
  createCoatCategory(category: InsertCoatCategory): Promise<CoatCategory>;
  updateCoatCategory(id: number, category: InsertCoatCategory): Promise<CoatCategory | undefined>;
  deleteCoatCategory(id: number): Promise<boolean>;

  // Media
  getMediaEntries(): Promise<MediaEntry[]>;
  createMediaEntry(entry: InsertMediaEntry): Promise<MediaEntry>;

  // Culture
  getCultureArticles(): Promise<CultureArticle[]>;
  createCultureArticle(article: InsertCultureArticle): Promise<CultureArticle>;
}

export class DatabaseStorage implements IStorage {
  async getAdminById(id: number): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins)
      .where(eq(admins.id, id));
    return admin;
  }

  async getAdminByProviderId(provider: string, providerId: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins)
      .where(and(eq(admins.provider, provider), eq(admins.providerId, providerId)));
    return admin;
  }

  async getAdminByEmail(email: string): Promise<Admin | undefined> {
    const [admin] = await db.select().from(admins)
      .where(eq(admins.email, email));
    return admin;
  }

  async createAdmin(admin: InsertAdmin): Promise<Admin> {
    const [newAdmin] = await db.insert(admins).values(admin).returning();
    return newAdmin;
  }

  async getBreeds(filters?: { search?: string, isSpanish?: boolean, bloodType?: string }): Promise<Breed[]> {
    let conditions = [];
    
    if (filters?.search) {
      conditions.push(ilike(breeds.name, `%${filters.search}%`));
    }
    
    if (filters?.isSpanish !== undefined) {
      conditions.push(eq(breeds.isSpanish, filters.isSpanish));
    }

    if (filters?.bloodType) {
      conditions.push(eq(breeds.bloodType, filters.bloodType));
    }

    if (conditions.length === 0) {
      return await db.select().from(breeds);
    }

    return await db.select().from(breeds).where(and(...conditions));
  }

  async getBreed(id: number): Promise<Breed | undefined> {
    const [breed] = await db.select().from(breeds).where(eq(breeds.id, id));
    return breed;
  }

  async createBreed(breed: InsertBreed): Promise<Breed> {
    const [newBreed] = await db.insert(breeds).values(breed).returning();
    return newBreed;
  }

  async getCoats(filters?: { categoryId?: number }): Promise<Coat[]> {
    if (filters?.categoryId) {
      return await db.select().from(coats)
        .where(eq(coats.categoryId, filters.categoryId))
        .orderBy(asc(coats.displayOrder));
    }
    return await db.select().from(coats).orderBy(asc(coats.displayOrder));
  }

  async getCoat(id: number): Promise<Coat | undefined> {
    const [coat] = await db.select().from(coats).where(eq(coats.id, id));
    return coat;
  }

  async createCoat(coat: InsertCoat): Promise<Coat> {
    const [newCoat] = await db.insert(coats).values(coat).returning();
    return newCoat;
  }

  async updateCoat(id: number, coat: InsertCoat): Promise<Coat | undefined> {
    const [updatedCoat] = await db.update(coats)
      .set(coat)
      .where(eq(coats.id, id))
      .returning();
    return updatedCoat;
  }

  async deleteCoat(id: number): Promise<boolean> {
    const result = await db.delete(coats).where(eq(coats.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getCoatCategories(): Promise<CoatCategory[]> {
    return await db.select().from(coatCategories).orderBy(asc(coatCategories.displayOrder));
  }

  async getCoatCategory(id: number): Promise<CoatCategory | undefined> {
    const [category] = await db.select().from(coatCategories).where(eq(coatCategories.id, id));
    return category;
  }

  async createCoatCategory(category: InsertCoatCategory): Promise<CoatCategory> {
    const [newCategory] = await db.insert(coatCategories).values(category).returning();
    return newCategory;
  }

  async updateCoatCategory(id: number, category: InsertCoatCategory): Promise<CoatCategory | undefined> {
    const [updatedCategory] = await db.update(coatCategories)
      .set(category)
      .where(eq(coatCategories.id, id))
      .returning();
    return updatedCategory;
  }

  async deleteCoatCategory(id: number): Promise<boolean> {
    const result = await db.delete(coatCategories).where(eq(coatCategories.id, id));
    return result.rowCount ? result.rowCount > 0 : false;
  }

  async getMediaEntries(): Promise<MediaEntry[]> {
    return await db.select().from(mediaEntries);
  }

  async createMediaEntry(entry: InsertMediaEntry): Promise<MediaEntry> {
    const [newEntry] = await db.insert(mediaEntries).values(entry).returning();
    return newEntry;
  }

  async getCultureArticles(): Promise<CultureArticle[]> {
    return await db.select().from(cultureArticles);
  }

  async createCultureArticle(article: InsertCultureArticle): Promise<CultureArticle> {
    const [newArticle] = await db.insert(cultureArticles).values(article).returning();
    return newArticle;
  }
}

export const storage = new DatabaseStorage();
