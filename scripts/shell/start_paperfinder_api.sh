#!/bin/bash

# Start Paperfinder API Server
# This script starts the FastAPI server for AI-powered paper discovery

echo "========================================"
echo "Starting Paperfinder API Server"
echo "========================================"
echo ""
echo "Checking Python dependencies..."

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

echo "✅ Python found: $(python3 --version)"
echo ""

# Check and install dependencies
echo "Installing required Python packages..."
pip install -q fastapi uvicorn findpapers arxiv numpy pandas scikit-learn smolagents litellm 2>&1 | grep -v "Requirement already satisfied" || true

echo ""
echo "========================================"
echo "Starting API Server on port 8000..."
echo "========================================"
echo ""
echo "📚 API Documentation: http://localhost:8000/docs"
echo "🏥 Health Check: http://localhost:8000/health"
echo "📋 Available Modes: http://localhost:8000/modes"
echo ""
echo "Press Ctrl+C to stop the server"
echo "========================================"
echo ""

# Start the server
python3 ../../backend/apis/paperfinder_api.py
