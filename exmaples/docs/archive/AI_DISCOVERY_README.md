# AI Discovery Feature - Quick Reference

## What's New

Paper Circle now includes an AI-powered paper discovery system that uses multi-agent technology to find research papers intelligently based on your specific needs.

## Key Features

### 🎯 Three Discovery Modes
- **Stable**: Find authoritative, well-established papers
- **Balanced**: Mix of established and novel research (default)
- **Discovery**: Focus on cutting-edge, novel research

### 📊 Smart Scoring System
Each paper is scored on three dimensions:
- **Relevance**: How well it matches your query
- **Authority**: How influential/well-cited it is
- **Novelty**: How innovative/cutting-edge it is

### 🗂️ Intelligent Categorization
Results are automatically categorized into:
- **Top Overall**: Best papers based on weighted scoring
- **Hidden Gems**: High novelty papers you might have missed
- **Canonical Papers**: Highly authoritative foundational works

### 🎨 Rich UI Experience
- Visual score indicators with progress bars
- Category filters for easy navigation
- Import papers directly to your community library
- Like/dislike papers to improve recommendations

## Quick Start

### 1. Start the API Server

```bash
# Option 1: Use the startup script
./start_discovery_api.sh

# Option 2: Manual start
python discovery_api.py
```

### 2. Use in the App

1. Open Paper Circle
2. Go to **Discover Papers**
3. Click **AI Discovery** tab
4. Enter your research query
5. Optionally click Filters to select a discovery mode
6. Click **Search**

## Example Queries

- "efficient finetuning methods for large language models"
- "multimodal learning with vision and language"
- "reinforcement learning from human feedback"
- "graph neural networks for molecular property prediction"

## Configuration

### Discovery Modes

#### 🏆 Stable Mode
Use when you need established, well-cited references:
- Writing a literature review
- Finding foundational papers
- Looking for authoritative sources

#### ⚖️ Balanced Mode
Use for general research:
- Exploring a new topic
- Getting a comprehensive view
- Mixed research needs

#### 💡 Discovery Mode
Use when you want cutting-edge research:
- Finding the latest innovations
- Exploring emerging topics
- Looking for novel approaches

### Advanced Options

- **Diversity (MMR)**: Enable to get diverse perspectives (recommended)
- **API Endpoint**: Change if running the API on a different server

## Architecture

```
┌─────────────────┐
│   Frontend UI   │
│  (React/TS)     │
└────────┬────────┘
         │ HTTP POST
         ▼
┌─────────────────┐
│  FastAPI Server │
│ discovery_api.py│
└────────┬────────┘
         │
         ▼
┌─────────────────────────────┐
│  Multi-Agent System         │
│  discovery_papers.py        │
│                             │
│  ┌─────────────────────┐   │
│  │ Search Tool         │   │
│  │ (ArXiv API)         │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ Scoring Tool        │   │
│  │ (LLM-powered)       │   │
│  └─────────────────────┘   │
│                             │
│  ┌─────────────────────┐   │
│  │ Diversity Tool      │   │
│  │ (MMR Algorithm)     │   │
│  └─────────────────────┘   │
└─────────────────────────────┘
         │
         ▼
┌─────────────────┐
│  Local LLM      │
│  (Ollama)       │
└─────────────────┘
```

## Files Added/Modified

### New Files
- `discovery_api.py` - FastAPI backend server
- `discovery_papers.py` - Multi-agent discovery system
- `requirements-discovery.txt` - Python dependencies
- `start_discovery_api.sh` - Startup script
- `DISCOVERY_SETUP.md` - Detailed setup guide
- `AI_DISCOVERY_README.md` - This file

### Modified Files
- `src/components/Papers/DiscoverView.tsx` - Added AI Discovery mode

## Dependencies

### Backend
- FastAPI - Web framework
- smolagents - Multi-agent system
- arxiv - ArXiv API client
- pandas/numpy - Data processing
- scikit-learn - MMR diversity algorithm
- litellm - LLM integration

### Frontend
- No new dependencies (uses existing React setup)

## Troubleshooting

### Common Issues

**Q: API connection error**
- Make sure the API is running: `python discovery_api.py`
- Check the API endpoint in the UI (should be `http://localhost:8000`)

**Q: No results returned**
- Check if Ollama is running: `ollama serve`
- Verify the model is installed: `ollama list`
- Try a broader search query

**Q: Slow performance**
- First request is always slower (model loading)
- Consider using a smaller/faster model
- Check your internet connection (needed for ArXiv)

**Q: Model not found**
- Install the model: `ollama pull gpt-oss:20b`
- Or use a different model in `discovery_papers.py`

## Performance Tips

1. **Keep Ollama running** in the background
2. **Use Balanced mode** for faster results
3. **Disable diversity** if speed is critical
4. **Start with specific queries** rather than very broad ones

## Future Enhancements

Potential improvements:
- [ ] Save favorite discovery configurations
- [ ] Export results to citation managers
- [ ] Historical search tracking
- [ ] Custom mode weight configuration in UI
- [ ] Real-time citation count fetching
- [ ] Semantic search using embeddings
- [ ] Multi-query batch processing

## Support

For detailed setup instructions, see `DISCOVERY_SETUP.md`

For issues:
1. Check Ollama logs
2. Check API logs (terminal running discovery_api.py)
3. Check browser console for frontend errors

## Credits

Built using:
- [smolagents](https://github.com/huggingface/smolagents) - Multi-agent framework
- [Ollama](https://ollama.ai/) - Local LLM runtime
- [ArXiv API](https://arxiv.org/help/api) - Paper search

---

**Enjoy discovering papers with AI! 🚀**
