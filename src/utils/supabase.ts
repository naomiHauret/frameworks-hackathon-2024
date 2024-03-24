import { createClient } from '@supabase/supabase-js'

export const clientSupabase = createClient(import.meta.env.PUBLIC_SUPABASE_API_URL, import.meta.env.PUBLIC_SUPABASE_PUBLISHABLE_KEY)