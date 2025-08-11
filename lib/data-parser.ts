// Define the PropertyData interface with default values
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
  climateZone: string
  postcode: string
  scanPurpose: string
  sqft: number
  yearBuilt: number
  lotSize: string
  parkingSpaces: number
  scanDate: string
  scanDuration: string
  scanQuality: string
  propertyCondition: string
  maintenanceRequired: string
  structuralIssues: string
  energyRating: string
  heatingCooling: string
  insulation: string
  windows: string
  flooringType: string
  wallMaterial: string
  internalWallColour: string
  smokeAlarms: number
  fireExtinguisher: number
  windowCount: number
  doorCount: number
  lightFixtures: number
  ceilingFans: number
  totalRooms: number
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
  fireplace: string
  securitySystem?: string
  electrical?: string
  plumbing?: string

  // Primary Materials
  primaryCeilingType: string
  primaryWallType: string
  primaryFlooringType: string
  primaryInternalColor: string

  // Damage Assessment - All values should be "No" based on the CSV
  damageWalls: string
  damageFloor: string
  damageCeiling: string
  damageKnown: string

  // Condition Assessments
  overallCondition: string
  wallCondition?: string
  floorCondition?: string
  ceilingCondition?: string
  conditionScore?: number

  // Location Data
  streetNo: string
  streetName: string
  streetType: string
  locality: string
  state: string
  latitude: number
  longitude: number
  gnafId: string
  meshblock: string
  meshblock2016: string
  sa1Id: number
  sa2Id: number

  // Descriptions
  uniqueFeatures: string
  propertyDescription: string

  // Additional fields from new schema
  roofMaterial?: string
  littleHingesBuildValuation?: string
  panoramaIds: string[]
  propertyValue?: number

  // Additional fields for scan information
  uploadTime: string
  scannedDate: string
  rescanOrOriginal: string
  multipleScans: string
}

// Damage assessment interface
export interface DamageData {
  propertyId: string
  wallDamage: string
  floorDamage: string
  ceilingDamage: string
  anyKnownDamage: string
  overallCondition: string
}

// Energy summary interface for additional energy data
export interface EnergySummaryData {
  propertyId: string
  energyRating?: string
  solarPanels?: string
  insulationType?: string
  windowType?: string
  heatingType?: string
  coolingType?: string
  hotWaterSystem?: string
  lightingType?: string
  applianceEfficiency?: string
  ventilationType?: string
  buildingOrientation?: string
  thermalMass?: string
  airSealing?: string
  energyCost?: string
  carbonFootprint?: string
  recommendations?: string[]
}

// Sheet data interface for Google Sheets integration
export interface SheetData {
  [key: string]: string | number | boolean
}

// Room data interface with Google Sheets integration
export interface RoomData {
  id: string
  name?: string
  type: string
  area: number
  width?: number
  depth?: number
  height?: number
  volume?: number
  flooring: string
  wallMaterial: string
  ceilingType: string
  windows: number
  windowCover?: string
  ceilingLights: number
  airConditioning: boolean
  smokeAlarm: boolean
  ceilingFan: boolean
  floorDamage: number
  wallDamage: number
  ceilingDamage: number
  panoramaCount: number
  panoramaLinks: string[]
  galleryImages?: string[]
  condition?: string
  features?: string[]
  roomNumber?: string
  driveUrl?: string
  coverImage?: string
  panoramaIds?: string[]
  // Google Sheets integration
  sheetData?: SheetData
  hasSheetData?: boolean
}

let cachedPropertyData: PropertyData | null = null
let cachedEnergySummaryData: EnergySummaryData | null = null
let cachedRoomData: RoomData[] | null = null
let cachedDamageData: DamageData | null = null

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

// Helper function to safely parse numbers
function safeParseNumber(value: string | undefined, defaultValue = 0): number {
  if (!value || value === "") return defaultValue
  const parsed = Number.parseFloat(value)
  return isNaN(parsed) ? defaultValue : parsed
}

// Helper function to safely parse integers
function safeParseInt(value: string | undefined, defaultValue = 0): number {
  if (!value || value === "") return defaultValue
  const parsed = Number.parseInt(value)
  return isNaN(parsed) ? defaultValue : parsed
}

