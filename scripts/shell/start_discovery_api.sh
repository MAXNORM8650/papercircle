#!/bin/bash

# AI Discovery API Startup Script

echo "=================================="
echo "Paper Circle - AI Discovery API"
echo "=================================="
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Error: Python 3 is not installed"
    exit 1
fi

# Check if Ollama is running
if ! curl -s http://localhost:11434/api/tags &> /dev/null; then
    echo "⚠️  Warning: Ollama doesn't seem to be running"
    echo "   Please start Ollama with: ollama serve"
    echo "   Then run this script again"
    echo ""
    read -p "Do you want to continue anyway? (y/n) " -n 1 -r
    echo ""
    if [[ ! $REPLY =~ ^[Yy]$ ]]; then
        exit 1
    fi
fi

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "📦 Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
echo "🔧 Activating virtual environment..."
source venv/bin/activate

# Install dependencies if needed
if ! python -c "import fastapi" 2>/dev/null; then
    echo "📥 Installing dependencies..."
    pip install -r ../../backend/requirements/discovery.txt
fi

# Start the API server
echo ""
echo "🚀 Starting AI Discovery API on http://localhost:8000"
echo "   Press Ctrl+C to stop"
echo ""
python ../../backend/apis/discovery_api.py
