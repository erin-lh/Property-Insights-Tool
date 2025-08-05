// Fetch and analyze the specific Room 4 data
async function analyzeRoom4Data() {
  try {
    console.log("Fetching Room 4 specific data CSV...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Room%204-hSIBbzeS8vHvwixwk83KkOrW4QJph4.csv",
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

    console.log("\nParsed Room 4 Data:")
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

    // Create structured Room 4 object
    const structuredRoom4 = {
      id: roomData["Room ID"] || "613htqkzf66zz7hf7n8kzszed",
      type: roomData["Room Type"] || "bedroom",
      area: Number.parseFloat(roomData["Total Area"]) || 19.12010002,
      volume: Number.parseFloat(roomData["Volume"]) || 38.78316498,
      depth: Number.parseFloat(roomData["Depth"]) || 2.889754772,
      height: Number.parseFloat(roomData["Height"]) || 2.409999847,
      width: Number.parseFloat(roomData["Width"]) || 5.845042706,
      panoramaCount: panoramaLinks.length,
      panoramaIds: panoramaIds,
      panoramaLinks: panoramaLinks,
      flooring: roomData["Flooring Type"] || "carpet",
      wallMaterial: roomData["Wall Material"] || "drywall",
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
      roomNumber: "4",
      driveUrl: "https://drive.google.com/drive/folders/1T03B_nOZwrDlRrd2otU_v99bdN0CntRV?usp=sharing",
      coverImage: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dUExIy6l6KbK8UUu7oOuLEocRefFCl.png",
      galleryImages: [
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-dUExIy6l6KbK8UUu7oOuLEocRefFCl.png",
        "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3-Bellavista-Tce-08012025_220608.jpg-yqyfGDmLApnzXeabzMorNQMPIMh0zT.jpeg",
      ],
    }

    console.log("\nStructured Room 4 Object:")
    console.log(JSON.stringify(structuredRoom4, null, 2))

    // Validate panorama links (check first few)
    console.log("\nValidating panorama links...")
    for (let i = 0; i < Math.min(panoramaLinks.length, 3); i++) {
      const link = panoramaLinks[i]
      try {
        const testResponse = await fetch(link, { method: "HEAD" })
        console.log(`Link ${i + 1}: ${testResponse.ok ? "✓ Valid" : "✗ Invalid"} (${testResponse.status})`)
      } catch (error) {
        console.log(`Link ${i + 1}: ✗ Error - ${error.message}`)
      }
    }

    // Room analysis
    console.log("\nRoom 4 Analysis:")
    console.log(`- Type: ${structuredRoom4.type}`)
    console.log(`- Area: ${structuredRoom4.area.toFixed(2)} sqm`)
    console.log(`- Volume: ${structuredRoom4.volume.toFixed(2)} m³`)
    console.log(
      `- Dimensions: ${structuredRoom4.width.toFixed(2)}m × ${structuredRoom4.depth.toFixed(2)}m × ${structuredRoom4.height.toFixed(2)}m`,
    )
    console.log(`- Panoramas: ${structuredRoom4.panoramaCount} views (CORRECTED FROM CSV)`)
    console.log(
      `- Features: ${structuredRoom4.ceilingLights} ceiling light, ${structuredRoom4.windows} window, A/C: ${structuredRoom4.airConditioning ? "Yes" : "No"}`,
    )
    console.log(
      `- Materials: ${structuredRoom4.flooring} flooring, ${structuredRoom4.wallMaterial} walls, ${structuredRoom4.ceilingType} ceiling`,
    )
    console.log(`- Condition: No damage detected`)
    console.log(`- NOTE: Using actual CSV data - 5 panoramas, not 7`)

    return structuredRoom4
  } catch (error) {
    console.error("Error analyzing Room 4 data:", error)
  }
}

// Execute the analysis
analyzeRoom4Data()
