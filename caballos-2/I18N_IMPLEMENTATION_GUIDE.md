# Guía de Implementación i18n

## ✅ Completado

### 1. Configuración Base
- ✅ Instaladas dependencias: `i18next`, `react-i18next`, `i18next-browser-languagedetector`
- ✅ Configuración i18n creada en [client/src/i18n/index.ts](client/src/i18n/index.ts)
- ✅ i18n importado en [client/src/App.tsx](client/src/App.tsx)
- ✅ Idioma predeterminado: **Español (es)**
- ✅ Idiomas soportados: Español (es) y English (en)

### 2. Archivos de Traducción Creados

#### Español (es):
- ✅ [client/src/i18n/locales/es/common.json](client/src/i18n/locales/es/common.json) - Textos comunes (navegación, botones, etc.)
- ✅ [client/src/i18n/locales/es/pages.json](client/src/i18n/locales/es/pages.json) - Textos de páginas
- ✅ [client/src/i18n/locales/es/admin.json](client/src/i18n/locales/es/admin.json) - Textos del panel admin
- ✅ [client/src/i18n/locales/es/errors.json](client/src/i18n/locales/es/errors.json) - Mensajes de error

#### English (en):
- ✅ [client/src/i18n/locales/en/common.json](client/src/i18n/locales/en/common.json)
- ✅ [client/src/i18n/locales/en/pages.json](client/src/i18n/locales/en/pages.json)
- ✅ [client/src/i18n/locales/en/admin.json](client/src/i18n/locales/en/admin.json)
- ✅ [client/src/i18n/locales/en/errors.json](client/src/i18n/locales/en/errors.json)

### 3. Componentes Actualizados
- ✅ [client/src/pages/Home.tsx](client/src/pages/Home.tsx) - Página de inicio completamente traducida
- ✅ [client/src/components/Navigation.tsx](client/src/components/Navigation.tsx) - Navegación completamente traducida
- ✅ [client/src/components/LanguageSwitcher.tsx](client/src/components/LanguageSwitcher.tsx) - Nuevo componente selector de idioma

---

## 🔄 Pendiente de Implementación

### Páginas que Necesitan Traducción

#### 1. Breeds Page ([client/src/pages/Breeds.tsx](client/src/pages/Breeds.tsx))
```tsx
import { useTranslation } from 'react-i18next';

export default function Breeds() {
  const { t } = useTranslation(['pages', 'common']);

  // Reemplazar textos hardcodeados:
  // "Discover Breeds" → {t('pages:breeds.title')}
  // "Search breeds..." → {t('pages:breeds.search')}
  // "Filters" → {t('common:common.filters')}
  // etc.
}
```

**Traducciones ya disponibles:**
- `pages:breeds.title`
- `pages:breeds.subtitle`
- `pages:breeds.search`
- `pages:breeds.spanishBreedsOnly`
- `pages:breeds.showOnlySpanish`
- `pages:breeds.failedToLoad`
- `pages:breeds.noBreeds`
- `common:bloodTypes.*` (todos los tipos de sangre)
- `common:common.filters`

#### 2. Breed Detail Page ([client/src/pages/BreedDetail.tsx](client/src/pages/BreedDetail.tsx))
```tsx
import { useTranslation } from 'react-i18next';

export default function BreedDetail() {
  const { t } = useTranslation(['pages', 'common']);

  // Reemplazar:
  // "Loading breed details..." → {t('pages:breeds.loadingDetails')}
  // "Breed not found" → {t('pages:breeds.breedNotFound')}
  // "Spanish Breed" → {t('common:badges.spanishBreed')}
  // "Back to Breeds" → {t('common:buttons.backToBreeds')}
  // etc.
}
```

#### 3. Coats Page ([client/src/pages/Coats.tsx](client/src/pages/Coats.tsx))
```tsx
import { useTranslation } from 'react-i18next';

export default function Coats() {
  const { t } = useTranslation(['pages', 'common']);

  // Reemplazar:
  // "Capas de Caballos" → {t('pages:coats.title')}
  // "Simple (2 Gen)" → {t('pages:coats.tabs.simple')}
  // "Calculando..." → {t('common:common.calculating')}
  // etc.
}
```

**Traducciones ya disponibles:**
- `pages:coats.title`
- `pages:coats.subtitle`
- `pages:coats.tabs.simple/advanced`
- `pages:coats.simulator.simple/advanced`
- `pages:coats.colors.*` (negro, castaño, bayo, blanco)
- `pages:coats.generations.*` (abuelos, líneas)
- `pages:coats.commonCoats`
- `pages:coats.filterByCategory`

