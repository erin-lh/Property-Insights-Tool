// Analyze the updated property data from PTY (6) CSV
async function analyzeUpdatedPropertyData() {
  try {
    console.log('Fetching updated property data from PTY (6) CSV...')
    
    const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Schema-%20PTY%20%286%29-BoSsFFLIR36YaySJnWXKSFOO3TKjpG.csv')
    const csvText = await response.text()
    
    // Parse CSV
    const lines = csvText.split('\n').filter(line => line.trim() !== '')
    if (lines.length < 2) {
      throw new Error('Invalid CSV format')
    }
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const values = lines[1].split(',').map(v => v.trim().replace(/"/g, ''))
    
    // Create data map
    const dataMap = {}
    headers.forEach((header, index) => {
      dataMap[header] = values[index] || ''
    })
    
    console.log('\n=== UPDATED PROPERTY DATA ANALYSIS ===')
    console.log('Source: PTY (6) CSV')
    console.log('URL: https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Schema-%20PTY%20%286%29-BoSsFFLIR36YaySJnWXKSFOO3TKjpG.csv')
    
    // Key fields analysis
    console.log('\n=== PRIMARY MATERIALS (Key Focus) ===')
    console.log(`Primary Flooring Type: "${dataMap['Primary Flooring Type']}" (Should be "hardwood")`)
    console.log(`Primary Wall Type: "${dataMap['Primary Wall Type']}" (Should be "plaster")`)
    console.log(`Primary Ceiling Type: "${dataMap['Primary Ceiling Type']}" (Should be "flat")`)
    console.log(`Primary Internal Hex Code: "${dataMap['Primary Internal Hex Code']}" (Should be "#d2d0ca")`)
    
    console.log('\n=== BASIC PROPERTY INFO ===')
    console.log(`Property ID: ${dataMap['Property ID']}`)
    console.log(`Tour ID: ${dataMap['Tour ID']}`)
    console.log(`Full Address: ${dataMap['Full Address']}`)
    console.log(`Property Type: ${dataMap['Property Type']}`)
    console.log(`Scan Purpose: ${dataMap['Scan Purpose']}`)
    
    console.log('\n=== LOCATION DATA ===')
    console.log(`Street No.: ${dataMap['Street No.']}`)
    console.log(`Street Name: ${dataMap['Street Name']}`)
    console.log(`Street Type: ${dataMap['Street Type']}`)
    console.log(`Locality: ${dataMap['Locality']}`)
    console.log(`State: ${dataMap['State']}`)
    console.log(`Postcode: ${dataMap['Postcode']}`)
    console.log(`Climate Zone: ${dataMap['Climate Zone']}`)
    
    console.log('\n=== PROPERTY FEATURES ===')
    console.log(`Bed Count: ${dataMap['Bed Count']}`)
    console.log(`Bath Count: ${dataMap['Bath Count']}`)
    console.log(`Car Space Count: ${dataMap['Car Space Count']}`)
    console.log(`Floors: ${dataMap['Floors']}`)
    console.log(`Total Area: ${dataMap['Total Area']} sqm`)
    console.log(`Floor Area: ${dataMap['Floor Area']} sqm`)
    console.log(`Land Area: ${dataMap['Land Area']} sqm`)
    
    console.log('\n=== SYSTEMS & FEATURES ===')
    console.log(`Airconditioning Unit Count: ${dataMap['Airconditioning Unit Count']}`)
    console.log(`Airconditioning Type: ${dataMap['Airconditioning Type']}`)
    console.log(`Smoke Alarm Count: ${dataMap['Smoke Alarm Count']}`)
    console.log(`Ceiling Light Count: ${dataMap['Ceiling Light Count']}`)
    console.log(`Door Count: ${dataMap['Door Count']}`)
    console.log(`Fireplace: ${dataMap['Fireplace']}`)
    
    console.log('\n=== DAMAGE ASSESSMENT ===')
    console.log(`Wall Damage: ${dataMap['Wall Damage']}`)
    console.log(`Floor Damage: ${dataMap['Floor Damage']}`)
    console.log(`Ceiling Damage: ${dataMap['Damage_Ceiling_PTY_LH']}`)
    console.log(`Any Damage Known: ${dataMap['Any Damage Known']}`)
    
    console.log('\n=== MATERIAL AREAS ===')
    console.log(`Hardwood Total Sqm: ${dataMap['Hardwood Total Sqm']}`)
    console.log(`Tile Total Sqm: ${dataMap['TileTotalSqm_PTY_LH']}`)
    console.log(`Carpet Total Sqm: ${dataMap['Carpet Total Sqm']}`)
    
    console.log('\n=== VIRTUAL TOUR ANALYTICS ===')
    console.log(`Virtual Tour Views Total: ${dataMap['Virtual Tour Views Total']}`)
    console.log(`Virtual Tour Views- Average Daily: ${dataMap['Virtual Tour Views- Average Daily']}`)
    console.log(`Virtual Tour- Average Session Time: ${dataMap['Virtual Tour- Average Session Time']}`)
    console.log(`Virtual Tour- Engaged Inspections: ${dataMap['Virtual Tour- Engaged Inspections']}`)
    console.log(`Virtual Tour- Engaged Visitor: ${dataMap['Virtual Tour- Engaged Visitor']}`)
    console.log(`Panorama Count: ${dataMap['Panorama Count']}`)
    
    console.log('\n=== PRICING DATA ===')
    console.log(`Property Valuation: $${dataMap['Property Valuation']}`)
    console.log(`Estimate Price: $${dataMap['EstimatePrice_PTY_CL']}`)
    console.log(`Low Price: $${dataMap['LowPrice_PTY_CL']}`)
    console.log(`High Price: $${dataMap['HighPrice_PTY_CL']}`)
    console.log(`Last Sale Price: $${dataMap['LastSalePrice_PTY_CL']}`)
    
    console.log('\n=== SCAN INFORMATION ===')
    console.log(`Upload Time: ${dataMap['Upload Time']}`)
    console.log(`Scanned Date: ${dataMap['Scanned Date']}`)
    console.log(`Rescan or Original: ${dataMap['Rescan or Original']}`)
    console.log(`Multiple Scans: ${dataMap['Multiple Scans']}`)
    
    console.log('\n=== VALIDATION RESULTS ===')
    const validations = [
      {
        field: 'Primary Flooring Type',
        expected: 'hardwood',
        actual: dataMap['Primary Flooring Type'],
        valid: dataMap['Primary Flooring Type'] === 'hardwood'
      },
      {
        field: 'Primary Wall Type', 
        expected: 'plaster',
        actual: dataMap['Primary Wall Type'],
        valid: dataMap['Primary Wall Type'] === 'plaster'
      },
      {
        field: 'Primary Internal Hex Code',
        expected: '#d2d0ca',
        actual: dataMap['Primary Internal Hex Code'],
        valid: dataMap['Primary Internal Hex Code'] === '#d2d0ca'
      },
      {
        field: 'Climate Zone',
        expected: 'Zone 2',
        actual: dataMap['Climate Zone'],
        valid: dataMap['Climate Zone'] === 'Zone 2'
      },
      {
        field: 'Postcode',
        expected: '4064',
        actual: dataMap['Postcode'],
        valid: dataMap['Postcode'] === '4064'
      }
    ]
    
    validations.forEach(validation => {
      const status = validation.valid ? '✅ PASS' : '❌ FAIL'
      console.log(`${status} ${validation.field}: Expected "${validation.expected}", Got "${validation.actual}"`)
    })
    
    const allValid = validations.every(v => v.valid)
    console.log(`\n=== OVERALL VALIDATION: ${allValid ? '✅ ALL TESTS PASSED' : '❌ SOME TESTS FAILED'} ===`)
    
    // Panorama IDs analysis
    const panoramaIds = dataMap['Panorama IDs'] ? dataMap['Panorama IDs'].split(',') : []
    console.log(`\n=== PANORAMA DATA ===`)
    console.log(`Total Panorama IDs: ${panoramaIds.length}`)
    console.log(`First 5 Panorama IDs: ${panoramaIds.slice(0, 5).join(', ')}`)
    
    console.log('\n=== ANALYSIS COMPLETE ===')
    
  } catch (error) {
    console.error('Error analyzing updated property data:', error)
  }
}

// Execute the analysis
analyzeUpdatedPropertyData()
