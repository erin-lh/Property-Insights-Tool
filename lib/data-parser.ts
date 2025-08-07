// Property data interface based on the updated CSV schema
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
  climateZone: string

  // Scan Information
  uploadTime: string
  scannedDate: string
  scanPurpose: string
  rescanOrOriginal: string
  multipleScans: string

  // Descriptions
  uniqueFeatures: string
  propertyDescription: string

  // Additional fields from new schema
  roofMaterial?: string
  littleHingesBuildValuation?: string
  panoramaIds: string[]

  // Energy Summary Data
  energySummary?: {
    propertyId: string
    address: string
    scanDate: string
    scanPurpose: string
    airconUnits: number
    smokeAlarms: number
    wallDamage: string
    floorDamage: string
    ceilingDamage: string
    anyKnownDamage: string
    hallwayAvgWidth: number
    ceilingType: string
    wallType: string
    flooringType: string
  }
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

// Room data interface
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

// Helper function to safely parse numbers
function safeParseNumber(value: string | undefined, defaultValue: number = 0): number {
  if (!value || value === '') return defaultValue
  const parsed = parseFloat(value)
  return isNaN(parsed) ? defaultValue : parsed
}

// Helper function to safely parse integers
function safeParseInt(value: string | undefined, defaultValue: number = 0): number {
  if (!value || value === '') return defaultValue
  const parsed = parseInt(value)
  return isNaN(parsed) ? defaultValue : parsed
}

