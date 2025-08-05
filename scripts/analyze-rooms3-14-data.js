// Fetch and analyze the Room 3-14 data with complete schema (14 rooms max)
async function analyzeRooms3to14Data() {
  try {
    console.log("Fetching Room 3-14 data CSV...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Room%203-14-0p8QhZtDG770aSuuPPKiLb3tnQHkqI.csv",
    )
    const csvText = await response.text()

    console.log("Raw CSV content (first 1000 chars):")
    console.log(csvText.substring(0, 1000) + "...")

    // Parse CSV - each column is a room, each row is a data field
    const lines = csvText.split("\n").filter((line) => line.trim() !== "")
    const headers = lines[0].split(",").map((h) => h.trim())

    console.log("\nHeaders (Room Numbers):")
    headers.forEach((header, index) => {
      console.log(`${index}: "${header}"`)
    })

    // Create room objects for each column (skip first column which is field names)
    // Only process rooms 3-14 (max 14 rooms total)
    const rooms = []

    for (let roomIndex = 1; roomIndex < headers.length && roomIndex <= 12; roomIndex++) {
      const roomNumber = headers[roomIndex]

      // Only process rooms 3-14
      const roomNum = Number.parseInt(roomNumber)
      if (roomNum < 3 || roomNum > 14) {
        console.log(`Skipping room ${roomNumber} (outside range 3-14)`)
        continue
      }

      const roomData = {}

      // Process each row (data field) for this room
      for (let rowIndex = 1; rowIndex < lines.length; rowIndex++) {
        const values = lines[rowIndex].split(",")
        const fieldName = values[0]?.trim()
        const fieldValue = values[roomIndex]?.trim() || ""

        if (fieldName) {
          roomData[fieldName] = fieldValue
        }
      }

      console.log(`\nRoom ${roomNumber} Data:`)
      console.log(JSON.stringify(roomData, null, 2))

      // Extract and validate panorama links
      const panoramaLinks = roomData["Panorama Links"]
        ? roomData["Panorama Links"]
            .split(",")
            .map((link) => link.trim())
            .filter((link) => link !== "")
        : []

      console.log(`\nRoom ${roomNumber} Panorama Links:`)
      panoramaLinks.forEach((link, index) => {
        console.log(`${index + 1}: ${link}`)
      })

      // Create structured room object
      const structuredRoom = {
        roomNumber: roomNumber,
        id: roomData["Room ID"] || `room_${roomNumber}_${Date.now()}`,
        type: roomData["Room Type"] || "unknown",
        area: Number.parseFloat(roomData["Total Area"]) || 0,
        volume: roomData["Volume"] && roomData["Volume"] !== "" ? Number.parseFloat(roomData["Volume"]) : undefined,
        depth: roomData["Depth"] && roomData["Depth"] !== "" ? Number.parseFloat(roomData["Depth"]) : undefined,
        height: roomData["Height"] && roomData["Height"] !== "" ? Number.parseFloat(roomData["Height"]) : undefined,
        width: roomData["Width"] && roomData["Width"] !== "" ? Number.parseFloat(roomData["Width"]) : undefined,
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
        floorDamage: Number.parseInt(roomData["Floor Damange"]) || 0,
        ceilingDamage: Number.parseInt(roomData["Ceiling Damage"]) || 0,
        wallDamage: Number.parseInt(roomData["Wall Damage"]) || 0,
      }

      rooms.push(structuredRoom)

      console.log(`\nStructured Room ${roomNumber} Object:`)
      console.log(JSON.stringify(structuredRoom, null, 2))
    }

    console.log(
      `\nTotal rooms processed: ${rooms.length} (Rooms 3-${Math.max(...rooms.map((r) => Number.parseInt(r.roomNumber)))})`,
    )

    // Summary statistics for rooms 3-14 only
    const roomTypes = {}
    let totalArea = 0
    let totalPanoramas = 0

    rooms.forEach((room) => {
      roomTypes[room.type] = (roomTypes[room.type] || 0) + 1
      totalArea += room.area
      totalPanoramas += room.panoramaCount
    })

    console.log("\nSummary Statistics (Rooms 3-14):")
    console.log("Room Types:", roomTypes)
    console.log("Total Area:", totalArea.toFixed(2), "sqm")
    console.log("Total Panoramas:", totalPanoramas)
    console.log("Average Area per Room:", (totalArea / rooms.length).toFixed(2), "sqm")

    // Validate room numbers are within 3-14 range
    const roomNumbers = rooms.map((r) => Number.parseInt(r.roomNumber)).sort((a, b) => a - b)
    console.log("\nRoom Numbers Found:", roomNumbers)
    console.log(
      "Valid Range (3-14):",
      roomNumbers.every((num) => num >= 3 && num <= 14),
    )

    return rooms
  } catch (error) {
    console.error("Error analyzing Room 3-14 data:", error)
    return []
  }
}

// Execute the analysis
analyzeRooms3to14Data()
