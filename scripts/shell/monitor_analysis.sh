#!/bin/bash

PAPER_ID="3a5cea46-7026-456f-8852-4abaee7fb312"
COMMUNITY_ID="cffce47b-e169-442d-a4e5-a644392c25bd"

echo "📊 Monitoring Paper Analysis"
echo "================================"
echo ""

while true; do
    clear
    echo "📊 Monitoring Paper Analysis"
    echo "================================"
    echo ""

    # Check if analysis exists
    RESULT=$(curl -s "http://localhost:8001/analysis/paper/${PAPER_ID}?community_id=${COMMUNITY_ID}")

    if echo "$RESULT" | grep -q "Analysis not found"; then
        echo "⏳ Status: Still Processing..."
        echo ""
        echo "Recent API activity:"
        tail -5 /tmp/api.log | grep -E "Phase|Step|✅|analyzing" || echo "  (waiting for analysis to start...)"
    else
        echo "✅ Analysis Complete!"
        echo ""
        echo "$RESULT" | python3 -m json.tool | head -30
        echo ""
        echo "🎉 Success! You can now view the analysis in your browser:"
        echo "   Circle → Analysis Hub → Click the paper"
        break
    fi

    echo ""
    echo "Checking again in 10 seconds... (Press Ctrl+C to stop)"
    sleep 10
done
