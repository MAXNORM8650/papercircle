# Circle Sessions - Complete Implementation Plan

## Overview

Building a comprehensive circle/session management system with:
- Admin controls for circle and session management
- Member attendance tracking
- Session creation with related works and lineage
- Work relationship tracking

## User Roles & Permissions

### Admin (Circle Creator)
- ✅ Full edit access to circle settings
- ✅ Create, edit, delete sessions
- ✅ Manage members (add, remove, change roles)
- ✅ Assign presenters to sessions
- ✅ Can add themselves to any session
- ✅ View all attendance records
- ✅ Manage invitations

### Presenter
- Can present at assigned sessions
- Can edit session details they're presenting
- Can view attendance for their sessions
- Can add related works to their sessions

### Member
- View all circle sessions
- RSVP to sessions
- Record attendance (check-in)
- View session materials
- Comment on sessions
- View lineage

## Features to Implement

### 1. Enhanced Circle Detail View

**Overview Tab:**
- Circle information
- Recent sessions
- Member count
- Quick stats (upcoming sessions, total papers, etc.)

**Members Tab:**
- List all members with roles
- Add/remove members (admin only)
- Change member roles (admin only)
- View member activity

**Sessions Tab:**
- List all sessions (upcoming and past)
- Filter by status (upcoming, completed, cancelled)
- Sort by date
- Quick RSVP actions
- Create new session button (admin/presenter)

**Settings Tab (Admin only):**
- Edit circle details
- Manage invitations
- Circle visibility settings
- Delete circle option

### 2. Enhanced Session Creation

**Required Fields:**
- Title
- Description
- Scheduled date/time
- Duration
- Location (physical or virtual link)
- Presenter assignment

**Optional Fields:**
- **Related Works**: Link to previous sessions/papers in the circle
- **Introduction**: Context for the session
- **Parent Session**: Mark this as continuing work from another session
- **Papers**: Assign papers to be discussed
- **Resources**: Links to materials

**Lineage Creation:**
- Automatically create edges between sessions when "Related Works" specified
- Track paper relationships through sessions
- Build knowledge graph

### 3. Member Attendance System

**RSVP Statuses:**
- Not Responded
- Going
- Maybe
- Not Going

**Check-in System:**
- Members can check in during/after session
- Attendance recorded in database
- History of attendance tracked

