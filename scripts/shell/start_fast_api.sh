#!/bin/bash

echo "╔══════════════════════════════════════════════════════════════════╗"
echo "║          Starting Fast Discovery API                            ║"
echo "╚══════════════════════════════════════════════════════════════════╝"
echo ""

# Check if Python is installed
if ! command -v python3 &> /dev/null; then
    echo "❌ Python 3 is not installed. Please install Python 3.8 or higher."
    exit 1
fi

# Check if required packages are installed
echo "📦 Checking dependencies..."
python3 -c "import fastapi" 2>/dev/null
if [ $? -ne 0 ]; then
    echo "⚠️  FastAPI not found. Installing dependencies..."
    pip3 install fastapi uvicorn pydantic arxiv requests scikit-learn numpy pandas
fi

# Start the API
echo ""
echo "🚀 Starting Fast Discovery API on http://localhost:8000"
echo "📚 API Documentation: http://localhost:8000/docs"
echo ""
echo "Press Ctrl+C to stop the server"
echo ""

python3 ../../backend/apis/fast_discovery_api.py
