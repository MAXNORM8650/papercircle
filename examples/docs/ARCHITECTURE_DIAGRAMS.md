# Paper Circle - Complete Architecture Diagrams

This document contains comprehensive diagrams for the Paper Circle system, including overall architecture, component details, data flows, and workflows.

---

## 1. Overall System Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              PAPER CIRCLE SYSTEM                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                                  FRONTEND LAYER                                  │
│                           (React + TypeScript + Vite)                            │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐        │
│  │   Auth UI    │  │  Discovery   │  │  Communities │  │   Sessions   │        │
│  │              │  │      UI      │  │      UI      │  │      UI      │        │
│  │ - Login      │  │ - AI Search  │  │ - Circles    │  │ - Schedule   │        │
│  │ - Signup     │  │ - Results    │  │ - Members    │  │ - RSVP       │        │
│  │ - Profile    │  │ - Filters    │  │ - Invites    │  │ - Check-in   │        │
│  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘  └──────┬───────┘        │
│         │                 │                 │                 │                  │
│  ┌──────┴─────────────────┴─────────────────┴─────────────────┴──────┐          │
│  │                    REACT CONTEXT LAYER                             │          │
│  │  ┌──────────────┐              ┌──────────────┐                   │          │
│  │  │ AuthContext  │              │  Community   │                   │          │
│  │  │              │              │   Context    │                   │          │
│  │  └──────────────┘              └──────────────┘                   │          │
│  └────────────────────────────────────────────────────────────────────┘          │
│                                     │                                             │
│  ┌──────────────────────────────────┴─────────────────────────────────┐          │
│  │                     SUPABASE JS CLIENT                              │          │
│  │  - Database queries (PostgreSQL)                                    │          │
│  │  - Authentication (JWT)                                             │          │
│  │  - Real-time subscriptions                                          │          │
│  │  - Storage (file uploads)                                           │          │
│  └─────────────────┬────────────────────────────────┬──────────────────┘          │
│                    │                                │                             │
└────────────────────┼────────────────────────────────┼─────────────────────────────┘
                     │                                │
                     ▼                                ▼
    ┌────────────────────────────┐   ┌────────────────────────────────────┐
    │   SUPABASE CLOUD           │   │    BACKEND APIs (Python/FastAPI)   │
    │   (Database + Auth)        │   │                                    │
    ├────────────────────────────┤   ├────────────────────────────────────┤
    │                            │   │                                    │
    │ ┌────────────────────────┐ │   │  ┌──────────────────────────┐    │
    │ │ PostgreSQL + pgvector  │ │   │  │  Paperfinder API         │    │
    │ │                        │ │   │  │  (Port 8000)             │    │
    │ │ Tables:                │ │   │  │  - Paper discovery       │    │
    │ │ - profiles             │ │   │  │  - Multi-agent search    │    │
    │ │ - papers               │ │   │  │  - Query generation      │    │
    │ │ - communities          │ │   │  └──────────┬───────────────┘    │
    │ │ - community_members    │ │   │             │                    │
    │ │ - sessions             │ │   │  ┌──────────┴───────────────┐    │
    │ │ - rsvps                │ │   │  │  Paper Analysis API      │    │
    │ │ - discussions          │ │   │  │  (Port 8001)             │    │
    │ │ - edges (lineage)      │ │   │  │  - Deep analysis         │    │
    │ │ - community_papers     │ │   │  │  - Mind graph            │    │
    │ └────────────────────────┘ │   │  │  - Q&A system            │    │
    │                            │   │  └──────────┬───────────────┘    │
    │ ┌────────────────────────┐ │   │             │                    │
    │ │ Auth System            │ │   │  ┌──────────┴───────────────┐    │
    │ │ - JWT tokens           │ │   │  │  Research Pipeline API   │    │
    │ │ - Session management   │ │   │  │  - Multi-agent orchestr. │    │
    │ │ - Password hashing     │ │   │  │  - Research workflows    │    │
    │ └────────────────────────┘ │   │  └──────────────────────────┘    │
    │                            │   │                                    │
    │ ┌────────────────────────┐ │   └────────────────────────────────────┘
    │ │ Row Level Security     │ │                    │
    │ │ - RLS Policies         │ │                    │
    │ │ - Role-based access    │ │                    ▼
    │ └────────────────────────┘ │   ┌────────────────────────────────────┐
    │                            │   │    AI AGENT LAYER                  │
    │ ┌────────────────────────┐ │   │    (smolagents + LiteLLM)          │
    │ │ Storage                │ │   ├────────────────────────────────────┤
    │ │ - Research outputs     │ │   │                                    │
    │ │ - Paper PDFs           │ │   │  ┌──────────────────────────┐     │
    │ └────────────────────────┘ │   │  │  Query Generation Agent  │     │
    └────────────────────────────┘   │  │  - NL → structured query │     │
                                     │  │  - Keyword extraction     │     │
                                     │  └──────────┬───────────────┘     │
                                     │             │                     │
                                     │  ┌──────────┴───────────────┐     │
                                     │  │  Paper Retrieval Agents  │     │
                                     │  │  - arXiv search          │     │
                                     │  │  - Scopus/IEEE (findp.)  │     │
                                     │  │  - Deduplication         │     │
                                     │  └──────────┬───────────────┘     │
                                     │             │                     │
                                     │  ┌──────────┴───────────────┐     │
                                     │  │  Scoring & Ranking       │     │
                                     │  │  - TF-IDF relevance      │     │
                                     │  │  - Authority score       │     │
                                     │  │  - Novelty detection     │     │
                                     │  │  - MMR diversity         │     │
                                     │  └──────────┬───────────────┘     │
                                     │             │                     │
                                     │  ┌──────────┴───────────────┐     │
                                     │  │  Knowledge Graph Agents  │     │
                                     │  │  - PDF parsing           │     │
                                     │  │  - Concept extraction    │     │
                                     │  │  - Graph building        │     │
                                     │  │  - Q&A system            │     │
                                     │  └──────────┬───────────────┘     │
                                     │             │                     │
                                     │  ┌──────────┴───────────────┐     │
                                     │  │  Review System Agents    │     │
                                     │  │  - Metadata extractor    │     │
                                     │  │  - Deep analyzer         │     │
                                     │  │  - Critic (reviewer)     │     │
                                     │  │  - Literature expert     │     │
                                     │  │  - Reproducibility check │     │
                                     │  └──────────────────────────┘     │
                                     └────────────────────────────────────┘
                                                      │
                                                      ▼
                                     ┌────────────────────────────────────┐
                                     │    EXTERNAL SERVICES               │
                                     ├────────────────────────────────────┤
                                     │                                    │
                                     │  ┌──────────────────────────┐     │
                                     │  │  Ollama LLM Server       │     │
                                     │  │  - qwen3-coder:30b       │     │
                                     │  │  - gpt-oss:20b           │     │
                                     │  └──────────────────────────┘     │
                                     │                                    │
                                     │  ┌──────────────────────────┐     │
                                     │  │  Paper Sources           │     │
                                     │  │  - arXiv API             │     │
                                     │  │  - Scopus                │     │
                                     │  │  - IEEE Xplore           │     │
                                     │  │  - findpapers library    │     │
                                     │  └──────────────────────────┘     │
                                     └────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                               DEPLOYMENT LAYER                                   │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  Frontend: Vercel/Netlify (Static hosting + Serverless functions)               │
│  Backend:  Railway/Render (Docker containers)                                    │
│  Database: Supabase Cloud (Managed PostgreSQL + Auth + Storage)                 │
│  LLM:      Self-hosted Ollama server (GPU instance)                             │
│                                                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 2. Frontend Architecture (Detailed)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                            FRONTEND ARCHITECTURE                                 │
│                         (React 18 + TypeScript + Vite)                           │
└─────────────────────────────────────────────────────────────────────────────────┘

                                    ┌──────────────┐
                                    │   App.tsx    │
                                    │  (Router)    │
                                    └──────┬───────┘
                                           │
                    ┌──────────────────────┼──────────────────────┐
                    │                      │                      │
         ┌──────────▼─────────┐ ┌─────────▼────────┐ ┌──────────▼─────────┐
         │  AuthContext       │ │ CommunityContext │ │  Layout Components │
         │                    │ │                  │ │                    │
         │ - user             │ │ - currentCircle  │ │ - Header           │
         │ - profile          │ │ - circles        │ │ - Navigation       │
         │ - signIn()         │ │ - members        │ │ - Footer           │
         │ - signOut()        │ │ - switchCircle() │ │                    │
         │ - updateProfile()  │ │ - loadCircles()  │ │                    │
         └──────────┬─────────┘ └─────────┬────────┘ └────────────────────┘
                    │                     │
                    │                     │
      ┌─────────────┴─────────────────────┴─────────────────┐
      │                                                       │
      │                  MAIN ROUTE COMPONENTS               │
      │                                                       │
      ├───────────────┬──────────────┬──────────────┬────────┴───────┬──────────┐
      │               │              │              │                │          │
┌─────▼─────┐  ┌──────▼─────┐ ┌─────▼─────┐ ┌─────▼──────┐  ┌──────▼─────┐  ┌─▼──────┐
│ Dashboard │  │  Discover  │ │ Lineage   │ │  Sessions  │  │ Communities│  │ Profile│
│           │  │    View    │ │   View    │ │    View    │  │    View    │  │  View  │
└───────────┘  └──────┬─────┘ └───────────┘ └──────┬─────┘  └──────┬─────┘  └────────┘
                      │                             │               │
                      │                             │               │
       ┌──────────────┴──────────────┐              │               │
       │                             │              │               │
┌──────▼──────────┐      ┌───────────▼─────────┐   │               │
│ AIDiscoveryView │      │ CommunityPapersTab  │   │               │
│                 │      │                     │   │               │
│ ┌─────────────┐ │      │ - Community papers  │   │               │
│ │ Fast Mode   │ │      │ - Saved papers      │   │               │
│ │             │ │      │ - Filters           │   │               │
│ │ - Quick     │ │      └─────────────────────┘   │               │
│ │   search    │ │                                │               │
│ └─────────────┘ │                                │               │
│                 │                                │               │
│ ┌─────────────┐ │                                │               │
│ │ Multi-Agent │ │      ┌─────────────────────────▼───────────────▼──────┐
│ │ Mode        │ │      │                                                 │
│ │             │ │      │          SESSION MANAGEMENT COMPONENTS          │
│ │ - Progress  │ │      │                                                 │
│ │   tracking  │ │      ├──────────────┬──────────────┬──────────────────┤
│ │ - Results   │ │      │              │              │                  │
│ │   categor.  │ │      │ ┌────────────▼───────────┐  │  ┌───────────────▼──┐
│ │ - Scores    │ │      │ │  SessionCard           │  │  │  RSVPButton      │
│ └─────────────┘ │      │ │                        │  │  │                  │
│                 │      │ │ - Title, time, paper   │  │  │ - Attend/Maybe/  │
│ ┌─────────────┐ │      │ │ - Presenter            │  │  │   Not attending  │
│ │ Results     │ │      │ │ - RSVP count           │  │  └──────────────────┘
│ │ Display     │ │      │ └────────────────────────┘  │
│ │             │ │      │                             │  ┌───────────────────┐
│ │ - Overall   │ │      │ ┌───────────────────────┐   │  │ CheckInButton     │
│ │ - Hidden    │ │      │ │  SessionDetail        │   │  │                   │
│ │   Gems      │ │      │ │                       │   │  │ - Mark attended   │
│ │ - Canonical │ │      │ │ - Discussion threads  │   │  └───────────────────┘
│ │             │ │      │ │ - Slides/recordings   │   │
│ │ - Paper     │ │      │ │ - Notes               │   │
│ │   cards     │ │      │ └───────────────────────┘   │
│ └─────────────┘ │      │                             │
└─────────────────┘      └─────────────────────────────┘
         │
         │
         ▼