#### 4. Culture Page ([client/src/pages/Culture.tsx](client/src/pages/Culture.tsx))
```tsx
import { useTranslation } from 'react-i18next';

export default function Culture() {
  const { t } = useTranslation(['pages', 'common']);

  // Reemplazar:
  // "Horses in Culture" → {t('pages:culture.title')}
  // "All" → {t('pages:culture.categories.all')}
  // "Loading..." → {t('common:common.loading')}
  // etc.
}
```

#### 5. Media Page ([client/src/pages/Media.tsx](client/src/pages/Media.tsx))
```tsx
import { useTranslation } from 'react-i18next';

export default function Media() {
  const { t } = useTranslation(['pages', 'common']);

  // Reemplazar:
  // "Horses on Screen" → {t('pages:media.title')}
  // "Watch Trailer" → {t('common:buttons.watchTrailer')}
  // etc.
}
```

#### 6. Admin Pages

**Login ([client/src/pages/admin/Login.tsx](client/src/pages/admin/Login.tsx))**
```tsx
import { useTranslation } from 'react-i18next';

export default function AdminLogin() {
  const { t } = useTranslation(['admin', 'common', 'errors']);

  // Reemplazar:
  // "Admin Access" → {t('admin:login.title')}
  // "Email" → {t('common:common.email')}
  // "Password" → {t('common:common.password')}
  // "Invalid email address" → {t('errors:validation.emailInvalid')}
  // etc.
}
```

**Dashboard ([client/src/pages/admin/Dashboard.tsx](client/src/pages/admin/Dashboard.tsx))**
```tsx
import { useTranslation } from 'react-i18next';

export default function AdminDashboard() {
  const { t } = useTranslation(['admin', 'common']);

  // Reemplazar:
  // "Dashboard" → {t('admin:dashboard.title')}
  // "Manage Coats" → {t('admin:dashboard.manageCoats.title')}
  // etc.
}
```

**Admin Coats ([client/src/pages/admin/Coats.tsx](client/src/pages/admin/Coats.tsx))**
```tsx
import { useTranslation } from 'react-i18next';

export default function AdminCoats() {
  const { t } = useTranslation(['admin', 'common']);

  // Reemplazar toast messages:
  toast({
    title: t('admin:notifications.coatDeleted'),
  });
}
```

**Coat Categories ([client/src/pages/admin/CoatCategories.tsx](client/src/pages/admin/CoatCategories.tsx))**
```tsx
import { useTranslation } from 'react-i18next';

export default function CoatCategories() {
  const { t } = useTranslation(['admin', 'common']);

  // Similar al anterior
}
```

#### 7. Componentes Admin

**AdminLayout ([client/src/components/admin/AdminLayout.tsx](client/src/components/admin/AdminLayout.tsx))**
```tsx
import { useTranslation } from 'react-i18next';

export function AdminLayout() {
  const { t } = useTranslation(['admin', 'common']);

  // Reemplazar:
  // "Admin Panel" → {t('admin:layout.title')}
  // "Logout" → {t('common:buttons.logout')}
  // etc.
}
```

**CoatFormDialog ([client/src/components/admin/CoatFormDialog.tsx](client/src/components/admin/CoatFormDialog.tsx))**
```tsx
import { useTranslation } from 'react-i18next';

export function CoatFormDialog() {
  const { t } = useTranslation(['admin', 'common']);

  // Reemplazar:
  // "Edit Coat" → {t('admin:coats.editCoat')}
  // "Create Coat" → {t('admin:coats.createCoat')}
  // etc.
}
```

**BreedCard ([client/src/components/BreedCard.tsx](client/src/components/BreedCard.tsx))**
```tsx
import { useTranslation } from 'react-i18next';

export function BreedCard({ breed }: { breed: Breed }) {
  const { t } = useTranslation('common');

  // Reemplazar:
  // "Raza Española" → {t('badges.spanishBreed')}
  // "Blood" → {t('bloodTypes.blood')}
}
```

**Not Found ([client/src/pages/not-found.tsx](client/src/pages/not-found.tsx))**
```tsx
import { useTranslation } from 'react-i18next';

export default function NotFound() {
  const { t } = useTranslation('pages');

  // Reemplazar:
  // "404 Page Not Found" → {t('notFound.title')}
  // "Did you forget to add the page to the router?" → {t('notFound.message')}
}
```

---

## 🔧 Patrón de Implementación

