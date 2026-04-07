<p align="center">
  <img src="public/paper-circle-logo.svg" alt="PaperCircle" width="140"/>
</p>

<h1 align="center">PaperCircle</h1>

<p align="center">
  <b>AI-Powered Research Paper Discovery & Reading Groups</b><br/>
  <i>Discover papers, organize sessions, build knowledge together</i>
</p>

<p align="center">
  <img src="https://img.shields.io/badge/React-18-61DAFB?logo=react" alt="React 18"/>
  <img src="https://img.shields.io/badge/TypeScript-5.5-3178C6?logo=typescript" alt="TypeScript"/>
  <img src="https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase" alt="Supabase"/>
  <img src="https://img.shields.io/badge/smolagents-1.0-FF9D00?logo=huggingface" alt="smolagents"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT"/>
</p>

<p align="center">
  <a href="#features">Features</a> &bull;
  <a href="#architecture">Architecture</a> &bull;
  <a href="#getting-started">Getting Started</a> &bull;
  <a href="#running-the-services">Running</a> &bull;
  <a href="#ai-discovery-pipeline">AI Discovery</a> &bull;
  <a href="#deployment">Deploy</a>
</p>

---

## Features

### Paper Discovery
- **Multi-agent AI search** across arXiv, Scopus, and IEEE
- **Hybrid ranking** combining BM25 keyword search with TF-IDF semantic similarity
- **Three discovery modes**: Stable (authoritative), Discovery (novel), Balanced (mixed)
- Automatic deduplication and result diversification

### Reading Circles
- Create private or public reading communities
- Role-based access: Member, Presenter, Admin
- Shareable invite links for easy onboarding
- Community-level paper collections and analytics

### Sessions
- Schedule reading group discussions with RSVP and check-in tracking
- Assign presenters and link papers to sessions
- Attach recordings, slides, and notes
- Virtual meeting link integration

### Paper Mind Graph
- Extract concepts, methods, and experiments from PDFs using LLMs
- Build structured knowledge graphs with coverage verification
- Interactive Q&A over extracted paper content
- Export to JSON, Markdown, Mermaid diagrams, and HTML

### Paper Review Generation
- Conference-format reviews (ICLR, NeurIPS, ICML style)
- Multi-agent analysis: technical critique, reproducibility check, literature review
- Automatic paper lineage extraction (extends/applies/evaluates/contradicts)
- Benchmarking framework to compare AI reviews against human reviews

### Paper Lineage
- Six relationship types: extends, applies, evaluates, contradicts, survey, prerequisite
- Interactive graph visualization
- AI-generated edges with human verification support

---

## Architecture

```
┌────────────────────────────────────────────────────────────────────┐
│                          PaperCircle                               │
├───────────────────────────┬────────────────────────────────────────┤
│        Frontend           │             Backend                    │
│                           │                                        │
│  React 18 + TypeScript    │   FastAPI (Python)                     │
│  TailwindCSS + Vite       │   smolagents + LiteLLM                 │
│  Supabase Client SDK      │   arXiv / Scopus / IEEE APIs           │
│  Mermaid (diagrams)       │   PyMuPDF + pdfplumber (PDF)           │
└───────────────────────────┴──────────────┬─────────────────────────┘
                                           │
                                  ┌────────┴────────┐
                                  │    Supabase      │
                                  │   PostgreSQL     │
                                  │  + Auth + RLS    │
                                  │  + pgvector      │
                                  └─────────────────┘
```

### Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, TypeScript, Vite, TailwindCSS, Lucide Icons, Mermaid |
| **Backend** | FastAPI, uvicorn, smolagents, LiteLLM |
| **Database** | Supabase (PostgreSQL), Row Level Security, pgvector |
| **AI/ML** | Multi-agent orchestration, BM25, TF-IDF, scikit-learn |
| **PDF** | PyMuPDF, pdfplumber |
| **Paper APIs** | arXiv, Scopus, IEEE Xplore |
| **LLM Providers** | Ollama (local), OpenAI, Anthropic, Azure OpenAI |

### Backend Services

| Service | File | Port | Purpose |
|---------|------|------|---------|
| **Discovery API** | `backend/apis/fast_discovery_api.py` | 8000 | Multi-agent paper search and ranking |
| **Paper Review API** | `backend/apis/paper_review_server.py` | 8005 | AI-generated conference-style reviews |
| **Paper Analysis API** | `backend/apis/paper_analysis_api.py` | 8006 | Mind Graph extraction and Q&A |
| **Community Papers API** | `backend/apis/community_papers_api.py` | 8007 | Community paper sync and management |
| **Research Pipeline API** | `backend/apis/research_pipeline_api.py` | — | End-to-end research pipeline |

---

## Project Structure

