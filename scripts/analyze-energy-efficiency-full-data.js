// Analyze the full energy efficiency data structure
async function analyzeEnergyEfficiencyData() {
  try {
    const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Copy%20of%20Energy%20Effiency%20_%20Full%20Scope-8f3vurgkGCtOH4nlvirNFTyVenwjOs.csv')
    const csvText = await response.text()
    
    console.log('=== ENERGY EFFICIENCY FULL DATA ANALYSIS ===')
    console.log('Raw CSV length:', csvText.length)
    
    // Parse CSV
    const lines = csvText.split('\n').filter(line => line.trim() !== '')
    console.log('Total lines:', lines.length)
    
    if (lines.length > 0) {
      const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
      console.log('Headers:', headers)
      
      // Analyze all data rows
      const allData = []
      for (let i = 1; i < lines.length; i++) {
        const values = lines[i].split(',').map(v => v.trim().replace(/"/g, ''))
        if (values.length >= 3) {
          const dataPoint = {
            section: values[0] || '',
            nameLabel: values[1] || '',
            result: values[2] || ''
          }
          allData.push(dataPoint)
        }
      }
      
      console.log('Total data points:', allData.length)
      
      // Group by section
      const sections = {}
      allData.forEach(item => {
        if (!sections[item.section]) {
          sections[item.section] = []
        }
        sections[item.section].push(item)
      })
      
      console.log('\n=== SECTIONS BREAKDOWN ===')
      Object.keys(sections).forEach(sectionKey => {
        console.log(`Section ${sectionKey}: ${sections[sectionKey].length} items`)
        sections[sectionKey].forEach(item => {
          console.log(`  - ${item.nameLabel}: ${item.result}`)
        })
        console.log('')
      })
      
      // Sample data structure
      console.log('\n=== SAMPLE DATA STRUCTURE ===')
      console.log(JSON.stringify(allData.slice(0, 5), null, 2))
      
    }
  } catch (error) {
    console.error('Error analyzing energy efficiency data:', error)
  }
}

// Run the analysis
analyzeEnergyEfficiencyData()
