
import { z } from 'zod';
import { breeds, coats, coatCategories, mediaEntries, cultureArticles, admins, insertBreedSchema, insertCoatSchema, insertCoatCategorySchema, insertMediaEntrySchema, insertCultureArticleSchema } from './schema';

export const errorSchemas = {
  validation: z.object({
    message: z.string(),
    field: z.string().optional(),
  }),
  notFound: z.object({
    message: z.string(),
  }),
  internal: z.object({
    message: z.string(),
  }),
};

export const api = {
  auth: {
    user: {
      method: 'GET' as const,
      path: '/api/auth/user',
      responses: {
        200: z.custom<typeof admins.$inferSelect>(),
        401: z.object({ message: z.string() }),
      },
    },
    logout: {
      method: 'POST' as const,
      path: '/api/auth/logout',
      responses: {
        200: z.object({ message: z.string() }),
      },
    },
    register: {
      method: 'POST' as const,
      path: '/api/auth/register',
      input: z.object({
        email: z.string().email(),
        password: z.string().min(8),
        name: z.string().min(1),
      }),
      responses: {
        201: z.custom<typeof admins.$inferSelect>(),
        400: z.object({ message: z.string() }),
      },
    },
    login: {
      method: 'POST' as const,
      path: '/api/auth/login',
      input: z.object({
        email: z.string().email(),
        password: z.string(),
      }),
      responses: {
        200: z.custom<typeof admins.$inferSelect>(),
        401: z.object({ message: z.string() }),
      },
    },
  },
  breeds: {
    list: {
      method: 'GET' as const,
      path: '/api/breeds',
      input: z.object({
        search: z.string().optional(),
        isSpanish: z.string().transform(val => val === 'true').optional(),
        bloodType: z.string().optional(),
      }).optional(),
      responses: {
        200: z.array(z.custom<typeof breeds.$inferSelect>()),
      },
    },
    get: {
      method: 'GET' as const,
      path: '/api/breeds/:id',
      responses: {
        200: z.custom<typeof breeds.$inferSelect>(),
        404: errorSchemas.notFound,
      },
    },
  },
  coats: {
    list: {
      method: 'GET' as const,
      path: '/api/coats',
      responses: {
        200: z.array(z.custom<typeof coats.$inferSelect>()),
      },
    },
    simulate: {
      method: 'POST' as const,
      path: '/api/coats/simulate',
      input: z.object({
        sireColor: z.string(),
        damColor: z.string(),
      }),
      responses: {
        200: z.object({
          probabilities: z.array(z.object({
            colorName: z.string(),
            percentage: z.number(),
          })),
        }),
      },
    },
  },
  media: {
    list: {
      method: 'GET' as const,
      path: '/api/media',
      responses: {
        200: z.array(z.custom<typeof mediaEntries.$inferSelect>()),
      },
    },
  },
  culture: {
    list: {
      method: 'GET' as const,
      path: '/api/culture',
      responses: {
        200: z.array(z.custom<typeof cultureArticles.$inferSelect>()),
      },
    },
  },
  admin: {
    coats: {
      list: {
        method: 'GET' as const,
        path: '/api/admin/coats',
        input: z.object({
          categoryId: z.string().optional(),
        }).optional(),
        responses: {
          200: z.array(z.custom<typeof coats.$inferSelect>()),
        },
      },
      get: {
        method: 'GET' as const,
        path: '/api/admin/coats/:id',
        responses: {
          200: z.custom<typeof coats.$inferSelect>(),
          404: errorSchemas.notFound,
        },
      },
      create: {
        method: 'POST' as const,
        path: '/api/admin/coats',
        input: insertCoatSchema,
        responses: {
          201: z.custom<typeof coats.$inferSelect>(),
          400: errorSchemas.validation,
        },
      },
      update: {
        method: 'PUT' as const,
        path: '/api/admin/coats/:id',
        input: insertCoatSchema,
        responses: {
          200: z.custom<typeof coats.$inferSelect>(),
          404: errorSchemas.notFound,
          400: errorSchemas.validation,
        },
      },
      delete: {
        method: 'DELETE' as const,
        path: '/api/admin/coats/:id',
        responses: {
          204: z.object({}),
          404: errorSchemas.notFound,
        },
      },
    },
    coatCategories: {
      list: {
        method: 'GET' as const,
        path: '/api/admin/coat-categories',
        responses: {
          200: z.array(z.custom<typeof coatCategories.$inferSelect>()),
        },
      },
      get: {
        method: 'GET' as const,
        path: '/api/admin/coat-categories/:id',
        responses: {
          200: z.custom<typeof coatCategories.$inferSelect>(),
          404: errorSchemas.notFound,
        },
      },
      create: {
        method: 'POST' as const,
        path: '/api/admin/coat-categories',
        input: insertCoatCategorySchema,
        responses: {
          201: z.custom<typeof coatCategories.$inferSelect>(),
          400: errorSchemas.validation,
        },
      },
      update: {
        method: 'PUT' as const,
        path: '/api/admin/coat-categories/:id',
        input: insertCoatCategorySchema,
        responses: {
          200: z.custom<typeof coatCategories.$inferSelect>(),
          404: errorSchemas.notFound,
          400: errorSchemas.validation,
        },
      },
      delete: {
        method: 'DELETE' as const,
        path: '/api/admin/coat-categories/:id',
        responses: {
          204: z.object({}),
          404: errorSchemas.notFound,
          400: errorSchemas.validation,
        },
      },
    },
  },
};

export function buildUrl(path: string, params?: Record<string, string | number>): string {
  let url = path;
  if (params) {
    Object.entries(params).forEach(([key, value]) => {
      if (url.includes(`:${key}`)) {
        url = url.replace(`:${key}`, String(value));
      }
    });
  }
  return url;
}
