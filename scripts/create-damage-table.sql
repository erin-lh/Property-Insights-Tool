-- Create table for property damage assessments
CREATE TABLE IF NOT EXISTS property_damage (
  id SERIAL PRIMARY KEY,
  property_id VARCHAR(50) NOT NULL,
  wall_damage VARCHAR(10) NOT NULL DEFAULT 'No',
  floor_damage VARCHAR(10) NOT NULL DEFAULT 'No',
  ceiling_damage VARCHAR(10) NOT NULL DEFAULT 'No',
  any_known_damage VARCHAR(10) NOT NULL DEFAULT 'No',
  overall_condition TEXT NOT NULL DEFAULT 'Property shows no notable visible damage on any surface',
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert the current property damage data
INSERT INTO property_damage (
  property_id,
  wall_damage,
  floor_damage,
  ceiling_damage,
  any_known_damage,
  overall_condition
) VALUES (
  '25763',
  'No',
  'No', 
  'No',
  'No',
  'Property shows no notable visible damage on any surface'
) ON CONFLICT DO NOTHING;

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_property_damage_property_id ON property_damage(property_id);
