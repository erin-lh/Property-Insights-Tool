// Analyze the property-level CSV data for 3 Bellavista Terrace
async function analyzePropertyData() {
  try {
    console.log("🏠 Fetching property-level CSV data...")

    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Schema-%20PTY%20%281%29-4NScT7lr3k2AU3VG3IsN5eJKJLOcPi.csv",
    )
    const csvText = await response.text()

    console.log("📊 Raw CSV Data:")
    console.log(csvText.substring(0, 500) + "...")

    // Parse CSV data
    const lines = csvText.split("\n").filter((line) => line.trim() !== "")
    const headers = lines[0].split(",").map((h) => h.trim())
    const values = lines[1].split(",").map((v) => v.trim())

    console.log("\n🔍 Property Data Analysis:")
    console.log("=".repeat(50))

    // Create data object
    const propertyData = {}
    headers.forEach((header, index) => {
      propertyData[header] = values[index] || ""
    })

    // Key property metrics
    console.log("\n📍 PROPERTY IDENTIFICATION:")
    console.log(`Property ID: ${propertyData["Property ID"]}`)
    console.log(`Tour ID: ${propertyData["Tour ID"]}`)
    console.log(`Full Address: ${propertyData["Full Address"]}`)
    console.log(`Property Type: ${propertyData["Property Type"]}`)

    console.log("\n📐 AREA & DIMENSIONS:")
    console.log(`Total Area: ${propertyData["Total Area"]} sqm`)
    console.log(`Floor Area: ${propertyData["Floor Area"]} sqm`)
    console.log(`Land Area: ${propertyData["Land Area"]} sqm`)
    console.log(`Bed Area: ${propertyData["Bed Area"]} sqm`)
    console.log(`Master Bed Area: ${propertyData["MasterBedArea_PTY_LH"]} sqm`)
    console.log(`Bath Area: ${propertyData["Bath Area"]} sqm`)
    console.log(`Ceiling Height: ${propertyData["Ceiling Height"]}m`)
    console.log(`Floors: ${propertyData["Floors"]}`)
    console.log(`Hallway Avg Width: ${propertyData["Hallway Avg Width"]}m`)

    console.log("\n🏠 PROPERTY FEATURES:")
    console.log(`Bedrooms: ${propertyData["Bed Count"]}`)
    console.log(`Bathrooms: ${propertyData["Bath Count"]}`)
    console.log(`Car Spaces: ${propertyData["Car Space Count"]}`)
    console.log(`Build Year: ${propertyData["Build Year"]}`)

    console.log("\n💰 VALUATION DATA:")
    console.log(`Property Valuation: $${Number.parseInt(propertyData["Property Valuation"]).toLocaleString()}`)
    console.log(`Estimate Price: $${Number.parseInt(propertyData["EstimatePrice_PTY_CL"]).toLocaleString()}`)
    console.log(`Low Price: $${Number.parseInt(propertyData["LowPrice_PTY_CL"]).toLocaleString()}`)
    console.log(`High Price: $${Number.parseInt(propertyData["HighPrice_PTY_CL"]).toLocaleString()}`)
    console.log(`Last Sale Price: $${Number.parseInt(propertyData["LastSalePrice_PTY_CL"]).toLocaleString()}`)

    console.log("\n🎥 VIRTUAL TOUR ANALYTICS:")
    console.log(`Total Views: ${propertyData["Virtual Tour Views Total"]}`)
    console.log(
      `Average Daily Views: ${Number.parseFloat(propertyData["Virtual Tour Views- Average Daily"]).toFixed(2)}`,
    )
    console.log(
      `Average Session Time: ${Number.parseFloat(propertyData["Virtual Tour- Average Session Time"]).toFixed(2)} seconds`,
    )
    console.log(`Engaged Inspections: ${propertyData["Virtual Tour- Engaged Inspections"]}`)
    console.log(`Engaged Visitors: ${propertyData["Virtual Tour- Engaged Visitor"]}`)
    console.log(`Panorama Count: ${propertyData["Panorama Count"]}`)

    console.log("\n🏗️ MATERIALS & FEATURES:")
    console.log(`Hardwood Area: ${Number.parseFloat(propertyData["Hardwood Total Sqm"]).toFixed(2)} sqm`)
    console.log(`Tile Area: ${Number.parseFloat(propertyData["TileTotalSqm_PTY_LH"]).toFixed(2)} sqm`)
    console.log(`Carpet Area: ${Number.parseFloat(propertyData["Carpet Total Sqm"]).toFixed(2)} sqm`)
    console.log(`Primary Ceiling Type: ${propertyData["Primary Ceiling Type"]}`)
    console.log(`Primary Wall Type: ${propertyData["Primary Wall Type"]}`)
    console.log(`Primary Flooring Type: ${propertyData["Primary Flooring Type"]}`)
    console.log(`Primary Internal Color: ${propertyData["Primary Internal Hex Code"]}`)

    console.log("\n🔧 FIXTURES & SYSTEMS:")
    console.log(`Door Count: ${propertyData["Door Count"]}`)
    console.log(`Ceiling Light Count: ${propertyData["Ceiling Light Count"]}`)
    console.log(`Air Conditioning Units: ${propertyData["Airconditioning Unit Count"]}`)
    console.log(`Air Conditioning Type: ${propertyData["Airconditioning Type"]}`)
    console.log(`Smoke Alarm Count: ${propertyData["Smoke Alarm Count"]}`)
    console.log(`Fireplace: ${propertyData["Fireplace"]}`)

    console.log("\n🔍 CONDITION ASSESSMENT:")
    console.log(`Wall Damage: ${propertyData["Wall Damage"]}`)
    console.log(`Floor Damage: ${propertyData["Floor Damage"]}`)
    console.log(`Ceiling Damage: ${propertyData["Damage_Ceiling_PTY_LH"]}`)
    console.log(`Any Known Damage: ${propertyData["Any Damage Known"]}`)

    console.log("\n📍 LOCATION DATA:")
    console.log(`Coordinates: ${propertyData["Latitude"]}, ${propertyData["Longtitude"]}`)
    console.log(`Locality: ${propertyData["Locality"]}`)
    console.log(`State: ${propertyData["State"]}`)
    console.log(`Postcode: ${propertyData["Postcode"]}`)
    console.log(`GNAF ID: ${propertyData["GNAF"]}`)
    console.log(`Meshblock: ${propertyData["Meshblock"]}`)

    console.log("\n📅 SCAN INFORMATION:")
    console.log(`Upload Time: ${propertyData["Upload Time"]}`)
    console.log(`Scanned Date: ${propertyData["Scanned Date"]}`)
    console.log(`Scan Purpose: ${propertyData["Scan Purpose"]}`)
    console.log(`Rescan or Original: ${propertyData["Rescan or Original"]}`)
    console.log(`Multiple Scans: ${propertyData["Multiple Scans"]}`)

    console.log("\n🏠 UNIQUE FEATURES:")
    console.log(propertyData["Unique Features"])

    console.log("\n📝 PROPERTY DESCRIPTION:")
    console.log(propertyData["Property Description"])

    console.log("\n✅ Property data analysis complete!")

    return propertyData
  } catch (error) {
    console.error("❌ Error analyzing property data:", error)
    throw error
  }
}

// Execute the analysis
analyzePropertyData()