┌─────────────────────────────────────────────────────────┐
│              PAPER DETAIL & ANALYSIS COMPONENTS          │
│                                                          │
├──────────────┬──────────────┬────────────────────────────┤
│              │              │                            │
│ ┌────────────▼───────────┐  │  ┌─────────────────────────▼──┐
│ │ PaperDetailView        │  │  │  PaperAnalysisView         │
│ │                        │  │  │                            │
│ │ - Metadata             │  │  │  - Deep AI analysis        │
│ │ - Abstract             │  │  │  - Contributions           │
│ │ - Authors              │  │  │  - Methodology             │
│ │ - PDF link             │  │  │  - Experiments             │
│ │ - Add to community     │  │  │  - Critical review         │
│ │ - Add relationship     │  │  │  - Reproducibility         │
│ │ - Discussion threads   │  │  │  - Mind graph view         │
│ └────────────────────────┘  │  │  - Q&A interface           │
│                             │  └────────────────────────────┘
│ ┌────────────────────────┐  │
│ │ LineageGraphView       │  │  ┌─────────────────────────────┐
│ │                        │  │  │  ResearchDashboard          │
│ │ - Interactive graph    │  │  │                             │
│ │ - Node types           │  │  │  - Multi-agent results      │
│ │ - Edge types           │  │  │  - Research pipeline status │
│ │ - Relationship filter  │  │  │  - Output visualization     │
│ │ - Zoom/pan controls    │  │  └─────────────────────────────┘
│ └────────────────────────┘  │
└─────────────────────────────┘

                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│          COMMUNITY MANAGEMENT COMPONENTS                │
│                                                         │
├──────────────┬──────────────┬──────────────────────────┤
│              │              │                          │
│ ┌────────────▼───────────┐  │  ┌───────────────────────▼──┐
│ │ CircleManagement       │  │  │  InviteAcceptModal       │
│ │                        │  │  │                          │
│ │ - Create circle        │  │  │  - Accept invitation     │
│ │ - Edit details         │  │  │  - View circle info      │
│ │ - Member list          │  │  │  - Join circle           │
│ │ - Role management      │  │  └──────────────────────────┘
│ │ - Invite link          │  │
│ └────────────────────────┘  │  ┌──────────────────────────┐
│                             │  │  MemberManagement        │
│ ┌────────────────────────┐  │  │                          │
│ │ CircleCard             │  │  │  - Add/remove members    │
│ │                        │  │  │  - Change roles          │
│ │ - Name, description    │  │  │  - View member profiles  │
│ │ - Member count         │  │  └──────────────────────────┘
│ │ - Public/private tag   │  │
│ │ - Join/manage button   │  │
│ └────────────────────────┘  │
└─────────────────────────────┘

                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│              SHARED/UTILITY COMPONENTS                  │
│                                                         │
│  - PaperCard (display paper with scores)               │
│  - DiscussionThread (nested comments)                  │
│  - LoadingSpinner (async operations)                   │
│  - ErrorBoundary (error handling)                      │
│  - SearchBar (filtering/search)                        │
│  - DatePicker (session scheduling)                     │
│  - RoleSelector (member roles)                         │
│  - MarkdownRenderer (rich text display)               │
│                                                         │
└────────────────────────────────────────────────────────┘

                 │
                 ▼
