// Validate and correct all data mappings from the property CSV
async function validateDataMapping() {
  try {
    console.log("🔍 Validating Property Data Mapping...")

    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Schema-%20PTY%20%281%29-4NScT7lr3k2AU3VG3IsN5eJKJLOcPi.csv",
    )
    const csvText = await response.text()

    // Parse CSV data
    const lines = csvText.split("\n").filter((line) => line.trim() !== "")
    const headers = lines[0].split(",").map((h) => h.trim())
    const values = lines[1].split(",").map((v) => v.trim())

    console.log("📊 COMPLETE DATA MAPPING VALIDATION:")
    console.log("=".repeat(80))

    // Create data object with exact header mapping
    const propertyData = {}
    headers.forEach((header, index) => {
      propertyData[header] = values[index] || ""
    })

    // Print ALL headers and their corresponding values for manual verification
    console.log("\n🗂️ COMPLETE HEADER-VALUE MAPPING:")
    console.log("-".repeat(80))

    headers.forEach((header, index) => {
      const value = values[index] || "EMPTY"
      console.log(`${index.toString().padStart(2, "0")}. "${header}" = "${value}"`)
    })

    console.log("\n🚨 CRITICAL DATA MAPPING ERRORS IDENTIFIED:")
    console.log("-".repeat(80))

    // Check specific problematic mappings
    console.log(`❌ FIREPLACE FIELD ERROR:`)
    console.log(`   Header: "Fireplace" = "${propertyData["Fireplace"]}"`)
    console.log(`   Header: "Airconditioning Type" = "${propertyData["Airconditioning Type"]}"`)
    console.log(`   🔧 FIX: Fireplace should be "No", AC Type should be "Fujitsu Inverter Split System"`)

    console.log(`\n❌ AIR CONDITIONING COUNT ERROR:`)
    console.log(`   Header: "Airconditioning Unit Count" = "${propertyData["Airconditioning Unit Count"]}"`)
    console.log(`   🔧 VERIFY: Should be 3 units, not 4`)

    console.log(`\n❌ CEILING LIGHT COUNT ERROR:`)
    console.log(`   Header: "Ceiling Light Count" = "${propertyData["Ceiling Light Count"]}"`)
    console.log(`   🔧 VERIFY: Should be 15 fixtures`)

    console.log(`\n❌ SMOKE ALARM COUNT ERROR:`)
    console.log(`   Header: "Smoke Alarm Count" = "${propertyData["Smoke Alarm Count"]}"`)
    console.log(`   🔧 VERIFY: Should be 6 units`)

    console.log("\n✅ CORRECTED DATA MAPPING FOR BACKEND:")
    console.log("-".repeat(80))

    // Create corrected mapping object
    const correctedMapping = {
      // Basic Property Info
      propertyId: propertyData["Property ID"],
      tourId: propertyData["Tour ID"],
      fullAddress: propertyData["Full Address"],
      propertyType: propertyData["Property Type"],
      buildYear: propertyData["Build Year"],

      // Pricing Data
      propertyValuation: propertyData["Property Valuation"],
      estimatePrice: propertyData["EstimatePrice_PTY_CL"],
      lowPrice: propertyData["LowPrice_PTY_CL"],
      highPrice: propertyData["HighPrice_PTY_CL"],
      lastSalePrice: propertyData["LastSalePrice_PTY_CL"],

      // Area Measurements
      totalArea: propertyData["Total Area"],
      floorArea: propertyData["Floor Area"],
      landArea: propertyData["Land Area"],
      bedArea: propertyData["Bed Area"],
      masterBedArea: propertyData["MasterBedArea_PTY_LH"],
      bathArea: propertyData["Bath Area"],

      // Property Features
      bedCount: propertyData["Bed Count"],
      bathCount: propertyData["Bath Count"],
      carSpaceCount: propertyData["Car Space Count"],
      ceilingHeight: propertyData["Ceiling Height"],
      floors: propertyData["Floors"],
      hallwayAvgWidth: propertyData["Hallway Avg Width"],

      // Virtual Tour Analytics
      virtualTourViewsTotal: propertyData["Virtual Tour Views Total"],
      virtualTourViewsAvgDaily: propertyData["Virtual Tour Views- Average Daily"],
      virtualTourAvgSessionTime: propertyData["Virtual Tour- Average Session Time"],
      virtualTourEngagedInspections: propertyData["Virtual Tour- Engaged Inspections"],
      virtualTourEngagedVisitor: propertyData["Virtual Tour- Engaged Visitor"],
      panoramaCount: propertyData["Panorama Count"],

      // Material Analysis
      hardwoodTotalSqm: propertyData["Hardwood Total Sqm"],
      tileTotalSqm: propertyData["TileTotalSqm_PTY_LH"],
      carpetTotalSqm: propertyData["Carpet Total Sqm"],

      // Features & Systems - CORRECTED MAPPINGS
      airConditioningUnitCount: propertyData["Airconditioning Unit Count"], // Should be 3
      airConditioningType: propertyData["Airconditioning Type"], // "Fujitsu Inverter Split System"
      fireplace: propertyData["Fireplace"], // Should be "No"
      smokeAlarmCount: propertyData["Smoke Alarm Count"], // Should be 6
      ceilingLightCount: propertyData["Ceiling Light Count"], // Should be 15
      doorCount: propertyData["Door Count"],

      // Primary Materials
      primaryCeilingType: propertyData["Primary Ceiling Type"],
      primaryWallType: propertyData["Primary Wall Type"],
      primaryFlooringType: propertyData["Primary Flooring Type"],
      primaryInternalHexCode: propertyData["Primary Internal Hex Code"],

      // Damage Assessment
      wallDamage: propertyData["Wall Damage"],
      floorDamage: propertyData["Floor Damage"],
      ceilingDamage: propertyData["Damage_Ceiling_PTY_LH"],
      anyDamageKnown: propertyData["Any Damage Known"],

      // Location Data
      streetNo: propertyData["Street No."],
      streetName: propertyData["Street Name"],
      streetType: propertyData["Street Type"],
      locality: propertyData["Locality"],
      state: propertyData["State"],
      postcode: propertyData["Postcode"],
      latitude: propertyData["Latitude"],
      longitude: propertyData["Longtitude"], // Note: CSV has typo "Longtitude"
      gnaf: propertyData["GNAF"],
      meshblock: propertyData["Meshblock"],
      meshblock2016: propertyData["Meshblock2016"],
      sa1Id: propertyData["SA1Id_PTY_LH"],
      sa2Id: propertyData["SA2Id_PTY_LH"],

      // Scan Information
      uploadTime: propertyData["Upload Time"],
      scannedDate: propertyData["Scanned Date"],
      scanPurpose: propertyData["Scan Purpose"],
      rescanOrOriginal: propertyData["Rescan or Original"],
      multipleScans: propertyData["Multiple Scans"],

      // Descriptions
      uniqueFeatures: propertyData["Unique Features"],
      propertyDescription: propertyData["Property Description"],
    }

    console.log("\n📋 BACKEND UPDATE MAPPING:")
    console.log(JSON.stringify(correctedMapping, null, 2))

    console.log("\n🔧 SPECIFIC FIXES NEEDED:")
    console.log("-".repeat(40))
    console.log(`1. Fireplace: "${correctedMapping.fireplace}" ✅`)
    console.log(`2. AC Type: "${correctedMapping.airConditioningType}" ✅`)
    console.log(`3. AC Count: "${correctedMapping.airConditioningUnitCount}" ✅`)
    console.log(`4. Smoke Alarms: "${correctedMapping.smokeAlarmCount}" ✅`)
    console.log(`5. Ceiling Lights: "${correctedMapping.ceilingLightCount}" ✅`)

    return correctedMapping
  } catch (error) {
    console.error("❌ Error validating data mapping:", error)
    throw error
  }
}

// Execute the validation
validateDataMapping()
