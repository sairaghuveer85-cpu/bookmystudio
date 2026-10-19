import { createBrowserClient } from '@supabase/ssr';
import type { SupabaseClient } from '@supabase/supabase-js';
import { SUPABASE_URL, SUPABASE_ANON_KEY, isSupabaseConfigured } from './config';

let browserClient: SupabaseClient | null = null;

export function createClient(): SupabaseClient {
  if (browserClient) return browserClient;

  // Use valid URL and Anon Key if configured, or safe dummy URL to avoid crashing client initialization
  const url = isSupabaseConfigured() ? SUPABASE_URL : 'https://placeholder.supabase.co';
  const key = isSupabaseConfigured() ? SUPABASE_ANON_KEY : 'placeholder-anon-key';

  browserClient = createBrowserClient(url, key);
  return browserClient;
}