┌────────────────────────────────────────────────────────┐
│                  SUPABASE CLIENT LAYER                  │
│                     (lib/supabase.ts)                   │
│                                                         │
│  - createClient() - Initialize Supabase                │
│  - Auth: signIn, signUp, signOut, getSession           │
│  - Database: from(), select(), insert(), update()      │
│  - Storage: upload(), download(), getPublicUrl()       │
│  - Realtime: subscribe(), unsubscribe()                │
│                                                         │
└────────────────────────────────────────────────────────┘
```

---

## 3. Backend & Agent Pipeline Architecture

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         BACKEND & AGENT ARCHITECTURE                             │
│                           (Python + FastAPI + AI Agents)                         │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│                              FASTAPI SERVERS                                     │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  ┌──────────────────────────────────────────────────────────────────────────┐   │
│  │  Paperfinder API (Port 8000)                                             │   │
│  │  File: backend/apis/paperfinder_api.py                                   │   │
│  ├──────────────────────────────────────────────────────────────────────────┤   │
│  │                                                                           │   │
│  │  Endpoints:                                                               │   │
│  │  ┌────────────────────────────────────────────────────────────────┐      │   │
│  │  │ POST /discover                                                 │      │   │
│  │  │   Body: { query, mode, max_results, community_id }            │      │   │
│  │  │   Returns: { papers[], categorized_results, scores }          │      │   │
│  │  └────────────────────────────────────────────────────────────────┘      │   │
│  │                                                                           │   │
│  │  ┌────────────────────────────────────────────────────────────────┐      │   │
│  │  │ GET /modes                                                     │      │   │
│  │  │   Returns: [{ name, description, weights }]                   │      │   │
│  │  └────────────────────────────────────────────────────────────────┘      │   │
│  │                                                                           │   │
│  │  ┌────────────────────────────────────────────────────────────────┐      │   │
│  │  │ GET /mode-weights                                              │      │   │
│  │  │   Returns: { stable, discovery, balanced }                    │      │   │
│  │  └────────────────────────────────────────────────────────────────┘      │   │
│  │                                                                           │   │
│  └───────────────────────────────┬───────────────────────────────────────────┘   │
│                                  │                                               │
│  ┌───────────────────────────────▼───────────────────────────────────────────┐   │
│  │  Paper Analysis API (Port 8001)                                           │   │
│  │  File: backend/apis/paper_analysis_api.py                                 │   │
│  ├───────────────────────────────────────────────────────────────────────────┤   │
│  │                                                                            │   │
│  │  Endpoints:                                                                │   │
│  │  ┌────────────────────────────────────────────────────────────────┐       │   │
│  │  │ POST /analyze                                                  │       │   │
│  │  │   Body: { paper_url, include_mind_graph, enable_qa }          │       │   │
│  │  │   Returns: { run_id, analysis, mind_graph, qa_available }     │       │   │
│  │  └────────────────────────────────────────────────────────────────┘       │   │
│  │                                                                            │   │
│  │  ┌────────────────────────────────────────────────────────────────┐       │   │
│  │  │ POST /quick-analyze                                            │       │   │
│  │  │   Body: { paper_url }                                          │       │   │
│  │  │   Returns: { summary, contributions, methodology }             │       │   │
│  │  └────────────────────────────────────────────────────────────────┘       │   │
│  │                                                                            │   │
│  │  ┌────────────────────────────────────────────────────────────────┐       │   │
│  │  │ GET /analysis/{run_id}                                         │       │   │
│  │  │   Returns: { analysis, status }                                │       │   │
│  │  └────────────────────────────────────────────────────────────────┘       │   │
│  │                                                                            │   │
│  └───────────────────────────────┬────────────────────────────────────────────┘   │
│                                  │                                                │
│  ┌───────────────────────────────▼────────────────────────────────────────────┐   │
│  │  Research Pipeline API                                                     │   │
│  │  File: backend/apis/research_pipeline_api.py                               │   │
│  ├────────────────────────────────────────────────────────────────────────────┤   │
│  │                                                                             │   │
│  │  Endpoints:                                                                 │   │
│  │  ┌────────────────────────────────────────────────────────────────┐        │   │
│  │  │ POST /research                                                 │        │   │
│  │  │   Body: { topic, agents[], output_format }                    │        │   │
│  │  │   Returns: { run_id, status }                                 │        │   │
│  │  └────────────────────────────────────────────────────────────────┘        │   │
│  │                                                                             │   │
│  │  ┌────────────────────────────────────────────────────────────────┐        │   │
│  │  │ GET /status/{run_id}                                           │        │   │
│  │  │   Returns: { status, progress, results }                      │        │   │
│  │  └────────────────────────────────────────────────────────────────┘        │   │
│  │                                                                             │   │
│  └─────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘

                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              CORE BUSINESS LOGIC                                 │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  ┌───────────────────────────────────────────────────────────────────────────┐   │
│  │  Paperfinder Core (backend/core/paperfinder.py)                           │   │
│  ├───────────────────────────────────────────────────────────────────────────┤   │
│  │                                                                            │   │
│  │  Main Class: PaperFinder                                                  │   │
│  │                                                                            │   │
│  │  ┌─────────────────────────────────────────────────────────────┐          │   │
│  │  │  discover_papers(query, mode, max_results)                 │          │   │
│  │  │                                                             │          │   │
│  │  │  1. Generate structured query (via QueryAgent)             │          │   │
│  │  │  2. Multi-source retrieval                                 │          │   │
│  │  │  3. Deduplicate papers                                     │          │   │
│  │  │  4. Score papers (relevance + authority + novelty)         │          │   │
│  │  │  5. Apply MMR diversity filtering                          │          │   │
│  │  │  6. Categorize results                                     │          │   │
│  │  │  7. Return ranked papers                                   │          │   │
│  │  └─────────────────────────────────────────────────────────────┘          │   │
│  │                                                                            │   │
│  │  Methods:                                                                  │   │
│  │  - _generate_query_spec() - Call QueryGenerationAgent                     │   │
│  │  - _retrieve_papers() - Search arXiv + findpapers                         │   │
│  │  - _deduplicate() - Remove duplicates by DOI/title                        │   │
│  │  - _score_relevance() - TF-IDF cosine similarity                          │   │
│  │  - _score_authority() - Recency + venue prestige                          │   │
│  │  - _score_novelty() - Distance from corpus centroid                       │   │
│  │  - _calculate_final_scores() - Weighted combination                       │   │
│  │  - _apply_mmr() - Maximal Marginal Relevance                              │   │
│  │  - _categorize_results() - Overall/HiddenGems/Canonical                   │   │
│  │                                                                            │   │
│  └────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                   │
│  ┌───────────────────────────────────────────────────────────────────────────┐   │
│  │  Discovery Papers (backend/core/discovery_papers.py)                      │   │
│  ├───────────────────────────────────────────────────────────────────────────┤   │
│  │                                                                            │   │
│  │  Functions:                                                                │   │
│  │  - search_arxiv() - Direct arXiv API search                               │   │
│  │  - search_findpapers() - Scopus + IEEE via findpapers                     │   │
│  │  - parse_paper_metadata() - Extract structured data                       │   │
│  │  - calculate_tfidf_scores() - scikit-learn TF-IDF                         │   │
│  │  - mmr_diversification() - Diversity filtering                            │   │
│  │                                                                            │   │
│  └────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘

                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                              AI AGENT SYSTEMS                                    │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  ┌───────────────────────────────────────────────────────────────────────────┐   │
│  │  Query Generation Agent (backend/agents/agents/query.py)                  │   │
│  ├───────────────────────────────────────────────────────────────────────────┤   │
│  │                                                                            │   │
│  │  Class: QueryGenerationAgent                                              │   │
│  │  Framework: smolagents                                                     │   │
│  │  LLM: Ollama (qwen3-coder:30b or gpt-oss:20b)                             │   │
│  │                                                                            │   │
│  │  Input: Natural language query                                            │   │
│  │  Output: Structured search specification                                  │   │
│  │                                                                            │   │
│  │  ┌─────────────────────────────────────────────────────────────┐          │   │
│  │  │  Output Schema:                                             │          │   │
│  │  │  {                                                          │          │   │
│  │  │    "core_keywords": ["keyword1", "keyword2"],              │          │   │
│  │  │    "must_include": ["required term"],                      │          │   │
│  │  │    "nice_to_have": ["optional term"],                      │          │   │
│  │  │    "negative_keywords": ["exclude term"],                  │          │   │
│  │  │    "suggested_mode": "balanced|stable|discovery",          │          │   │
│  │  │    "plausible_paper_titles": ["Example title 1"]           │          │   │
│  │  │  }                                                          │          │   │
│  │  └─────────────────────────────────────────────────────────────┘          │   │
│  │                                                                            │   │
│  └────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                   │
│  ┌───────────────────────────────────────────────────────────────────────────┐   │
│  │  Paper Mind Graph System (backend/agents/paper_mind_graph/)               │   │
│  ├───────────────────────────────────────────────────────────────────────────┤   │
│  │                                                                            │   │
│  │  Main API: api.py                                                          │   │
│  │                                                                            │   │
│  │  Pipeline:                                                                 │   │
│  │  ┌─────────────────────────────────────────────────────────────┐          │   │
│  │  │  1. PDF Ingestion (ingestion.py)                           │          │   │
│  │  │     - Download PDF from URL/path                           │          │   │
│  │  │     - Parse with PyMuPDF                                   │          │   │
│  │  │     - Extract text, sections, figures, equations          │          │   │
│  │  │     - Chunk content (max 1500 chars, semantic)            │          │   │
│  │  └─────────────────────────────────────────────────────────────┘          │   │
│  │                         │                                                  │   │
│  │  ┌──────────────────────▼──────────────────────────────────────┐          │   │
│  │  │  2. Graph Building (graph_builder.py)                      │          │   │
│  │  │     - LLM agent extracts:                                  │          │   │
│  │  │       * Concepts (definitions, terminology)                │          │   │
│  │  │       * Methods (algorithms, techniques)                   │          │   │
│  │  │       * Experiments (setup, results)                       │          │   │
│  │  │       * Datasets, Tasks, Metrics                           │          │   │
│  │  │     - Build edges:                                         │          │   │
│  │  │       * Structural (has_section, has_subsection)           │          │   │
│  │  │       * Content (defines, uses_method, proposes)           │          │   │
│  │  │       * Visual (illustrated_by, summarized_by)             │          │   │
│  │  │       * Semantic (extends, contradicts, supports)          │          │   │
│  │  └─────────────────────────────────────────────────────────────┘          │   │
│  │                         │                                                  │   │
│  │  ┌──────────────────────▼──────────────────────────────────────┐          │   │
│  │  │  3. Verification (verification.py)                         │          │   │
│  │  │     - Check coverage of all sections                       │          │   │
│  │  │     - Identify gaps                                        │          │   │
│  │  │     - Quality metrics                                      │          │   │
│  │  └─────────────────────────────────────────────────────────────┘          │   │
│  │                         │                                                  │   │
│  │  ┌──────────────────────▼──────────────────────────────────────┐          │   │
│  │  │  4. Q&A System (qa_system.py)                              │          │   │
│  │  │     - User asks question                                   │          │   │
│  │  │     - Retrieve relevant nodes/edges from graph             │          │   │
│  │  │     - LLM generates answer with citations                  │          │   │
│  │  └─────────────────────────────────────────────────────────────┘          │   │
│  │                         │                                                  │   │
│  │  ┌──────────────────────▼──────────────────────────────────────┐          │   │
│  │  │  5. Export (export.py)                                     │          │   │
│  │  │     - JSON (full graph data)                               │          │   │
│  │  │     - Markdown (human-readable)                            │          │   │
│  │  │     - Mermaid (visualization)                              │          │   │
│  │  └─────────────────────────────────────────────────────────────┘          │   │
│  │                                                                            │   │
│  │  Data Models (schema.py):                                                  │   │
│  │  - Node types: Paper, Section, Concept, Method, Experiment                │   │
│  │  - Edge types: structural, content, visual, semantic                      │   │
│  │  - Graph class with add/remove/query operations                           │   │
│  │                                                                            │   │
│  └────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                   │
│  ┌───────────────────────────────────────────────────────────────────────────┐   │
│  │  Paper Review System (backend/agents/paper_review_agents/)                │   │
│  ├───────────────────────────────────────────────────────────────────────────┤   │
│  │                                                                            │   │
│  │  Orchestrator (orchestrator.py):                                          │   │
│  │                                                                            │   │
│  │  ┌─────────────────────────────────────────────────────────────┐          │   │
│  │  │  Multi-Agent Coordinator                                    │          │   │
│  │  │                                                             │          │   │
│  │  │  Agents:                                                    │          │   │
│  │  │  1. PDF Processor - Parse paper structure                  │          │   │
│  │  │  2. Metadata Extractor - Title, authors, venue             │          │   │
│  │  │  3. Deep Analyzer - Contributions, methodology             │          │   │
│  │  │  4. Critic - Senior reviewer persona, critique             │          │   │
│  │  │  5. Literature Expert - Position in field                  │          │   │
│  │  │  6. Knowledge Graph Builder - Concept extraction           │          │   │
│  │  │  7. Contribution Analyzer - Novel contributions            │          │   │
│  │  │  8. Reproducibility Checker - Code, data availability      │          │   │
│  │  │  9. Summarizer - Final comprehensive summary               │          │   │
│  │  │                                                             │          │   │
│  │  │  Execution:                                                 │          │   │
│  │  │  - Parallel execution where possible                       │          │   │
│  │  │  - Dependency management (e.g., Critic needs Deep Analyzer)│          │   │
│  │  │  - Error handling with fallbacks                           │          │   │
│  │  │  - Progress tracking                                       │          │   │
│  │  │  - Result aggregation                                      │          │   │
│  │  └─────────────────────────────────────────────────────────────┘          │   │
│  │                                                                            │   │
│  │  Specialized Agents (specialized_agents.py):                              │   │
│  │  - Each agent has specific prompts and tools                              │   │
│  │  - LLM: Ollama (qwen3-coder:30b)                                          │   │
│  │  - Output: Structured JSON with findings                                  │   │
│  │                                                                            │   │
│  └────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘

                                        │
                                        ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│                           EXTERNAL INTEGRATIONS                                  │
├─────────────────────────────────────────────────────────────────────────────────┤
│                                                                                   │
│  ┌───────────────────────────────────────────────────────────────────────────┐   │
│  │  Ollama LLM Server                                                        │   │
│  │  URL: http://10.127.30.115:11434                                          │   │
│  │                                                                            │   │
│  │  Models:                                                                   │   │
│  │  - qwen3-coder:30b (primary, coding tasks)                                │   │
│  │  - gpt-oss:20b (fallback)                                                 │   │
│  │                                                                            │   │
│  │  Usage:                                                                    │   │
│  │  - Query generation                                                        │   │
│  │  - Concept extraction                                                      │   │
│  │  - Graph building                                                          │   │
│  │  - Q&A                                                                     │   │
│  │  - Paper analysis                                                          │   │
│  └────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                   │
│  ┌───────────────────────────────────────────────────────────────────────────┐   │
│  │  Paper Sources                                                            │   │
│  │                                                                            │   │
│  │  1. arXiv API                                                              │   │
│  │     - Library: arxiv-py                                                    │   │
│  │     - Search by query, category, author                                   │   │
│  │     - Returns: title, abstract, authors, PDF URL                          │   │
│  │                                                                            │   │
│  │  2. findpapers Library                                                     │   │
│  │     - Aggregates Scopus, IEEE Xplore                                      │   │
│  │     - Search by keywords                                                   │   │
│  │     - Returns: metadata, DOI, citations                                   │   │
│  │                                                                            │   │
│  └────────────────────────────────────────────────────────────────────────────┘   │
│                                                                                   │
│  ┌───────────────────────────────────────────────────────────────────────────┐   │
│  │  Supabase Integration (backend/agents/discovery/supabase_integration.py) │   │
│  │                                                                            │   │
│  │  Functions:                                                                │   │
│  │  - save_papers_to_community() - Bulk insert to community_papers_global    │   │
│  │  - save_to_supabase() - Store discovered papers                           │   │
│  │  - update_paper_metadata() - Enrich existing papers                       │   │
│  │                                                                            │   │
│  └────────────────────────────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────────────────────────┘
```

---

## 4. Paper Discovery Workflow (Detailed)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                        PAPER DISCOVERY WORKFLOW                                  │
│                         (Multi-Agent AI Pipeline)                                │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 1: USER INPUT                                                              │
└─────────────────────────────────────────────────────────────────────────────────┘

User enters natural language query in AIDiscoveryView
Example: "Recent advances in transformer models for computer vision"
             │
             ├─ Select Mode: Balanced / Stable / Discovery
             ├─ Max Results: 20
             └─ Community: (optional) Save to specific circle
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 2: FRONTEND API CALL                                                       │
└─────────────────────────────────────────────────────────────────────────────────┘

