import { createClient } from '@supabase/supabase-js'

// Supabase configuration
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables. Please add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY to your environment variables.')
}

// Create Supabase client
export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database helper functions
export async function getPropertyData(propertyId: string) {
  const { data, error } = await supabase
    .from('properties')
    .select('*')
    .eq('property_id', propertyId)
    .single()

  if (error) {
    console.error('Error fetching property data:', error)
    return null
  }

  return data
}

export async function getRoomData(propertyId: string) {
  const { data, error } = await supabase
    .from('rooms')
    .select('*')
    .eq('property_id', propertyId)
    .order('room_number')

  if (error) {
    console.error('Error fetching room data:', error)
    return []
  }

  return data
}

export async function getEnergyEfficiencyData(propertyId: string) {
  const { data, error } = await supabase
    .from('energy_efficiency')
    .select('*')
    .eq('property_id', propertyId)
    .order('section')

  if (error) {
    console.error('Error fetching energy efficiency data:', error)
    return []
  }

  return data
}

export async function upsertPropertyData(propertyData: any) {
  const { data, error } = await supabase
    .from('properties')
    .upsert(propertyData, { onConflict: 'property_id' })

  if (error) {
    console.error('Error upserting property data:', error)
    return null
  }

  return data
}
