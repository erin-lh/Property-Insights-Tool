-- Create the property_forms table
CREATE TABLE IF NOT EXISTS property_forms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT UNIQUE NOT NULL,
  user_notes TEXT DEFAULT '',
  inspection_date DATE,
  inspector_name TEXT DEFAULT '',
  priority_areas TEXT[] DEFAULT '{}',
  follow_up_required BOOLEAN DEFAULT false,
  estimated_repair_cost DECIMAL(10,2) DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create an index on property_id for faster lookups
CREATE INDEX IF NOT EXISTS idx_property_forms_property_id ON property_forms(property_id);

-- Enable Row Level Security
ALTER TABLE property_forms ENABLE ROW LEVEL SECURITY;

-- Create a policy that allows all operations (adjust as needed for your security requirements)
CREATE POLICY "Allow all operations on property_forms" ON property_forms
  FOR ALL USING (true);

-- Create a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create a trigger to automatically update the updated_at column
CREATE TRIGGER update_property_forms_updated_at
  BEFORE UPDATE ON property_forms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
