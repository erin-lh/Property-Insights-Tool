import { type NextRequest, NextResponse } from "next/server"

const SPREADSHEET_ID = "10XVAxEPF6ZfD2zlqPB0kvSyQOP41z8iF6GD9vrG4qHg"
const API_KEY = process.env.GOOGLE_SHEETS_API_KEY

interface SheetData {
  [key: string]: string | number | boolean
}

interface RoomSheetData {
  roomId: string
  roomType: string
  sheetData: SheetData
}

// Cache for storing responses
const cache = new Map<string, { data: RoomSheetData[]; timestamp: number }>()
const CACHE_DURATION = 5 * 60 * 1000 // 5 minutes

async function fetchSheetData(sheetName: string): Promise<RoomSheetData | null> {
  if (!API_KEY) {
    throw new Error("Google Sheets API key not configured")
  }

  try {
    const range = `${sheetName}!A:Z` // Fetch all columns
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}?key=${API_KEY}`

    const response = await fetch(url)
    if (!response.ok) {
      throw new Error(`Failed to fetch sheet ${sheetName}: ${response.statusText}`)
    }

    const data = await response.json()
    const values = data.values

    if (!values || values.length < 2) {
      return null // No data or only headers
    }

    const headers = values[0]
    const rows = values.slice(1)

    // Find Room ID and Room Type columns
    const roomIdIndex = headers.findIndex(
      (header: string) => header.toLowerCase().includes("room id") || header.toLowerCase() === "id",
    )
    const roomTypeIndex = headers.findIndex(
      (header: string) => header.toLowerCase().includes("room type") || header.toLowerCase() === "type",
    )

    if (roomIdIndex === -1 || roomTypeIndex === -1) {
      console.warn(`Missing Room ID or Room Type columns in sheet ${sheetName}`)
      return null
    }

    // Process the first data row (assuming one room per sheet)
    const firstRow = rows[0]
    if (!firstRow || firstRow.length === 0) {
      return null
    }

    const roomId = firstRow[roomIdIndex]
    const roomType = firstRow[roomTypeIndex]

    if (!roomId || !roomType) {
      return null
    }

    // Build sheet data object
    const sheetData: SheetData = {}
    headers.forEach((header: string, index: number) => {
      if (index !== roomIdIndex && index !== roomTypeIndex && firstRow[index]) {
        const key = header.toLowerCase().replace(/\s+/g, "_")
        let value: string | number | boolean = firstRow[index]

        // Try to parse numbers and booleans
        if (typeof value === "string") {
          if (value.toLowerCase() === "true") value = true
          else if (value.toLowerCase() === "false") value = false
          else if (!isNaN(Number(value)) && value.trim() !== "") value = Number(value)
        }

        sheetData[key] = value
      }
    })

    return {
      roomId: String(roomId),
      roomType: String(roomType),
      sheetData,
    }
  } catch (error) {
    console.error(`Error fetching sheet ${sheetName}:`, error)
    return null
  }
}

export async function GET(request: NextRequest) {
  try {
    const cacheKey = "all-rooms"
    const cached = cache.get(cacheKey)

    // Return cached data if still valid
    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        success: true,
        data: cached.data,
        cached: true,
      })
    }

    // Fetch data from all 14 room sheets
    const sheetNames = Array.from({ length: 14 }, (_, i) => `Room ${i + 1}`)
    const promises = sheetNames.map((sheetName) => fetchSheetData(sheetName))

    const results = await Promise.allSettled(promises)
    const roomData: RoomSheetData[] = []

    results.forEach((result, index) => {
      if (result.status === "fulfilled" && result.value) {
        roomData.push(result.value)
      } else if (result.status === "rejected") {
        console.error(`Failed to fetch Room ${index + 1}:`, result.reason)
      }
    })

    // Cache the results
    cache.set(cacheKey, {
      data: roomData,
      timestamp: Date.now(),
    })

    return NextResponse.json({
      success: true,
      data: roomData,
      cached: false,
    })
  } catch (error) {
    console.error("Error fetching sheets data:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
        data: [],
      },
      { status: 500 },
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    // Clear cache to force refresh
    cache.clear()

    // Fetch fresh data
    const response = await GET(request)
    return response
  } catch (error) {
    console.error("Error refreshing sheets data:", error)
    return NextResponse.json(
      {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      },
      { status: 500 },
    )
  }
}