POST http://localhost:8000/discover
Body: {
  "query": "Recent advances in transformer models for computer vision",
  "mode": "balanced",
  "max_results": 20,
  "community_id": "uuid-xxxx" (optional)
}
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 3: QUERY GENERATION AGENT                                                  │
│  File: backend/agents/agents/query.py                                            │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  QueryGenerationAgent (LLM: qwen3-coder:30b via Ollama)                      │
│                                                                               │
│  Input: "Recent advances in transformer models for computer vision"          │
│                                                                               │
│  LLM Prompt:                                                                  │
│  "Convert this natural language query into a structured search               │
│   specification with core keywords, must-include terms, nice-to-have         │
│   terms, negative keywords, and suggested discovery mode."                   │
│                                                                               │
│  Output (Structured JSON):                                                    │
│  {                                                                            │
│    "core_keywords": [                                                         │
│      "transformer", "vision transformer", "ViT", "attention mechanism",      │
│      "computer vision", "image classification"                               │
│    ],                                                                         │
│    "must_include": ["transformer", "vision"],                                │
│    "nice_to_have": [                                                          │
│      "self-attention", "patch embedding", "BERT", "GPT",                     │
│      "object detection", "semantic segmentation"                             │
│    ],                                                                         │
│    "negative_keywords": ["NLP", "text", "language model"],                   │
│    "suggested_mode": "balanced",                                             │
│    "plausible_paper_titles": [                                               │
│      "An Image is Worth 16x16 Words: Transformers for Image Recognition",   │
│      "Swin Transformer: Hierarchical Vision Transformer",                    │
│      "Vision Transformer (ViT) for Computer Vision Tasks"                    │
│    ]                                                                          │
│  }                                                                            │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 4: MULTI-SOURCE RETRIEVAL                                                  │
│  File: backend/core/discovery_papers.py                                          │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  Parallel Retrieval from Multiple Sources:                                   │
│                                                                               │
│  ┌─────────────────────────────┐      ┌─────────────────────────────┐       │
│  │  arXiv Search               │      │  findpapers Search          │       │
│  │  (via arxiv-py library)     │      │  (Scopus + IEEE Xplore)     │       │
│  ├─────────────────────────────┤      ├─────────────────────────────┤       │
│  │                             │      │                             │       │
│  │  Query construction:        │      │  Query construction:        │       │
│  │  - Join core_keywords       │      │  - Join core_keywords       │       │
│  │  - Add must_include (AND)   │      │  - Add filters              │       │
│  │  - Exclude negative (NOT)   │      │  - Date range (recent)      │       │
│  │                             │      │                             │       │
│  │  Search fields:             │      │  Search fields:             │       │
│  │  - Title                    │      │  - Title + Abstract         │       │
│  │  - Abstract                 │      │  - Keywords                 │       │
│  │  - Categories               │      │                             │       │
│  │                             │      │                             │       │
│  │  Returns ~50 papers         │      │  Returns ~50 papers         │       │
│  └─────────────┬───────────────┘      └─────────────┬───────────────┘       │
│                │                                     │                       │
│                └──────────────────┬──────────────────┘                       │
│                                   ▼                                          │
│                        Combined: ~100 papers                                 │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 5: DEDUPLICATION                                                           │
│  File: backend/core/paperfinder.py → _deduplicate()                             │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  Deduplication Strategy:                                                      │
│                                                                               │
│  1. Group by DOI (if available)                                              │
│     - Keep first occurrence                                                   │
│                                                                               │
│  2. Fuzzy title matching                                                      │
│     - Normalize: lowercase, remove punctuation                               │
│     - Calculate similarity (Levenshtein distance)                            │
│     - Threshold: 0.85 similarity → duplicate                                 │
│     - Keep paper with more complete metadata                                 │
│                                                                               │
│  3. Author overlap check (secondary)                                          │
│     - If titles similar and >50% author overlap → duplicate                  │
│                                                                               │
│  Result: ~60-70 unique papers                                                │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 6: SCORING & RANKING                                                       │
│  File: backend/core/paperfinder.py → _score_*()                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

For each paper, calculate 3 scores:

┌──────────────────────────────────────────────────────────────────────────────┐
│  A. RELEVANCE SCORE (TF-IDF Cosine Similarity)                               │
│                                                                               │
│  1. Build TF-IDF vectors:                                                     │
│     - Corpus: All retrieved papers (title + abstract)                        │
│     - Query: core_keywords + must_include + nice_to_have                     │
│                                                                               │
│  2. Calculate cosine similarity:                                             │
│     similarity = (query_vector · paper_vector) /                             │
│                  (||query_vector|| * ||paper_vector||)                       │
│                                                                               │
│  3. Boost factors:                                                            │
│     - +0.2 if all must_include terms present                                 │
│     - +0.1 for each nice_to_have term                                        │
│     - -0.3 if any negative_keywords present                                  │
│                                                                               │
│  4. Normalize to [0, 1]                                                       │
│                                                                               │
│  Example: Paper "Swin Transformer" → Relevance = 0.87                        │
└───────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  B. AUTHORITY SCORE                                                           │
│                                                                               │
│  Components:                                                                  │
│                                                                               │
│  1. Recency Score:                                                            │
│     - Papers from last 6 months: 1.0                                         │
│     - Decay: 0.9 per 6 months                                                │
│     - Papers >3 years: 0.3                                                   │
│                                                                               │
│  2. Venue Prestige Score:                                                     │
│     - Top conferences (NeurIPS, ICML, CVPR, ICCV): 1.0                       │
│     - Major journals (Nature, Science): 1.0                                  │
│     - Well-known conferences (ECCV, AAAI): 0.8                               │
│     - Workshops, arXiv only: 0.5                                             │
│                                                                               │
│  3. Citation Count (normalized):                                             │
│     - citations_score = min(citations / 1000, 1.0)                           │
│                                                                               │
│  4. Final Authority:                                                          │
│     authority = 0.4 * recency + 0.35 * venue + 0.25 * citations              │
│                                                                               │
│  Example: "An Image is Worth 16x16 Words" (ICLR 2021, 5000+ citations)       │
│            → Authority = 0.82                                                 │
└───────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  C. NOVELTY SCORE                                                             │
│                                                                               │
│  1. Compute corpus centroid:                                                  │
│     - Average TF-IDF vector of all retrieved papers                          │
│                                                                               │
│  2. Calculate distance from centroid:                                         │
│     - Euclidean distance in TF-IDF space                                     │
│     - Papers far from centroid = more novel                                  │
│                                                                               │
│  3. Normalize to [0, 1]:                                                      │
│     novelty = (distance - min_distance) / (max_distance - min_distance)      │
│                                                                               │
│  4. Adjust for abstract length (avoid bias):                                 │
│     novelty = novelty * (1 - abs(len(abstract) - avg_length) / avg_length)  │
│                                                                               │
│  Example: "Vision GNN" (uncommon approach) → Novelty = 0.91                  │
│           "Standard CNN" (common) → Novelty = 0.23                           │
└───────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  D. FINAL SCORE (Weighted Combination)                                       │
│                                                                               │
│  Mode Weights:                                                                │
│  ┌─────────────┬────────────┬───────────┬─────────┐                         │
│  │    Mode     │ Relevance  │ Authority │ Novelty │                         │
│  ├─────────────┼────────────┼───────────┼─────────┤                         │
│  │ Stable      │    0.50    │   0.40    │  0.10   │                         │
│  │ Balanced    │    0.40    │   0.30    │  0.30   │                         │
│  │ Discovery   │    0.30    │   0.10    │  0.60   │                         │
│  └─────────────┴────────────┴───────────┴─────────┘                         │
│                                                                               │
│  Formula:                                                                     │
│  final_score = w_rel * relevance + w_auth * authority + w_nov * novelty      │
│                                                                               │
│  Example (Balanced mode):                                                     │
│  Paper X: relevance=0.87, authority=0.82, novelty=0.45                       │
│  final = 0.4*0.87 + 0.3*0.82 + 0.3*0.45 = 0.729                             │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 7: MMR DIVERSITY FILTERING                                                │
│  File: backend/core/discovery_papers.py → mmr_diversification()                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  Maximal Marginal Relevance (MMR) Algorithm                                  │
│                                                                               │
│  Purpose: Avoid redundant papers, maximize diversity                         │
│                                                                               │
│  Algorithm:                                                                   │
│  1. Start with empty result set R = []                                       │
│  2. Start with candidate set C = all_papers (sorted by final_score)          │
│                                                                               │
│  3. While |R| < max_results:                                                  │
│     a. For each paper p in C:                                                │
│        - Calculate: MMR_score(p) = λ * score(p) -                            │
│                                    (1-λ) * max_similarity(p, R)              │
│        where:                                                                 │
│          * λ = 0.7 (relevance vs diversity tradeoff)                         │
│          * max_similarity(p, R) = max cosine similarity between p            │
│                                    and any paper already in R                │
│                                                                               │
│     b. Select paper with highest MMR_score                                   │
│     c. Add to R, remove from C                                               │
│                                                                               │
│  Effect:                                                                      │
│  - First papers selected by pure score (R is empty)                          │
│  - Later papers penalized if too similar to already-selected papers          │
│  - Result: Diverse set covering different approaches/aspects                 │
│                                                                               │
│  Example:                                                                     │
│  Input: 70 papers → Output: 20 diverse papers                               │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 8: CATEGORIZATION                                                          │
│  File: backend/core/paperfinder.py → _categorize_results()                      │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  Split papers into 3 categories:                                             │
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────┐        │
│  │  1. OVERALL (Top 10 by final_score)                             │        │
│  │     - Best balance of relevance, authority, novelty             │        │
│  │     - Main results shown to user                                │        │
│  └──────────────────────────────────────────────────────────────────┘        │
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────┐        │
│  │  2. HIDDEN GEMS (Top 5 by novelty_score)                        │        │
│  │     - Novel approaches that might be overlooked                 │        │
│  │     - Lower authority but high novelty                          │        │
│  │     - Filter: novelty > 0.6                                     │        │
│  └──────────────────────────────────────────────────────────────────┘        │
│                                                                               │
│  ┌──────────────────────────────────────────────────────────────────┐        │
│  │  3. CANONICAL (Top 5 by authority_score)                        │        │
│  │     - Seminal works, highly cited, prestigious venues           │        │
│  │     - Foundational papers                                       │        │
│  │     - Filter: authority > 0.7, citations > 100                  │        │
│  └──────────────────────────────────────────────────────────────────┘        │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 9: OPTIONAL SAVE TO SUPABASE                                               │
│  File: backend/agents/discovery/supabase_integration.py                          │
└─────────────────────────────────────────────────────────────────────────────────┘

If community_id provided:
┌──────────────────────────────────────────────────────────────────────────────┐
│  1. For each paper in results:                                               │
│     a. Check if paper already exists in `papers` table (by arxiv_id/DOI)    │
│     b. If not exists:                                                        │
│        - INSERT into `papers`                                                │
│          (id, arxiv_id, title, abstract, authors, year, pdf_url, etc.)      │
│     c. INSERT into `community_papers_global`                                 │
│        (paper_id, source_type='discovery', imported_at)                      │
│                                                                               │
│  2. Return paper IDs for frontend                                            │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 10: RETURN RESULTS TO FRONTEND                                             │
└─────────────────────────────────────────────────────────────────────────────────┘

Response JSON:
{
  "query_spec": { ... },  // Structured query from Step 3
  "papers": [
    {
      "id": "uuid-or-arxiv-id",
      "title": "An Image is Worth 16x16 Words: ...",
      "abstract": "...",
      "authors": ["Alexey Dosovitskiy", ...],
      "year": 2021,
      "venue": "ICLR",
      "pdf_url": "https://arxiv.org/pdf/2010.11929",
      "scores": {
        "relevance": 0.87,
        "authority": 0.82,
        "novelty": 0.45,
        "final": 0.729
      },
      "metadata": {
        "citation_count": 5234,
        "methods": ["Vision Transformer", "Self-Attention"],
        "datasets": ["ImageNet"]
      }
    },
    ...
  ],
  "categorized": {
    "overall": [10 papers],
    "hidden_gems": [5 papers],
    "canonical": [5 papers]
  },
  "total_retrieved": 97,
  "total_unique": 68,
  "total_returned": 20
}
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 11: FRONTEND DISPLAY                                                       │
│  Component: AIDiscoveryView.tsx                                                  │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  Display tabs:                                                                │
│  - Overall (10 papers)                                                        │
│  - Hidden Gems (5 papers)                                                     │
│  - Canonical (5 papers)                                                       │
│                                                                               │
│  For each paper:                                                              │
│  - Title (clickable → PaperDetailView)                                       │
│  - Authors                                                                    │
│  - Year, Venue                                                                │
│  - Abstract (truncated)                                                       │
│  - Score bars: Relevance, Authority, Novelty                                 │
│  - Actions: Add to community, Save, View lineage                             │
└───────────────────────────────────────────────────────────────────────────────┘

