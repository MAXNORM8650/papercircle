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
  <img src="https://img.shields.io/badge/FastAPI-0.104-009688?logo=fastapi" alt="FastAPI"/>
  <img src="https://img.shields.io/badge/Supabase-PostgreSQL-3FCF8E?logo=supabase" alt="Supabase"/>
  <img src="https://img.shields.io/badge/License-MIT-yellow.svg" alt="MIT"/>
</p>

<p align="center">
  <a href="#features">Features</a> •
  <a href="#quick-start">Quick Start</a> •
  <a href="#architecture">Architecture</a> •
  <a href="#ai-discovery">AI Discovery</a> •
  <a href="#deployment">Deploy</a>
</p>

---

## Features

| Category | Capabilities |
|----------|-------------|
| **Paper Discovery** | Multi-agent AI search, arXiv/Scopus/IEEE integration, BM25 + semantic ranking |
| **Reading Circles** | Create communities, role-based access (Member/Presenter/Admin), invite links |
| **Sessions** | Schedule discussions, RSVP & check-ins, presenter assignment, recording links |
| **Paper Lineage** | Relationship mapping (extends/applies/contradicts), interactive graph visualization |
| **AI Analysis** | Paper summaries, critical reviews, reproducibility checks, literature linking |

## Quick Start

```bash
# Clone & install
git clone https://github.com/YOUR_USERNAME/papercircle.git
cd papercircle
npm install
pip install -r backend/requirements-prod.txt

# Configure
cp .env.example .env
# Edit .env with Supabase credentials

# Run
npm run dev                                    # Frontend (localhost:5173)
python backend/apis/paperfinder_api.py         # AI API (localhost:8000)
```

## Architecture

```
┌─────────────────────────────────────────────────────────────────────────┐
│                            PaperCircle                                   │
├─────────────────────────────┬───────────────────────────────────────────┤
│         Frontend            │              Backend                       │
│  React 18 + TypeScript      │           FastAPI + Python                │
│  TailwindCSS + Vite         │         smolagents + LiteLLM              │
│  Supabase Client            │       arXiv/Scopus/IEEE APIs              │
└─────────────────────────────┴───────────────────────────────────────────┘
                                      │
                              ┌───────┴───────┐
                              │   Supabase    │
                              │  PostgreSQL   │
                              │  + Auth + RLS │
                              └───────────────┘
```

### Tech Stack

| Layer | Technologies |
|-------|-------------|
| **Frontend** | React 18, TypeScript, Vite, TailwindCSS, Lucide Icons |
| **Backend** | FastAPI, smolagents, LiteLLM, scikit-learn, arxiv-py |
| **Database** | Supabase (PostgreSQL), Row Level Security, Edge Functions |
| **AI/ML** | Multi-agent orchestration, BM25, TF-IDF, semantic search |

## AI Discovery

Multi-agent pipeline for intelligent paper discovery:

```
Query → Intent Agent → Search (arXiv/Scopus/IEEE) → Dedup → Score → Rank → Diversify
```

### Scoring Components
- **Relevance** — TF-IDF cosine similarity to query
- **Authority** — Recency + venue prestige
- **Novelty** — Distance from corpus centroid

### Discovery Modes

| Mode | Relevance | Authority | Novelty | Use Case |
|------|-----------|-----------|---------|----------|
| **Stable** | 50% | 40% | 10% | Established, authoritative works |
| **Discovery** | 30% | 10% | 60% | Cutting-edge, novel research |
| **Balanced** | 40% | 30% | 30% | Mix of both |

## Project Structure

```
papercircle/
├── src/                      # React frontend
│   ├── components/           # UI components
│   ├── contexts/             # Auth, Community contexts
│   └── lib/                  # Supabase client, utilities
├── backend/
│   ├── apis/                 # FastAPI endpoints
│   │   ├── paperfinder_api.py
│   │   └── paper_analysis_api.py
│   ├── agents/               # Multi-agent systems
│   │   ├── discovery/        # Paper discovery agents
│   │   └── paper_review_agents/  # Review generation
│   └── core/                 # Core logic
├── supabase/
│   ├── migrations/           # Database schema
│   └── functions/            # Edge functions
└── exmaples/pc-data/         # Benchmark suite
```

## Configuration

```bash
# .env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key
VITE_PAPERFINDER_API_URL=http://localhost:8000  # or Railway URL
```

## Deployment

| Component | Recommended | Alternatives |
|-----------|-------------|--------------|
| **Frontend** | Vercel | Netlify, Cloudflare Pages |
| **Backend** | Railway | Render, Fly.io |
| **Database** | Supabase | — |

```bash
# Build frontend
npm run build  # Deploy dist/ to Vercel/Netlify

# Backend uses Dockerfile
# See DEPLOYMENT.md for details
```

## Commands

```bash
# Development
npm run dev                    # Frontend dev server
npm run build                  # Production build
npm run lint                   # ESLint
npm run typecheck              # TypeScript check

# Backend APIs
python backend/apis/paperfinder_api.py      # Main discovery API
python backend/apis/paper_analysis_api.py   # Paper analysis API
```

## Benchmarks

See [exmaples/pc-data](exmaples/pc-data/) for the benchmark suite evaluating:
- Multi-agent retrieval (MRR, Recall@K)
- Paper review generation vs. human reviews
- Ranking algorithm comparisons

## Roadmap

- [ ] Mobile app (React Native)
- [ ] PDF annotation tools
- [ ] Citation graph visualization
- [ ] Slack/Discord integration
- [ ] Paper recommendations
- [ ] Export to Zotero/Mendeley

## License

MIT License — see [LICENSE](LICENSE)

## Acknowledgments

[arXiv](https://arxiv.org) • [Supabase](https://supabase.com) • [smolagents](https://github.com/huggingface/smolagents) • [LiteLLM](https://github.com/BerriAI/litellm)

---

<p align="center">
  <b>Built for the research community</b><br/>
  <a href="https://github.com/YOUR_USERNAME/papercircle/issues">Report Bug</a> •
  <a href="https://github.com/YOUR_USERNAME/papercircle/issues">Request Feature</a>
</p>
