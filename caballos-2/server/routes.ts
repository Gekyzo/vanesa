
import type { Express } from "express";
import type { Server } from "http";
import passport from "passport";
import { storage } from "./storage";
import { api } from "@shared/routes";
import { z } from "zod";
import { isAuthenticated, hashPassword, isValidPassword, isValidEmail } from "./auth";
import { COAT_CATEGORIES, COATS_DATA } from "./coat-seed-data";
import { simulateBreeding, parseGenotype, type GeneticProfile, type OffspringProbability } from "./genetics-simulator";
import { resetAndSeedCoats } from "./reset-coats-endpoint";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {

  // Authentication routes
  app.get("/api/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

  app.get(
    "/api/auth/google/callback",
    passport.authenticate("google", { failureRedirect: "/admin/login" }),
    (req, res) => {
      res.redirect("/admin");
    }
  );

  app.get("/api/auth/facebook", passport.authenticate("facebook", { scope: ["email"] }));

  app.get(
    "/api/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/admin/login" }),
    (req, res) => {
      res.redirect("/admin");
    }
  );

  app.get(api.auth.user.path, (req, res) => {
    if (req.isAuthenticated()) {
      const user = req.user as any;
      const { passwordHash, ...userWithoutPassword } = user;
      res.json(userWithoutPassword);
    } else {
      res.status(401).json({ message: "Not authenticated" });
    }
  });

  app.post(api.auth.logout.path, (req, res) => {
    req.logout((err) => {
      if (err) {
        return res.status(500).json({ message: "Logout failed" });
      }
      res.json({ message: "Logged out successfully" });
    });
  });

  // Registration endpoint
  app.post(api.auth.register.path, async (req, res) => {
    try {
      const { email, password, name } = req.body;

      // Validate email format
      if (!isValidEmail(email)) {
        return res.status(400).json({ message: "Invalid email format" });
      }

      // Validate password
      const passwordValidation = isValidPassword(password);
      if (!passwordValidation.valid) {
        return res.status(400).json({ message: passwordValidation.message });
      }

      // Check if user already exists
      const existingAdmin = await storage.getAdminByEmail(email);
      if (existingAdmin) {
        return res.status(400).json({ message: "Email already registered" });
      }

      // Hash password and create admin
      const passwordHash = await hashPassword(password);
      const admin = await storage.createAdmin({
        email,
        name,
        passwordHash,
        provider: "local",
        emailVerified: false,
      });

      // Log the user in
      req.login(admin, (err) => {
        if (err) {
          return res.status(500).json({ message: "Registration successful but login failed" });
        }
        // Remove sensitive data before sending response
        const { passwordHash, ...adminWithoutPassword } = admin;
        res.status(201).json(adminWithoutPassword);
      });
    } catch (error) {
      console.error("Registration error:", error);
      res.status(500).json({ message: "Registration failed" });
    }
  });

  // Login endpoint
  app.post(api.auth.login.path, (req, res, next) => {
    passport.authenticate("local", (err: any, user: any, info: any) => {
      if (err) {
        return res.status(500).json({ message: "Authentication error" });
      }
      if (!user) {
        return res.status(401).json({ message: info?.message || "Invalid credentials" });
      }
      req.login(user, (loginErr) => {
        if (loginErr) {
          return res.status(500).json({ message: "Login failed" });
        }
        // Remove sensitive data before sending response
        const { passwordHash, ...userWithoutPassword } = user;
        res.json(userWithoutPassword);
      });
    })(req, res, next);
  });

  // Breeds
  app.get(api.breeds.list.path, async (req, res) => {
    const filters = {
      search: req.query.search as string | undefined,
      isSpanish: req.query.isSpanish === 'true' ? true : req.query.isSpanish === 'false' ? false : undefined,
      bloodType: req.query.bloodType as string | undefined,
    };
    const breeds = await storage.getBreeds(filters);
    res.json(breeds);
  });

  app.get(api.breeds.get.path, async (req, res) => {
    const breed = await storage.getBreed(Number(req.params.id));
    if (!breed) {
      return res.status(404).json({ message: 'Raza no encontrada' });
    }
    res.json(breed);
  });

  // Coats
  app.get(api.coats.list.path, async (req, res) => {
    const coats = await storage.getCoats();
    res.json(coats);
  });

  app.post(api.coats.simulate.path, async (req, res) => {
    const { sireColor, damColor } = req.body;

    // For now, use simple simulation based on coat names
    // TODO: In the future, use full genetic profiles from the database

    // Map common coat names to basic genetics
    const getBasicGenetics = (coatName: string): GeneticProfile => {
      const normalizedName = coatName.toLowerCase();

      if (normalizedName.includes('alazán') || normalizedName.includes('chestnut')) {
        return {
          extensionGene: ['e', 'e'],
          agoutiGene: ['A', 'a'],
        };
      } else if (normalizedName.includes('castaño') || normalizedName.includes('bay')) {
        return {
          extensionGene: ['E', 'e'],
          agoutiGene: ['A', 'a'],
        };
      } else if (normalizedName.includes('negro') || normalizedName.includes('black')) {
        return {
          extensionGene: ['E', 'e'],
          agoutiGene: ['a', 'a'],
        };
      } else if (normalizedName.includes('palomino')) {
        return {
          extensionGene: ['e', 'e'],
          agoutiGene: ['A', 'a'],
          creamGene: ['N', 'Cr'],
        };
      } else if (normalizedName.includes('buckskin')) {
        return {
          extensionGene: ['E', 'e'],
          agoutiGene: ['A', 'a'],
          creamGene: ['N', 'Cr'],
        };
      } else if (normalizedName.includes('tordo') || normalizedName.includes('gray')) {
        return {
          extensionGene: ['E', 'e'],
          agoutiGene: ['A', 'a'],
          grayGene: ['N', 'G'],
        };
      }

      // Default to bay
      return {
        extensionGene: ['E', 'e'],
        agoutiGene: ['A', 'a'],
      };
    };

    const sireGenetics = getBasicGenetics(sireColor);
    const damGenetics = getBasicGenetics(damColor);

    const offspring = simulateBreeding(sireGenetics, damGenetics);

    // Convert to expected response format
    const probabilities = offspring
      .filter(o => !o.isLethal)
      .map(o => ({
        colorName: o.phenotype,
        percentage: Math.round(o.probability * 100),
      }))
      .sort((a, b) => b.percentage - a.percentage);

    res.json({ probabilities });
  });

  // Media
  app.get(api.media.list.path, async (req, res) => {
    const media = await storage.getMediaEntries();
    res.json(media);
  });

  // Culture
  app.get(api.culture.list.path, async (req, res) => {
    const culture = await storage.getCultureArticles();
    res.json(culture);
  });

  // Admin - Coats (Protected)
  app.get(api.admin.coats.list.path, isAuthenticated, async (req, res) => {
    const filters = {
      categoryId: req.query.categoryId ? Number(req.query.categoryId) : undefined,
    };
    const coats = await storage.getCoats(filters);
    res.json(coats);
  });

  app.get(api.admin.coats.get.path, isAuthenticated, async (req, res) => {
    const coat = await storage.getCoat(Number(req.params.id));
    if (!coat) {
      return res.status(404).json({ message: 'Coat not found' });
    }
    res.json(coat);
  });

  app.post(api.admin.coats.create.path, isAuthenticated, async (req, res) => {
    try {
      const coat = await storage.createCoat(req.body);
      res.status(201).json(coat);
    } catch (error) {
      res.status(400).json({ message: 'Invalid coat data' });
    }
  });

  app.put(api.admin.coats.update.path, isAuthenticated, async (req, res) => {
    try {
      const coat = await storage.updateCoat(Number(req.params.id), req.body);
      if (!coat) {
        return res.status(404).json({ message: 'Coat not found' });
      }
      res.json(coat);
    } catch (error) {
      res.status(400).json({ message: 'Invalid coat data' });
    }
  });

  app.delete(api.admin.coats.delete.path, isAuthenticated, async (req, res) => {
    const success = await storage.deleteCoat(Number(req.params.id));
    if (!success) {
      return res.status(404).json({ message: 'Coat not found' });
    }
    res.status(204).send();
  });

  // Admin - Reset and Seed Coats (Protected)
  app.post('/api/admin/coats/reset-seed', isAuthenticated, async (req, res) => {
    try {
      const result = await resetAndSeedCoats();
      res.json({
        message: 'Coat data reset and seeded successfully',
        ...result,
      });
    } catch (error) {
      console.error('Error resetting coats:', error);
      res.status(500).json({
        message: 'Failed to reset coat data',
        error: error instanceof Error ? error.message : 'Unknown error',
      });
    }
  });

  // Admin - Coat Categories (Protected)
  app.get(api.admin.coatCategories.list.path, isAuthenticated, async (req, res) => {
    const categories = await storage.getCoatCategories();
    res.json(categories);
  });

  app.get(api.admin.coatCategories.get.path, isAuthenticated, async (req, res) => {
    const category = await storage.getCoatCategory(Number(req.params.id));
    if (!category) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.json(category);
  });

  app.post(api.admin.coatCategories.create.path, isAuthenticated, async (req, res) => {
    try {
      const category = await storage.createCoatCategory(req.body);
      res.status(201).json(category);
    } catch (error) {
      res.status(400).json({ message: 'Invalid category data' });
    }
  });

  app.put(api.admin.coatCategories.update.path, isAuthenticated, async (req, res) => {
    try {
      const category = await storage.updateCoatCategory(Number(req.params.id), req.body);
      if (!category) {
        return res.status(404).json({ message: 'Category not found' });
      }
      res.json(category);
    } catch (error) {
      res.status(400).json({ message: 'Invalid category data' });
    }
  });

  app.delete(api.admin.coatCategories.delete.path, isAuthenticated, async (req, res) => {
    // Check if category has any coats
    const coatsInCategory = await storage.getCoats({ categoryId: Number(req.params.id) });
    if (coatsInCategory.length > 0) {
      return res.status(400).json({ message: 'Cannot delete category with existing coats' });
    }

    const success = await storage.deleteCoatCategory(Number(req.params.id));
    if (!success) {
      return res.status(404).json({ message: 'Category not found' });
    }
    res.status(204).send();
  });

  // Seed Data
  await seedDatabase();

  return httpServer;
}