**UI Components:**
- RSVP buttons on session cards
- Check-in button when session is active
- Attendance list (shows who's coming/attended)

### 4. Session Management (Admin/Presenter)

**Session Actions:**
- Edit session details
- Add/remove presenters
- Assign papers
- Add related sessions
- Cancel session
- Mark as completed
- Add recording link (post-session)

**Assignment Flow:**
- Admin selects session
- Clicks "Assign Presenter"
- Chooses from circle members
- Can assign multiple presenters
- Can assign self

### 5. Lineage Tracking

**Session Lineage:**
- Visual graph showing session relationships
- "This session builds on..."
- "This session led to..."
- Paper flow through sessions

**Database Schema:**
```sql
-- Sessions already exist, add fields:
ALTER TABLE sessions ADD COLUMN parent_session_id UUID REFERENCES sessions(id);
ALTER TABLE sessions ADD COLUMN introduction TEXT;
ALTER TABLE sessions ADD COLUMN related_works JSONB;

-- Session relationships (edges)
CREATE TABLE session_edges (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  source_session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  target_session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  relationship_type TEXT CHECK (relationship_type IN ('continues', 'extends', 'relates_to')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_by UUID REFERENCES profiles(id),
  UNIQUE(source_session_id, target_session_id, relationship_type)
);

-- RSVPs
CREATE TABLE IF NOT EXISTS session_rsvps (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  status TEXT CHECK (status IN ('going', 'maybe', 'not_going')),
  checked_in BOOLEAN DEFAULT FALSE,
  checked_in_at TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, user_id)
);

-- Session presenters
CREATE TABLE IF NOT EXISTS session_presenters (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  is_primary BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, user_id)
);

-- Session papers
CREATE TABLE IF NOT EXISTS session_papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  session_id UUID REFERENCES sessions(id) ON DELETE CASCADE,
  paper_id UUID REFERENCES papers(id) ON DELETE CASCADE,
  order_index INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(session_id, paper_id)
);
```

## Component Structure

### New Components to Create

1. **`CreateSessionModal.tsx`**
   - Form for creating sessions
   - Related works selector
   - Parent session picker
   - Paper assignment

2. **`SessionCard.tsx`**
   - Display session info
   - RSVP buttons
   - Check-in button
   - Presenter info
   - Attendance count

3. **`AttendanceList.tsx`**
   - List of RSVPs
   - Check-in status
   - Filter by status

4. **`SessionLineageView.tsx`**
   - Visual graph of session relationships
   - Interactive navigation
   - Timeline view

5. **`AssignPresenterModal.tsx`**
   - Select members to assign
   - Multiple presenters support
   - Primary presenter selection

### Components to Enhance

1. **`CircleDetailView.tsx`**
   - Add comprehensive tabs
   - Admin-only actions
   - Session list with actions

2. **`SessionDetailView.tsx`** (if exists)
   - Show full session details
   - RSVP/check-in UI
   - Related sessions
   - Papers list
   - Discussion thread

## Implementation Phases

### Phase 1: Database Schema ✅
- Create migrations for new tables
- Add RLS policies
- Test schema

### Phase 2: Session Creation
- Build CreateSessionModal
- Add related works selection
- Add parent session picker
- Test session creation

### Phase 3: RSVP System
- Add RSVP buttons to sessions
- Create attendance tracking
- Build check-in functionality
- Show attendance lists

### Phase 4: Admin Controls
- Add presenter assignment
- Build session editing
- Add member management
- Test permissions

### Phase 5: Lineage Visualization
- Build session graph
- Add paper flow tracking
- Create timeline view
- Test navigation

## User Flows

### Flow 1: Admin Creates Session with Lineage
```
1. Admin goes to Circle → Sessions tab
2. Clicks "Create Session"
3. Fills in basic info (title, date, etc.)
4. Selects "Related Works" → chooses previous session
5. Adds "Introduction" explaining context
6. Assigns presenter(s)
7. Assigns papers to discuss
8. Creates session
9. Lineage edge automatically created
```

### Flow 2: Member RSVPs and Checks In
```
1. Member views Circle → Sessions tab
2. Sees upcoming session
3. Clicks "Going" button
4. RSVP recorded
5. On session day, clicks "Check In"
6. Attendance recorded with timestamp
7. Can view session materials
```

### Flow 3: Admin Assigns Presenter
```
1. Admin creates session
2. Goes to session details
3. Clicks "Assign Presenter"
4. Modal shows circle members
5. Selects member(s)
6. Marks one as primary
7. Saves assignments
8. Presenters notified
```

### Flow 4: Viewing Session Lineage
```
1. User clicks on a session
2. Sees "Related Sessions" section
3. Shows parent session (if any)
4. Shows child sessions (if any)
5. Clicks "View Lineage Graph"
6. See visual graph of all relationships
7. Can click nodes to navigate
```

## Next Steps

1. **Create database migration** for new tables
2. **Build CreateSessionModal** with all features
3. **Add RSVP functionality** to sessions
4. **Implement admin controls** in CircleDetailView
5. **Build lineage visualization**

## Files to Create

- `supabase/migrations/[timestamp]_add_session_management.sql`
- `src/components/Sessions/CreateSessionModal.tsx`
- `src/components/Sessions/SessionCard.tsx`
- `src/components/Sessions/AttendanceList.tsx`
- `src/components/Sessions/SessionLineageView.tsx`
- `src/components/Sessions/AssignPresenterModal.tsx`
- `src/hooks/useSessionRSVP.ts`
- `src/hooks/useSessionAttendance.ts`

## Files to Modify

- `src/components/Communities/CircleDetailView.tsx`
- `src/components/Sessions/SessionDetailView.tsx`
- `src/components/Lineage/LineageView.tsx`

---

**Status**: Ready to implement
**Priority**: Database schema → Session creation → RSVP → Admin controls → Lineage
