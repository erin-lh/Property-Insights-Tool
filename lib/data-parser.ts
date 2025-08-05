export interface PropertyData {
  // Property Level Data
  id: string
  matterportTourId: string
  address: string
  estimatedPrice: number
  lowPrice: number
  highPrice: number
  lastSalePrice: number
  propertyValuation: number
  totalArea: number
  floorArea: number
  landArea: number
  bedArea: number
  masterBedArea: number
  bathArea: number
  bedrooms: number
  bathrooms: number
  carSpaces: number
  buildYear: string
  propertyType: string
  views: number
  avgDailyViews: number
  avgSessionTime: number
  engagedInspections: number
  engagedVisitors: number
  panoramaCount: number
  ceilingHeight: number
  floors: number
  hallwayAvgWidth: number

  // Room Data
  rooms: RoomData[]

  // Material Analysis
  hardwoodArea: number
  tileArea: number
  carpetArea: number

  // Features & Systems
  airConditioningCount: number
  airConditioningType: string
  smokeAlarmCount: number
  ceilingLightCount: number
  doorCount: number
  fireplace: string

  // Primary Materials
  primaryCeilingType: string
  primaryWallType: string
  primaryFlooringType: string
  primaryInternalColor: string

  // Damage Assessment
  damageWalls: string
  damageFloor: string
  damageCeiling: string
  damageKnown: string

  // Location Data
  streetNo: string
  streetName: string
  streetType: string
  locality: string
  state: string
  postcode: string
  latitude: number
  longitude: number
  gnafId: string
  meshblock: string
  meshblock2016: string
  sa1Id: number
  sa2Id: number

  // Scan Information
  uploadTime: string
  scannedDate: string
  scanPurpose: string
  rescanOrOriginal: string
  multipleScans: string

  // Descriptions
  uniqueFeatures: string
  propertyDescription: string
}

export interface RoomData {
  id: string
  type: string
  area: number
  volume?: number
  height?: number
  width?: number
  depth?: number
  panoramaCount: number
  panoramaIds: string[]
  panoramaLinks: string[]
  flooring: string
  wallMaterial: string
  ceilingType: string
  windows: number
  windowCover: string
  airConditioning: boolean
  smokeAlarm: boolean
  ceilingLights: number
  ceilingFan: boolean
  floorDamage: number
  ceilingDamage: number
  wallDamage: number
  confidentPoint?: number
  roomNumber?: string
  driveUrl?: string
  coverImage?: string
  galleryImages?: string[]
}

// Google Drive folder URLs for rooms 1-4
const ROOM_DRIVE_URLS: Record<string, string> = {
  "1": "https://drive.google.com/drive/folders/1ShnpOaDEvA1sAotLzd_lxgZhcSwzK2NX?usp=sharing",
  "2": "https://drive.google.com/drive/folders/1UXZm_JE71KR36-XGZXX778SsrcwOC6II?usp=drive_link",
  "3": "https://drive.google.com/drive/folders/1VQF3UI0Swlav_f9Go4oY7p5GYVl3SG0y?usp=sharing",
  "4": "https://drive.google.com/drive/folders/1T03B_nOZwrDlRrd2otU_v99bdN0CntRV?usp=drive_link",
}

// Sample Room 1 data based on the CSV analysis
const sampleRoom1: RoomData = {
  id: "19ab05tns5h6y4qm42esqqpea",
  type: "hallway",
  area: 2.47,
  volume: 5.98,
  depth: 2.23,
  height: 2.42,
  width: 0.88,
  panoramaCount: 2,
  panoramaIds: ["9atk8hw6bpr2kixswfbit6kya", "71mwb6u62ih98rhx2bwyc8b8b"],
  panoramaLinks: [
    "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_9atk8hw6bpr2kixswfbit6kya_skybox.jpg",
    "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_19ab05tns5h6y4qm42esqqpea_71mwb6u62ih98rhx2bwyc8b8b_skybox.jpg",
  ],
  flooring: "carpet",
  wallMaterial: "drywall",
  ceilingType: "flat",
  windows: 0,
  windowCover: "Other",
  airConditioning: false,
  smokeAlarm: false,
  ceilingLights: 0,
  ceilingFan: false,
  floorDamage: 0,
  ceilingDamage: 0,
  wallDamage: 0,
  roomNumber: "1",
  driveUrl: ROOM_DRIVE_URLS["1"],
}

