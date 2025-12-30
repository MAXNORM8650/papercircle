#!/bin/bash

echo "🔑 Adding Supabase Service Role Key"
echo "===================================="
echo ""
echo "Opening your Supabase dashboard..."
echo ""

# Open Supabase dashboard
open "https://supabase.com/dashboard/project/fusfnkihcwnvjzalcxgy/settings/api"

echo "📋 Instructions:"
echo ""
echo "1. In the browser window that just opened:"
echo "   - Scroll down to 'Project API keys'"
echo "   - Find the 'service_role' key"
echo "   - Click the 'Copy' button next to it"
echo ""
echo "2. Come back here and paste the key when prompted"
echo ""
echo "⚠️  IMPORTANT: This key is SECRET - never commit it to git!"
echo ""
read -p "Press ENTER when you have copied the service_role key..."

echo ""
read -p "Paste your service_role key here: " SERVICE_KEY

if [ -z "$SERVICE_KEY" ]; then
    echo "❌ No key provided. Exiting."
    exit 1
fi

# Add to .env file
echo "" >> .env
echo "# Service role key for backend API (added $(date))" >> .env
echo "SUPABASE_SERVICE_ROLE_KEY=$SERVICE_KEY" >> .env

echo ""
echo "✅ Service role key added to .env file!"
echo ""
echo "🔄 Restarting API..."

# Restart API
pkill -f paper_analysis_api 2>/dev/null
sleep 2
nohup python3 paper_analysis_api.py > /tmp/api.log 2>&1 &
sleep 3

# Test API
if curl -s http://localhost:8001/ > /dev/null 2>&1; then
    echo "✅ API restarted successfully!"
    echo ""
    echo "🧪 Testing with a sample paper analysis..."
    echo "   (This will take 2-5 minutes)"
else
    echo "❌ API failed to start. Check /tmp/api.log"
fi

echo ""
echo "✅ Setup complete! You can now analyze papers from arXiv."
