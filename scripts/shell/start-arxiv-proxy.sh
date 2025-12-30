#!/bin/bash

# arXiv Proxy Server Startup Script

echo "=================================="
echo "arXiv CORS Proxy Server"
echo "=================================="
echo ""

# Check if Node.js is installed
if ! command -v node &> /dev/null; then
    echo "❌ Error: Node.js is not installed"
    echo "   Please install Node.js from https://nodejs.org/"
    exit 1
fi

# Check if dependencies are installed
if [ ! -d "node_modules/express" ] || [ ! -d "node_modules/cors" ] || [ ! -d "node_modules/node-fetch" ]; then
    echo "📦 Installing dependencies..."
    npm install express cors node-fetch
    echo ""
fi

# Start the proxy server
echo "🚀 Starting arXiv proxy server..."
echo ""
node ../../scripts/javascript/arxiv-proxy.cjs
