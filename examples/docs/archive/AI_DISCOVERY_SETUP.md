# AI Discovery Setup Guide

This guide explains how to set up and use the improved AI-Powered Paper Discovery feature in Paper Circle.

## Overview

The AI Discovery feature uses a multi-agent system to intelligently search and rank research papers based on your natural language queries. It:

- Calls the paperfinder API in **real-time** (no pre-loaded JSON files)
- Uses AI to understand your research interests
- Automatically saves discovered papers to your community
- Provides advanced filtering with score sliders
- Shows all paper scores (relevance, authority, novelty, final)

## Prerequisites

Make sure you have the following installed:

1. **Python 3.8+**
2. **Node.js 16+**
3. **Required Python packages**:
   ```bash
   pip install fastapi uvicorn findpapers arxiv numpy pandas scikit-learn smolagents litellm
   ```

## Setup Instructions

### Step 1: Start the Paperfinder API Server

The AI Discovery feature requires a FastAPI backend server to run the multi-agent discovery pipeline.

1. Open a new terminal in your project directory
2. Run the API server:
   ```bash
   python paperfinder_api.py
   ```

You should see output like:
```
======================================================================
🚀 Starting Paperfinder API Server
======================================================================
Available modes: ['stable', 'discovery', 'balanced']
Server running at: http://localhost:8000
API docs at: http://localhost:8000/docs
======================================================================
```

The API will be available at `http://localhost:8000`

### Step 2: Start Your Frontend

In a separate terminal, start your Vite development server:

```bash
npm run dev
```

### Step 3: Use AI Discovery

1. Navigate to the **Discover Papers** page
2. Click on the **AI Discovery** tab
3. Enter a natural language query describing your research interest
   - Example: "I'm looking for recent work on efficient fine-tuning methods for large language models"
   - Example: "Papers about attention mechanisms in computer vision"
4. Click **Search** or press Enter
5. The AI will:
   - Analyze your query
   - Generate search keywords
   - Retrieve papers from multiple sources
   - Score and rank them based on relevance, authority, and novelty
   - Display results with all scores visible

## Features

### Real-Time API Calls

Every search triggers a fresh API call to the paperfinder system - no cached or pre-loaded results.

### Automatic Community Integration

- Papers are automatically saved to the global papers database
- If you have a community selected, papers are also added to that community
- Use the **"Save All to [Community]"** button to manually save filtered results

### Advanced Score Filters

Click **"Show Filters"** to access slider controls for:

- **Final Score**: Combined weighted score
- **Relevance Score**: How well the paper matches your query
- **Authority Score**: Paper quality based on venue, year, citations
- **Novelty Score**: How unique/cutting-edge the research is

All filters work in real-time - adjust sliders to instantly filter results.

### Mode Weights Display

The AI automatically selects the best discovery mode (stable, balanced, or discovery) and shows you the weights:

- **Stable**: Relevance 50%, Authority 40%, Novelty 10%
- **Balanced**: Relevance 40%, Authority 30%, Novelty 30%
- **Discovery**: Relevance 30%, Authority 10%, Novelty 60%

### Query Insights

After each search, you'll see:
- Core keywords extracted from your query
- Must-include terms
- Nice-to-have related concepts
- The AI-selected discovery mode

## Troubleshooting

### API Connection Error

If you see "Failed to search papers. Make sure paperfinder API is running...":

1. Check that `paperfinder_api.py` is running
2. Verify the API is accessible at `http://localhost:8000`
3. Check the terminal running the API for error messages

### Missing Dependencies

If the API fails to start:

```bash
# Install all required dependencies
pip install fastapi uvicorn findpapers arxiv numpy pandas scikit-learn smolagents litellm
```

### Findpapers Configuration

The paperfinder system uses the `findpapers` library which may require configuration:

1. First time setup: `findpapers search-sources`
2. Follow prompts to configure search sources (arXiv, Scopus, etc.)

### No Papers Found

If searches return no results:

1. Try a broader query
2. Check that findpapers is properly configured
3. Verify your internet connection (required for arXiv API)

## API Endpoints

You can also use the API directly:

### GET /
Health check and API info

### GET /modes
Get available discovery modes and their weights

### POST /discover
Main discovery endpoint

Request body:
```json
{
  "query": "efficient finetuning for LLMs",
  "mode": "balanced",  // optional: "stable", "discovery", or "balanced"
  "apply_diversity": true
}
```

Response includes:
- `all_papers_sorted`: Complete list with all scores
- `search_spec`: Extracted keywords and metadata
- `mode_used`: The mode that was used
- `mode_weights`: Weight distribution used

### Testing the API

Visit `http://localhost:8000/docs` for interactive API documentation (Swagger UI).

## Architecture

```
User Query
    ↓
Frontend (React)
    ↓
FastAPI Server (paperfinder_api.py)
    ↓
Multi-Agent System (paperfinder.py)
    ↓
- QueryGenerationAgent: Extracts keywords, suggests mode
- RetrievalPipeline: Searches arXiv + findpapers
- ScoringPipeline: Calculates relevance, authority, novelty
- MMR Diversity: Re-ranks for diverse results
    ↓
Ranked Papers with Scores
    ↓
Frontend Display + Community Integration
```

## Best Practices

1. **Be Descriptive**: The AI works best with detailed, natural language queries
2. **Use Filters**: Adjust score sliders to find the most relevant papers
3. **Save to Community**: Use the "Save All" button to add filtered results to your reading group
4. **Try Different Queries**: Rephrase your query if results aren't what you expected
5. **Monitor API**: Keep an eye on the API terminal for errors or warnings

## Next Steps

- Explore papers by adjusting filters
- Save interesting papers to your community
- Create reading sessions around discovered papers
- Build paper lineage graphs from discovery results

## Need Help?

- Check the API logs in the terminal running `paperfinder_api.py`
- Visit `http://localhost:8000/docs` for API documentation
- Consult the main CLAUDE.md file for overall architecture