// Fetch Google Sheets data and merge with room data
async function fetchAndMergeSheetData(rooms: RoomData[]): Promise<RoomData[]> {
  try {
    console.log("Attempting to fetch Google Sheets data...")
    const response = await fetch("/api/sheets")
    
    if (!response.ok) {
      if (response.status === 503) {
        // Service unavailable - authentication failed
        const errorData = await response.json().catch(() => ({}))
        console.warn("Google Sheets authentication failed:", errorData.message || 'Service unavailable')
        console.log("Falling back to CSV data only")
      } else {
        console.warn(`Failed to fetch sheet data (HTTP ${response.status}), using existing room data`)
      }
      return rooms
    }

    const result = await response.json()
    
    // Check if the response indicates authentication failure
    if (result.error === 'sheets_authentication_failed') {
      console.warn("Google Sheets authentication failed:", result.message)
      console.log("Application will continue using CSV data")
      return rooms
    }
    
    if (!result.data) {
      console.warn("No sheet data in response, using existing room data")
      return rooms
    }

    const sheetDataMap = new Map<string, SheetData>()

    // Create a map of sheet data using composite key (roomId + roomType)
    result.data.forEach((item: any) => {
      const key = `${item.roomId}-${item.roomType.toLowerCase()}`
      
      // Skip items with authentication errors
      if (item.sheetData && !item.sheetData.error) {
        sheetDataMap.set(key, item.sheetData)
      }
    })

    // Merge sheet data with existing room data
    const mergedRooms = rooms.map((room) => {
      const key = `${room.id}-${room.type.toLowerCase()}`
      const sheetData = sheetDataMap.get(key)

      if (sheetData) {
        return {
          ...room,
          sheetData,
          hasSheetData: true,
        }
      }

      return room
    })
    
    console.log(`Successfully merged sheet data for ${sheetDataMap.size} rooms`)
    return mergedRooms
  } catch (error) {
    console.error("Error fetching sheet data:", error)
    return rooms
  }
}

// Fetch damage assessment data from the new CSV - ensuring exact accuracy
async function fetchDamageData(): Promise<DamageData | null> {
  if (cachedDamageData) {
    return cachedDamageData
  }

  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Damage-7l8AKi1bTAjX7N0KAshuoxgJZnCA8I.csv",
    )
    const csvText = await response.text()

    // Parse CSV
    const lines = csvText.split("\n").filter((line) => line.trim() !== "")
    if (lines.length < 2) {
      throw new Error("Invalid CSV format")
    }

    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
    const values = lines[1].split(",").map((v) => v.trim().replace(/"/g, ""))

    // Create data map
    const dataMap: Record<string, string> = {}
    headers.forEach((header, index) => {
      dataMap[header] = values[index] || ""
    })

    // Use exact values from CSV - all should be "No" according to the schema
    const damageData: DamageData = {
      propertyId: "25763",
      wallDamage: dataMap["Wall Damage"] || "No",
      floorDamage: dataMap["Floor Damage"] || "No",
      ceilingDamage: dataMap["Damage_Ceiling_PTY_LH"] || "No",
      anyKnownDamage: dataMap["Any Damage Known"] || "No",
      overallCondition: "Property shows no notable visible damage on any surface",
    }

    cachedDamageData = damageData
    return damageData
  } catch (error) {
    console.error("Error fetching damage data:", error)
    return null
  }
}