// Fetch damage assessment data from the new CSV - ensuring exact accuracy
async function fetchDamageData(): Promise<DamageData | null> {
  if (cachedDamageData) {
    return cachedDamageData
  }

  try {
    const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Damage-7l8AKi1bTAjX7N0KAshuoxgJZnCA8I.csv')
    const csvText = await response.text()
    
    // Parse CSV
    const lines = csvText.split('\n').filter(line => line.trim() !== '')
    if (lines.length < 2) {
      throw new Error('Invalid CSV format')
    }
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const values = lines[1].split(',').map(v => v.trim().replace(/"/g, ''))
    
    // Create data map
    const dataMap: Record<string, string> = {}
    headers.forEach((header, index) => {
      dataMap[header] = values[index] || ''
    })
    
    // Use exact values from CSV - all should be "No" according to the schema
    const damageData: DamageData = {
      propertyId: '25763',
      wallDamage: dataMap['Wall Damage'] || 'No',
      floorDamage: dataMap['Floor Damage'] || 'No', 
      ceilingDamage: dataMap['Damage_Ceiling_PTY_LH'] || 'No',
      anyKnownDamage: dataMap['Any Damage Known'] || 'No',
      overallCondition: 'Property shows no notable visible damage on any surface'
    }
    
    cachedDamageData = damageData
    return damageData
  } catch (error) {
    console.error('Error fetching damage data:', error)
    return null
  }
}

// Parse CSV data from the new provided URL
export async function fetchPropertyData(): Promise<PropertyData | null> {
  if (cachedPropertyData) {
    return cachedPropertyData
  }

  try {
    const response = await fetch('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Schema-%20PTY%20%285%29-P86fCboHHvE5XzVvGsWhEF9NhLYueM.csv')
    const csvText = await response.text()
    
    // Parse CSV (simple implementation - assumes first row is headers, second row is data)
    const lines = csvText.split('\n')
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const values = lines[1].split(',').map(v => v.trim().replace(/"/g, ''))
    
    // Create data map for easier access
    const dataMap: Record<string, string> = {}
    headers.forEach((header, index) => {
      dataMap[header] = values[index] || ''
    })
    
    // Parse panorama IDs from the CSV
    const panoramaIdsString = dataMap['Panorama IDs'] || ''
    const panoramaIds = panoramaIdsString ? panoramaIdsString.split(',').map(id => id.trim()) : []
    
    // Fetch damage data to ensure accuracy
    const damageData = await fetchDamageData()
    
    // Create property data object using the new CSV structure
    const propertyData: PropertyData = {
      id: dataMap['Property ID'] || '25763',
      matterportTourId: dataMap['Tour ID'] || 'ZUCRWEgFkxk',
      address: dataMap['Full Address'] || '3 Bellavista Terrace, PADDINGTON QLD 4064',
      estimatedPrice: safeParseNumber(dataMap['EstimatePrice_PTY_CL'], 1340589),
      lowPrice: safeParseNumber(dataMap['LowPrice_PTY_CL'], 1152907),
      highPrice: safeParseNumber(dataMap['HighPrice_PTY_CL'], 1528271),
      lastSalePrice: safeParseNumber(dataMap['LastSalePrice_PTY_CL'], 375000),
      propertyValuation: safeParseNumber(dataMap['Property Valuation'], 470000),
      totalArea: safeParseNumber(dataMap['Total Area'], 142.6283016),
      floorArea: safeParseInt(dataMap['Floor Area'], 115),
      landArea: safeParseInt(dataMap['Land Area'], 255),
      bedArea: safeParseNumber(dataMap['Bed Area'], 17.66950035),
      masterBedArea: safeParseNumber(dataMap['MasterBedArea_PTY_LH'], 9.166700363),
      bathArea: safeParseNumber(dataMap['Bath Area'], 13.32430005),
      bedrooms: safeParseInt(dataMap['Bed Count'], 3),
      bathrooms: safeParseInt(dataMap['Bath Count'], 2),
      carSpaces: safeParseInt(dataMap['Car Space Count'], 1),
      buildYear: dataMap['Build Year'] || 'Unknown',
      propertyType: dataMap['Property Type'] || 'HOUSE',
      views: safeParseInt(dataMap['Virtual Tour Views Total'], 55),
      avgDailyViews: safeParseNumber(dataMap['Virtual Tour Views- Average Daily'], 1.486486486),
      avgSessionTime: safeParseNumber(dataMap['Virtual Tour- Average Session Time'], 132.8750731),
      engagedInspections: safeParseInt(dataMap['Virtual Tour- Engaged Inspections'], 51),
      engagedVisitors: safeParseInt(dataMap['Virtual Tour- Engaged Visitor'], 51),
      panoramaCount: safeParseInt(dataMap['Panorama Count'], 73),
      ceilingHeight: safeParseNumber(dataMap['Ceiling Height'], 2.415555451),
      floors: safeParseInt(dataMap['Floors'], 2),
      hallwayAvgWidth: safeParseNumber(dataMap['Hallway Avg Width'], 3.278478702),
      rooms: [sampleRoom1, sampleRoom2, realRoom3, realRoom4],
      hardwoodArea: safeParseNumber(dataMap['Hardwood Total Sqm'], 48.99440193),
      tileArea: safeParseNumber(dataMap['TileTotalSqm_PTY_LH'], 35.82769942),
      carpetArea: safeParseNumber(dataMap['Carpet Total Sqm'], 38.89929986),
      airConditioningCount: safeParseInt(dataMap['Airconditioning Unit Count'], 3),
      airConditioningType: dataMap['Airconditioning Type'] || 'Fujitsu Inverter Split System',
      smokeAlarmCount: safeParseInt(dataMap['Smoke Alarm Count'], 6),
      ceilingLightCount: safeParseInt(dataMap['Ceiling Light Count'], 15),
      doorCount: safeParseInt(dataMap['Door Count'], 20),
      fireplace: dataMap['Fireplace'] || 'No',
      primaryCeilingType: dataMap['Primary Ceiling Type'] || 'flat',
      primaryWallType: dataMap['Primary Wall Type'] || 'plaster',
      primaryFlooringType: dataMap['Primary Flooring Type'] || 'hardwood',
      primaryInternalColor: dataMap['Primary Internal Hex Code'] || '#d2d0ca',
      // Use damage data with highest priority, fallback to main CSV if needed
      damageWalls: damageData?.wallDamage || dataMap['Wall Damage'] || 'No',
      damageFloor: damageData?.floorDamage || dataMap['Floor Damage'] || 'No',
      damageCeiling: damageData?.ceilingDamage || dataMap['Damage_Ceiling_PTY_LH'] || 'No',
      damageKnown: damageData?.anyKnownDamage || dataMap['Any Damage Known'] || 'No',
      overallCondition: damageData?.overallCondition || 'Property shows no notable visible damage on any surface',
      streetNo: dataMap['Street No.'] || '3',
      streetName: dataMap['Street Name'] || 'Bellavista',
      streetType: dataMap['Street Type'] || 'Terrace',
      locality: dataMap['Locality'] || 'PADDINGTON',
      state: dataMap['State'] || 'QLD',
      postcode: dataMap['Postcode'] || '4064',
      latitude: safeParseNumber(dataMap['Latitude'], -27.455381),
      longitude: safeParseNumber(dataMap['Longtitude'], 152.988639), // Note: typo in original CSV
      gnafId: dataMap['GNAF'] || 'GAQLD155682091',
      meshblock: dataMap['Meshblock'] || 'MB2130563208900',
      meshblock2016: dataMap['Meshblock2016'] || 'MB1630563208900',
      sa1Id: safeParseNumber(dataMap['SA1Id_PTY_LH'], 30504113517),
      sa2Id: safeParseNumber(dataMap['SA2Id_PTY_LH'], 305041135),
      climateZone: dataMap['Climate Zone'] || 'Zone 2',
      uploadTime: dataMap['Upload Time'] || '2025-06-24 00:12:52.377000 UTC',
      scannedDate: dataMap['Scanned Date'] || '2025-07-24 09:30:00.000000 UTC',
      scanPurpose: dataMap['Scan Purpose'] || 'RESIDENTIAL_SALES',
      rescanOrOriginal: dataMap['Rescan or Original'] || 'No',
      multipleScans: dataMap['Multiple Scans'] || '1- Carport',
      uniqueFeatures: dataMap['Unique Features'] || 'Exceptionally Wide Hallway: The property features a hallway with an average width of approximately 3.28 meters, creating an unusually spacious central corridor that enhances the sense of openness.',
      propertyDescription: dataMap['Property Description'] || 'This contemporary two-storey home is defined by a uniquely spacious layout and a seamless connection between its indoor and outdoor living areas.',
      roofMaterial: dataMap['Roof Material'] || undefined,
      littleHingesBuildValuation: dataMap['Little Hinges Build Valuation'] || undefined,
      panoramaIds: panoramaIds,
      energySummary: await fetchEnergySummaryData(),
    }

    cachedPropertyData = propertyData
    return propertyData
  } catch (error) {
    console.error('Error fetching property data:', error)
    return null
  }
}

// Fetch energy summary data (derived from property data)
async function fetchEnergySummaryData(): Promise<any> {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/AI-Reference_Energy_Summary-XbOEjRB8S7TwgYQ8kRPtMHLag1VEvZ.csv"
    )
    const csvText = await response.text()
    
    // Parse CSV
    const lines = csvText.split('\n').filter(line => line.trim() !== '')
    if (lines.length < 2) {
      throw new Error('Invalid CSV format')
    }
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const values = lines[1].split(',').map(v => v.trim().replace(/"/g, ''))
    
    // Create data map
    const dataMap: Record<string, string> = {}
    headers.forEach((header, index) => {
      dataMap[header] = values[index] || ''
    })
    
    // Map all fields from the energy summary schema
    return {
      propertyId: dataMap['Property_ID'] || '25763',
      address: dataMap['Address'] || '3 Bellavista Terrace, PADDINGTON QLD 4064',
      scanDate: dataMap['Scan_Date'] || '2025-07-24 09:30:00.000000 UTC',
      scanPurpose: dataMap['Scan_Purpose'] || 'RESIDENTIAL_SALES',
      airconUnits: safeParseInt(dataMap['Aircon_Units'], 3),
      smokeAlarms: safeParseInt(dataMap['Smoke_Alarms'], 6),
      wallDamage: dataMap['Wall_Damage'] || 'No',
      floorDamage: dataMap['Floor_Damage'] || 'No',
      ceilingDamage: dataMap['Ceiling_Damage'] || 'No',
      anyKnownDamage: dataMap['Any_Known_Damage'] || 'No',
      hallwayAvgWidth: safeParseNumber(dataMap['Hallway_Avg_Width'], 3.278478702),
      ceilingType: dataMap['Ceiling_Type'] || 'flat',
      wallType: dataMap['Wall_Type'] || 'plaster',
      flooringType: dataMap['Flooring_Type'] || 'hardwood'
    }
  } catch (error) {
    console.error('Error fetching energy summary data:', error)
    return null
  }
}

// Function to fetch and parse property-level data from the updated CSV
async function fetchPropertyLevelData(): Promise<Partial<PropertyData>> {
  try {
    const response = await fetch(
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/3%20Bellavista%20Terrace%20_%20Full%20Data%20Schema%20-%20Schema-%20PTY%20%285%29-P86fCboHHvE5XzVvGsWhEF9NhLYueM.csv"
    )
    const csvText = await response.text()
    
    // Parse CSV
    const lines = csvText.split('\n').filter(line => line.trim() !== '')
    if (lines.length < 2) {
      throw new Error('Invalid CSV format')
    }
    
    const headers = lines[0].split(',').map(h => h.trim().replace(/"/g, ''))
    const values = lines[1].split(',').map(v => v.trim().replace(/"/g, ''))
    
    // Create data map
    const dataMap: Record<string, string> = {}
    headers.forEach((header, index) => {
      dataMap[header] = values[index] || ''
    })
    
    // Parse panorama IDs
    const panoramaIdsString = dataMap['Panorama IDs'] || ''
    const panoramaIds = panoramaIdsString ? panoramaIdsString.split(',').map(id => id.trim()) : []
    
    // Fetch damage data to ensure accuracy
    const damageData = await fetchDamageData()
    
    return {
      // Basic Property Info
      id: dataMap['Property ID'] || '25763',
      matterportTourId: dataMap['Tour ID'] || 'ZUCRWEgFkxk',
      address: dataMap['Full Address'] || '3 Bellavista Terrace, PADDINGTON QLD 4064',
      propertyType: dataMap['Property Type'] || 'HOUSE',
      buildYear: dataMap['Build Year'] || 'Unknown',

      // Pricing Data
      estimatedPrice: safeParseNumber(dataMap['EstimatePrice_PTY_CL'], 1340589),
      lowPrice: safeParseNumber(dataMap['LowPrice_PTY_CL'], 1152907),
      highPrice: safeParseNumber(dataMap['HighPrice_PTY_CL'], 1528271),
      lastSalePrice: safeParseNumber(dataMap['LastSalePrice_PTY_CL'], 375000),
      propertyValuation: safeParseNumber(dataMap['Property Valuation'], 470000),

      // Area Measurements
      totalArea: safeParseNumber(dataMap['Total Area'], 142.6283016),
      floorArea: safeParseInt(dataMap['Floor Area'], 115),
      landArea: safeParseInt(dataMap['Land Area'], 255),
      bedArea: safeParseNumber(dataMap['Bed Area'], 17.66950035),
      masterBedArea: safeParseNumber(dataMap['MasterBedArea_PTY_LH'], 9.166700363),
      bathArea: safeParseNumber(dataMap['Bath Area'], 13.32430005),

      // Property Features
      bedrooms: safeParseInt(dataMap['Bed Count'], 3),
      bathrooms: safeParseInt(dataMap['Bath Count'], 2),
      carSpaces: safeParseInt(dataMap['Car Space Count'], 1),
      ceilingHeight: safeParseNumber(dataMap['Ceiling Height'], 2.415555451),
      floors: safeParseInt(dataMap['Floors'], 2),
      hallwayAvgWidth: safeParseNumber(dataMap['Hallway Avg Width'], 3.278478702),

      // Virtual Tour Analytics
      views: safeParseInt(dataMap['Virtual Tour Views Total'], 55),
      avgDailyViews: safeParseNumber(dataMap['Virtual Tour Views- Average Daily'], 1.486486486),
      avgSessionTime: safeParseNumber(dataMap['Virtual Tour- Average Session Time'], 132.8750731),
      engagedInspections: safeParseInt(dataMap['Virtual Tour- Engaged Inspections'], 51),
      engagedVisitors: safeParseInt(dataMap['Virtual Tour- Engaged Visitor'], 51),
      panoramaCount: safeParseInt(dataMap['Panorama Count'], 73),

      // Material Analysis
      hardwoodArea: safeParseNumber(dataMap['Hardwood Total Sqm'], 48.99440193),
      tileArea: safeParseNumber(dataMap['TileTotalSqm_PTY_LH'], 35.82769942),
      carpetArea: safeParseNumber(dataMap['Carpet Total Sqm'], 38.89929986),

      // Features & Systems
      airConditioningCount: safeParseInt(dataMap['Airconditioning Unit Count'], 3),
      airConditioningType: dataMap['Airconditioning Type'] || 'Fujitsu Inverter Split System',
      smokeAlarmCount: safeParseInt(dataMap['Smoke Alarm Count'], 6),
      ceilingLightCount: safeParseInt(dataMap['Ceiling Light Count'], 15),
      doorCount: safeParseInt(dataMap['Door Count'], 20),
      fireplace: dataMap['Fireplace'] || 'No',

      // Primary Materials
      primaryCeilingType: dataMap['Primary Ceiling Type'] || 'flat',
      primaryWallType: dataMap['Primary Wall Type'] || 'plaster',
      primaryFlooringType: dataMap['Primary Flooring Type'] || 'hardwood',
      primaryInternalColor: dataMap['Primary Internal Hex Code'] || '#d2d0ca',

      // Damage Assessment - Use damage data with highest priority
      damageWalls: damageData?.wallDamage || dataMap['Wall Damage'] || 'No',
      damageFloor: damageData?.floorDamage || dataMap['Floor Damage'] || 'No',
      damageCeiling: damageData?.ceilingDamage || dataMap['Damage_Ceiling_PTY_LH'] || 'No',
      damageKnown: damageData?.anyKnownDamage || dataMap['Any Damage Known'] || 'No',
      overallCondition: damageData?.overallCondition || 'Property shows no notable visible damage on any surface',

      // Location Data
      streetNo: dataMap['Street No.'] || '3',
      streetName: dataMap['Street Name'] || 'Bellavista',
      streetType: dataMap['Street Type'] || 'Terrace',
      locality: dataMap['Locality'] || 'PADDINGTON',
      state: dataMap['State'] || 'QLD',
      postcode: dataMap['Postcode'] || '4064',
      latitude: safeParseNumber(dataMap['Latitude'], -27.455381),
      longitude: safeParseNumber(dataMap['Longtitude'], 152.988639), // Note: typo in original CSV
      gnafId: dataMap['GNAF'] || 'GAQLD155682091',
      meshblock: dataMap['Meshblock'] || 'MB2130563208900',
      meshblock2016: dataMap['Meshblock2016'] || 'MB1630563208900',
      sa1Id: safeParseNumber(dataMap['SA1Id_PTY_LH'], 30504113517),
      sa2Id: safeParseNumber(dataMap['SA2Id_PTY_LH'], 305041135),
      climateZone: dataMap['Climate Zone'] || 'Zone 2',

      // Scan Information
      uploadTime: dataMap['Upload Time'] || '2025-06-24 00:12:52.377000 UTC',
      scannedDate: dataMap['Scanned Date'] || '2025-07-24 09:30:00.000000 UTC',
      scanPurpose: dataMap['Scan Purpose'] || 'RESIDENTIAL_SALES',
      rescanOrOriginal: dataMap['Rescan or Original'] || 'No',
      multipleScans: dataMap['Multiple Scans'] || '1- Carport',

      // Descriptions
      uniqueFeatures: dataMap['Unique Features'] || 'Exceptionally Wide Hallway: The property features a hallway with an average width of approximately 3.28 meters, creating an unusually spacious central corridor that enhances the sense of openness.\n\n\nMulti-Level Layout: The home\'s design is spread across two distinct floors, allowing for separation between living and sleeping zones.\n\n\nComprehensive Climate Control: The residence is equipped with four air conditioning units, indicating a focus on thorough climate management throughout the interior.\n\n\nZoned Flooring: The layout utilizes three different primary flooring materials—hardwood, carpet, and tile —to define the different functional areas of the home, such as living spaces, bedrooms, and wet areas',
      propertyDescription: dataMap['Property Description'] || 'This contemporary two-storey home is defined by a uniquely spacious layout and a seamless connection between its indoor and outdoor living areas. The interior features a practical and modern blend of flooring, with hardwood in the main living spaces, carpet in the three bedrooms, and tiles in the two bathrooms. The residence is built for comfort with comprehensive climate control throughout. The home\'s design creates an open and airy atmosphere, enhanced by an exceptionally wide central hallway that serves as the spine of the layout.',

      // Additional fields
      roofMaterial: dataMap['Roof Material'] || undefined,
      littleHingesBuildValuation: dataMap['Little Hinges Build Valuation'] || undefined,
      panoramaIds: panoramaIds,

      // Condition Assessments - Set to undefined since we don't have this data
      wallCondition: undefined,
      floorCondition: undefined,
      ceilingCondition: undefined,
    }
  } catch (error) {
    console.error('Error fetching property-level data:', error)
    // Return fallback data if fetch fails
    return {}
  }
}

// Update the parseCSVDataWithAllRooms function to use real property data and energy summary
export async function parseCSVDataWithAllRooms(csvText: string): Promise<PropertyData> {
  // Fetch real property-level data and energy summary
  const [propertyLevelData, energySummaryData] = await Promise.all([
    fetchPropertyLevelData(),
    fetchEnergySummaryData()
  ])
  
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

  // Merge property-level data with fallback values
  const fallbackData: PropertyData = {
    // Basic Property Info - FALLBACK VALUES
    id: "25763",
    matterportTourId: "ZUCRWEgFkxk",
    address: "3 Bellavista Terrace, PADDINGTON QLD 4064",
    propertyType: "HOUSE",
    buildYear: "Unknown",

    // Pricing Data - FALLBACK VALUES
    estimatedPrice: 1340589,
    lowPrice: 1152907,
    highPrice: 1528271,
    lastSalePrice: 375000,
    propertyValuation: 470000,

    // Area Measurements - FALLBACK VALUES
    totalArea: 142.6283016,
    floorArea: 115,
    landArea: 255,
    bedArea: 17.66950035,
    masterBedArea: 9.166700363,
    bathArea: 13.32430005,

    // Property Features - FALLBACK VALUES
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    ceilingHeight: 2.415555451,
    floors: 2,
    hallwayAvgWidth: 3.278478702,

    // Virtual Tour Analytics - FALLBACK VALUES
    views: 55,
    avgDailyViews: 1.486486486,
    avgSessionTime: 132.8750731,
    engagedInspections: 51,
    engagedVisitors: 51,
    panoramaCount: 73,

    // Room Data
    rooms: allRooms,

    // Material Analysis - FALLBACK VALUES
    hardwoodArea: 48.99440193,
    tileArea: 35.82769942,
    carpetArea: 38.89929986,

    // Features & Systems - FALLBACK VALUES
    airConditioningCount: 3,
    airConditioningType: "Fujitsu Inverter Split System",
    smokeAlarmCount: 6,
    ceilingLightCount: 15,
    doorCount: 20,
    fireplace: "No",

    // Primary Materials - FALLBACK VALUES
    primaryCeilingType: "flat",
    primaryWallType: "plaster",
    primaryFlooringType: "hardwood",
    primaryInternalColor: "#d2d0ca",

    // Damage Assessment - FALLBACK VALUES (all "No" based on CSV)
    damageWalls: "No",
    damageFloor: "No",
    damageCeiling: "No",
    damageKnown: "No",
    overallCondition: "Property shows no notable visible damage on any surface",

    // Condition Assessments - Set to undefined since we don't have this data
    wallCondition: undefined,
    floorCondition: undefined,
    ceilingCondition: undefined,

    // Location Data - FALLBACK VALUES
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
    climateZone: "Zone 2",

    // Scan Information - FALLBACK VALUES
    uploadTime: "2025-06-24 00:12:52.377000 UTC",
    scannedDate: "2025-07-24 09:30:00.000000 UTC",
    scanPurpose: "RESIDENTIAL_SALES",
    rescanOrOriginal: "No",
    multipleScans: "1- Carport",

    // Descriptions - FALLBACK VALUES
    uniqueFeatures: "Exceptionally Wide Hallway: The property features a hallway with an average width of approximately 3.28 meters, creating an unusually spacious central corridor that enhances the sense of openness.\n\n\nMulti-Level Layout: The home's design is spread across two distinct floors, allowing for separation between living and sleeping zones.\n\n\nComprehensive Climate Control: The residence is equipped with four air conditioning units, indicating a focus on thorough climate management throughout the interior.\n\n\nZoned Flooring: The layout utilizes three different primary flooring materials—hardwood, carpet, and tile —to define the different functional areas of the home, such as living spaces, bedrooms, and wet areas",
    propertyDescription: "This contemporary two-storey home is defined by a uniquely spacious layout and a seamless connection between its indoor and outdoor living areas. The interior features a practical and modern blend of flooring, with hardwood in the main living spaces, carpet in the three bedrooms, and tiles in the two bathrooms. The residence is built for comfort with comprehensive climate control throughout. The home's design creates an open and airy atmosphere, enhanced by an exceptionally wide central hallway that serves as the spine of the layout.",

    // Additional fields
    roofMaterial: undefined,
    littleHingesBuildValuation: undefined,
    panoramaIds: [],

    // Energy Summary Data
    energySummary: undefined,
  }

  // Return merged data (property-level data takes precedence over fallback)
  const mergedData = {
    ...fallbackData,
    ...propertyLevelData,
    rooms: allRooms, // Always use the room data we've constructed
    energySummary: energySummaryData, // Add energy summary data
  }

  // Override specific fields with energy summary data if available (Energy Summary takes highest precedence)
  if (energySummaryData) {
    mergedData.airConditioningCount = energySummaryData.airconUnits
    mergedData.smokeAlarmCount = energySummaryData.smokeAlarms
    mergedData.damageWalls = energySummaryData.wallDamage
    mergedData.damageFloor = energySummaryData.floorDamage
    mergedData.damageCeiling = energySummaryData.ceilingDamage
    mergedData.damageKnown = energySummaryData.anyKnownDamage
    mergedData.hallwayAvgWidth = energySummaryData.hallwayAvgWidth
    mergedData.primaryCeilingType = energySummaryData.ceilingType
    mergedData.primaryWallType = energySummaryData.wallType
    mergedData.primaryFlooringType = energySummaryData.flooringType
    mergedData.scannedDate = energySummaryData.scanDate
    mergedData.scanPurpose = energySummaryData.scanPurpose
  }

  return mergedData
}

// Update the basic parser to also use real property data and energy summary
export async function parseCSVData(csvText: string): Promise<PropertyData> {
  // Fetch real property-level data and energy summary
  const [propertyLevelData, energySummaryData] = await Promise.all([
    fetchPropertyLevelData(),
    fetchEnergySummaryData()
  ])
  
  // Use rooms 1-4 for basic parser
  const allRooms: RoomData[] = [sampleRoom1, sampleRoom2, realRoom3, realRoom4]

  // Fallback data structure
  const fallbackData: PropertyData = {
    // Basic Property Info - FALLBACK VALUES
    id: "25763",
    matterportTourId: "ZUCRWEgFkxk",
    address: "3 Bellavista Terrace, PADDINGTON QLD 4064",
    propertyType: "HOUSE",
    buildYear: "Unknown",

    // Pricing Data - FALLBACK VALUES
    estimatedPrice: 1340589,
    lowPrice: 1152907,
    highPrice: 1528271,
    lastSalePrice: 375000,
    propertyValuation: 470000,

    // Area Measurements - FALLBACK VALUES
    totalArea: 142.6283016,
    floorArea: 115,
    landArea: 255,
    bedArea: 17.66950035,
    masterBedArea: 9.166700363,
    bathArea: 13.32430005,

    // Property Features - FALLBACK VALUES
    bedrooms: 3,
    bathrooms: 2,
    carSpaces: 1,
    ceilingHeight: 2.415555451,
    floors: 2,
    hallwayAvgWidth: 3.278478702,

    // Virtual Tour Analytics - FALLBACK VALUES
    views: 55,
    avgDailyViews: 1.486486486,
    avgSessionTime: 132.8750731,
    engagedInspections: 51,
    engagedVisitors: 51,
    panoramaCount: 73,

    // Room Data
    rooms: allRooms,

    // Material Analysis - FALLBACK VALUES
    hardwoodArea: 48.99440193,
    tileArea: 35.82769942,
    carpetArea: 38.89929986,

    // Features & Systems - FALLBACK VALUES
    airConditioningCount: 3,
    airConditioningType: "Fujitsu Inverter Split System",
    smokeAlarmCount: 6,
    ceilingLightCount: 15,
    doorCount: 20,
    fireplace: "No",

    // Primary Materials - FALLBACK VALUES
    primaryCeilingType: "flat",
    primaryWallType: "plaster",
    primaryFlooringType: "hardwood",
    primaryInternalColor: "#d2d0ca",

    // Damage Assessment - FALLBACK VALUES (all "No" based on CSV)
    damageWalls: "No",
    damageFloor: "No",
    damageCeiling: "No",
    damageKnown: "No",
    overallCondition: "Property shows no notable visible damage on any surface",

    // Condition Assessments - Set to undefined since we don't have this data
    wallCondition: undefined,
    floorCondition: undefined,
    ceilingCondition: undefined,

    // Location Data - FALLBACK VALUES
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
    climateZone: "Zone 2",

    // Scan Information - FALLBACK VALUES
    uploadTime: "2025-06-24 00:12:52.377000 UTC",
    scannedDate: "2025-07-24 09:30:00.000000 UTC",
    scanPurpose: "RESIDENTIAL_SALES",
    rescanOrOriginal: "No",
    multipleScans: "1- Carport",

    // Descriptions - FALLBACK VALUES
    uniqueFeatures: "Exceptionally Wide Hallway: The property features a hallway with an average width of approximately 3.28 meters, creating an unusually spacious central corridor that enhances the sense of openness.\n\n\nMulti-Level Layout: The home's design is spread across two distinct floors, allowing for separation between living and sleeping zones.\n\n\nComprehensive Climate Control: The residence is equipped with four air conditioning units, indicating a focus on thorough climate management throughout the interior.\n\n\nZoned Flooring: The layout utilizes three different primary flooring materials—hardwood, carpet, and tile —to define the different functional areas of the home, such as living spaces, bedrooms, and wet areas",
    propertyDescription: "This contemporary two-storey home is defined by a uniquely spacious layout and a seamless connection between its indoor and outdoor living areas. The interior features a practical and modern blend of flooring, with hardwood in the main living spaces, carpet in the three bedrooms, and tiles in the two bathrooms. The residence is built for comfort with comprehensive climate control throughout. The home's design creates an open and airy atmosphere, enhanced by an exceptionally wide central hallway that serves as the spine of the layout.",

    // Additional fields
    roofMaterial: undefined,
    littleHingesBuildValuation: undefined,
    panoramaIds: [],

    // Energy Summary Data
    energySummary: undefined,
  }

  // Return merged data (property-level data takes precedence over fallback)
  const mergedData = {
    ...fallbackData,
    ...propertyLevelData,
    rooms: allRooms, // Always use the room data we've constructed
    energySummary: energySummaryData, // Add energy summary data
  }

  // Override specific fields with energy summary data if available (Energy Summary takes highest precedence)
  if (energySummaryData) {
    mergedData.airConditioningCount = energySummaryData.airconUnits
    mergedData.smokeAlarmCount = energySummaryData.smokeAlarms
    mergedData.damageWalls = energySummaryData.wallDamage
    mergedData.damageFloor = energySummaryData.floorDamage
    mergedData.damageCeiling = energySummaryData.ceilingDamage
    mergedData.damageKnown = energySummaryData.anyKnownDamage
    mergedData.hallwayAvgWidth = energySummaryData.hallwayAvgWidth
    mergedData.primaryCeilingType = energySummaryData.ceilingType
    mergedData.primaryWallType = energySummaryData.wallType
    mergedData.primaryFlooringType = energySummaryData.flooringType
    mergedData.scannedDate = energySummaryData.scanDate
    mergedData.scanPurpose = energySummaryData.scanPurpose
  }

  return mergedData
}

// Get room by ID
export async function getRoomById(roomId: string): Promise<RoomData | null> {
  const propertyData = await fetchPropertyData()
  return propertyData ? propertyData.rooms.find(room => room.id === roomId) || null : null
}

// Clear cache (useful for development)
export function clearCache() {
  cachedPropertyData = null
  cachedEnergySummaryData = null
  cachedRoomData = null
  cachedDamageData = null
}
