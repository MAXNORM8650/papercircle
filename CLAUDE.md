# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Paper Circle is a research paper discovery and reading group platform built with React, TypeScript, Vite, and Supabase. It enables communities to organize reading sessions, track paper lineage, and foster collaborative learning around academic research.

## Common Commands

### Development
```bash
npm run dev              # Start development server (Vite)
npm run build            # Build for production
npm run preview          # Preview production build locally
npm run lint             # Run ESLint
npm run typecheck        # Type-check without emitting files
```

### Database
Supabase migrations are located in `supabase/migrations/`. Apply migrations through the Supabase CLI or dashboard.

## Architecture

### Frontend Structure

**Main App Flow** (`src/App.tsx`):
- App is wrapped in `AuthProvider` context
- `AppContent` component handles routing between views:
  - `discover` - Browse papers
  - `sessions` - View/manage reading sessions
  - `circles` - Community management
  - `lineage` - Paper relationship visualization
  - `dashboard` - User dashboard
  - `admin` - Admin panel
  - `invite` - Accept community invitations
- Client-side routing via state management (no router library)
- Profile completion modal shows when `needsProfile` is true

### Context Architecture

**AuthContext** (`src/contexts/AuthContext.tsx`):
- Manages user authentication state (user, session, profile)
- Handles sign in/up/out operations
- Profile completion flow for new users
- Automatically fetches user profile on auth state change
- Key state: `needsProfile` triggers profile completion modal

**CommunityContext** (`src/contexts/CommunityContext.tsx`):
- Manages community/circle membership
- Tracks current community and user's role within it
- Provides list of all communities and user's communities
- Used throughout the app for community-scoped features

### Database Schema (Supabase/PostgreSQL)

**Core Tables**:
- `profiles` - Extended user data (display_name, affiliation, interests, role)
- `papers` - Research papers with metadata, embeddings (vector(768)), and citations
- `sessions` - Reading group meetings with scheduling, presenters, recording links
- `communities` - Reading group communities with privacy controls
- `community_members` - Junction table with role-based access (member, presenter, admin)
- `edges` - Paper lineage relationships (extends, applies, evaluates, contradicts, etc.)
- `topics` - Hierarchical research areas and tags
- `discussions` - Comments on papers/sessions with threading support
- `rsvps` - Session attendance tracking with check-in status
- `saved_papers` - User bookmarks with notes

**Community Support**:
- Sessions and edges can be scoped to communities via `community_id`
- Communities have public/private visibility
- Invitations system via `community_invites` table
- Lineage tracking: sessions can reference `parent_session_id` for paper exploration paths

**Security**:
- Row Level Security (RLS) enabled on all tables
- Policies enforce community membership for private content
- Role-based permissions (member, presenter, admin) at both profile and community levels
- Non-recursive RLS policies to avoid infinite loops (critical issue resolved in migrations)

### Type Safety

- Database types are generated in `src/lib/database.types.ts`
- Supabase client is typed with these definitions
- Component props use `Database['public']['Tables']['table_name']['Row']` pattern

### Supabase Client

**Configuration** (`src/lib/supabase.ts`):
- Requires `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` environment variables
- These must be in `.env` file (not committed to git)
- Client is typed with generated database types

### Component Organization

Components are organized by feature:
- `Auth/` - Authentication modals and profile completion
- `Communities/` - Circle management, invitations, detail views
- `Sessions/` - Session creation, editing, viewing, RSVP management
- `Papers/` - Paper discovery and detail views
- `Layout/` - Header and navigation
- `Lineage/` - Paper relationship visualization
- `Dashboard/` - User activity and stats
- `Admin/` - Administrative functions

### Styling

- TailwindCSS for styling
- Lucide React for icons
- Responsive design with mobile-first approach

## Important Patterns

### Authentication Flow
1. User signs up → profile created in `profiles` table
2. If profile creation fails or is incomplete, `needsProfile` becomes true
3. `CompleteProfileModal` shows automatically when `needsProfile` is true
4. After profile completion, modal dismisses and user has full access

### Community-Scoped Data
When working with sessions, edges, or other community-specific data:
1. Check if feature is community-scoped via `community_id`
2. Verify user membership and role via `community_members` table
3. Use appropriate RLS policies that check membership
4. Sessions without `community_id` are treated as public (when visibility='public')

### Invite Flow
- Invite URLs follow pattern `/invite/{code}`
- App detects invite URLs on mount and switches to invite view
- After accepting invite, user is redirected to circles view

### RLS Recursion Issues
Multiple migrations fix RLS recursion problems. When writing policies:
- Avoid policies that check the same table they're defined on
- Use explicit membership checks rather than nested policy evaluations
- Policies in migrations after 20251124081303 show correct patterns

## Environment Setup

Required environment variables in `.env`:
```
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
```

## Migration History

Migrations are sequential and build upon each other:
1. `20251124065736` - Initial schema (profiles, papers, sessions, edges, etc.)
2. `20251124070329` - Seed initial data
3. `20251124072422` - Community support (communities, members, invites)
4. `20251124073615` - Paper ratings
5. `20251124074429` - Influence and similarity metrics
6. `20251124080414` - Session presenters
7. `20251124080957+` - Multiple RLS fixes for recursion issues
8. `20251124082244` - Session papers and resources
9. `20251124083348` - Circle invitations and features

Later migrations fix critical RLS recursion issues and refine permissions.