END OF PAPER DISCOVERY WORKFLOW
```

---

## 5. Research Agent Workflow

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         RESEARCH AGENT WORKFLOW                                  │
│                      (Multi-Agent Research Pipeline)                             │
└─────────────────────────────────────────────────────────────────────────────────┘

This workflow demonstrates the multi-agent research pipeline for deep topic exploration.

┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 1: USER INITIATES RESEARCH                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

User provides research topic via ResearchDashboard.tsx
Example: "Comprehensive analysis of Vision Transformers in medical imaging"
             │
             ├─ Select agents: [Literature Survey, Trend Analysis, Gap Finder]
             ├─ Output format: Markdown + Mermaid diagrams
             └─ Depth: Deep (vs Quick)
             │
             ▼
POST /research
Body: {
  "topic": "Comprehensive analysis of Vision Transformers in medical imaging",
  "agents": ["literature_survey", "trend_analysis", "gap_finder"],
  "output_format": "markdown",
  "depth": "deep"
}
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 2: ORCHESTRATOR INITIALIZATION                                             │
│  File: backend/agents/paper_review_agents/orchestrator.py                        │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  ResearchOrchestrator                                                         │
│                                                                               │
│  1. Create run_id (unique identifier)                                        │
│  2. Initialize output directory: research_output/{run_id}/                   │
│  3. Parse topic and build execution plan                                     │
│  4. Identify dependencies between agents                                     │
│                                                                               │
│  Agent Dependency Graph:                                                      │
│                                                                               │
│      ┌───────────────────┐                                                   │
│      │ Literature Survey │ (no deps)                                         │
│      └─────────┬─────────┘                                                   │
│                │                                                              │
│      ┌─────────▼─────────┐                                                   │
│      │  Trend Analysis   │ (depends on Literature Survey)                    │
│      └─────────┬─────────┘                                                   │
│                │                                                              │
│      ┌─────────▼─────────┐                                                   │
│      │   Gap Finder      │ (depends on both above)                          │
│      └───────────────────┘                                                   │
│                                                                               │
│  5. Create task queue based on dependencies                                  │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 3: PARALLEL AGENT EXECUTION                                                │
└─────────────────────────────────────────────────────────────────────────────────┘

Execute agents in parallel where possible:

┌──────────────────────────────────────────────────────────────────────────────┐
│  AGENT 1: LITERATURE SURVEY AGENT                                            │
│  File: backend/agents/paper_review_agents/specialized_agents.py              │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Task: Comprehensive literature review                                       │
│                                                                               │
│  Steps:                                                                       │
│  1. Query Generation:                                                         │
│     - "Vision Transformers medical imaging"                                  │
│     - "ViT healthcare radiology pathology"                                   │
│     - "Attention mechanisms medical diagnosis"                               │
│                                                                               │
│  2. Paper Discovery (via Paperfinder API):                                   │
│     - Search all queries                                                      │
│     - Retrieve ~100 papers                                                    │
│     - Deduplicate                                                             │
│                                                                               │
│  3. Paper Analysis:                                                           │
│     For top 20 papers:                                                        │
│     - Download PDF                                                            │
│     - Extract metadata                                                        │
│     - Identify: contributions, methods, datasets, results                    │
│     - Categorize by: approach, application domain, year                      │
│                                                                               │
│  4. Synthesis (LLM):                                                          │
│     Prompt: "Synthesize literature review covering:                          │
│              - Historical development                                         │
│              - Key milestones                                                 │
│              - Major approaches                                               │
│              - Application domains                                            │
│              - Performance benchmarks"                                        │
│                                                                               │
│  5. Output:                                                                   │
│     {                                                                         │
│       "summary": "...",                                                       │
│       "timeline": [...],                                                      │
│       "key_papers": [...],                                                    │
│       "approaches": {...},                                                    │
│       "domains": ["radiology", "pathology", "dermatology"],                  │
│       "datasets": ["ChestX-ray14", "MIMIC-CXR", ...]                         │
│     }                                                                         │
│                                                                               │
│  Output file: research_output/{run_id}/literature_survey.json                │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│  AGENT 2: TREND ANALYSIS AGENT                                               │
│  (Waits for Literature Survey to complete)                                   │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Task: Identify trends and emerging directions                               │
│                                                                               │
│  Input: Literature survey results                                            │
│                                                                               │
│  Steps:                                                                       │
│  1. Temporal Analysis:                                                        │
│     - Group papers by year                                                    │
│     - Track method evolution (CNN → Transformer → Hybrid)                    │
│     - Identify publication rate trends                                       │
│                                                                               │
│  2. Topic Modeling:                                                           │
│     - Extract common themes from abstracts                                   │
│     - LDA/BERTopic clustering                                                │
│     - Identify emerging vs declining topics                                  │
│                                                                               │
│  3. Citation Network:                                                         │
│     - Build citation graph                                                    │
│     - Identify influential papers (high PageRank)                            │
│     - Detect research communities                                            │
│                                                                               │
│  4. Performance Trends:                                                       │
│     - Track accuracy improvements over time                                  │
│     - Identify plateaus and breakthroughs                                    │
│                                                                               │
│  5. LLM Synthesis:                                                            │
│     Prompt: "Analyze trends in Vision Transformers for medical imaging:      │
│              - What approaches are gaining traction?                         │
│              - What methods are becoming obsolete?                           │
│              - What are the emerging research directions?                    │
│              - What benchmarks are popular?"                                 │
│                                                                               │
│  6. Output:                                                                   │
│     {                                                                         │
│       "emerging_topics": ["3D medical image analysis", ...],                 │
│       "declining_topics": ["CNN-only approaches"],                           │
│       "hot_methods": ["Swin Transformer", "MedViT"],                         │
│       "performance_trends": {...},                                           │
│       "future_directions": [...]                                             │
│     }                                                                         │
│                                                                               │
│  Output file: research_output/{run_id}/trend_analysis.json                   │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌──────────────────────────────────────────────────────────────────────────────┐
│  AGENT 3: GAP FINDER AGENT                                                   │
│  (Waits for both Literature Survey and Trend Analysis)                       │
├──────────────────────────────────────────────────────────────────────────────┤
│                                                                               │
│  Task: Identify research gaps and opportunities                              │
│                                                                               │
│  Input: Literature survey + Trend analysis results                           │
│                                                                               │
│  Steps:                                                                       │
│  1. Coverage Analysis:                                                        │
│     - Map applications (which medical domains are underexplored?)            │
│     - Map methods (which ViT variants not tried in medical?)                 │
│     - Map datasets (which modalities lacking ViT work?)                      │
│                                                                               │
│  2. Problem-Solution Matrix:                                                  │
│     - List medical imaging challenges                                        │
│     - Check which challenges addressed by ViT                                │
│     - Identify unaddressed challenges                                        │
│                                                                               │
│  3. Methodological Gaps:                                                      │
│     - Compare ViT advances in NLP/CV vs medical                              │
│     - Identify techniques not yet applied to medical                         │
│                                                                               │
│  4. LLM Analysis:                                                             │
│     Prompt: "Based on literature and trends, identify:                       │
│              - Underexplored application domains                             │
│              - Methods from CV/NLP not applied to medical                    │
│              - Datasets lacking ViT baselines                                │
│              - Limitations not addressed by current work                     │
│              - Opportunities for novel contributions"                        │
│                                                                               │
│  5. Output:                                                                   │
│     {                                                                         │
│       "underexplored_domains": ["pediatric radiology", ...],                 │
│       "missing_methods": ["Vision-Language models", ...],                    │
│       "dataset_gaps": ["3D ultrasound", ...],                                │
│       "research_opportunities": [                                            │
│         {                                                                     │
│           "gap": "Limited work on rare disease diagnosis",                   │
│           "why_important": "High medical need, small datasets",              │
│           "potential_approach": "Few-shot ViT with meta-learning"           │
│         },                                                                    │
│         ...                                                                   │
│       ]                                                                       │
│     }                                                                         │
│                                                                               │
│  Output file: research_output/{run_id}/gap_analysis.json                     │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 4: RESULTS AGGREGATION                                                     │
│  File: backend/agents/paper_review_agents/orchestrator.py                        │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  Orchestrator aggregates all agent outputs:                                  │
│                                                                               │
│  1. Load JSON outputs from each agent                                        │
│  2. Combine into unified structure                                           │
│  3. Generate cross-references                                                │
│  4. Create visualizations (Mermaid diagrams)                                 │
│                                                                               │
│  Mermaid Diagrams Generated:                                                  │
│  - Timeline of key papers                                                     │
│  - Citation network graph                                                     │
│  - Topic evolution over time                                                  │
│  - Research gap matrix                                                        │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 5: SYNTHESIS & EXPORT                                                      │
│  File: backend/agents/discovery/smart_output_manager.py                          │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  SmartOutputManager generates final report:                                  │
│                                                                               │
│  Output: research_output/{run_id}/comprehensive_report.md                    │
│                                                                               │
│  Structure:                                                                   │
│  ┌────────────────────────────────────────────────────────────┐              │
│  │ # Vision Transformers in Medical Imaging: Research Report  │              │
│  │                                                             │              │
│  │ ## Executive Summary                                        │              │
│  │ [High-level overview, key findings]                        │              │
│  │                                                             │              │
│  │ ## Literature Review                                        │              │
│  │ ### Historical Development                                  │              │
│  │ [Timeline with Mermaid diagram]                            │              │
│  │                                                             │              │
│  │ ### Key Papers                                              │              │
│  │ [Table of seminal works with contributions]               │              │
│  │                                                             │              │
│  │ ### Approaches                                              │              │
│  │ [Categorized methods: pure ViT, hybrid, etc.]              │              │
│  │                                                             │              │
│  │ ### Application Domains                                     │              │
│  │ [Breakdown by medical specialty]                           │              │
│  │                                                             │              │
│  │ ## Trend Analysis                                           │              │
│  │ ### Emerging Topics                                         │              │
│  │ [What's hot, citation graphs]                              │              │
│  │                                                             │              │
│  │ ### Performance Trends                                      │              │
│  │ [Accuracy over time, benchmarks]                           │              │
│  │                                                             │              │
│  │ ### Future Directions                                       │              │
│  │ [Predictions, promising areas]                             │              │
│  │                                                             │              │
│  │ ## Research Gaps                                            │              │
│  │ ### Underexplored Domains                                   │              │
│  │ [Medical specialties, modalities]                          │              │
│  │                                                             │              │
│  │ ### Methodological Opportunities                            │              │
│  │ [Techniques to apply]                                      │              │
│  │                                                             │              │
│  │ ### Recommended Research Directions                         │              │
│  │ [Specific project ideas with rationale]                   │              │
│  │                                                             │              │
│  │ ## References                                               │              │
│  │ [Cited papers with links]                                  │              │
│  └────────────────────────────────────────────────────────────┘              │
│                                                                               │
│  Additional outputs:                                                          │
│  - citations.bib (BibTeX)                                                     │
│  - figures/ (extracted diagrams)                                             │
│  - data/ (raw JSON outputs)                                                   │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 6: RETURN RESULTS                                                          │
└─────────────────────────────────────────────────────────────────────────────────┘

GET /status/{run_id}
Response: {
  "status": "completed",
  "run_id": "20260104_023627",
  "outputs": {
    "report_url": "/research_output/20260104_023627/comprehensive_report.md",
    "data_files": [
      "literature_survey.json",
      "trend_analysis.json",
      "gap_analysis.json"
    ],
    "visualizations": [
      "timeline.mermaid",
      "citation_network.mermaid"
    ]
  },
  "agent_results": {
    "literature_survey": { "status": "success", "papers_analyzed": 47 },
    "trend_analysis": { "status": "success", "trends_identified": 12 },
    "gap_finder": { "status": "success", "gaps_found": 8 }
  },
  "duration_seconds": 342
}

END OF RESEARCH AGENT WORKFLOW
```

