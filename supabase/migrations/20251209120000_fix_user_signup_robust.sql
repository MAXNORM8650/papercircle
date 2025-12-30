-- Comprehensive fix for user signup profile creation
-- This migration ensures profiles are created automatically and reliably

-- Step 1: Drop existing triggers and functions to start fresh
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
DROP FUNCTION IF EXISTS public.handle_new_user() CASCADE;

-- Step 2: Ensure profiles table has correct structure
ALTER TABLE public.profiles
  ALTER COLUMN display_name SET NOT NULL,
  ALTER COLUMN role SET DEFAULT 'member',
  ALTER COLUMN created_at SET DEFAULT now(),
  ALTER COLUMN updated_at SET DEFAULT now();

-- Step 3: Grant necessary permissions to authenticated role
GRANT USAGE ON SCHEMA public TO authenticated;
GRANT ALL ON public.profiles TO authenticated;

-- Step 4: Clear existing RLS policies and recreate them properly
DROP POLICY IF EXISTS "Public profiles are viewable by everyone" ON public.profiles;
DROP POLICY IF EXISTS "Users can insert own profile" ON public.profiles;
DROP POLICY IF EXISTS "Users can update own profile" ON public.profiles;
DROP POLICY IF EXISTS "Service role can manage profiles" ON public.profiles;
DROP POLICY IF EXISTS "Allow service role to insert profiles" ON public.profiles;

-- Step 5: Create comprehensive RLS policies
-- Allow anyone authenticated to view profiles
CREATE POLICY "Anyone can view profiles"
  ON public.profiles FOR SELECT
  TO authenticated, anon
  USING (true);

-- Allow users to insert their own profile
CREATE POLICY "Users can insert own profile"
  ON public.profiles FOR INSERT
  TO authenticated
  WITH CHECK (auth.uid() = id);

-- Allow users to update their own profile
CREATE POLICY "Users can update own profile"
  ON public.profiles FOR UPDATE
  TO authenticated
  USING (auth.uid() = id)
  WITH CHECK (auth.uid() = id);

-- Allow service role full access (for triggers)
CREATE POLICY "Service role full access"
  ON public.profiles FOR ALL
  TO service_role
  USING (true)
  WITH CHECK (true);

-- Step 6: Create function to handle new user registration
-- This function will be called by a trigger when a user signs up
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS trigger
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  display_name_value text;
BEGIN
  -- Get display name from metadata, email, or use default
  display_name_value := COALESCE(
    NEW.raw_user_meta_data->>'display_name',
    NEW.raw_user_meta_data->>'full_name',
    split_part(NEW.email, '@', 1),
    'User'
  );

  -- Insert the profile
  INSERT INTO public.profiles (
    id,
    display_name,
    role,
    created_at,
    updated_at
  )
  VALUES (
    NEW.id,
    display_name_value,
    'member',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    updated_at = NOW(),
    display_name = COALESCE(public.profiles.display_name, display_name_value);

  RETURN NEW;
EXCEPTION
  WHEN OTHERS THEN
    -- Log the error but don't fail the signup
    RAISE WARNING 'Failed to auto-create profile for user %: % %', NEW.id, SQLERRM, SQLSTATE;
    RETURN NEW;
END;
$$;

-- Step 7: Grant execute permission on function
GRANT EXECUTE ON FUNCTION public.handle_new_user() TO service_role, postgres;

-- Step 8: Create the trigger on auth.users table
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW
  EXECUTE FUNCTION public.handle_new_user();

-- Step 9: Create function for manual profile creation (fallback)
-- This can be called from the application if the trigger fails
CREATE OR REPLACE FUNCTION public.create_profile_for_user(
  user_id uuid,
  user_display_name text DEFAULT NULL
)
RETURNS public.profiles
SECURITY DEFINER
SET search_path = public
LANGUAGE plpgsql
AS $$
DECLARE
  new_profile public.profiles;
  final_display_name text;
BEGIN
  -- Get user info if display name not provided
  IF user_display_name IS NULL THEN
    SELECT COALESCE(
      raw_user_meta_data->>'display_name',
      split_part(email, '@', 1),
      'User'
    ) INTO final_display_name
    FROM auth.users
    WHERE id = user_id;
  ELSE
    final_display_name := user_display_name;
  END IF;

  -- Insert or update the profile
  INSERT INTO public.profiles (
    id,
    display_name,
    role,
    created_at,
    updated_at
  )
  VALUES (
    user_id,
    final_display_name,
    'member',
    NOW(),
    NOW()
  )
  ON CONFLICT (id) DO UPDATE SET
    updated_at = NOW(),
    display_name = COALESCE(public.profiles.display_name, final_display_name)
  RETURNING * INTO new_profile;

  RETURN new_profile;
END;
$$;

-- Grant execute on the manual profile creation function
GRANT EXECUTE ON FUNCTION public.create_profile_for_user(uuid, text) TO authenticated, service_role;

-- Step 10: Backfill profiles for any existing users without one
INSERT INTO public.profiles (id, display_name, role, created_at, updated_at)
SELECT
  u.id,
  COALESCE(
    u.raw_user_meta_data->>'display_name',
    u.raw_user_meta_data->>'full_name',
    split_part(u.email, '@', 1),
    'User'
  ) as display_name,
  'member' as role,
  u.created_at,
  NOW() as updated_at
FROM auth.users u
LEFT JOIN public.profiles p ON p.id = u.id
WHERE p.id IS NULL
ON CONFLICT (id) DO NOTHING;

-- Step 11: Add helpful comments
COMMENT ON FUNCTION public.handle_new_user() IS
  'Automatically creates a profile entry when a new user signs up via trigger';
COMMENT ON FUNCTION public.create_profile_for_user(uuid, text) IS
  'Manually creates a profile for a user. Can be called as fallback if trigger fails.';

-- Verification
DO $$
DECLARE
  profile_count integer;
  user_count integer;
BEGIN
  SELECT COUNT(*) INTO profile_count FROM public.profiles;
  SELECT COUNT(*) INTO user_count FROM auth.users;

  RAISE NOTICE 'Migration completed successfully!';
  RAISE NOTICE 'Total profiles: %, Total users: %', profile_count, user_count;

  IF profile_count < user_count THEN
    RAISE WARNING 'Some users are missing profiles. Check RLS policies and permissions.';
  END IF;
END $$;
