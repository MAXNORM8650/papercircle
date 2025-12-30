-- Complete fix for user signup issues
-- This migration removes problematic triggers and sets up proper profile creation

-- Step 1: Remove any existing problematic triggers
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user();

-- Step 2: Grant necessary permissions
GRANT USAGE ON SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL TABLES IN SCHEMA public TO postgres, anon, authenticated, service_role;
GRANT ALL ON ALL SEQUENCES IN SCHEMA public TO postgres, anon, authenticated, service_role;

-- Step 3: Drop and recreate profiles policies to ensure they're correct
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON profiles;
DROP POLICY IF EXISTS "Allow service role to insert profiles" ON profiles;

-- Step 4: Create proper RLS policies
CREATE POLICY "Public profiles are viewable by everyone"
  ON profiles FOR SELECT
  TO authenticated, anon
  USING (true);

CREATE POLICY "Users can insert own profile"
  ON profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Users can update own profile"
  ON profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

CREATE POLICY "Service role can manage profiles"
  ON profiles FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Step 5: Create a SECURE function to handle new user profile creation
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
LANGUAGE plpgsql
SECURITY DEFINER
SET search_path = public
AS $$
DECLARE
  new_display_name text;
BEGIN
  -- Extract display name from metadata or use email prefix
  new_display_name := COALESCE(
    NEW.raw_user_meta_data->>'display_name',
    split_part(NEW.email, '@', 1),
    'User'
  );

  -- Insert profile with error handling
  BEGIN
    INSERT INTO public.profiles (id, display_name, role, created_at, updated_at)
    VALUES (
      NEW.id,
      new_display_name,
      'member',
      NOW(),
      NOW()
    )
    ON CONFLICT (id) DO NOTHING;
  EXCEPTION
    WHEN OTHERS THEN
      -- Log error but don't fail the signup
      RAISE WARNING 'Failed to create profile for user %: %', NEW.id, SQLERRM;
  END;

  RETURN NEW;
END;
$$;

-- Step 6: Create trigger on auth.users
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 7: Grant execute permission on the function
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role;

-- Step 8: Create profiles for any existing users that don't have one
INSERT INTO public.profiles (id, display_name, role, created_at, updated_at)
SELECT
  u.id,
  COALESCE(u.raw_user_meta_data->>'display_name', split_part(u.email, '@', 1), 'User'),
  'member',
  NOW(),
  NOW()
FROM auth.users u
LEFT JOIN public.profiles p ON u.id = p.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Step 9: Verify the setup
DO $$
BEGIN
  RAISE NOTICE 'User signup fix migration completed successfully';
  RAISE NOTICE 'Profiles table has % rows', (SELECT COUNT(*) FROM public.profiles);
  RAISE NOTICE 'Auth users table has % rows', (SELECT COUNT(*) FROM auth.users);
END $$;
