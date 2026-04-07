# Paper Workflow Implementation Status

## Overview

Building a comprehensive paper management workflow:
- arXiv Live / AI Discovery → Community Papers / Circle Papers
- Community Papers → Circle Papers
- Circle Papers → Sessions

## ✅ Completed (Phase 1)

### 1. Enhanced Import with Community Selection

**Feature**: When importing papers from arXiv Live or AI Discovery, users can now select which community to add them to.

**Implementation**:
- Added import modal with community dropdown
- Papers can be imported to general collection OR specific community
- Modal shows paper title and authors for context
- Loading states during import
- Automatic duplicate detection

**Files Modified**:
- `src/components/Papers/DiscoverView.tsx`

**How to Use**:
1. Click the `+` button on any arXiv or AI Discovery paper
2. Modal appears with community selection
3. Choose a community or leave blank for general import
4. Click "Import"

**Database**:
- Uses `community_papers` table to link papers to communities
- Tracks who added the paper (`added_by`)

## 🚧 Remaining Features

### 2. Paper Preview Thumbnails (Pending)

**Goal**: Show first page of PDF as thumbnail

**Requirements**:
- Generate thumbnail from PDF first page
- Store thumbnail URL in database
- Display in Community Papers view
- Lazy loading for performance

**Technical Approach**:
- Option A: Client-side PDF.js to render first page
- Option B: Server-side thumbnail generation (edge function)
- Option C: Use existing service like PDF.co API

### 3. Enhanced Community Papers View (Pending)

**Goal**: Full-featured view with likes, comments, and detailed info

**Requirements**:
- Show paper thumbnails
- Display like count with ability to like/unlike
- Show comment/discussion count
- View count tracking
- Click to view full paper details

**Needed**:
- Update Community Papers list component
- Add interaction buttons (like, comment, view)
- Track engagement metrics in database

### 4. Filtering & Sorting (Pending)

**Goal**: Filter community papers by various criteria

**Requirements**:
- Sort by likes (ascending/descending)
- Sort by comments count
- Sort by views
- Sort by date added
- Filter by circle assignment
- Search within community papers

**UI**:
- Filter toolbar at top of Community Papers view
- Dropdown selectors for sort options
- Toggle for ascending/descending

### 5. Community Papers → Circle Papers (Pending)

**Goal**: Add community papers to specific circles

**Requirements**:
- "Add to Circle" button on each community paper
- Modal to select target circle
- Check user permissions (must be circle member)
- Track which circles have which papers

**Database**:
- Create `circle_papers` table if doesn't exist
- Link papers to specific circles
- Track who added and when

### 6. Circle Papers → Sessions (Pending)

**Goal**: Assign circle papers to reading sessions

**Requirements**:
- "Add to Session" button on circle papers
- Select existing session or create new one
- Display papers assigned to each session
- Session agenda view with papers

**Implementation**:
- May already exist in `session_papers` table
- Just need UI workflow
- Check `Sessions/` components

## Database Schema Needs

### Existing Tables (Verify):
- ✅ `papers` - Main papers table
- ✅ `communities` - Communities/circles
- ✅ `community_members` - User memberships
- ❓ `community_papers` - Papers in communities
- ❓ `circle_papers` - Papers in circles
- ❓ `session_papers` - Papers in sessions

### New Tables Needed:
```sql
-- Community papers (if doesn't exist)
CREATE TABLE IF NOT EXISTS community_papers (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id UUID REFERENCES papers(id) ON DELETE CASCADE,
  community_id UUID REFERENCES communities(id) ON DELETE CASCADE,
  added_by UUID REFERENCES profiles(id),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(paper_id, community_id)
);

-- Paper engagement metrics
CREATE TABLE IF NOT EXISTS paper_engagement (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  paper_id UUID REFERENCES papers(id) ON DELETE CASCADE,
  user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
  engagement_type TEXT CHECK (engagement_type IN ('like', 'view', 'save')),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  UNIQUE(paper_id, user_id, engagement_type)
);

-- Paper thumbnails
ALTER TABLE papers ADD COLUMN IF NOT EXISTS thumbnail_url TEXT;
```

## Next Steps

### Immediate Priority:
1. **Verify database schema** - Check what tables exist
2. **Create missing tables** - Add community_papers, paper_engagement
3. **Build Community Papers View** - Enhanced list with engagement
4. **Add filtering/sorting** - UI controls for sorting

### Development Workflow:
1. Start with Community Papers view enhancement
2. Add like/comment/view functionality
3. Implement filtering and sorting
4. Add Circle assignment flow
5. Add thumbnail generation (can be last)

## Files to Create/Modify

### To Create:
- `src/components/Papers/CommunityPapersView.tsx` - Enhanced view
- `src/components/Papers/PaperCard.tsx` - Reusable card component
- `src/hooks/usePaperEngagement.ts` - Like/view/save logic
- `supabase/migrations/[timestamp]_add_paper_workflow.sql` - Schema updates

### To Modify:
- `src/components/Papers/DiscoverView.tsx` - ✅ Already updated
- `src/components/Communities/CircleDetailView.tsx` - Add paper management
- `src/components/Sessions/SessionDetailView.tsx` - Show assigned papers

## Testing Checklist

- [ ] Import paper to community
- [ ] Import paper to multiple communities
- [ ] Import duplicate paper (should reuse)
- [ ] Like/unlike paper
- [ ] Add comment to paper
- [ ] View paper details
- [ ] Filter papers by likes
- [ ] Sort papers by views
- [ ] Add community paper to circle
- [ ] Assign circle paper to session
- [ ] View session agenda with papers

## User Flow Examples

### Flow 1: arXiv → Community → Circle → Session
```
1. Search arXiv for "neural networks"
2. Click + on interesting paper
3. Select "AI Research Group" community
4. Import paper
5. Go to Community Papers
6. Click "Add to Circle" → Select "Deep Learning Circle"
7. Go to Circle Papers
8. Click "Assign to Session" → Select "Next Week's Meeting"
```

### Flow 2: AI Discovery → Multiple Communities
```
1. Use AI Discovery to find papers
2. Click + on paper with high novelty score
3. Modal shows all your communities
4. Select "Research Lab" community
5. Later, add same paper to "Reading Group" community
6. Paper appears in both community lists
```

## Notes

- The import modal is already working with community selection
- Need to build out the rest of the workflow progressively
- Focus on database schema first, then UI components
- Thumbnail generation can be added later as enhancement

---

**Current Phase**: Phase 1 Complete ✅
**Next Phase**: Database schema verification and Community Papers view
