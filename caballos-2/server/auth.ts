import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { Strategy as FacebookStrategy } from "passport-facebook";
import { Strategy as LocalStrategy } from "passport-local";
import bcrypt from "bcrypt";
import { storage } from "./storage";
import type { Admin } from "@shared/schema";
import type { Request, Response, NextFunction } from "express";

const SALT_ROUNDS = 10;

export function setupPassport() {
  // Serialize user to session
  passport.serializeUser((user: Express.User, done) => {
    done(null, (user as Admin).id);
  });

  // Deserialize user from session
  passport.deserializeUser(async (id: number, done) => {
    try {
      const admin = await storage.getAdminById(id);
      if (!admin) {
        return done(new Error('Admin not found'));
      }
      done(null, admin);
    } catch (error) {
      done(error);
    }
  });

  // Google OAuth Strategy
  if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
    passport.use(
      new GoogleStrategy(
        {
          clientID: process.env.GOOGLE_CLIENT_ID,
          clientSecret: process.env.GOOGLE_CLIENT_SECRET,
          callbackURL: "/api/auth/google/callback",
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            // Check if admin exists
            let admin = await storage.getAdminByProviderId("google", profile.id);

            if (!admin) {
              // Create new admin
              admin = await storage.createAdmin({
                provider: "google",
                providerId: profile.id,
                email: profile.emails?.[0]?.value || "",
                name: profile.displayName || "Unknown",
              });
            }

            done(null, admin);
          } catch (error) {
            done(error as Error);
          }
        }
      )
    );
  }

  // Facebook OAuth Strategy
  if (process.env.FACEBOOK_APP_ID && process.env.FACEBOOK_APP_SECRET) {
    passport.use(
      new FacebookStrategy(
        {
          clientID: process.env.FACEBOOK_APP_ID,
          clientSecret: process.env.FACEBOOK_APP_SECRET,
          callbackURL: "/api/auth/facebook/callback",
          profileFields: ["id", "displayName", "email"],
        },
        async (_accessToken, _refreshToken, profile, done) => {
          try {
            // Check if admin exists
            let admin = await storage.getAdminByProviderId("facebook", profile.id);

            if (!admin) {
              // Create new admin
              admin = await storage.createAdmin({
                provider: "facebook",
                providerId: profile.id,
                email: profile.emails?.[0]?.value || "",
                name: profile.displayName || "Unknown",
              });
            }

            done(null, admin);
          } catch (error) {
            done(error as Error);
          }
        }
      )
    );
  }

  // Local (Email/Password) Strategy
  passport.use(
    new LocalStrategy(
      {
        usernameField: "email",
        passwordField: "password",
      },
      async (email, password, done) => {
        try {
          const admin = await storage.getAdminByEmail(email);

          if (!admin || !admin.passwordHash) {
            return done(null, false, { message: "Invalid email or password" });
          }

          const isValidPassword = await bcrypt.compare(password, admin.passwordHash);

          if (!isValidPassword) {
            return done(null, false, { message: "Invalid email or password" });
          }

          return done(null, admin);
        } catch (error) {
          return done(error);
        }
      }
    )
  );
}

// Password hashing utilities
export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, SALT_ROUNDS);
}

export async function validatePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

// Password validation
export function isValidPassword(password: string): { valid: boolean; message?: string } {
  if (password.length < 8) {
    return { valid: false, message: "Password must be at least 8 characters long" };
  }
  if (!/\d/.test(password)) {
    return { valid: false, message: "Password must contain at least one number" };
  }
  if (!/[a-zA-Z]/.test(password)) {
    return { valid: false, message: "Password must contain at least one letter" };
  }
  return { valid: true };
}

// Email validation
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

// Authentication middleware
export function isAuthenticated(req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated()) {
    return next();
  }
  res.status(401).json({ message: "Unauthorized" });
}
