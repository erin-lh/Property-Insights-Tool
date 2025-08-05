// Fetch and analyze the Room 1 data with cleaner schema
async function analyzeRoom1Data() {
  try {
    console.log("Fetching Room 1 data CSV...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Room%201%20%281%29-arz0Z7rTMLAaJN1vJ7PQgBeGvkrEiM.csv",
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

    // Create structured room object
    const structuredRoom = {
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
      floorDamage: roomData["Floor Damange"] === "Yes" ? 1 : 0,
      ceilingDamage: roomData["Ceiling Damage"] === "Yes" ? 1 : 0,
      wallDamage: roomData["Wall Damage"] === "Yes" ? 1 : 0,
    }

    console.log("\nStructured Room Object:")
    console.log(JSON.stringify(structuredRoom, null, 2))

    return structuredRoom
  } catch (error) {
    console.error("Error analyzing room data:", error)
  }
}

// Execute the analysis
analyzeRoom1Data()