### Paso 1: Importar useTranslation
```tsx
import { useTranslation } from 'react-i18next';
```

### Paso 2: Usar el hook
```tsx
export default function MyComponent() {
  const { t } = useTranslation(['namespace1', 'namespace2']);

  // Múltiples namespaces:
  // - 'common': textos comunes, navegación, botones
  // - 'pages': textos de páginas específicas
  // - 'admin': textos del panel admin
  // - 'errors': mensajes de error
```

### Paso 3: Reemplazar strings
```tsx
// ❌ Antes:
<h1>Discover Breeds</h1>

// ✅ Después:
<h1>{t('pages:breeds.title')}</h1>

// Con namespace por defecto:
const { t } = useTranslation('pages');
<h1>{t('breeds.title')}</h1>

// Sin namespace explícito (usa 'common' por defecto):
const { t } = useTranslation();
<button>{t('buttons.explore')}</button>
```

---

## 📝 Mensajes del Servidor (API)

### Actualizar [server/routes.ts](server/routes.ts)

Actualmente los mensajes están hardcodeados:
```typescript
res.json({ message: "Logged out successfully" });
```

**Opción 1: Aceptar idioma del cliente**
```typescript
import i18next from 'i18next';

// Middleware para detectar idioma
app.use((req, res, next) => {
  const lang = req.headers['accept-language']?.split(',')[0] || 'es';
  req.language = lang;
  next();
});

// En las rutas:
res.json({
  message: i18next.t('admin:notifications.logoutSuccess', { lng: req.language })
});
```

**Opción 2: Siempre devolver español (más simple)**
```typescript
res.json({ message: "Sesión cerrada exitosamente" });
```

**Opción 3: Devolver keys y traducir en el cliente**
```typescript
// Servidor:
res.json({ messageKey: "admin.notifications.logoutSuccess" });

// Cliente:
toast({
  title: t(response.messageKey),
});
```

---

## 🧪 Cómo Probar

1. **Iniciar servidor de desarrollo:**
```bash
npm run dev
```

2. **Verificar selector de idioma:**
   - Aparece en la esquina superior derecha (desktop)
   - Aparece en el menú móvil
   - Cambia entre ES/EN

3. **Verificar páginas traducidas:**
   - Home: Completamente traducida ✅
   - Navegación: Completamente traducida ✅
   - Todas las demás páginas: Pendiente ⏳

4. **Verificar persistencia:**
   - Cambiar idioma
   - Recargar página
   - El idioma debe persistir (guardado en localStorage)

---

## 📚 Referencia Rápida de Traducciones

### Common (common.json)
- `nav.*` - Navegación
- `buttons.*` - Botones
- `common.*` - Textos comunes (loading, error, etc.)
- `bloodTypes.*` - Tipos de sangre
- `badges.*` - Badges/etiquetas
- `auth.*` - Autenticación

### Pages (pages.json)
- `home.*` - Página inicio
- `breeds.*` - Página razas
- `coats.*` - Página capas
- `culture.*` - Página cultura
- `media.*` - Página media
- `notFound.*` - Página 404

### Admin (admin.json)
- `login.*` - Login admin
- `dashboard.*` - Dashboard
- `layout.*` - Layout admin
- `coats.*` - Gestión capas
- `categories.*` - Categorías
- `notifications.*` - Toast notifications

### Errors (errors.json)
- `validation.*` - Errores de validación
- `api.*` - Errores de API

---

## 💡 Tips

1. **Usa el namespace correcto** para evitar conflictos de keys
2. **Revisa los archivos JSON** antes de añadir traducciones - muchas ya existen
3. **Mantén consistencia** entre español e inglés
4. **Prueba ambos idiomas** después de cada cambio
5. **El selector de idioma** ya está añadido a la navegación, no es necesario agregarlo de nuevo

---

## 🎯 Próximos Pasos

1. Actualizar página Breeds
2. Actualizar página BreedDetail
3. Actualizar página Coats
4. Actualizar páginas Culture y Media
5. Actualizar páginas Admin
6. Actualizar componentes Admin
7. Actualizar mensajes del servidor (opcional)
8. Pruebas completas en ambos idiomas

---

## 📞 Soporte

Si necesitas añadir nuevas traducciones que no existen en los archivos JSON, simplemente añádelas en ambos idiomas (es/en) manteniendo la misma estructura.

**Ejemplo:**
```json
// es/pages.json
{
  "breeds": {
    "newField": "Nuevo Campo"
  }
}

// en/pages.json
{
  "breeds": {
    "newField": "New Field"
  }
}
```
