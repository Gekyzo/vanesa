# Admin Authentication Setup

This document describes the implementation of authentication for the admin panel, including Google/Facebook OAuth and email/password authentication.

## Features Implemented

### Backend
- **Database Schema**: Added `admins` table with support for both OAuth and email/password authentication
- **Passport Strategies**:
  - Google OAuth 2.0
  - Facebook OAuth
  - Local Strategy (email/password)
- **Password Security**: Bcrypt hashing with 10 salt rounds
- **Session Management**: Express sessions with secure cookies
- **Protected Routes**: All admin API endpoints require authentication
- **Authentication Middleware**: `isAuthenticated` middleware protects admin routes
- **Validation**: Email format and password strength validation (min 8 chars, 1 number, 1 letter)

### Frontend
- **Login Page**: `/admin/login` with tabbed interface for:
  - Email/password login form
  - Email/password registration form
  - Google OAuth button
  - Facebook OAuth button
- **Admin Dashboard**: `/admin` with navigation to manage coats and categories
- **Admin Layout**: Shared layout with authentication context, user info, and logout
- **Protected Pages**: Existing admin pages (Coats, Categories) now use the admin layout
- **Authentication Hooks**: `useAuth()` and `useLogout()` for managing auth state
- **Form Validation**: Client-side validation using react-hook-form with zod schemas

## Setup Instructions

### 1. Configure OAuth Credentials

#### Google OAuth
1. Go to [Google Cloud Console](https://console.cloud.google.com/apis/credentials)
2. Create a new project or select an existing one
3. Create OAuth 2.0 credentials
4. Add authorized redirect URIs:
   - Development: `http://localhost:5000/api/auth/google/callback`
   - Production: `https://yourdomain.com/api/auth/google/callback`
5. Copy Client ID and Client Secret

#### Facebook OAuth
1. Go to [Facebook Developers](https://developers.facebook.com/apps/)
2. Create a new app or select an existing one
3. Add Facebook Login product
4. Configure OAuth redirect URIs:
   - Development: `http://localhost:5000/api/auth/facebook/callback`
   - Production: `https://yourdomain.com/api/auth/facebook/callback`
5. Copy App ID and App Secret

### 2. Update Environment Variables

Add the following to your `.env` file (template in `.env.example`):

```env
# Session Secret (change in production)
SESSION_SECRET=your-secret-key-here

# Google OAuth Credentials
GOOGLE_CLIENT_ID=your-google-client-id
GOOGLE_CLIENT_SECRET=your-google-client-secret

# Facebook OAuth Credentials
FACEBOOK_APP_ID=your-facebook-app-id
FACEBOOK_APP_SECRET=your-facebook-app-secret
```

### 3. Database Migration

The `admins` table has already been created. If needed, run:

```bash
npm run db:push
```

## Routes

### Authentication Routes
- `POST /api/auth/register` - Register with email/password
- `POST /api/auth/login` - Login with email/password
- `GET /api/auth/google` - Initiate Google OAuth flow
- `GET /api/auth/google/callback` - Google OAuth callback
- `GET /api/auth/facebook` - Initiate Facebook OAuth flow
- `GET /api/auth/facebook/callback` - Facebook OAuth callback
- `GET /api/auth/user` - Get current authenticated user
- `POST /api/auth/logout` - Logout current user

### Admin Pages
- `/admin/login` - Login/Registration page with multiple auth options
- `/admin` - Admin dashboard (protected)
- `/admin/coats` - Manage horse coats (protected)
- `/admin/coat-categories` - Manage coat categories (protected)

## How It Works

### 1. Email/Password Authentication Flow

**Registration:**
1. User visits `/admin/login` and switches to "Register" tab
2. Fills out name, email, password, and password confirmation
3. Client-side validation checks:
   - Email format
   - Password requirements (8+ chars, 1 number, 1 letter)
   - Password match
4. POST to `/api/auth/register`
5. Server validates and checks for existing email
6. Password hashed with bcrypt (10 salt rounds)
7. Admin record created with `provider: "local"`
8. User automatically logged in and redirected to `/admin`

**Login:**
1. User visits `/admin/login` (defaults to "Login" tab)
2. Enters email and password
3. POST to `/api/auth/login`
4. Passport local strategy validates credentials
5. Session established and user redirected to `/admin`

### 2. OAuth Flow (Google/Facebook)

1. User visits `/admin/login`
2. Clicks Google or Facebook button
3. Redirected to OAuth provider
4. After authorization, redirected back to `/api/auth/{provider}/callback`
5. Admin record created or retrieved from database
6. Session established and user redirected to `/admin`

### 3. Protected Pages

- Admin pages use `AdminLayout` component
- `useAuth()` hook checks authentication status
- Unauthenticated users redirected to `/admin/login`
- API routes protected with `isAuthenticated` middleware

### 4. Session Management
   - Sessions stored in memory (development)
   - For production, consider using PostgreSQL session store:
     ```typescript
     import connectPg from 'connect-pg-simple';
     const PgSession = connectPg(session);
     // Use PgSession store in session config
     ```

## Security Considerations

- ✅ HTTP-only cookies prevent XSS attacks
- ✅ Secure cookies in production (HTTPS)
- ✅ CSRF protection via session
- ✅ OAuth state parameter for CSRF protection
- ✅ Environment variables for sensitive data
- ⚠️ Change `SESSION_SECRET` in production
- ⚠️ Use HTTPS in production
- ⚠️ Consider rate limiting on auth endpoints
- ⚠️ Implement session storage in database for production

## File Structure

```
server/
├── auth.ts                    # Passport configuration and middleware
├── routes.ts                  # Authentication routes and protected endpoints
├── storage.ts                 # Admin database operations
└── index.ts                   # Express app with session setup

client/src/
├── hooks/
│   └── use-auth.ts           # Authentication hooks
├── components/admin/
│   └── AdminLayout.tsx       # Admin layout with auth context
└── pages/admin/
    ├── Login.tsx             # OAuth login page
    ├── Dashboard.tsx         # Admin dashboard
    ├── Coats.tsx            # Manage coats (updated)
    └── CoatCategories.tsx   # Manage categories (updated)

shared/
├── schema.ts                 # Database schema with admins table
└── routes.ts                 # API route definitions
```

## Testing

1. Start the development server:
   ```bash
   npm run dev
   ```

2. Visit `http://localhost:5000/admin/login`

3. Click Google or Facebook login button

4. Authorize the app with your account

5. You should be redirected to `/admin` dashboard

6. Try accessing `/admin/coats` - should work when authenticated

7. Try accessing admin routes without login - should redirect to login

## Troubleshooting

- **OAuth redirect URI mismatch**: Ensure callback URLs match exactly in provider settings
- **Session not persisting**: Check that `SESSION_SECRET` is set
- **401 errors on admin routes**: Verify authentication middleware is working
- **CORS issues**: Ensure `credentials: "include"` is set in fetch calls