---

## 6. Paper Mind Graph Workflow (Detailed)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                      PAPER MIND GRAPH WORKFLOW                                   │
│                  (Knowledge Graph Generation from PDF)                           │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 1: USER INITIATES ANALYSIS                                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

User provides paper URL in PaperAnalysisView.tsx
Example: "https://arxiv.org/pdf/2010.11929" (ViT paper)
             │
             ├─ Enable mind graph: true
             ├─ Enable Q&A: true
             └─ Analysis depth: comprehensive
             │
             ▼
POST http://localhost:8001/analyze
Body: {
  "paper_url": "https://arxiv.org/pdf/2010.11929",
  "include_mind_graph": true,
  "enable_qa": true
}
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 2: PDF INGESTION & PARSING                                                 │
│  File: backend/agents/paper_mind_graph/ingestion.py                              │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  PDF Processor                                                                │
│                                                                               │
│  1. Download PDF:                                                             │
│     - Fetch from URL or local path                                           │
│     - Validate PDF format                                                     │
│     - Save to temp directory                                                  │
│                                                                               │
│  2. Extract Basic Metadata (PyMuPDF):                                         │
│     - Title, authors (from PDF metadata)                                     │
│     - Number of pages                                                         │
│     - Creation date                                                           │
│                                                                               │
│  3. Extract Text Content:                                                     │
│     - Page-by-page text extraction                                           │
│     - Preserve formatting                                                     │
│     - Handle multi-column layouts                                            │
│                                                                               │
│  4. Identify Structure:                                                       │
│     - Detect sections via regex patterns:                                    │
│       * "\d+\s+[A-Z][a-z]+" → "1 Introduction"                              │
│       * "\d+\.\d+\s+[A-Z][a-z]+" → "3.2 Methodology"                        │
│     - Extract:                                                                │
│       * Abstract (first page, before "1 Introduction")                       │
│       * Sections (numbered headings)                                         │
│       * Subsections (nested numbering)                                       │
│       * References (after "References" heading)                              │
│                                                                               │
│  5. Extract Visual Elements:                                                  │
│     - Figures: Detect image regions, extract captions                        │
│     - Tables: Detect table structures, extract captions                      │
│     - Equations: Detect LaTeX-like patterns                                  │
│                                                                               │
│  6. Chunking:                                                                 │
│     - Split text into semantic chunks                                        │
│     - Max chunk size: 1500 characters                                        │
│     - Preserve sentence boundaries                                           │
│     - Maintain section context                                               │
│                                                                               │
│  Output:                                                                      │
│  {                                                                            │
│    "title": "An Image is Worth 16x16 Words: ...",                           │
│    "authors": ["Alexey Dosovitskiy", ...],                                  │
│    "abstract": "...",                                                        │
│    "sections": [                                                             │
│      {                                                                        │
│        "number": "1",                                                         │
│        "title": "Introduction",                                              │
│        "content": "...",                                                     │
│        "subsections": [...]                                                  │
│      },                                                                       │
│      ...                                                                      │
│    ],                                                                         │
│    "figures": [                                                              │
│      { "id": "fig1", "caption": "...", "page": 3 }                          │
│    ],                                                                         │
│    "tables": [...],                                                          │
│    "equations": [...],                                                       │
│    "references": [...]                                                       │
│  }                                                                            │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 3: KNOWLEDGE GRAPH CONSTRUCTION                                            │
│  File: backend/agents/paper_mind_graph/graph_builder.py                          │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  Graph Builder Agent (LLM-powered)                                           │
│                                                                               │
│  For each section/chunk:                                                      │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │  PHASE 1: CONCEPT EXTRACTION                                │            │
│  │                                                              │            │
│  │  LLM Prompt:                                                 │            │
│  │  "Extract key concepts from this text:                      │            │
│  │   - Identify definitions, terminology                       │            │
│  │   - Extract concept names and descriptions                  │            │
│  │   - Note relationships between concepts                     │            │
│  │                                                              │            │
│  │  Input: Section text chunk                                  │            │
│  │                                                              │            │
│  │  Output:                                                     │            │
│  │  [                                                           │            │
│  │    {                                                         │            │
│  │      "type": "Concept",                                      │            │
│  │      "name": "Vision Transformer",                           │            │
│  │      "definition": "An architecture that applies...",        │            │
│  │      "aliases": ["ViT", "Transformer for vision"]           │            │
│  │    },                                                        │            │
│  │    {                                                         │            │
│  │      "type": "Concept",                                      │            │
│  │      "name": "Patch Embedding",                              │            │
│  │      "definition": "Splitting image into patches..."         │            │
│  │    }                                                         │            │
│  │  ]                                                           │            │
│  └──────────────────────────────────────────────────────────────┘            │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │  PHASE 2: METHOD EXTRACTION                                 │            │
│  │                                                              │            │
│  │  LLM Prompt:                                                 │            │
│  │  "Identify methods, algorithms, and techniques:             │            │
│  │   - Extract method names                                    │            │
│  │   - Describe how they work                                  │            │
│  │   - Identify parameters and variants                        │            │
│  │                                                              │            │
│  │  Output:                                                     │            │
│  │  [                                                           │            │
│  │    {                                                         │            │
│  │      "type": "Method",                                       │            │
│  │      "name": "Multi-Head Self-Attention",                    │            │
│  │      "description": "Mechanism that allows...",              │            │
│  │      "parameters": ["num_heads", "d_model"],                │            │
│  │      "uses_concepts": ["Attention Mechanism"]               │            │
│  │    }                                                         │            │
│  │  ]                                                           │            │
│  └──────────────────────────────────────────────────────────────┘            │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │  PHASE 3: EXPERIMENT EXTRACTION                             │            │
│  │                                                              │            │
│  │  LLM Prompt:                                                 │            │
│  │  "Identify experiments and evaluations:                     │            │
│  │   - Experiment setup                                        │            │
│  │   - Datasets used                                           │            │
│  │   - Metrics measured                                        │            │
│  │   - Results obtained                                        │            │
│  │                                                              │            │
│  │  Output:                                                     │            │
│  │  [                                                           │            │
│  │    {                                                         │            │
│  │      "type": "Experiment",                                   │            │
│  │      "name": "ImageNet Classification",                      │            │
│  │      "dataset": "ImageNet-1K",                               │            │
│  │      "task": "Image Classification",                         │            │
│  │      "metrics": ["Top-1 Accuracy", "Top-5 Accuracy"],       │            │
│  │      "results": {                                            │            │
│  │        "top1": "88.55%",                                     │            │
│  │        "top5": "98.76%"                                      │            │
│  │      }                                                        │            │
│  │    }                                                         │            │
│  │  ]                                                           │            │
│  └──────────────────────────────────────────────────────────────┘            │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │  PHASE 4: EDGE CONSTRUCTION                                 │            │
│  │                                                              │            │
│  │  Build relationships between extracted nodes:                │            │
│  │                                                              │            │
│  │  Structural Edges:                                           │            │
│  │  - Paper --has_section--> Section                            │            │
│  │  - Section --has_subsection--> Subsection                    │            │
│  │                                                              │            │
│  │  Content Edges:                                              │            │
│  │  - Section --defines--> Concept                              │            │
│  │  - Method --uses_concept--> Concept                          │            │
│  │  - Experiment --evaluates_on--> Dataset                      │            │
│  │  - Experiment --measures--> Metric                           │            │
│  │                                                              │            │
│  │  Visual Edges:                                               │            │
│  │  - Concept --illustrated_by--> Figure                        │            │
│  │  - Result --summarized_by--> Table                           │            │
│  │                                                              │            │
│  │  Semantic Edges:                                             │            │
│  │  - Concept --extends--> Concept                              │            │
│  │  - Method --depends_on--> Method                             │            │
│  │  - Result --supports--> Concept                              │            │
│  │  - Finding --contradicts--> Prior Work                       │            │
│  └──────────────────────────────────────────────────────────────┘            │
│                                                                               │
│  Graph Structure (schema.py):                                                 │
│  {                                                                            │
│    "nodes": {                                                                 │
│      "paper_001": { "type": "Paper", "title": "...", ... },                  │
│      "sec_001": { "type": "Section", "number": "1", ... },                   │
│      "concept_001": { "type": "Concept", "name": "ViT", ... },               │
│      "method_001": { "type": "Method", "name": "MHSA", ... },                │
│      "exp_001": { "type": "Experiment", "name": "...", ... }                 │
│    },                                                                         │
│    "edges": [                                                                 │
│      { "from": "paper_001", "to": "sec_001", "type": "has_section" },        │
│      { "from": "sec_001", "to": "concept_001", "type": "defines" },          │
│      { "from": "method_001", "to": "concept_001", "type": "uses" }           │
│    ]                                                                          │
│  }                                                                            │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 4: VERIFICATION & GAP DETECTION                                            │
│  File: backend/agents/paper_mind_graph/verification.py                           │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  Verification Agent                                                           │
│                                                                               │
│  1. Coverage Check:                                                           │
│     - Verify all sections processed                                          │
│     - Check for missing sections                                             │
│     - Identify sections with no concepts/methods                             │
│                                                                               │
│  2. Quality Metrics:                                                          │
│     - Node count (total concepts, methods, experiments)                      │
│     - Edge density (relationships per node)                                  │
│     - Graph connectivity (isolated nodes)                                    │
│                                                                               │
│  3. Gap Identification:                                                       │
│     - Sections mentioned but not detailed                                    │
│     - Referenced concepts not defined                                        │
│     - Missing experimental details                                           │
│                                                                               │
│  4. Iterative Refinement (optional):                                         │
│     - If gaps found, re-process those sections                               │
│     - Expand incomplete nodes                                                │
│     - Add missing relationships                                              │
│                                                                               │
│  Output:                                                                      │
│  {                                                                            │
│    "coverage": {                                                              │
│      "sections_processed": 8,                                                │
│      "sections_total": 8,                                                    │
│      "coverage_percentage": 100                                              │
│    },                                                                         │
│    "quality": {                                                               │
│      "total_nodes": 127,                                                     │
│      "total_edges": 243,                                                     │
│      "avg_edges_per_node": 1.91,                                            │
│      "isolated_nodes": 2                                                     │
│    },                                                                         │
│    "gaps": [                                                                  │
│      "Section 4.3 mentions 'pre-training' but no details"                   │
│    ]                                                                          │
│  }                                                                            │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 5: Q&A SYSTEM SETUP                                                        │
│  File: backend/agents/paper_mind_graph/qa_system.py                              │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  Q&A System (RAG over Knowledge Graph)                                       │
│                                                                               │
│  User asks: "What datasets were used in the experiments?"                    │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │  STEP 1: Query Understanding                                │            │
│  │                                                              │            │
│  │  LLM analyzes query:                                         │            │
│  │  - Intent: "find_datasets"                                   │            │
│  │  - Entity types: ["Experiment", "Dataset"]                   │            │
│  │  - Relationship: "evaluates_on"                              │            │
│  └──────────────────────────────────────────────────────────────┘            │
│                         │                                                     │
│  ┌──────────────────────▼──────────────────────────────────────┐            │
│  │  STEP 2: Graph Retrieval                                    │            │
│  │                                                              │            │
│  │  Query graph database:                                       │            │
│  │  - Find all Experiment nodes                                │            │
│  │  - Follow "evaluates_on" edges to Dataset nodes             │            │
│  │  - Retrieve node properties                                 │            │
│  │                                                              │            │
│  │  Retrieved:                                                  │            │
│  │  [                                                           │            │
│  │    {                                                         │            │
│  │      "experiment": "ImageNet Classification",                │            │
│  │      "dataset": "ImageNet-1K",                               │            │
│  │      "details": "1.28M training images, 1000 classes"       │            │
│  │    },                                                        │            │
│  │    {                                                         │            │
│  │      "experiment": "Transfer Learning",                      │            │
│  │      "dataset": "CIFAR-10/100",                              │            │
│  │      "details": "50K/60K images, 10/100 classes"            │            │
│  │    }                                                         │            │
│  │  ]                                                           │            │
│  └──────────────────────────────────────────────────────────────┘            │
│                         │                                                     │
│  ┌──────────────────────▼──────────────────────────────────────┐            │
│  │  STEP 3: Answer Generation                                  │            │
│  │                                                              │            │
│  │  LLM generates answer with citations:                        │            │
│  │                                                              │            │
│  │  "The paper evaluates on three main datasets:               │            │
│  │   1. ImageNet-1K [Section 4.1] - 1.28M training images      │            │
│  │      with 1000 classes for image classification             │            │
│  │   2. CIFAR-10 [Section 4.2] - 50K images, 10 classes        │            │
│  │   3. CIFAR-100 [Section 4.2] - 60K images, 100 classes      │            │
│  │                                                              │            │
│  │  The model achieves 88.55% top-1 accuracy on ImageNet       │            │
│  │  [Table 2] and competitive results on CIFAR [Table 3]."     │            │
│  └──────────────────────────────────────────────────────────────┘            │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 6: EXPORT & VISUALIZATION                                                  │
│  File: backend/agents/paper_mind_graph/export.py                                 │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  Export Formats:                                                              │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │  1. JSON (Full Data)                                        │            │
│  │                                                              │            │
│  │  {                                                           │            │
│  │    "graph": {                                                │            │
│  │      "nodes": [...],                                         │            │
│  │      "edges": [...]                                          │            │
│  │    },                                                        │            │
│  │    "metadata": {                                             │            │
│  │      "paper_title": "...",                                   │            │
│  │      "generated_at": "...",                                  │            │
│  │      "statistics": {...}                                     │            │
│  │    }                                                         │            │
│  │  }                                                           │            │
│  └──────────────────────────────────────────────────────────────┘            │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │  2. Markdown (Human-Readable)                               │            │
│  │                                                              │            │
│  │  # Vision Transformer: Knowledge Graph                      │            │
│  │                                                              │            │
│  │  ## Concepts                                                 │            │
│  │  ### Vision Transformer (ViT)                                │            │
│  │  An architecture that applies...                             │            │
│  │                                                              │            │
│  │  ### Patch Embedding                                         │            │
│  │  Splitting image into patches...                             │            │
│  │                                                              │            │
│  │  ## Methods                                                  │            │
│  │  ### Multi-Head Self-Attention                               │            │
│  │  ...                                                         │            │
│  │                                                              │            │
│  │  ## Experiments                                              │            │
│  │  ### ImageNet Classification                                 │            │
│  │  Dataset: ImageNet-1K                                        │            │
│  │  Results: 88.55% top-1 accuracy                             │            │
│  └──────────────────────────────────────────────────────────────┘            │
│                                                                               │
│  ┌─────────────────────────────────────────────────────────────┐            │
│  │  3. Mermaid (Visualization)                                 │            │
│  │                                                              │            │
│  │  graph TD                                                    │            │
│  │    Paper[Vision Transformer]                                 │            │
│  │    Sec1[1. Introduction]                                     │            │
│  │    Sec3[3. Method]                                           │            │
│  │    ViT[Vision Transformer]                                   │            │
│  │    MHSA[Multi-Head Self-Attention]                          │            │
│  │    PE[Patch Embedding]                                       │            │
│  │    Exp1[ImageNet Classification]                             │            │
│  │    IN[ImageNet-1K]                                           │            │
│  │                                                              │            │
│  │    Paper --> Sec1                                            │            │
│  │    Paper --> Sec3                                            │            │
│  │    Sec3 --> ViT                                              │            │
│  │    ViT --> MHSA                                              │            │
│  │    ViT --> PE                                                │            │
│  │    Exp1 --> IN                                               │            │
│  │    MHSA --> ViT                                              │            │
│  └──────────────────────────────────────────────────────────────┘            │
└───────────────────────────────────────────────────────────────────────────────┘
             │
             ▼
