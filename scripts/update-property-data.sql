CREATE OR REPLACE FUNCTION update_property_data()
RETURNS void AS $$
BEGIN
  -- Update the property data with the corrected values
  UPDATE properties 
  SET 
    climate_zone = 'Zone 2',
    postcode = '4064',
    smoke_alarm_count = 5,
    scan_purpose = 'Residential'
  WHERE id = '25763';
  
  -- If no rows were affected, insert the data
  IF NOT FOUND THEN
    INSERT INTO properties (
      id, 
      climate_zone, 
      postcode, 
      smoke_alarm_count, 
      scan_purpose
    ) VALUES (
      '25763',
      'Zone 2', 
      '4064',
      5,
      'Residential'
    );
  END IF;
END;
$$ LANGUAGE plpgsql;

-- Execute the function
SELECT update_property_data();
