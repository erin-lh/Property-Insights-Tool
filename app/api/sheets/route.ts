import { NextRequest, NextResponse } from 'next/server'

// Cache configuration
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes
let sheetsCache: { data: any, timestamp: number } | null = null

// Spreadsheet configuration
const SPREADSHEET_ID = '10XVAxEPF6ZfD2zlqPB0kvSyQOP41z8iF6GD9vrG4qHg'
const ROOM_SHEETS = Array.from({ length: 14 }, (_, i) => `Room ${i + 1}`)

interface SheetData {
  roomId?: string
  roomType?: string
  [key: string]: any
}

interface RoomSheetData {
  roomId: string
  roomType: string
  sheetName: string
  data: Record<string, any>
}

/**
 * Fetch data from a single Google Sheet
 */
async function fetchSheetData(sheetName: string): Promise<SheetData[]> {
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY
  
  if (!apiKey) {
    throw new Error('GOOGLE_SHEETS_API_KEY environment variable is not set')
  }

  const range = `${sheetName}!A:Z` // Fetch all columns from A to Z
  const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${apiKey}`

  try {
    const response = await fetch(url)
    
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet ${sheetName}: ${response.status} ${response.statusText}`)
    }

    const result = await response.json()
    const rows = result.values || []
    
    if (rows.length === 0) {
      return []
    }

    // First row contains headers
    const headers = rows[0] as string[]
    const dataRows = rows.slice(1)

    // Convert rows to objects using headers as keys
    const sheetData: SheetData[] = dataRows.map((row: any[]) => {
      const rowData: SheetData = {}
      
      headers.forEach((header, index) => {
        const value = row[index] || ''
        const key = header.trim().toLowerCase().replace(/\s+/g, '_')
        
        // Special handling for Room ID and Room Type columns
        if (header.toLowerCase().includes('room id') || header.toLowerCase().includes('room_id')) {
          rowData.roomId = value.toString().trim()
        } else if (header.toLowerCase().includes('room type') || header.toLowerCase().includes('room_type')) {
          rowData.roomType = value.toString().trim()
        } else {
          rowData[key] = value
        }
      })
      
      return rowData
    })

    return sheetData.filter(row => row.roomId && row.roomType) // Only return rows with both ID and type
  } catch (error) {
    console.error(`Error fetching sheet ${sheetName}:`, error)
    throw error
  }
}

/**
 * Fetch data from all room sheets
 */
async function fetchAllRoomSheets(): Promise<RoomSheetData[]> {
  const promises = ROOM_SHEETS.map(async (sheetName) => {
    try {
      const sheetData = await fetchSheetData(sheetName)
      
      return sheetData.map(row => ({
        roomId: row.roomId!,
        roomType: row.roomType!,
        sheetName,
        data: row
      }))
    } catch (error) {
      console.error(`Failed to fetch ${sheetName}:`, error)
      return [] // Return empty array for failed sheets
    }
  })

  const results = await Promise.allSettled(promises)
  const allData: RoomSheetData[] = []

  results.forEach((result, index) => {
    if (result.status === 'fulfilled') {
      allData.push(...result.value)
    } else {
      console.error(`Sheet ${ROOM_SHEETS[index]} failed:`, result.reason)
    }
  })

  return allData
}

/**
 * Check if cache is valid
 */
function isCacheValid(): boolean {
  if (!sheetsCache) return false
  return Date.now() - sheetsCache.timestamp < CACHE_DURATION
}

/**
 * Main API handler
 */
export async function GET(request: NextRequest) {
  try {
    // Check cache first
    if (isCacheValid() && sheetsCache) {
      return NextResponse.json({
        success: true,
        data: sheetsCache.data,
        cached: true,
        timestamp: sheetsCache.timestamp
      })
    }

    // Fetch fresh data
    console.log('Fetching fresh data from Google Sheets...')
    const roomData = await fetchAllRoomSheets()

    // Group by room key (roomId + roomType combination)
    const groupedData: Record<string, RoomSheetData> = {}
    
    roomData.forEach(room => {
      const key = `${room.roomId}_${room.roomType}`.toLowerCase()
      groupedData[key] = room
    })

    // Update cache
    sheetsCache = {
      data: groupedData,
      timestamp: Date.now()
    }

    return NextResponse.json({
      success: true,
      data: groupedData,
      cached: false,
      timestamp: sheetsCache.timestamp,
      totalRooms: Object.keys(groupedData).length
    })

  } catch (error) {
    console.error('Error in sheets API:', error)
    
    // Return cached data if available, even if stale
    if (sheetsCache) {
      return NextResponse.json({
        success: true,
        data: sheetsCache.data,
        cached: true,
        timestamp: sheetsCache.timestamp,
        warning: 'Using cached data due to API error',
        error: error instanceof Error ? error.message : 'Unknown error'
      })
    }

    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: {}
    }, { status: 500 })
  }
}

/**
 * Force refresh endpoint
 */
export async function POST(request: NextRequest) {
  try {
    // Clear cache
    sheetsCache = null
    
    // Fetch fresh data
    const roomData = await fetchAllRoomSheets()
    
    // Group by room key
    const groupedData: Record<string, RoomSheetData> = {}
    
    roomData.forEach(room => {
      const key = `${room.roomId}_${room.roomType}`.toLowerCase()
      groupedData[key] = room
    })

    // Update cache
    sheetsCache = {
      data: groupedData,
      timestamp: Date.now()
    }

    return NextResponse.json({
      success: true,
      data: groupedData,
      cached: false,
      timestamp: sheetsCache.timestamp,
      totalRooms: Object.keys(groupedData).length,
      message: 'Cache refreshed successfully'
    })

  } catch (error) {
    console.error('Error refreshing sheets data:', error)
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      data: {}
    }, { status: 500 })
  }
}