┌─────────────────────────────────────────────────────────────────────────────────┐
│  STEP 7: RETURN RESULTS                                                          │
└─────────────────────────────────────────────────────────────────────────────────┘

Response:
{
  "run_id": "mg_20260104_153422",
  "status": "completed",
  "paper": {
    "title": "An Image is Worth 16x16 Words: ...",
    "authors": ["Alexey Dosovitskiy", ...],
    "summary": "..."
  },
  "mind_graph": {
    "nodes": 127,
    "edges": 243,
    "node_types": {
      "Concept": 42,
      "Method": 28,
      "Experiment": 12,
      "Dataset": 8,
      "Figure": 7,
      "Table": 5
    }
  },
  "exports": {
    "json": "/outputs/mg_20260104_153422/graph.json",
    "markdown": "/outputs/mg_20260104_153422/summary.md",
    "mermaid": "/outputs/mg_20260104_153422/visualization.mmd"
  },
  "qa_ready": true
}

Frontend displays:
- Interactive graph visualization
- Q&A interface
- Exportable formats

END OF PAPER MIND GRAPH WORKFLOW
```

---

## 7. Database Schema (Detailed)

```
┌─────────────────────────────────────────────────────────────────────────────────┐
│                         SUPABASE DATABASE SCHEMA                                 │
│                         (PostgreSQL + pgvector)                                  │
└─────────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  AUTHENTICATION & USER MANAGEMENT                                                │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  auth.users (Supabase built-in)                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  id                     UUID PRIMARY KEY                                      │
│  email                  TEXT UNIQUE NOT NULL                                  │
│  encrypted_password     TEXT                                                  │
│  email_confirmed_at     TIMESTAMP                                             │
│  created_at             TIMESTAMP DEFAULT NOW()                               │
│  updated_at             TIMESTAMP DEFAULT NOW()                               │
│                                                                               │
│  Indexes:                                                                     │
│  - idx_users_email ON (email)                                                │
└───────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  public.profiles                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  id                     UUID PRIMARY KEY REFERENCES auth.users(id)            │
│  display_name           TEXT NOT NULL                                         │
│  affiliation            TEXT                                                  │
│  bio                    TEXT                                                  │
│  avatar_url             TEXT                                                  │
│  interests              TEXT[]                                                │
│  role                   user_role DEFAULT 'member'                            │
│  created_at             TIMESTAMP DEFAULT NOW()                               │
│  updated_at             TIMESTAMP DEFAULT NOW()                               │
│                                                                               │
│  Custom Types:                                                                │
│  - user_role: ENUM ('member', 'presenter', 'admin')                          │
│                                                                               │
│  RLS Policies:                                                                │
│  - SELECT: All authenticated users can view                                   │
│  - INSERT: User can create own profile                                       │
│  - UPDATE: User can update own profile OR admin can update any               │
│  - DELETE: Only admins can delete                                            │
│                                                                               │
│  Triggers:                                                                    │
│  - on_auth_user_created → auto-create profile                               │
│  - updated_at → auto-update timestamp                                        │
└───────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  PAPER MANAGEMENT                                                                │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  public.papers                                                                │
├──────────────────────────────────────────────────────────────────────────────┤
│  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid()            │
│  arxiv_id               TEXT UNIQUE                                           │
│  doi                    TEXT UNIQUE                                           │
│  title                  TEXT NOT NULL                                         │
│  abstract               TEXT                                                  │
│  authors                JSONB  -- [{name, affiliation, email}]               │
│  venue                  TEXT   -- conference/journal name                     │
│  year                   INTEGER                                               │
│  publication_date       DATE                                                  │
│  pdf_url                TEXT                                                  │
│  code_url               TEXT                                                  │
│  project_url            TEXT                                                  │
│  embedding              VECTOR(768)  -- pgvector for semantic search         │
│  metadata               JSONB  -- {methods, datasets, metrics, etc.}         │
│  citation_count         INTEGER DEFAULT 0                                     │
│  created_at             TIMESTAMP DEFAULT NOW()                               │
│  updated_at             TIMESTAMP DEFAULT NOW()                               │
│                                                                               │
│  Indexes:                                                                     │
│  - idx_papers_arxiv ON (arxiv_id)                                            │
│  - idx_papers_doi ON (doi)                                                   │
│  - idx_papers_year ON (year DESC)                                            │
│  - idx_papers_embedding ON embedding USING ivfflat (vector_cosine_ops)       │
│    -- For fast similarity search                                             │
│  - idx_papers_metadata_gin ON metadata USING gin                             │
│    -- For querying JSONB fields                                              │
│                                                                               │
│  RLS Policies:                                                                │
│  - SELECT: All authenticated users can view                                   │
│  - INSERT: Authenticated users can add papers                                │
│  - UPDATE: Only admins can update                                            │
│  - DELETE: Only admins can delete                                            │
└───────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  COMMUNITY/CIRCLE MANAGEMENT                                                     │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  public.communities                                                           │
├──────────────────────────────────────────────────────────────────────────────┤
│  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid()            │
│  name                   TEXT NOT NULL                                         │
│  slug                   TEXT UNIQUE NOT NULL                                  │
│  description            TEXT                                                  │
│  is_public              BOOLEAN DEFAULT false                                 │
│  avatar_url             TEXT                                                  │
│  created_by             UUID REFERENCES profiles(id)                          │
│  created_at             TIMESTAMP DEFAULT NOW()                               │
│  updated_at             TIMESTAMP DEFAULT NOW()                               │
│                                                                               │
│  Indexes:                                                                     │
│  - idx_communities_slug ON (slug)                                            │
│  - idx_communities_created_by ON (created_by)                                │
│                                                                               │
│  RLS Policies:                                                                │
│  - SELECT: Public circles OR user is member                                  │
│  - INSERT: Any authenticated user can create                                 │
│  - UPDATE: Creator OR admin member can update                                │
│  - DELETE: Only creator can delete                                           │
└───────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  public.community_members                                                     │
├──────────────────────────────────────────────────────────────────────────────┤
│  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid()            │
│  community_id           UUID REFERENCES communities(id) ON DELETE CASCADE     │
│  user_id                UUID REFERENCES profiles(id) ON DELETE CASCADE        │
│  role                   member_role DEFAULT 'member'                          │
│  joined_at              TIMESTAMP DEFAULT NOW()                               │
│                                                                               │
│  Custom Types:                                                                │
│  - member_role: ENUM ('member', 'presenter', 'admin')                        │
│                                                                               │
│  Constraints:                                                                 │
│  - UNIQUE (community_id, user_id)  -- Can't join twice                       │
│                                                                               │
│  Indexes:                                                                     │
│  - idx_community_members_community ON (community_id)                         │
│  - idx_community_members_user ON (user_id)                                   │
│                                                                               │
│  RLS Policies:                                                                │
│  - SELECT: User is member of circle OR circle is public                      │
│  - INSERT: User can join via invite                                          │
│  - UPDATE: Admin can change roles                                            │
│  - DELETE: User can leave OR admin can remove                                │
└───────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  public.circle_invitations                                                    │
├──────────────────────────────────────────────────────────────────────────────┤
│  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid()            │
│  community_id           UUID REFERENCES communities(id) ON DELETE CASCADE     │
│  token                  TEXT UNIQUE NOT NULL                                  │
│  created_by             UUID REFERENCES profiles(id)                          │
│  expires_at             TIMESTAMP NOT NULL                                    │
│  max_uses               INTEGER DEFAULT NULL  -- NULL = unlimited            │
│  current_uses           INTEGER DEFAULT 0                                     │
│  created_at             TIMESTAMP DEFAULT NOW()                               │
│                                                                               │
│  Indexes:                                                                     │
│  - idx_invitations_token ON (token)                                          │
│  - idx_invitations_community ON (community_id)                               │
│                                                                               │
│  RLS Policies:                                                                │
│  - SELECT: Anyone (for accepting invites)                                    │
│  - INSERT: Admin members can create                                          │
│  - DELETE: Creator OR admin can delete                                       │
└───────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  SESSION MANAGEMENT                                                              │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  public.sessions                                                              │
├──────────────────────────────────────────────────────────────────────────────┤
│  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid()            │
│  title                  TEXT NOT NULL                                         │
│  description            TEXT                                                  │
│  scheduled_for          TIMESTAMPTZ NOT NULL                                  │
│  duration_minutes       INTEGER DEFAULT 60                                    │
│  community_id           UUID REFERENCES communities(id) ON DELETE CASCADE     │
│  paper_id               UUID REFERENCES papers(id)                            │
│  presenter_id           UUID REFERENCES profiles(id)                          │
│  status                 session_status DEFAULT 'scheduled'                    │
│  recording_url          TEXT                                                  │
│  slides_url             TEXT                                                  │
│  notes                  TEXT                                                  │
│  parent_session_id      UUID REFERENCES sessions(id)  -- For lineage         │
│  created_by             UUID REFERENCES profiles(id)                          │
│  created_at             TIMESTAMP DEFAULT NOW()                               │
│  updated_at             TIMESTAMP DEFAULT NOW()                               │
│                                                                               │
│  Custom Types:                                                                │
│  - session_status: ENUM ('scheduled', 'in_progress', 'completed',            │
│                          'cancelled')                                         │
│                                                                               │
│  Indexes:                                                                     │
│  - idx_sessions_community ON (community_id)                                  │
│  - idx_sessions_scheduled ON (scheduled_for DESC)                            │
│  - idx_sessions_paper ON (paper_id)                                          │
│  - idx_sessions_presenter ON (presenter_id)                                  │
│                                                                               │
│  RLS Policies:                                                                │
│  - SELECT: Community members can view circle sessions                        │
│  - INSERT: Admin/presenter members can create                                │
│  - UPDATE: Creator, presenter, OR admin can update                           │
│  - DELETE: Creator OR admin can delete                                       │
└───────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  public.rsvps                                                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid()            │
│  session_id             UUID REFERENCES sessions(id) ON DELETE CASCADE        │
│  user_id                UUID REFERENCES profiles(id) ON DELETE CASCADE        │
│  status                 rsvp_status DEFAULT 'attending'                       │
│  checked_in             BOOLEAN DEFAULT false                                 │
│  checked_in_at          TIMESTAMP                                             │
│  created_at             TIMESTAMP DEFAULT NOW()                               │
│  updated_at             TIMESTAMP DEFAULT NOW()                               │
│                                                                               │
│  Custom Types:                                                                │
│  - rsvp_status: ENUM ('attending', 'maybe', 'not_attending')                │
│                                                                               │
│  Constraints:                                                                 │
│  - UNIQUE (session_id, user_id)  -- One RSVP per session                     │
│                                                                               │
│  Indexes:                                                                     │
│  - idx_rsvps_session ON (session_id)                                         │
│  - idx_rsvps_user ON (user_id)                                               │
│                                                                               │
│  RLS Policies:                                                                │
│  - SELECT: Community members can view                                        │
│  - INSERT: User can RSVP to accessible sessions                              │
│  - UPDATE: User can update own RSVP                                          │
│  - DELETE: User can delete own RSVP                                          │
└───────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  DISCUSSIONS & COLLABORATION                                                     │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  public.discussions                                                           │
├──────────────────────────────────────────────────────────────────────────────┤
│  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid()            │
│  paper_id               UUID REFERENCES papers(id) ON DELETE CASCADE          │
│  session_id             UUID REFERENCES sessions(id) ON DELETE CASCADE        │
│  parent_id              UUID REFERENCES discussions(id)  -- For threading     │
│  user_id                UUID REFERENCES profiles(id)                          │
│  content                TEXT NOT NULL                                         │
│  is_question            BOOLEAN DEFAULT false                                 │
│  created_at             TIMESTAMP DEFAULT NOW()                               │
│  updated_at             TIMESTAMP DEFAULT NOW()                               │
│                                                                               │
│  Constraints:                                                                 │
│  - CHECK (paper_id IS NOT NULL OR session_id IS NOT NULL)                    │
│    -- Must be associated with paper OR session                               │
│                                                                               │
│  Indexes:                                                                     │
│  - idx_discussions_paper ON (paper_id)                                       │
│  - idx_discussions_session ON (session_id)                                   │
│  - idx_discussions_parent ON (parent_id)                                     │
│  - idx_discussions_user ON (user_id)                                         │
│                                                                               │
│  RLS Policies:                                                                │
│  - SELECT: All authenticated users can view                                   │
│  - INSERT: Authenticated users can create                                    │
│  - UPDATE: User can update own comments                                      │
│  - DELETE: User can delete own comments OR admin                             │
└───────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  PAPER LINEAGE & RELATIONSHIPS                                                   │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  public.edges                                                                 │
├──────────────────────────────────────────────────────────────────────────────┤
│  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid()            │
│  source_paper_id        UUID REFERENCES papers(id) ON DELETE CASCADE          │
│  target_paper_id        UUID REFERENCES papers(id) ON DELETE CASCADE          │
│  edge_type              relationship_type NOT NULL                            │
│  similarity_score       FLOAT  -- Computed similarity (0-1)                   │
│  rationale              TEXT   -- Why this relationship exists                │
│  is_ai_generated        BOOLEAN DEFAULT false                                 │
│  verified_by            UUID REFERENCES profiles(id)                          │
│  created_by             UUID REFERENCES profiles(id)                          │
│  created_at             TIMESTAMP DEFAULT NOW()                               │
│                                                                               │
│  Custom Types:                                                                │
│  - relationship_type: ENUM (                                                  │
│      'extends',          -- Builds upon/improves                             │
│      'applies',          -- Applies methods to new domain                     │
│      'evaluates',        -- Benchmarks/compares                              │
│      'contradicts',      -- Challenges findings                              │
│      'surveys',          -- Surveys/reviews                                  │
│      'prerequisite',     -- Required background                              │
│      'related',          -- General relation                                 │
│      'dataset',          -- Introduces dataset used by                        │
│      'method'            -- Introduces method used by                         │
│    )                                                                          │
│                                                                               │
│  Constraints:                                                                 │
│  - CHECK (source_paper_id != target_paper_id)  -- No self-loops              │
│                                                                               │
│  Indexes:                                                                     │
│  - idx_edges_source ON (source_paper_id)                                     │
│  - idx_edges_target ON (target_paper_id)                                     │
│  - idx_edges_type ON (edge_type)                                             │
│                                                                               │
│  RLS Policies:                                                                │
│  - SELECT: All authenticated users can view                                   │
│  - INSERT: Authenticated users can create                                    │
│  - UPDATE: Creator OR admin can update                                       │
│  - DELETE: Creator OR admin can delete                                       │
└───────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  COMMUNITY PAPERS (Discovery Results)                                            │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  public.community_papers_global                                               │
├──────────────────────────────────────────────────────────────────────────────┤
│  id                     UUID PRIMARY KEY DEFAULT gen_random_uuid()            │
│  paper_id               UUID REFERENCES papers(id) ON DELETE CASCADE          │
│  source_type            paper_source DEFAULT 'arxiv'                          │
│  conference_name        TEXT                                                  │
│  year                   INTEGER                                               │
│  imported_at            TIMESTAMP DEFAULT NOW()                               │
│  import_source          TEXT  -- e.g., 'ai_discovery', 'manual'              │
│                                                                               │
│  Custom Types:                                                                │
│  - paper_source: ENUM ('arxiv', 'conference', 'journal', 'discovery')       │
│                                                                               │
│  Indexes:                                                                     │
│  - idx_community_papers_paper ON (paper_id)                                  │
│  - idx_community_papers_source ON (source_type)                              │
│  - idx_community_papers_year ON (year DESC)                                  │
│                                                                               │
│  RLS Policies:                                                                │
│  - SELECT: All authenticated users can view                                   │
│  - INSERT: Authenticated users can add                                       │
└───────────────────────────────────────────────────────────────────────────────┘

┌─────────────────────────────────────────────────────────────────────────────────┐
│  HELPER FUNCTIONS & STORED PROCEDURES                                            │
└─────────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  get_user_circles(user_uuid UUID)                                            │
│  Returns: TABLE(community_id UUID, role member_role, name TEXT, ...)         │
│                                                                               │
│  Description: Get all circles a user is member of with their role            │
└───────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  get_circle_members(community_uuid UUID)                                     │
│  Returns: TABLE(user_id UUID, display_name TEXT, role member_role, ...)      │
│                                                                               │
│  Description: Get all members of a circle with their details                 │
└───────────────────────────────────────────────────────────────────────────────┘

┌──────────────────────────────────────────────────────────────────────────────┐
│  search_papers_semantic(query_embedding VECTOR(768), limit INT)             │
│  Returns: TABLE(paper_id UUID, similarity FLOAT, title TEXT, ...)            │
│                                                                               │
│  Description: Semantic paper search using pgvector cosine similarity         │
└───────────────────────────────────────────────────────────────────────────────┘

END OF DATABASE SCHEMA
```

