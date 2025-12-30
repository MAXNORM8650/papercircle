# AI Discovery Setup Guide

This guide explains how to set up and use the AI-powered paper discovery system in Paper Circle.

## Overview

The AI Discovery feature uses a multi-agent system powered by `smolagents` and local LLM to intelligently discover research papers based on:
- **Relevance**: Topic match to your query
- **Authority**: Citation count and paper influence
- **Novelty**: Cutting-edge research and novel approaches

## Architecture

1. **Backend API** (`discovery_api.py`): FastAPI server that wraps the discovery agent
2. **Discovery Agent** (`discovery_papers.py`): Multi-agent system with tools for searching, scoring, and ranking papers
3. **Frontend Integration**: AI Discovery mode in the Discover Papers section

## Prerequisites

1. **Python 3.9+**
2. **Ollama** (for local LLM)
3. **Node.js and npm** (for the frontend)

## Setup Instructions

### 1. Install Ollama and Download Model

```bash
# Install Ollama (macOS)
brew install ollama

# Start Ollama service
ollama serve

# Pull the required model (in a new terminal)
ollama pull gpt-oss:20b
```

### 2. Install Python Dependencies

```bash
# Create a virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements-discovery.txt
```

### 3. Configure the Discovery Agent

Edit `discovery_papers.py` if needed to change:
- `MODEL_ID`: The Ollama model to use (default: `ollama_chat/gpt-oss:20b`)
- `API_BASE`: Ollama API endpoint (default: `http://10.127.30.115:11435`)
- `MODE_WEIGHTS`: Adjust the scoring weights for different modes

### 4. Start the Discovery API Server

```bash
# Make sure you're in the project root directory
python discovery_api.py
```

The API will start on `http://localhost:8000`. You can visit this URL to see the API documentation.

### 5. Configure Frontend

The frontend is already configured to use `http://localhost:8000` by default. If you need to change it:
1. Open the Discover Papers page
2. Click the AI Discovery tab
3. Click the Filters button
4. Update the API Endpoint field in Advanced Options

## Usage

### Basic Usage

1. Navigate to **Discover Papers** in the app
2. Click on the **AI Discovery** tab
3. Enter your research query (e.g., "efficient finetuning methods for large language models")
4. Click **Search**
5. View results categorized by:
   - **Top Overall**: Best papers based on weighted scores
   - **Hidden Gems**: High novelty papers
   - **Canonical Papers**: High authority papers

### Discovery Modes

#### Stable Mode
- **Best for**: Finding established, well-cited papers
- **Weights**: Relevance 50%, Authority 40%, Novelty 10%
- **Use when**: You need authoritative references or foundational papers

#### Balanced Mode (Default)
- **Best for**: General research and exploration
- **Weights**: Relevance 40%, Authority 30%, Novelty 30%
- **Use when**: You want a mix of established and novel papers

#### Discovery Mode
- **Best for**: Finding cutting-edge research
- **Weights**: Relevance 30%, Authority 10%, Novelty 60%
- **Use when**: You want to explore the latest innovations

### Advanced Options

- **Apply Diversity (MMR)**: Re-ranks results using Maximal Marginal Relevance to ensure diverse perspectives
- **API Endpoint**: Configure custom API endpoint if running on a different server

## Understanding the Scores

Each paper shows three scores:

1. **Relevance Score**: How well the paper matches your query
   - Based on keyword matching and semantic similarity
   - Higher = better topic match

2. **Novelty Score**: How novel or innovative the paper is
   - Based on keywords like "novel", "propose", "first", etc.
   - Higher = more cutting-edge

3. **Authority Score**: How authoritative/influential the paper is
   - Based on citation counts and age
   - Higher = more established/trusted

**Final Score**: Weighted combination based on the selected mode

## API Endpoints

The Discovery API provides these endpoints:

### GET /
Returns API information and available endpoints

### GET /modes
Returns available discovery modes and their descriptions

### POST /discover
Main discovery endpoint

**Request Body**:
```json
{
  "query": "your research query",
  "mode": "balanced",
  "apply_diversity": true,
  "max_results": 25
}
```

**Response**:
```json
{
  "query": "...",
  "mode": "balanced",
  "total_papers": 25,
  "top_overall": [...],
  "hidden_gems": [...],
  "canonical_papers": [...],
  "all_papers": [...],
  "mode_weights": {...}
}
```

## Troubleshooting

### API Connection Error
- Ensure the Discovery API is running (`python discovery_api.py`)
- Check that the API endpoint in the frontend matches the server address
- Verify Ollama is running (`ollama serve`)

### No Results
- Try a broader search query
- Check Ollama logs for errors
- Verify your internet connection (needed for arXiv API)

### Slow Performance
- The first request may be slow as the model loads
- Consider using a smaller model for faster responses
- Reduce `max_results` in the request

### Model Not Found
- Ensure you've pulled the model: `ollama pull gpt-oss:20b`
- Check available models: `ollama list`

## Customization

### Using a Different Model

Edit `discovery_papers.py`:
```python
MODEL_ID = "ollama_chat/mistral:7b"  # Use Mistral instead
```

### Adjusting Mode Weights

Edit `discovery_papers.py`:
```python
MODE_WEIGHTS = {
    "stable": {"relevance": 0.6, "authority": 0.3, "novelty": 0.1},
    # ... adjust as needed
}
```

### Changing Search Depth

Edit the `search_arxiv_papers` function in `discovery_papers.py` to adjust max_results defaults.

## Production Deployment

For production use:

1. **Secure the API**: Add authentication and rate limiting
2. **Use a production WSGI server**:
   ```bash
   pip install gunicorn
   gunicorn -w 4 -k uvicorn.workers.UvicornWorker discovery_api:app
   ```
3. **Update CORS settings**: Restrict allowed origins in `discovery_api.py`
4. **Use environment variables**: Don't hardcode API endpoints
5. **Monitor and log**: Add proper logging and monitoring

## Support

For issues or questions:
- Check the main project README
- Review the discovery_papers.py source code
- Check Ollama documentation: https://ollama.ai/

## License

Same as the main Paper Circle project.
