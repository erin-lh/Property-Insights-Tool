import { NextRequest, NextResponse } from 'next/server'

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

// Simple JWT implementation for Google Service Account authentication
function base64UrlEncode(data: string): string {
  return Buffer.from(data)
    .toString('base64')
    .replace(/\+/g, '-')
    .replace(/\//g, '_')
    .replace(/=/g, '')
}

async function sign(message: string, privateKey: string): Promise<string> {
  const crypto = await import('crypto')
  
  // Remove the header and footer from the private key
  const key = privateKey
    .replace(/-----BEGIN PRIVATE KEY-----/, '')
    .replace(/-----END PRIVATE KEY-----/, '')
    .replace(/\s/g, '')
  
  // Create the signature
  const keyBuffer = Buffer.from(key, 'base64')
  const sign = crypto.createSign('RSA-SHA256')
  sign.update(message)
  sign.end()
  
  const signature = sign.sign(keyBuffer)
  return base64UrlEncode(signature.toString('base64'))
}

async function createJWT(): Promise<string> {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY

  if (!serviceAccountEmail || !serviceAccountKey) {
    throw new Error("Google Service Account credentials not configured. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY environment variables.")
  }

  const now = Math.floor(Date.now() / 1000)
  const expiry = now + 3600 // 1 hour

  const header = {
    alg: 'RS256',
    typ: 'JWT',
    kid: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_ID || "c5d7aaff84fb15c6df322dbb430228481418ec71"
  }

  const payload = {
    iss: serviceAccountEmail,
    sub: serviceAccountEmail,
    aud: 'https://oauth2.googleapis.com/token',
    iat: now,
    exp: expiry,
    scope: 'https://www.googleapis.com/auth/spreadsheets.readonly'
  }

  const headerEncoded = base64UrlEncode(JSON.stringify(header))
  const payloadEncoded = base64UrlEncode(JSON.stringify(payload))
  const message = `${headerEncoded}.${payloadEncoded}`

  const signature = await sign(message, serviceAccountKey.replace(/\\n/g, '\n'))
  return `${message}.${signature}`
}

// Get access token using JWT assertion
async function getAccessToken(): Promise<string> {
  try {
    const jwt = await createJWT()
    
    const response = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`OAuth2 request failed: ${response.status} ${errorText}`)
    }

    const data = await response.json()
    
    if (!data.access_token) {
      throw new Error("No access token received from Google")
    }
    
    return data.access_token
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

    const envCheck = {
      GOOGLE_SERVICE_ACCOUNT_EMAIL: serviceAccountEmail ? '✅ Set' : '❌ Missing',
      GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: serviceAccountKey ? '✅ Set' : '❌ Missing',
      GOOGLE_PROJECT_ID: projectId || 'Using default: my-project-db-389005'
    }

    // Test 2: Try to get access token
    let authTest = '❌ Failed'
    let authError = ''
    
    try {
      const token = await getAccessToken()
      authTest = token ? '✅ Success' : '❌ No token received'
    } catch (error) {
      authError = error instanceof Error ? error.message : 'Unknown error'
    }

    // Test 3: Try to access spreadsheet
    let apiTest = '❌ Failed'
    let apiError = ''
    
    try {
      if (authTest.includes('✅')) {
        const token = await getAccessToken()
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?fields=sheets.properties.title`,
          {
            headers: {
              'Authorization': `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
          }
        )
        
        if (response.ok) {
          apiTest = '✅ Success'
        } else {
          const errorData = await response.text()
          apiError = `HTTP ${response.status}: ${errorData}`
        }
      }
    } catch (error) {
      apiError = error instanceof Error ? error.message : 'Unknown error'
    }

    return {
      status: 'diagnostic',
      timestamp: new Date().toISOString(),
      tests: {
        environmentVariables: envCheck,
        authentication: authTest,
        apiAccess: apiTest
      },
      errors: {
        auth: authError,
        api: apiError
      },
      instructions: authTest.includes('❌') ? {
        setup: "Configure Service Account credentials",
        steps: [
          "1. Create .env.local file with GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
          "2. Get private key from Google Cloud Console Service Account",
          "3. Share spreadsheet with service account email",
          "4. Ensure Google Sheets API is enabled"
        ]
      } : undefined
    }
  } catch (error) {
    return {
      status: 'error',
      message: error instanceof Error ? error.message : 'Unknown diagnostic error',
      timestamp: new Date().toISOString()
    }
  }
}

/**
 * Fetch data from a specific sheet in the spreadsheet
 */
