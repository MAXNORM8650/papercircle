# Paper Mind Graph Integration - Quick Start Guide

## 🚀 Get Started in 5 Minutes

### Step 1: Run Database Migration

```bash
# Apply the new migration
npx supabase db push

# Or if using local Supabase:
npx supabase migration up
```

### Step 2: Install Dependencies

```bash
# Python backend dependencies
pip install fastapi uvicorn supabase python-dotenv pydantic

# Install paper_mind_graph requirements
cd paper_mind_graph
pip install -r requirements.txt
cd ..

# Frontend dependencies
npm install react-mermaid2 mermaid
```

### Step 3: Configure Environment

Add to `.env`:
```bash
OLLAMA_API_BASE=http://localhost:11434
OLLAMA_MODEL=ollama_chat/qwen2.5-coder:32b
```

### Step 4: Start the Analysis API

```bash
chmod +x start_paper_analysis_api.sh
./start_paper_analysis_api.sh
```

You should see:
```
Starting Paper Analysis API...
Starting server on http://localhost:8001
```

### Step 5: Test the API

```bash
# Health check
curl http://localhost:8001/

# You should get:
# {"status":"ok","message":"Paper Analysis API is running"}
```

## 📝 Using in Your App

### Option 1: Add to Session Detail View

Update `src/components/Sessions/SessionDetailView.tsx`:

```typescript
import { useState } from 'react';
import { SessionAnalysisView } from './SessionAnalysisView';
import { Brain } from 'lucide-react';

// Inside your SessionDetailView component:
const [showAnalysis, setShowAnalysis] = useState(false);

// Add a button to the session header:
<button
  onClick={() => setShowAnalysis(!showAnalysis)}
  className="px-4 py-2 bg-purple-500 text-white rounded-lg hover:bg-purple-600"
>
  <Brain className="w-5 h-5 inline mr-2" />
  {showAnalysis ? 'Hide Analysis' : 'Show Analysis'}
</button>

// Add the analysis view:
{showAnalysis && (
  <SessionAnalysisView
    sessionId={session.id}
    communityId={session.community_id}
  />
)}
```

### Option 2: Add to Paper Detail Modal

Update `src/components/Papers/CommunityPaperDetailView.tsx`:

```typescript
import { useState } from 'react';
import { PaperAnalysisView } from './PaperAnalysisView';
import { Brain } from 'lucide-react';

// Inside your component:
const [showAnalysis, setShowAnalysis] = useState(false);

// Add a tab for analysis:
<button
  onClick={() => setShowAnalysis(!showAnalysis)}
  className="tab-button"
>
  <Brain className="w-5 h-5 inline mr-2" />
  Analysis
</button>

{showAnalysis && (
  <PaperAnalysisView
    paperId={paper.id}
    communityId={communityId}
  />
)}
```

## 🧪 Test with a Sample Paper

### Analyze a Paper via API

```bash
# Replace with actual paper_id from your database
curl -X POST http://localhost:8001/analyze/paper \
  -H "Content-Type: application/json" \
  -d '{
    "paper_id": "YOUR_PAPER_UUID",
    "force_reanalyze": false
  }'

# Response:
# {
#   "status": "processing",
#   "paper_id": "...",
#   "message": "Analysis started. Check back in a few minutes."
# }
```

### Check Analysis Status

```bash
# Wait 2-5 minutes, then check:
curl http://localhost:8001/analysis/paper/YOUR_PAPER_UUID

# If ready, you'll get the full analysis JSON
```

### Ask a Question

```bash
curl -X POST http://localhost:8001/ask \
  -H "Content-Type: application/json" \
  -d '{
    "analysis_id": "ANALYSIS_UUID",
    "question": "What are the main contributions of this paper?"
  }'

# Response:
# {
#   "answer": "The main contributions are...",
#   "relevant_sections": ["Introduction", "Methods"],
#   "relevant_figures": ["Figure 1"],
#   "relevant_tables": []
# }
```

## 🎯 Key Features to Try

### 1. Mind Map Visualization
- Navigate to a paper with analysis
- Click the "Mind Map" tab
- See the hierarchical structure of concepts

### 2. Concept Extraction
- Click the "Concepts" tab
- Browse all extracted concepts with descriptions
- See which pages they appear on

### 3. Q&A System
- Click the "Q&A" tab
- Ask questions like:
  - "What datasets are used?"
  - "How does this compare to previous work?"
  - "What are the limitations?"

### 4. Session Analysis
- Open a session with multiple papers
- Click "Analyze All Papers"
- View combined insights across all papers

## 📊 What to Expect

### Analysis Output Includes:

1. **Summary Tab**: Markdown-formatted structured notes
2. **Mind Map**: Visual hierarchy of paper structure
3. **Flowchart**: Concept relationships and dependencies
4. **Concepts List**: All key ideas with descriptions
5. **Methods List**: Algorithms and techniques
6. **Experiments List**: Experimental setups and results
7. **Interactive Graph**: D3.js network visualization
8. **Q&A Interface**: Ask questions about the paper

### Statistics:
- Number of concepts extracted
- Number of methods identified
- Number of experiments found
- Figures and tables count
- Total nodes and edges in knowledge graph

## ⚙️ Configuration Options

### Change LLM Model

Edit `paper_analysis_api.py`:

```python
PMG_CONFIG = Config(
    api_base="http://localhost:11434",
    model_id="ollama_chat/qwen2.5-coder:32b",  # Change this
    num_ctx=8192,
)
```

### Adjust Processing Settings

```python
PMG_CONFIG = Config(
    # ... other settings
    max_chunk_size=1500,  # Smaller = more chunks, slower
    extract_concepts=True,
    extract_methods=True,
    extract_experiments=True,
    link_figures=True,
)
```

## 🐛 Common Issues

### "Connection refused" to API
**Solution**: Make sure the API is running on port 8001
```bash
./start_paper_analysis_api.sh
```

### Analysis stuck in "processing"
**Solution**: Check API logs for errors. Common causes:
- Ollama not running
- Paper has no arxiv_id or pdf_url
- LLM context window too small

### Mermaid diagrams not showing
**Solution**: Install mermaid dependencies
```bash
npm install react-mermaid2 mermaid
```

### "Analysis not found"
**Solution**: Paper needs to be analyzed first
```bash
curl -X POST http://localhost:8001/analyze/paper \
  -H "Content-Type: application/json" \
  -d '{"paper_id": "UUID"}'
```

## 📚 Next Steps

1. **Read the full documentation**: `PAPER_MIND_GRAPH_INTEGRATION.md`
2. **Explore paper_mind_graph**: `paper_mind_graph/README.md`
3. **Customize for your needs**: Modify extractors, add custom visualizations
4. **Integrate with workflows**: Add to paper import, session prep, etc.

## 🎉 Success Indicators

You'll know it's working when:
- ✅ API responds to health check
- ✅ Analysis starts without errors
- ✅ Database stores analysis results
- ✅ Frontend displays mind maps and visualizations
- ✅ Q&A returns relevant answers

## 💡 Tips

- **Start small**: Analyze 1-2 papers first to test
- **Monitor progress**: Check API logs during analysis
- **Use session analysis**: Much more powerful than single papers
- **Ask specific questions**: Q&A works best with targeted queries
- **Export data**: Download JSON/Markdown for offline use

---

**Happy analyzing! 🧠📄**