async function seedDatabase() {
  // Note: Spanish breeds are seeded via the dedicated seed script:
  // npm run seed:spanish-breeds
  //
  // World breeds will be added separately when that data is ready

  // Seed coat categories
  const categories = await storage.getCoatCategories();
  if (categories.length === 0) {
    console.log("Seeding coat categories...");
    for (const category of COAT_CATEGORIES) {
      await storage.createCoatCategory(category);
    }
  }

  // Seed coats with proper category assignments
  const coats = await storage.getCoats();
  if (coats.length === 0) {
    console.log("Seeding coats...");
    const allCategories = await storage.getCoatCategories();

    // Map category names to IDs
    const categoryMap = new Map(
      allCategories.map(cat => [cat.name, cat.id])
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

    for (const assignment of coatAssignments) {
      const categoryId = categoryMap.get(assignment.categoryName);
      if (!categoryId) continue;

      for (let i = assignment.start; i < assignment.end; i++) {
        const coatData = COATS_DATA[i];
        if (coatData) {
          await storage.createCoat({
            ...coatData,
            categoryId,
          });
        }
      }
    }
    console.log("Coat seeding complete!");
  }

  const media = await storage.getMediaEntries();
  if (media.length === 0) {
      await storage.createMediaEntry({
          title: "Spirit: Stallion of the Cimarron",
          type: "movie",
          description: "Animated movie about a wild mustang.",
          linkUrl: "https://www.imdb.com/title/tt0166813/",
          imageUrl: "https://images.unsplash.com/photo-1599058945522-28d584b6f0ff?auto=format&fit=crop&q=80"
      });
      await storage.createMediaEntry({
          title: "War Horse",
          type: "movie",
          description: "A story about a horse's journey through WWI.",
          linkUrl: "https://www.imdb.com/title/tt1568911/",
          imageUrl: "https://images.unsplash.com/photo-1549480119-a864e43e746e?auto=format&fit=crop&q=80"
      });
  }

  const culture = await storage.getCultureArticles();
  if (culture.length === 0) {
      await storage.createCultureArticle({
          title: "Equinotherapy",
          category: "psychology",
          content: "Equine-assisted therapy incorporates horses into the therapeutic process. It helps with physical and mental health.",
          imageUrl: "https://images.unsplash.com/photo-1555239967-bd1c92a95578?auto=format&fit=crop&q=80"
      });
      await storage.createCultureArticle({
          title: "Horses in Mythology",
          category: "history",
          content: "From Pegasus to the Trojan Horse, horses have always been central to human storytelling and belief systems.",
          imageUrl: "https://images.unsplash.com/photo-1551381387-a3641b65e777?auto=format&fit=crop&q=80"
      });
  }
}
