// Fetch and analyze the Room 2 data with complete schema
async function analyzeRoom2Data() {
  try {
    console.log("Fetching Room 2 data CSV...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Room%202-vZQ1Cz96EyNXxgcBzC3aRiK0cMBYau.csv",
    )
    const csvText = await response.text()

    console.log("Raw CSV content:")
    console.log(csvText)

    // Parse CSV
    const lines = csvText.split("\n").filter((line) => line.trim() !== "")
    const headers = lines[0].split(",").map((h) => h.trim())
    const data = lines[1] ? lines[1].split(",").map((d) => d.trim()) : []

    console.log("\nHeaders found:")
    headers.forEach((header, index) => {
      console.log(`${index}: "${header}"`)
    })

    console.log("\nData values:")
    data.forEach((value, index) => {
      if (headers[index]) {
        console.log(`"${headers[index]}": "${value}"`)
      }
    })

    // Create room object with cleaner mapping
    const roomData = {}
    headers.forEach((header, index) => {
      const value = data[index] || ""
      roomData[header] = value
    })

    console.log("\nParsed Room Data:")
    console.log(JSON.stringify(roomData, null, 2))

    // Extract and validate panorama links
    const panoramaLinks = roomData["Panorama Links"]
      ? roomData["Panorama Links"]
          .split(",")
          .map((link) => link.trim())
          .filter((link) => link !== "")
      : []

    console.log("\nPanorama Links:")
    panoramaLinks.forEach((link, index) => {
      console.log(`${index + 1}: ${link}`)
    })

    // Create structured room object for Room 2
    const structuredRoom2 = {
      id: roomData["Room ID"] || "",
      type: roomData["Room Type"] || "unknown",
      area: Number.parseFloat(roomData["Total Area"]) || 0,
      volume: Number.parseFloat(roomData["Volume"]) || 0,
      depth: Number.parseFloat(roomData["Depth"]) || 0,
      height: Number.parseFloat(roomData["Height"]) || 0,
      width: Number.parseFloat(roomData["Width"]) || 0,
      panoramaCount: panoramaLinks.length,
      panoramaIds: roomData["Panorama IDs"] ? roomData["Panorama IDs"].split(",").map((id) => id.trim()) : [],
      panoramaLinks: panoramaLinks,
      flooring: roomData["Flooring Type"] || "unknown",
      wallMaterial: roomData["Wall Material"] || "unknown",
      ceilingType: roomData["Ceiling Type"] || "unknown",
      windows: Number.parseInt(roomData["Window Count"]) || 0,
      windowCover: roomData["Window Cover"] || "Other",
      airConditioning: Number.parseInt(roomData["Airconditioning Count"]) > 0,
      smokeAlarm: Number.parseInt(roomData["Smoke Alarm Count"]) > 0,
      ceilingLights: Number.parseInt(roomData["Ceilight Light Count"]) || 0,
      ceilingFan: Number.parseInt(roomData["Ceiling Fan Count"]) > 0,
      floorDamage: Number.parseInt(roomData["Floor Damange"]) || 0, // Note: typo in original data
      ceilingDamage: Number.parseInt(roomData["Ceiling Damage"]) || 0,
      wallDamage: Number.parseInt(roomData["Wall Damage"]) || 0,
    }

    console.log("\nStructured Room 2 Object:")
    console.log(JSON.stringify(structuredRoom2, null, 2))

    // Validate panorama links
    console.log("\nValidating panorama links...")
    for (let i = 0; i < panoramaLinks.length; i++) {
      const link = panoramaLinks[i]
      try {
        const testResponse = await fetch(link, { method: "HEAD" })
        console.log(`Link ${i + 1}: ${testResponse.ok ? "✓ Valid" : "✗ Invalid"} (${testResponse.status})`)
      } catch (error) {
        console.log(`Link ${i + 1}: ✗ Error - ${error.message}`)
      }
    }

    return structuredRoom2
  } catch (error) {
    console.error("Error analyzing Room 2 data:", error)
  }
}

// Execute the analysis
analyzeRoom2Data()
