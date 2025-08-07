-- Create the properties table
CREATE TABLE IF NOT EXISTS properties (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT UNIQUE NOT NULL,
  matterport_tour_id TEXT,
  address TEXT NOT NULL,
  estimated_price DECIMAL(12,2),
  low_price DECIMAL(12,2),
  high_price DECIMAL(12,2),
  last_sale_price DECIMAL(12,2),
  property_valuation DECIMAL(12,2),
  total_area DECIMAL(10,2),
  floor_area INTEGER,
  land_area INTEGER,
  bed_area DECIMAL(10,2),
  master_bed_area DECIMAL(10,2),
  bath_area DECIMAL(10,2),
  bedrooms INTEGER,
  bathrooms INTEGER,
  car_spaces INTEGER,
  build_year TEXT,
  property_type TEXT,
  views INTEGER,
  avg_daily_views DECIMAL(10,2),
  avg_session_time DECIMAL(10,2),
  engaged_inspections INTEGER,
  engaged_visitors INTEGER,
  panorama_count INTEGER,
  ceiling_height DECIMAL(10,2),
  floors INTEGER,
  hallway_avg_width DECIMAL(10,2),
  hardwood_area DECIMAL(10,2),
  tile_area DECIMAL(10,2),
  carpet_area DECIMAL(10,2),
  air_conditioning_count INTEGER,
  air_conditioning_type TEXT,
  smoke_alarm_count INTEGER DEFAULT 5,
  ceiling_light_count INTEGER,
  door_count INTEGER,
  fireplace TEXT,
  primary_ceiling_type TEXT,
  primary_wall_type TEXT,
  primary_flooring_type TEXT,
  primary_internal_color TEXT,
  damage_walls TEXT DEFAULT 'No',
  damage_floor TEXT DEFAULT 'No',
  damage_ceiling TEXT DEFAULT 'No',
  damage_known TEXT DEFAULT 'No',
  overall_condition TEXT DEFAULT 'Property shows no notable visible damage on any surface',
  street_no TEXT,
  street_name TEXT,
  street_type TEXT,
  locality TEXT,
  state TEXT,
  postcode TEXT DEFAULT '4064',
  latitude DECIMAL(10,6),
  longitude DECIMAL(10,6),
  gnaf_id TEXT,
  meshblock TEXT,
  meshblock_2016 TEXT,
  sa1_id BIGINT,
  sa2_id BIGINT,
  climate_zone TEXT DEFAULT 'Zone 2',
  upload_time TIMESTAMP WITH TIME ZONE,
  scanned_date TIMESTAMP WITH TIME ZONE,
  scan_purpose TEXT DEFAULT 'Residential',
  rescan_or_original TEXT,
  multiple_scans TEXT,
  unique_features TEXT,
  property_description TEXT,
  roof_material TEXT,
  little_hinges_build_valuation TEXT,
  panorama_ids TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the rooms table
CREATE TABLE IF NOT EXISTS rooms (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT REFERENCES properties(property_id),
  room_id TEXT NOT NULL,
  room_number TEXT,
  room_type TEXT,
  area DECIMAL(10,2),
  volume DECIMAL(10,2),
  height DECIMAL(10,2),
  width DECIMAL(10,2),
  depth DECIMAL(10,2),
  panorama_count INTEGER,
  panorama_ids TEXT[],
  panorama_links TEXT[],
  flooring TEXT,
  wall_material TEXT,
  ceiling_type TEXT,
  windows INTEGER,
  window_cover TEXT,
  air_conditioning BOOLEAN,
  smoke_alarm BOOLEAN,
  ceiling_lights INTEGER,
  ceiling_fan BOOLEAN,
  floor_damage INTEGER DEFAULT 0,
  ceiling_damage INTEGER DEFAULT 0,
  wall_damage INTEGER DEFAULT 0,
  confident_point DECIMAL(10,2),
  drive_url TEXT,
  cover_image TEXT,
  gallery_images TEXT[],
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create the energy_efficiency table
CREATE TABLE IF NOT EXISTS energy_efficiency (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  property_id TEXT REFERENCES properties(property_id),
  section TEXT NOT NULL,
  name_label TEXT NOT NULL,
  result TEXT NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX IF NOT EXISTS idx_properties_property_id ON properties(property_id);
CREATE INDEX IF NOT EXISTS idx_rooms_property_id ON rooms(property_id);
CREATE INDEX IF NOT EXISTS idx_energy_efficiency_property_id ON energy_efficiency(property_id);

-- Enable Row Level Security
ALTER TABLE properties ENABLE ROW LEVEL SECURITY;
ALTER TABLE rooms ENABLE ROW LEVEL SECURITY;
ALTER TABLE energy_efficiency ENABLE ROW LEVEL SECURITY;

-- Create policies that allow all operations (adjust as needed for your security requirements)
CREATE POLICY "Allow all operations on properties" ON properties
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on rooms" ON rooms
  FOR ALL USING (true);

CREATE POLICY "Allow all operations on energy_efficiency" ON energy_efficiency
  FOR ALL USING (true);

-- Create a function to automatically update the updated_at column
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ language 'plpgsql';

-- Create triggers to automatically update the updated_at column
CREATE TRIGGER update_properties_updated_at
  BEFORE UPDATE ON properties
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_rooms_updated_at
  BEFORE UPDATE ON rooms
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_energy_efficiency_updated_at
  BEFORE UPDATE ON energy_efficiency
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();
