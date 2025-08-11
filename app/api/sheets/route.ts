import { type NextRequest, NextResponse } from "next/server"
import { GoogleAuth } from "google-auth-library"

const SPREADSHEET_ID = "10XVAxEPF6ZfD2zlqPB0kvSyQOP41z8iF6GD9vrG4qHg"

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

/**
 * Create Google Auth client using service account credentials
 */
function createAuthClient() {
  // Get service account credentials from environment variables
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
  const projectId = process.env.GOOGLE_PROJECT_ID || "my-project-db-389005"

  if (!serviceAccountEmail || !serviceAccountKey) {
    throw new Error("Google Service Account credentials not configured. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY environment variables.")
  }

  // Create service account key object
  const credentials = {
    type: "service_account",
    project_id: projectId,
    private_key_id: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_ID || "c5d7aaff84fb15c6df322dbb430228481418ec71",
    private_key: serviceAccountKey.replace(/\\n/g, '\n'), // Handle escaped newlines
    client_email: serviceAccountEmail,
    client_id: process.env.GOOGLE_SERVICE_ACCOUNT_CLIENT_ID || "",
    auth_uri: "https://accounts.google.com/o/oauth2/auth",
    token_uri: "https://oauth2.googleapis.com/token",
    auth_provider_x509_cert_url: "https://www.googleapis.com/oauth2/v1/certs",
    client_x509_cert_url: `https://www.googleapis.com/robot/v1/metadata/x509/${encodeURIComponent(serviceAccountEmail)}`
  }

  const auth = new GoogleAuth({
    credentials,
    scopes: ['https://www.googleapis.com/auth/spreadsheets.readonly']
  })

  return auth
}

/**
 * Get authenticated access token for Google Sheets API
 */
async function getAccessToken(): Promise<string> {
  try {
    const auth = createAuthClient()
    const authClient = await auth.getClient()
    const accessToken = await authClient.getAccessToken()
    
    if (!accessToken.token) {
      throw new Error("Failed to obtain access token from Google Service Account")
    }
    
    return accessToken.token
  } catch (error) {
    console.error("Error getting access token:", error)
    throw new Error(`Authentication failed: ${error instanceof Error ? error.message : 'Unknown error'}`)
  }
}

/**
 * Diagnostic test function for service account authentication
 */
async function handleDiagnosticTest() {
  try {
    // Test 1: Check environment variables
    const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
    const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
    const projectId = process.env.GOOGLE_PROJECT_ID

    if (!serviceAccountEmail || !serviceAccountKey) {
      return NextResponse.json({
        success: false,
        message: "Service Account credentials not configured",
        details: {
          hasEmail: !!serviceAccountEmail,
          hasPrivateKey: !!serviceAccountKey,
          hasProjectId: !!projectId,
          requiredVars: ['GOOGLE_SERVICE_ACCOUNT_EMAIL', 'GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY']
        }
      })
    }

    // Test 2: Try to get access token
    try {
      const accessToken = await getAccessToken()
      
      // Test 3: Try to access spreadsheet metadata
      const metadataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?fields=sheets.properties.title`
      const metadataResponse = await fetch(metadataUrl, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      })

      if (!metadataResponse.ok) {
        const errorData = await metadataResponse.json().catch(() => null)
        return NextResponse.json({
          success: false,
          message: "Failed to access spreadsheet",
          details: {
            status: metadataResponse.status,
            statusText: metadataResponse.statusText,
            error: errorData,
            spreadsheetId: SPREADSHEET_ID,
            serviceAccount: serviceAccountEmail
          }
        })
      }

      const metadata = await metadataResponse.json()
      const sheetNames = metadata.sheets?.map((sheet: any) => sheet.properties.title) || []

      return NextResponse.json({
        success: true,
        message: "Service Account authentication successful",
        details: {
          serviceAccount: serviceAccountEmail,
          projectId: projectId,
          spreadsheetId: SPREADSHEET_ID,
          availableSheets: sheetNames,
          targetSheets: Array.from({ length: 14 }, (_, i) => `Room ${i + 1}`),
          missingSheets: Array.from({ length: 14 }, (_, i) => `Room ${i + 1}`).filter(name => !sheetNames.includes(name))
        }
      })

    } catch (authError) {
      return NextResponse.json({
        success: false,
        message: "Authentication failed",
        details: {
          error: authError instanceof Error ? authError.message : 'Unknown error',
          serviceAccount: serviceAccountEmail,
          projectId: projectId
        }
      })
    }

  } catch (error) {
    return NextResponse.json({
      success: false,
      message: "Diagnostic test failed",
      details: {
        error: error instanceof Error ? error.message : 'Unknown error'
      }
    })
  }
}

async function fetchSheetData(sheetName: string): Promise<RoomSheetData | null> {
  try {
    // Get authenticated access token
    const accessToken = await getAccessToken()
    
    const range = `${sheetName}!A:Z` // Fetch all columns
    const url = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${range}`

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json'
      }
    })
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => null)
      if (response.status === 403) {
        throw new Error(`Access denied to sheet ${sheetName}. Please ensure the service account (${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}) has access to the spreadsheet.`)
      } else if (response.status === 404) {
        throw new Error(`Sheet "${sheetName}" not found in spreadsheet ${SPREADSHEET_ID}`)
      } else {
        const errorMessage = errorData?.error?.message || response.statusText
        throw new Error(`Failed to fetch sheet ${sheetName}: ${errorMessage}`)
      }
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
  const { searchParams } = new URL(request.url)
  const action = searchParams.get('action')
  
  // Handle diagnostic test request
  if (action === 'test') {
    return await handleDiagnosticTest()
  }
  
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
