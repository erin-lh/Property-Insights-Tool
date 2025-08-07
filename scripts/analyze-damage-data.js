// Analyze the damage data CSV structure
async function analyzeDamageData() {
  try {
    const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Damage-7l8AKi1bTAjX7N0KAshuoxgJZnCA8I.csv')
    const csvText = await response.text()
    
    console.log('=== DAMAGE DATA ANALYSIS ===')
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
      
      // Damage assessment analysis
      console.log('\n=== DAMAGE ASSESSMENT DATA ===')
      console.log('Wall Damage:', dataMap['Wall Damage'])
      console.log('Floor Damage:', dataMap['Floor Damage'])
      console.log('Ceiling Damage:', dataMap['Damage_Ceiling_PTY_LH'])
      console.log('Any Known Damage:', dataMap['Any Damage Known'])
      
      // Verify exact values
      console.log('\n=== EXACT VALUES VERIFICATION ===')
      console.log('Wall Damage exact value:', JSON.stringify(dataMap['Wall Damage']))
      console.log('Floor Damage exact value:', JSON.stringify(dataMap['Floor Damage']))
      console.log('Ceiling Damage exact value:', JSON.stringify(dataMap['Damage_Ceiling_PTY_LH']))
      console.log('Any Known Damage exact value:', JSON.stringify(dataMap['Any Damage Known']))
      
      return dataMap
    }
  } catch (error) {
    console.error('Error analyzing damage data:', error)
  }
}

// Run the analysis
analyzeDamageData()