// Sample Room 2 data based on the CSV analysis
const sampleRoom2: RoomData = {
  id: "2qdmc5i9byxi79ry1pxdkqzea",
  type: "patio",
  area: 5.01,
  volume: 13.61,
  depth: 2.17,
  height: 2.72,
  width: 1.58,
  panoramaCount: 4,
  panoramaIds: [
    "zibi0h0ges2t5dxryrb7800wd",
    "cct379k0f1t6gnmuutm23i4ac",
    "mw5ymdiqgmkaiasgdiksy3i5a",
    "pxk5thts3iiwc5azq4drsitfc",
  ],
  panoramaLinks: [
    "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_zibi0h0ges2t5dxryrb7800wd_skybox.jpg",
    "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_cct379k0f1t6gnmuutm23i4ac_skybox.jpg",
    "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_mw5ymdiqgmkaiasgdiksy3i5a_skybox.jpg",
    "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_2qdmc5i9byxi79ry1pxdkqzea_pxk5thts3iiwc5azq4drsitfc_skybox.jpg",
  ],
  flooring: "tile",
  wallMaterial: "concrete",
  ceilingType: "metal",
  windows: 1,
  windowCover: "Other",
  airConditioning: false,
  smokeAlarm: false,
  ceilingLights: 1,
  ceilingFan: false,
  floorDamage: 0,
  ceilingDamage: 0,
  wallDamage: 0,
  roomNumber: "2",
  driveUrl: ROOM_DRIVE_URLS["2"],
}

// Real Room 3 data from the specific CSV
const realRoom3: RoomData = {
  id: "3m54yff1z7crxaywd8if9rb0d",
  type: "bathroom",
  area: 4.252399921,
  volume: 9.185183525,
  depth: 2.041959047,
  height: 2.159999847,
  width: 1.872373343,
  panoramaCount: 4,
  panoramaIds: [
    "mu9uxdez3ha971p08w8nqkn3a",
    "m4rcxhtirqgqh9enyg9zy5pyd",
    "xx97uf4cdb80cba9uy8u539rd",
    "983x6xg3ixwh2n54sdw8k76ad",
  ],
  panoramaLinks: [
    "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_mu9uxdez3ha971p08w8nqkn3a_skybox.jpg",
    "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_m4rcxhtirqgqh9enyg9zy5pyd_skybox.jpg",
    "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_xx97uf4cdb80cba9uy8u539rd_skybox.jpg",
    "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_3m54yff1z7crxaywd8if9rb0d_983x6xg3ixwh2n54sdw8k76ad_skybox.jpg",
  ],
  flooring: "tile",
  wallMaterial: "plaster",
  ceilingType: "flat",
  windows: 1,
  windowCover: "Other",
  airConditioning: false,
  smokeAlarm: false,
  ceilingLights: 1,
  ceilingFan: false,
  floorDamage: 0,
  ceilingDamage: 0,
  wallDamage: 0,
  roomNumber: "3",
  driveUrl: ROOM_DRIVE_URLS["3"],
  coverImage: "/images/room3-bathroom.png",
}