// Parse CSV data from the updated provided URL (PTY 6)
export async function fetchPropertyData(): Promise<PropertyData | null> {
  if (cachedPropertyData) {
    return cachedPropertyData
  }

  try {
    // Use the new PTY (6) CSV URL provided
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Schema-%20PTY%20%286%29-BoSsFFLIR36YaySJnWXKSFOO3TKjpG.csv",
    )
    const csvText = await response.text()

    // Parse CSV (simple implementation - assumes first row is headers, second row is data)
    const lines = csvText.split("\n")
    const headers = lines[0].split(",").map((h) => h.trim().replace(/"/g, ""))
    const values = lines[1].split(",").map((v) => v.trim().replace(/"/g, ""))

    // Create data map for easier access
    const dataMap: Record<string, string> = {}
    headers.forEach((header, index) => {
      dataMap[header] = values[index] || ""
    })

    // Parse panorama IDs from the CSV
    const panoramaIdsString = dataMap["Panorama IDs"] || ""
    const panoramaIds = panoramaIdsString ? panoramaIdsString.split(",").map((id) => id.trim()) : []

    // Fetch damage data to ensure accuracy
    const damageData = await fetchDamageData()

    // Base room data
    const baseRooms = [sampleRoom1, sampleRoom2, realRoom3, realRoom4]

    // Fetch and merge sheet data
    const roomsWithSheetData = await fetchAndMergeSheetData(baseRooms)

    // Create property data object using the new CSV structure with corrected values
    const propertyData: PropertyData = {
      id: dataMap["Property ID"] || "25763",
      matterportTourId: dataMap["Tour ID"] || "ZUCRWEgFkxk",
      address: dataMap["Full Address"] || "3 Bellavista Terrace, PADDINGTON QLD 4064",
      estimatedPrice: safeParseNumber(dataMap["EstimatePrice_PTY_CL"], 1340589),
      lowPrice: safeParseNumber(dataMap["LowPrice_PTY_CL"], 1152907),
      highPrice: safeParseNumber(dataMap["HighPrice_PTY_CL"], 1528271),
      lastSalePrice: safeParseNumber(dataMap["LastSalePrice_PTY_CL"], 375000),
      propertyValuation: safeParseNumber(dataMap["Property Valuation"], 470000),
      totalArea: safeParseNumber(dataMap["Total Area"], 142.6283016),
      floorArea: safeParseInt(dataMap["Floor Area"], 115),
      landArea: safeParseInt(dataMap["Land Area"], 255),
      bedArea: safeParseNumber(dataMap["Bed Area"], 17.66950035),
      masterBedArea: safeParseNumber(dataMap["MasterBedArea_PTY_LH"], 9.166700363),
      bathArea: safeParseNumber(dataMap["Bath Area"], 13.32430005),
      bedrooms: safeParseInt(dataMap["Bed Count"], 3),
      bathrooms: safeParseInt(dataMap["Bath Count"], 2),
      carSpaces: safeParseInt(dataMap["Car Space Count"], 1),
      buildYear: dataMap["Build Year"] || "Unknown",
      propertyType: dataMap["Property Type"] || "HOUSE",
      views: safeParseInt(dataMap["Virtual Tour Views Total"], 55),
      avgDailyViews: safeParseNumber(dataMap["Virtual Tour Views- Average Daily"], 1.486486486),
      avgSessionTime: safeParseNumber(dataMap["Virtual Tour- Average Session Time"], 132.8750731),
      engagedInspections: safeParseInt(dataMap["Virtual Tour- Engaged Inspections"], 51),
      engagedVisitors: safeParseInt(dataMap["Virtual Tour- Engaged Visitor"], 51),
      panoramaCount: safeParseInt(dataMap["Panorama Count"], 73),
      ceilingHeight: safeParseNumber(dataMap["Ceiling Height"], 2.415555451),
      floors: safeParseInt(dataMap["Floors"], 2),
      hallwayAvgWidth: safeParseNumber(dataMap["Hallway Avg Width"], 3.278478702),
      climateZone: dataMap["Climate Zone"] || "Zone 2",
      postcode: dataMap["Postcode"] || "4064",
      scanPurpose: dataMap["Scan Purpose"] || "RESIDENTIAL_SALES",
      sqft: safeParseNumber(dataMap["Sqft"], 1850),
      yearBuilt: safeParseInt(dataMap["Year Built"], 2015),
      lotSize: dataMap["Lot Size"] || "0.25 acres",
      parkingSpaces: safeParseInt(dataMap["Parking Spaces"], 2),
      scanDate: dataMap["Scan Date"] || "2024-01-15",
      scanDuration: dataMap["Scan Duration"] || "45 minutes",
      scanQuality: dataMap["Scan Quality"] || "High",
      propertyCondition: dataMap["Property Condition"] || "Good",
      maintenanceRequired: dataMap["Maintenance Required"] || "Minor",
      structuralIssues: dataMap["Structural Issues"] || "None",
      energyRating: dataMap["Energy Rating"] || "7.5/10",
      heatingCooling: dataMap["Heating Cooling"] || "Central HVAC",
      insulation: dataMap["Insulation"] || "R-15 walls, R-30 attic",
      windows: dataMap["Windows"] || "Double-pane",
      flooringType: dataMap["Flooring Type"] || "hardwood",
      wallMaterial: dataMap["Wall Material"] || "plaster",
      internalWallColour: dataMap["Internal Wall Colour"] || "#d2d0ca",
      smokeAlarms: safeParseInt(dataMap["Smoke Alarms"], 6),
      fireExtinguisher: safeParseInt(dataMap["Fire Extinguisher"], 1),
      windowCount: safeParseInt(dataMap["Window Count"], 12),
      doorCount: safeParseInt(dataMap["Door Count"], 20),
      lightFixtures: safeParseInt(dataMap["Light Fixtures"], 15),
      ceilingFans: safeParseInt(dataMap["Ceiling Fans"], 3),
      totalRooms: 14,
      rooms: roomsWithSheetData,
      hardwoodArea: safeParseNumber(dataMap["Hardwood Total Sqm"], 48.99440193),
      tileArea: safeParseNumber(dataMap["TileTotalSqm_PTY_LH"], 35.82769942),
      carpetArea: safeParseNumber(dataMap["Carpet Total Sqm"], 38.89929986),
      airConditioningCount: safeParseInt(dataMap["Airconditioning Unit Count"], 3),
      airConditioningType: dataMap["Airconditioning Type"] || "Fujitsu Inverter Split System",
      smokeAlarmCount: safeParseInt(dataMap["Smoke Alarm Count"], 6),
      ceilingLightCount: safeParseInt(dataMap["Ceiling Light Count"], 15),
      fireplace: dataMap["Fireplace"] || "No",
      // Primary Materials - using exact values from the new CSV
      primaryCeilingType: dataMap["Primary Ceiling Type"] || "flat",
      primaryWallType: dataMap["Primary Wall Type"] || "plaster",
      primaryFlooringType: dataMap["Primary Flooring Type"] || "hardwood",
      primaryInternalColor: dataMap["Primary Internal Hex Code"] || "#d2d0ca",
      // Use damage data with highest priority, fallback to main CSV if needed
      damageWalls: damageData?.wallDamage || dataMap["Wall Damage"] || "No",
      damageFloor: damageData?.floorDamage || dataMap["Floor Damage"] || "No",
      damageCeiling: damageData?.ceilingDamage || dataMap["Damage_Ceiling_PTY_LH"] || "No",
      damageKnown: damageData?.anyKnownDamage || dataMap["Any Damage Known"] || "No",
      overallCondition: damageData?.overallCondition || "Property shows no notable visible damage on any surface",
      streetNo: dataMap["Street No."] || "3",
      streetName: dataMap["Street Name"] || "Bellavista",
      streetType: dataMap["Street Type"] || "Terrace",
      locality: dataMap["Locality"] || "PADDINGTON",
      state: dataMap["State"] || "QLD",
      latitude: safeParseNumber(dataMap["Latitude"], -27.455381),
      longitude: safeParseNumber(dataMap["Longtitude"], 152.988639), // Note: typo in original CSV
      gnafId: dataMap["GNAF"] || "GAQLD155682091",
      meshblock: dataMap["Meshblock"] || "MB2130563208900",
      meshblock2016: dataMap["Meshblock2016"] || "MB1630563208900",
      sa1Id: safeParseNumber(dataMap["SA1Id_PTY_LH"], 30504113517),
      sa2Id: safeParseNumber(dataMap["SA2Id_PTY_LH"], 305041135),
      uniqueFeatures:
        dataMap["Unique Features"] ||
        "Exceptionally Wide Hallway: The property features a hallway with an average width of approximately 3.28 meters, creating an unusually spacious central corridor that enhances the sense of openness.\n\n\nMulti-Level Layout: The home's design is spread across two distinct floors, allowing for separation between living and sleeping zones.\n\n\nComprehensive Climate Control: The residence is equipped with four air conditioning units, indicating a focus on thorough climate management throughout the interior.\n\n\nZoned Flooring: The layout utilizes three different primary flooring materials—hardwood, carpet, and tile —to define the different functional areas of the home, such as living spaces, bedrooms, and wet areas",
      propertyDescription:
        dataMap["Property Description"] ||
        "This contemporary two-storey home is defined by a uniquely spacious layout and a seamless connection between its indoor and outdoor living areas. The interior features a practical and modern blend of flooring, with hardwood in the main living spaces, carpet in the three bedrooms, and tiles in the two bathrooms. The residence is built for comfort with comprehensive climate control throughout. The home's design creates an open and airy atmosphere, enhanced by an exceptionally wide central hallway that serves as the spine of the layout.",
      roofMaterial: dataMap["Roof Material"] || undefined,
      littleHingesBuildValuation: dataMap["Little Hinges Build Valuation"] || "X",
      panoramaIds: panoramaIds,
      uploadTime: dataMap["Upload Time"] || "2025-06-24 00:12:52.377000 UTC",
      scannedDate: dataMap["Scanned Date"] || "2025-07-24 09:30:00.000000 UTC",
      rescanOrOriginal: dataMap["Rescan or Original"] || "No",
      multipleScans: dataMap["Multiple Scans"] || "1- Carport",
    }

    cachedPropertyData = propertyData
    return propertyData
  } catch (error) {
    console.error("Error fetching property data:", error)
    return null
  }
}

// Function to refresh sheet data
export async function refreshSheetData(): Promise<void> {
  try {
    const response = await fetch("/api/sheets", { method: "POST" })
    if (response.ok) {
      // Clear cached property data to force refresh
      cachedPropertyData = null
    }
  } catch (error) {
    console.error("Error refreshing sheet data:", error)
  }
}

// Get room by ID
export async function getRoomById(roomId: string): Promise<RoomData | null> {
  const propertyData = await fetchPropertyData()
  return propertyData ? propertyData.rooms.find((room) => room.id === roomId) || null : null
}

// Get rooms by type
export function getRoomsByType(type: string): RoomData[] {
  const propertyData = cachedPropertyData
  return propertyData?.rooms
    ? propertyData.rooms.filter((room: RoomData) => room.type.toLowerCase().includes(type.toLowerCase()))
    : []
}

// Get total rooms
export function getTotalRooms(): number {
  const propertyData = cachedPropertyData
  return propertyData?.rooms ? propertyData.rooms.length : 0
}

// Get total area
export function getTotalArea(): number {
  const propertyData = cachedPropertyData
  return propertyData?.rooms ? propertyData.rooms.reduce((total: number, room: RoomData) => total + room.area, 0) : 0
}

// Get rooms with damage
export function getRoomsWithDamage(): RoomData[] {
  const propertyData = cachedPropertyData
  return propertyData?.rooms
    ? propertyData.rooms.filter((room: RoomData) => room.floorDamage > 0 || room.wallDamage > 0 || room.ceilingDamage > 0)
    : []
}

// Get average room size
export function getAverageRoomSize(): number {
  const totalArea = getTotalArea()
  const totalRooms = getTotalRooms()
  return totalRooms > 0 ? totalArea / totalRooms : 0
}

// Clear cache (useful for development)
export function clearCache() {
  cachedPropertyData = null
  cachedEnergySummaryData = null
  cachedRoomData = null
  cachedDamageData = null
}

// Legacy functions for compatibility
export async function parseCSVData(csvText: string): Promise<PropertyData> {
  const propertyData = await fetchPropertyData()
  return propertyData || ({} as PropertyData)
}

export async function parseCSVDataWithAllRooms(csvText: string): Promise<PropertyData> {
  const propertyData = await fetchPropertyData()
  return propertyData || ({} as PropertyData)
}
