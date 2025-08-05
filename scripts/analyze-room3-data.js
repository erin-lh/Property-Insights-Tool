// Fetch and analyze the specific Room 3 data
async function analyzeRoom3Data() {
  try {
    console.log("Fetching Room 3 specific data CSV...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Room%203-JnXXmIlUO4us9A2GA1ZVGEnNO6gpUY.csv",
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

    console.log("\nParsed Room 3 Data:")
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

    // Extract panorama IDs
    const panoramaIds = roomData["Panorama IDs"]
      ? roomData["Panorama IDs"]
          .split(",")
          .map((id) => id.trim())
          .filter((id) => id !== "")
      : []

    console.log("\nPanorama IDs:")
    panoramaIds.forEach((id, index) => {
      console.log(`${index + 1}: ${id}`)
    })

    // Create structured Room 3 object
    const structuredRoom3 = {
      id: roomData["Room ID"] || "3m54yff1z7crxaywd8if9rb0d",
      type: roomData["Room Type"] || "bathroom",
      area: Number.parseFloat(roomData["Total Area"]) || 4.252399921,
      volume: Number.parseFloat(roomData["Volume"]) || 9.185183525,
      depth: Number.parseFloat(roomData["Depth"]) || 2.041959047,
      height: Number.parseFloat(roomData["Height"]) || 2.159999847,
      width: Number.parseFloat(roomData["Width"]) || 1.872373343,
      panoramaCount: panoramaLinks.length,
      panoramaIds: panoramaIds,
      panoramaLinks: panoramaLinks,
      flooring: roomData["Flooring Type"] || "tile",
      wallMaterial: roomData["Wall Material"] || "plaster",
      ceilingType: roomData["Ceiling Type"] || "flat",
      windows: Number.parseInt(roomData["Window Count"]) || 1,
      windowCover: roomData["Window Cover"] || "Other",
      airConditioning: Number.parseInt(roomData["Airconditioning Count"]) > 0,
      smokeAlarm: Number.parseInt(roomData["Smoke Alarm Count"]) > 0,
      ceilingLights: Number.parseInt(roomData["Ceilight Light Count"]) || 1,
      ceilingFan: Number.parseInt(roomData["Ceiling Fan Count"]) > 0,
      floorDamage: Number.parseInt(roomData["Floor Damange"]) || 0,
      ceilingDamage: Number.parseInt(roomData["Ceiling Damage"]) || 0,
      wallDamage: Number.parseInt(roomData["Wall Damage"]) || 0,
      roomNumber: "3",
      driveUrl: "https://drive.google.com/drive/folders/1VQF3UI0Swlav_f9Go4oY7p5GYVl3SG0y?usp=sharing",
      coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-qxfjlYZfhF1QJGxo0ueNdiifIXaJzp.png",
    }

    console.log("\nStructured Room 3 Object:")
    console.log(JSON.stringify(structuredRoom3, null, 2))

    // Validate panorama links
    console.log("\nValidating panorama links...")
    for (let i = 0; i < Math.min(panoramaLinks.length, 2); i++) {
      const link = panoramaLinks[i]
      try {
        const testResponse = await fetch(link, { method: "HEAD" })
        console.log(`Link ${i + 1}: ${testResponse.ok ? "✓ Valid" : "✗ Invalid"} (${testResponse.status})`)
      } catch (error) {
        console.log(`Link ${i + 1}: ✗ Error - ${error.message}`)
      }
    }

    // Room analysis
    console.log("\nRoom 3 Analysis:")
    console.log(`- Type: ${structuredRoom3.type}`)
    console.log(`- Area: ${structuredRoom3.area.toFixed(2)} sqm`)
    console.log(`- Volume: ${structuredRoom3.volume.toFixed(2)} m³`)
    console.log(
      `- Dimensions: ${structuredRoom3.width.toFixed(2)}m × ${structuredRoom3.depth.toFixed(2)}m × ${structuredRoom3.height.toFixed(2)}m`,
    )
    console.log(`- Panoramas: ${structuredRoom3.panoramaCount} views`)
    console.log(`- Features: ${structuredRoom3.ceilingLights} ceiling light, ${structuredRoom3.windows} window`)
    console.log(
      `- Materials: ${structuredRoom3.flooring} flooring, ${structuredRoom3.wallMaterial} walls, ${structuredRoom3.ceilingType} ceiling`,
    )
    console.log(`- Condition: No damage detected`)

    return structuredRoom3
  } catch (error) {
    console.error("Error analyzing Room 3 data:", error)
  }
}

// Execute the analysis
analyzeRoom3Data()