// Real Room 4 data from the specific CSV
const realRoom4: RoomData = {
  id: "613htqkzf66zz7hf7n8kzszed",
  type: "bedroom",
  area: 19.12010002,
  volume: 38.78316498,
  depth: 2.889754772,
  height: 2.409999847,
  width: 5.845042706,
  panoramaCount: 5,
  panoramaIds: [
    "3ax98exw84easbammy1kdy59a",
    "q30i0t1qaqnm9w9ahabpw94qd",
    "bcmacw08fqdi7acr9x6shfi4b",
    "n62yt7zbfe8gbthibrauparaa",
    "yq3ye9yehkru7142z65q2acwa",
  ],
  panoramaLinks: [
    "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_3ax98exw84easbammy1kdy59a_skybox.jpg",
    "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_q30i0t1qaqnm9w9ahabpw94qd_skybox.jpg",
    "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_bcmacw08fqdi7acr9x6shfi4b_skybox.jpg",
    "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_n62yt7zbfe8gbthibrauparaa_skybox.jpg",
    "https://s3.ap-southeast-2.amazonaws.com/platform.tourassets.bucket/tour_25763/panoramas/tsmq1wak12rhgn0mawksxcwcd_tsmq1wak12rhgn0mawksxcwcd_613htqkzf66zz7hf7n8kzszed_yq3ye9yehkru7142z65q2acwa_skybox.jpg",
  ],
  flooring: "carpet",
  wallMaterial: "drywall",
  ceilingType: "flat",
  windows: 1,
  windowCover: "Other",
  airConditioning: true,
  smokeAlarm: false,
  ceilingLights: 1,
  ceilingFan: false,
  floorDamage: 0,
  ceilingDamage: 0,
  wallDamage: 0,
  roomNumber: "4",
  driveUrl: ROOM_DRIVE_URLS["4"],
  coverImage: "/images/room4-bedroom-1.png",
  galleryImages: ["/images/room4-bedroom-1.png", "/images/room4-bedroom-2.jpeg"],
}