```
papercircle/
├── src/                              # React frontend
│   ├── App.tsx                       # Main app with view routing
│   ├── main.tsx                      # Entry point
│   ├── components/
│   │   ├── Admin/                    # Admin dashboard
│   │   ├── Auth/                     # Authentication modals
│   │   ├── Communities/              # Reading circle management
│   │   ├── Dashboard/                # User dashboard
│   │   ├── Layout/                   # Header, navigation
│   │   ├── Lineage/                  # Paper relationship graph
│   │   ├── Papers/                   # Paper discovery & detail views
│   │   ├── Sessions/                 # Session scheduling & RSVP
│   │   └── Settings/                 # LLM & user settings
│   ├── contexts/                     # React contexts (Auth, Community)
│   ├── lib/                          # Supabase client, utilities
│   └── styles/                       # Global styles
│
├── backend/
│   ├── apis/                         # FastAPI services
│   │   ├── fast_discovery_api.py     # Paper discovery API
│   │   ├── paper_review_server.py    # Review generation API
│   │   ├── paper_analysis_api.py     # Mind Graph API
│   │   ├── community_papers_api.py   # Community papers API
│   │   ├── research_pipeline_api.py  # Research pipeline
│   │   └── unified/                  # Unified Docker API
│   ├── agents/
│   │   ├── agents/                   # Core agent implementations
│   │   ├── discovery/                # Paper discovery agents
│   │   ├── paper_mind_graph/         # Knowledge graph extraction
│   │   └── paper_review_agents/      # Review generation agents
│   ├── core/                         # Core logic (paperfinder, discovery)
│   ├── services/                     # Helper services (HF papers client)
│   ├── utils/                        # Shared utilities
│   ├── requirements-prod.txt         # Production Python dependencies
│   └── docker-compose.yml            # Docker orchestration
│
├── supabase/
│   ├── migrations/                   # SQL migration files (18 migrations)
│   └── functions/                    # Supabase Edge Functions
│
├── api/                              # Vercel serverless functions (JS)
│   ├── arxiv.js                      # arXiv CORS proxy
│   ├── community-papers.js           # Community papers endpoint
│   └── sync-status.js               # Sync status endpoint
│
├── docs/                             # Documentation
│   ├── QUICK_START.md                # Quick start guide
│   ├── DEPLOYMENT_GUIDE.md           # Production deployment
│   ├── SECURITY.md                   # Security guidelines
│   ├── API_MIGRATION.md              # Serverless migration guide
│   ├── API_TESTING_STATUS.md         # API test checklist
│   ├── PAPER_REVIEW_AGENTS_IMPLEMENTATION.md
│   └── MIGRATION_COMPLETE.md         # Migration status
│
├── examples/                         # Examples and benchmarks
│   ├── pc-data/                      # Benchmark suite
│   └── docs/                         # Additional documentation
│
├── scripts/                          # Utility scripts
├── hf_spaces/                        # Hugging Face Spaces deployment
├── assets/                           # Logo and image assets
│
├── .env.example                      # Environment variable template
├── Dockerfile                        # Backend container
├── vercel.json                       # Vercel deployment config
├── railway.toml                      # Railway deployment config
├── render.yaml                       # Render deployment config
├── package.json                      # Frontend dependencies
├── vite.config.ts                    # Vite build configuration
├── tailwind.config.js                # TailwindCSS configuration
└── tsconfig.json                     # TypeScript configuration
```

---

## Getting Started

### Prerequisites

