// Fetch and analyze the room data CSV
async function analyzeRoomData() {
  try {
    console.log("Fetching room data CSV...")
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Room%201-GTBKuyiQQRTa9JZ6TdFhoSa0gEuEmq.csv",
    )
    const csvText = await response.text()

    console.log("Raw CSV content:")
    console.log(csvText.substring(0, 500) + "...")

    // Parse CSV
    const lines = csvText.split("\n")
    const headers = lines[0].split(",")
    const data = lines[1] ? lines[1].split(",") : []

    console.log("\nHeaders found:")
    headers.forEach((header, index) => {
      console.log(`${index}: ${header.trim()}`)
    })

    console.log("\nData values:")
    data.forEach((value, index) => {
      if (headers[index]) {
        console.log(`${headers[index].trim()}: ${value.trim()}`)
      }
    })

    // Create room object
    const roomData = {}
    headers.forEach((header, index) => {
      const cleanHeader = header.trim()
      const value = data[index] ? data[index].trim() : ""
      roomData[cleanHeader] = value
    })

    console.log("\nParsed Room Data:")
    console.log(JSON.stringify(roomData, null, 2))

    // Extract panorama links
    const panoramaLinks = roomData["Room_1_PanoramaS3_Links_RM_MTP"]
      ? roomData["Room_1_PanoramaS3_Links_RM_MTP"].split(",")
      : []

    console.log("\nPanorama Links:")
    panoramaLinks.forEach((link, index) => {
      console.log(`${index + 1}: ${link.trim()}`)
    })
  } catch (error) {
    console.error("Error analyzing room data:", error)
  }
}

// Execute the analysis
analyzeRoomData()