// Update the parseCSVDataWithAllRooms function with EXACT data from your provided JSON
export async function parseCSVDataWithAllRooms(csvText: string): Promise<PropertyData> {
  // Fetch real room data from the API for rooms 5-14
  const additionalRooms: RoomData[] = []

  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Room%203-14-0p8QhZtDG770aSuuPPKiLb3tnQHkqI.csv",
    )
    const roomsCsvText = await response.text()

    // Parse CSV - each column is a room, each row is a data field
    const lines = roomsCsvText.split("\n").filter((line) => line.trim() !== "")
    const headers = lines[0].split(",").map((h) => h.trim())

    // Skip first column (field names) and process rooms 5-14
    for (let roomIndex = 1; roomIndex < headers.length && roomIndex <= 12; roomIndex++) {
      const roomNumber = headers[roomIndex]

      // Only process rooms 5-14
      const roomNum = Number.parseInt(roomNumber)
      if (roomNum < 5 || roomNum > 14) continue

      const roomData: Record<string, string> = {}

      // Process each row (data field) for this room
      for (let rowIndex = 1; rowIndex < lines.length; rowIndex++) {
        const values = lines[rowIndex].split(",")
        const fieldName = values[0]?.trim()
        const fieldValue = values[roomIndex]?.trim() || ""

        if (fieldName) {
          roomData[fieldName] = fieldValue
        }
      }

      // Extract and validate panorama links
      const panoramaLinks = roomData["Panorama Links"]
        ? roomData["Panorama Links"]
            .split(",")
            .map((link) => link.trim())
            .filter((link) => link !== "")
        : []

      // Create structured room object
      const structuredRoom: RoomData = {
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
        driveUrl: ROOM_DRIVE_URLS[roomNumber] || undefined,
      }

      additionalRooms.push(structuredRoom)
    }
  } catch (error) {
    console.error("Error fetching additional room data, using fallback:", error)
  }

  // Combine all rooms: Room 1, Room 2, Real Room 3, Real Room 4, and Rooms 5-14
  const allRooms: RoomData[] = [sampleRoom1, sampleRoom2, realRoom3, realRoom4, ...additionalRooms].slice(0, 14)

  // EXACT DATA FROM YOUR PROVIDED JSON - NO MODIFICATIONS
  return {
    // Basic Property Info - EXACT VALUES
    id: "25763",
    matterportTourId: "ZUCRWEgFkxk",
    address: "3 Bellavista Terrace, PADDINGTON QLD 4064",
    propertyType: "HOUSE",
    buildYear: "Unknown",

    // Pricing Data - EXACT VALUES
    estimatedPrice: 1340589,
    lowPrice: 1152907,
    highPrice: 1528271,
    lastSalePrice: 375000,
    propertyValuation: 470000,

    // Area Measurements - EXACT VALUES
    totalArea: 142.6283016,
    floorArea: 115,
    landArea: 255,
    bedArea: 17.66950035,
    masterBedArea: 9.166700363,
    bathArea: 13.32430005,

    // Property Features - EXACT VALUES
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    ceilingHeight: 2.415555451,
    floors: 2,
    hallwayAvgWidth: 3.278478702,

    // Virtual Tour Analytics - EXACT VALUES
    views: 55,
    avgDailyViews: 1.486486486,
    avgSessionTime: 132.8750731,
    engagedInspections: 51,
    engagedVisitors: 51,
    panoramaCount: 73,

    // Room Data
    rooms: allRooms,

    // Material Analysis - EXACT VALUES
    hardwoodArea: 48.99440193,
    tileArea: 35.82769942,
    carpetArea: 38.89929986,

    // Features & Systems - EXACT VALUES
    airConditioningCount: 3,
    airConditioningType: "Fujitsu Inverter Split System",
    smokeAlarmCount: 6,
    ceilingLightCount: 15,
    doorCount: 20,
    fireplace: "No",

    // Primary Materials - EXACT VALUES
    primaryCeilingType: "flat",
    primaryWallType: "plaster",
    primaryFlooringType: "hardwood",
    primaryInternalColor: "#d2d0ca",

    // Damage Assessment - EXACT VALUES
    damageWalls: "No",
    damageFloor: "No",
    damageCeiling: "No",
    damageKnown: "No",

    // Location Data - EXACT VALUES
    streetNo: "3",
    streetName: "Bellavista",
    streetType: "Terrace",
    locality: "PADDINGTON",
    state: "QLD",
    postcode: "4064",
    latitude: -27.455381,
    longitude: 152.988639,
    gnafId: "GAQLD155682091",
    meshblock: "MB2130563208900",
    meshblock2016: "MB1630563208900",
    sa1Id: 30504113517,
    sa2Id: 305041135,

    // Scan Information - EXACT VALUES
    uploadTime: "2025-06-24 00:12:52.377000 UTC",
    scannedDate: "2025-07-24 09:30:00.000000 UTC",
    scanPurpose: "RESIDENTIAL_SALES",
    rescanOrOriginal: "No",
    multipleScans: "1- Carport",

    // Descriptions - EXACT VALUES
    uniqueFeatures:
      "Exceptionally Wide Hallway: The property features a hallway with an average width of approximately 3.28 meters, creating an unusually spacious central corridor that enhances the sense of openness.\n\n\nMulti-Level Layout: The home's design is spread across two distinct floors, allowing for separation between living and sleeping zones.\n\n\nComprehensive Climate Control: The residence is equipped with four air conditioning units, indicating a focus on thorough climate management throughout the interior.\n\n\nZoned Flooring: The layout utilizes three different primary flooring materials—hardwood, carpet, and tile —to define the different functional areas of the home, such as living spaces, bedrooms, and wet areas",
    propertyDescription:
      "This contemporary two-storey home is defined by a uniquely spacious layout and a seamless connection between its indoor and outdoor living areas. The interior features a practical and modern blend of flooring, with hardwood in the main living spaces, carpet in the three bedrooms, and tiles in the two bathrooms. The residence is built for comfort with comprehensive climate control throughout. The home's design creates an open and airy atmosphere, enhanced by an exceptionally wide central hallway that serves as the spine of the layout.",
  }
}

