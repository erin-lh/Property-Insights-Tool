// Analyze the new property data CSV structure
async function analyzeNewPropertyData() {
  try {
    const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Schema-%20PTY%20%285%29-P86fCboHHvE5XzVvGsWhEF9NhLYueM.csv')
    const csvText = await response.text()
    
    console.log('=== NEW PROPERTY DATA ANALYSIS ===')
    console.log('Raw CSV length:', csvText.length)
    
    // Parse CSV
    const lines = csvText.split('\n').filter(line => line.trim() !== '')
    console.log('Total lines:', lines.length)
    
    if (lines.length >= 2) {
      // Parse headers and values
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
      const values = lines[1].split(',').map(v => v.trim().replace(/"/g, ''))
      
      console.log('\n=== HEADERS AND VALUES ===')
      console.log('Total fields:', headers.length)
      
      // Create data mapping
      const dataMap = {}
      headers.forEach((header, index) => {
        dataMap[header] = values[index] || ''
      })
      
      // Key fields analysis
      console.log('\n=== KEY PROPERTY DATA ===')
      console.log('Property ID:', dataMap['Property ID'])
      console.log('Address:', dataMap['Full Address'])
      console.log('Property Type:', dataMap['Property Type'])
      console.log('Total Area:', dataMap['Total Area'])
      console.log('Floor Area:', dataMap['Floor Area'])
      console.log('Bedrooms:', dataMap['Bed Count'])
      console.log('Bathrooms:', dataMap['Bath Count'])
      console.log('Air Conditioning Units:', dataMap['Airconditioning Unit Count'])
      console.log('Smoke Alarms:', dataMap['Smoke Alarm Count'])
      console.log('Ceiling Lights:', dataMap['Ceiling Light Count'])
      console.log('Door Count:', dataMap['Door Count'])
      
      // Pricing data
      console.log('\n=== PRICING DATA ===')
      console.log('Property Valuation:', dataMap['Property Valuation'])
      console.log('Estimated Price:', dataMap['EstimatePrice_PTY_CL'])
      console.log('Low Price:', dataMap['LowPrice_PTY_CL'])
      console.log('High Price:', dataMap['HighPrice_PTY_CL'])
      console.log('Last Sale Price:', dataMap['LastSalePrice_PTY_CL'])
      
      // Material data
      console.log('\n=== MATERIAL DATA ===')
      console.log('Hardwood Area:', dataMap['Hardwood Total Sqm'])
      console.log('Tile Area:', dataMap['TileTotalSqm_PTY_LH'])
      console.log('Carpet Area:', dataMap['Carpet Total Sqm'])
      console.log('Primary Flooring:', dataMap['Primary Flooring Type'])
      console.log('Primary Wall Type:', dataMap['Primary Wall Type'])
      console.log('Primary Ceiling Type:', dataMap['Primary Ceiling Type'])
      
      // Damage assessment
      console.log('\n=== DAMAGE ASSESSMENT ===')
      console.log('Wall Damage:', dataMap['Wall Damage'])
      console.log('Floor Damage:', dataMap['Floor Damage'])
      console.log('Ceiling Damage:', dataMap['Damage_Ceiling_PTY_LH'])
      console.log('Any Known Damage:', dataMap['Any Damage Known'])
      
      // Virtual tour data
      console.log('\n=== VIRTUAL TOUR DATA ===')
      console.log('Total Views:', dataMap['Virtual Tour Views Total'])
      console.log('Average Daily Views:', dataMap['Virtual Tour Views- Average Daily'])
      console.log('Average Session Time:', dataMap['Virtual Tour- Average Session Time'])
      console.log('Engaged Inspections:', dataMap['Virtual Tour- Engaged Inspections'])
      console.log('Panorama Count:', dataMap['Panorama Count'])
      
      // Location data
      console.log('\n=== LOCATION DATA ===')
      console.log('Latitude:', dataMap['Latitude'])
      console.log('Longitude:', dataMap['Longtitude'])
      console.log('Climate Zone:', dataMap['Climate Zone'])
      console.log('Meshblock:', dataMap['Meshblock'])
      
      // Unique features
      console.log('\n=== UNIQUE FEATURES ===')
      console.log('Features:', dataMap['Unique Features'])
      console.log('Description:', dataMap['Property Description'])
      
      return dataMap
    }
  } catch (error) {
    console.error('Error analyzing new property data:', error)
  }
}

// Run the analysis
analyzeNewPropertyData()
