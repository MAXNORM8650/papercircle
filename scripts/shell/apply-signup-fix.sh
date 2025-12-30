#!/bin/bash

# Script to apply the user signup fix migration
# This script provides multiple options for applying the migration

set -e  # Exit on error

echo "====================================="
echo "Paper Circle - User Signup Fix"
echo "====================================="
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if migration file exists
MIGRATION_FILE="supabase/migrations/20251209120000_fix_user_signup_robust.sql"

if [ ! -f "$MIGRATION_FILE" ]; then
    echo -e "${RED}Error: Migration file not found at $MIGRATION_FILE${NC}"
    exit 1
fi

echo -e "${GREEN}Migration file found: $MIGRATION_FILE${NC}"
echo ""

# Display options
echo "Please select how you want to apply the migration:"
echo ""
echo "1) Use Supabase CLI (supabase db push) - RECOMMENDED"
echo "2) Display SQL to copy to Supabase Dashboard"
echo "3) Exit"
echo ""

read -p "Enter your choice (1-3): " choice

case $choice in
    1)
        echo ""
        echo -e "${YELLOW}Checking Supabase CLI...${NC}"

        # Check if Supabase CLI is installed
        if ! command -v supabase &> /dev/null; then
            echo -e "${RED}Supabase CLI is not installed.${NC}"
            echo ""
            echo "Install it with:"
            echo "  npm install -g supabase"
            echo "  or"
            echo "  brew install supabase/tap/supabase"
            exit 1
        fi

        echo -e "${GREEN}Supabase CLI found!${NC}"
        echo ""

        # Check if linked to a project
        echo "Checking if project is linked..."
        if ! supabase status &> /dev/null; then
            echo -e "${YELLOW}Project not linked or Supabase not running locally${NC}"
            echo ""
            read -p "Do you want to apply to remote project? (y/n): " remote

            if [ "$remote" = "y" ] || [ "$remote" = "Y" ]; then
                echo ""
                echo "Please ensure you're linked to your project:"
                echo "  supabase link --project-ref YOUR_PROJECT_REF"
                echo ""
                read -p "Press Enter after linking, or Ctrl+C to cancel..."
            else
                exit 0
            fi
        fi

        echo ""
        echo -e "${YELLOW}Applying migration...${NC}"
        supabase db push

        echo ""
        echo -e "${GREEN}✓ Migration applied successfully!${NC}"
        echo ""
        echo "Next steps:"
        echo "1. Test signup with a new email address"
        echo "2. Check browser console for confirmation logs"
        echo "3. Verify profile was created in Supabase dashboard"
        echo ""
        echo "See USER_SIGNUP_FIX.md for testing instructions"
        ;;

    2)
        echo ""
        echo -e "${YELLOW}Copy the SQL below and paste it into Supabase Dashboard > SQL Editor:${NC}"
        echo ""
        echo "====================================="
        cat "$MIGRATION_FILE"
        echo "====================================="
        echo ""
        echo "Steps:"
        echo "1. Go to your Supabase Dashboard"
        echo "2. Navigate to SQL Editor"
        echo "3. Copy the SQL above"
        echo "4. Paste and run it"
        echo ""
        ;;

    3)
        echo "Exiting..."
        exit 0
        ;;

    *)
        echo -e "${RED}Invalid choice. Please run the script again.${NC}"
        exit 1
        ;;
esac