// Update the basic parser with EXACT data from your provided JSON
export function parseCSVData(csvText: string): PropertyData {
  const lines = csvText.split("\n")
  const headers = lines[0].split(",")
  const data = lines[1].split(",")

  // Create a map for easy access
  const dataMap: Record<string, string> = {}
  headers.forEach((header, index) => {
    dataMap[header.trim()] = data[index]?.trim() || ""
  })

  // Use rooms 1-4 for basic parser
  const allRooms: RoomData[] = [sampleRoom1, sampleRoom2, realRoom3, realRoom4]

  // EXACT DATA FROM YOUR PROVIDED JSON - NO MODIFICATIONS
  return {
    // Basic Property Info - EXACT VALUES
    id: "25763",
    matterportTourId: "ZUCRWEgFkxk",
    address: "3 Bellavista Terrace, PADDINGTON QLD 4064",
    propertyType: "HOUSE",
    buildYear: "Unknown",

    // Pricing Data - EXACT VALUES
    estimatedPrice: 1340589,
    lowPrice: 1152907,
    highPrice: 1528271,
    lastSalePrice: 375000,
    propertyValuation: 470000,

    // Area Measurements - EXACT VALUES
    totalArea: 142.6283016,
    floorArea: 115,
    landArea: 255,
    bedArea: 17.66950035,
    masterBedArea: 9.166700363,
    bathArea: 13.32430005,

    // Property Features - EXACT VALUES
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    ceilingHeight: 2.415555451,
    floors: 2,
    hallwayAvgWidth: 3.278478702,

    // Virtual Tour Analytics - EXACT VALUES
    views: 55,
    avgDailyViews: 1.486486486,
    avgSessionTime: 132.8750731,
    engagedInspections: 51,
    engagedVisitors: 51,
    panoramaCount: 73,

    // Room Data
    rooms: allRooms,

    // Material Analysis - EXACT VALUES
    hardwoodArea: 48.99440193,
    tileArea: 35.82769942,
    carpetArea: 38.89929986,

    // Features & Systems - EXACT VALUES
    airConditioningCount: 3,
    airConditioningType: "Fujitsu Inverter Split System",
    smokeAlarmCount: 6,
    ceilingLightCount: 15,
    doorCount: 20,
    fireplace: "No",

    // Primary Materials - EXACT VALUES
    primaryCeilingType: "flat",
    primaryWallType: "plaster",
    primaryFlooringType: "hardwood",
    primaryInternalColor: "#d2d0ca",

    // Damage Assessment - EXACT VALUES
    damageWalls: "No",
    damageFloor: "No",
    damageCeiling: "No",
    damageKnown: "No",

    // Location Data - EXACT VALUES
    streetNo: "3",
    streetName: "Bellavista",
    streetType: "Terrace",
    locality: "PADDINGTON",
    state: "QLD",
    postcode: "4064",
    latitude: -27.455381,
    longitude: 152.988639,
    gnafId: "GAQLD155682091",
    meshblock: "MB2130563208900",
    meshblock2016: "MB1630563208900",
    sa1Id: 30504113517,
    sa2Id: 305041135,

    // Scan Information - EXACT VALUES
    uploadTime: "2025-06-24 00:12:52.377000 UTC",
    scannedDate: "2025-07-24 09:30:00.000000 UTC",
    scanPurpose: "RESIDENTIAL_SALES",
    rescanOrOriginal: "No",
    multipleScans: "1- Carport",

    // Descriptions - EXACT VALUES
    uniqueFeatures:
      "Exceptionally Wide Hallway: The property features a hallway with an average width of approximately 3.28 meters, creating an unusually spacious central corridor that enhances the sense of openness.\n\n\nMulti-Level Layout: The home's design is spread across two distinct floors, allowing for separation between living and sleeping zones.\n\n\nComprehensive Climate Control: The residence is equipped with four air conditioning units, indicating a focus on thorough climate management throughout the interior.\n\n\nZoned Flooring: The layout utilizes three different primary flooring materials—hardwood, carpet, and tile —to define the different functional areas of the home, such as living spaces, bedrooms, and wet areas",
    propertyDescription:
      "This contemporary two-storey home is defined by a uniquely spacious layout and a seamless connection between its indoor and outdoor living areas. The interior features a practical and modern blend of flooring, with hardwood in the main living spaces, carpet in the three bedrooms, and tiles in the two bathrooms. The residence is built for comfort with comprehensive climate control throughout. The home's design creates an open and airy atmosphere, enhanced by an exceptionally wide central hallway that serves as the spine of the layout.",
  }
}
