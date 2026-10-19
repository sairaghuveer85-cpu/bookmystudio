/**
 * Supabase client environment configuration helpers.
 * Safely detects whether valid credentials have been configured.
 */

export const SUPABASE_URL = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
export const SUPABASE_ANON_KEY = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export function isSupabaseConfigured(): boolean {
  if (!SUPABASE_URL || !SUPABASE_ANON_KEY) return false;
  if (
    SUPABASE_URL.includes('your-project-id') ||
    SUPABASE_ANON_KEY.includes('your-anon-key')
  ) {
    return false;
  }
  return true;
}

