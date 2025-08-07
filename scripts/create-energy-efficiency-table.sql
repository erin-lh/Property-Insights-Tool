-- Create energy efficiency table for storing comprehensive energy data
CREATE TABLE IF NOT EXISTS energy_efficiency (
  id SERIAL PRIMARY KEY,
  property_id VARCHAR(50) NOT NULL,
  section VARCHAR(10) NOT NULL,
  name_label TEXT NOT NULL,
  result TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_energy_efficiency_property_id ON energy_efficiency(property_id);
CREATE INDEX IF NOT EXISTS idx_energy_efficiency_section ON energy_efficiency(section);
CREATE INDEX IF NOT EXISTS idx_energy_efficiency_result ON energy_efficiency(result);

-- Create composite index for common queries
CREATE INDEX IF NOT EXISTS idx_energy_efficiency_property_section ON energy_efficiency(property_id, section);

-- Add comments for documentation
COMMENT ON TABLE energy_efficiency IS 'Comprehensive energy efficiency data for properties';
COMMENT ON COLUMN energy_efficiency.property_id IS 'Reference to the property ID';
COMMENT ON COLUMN energy_efficiency.section IS 'Energy efficiency section number';
COMMENT ON COLUMN energy_efficiency.name_label IS 'Feature name or label';
COMMENT ON COLUMN energy_efficiency.result IS 'Assessment result for the feature';
