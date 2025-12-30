# Paper Circle 🔬

A collaborative research paper discovery and reading group platform powered by AI. Organize reading sessions, track paper lineage, and foster collaborative learning around academic research.

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

## ✨ Features

### 📚 Paper Discovery
- **AI-Powered Search**: Multi-agent system for intelligent paper discovery
- **arXiv Integration**: Real-time search with advanced filtering
- **Smart Ranking**: Papers ranked by relevance, authority, and novelty
- **Multiple Sources**: Searches arXiv, Scopus, IEEE, and more via findpapers

### 👥 Community Management
- **Reading Circles**: Create and manage research communities
- **Role-Based Access**: Member, Presenter, and Admin roles
- **Private & Public**: Control community visibility
- **Invite System**: Share invite links with colleagues

### 📅 Session Organization
- **Reading Sessions**: Schedule and manage paper discussions
- **RSVP System**: Track attendance with check-ins
- **Presenter Assignment**: Assign paper presenters
- **Session Lineage**: Track paper exploration paths
- **Recording Links**: Store session recordings

### 🔗 Paper Lineage
- **Relationship Tracking**: Map how papers relate (extends, applies, contradicts, etc.)
- **Visual Graph**: Interactive lineage visualization
- **Knowledge Paths**: Follow research evolution

### 💬 Discussions
- **Threaded Comments**: Discuss papers and sessions
- **Community Engagement**: Foster collaborative learning
- **Paper Annotations**: Add notes and insights

## 🚀 Quick Start

### Prerequisites
- Node.js 18+
- Python 3.11+
- Supabase account
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/YOUR_USERNAME/papercircle.git
   cd papercircle
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install Python dependencies**
   ```bash
   pip install -r requirements.txt
   ```

4. **Configure environment variables**
   ```bash
   cp .env.example .env
   # Edit .env with your Supabase credentials
   ```

5. **Start the development server**
   ```bash
   # Terminal 1: Frontend
   npm run dev

   # Terminal 2: AI Discovery API
   python paperfinder_api.py
   ```

6. **Visit** `http://localhost:5173`

## 🔧 Configuration

### Environment Variables

Create a `.env` file:

```bash
# Supabase Configuration
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key

# Paperfinder API (optional, defaults to localhost:8000)
VITE_PAPERFINDER_API_URL=http://localhost:8000
```

### Database Setup

The project uses Supabase (PostgreSQL). Migrations are in `supabase/migrations/`:

```bash
# Apply migrations (via Supabase CLI)
supabase db push

# Or apply via Supabase Dashboard
```

## 🏗️ Architecture

### Frontend
- **Framework**: React 18 + TypeScript + Vite
- **Styling**: TailwindCSS
- **Icons**: Lucide React
- **State**: React Context API
- **Database**: Supabase (PostgreSQL + Auth)

### Backend (AI Discovery)
- **Framework**: FastAPI
- **Search**: arxiv-py + findpapers
- **AI Agent**: smolagents + LiteLLM
- **ML**: scikit-learn (TF-IDF, cosine similarity)
- **Processing**: Multiprocessing for cancellable tasks

### Database Schema
- **profiles**: User profiles with roles
- **papers**: Research papers with metadata
- **communities**: Reading circles
- **community_members**: Membership with roles
- **sessions**: Reading sessions
- **edges**: Paper relationships
- **discussions**: Comments and threads
- **rsvps**: Session attendance

## 🤖 AI Discovery

The AI Discovery system uses a multi-agent approach:

1. **Query Generation Agent**: Converts natural language to structured search
2. **Retrieval**: Multi-source paper fetching (arXiv, Scopus, IEEE)
3. **Deduplication**: Removes duplicates by DOI and title
4. **Scoring**:
   - Relevance (TF-IDF cosine similarity)
   - Authority (recency + venue prestige)
   - Novelty (distance from corpus centroid)
5. **Ranking**: Weighted combination based on mode
6. **Diversity**: MMR algorithm for diverse results

### Discovery Modes
- **Stable**: Established, authoritative works (50% relevance, 40% authority, 10% novelty)
- **Discovery**: Novel, cutting-edge research (30% relevance, 10% authority, 60% novelty)
- **Balanced**: Mix of both (40% relevance, 30% authority, 30% novelty)

## 📦 Deployment

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

### Quick Deploy Options
- **Railway.app** (recommended)
- **Render.com** (free tier)
- **Fly.io**

### Deploy Frontend
```bash
npm run build
# Deploy dist/ to Vercel, Netlify, or Cloudflare Pages
```

### Deploy Backend
```bash
# Uses Dockerfile for containerization
# See DEPLOYMENT.md for platform-specific instructions
```

## 🛠️ Development

### Project Structure
```
papercircle/
├── src/
│   ├── components/       # React components
│   ├── contexts/         # React contexts (Auth, Community)
│   ├── lib/              # Utilities and configs
│   └── App.tsx           # Main app component
├── supabase/
│   └── migrations/       # Database migrations
├── paperfinder.py        # AI discovery core
├── paperfinder_api.py    # FastAPI server
├── Dockerfile            # Container config
└── requirements.txt      # Python dependencies
```

### Key Commands
```bash
# Development
npm run dev               # Start frontend dev server
npm run build             # Build for production
npm run preview           # Preview production build
npm run lint              # Run ESLint
npm run typecheck         # Type checking

# Backend
python paperfinder_api.py # Start AI discovery API
```

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙏 Acknowledgments

- **arXiv** for the arXiv API
- **findpapers** for multi-source paper search
- **Supabase** for backend infrastructure
- **smolagents** for AI agent framework

## 📧 Contact

For questions or support, please open an issue on GitHub.

## 🗺️ Roadmap

- [ ] Mobile app (React Native)
- [ ] PDF annotation tools
- [ ] Citation graph visualization
- [ ] Email notifications
- [ ] Slack/Discord integration
- [ ] Paper recommendation system
- [ ] Reading progress tracking
- [ ] Export to reference managers (Zotero, Mendeley)

---

Built with ❤️ for the research community
