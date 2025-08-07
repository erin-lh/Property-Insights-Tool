import { createClient } from '@supabase/supabase-js'

// Check if Supabase environment variables are available
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

let supabase: any = null

// Only create Supabase client if environment variables are available
if (supabaseUrl && supabaseAnonKey) {
  supabase = createClient(supabaseUrl, supabaseAnonKey)
}

// Mock client for when Supabase is not configured
const mockClient = {
  from: () => ({
    select: () => ({ data: null, error: null }),
    insert: () => ({ data: null, error: null }),
    upsert: () => ({ data: null, error: null }),
    eq: () => ({ data: null, error: null })
  })
}

// Use real client if available, otherwise use mock
const client = supabase || mockClient

export { client as supabase }
