#!/bin/bash

echo "📋 Getting Supabase Service Role Key..."
echo ""
echo "To get your service role key, run:"
echo ""
echo "  cd supabase"
echo "  npx supabase status"
echo ""
echo "Look for the line that says:"
echo "  service_role key: eyJ..."
echo ""
echo "Copy that key and add it to your .env file as:"
echo "  SUPABASE_SERVICE_ROLE_KEY=your_key_here"
echo ""
echo "⚠️  IMPORTANT: The service role key bypasses ALL security rules."
echo "   Never expose it in client-side code or commit it to git!"
echo ""

# Try to get it automatically if supabase CLI is available
if command -v supabase &> /dev/null; then
    echo "Attempting to get key automatically..."
    cd "$(dirname "$0")/supabase" 2>/dev/null || cd "$(dirname "$0")"
    SERVICE_KEY=$(npx supabase status 2>/dev/null | grep "service_role key" | awk '{print $3}')
    if [ -n "$SERVICE_KEY" ]; then
        echo ""
        echo "✅ Found service role key:"
        echo "SUPABASE_SERVICE_ROLE_KEY=$SERVICE_KEY"
        echo ""
        echo "Add this to your .env file."
    fi
fi