- **Node.js** >= 18
- **Python** >= 3.10
- **Supabase** project ([create one free](https://supabase.com))
- **LLM provider** — one of:
  - [Ollama](https://ollama.com) (local, free)
  - OpenAI API key
  - Anthropic API key

### 1. Clone and Install

```bash
git clone https://github.com/YOUR_USERNAME/papercircle.git
cd papercircle

# Frontend dependencies
npm install

# Backend dependencies
pip install -r backend/requirements-prod.txt
```

### 2. Configure Environment

```bash
cp .env.example .env
```

Edit `.env` with your credentials:

```bash
# Required — Supabase
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
SUPABASE_SERVICE_ROLE_KEY=your-service-role-key

# Required — Backend API URL
VITE_API_URL=http://127.0.0.1:8000

# Optional — LLM provider (defaults to Ollama)
OLLAMA_API_BASE=http://localhost:11434
OLLAMA_MODEL=ollama_chat/qwen3-coder:30b
# Or: OPENAI_API_KEY=sk-...
# Or: ANTHROPIC_API_KEY=sk-ant-...
```

### 3. Set Up the Database

Run the Supabase migrations in order from `supabase/migrations/`. These create the schema, enable Row Level Security, and seed initial data.

---

## Running the Services

### Development (all-in-one)

```bash
# Frontend + arXiv proxy (localhost:5173)
npm run dev

# Paper Discovery API (localhost:8000)
python backend/apis/fast_discovery_api.py

# Paper Review API (localhost:8005) — optional
python backend/apis/paper_review_server.py

# Paper Analysis API (localhost:8006) — optional
python backend/apis/paper_analysis_api.py
```

### Docker

```bash
cd backend
docker-compose up
```

This starts the unified API on port 8000 with paper cache and output volumes mounted.

### Frontend Only

```bash
npm run dev:frontend-only   # Vite dev server without arXiv proxy
```

### Available npm Scripts

| Command | Description |
|---------|-------------|
| `npm run dev` | Start frontend + arXiv proxy (concurrent) |
| `npm run dev:frontend-only` | Frontend only (Vite) |
| `npm run build` | Production build to `dist/` |
| `npm run lint` | Run ESLint |
| `npm run typecheck` | TypeScript type checking |
| `npm run preview` | Preview production build |

---

## AI Discovery Pipeline

Multi-agent pipeline for intelligent paper discovery:

```
User Query
    │
    v
Intent Agent ──── understands query intent & scope
    │
    v
Multi-Source Search ──── arXiv, Scopus, IEEE in parallel
    │
    v
Deduplication ──── removes duplicate papers across sources
    │
    v
Scoring ──── Relevance + Authority + Novelty
    │
    v
Diversification ──── balances scoring dimensions
    │
    v
Ranked Results
```

### Scoring Components

| Component | Method | Signal |
|-----------|--------|--------|
| **Relevance** | TF-IDF cosine similarity | How well the paper matches the query |
| **Authority** | Recency + venue prestige | Established, well-cited work |
| **Novelty** | Distance from corpus centroid | Unique, cutting-edge research |

### Discovery Modes

| Mode | Relevance | Authority | Novelty | Best For |
|------|-----------|-----------|---------|----------|
| **Stable** | 50% | 40% | 10% | Authoritative, foundational works |
| **Discovery** | 30% | 10% | 60% | Cutting-edge, novel research |
| **Balanced** | 40% | 30% | 30% | Mix of established and new |

---

## Database Schema

Core tables in Supabase (PostgreSQL with RLS):

| Table | Purpose |
|-------|---------|
| `profiles` | User data: display name, affiliation, interests, role |
| `papers` | Paper metadata: title, authors, abstract, PDF URL, embeddings |
| `edges` | Paper relationships with type, similarity score, rationale |
| `communities` | Reading circles: name, description, visibility, membership |
| `sessions` | Scheduled discussions: date, presenter, paper, RSVP status |
| `rsvps` | Session attendance tracking with check-in |
| `discussions` | Threaded comments on papers and sessions |
| `paper_analyses` | Mind Graph results: concepts, methods, experiments |
| `paper_reviews` | AI-generated reviews: JSON review, summary, lineage edges |

All tables use Row Level Security for auth-based access control. See `supabase/migrations/` for the complete schema.

---

## Deployment

| Component | Recommended | Alternatives |
|-----------|-------------|--------------|
| **Frontend** | [Vercel](https://vercel.com) | Netlify, Cloudflare Pages |
| **Backend** | [Railway](https://railway.app) | Render, Fly.io, Docker |
| **Database** | [Supabase](https://supabase.com) | — |

```bash
# Build frontend for deployment
npm run build
# Deploy the dist/ directory to Vercel/Netlify

# Backend deploys via Dockerfile or docker-compose
# See docs/DEPLOYMENT_GUIDE.md for full instructions
```

Configuration files included:
- `vercel.json` — Vercel frontend deployment with API rewrites
- `railway.toml` — Railway backend deployment
- `render.yaml` — Render backend deployment
- `Dockerfile` — Container build for backend
- `backend/docker-compose.yml` — Multi-service orchestration

---

## Benchmarks

The [examples/pc-data](examples/pc-data/) directory contains the benchmark suite for evaluating:
- Multi-agent retrieval performance (MRR, Recall@K)
- AI-generated paper reviews vs. human reviews
- Ranking algorithm comparisons across discovery modes

---

## Documentation

| Document | Description |
|----------|-------------|
| [Quick Start](docs/QUICK_START.md) | Get running in 2 minutes with 2 APIs |
| [Deployment Guide](docs/DEPLOYMENT_GUIDE.md) | Production deployment instructions |
| [Security](docs/SECURITY.md) | Security guidelines and best practices |
| [API Migration](docs/API_MIGRATION.md) | Migration to serverless architecture |
| [Review Agents](docs/PAPER_REVIEW_AGENTS_IMPLEMENTATION.md) | Detailed implementation of the review system |
| [Mind Graph README](backend/agents/paper_mind_graph/README.md) | Paper Mind Graph module docs |
| [Review Agents README](backend/agents/paper_review_agents/README.md) | Review agents module docs |

---

## Roadmap

- [ ] Mobile app (React Native)
- [ ] PDF annotation tools
- [ ] Citation graph visualization
- [ ] Slack/Discord integration
- [ ] Paper recommendations engine
- [ ] Export to Zotero/Mendeley

---

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature/my-feature`
3. Make your changes and ensure `npm run lint` and `npm run typecheck` pass
4. Commit with a descriptive message
5. Open a Pull Request

---

## License

MIT License — see [LICENSE](LICENSE)

## Acknowledgments

[arXiv](https://arxiv.org) &bull; [Supabase](https://supabase.com) &bull; [smolagents](https://github.com/huggingface/smolagents) &bull; [LiteLLM](https://github.com/BerriAI/litellm) &bull; [Ollama](https://ollama.com)

---

<p align="center">
  <b>Built for the research community</b>
</p>
