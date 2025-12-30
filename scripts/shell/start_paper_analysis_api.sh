#!/bin/bash

# Start Paper Analysis API
# This script starts the FastAPI server for paper analysis using paper_mind_graph

echo "Starting Paper Analysis API..."

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install requirements if needed
echo "Installing requirements..."
pip install -q fastapi uvicorn supabase python-dotenv pydantic

# Install paper_mind_graph requirements
if [ -f "../../backend/agents/paper_mind_graph/requirements.txt" ]; then
    pip install -q -r ../../backend/agents/paper_mind_graph/requirements.txt
fi

# Load environment variables
if [ -f ".env" ]; then
    export $(cat .env | grep -v '^#' | xargs)
fi

# Start the API server
echo "Starting server on http://localhost:8001"
python ../../backend/apis/paper_analysis_api.py