async function fetchSheetData(sheetName: string): Promise<SheetData> {
  try {
    const accessToken = await getAccessToken()
    
    // Get sheet data using Google Sheets API v4
    const response = await fetch(
      `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${encodeURIComponent(sheetName)}?majorDimension=ROWS`,
      {
        method: 'GET',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(`Access denied to sheet ${sheetName}. Please ensure the service account (${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}) has access to the spreadsheet.`)
      }
      
      const errorData = await response.text()
      throw new Error(`Google Sheets API error: ${response.status} ${errorData}`)
    }

    const data = await response.json()
    
    if (!data.values || data.values.length === 0) {
      console.warn(`No data found in sheet: ${sheetName}`)
      return {}
    }

    // Convert rows to key-value pairs
    const sheetData: SheetData = {}
    for (let i = 0; i < data.values.length; i++) {
      const row = data.values[i]
      if (row.length >= 2) {
        const key = String(row[0]).trim()
        const value = row[1]
        
        if (key) {
          // Try to parse numeric values
          if (typeof value === 'string' && !isNaN(Number(value)) && value.trim() !== '') {
            sheetData[key] = Number(value)
          } else if (typeof value === 'string' && (value.toLowerCase() === 'true' || value.toLowerCase() === 'false')) {
            sheetData[key] = value.toLowerCase() === 'true'
          } else {
            sheetData[key] = value || ''
          }
        }
      }
    }

    return sheetData
  } catch (error) {
    console.error(`Error fetching sheet ${sheetName}:`, error)
    throw error
  }
}

/**
 * Get all room data from the spreadsheet
 */
async function getAllRoomData(): Promise<RoomSheetData[]> {
  const roomSheets = [
    { roomId: 'room-1', roomType: 'Living Room', sheetName: 'Room 1' },
    { roomId: 'room-2', roomType: 'Kitchen', sheetName: 'Room 2' },
    { roomId: 'room-3', roomType: 'Bathroom', sheetName: 'Room 3' },
    { roomId: 'room-4', roomType: 'Bedroom', sheetName: 'Room 4' },
    { roomId: 'room-5', roomType: 'Bedroom', sheetName: 'Room 5' },
    { roomId: 'room-6', roomType: 'Bedroom', sheetName: 'Room 6' },
    { roomId: 'room-7', roomType: 'Bedroom', sheetName: 'Room 7' },
    { roomId: 'room-8', roomType: 'Bedroom', sheetName: 'Room 8' },
    { roomId: 'room-9', roomType: 'Bedroom', sheetName: 'Room 9' },
    { roomId: 'room-10', roomType: 'Bedroom', sheetName: 'Room 10' },
    { roomId: 'room-11', roomType: 'Bedroom', sheetName: 'Room 11' },
    { roomId: 'room-12', roomType: 'Bedroom', sheetName: 'Room 12' },
    { roomId: 'room-13', roomType: 'Bedroom', sheetName: 'Room 13' },
    { roomId: 'room-14', roomType: 'Bedroom', sheetName: 'Room 14' },
  ]

  const results = await Promise.allSettled(
    roomSheets.map(async (room) => {
      try {
        const sheetData = await fetchSheetData(room.sheetName)
        return {
          roomId: room.roomId,
          roomType: room.roomType,
          sheetData
        }
      } catch (error) {
        console.error(`Error fetching sheet ${room.sheetName}:`, error)
        return {
          roomId: room.roomId,
          roomType: room.roomType,
          sheetData: {
            error: `Failed to load data: ${error instanceof Error ? error.message : 'Unknown error'}`
          }
        }
      }
    })
  )

  return results.map((result, index) => {
    if (result.status === 'fulfilled') {
      return result.value
    } else {
      return {
        roomId: roomSheets[index].roomId,
        roomType: roomSheets[index].roomType,
        sheetData: {
          error: `Failed to load: ${result.reason instanceof Error ? result.reason.message : 'Unknown error'}`
        }
      }
    }
  })
}

/**
 * Main GET handler for the sheets API
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const action = searchParams.get('action')

    // Handle diagnostic test
    if (action === 'test') {
      const diagnosticResult = await handleDiagnosticTest()
      return NextResponse.json(diagnosticResult, { 
        status: 200,
        headers: {
          'Cache-Control': 'no-store, max-age=0',
        }
      })
    }

    // Check cache first
    const cacheKey = 'all-rooms'
    const cached = cache.get(cacheKey)
    
    if (cached && (Date.now() - cached.timestamp) < CACHE_DURATION) {
      return NextResponse.json({
        data: cached.data,
        source: 'cache',
        timestamp: cached.timestamp
      })
    }

    // Fetch fresh data
    const roomData = await getAllRoomData()
    
    // Update cache
    cache.set(cacheKey, {
      data: roomData,
      timestamp: Date.now()
    })

    return NextResponse.json({
      data: roomData,
      source: 'live',
      timestamp: Date.now()
    })

  } catch (error) {
    console.error('Sheets API Error:', error)
    
    return NextResponse.json(
      {
        error: 'Internal server error',
        message: error instanceof Error ? error.message : 'Unknown error occurred',
        timestamp: new Date().toISOString()
      },
      { status: 500 }
    )
  }
}

/**
 * Handle POST requests (for future use)
 */
export async function POST(request: NextRequest) {
  return NextResponse.json(
    { error: 'Method not implemented' },
    { status: 501 }
  )
}
