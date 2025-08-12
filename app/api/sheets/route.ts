import { type NextRequest, NextResponse } from "next/server"

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
function base64UrlEncode(data: string | Buffer): string {
  let base64 = ""
  if (typeof data === "string") {
    base64 = Buffer.from(data, "utf8").toString("base64")
  } else {
    base64 = data.toString("base64")
  }

  return base64.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") // Remove trailing padding
}

async function sign(message: string, privateKey: string): Promise<string> {
  try {
    const crypto = await import("crypto")

    if (!privateKey || typeof privateKey !== "string") {
      throw new Error("Private key is required and must be a string")
    }

    // Clean the private key - handle various formats
    let cleanKey = privateKey.trim()

    // Handle quoted keys
    if (cleanKey.startsWith('"') && cleanKey.endsWith('"')) {
      cleanKey = cleanKey.slice(1, -1)
    }

    // Replace escaped newlines with actual newlines
    cleanKey = cleanKey.replace(/\\n/g, "\n")

    // Ensure proper PEM format
    if (!cleanKey.includes("-----BEGIN PRIVATE KEY-----")) {
      throw new Error("Private key must be in PEM format with -----BEGIN PRIVATE KEY----- header")
    }

    if (!cleanKey.includes("-----END PRIVATE KEY-----")) {
      throw new Error("Private key must be in PEM format with -----END PRIVATE KEY----- footer")
    }

    // Clean up the key format - remove extra whitespace and ensure proper line breaks
    const lines = cleanKey
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line.length > 0)
    const beginIndex = lines.findIndex((line) => line === "-----BEGIN PRIVATE KEY-----")
    const endIndex = lines.findIndex((line) => line === "-----END PRIVATE KEY-----")

    if (beginIndex === -1 || endIndex === -1) {
      throw new Error("Invalid PEM format: could not find proper BEGIN/END markers")
    }

    // Extract the key content and reformat it properly
    const keyContent = lines.slice(beginIndex + 1, endIndex).join("")
    const formattedContent = keyContent.match(/.{1,64}/g)?.join("\n") || keyContent

    const finalKey = ["-----BEGIN PRIVATE KEY-----", formattedContent, "-----END PRIVATE KEY-----"].join("\n")

    console.log("Private key format validated, length:", finalKey.length)

    // Create signature
    const signer = crypto.createSign("RSA-SHA256")
    signer.update(message, "utf8")
    signer.end()

    const signature = signer.sign(finalKey)
    return base64UrlEncode(signature)
  } catch (error) {
    console.error("JWT signing error:", error)
    throw new Error(`Failed to sign JWT: ${error instanceof Error ? error.message : "Unknown signing error"}`)
  }
}

async function createJWT(): Promise<string> {
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY

  if (!serviceAccountEmail || !serviceAccountKey) {
    throw new Error(
      "Missing Google Service Account credentials. Please set GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY environment variables.",
    )
  }

  // Validate email format
  if (!serviceAccountEmail.includes("@") || !serviceAccountEmail.includes(".iam.gserviceaccount.com")) {
    throw new Error("Invalid service account email format. Expected format: name@project.iam.gserviceaccount.com")
  }

  const now = Math.floor(Date.now() / 1000)
  const expiry = now + 3600 // 1 hour from now

  // JWT Header
  const header = {
    alg: "RS256",
    typ: "JWT",
  }

  // JWT Payload for Google Service Account
  const payload = {
    iss: serviceAccountEmail, // Issuer: service account email
    sub: serviceAccountEmail, // Subject: same as issuer for service accounts
    aud: "https://oauth2.googleapis.com/token", // Audience: Google's token endpoint
    iat: now, // Issued at
    exp: expiry, // Expires at
    scope: "https://www.googleapis.com/auth/spreadsheets.readonly", // Required scope
  }

  try {
    // Encode header and payload
    const headerEncoded = base64UrlEncode(JSON.stringify(header))
    const payloadEncoded = base64UrlEncode(JSON.stringify(payload))
    const message = `${headerEncoded}.${payloadEncoded}`

    console.log("JWT creation - Email:", serviceAccountEmail.substring(0, 20) + "...")
    console.log("JWT creation - Payload IAT:", new Date(now * 1000).toISOString())
    console.log("JWT creation - Payload EXP:", new Date(expiry * 1000).toISOString())

    // Sign the message
    const signature = await sign(message, serviceAccountKey)
    const jwt = `${message}.${signature}`

    console.log("JWT created successfully, length:", jwt.length)
    return jwt
  } catch (error) {
    console.error("JWT creation failed:", error)
    throw new Error(`Failed to create JWT: ${error instanceof Error ? error.message : "Unknown error"}`)
  }
}

// Get access token using JWT assertion
async function getAccessToken(): Promise<string> {
  try {
    console.log("=== Google OAuth2 Token Request ===")
    const jwt = await createJWT()

    const tokenRequest = {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams({
        grant_type: "urn:ietf:params:oauth:grant-type:jwt-bearer",
        assertion: jwt,
      }),
    }

    console.log("Sending token request to Google OAuth2...")
    const response = await fetch("https://oauth2.googleapis.com/token", tokenRequest)

    const responseText = await response.text()
    console.log("OAuth2 response status:", response.status)

    if (!response.ok) {
      console.error("OAuth2 error response:", responseText)

      // Try to parse error details
      try {
        const errorData = JSON.parse(responseText)
        if (errorData.error === "invalid_grant") {
          throw new Error(
            `Google OAuth2 authentication failed: ${errorData.error_description || "Invalid JWT signature"}. Please check your service account private key and email configuration.`,
          )
        } else {
          throw new Error(`Google OAuth2 error: ${errorData.error} - ${errorData.error_description || "Unknown error"}`)
        }
      } catch (parseError) {
        throw new Error(`Google OAuth2 request failed with status ${response.status}: ${responseText}`)
      }
    }

    let tokenData
    try {
      tokenData = JSON.parse(responseText)
    } catch (parseError) {
      throw new Error("Invalid JSON response from Google OAuth2 service")
    }

    if (!tokenData.access_token) {
      console.error("No access token in response:", tokenData)
      throw new Error("Google OAuth2 response missing access_token")
    }

    console.log("✓ Successfully obtained access token")
    return tokenData.access_token
  } catch (error) {
    console.error("Access token request failed:", error)
    throw new Error(`Authentication failed: ${error instanceof Error ? error.message : "Unknown authentication error"}`)
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
      GOOGLE_SERVICE_ACCOUNT_EMAIL: serviceAccountEmail ? "✅ Set" : "❌ Missing",
      GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: serviceAccountKey ? "✅ Set" : "❌ Missing",
      GOOGLE_PROJECT_ID: projectId || "Using default: my-project-db-389005",
    }

    // Test 2: Try to get access token
    let authTest = "❌ Failed"
    let authError = ""

    try {
      const token = await getAccessToken()
      authTest = token ? "✅ Success" : "❌ No token received"
    } catch (error) {
      authError = error instanceof Error ? error.message : "Unknown error"
    }

    // Test 3: Try to access spreadsheet
    let apiTest = "❌ Failed"
    let apiError = ""

    try {
      if (authTest.includes("✅")) {
        const token = await getAccessToken()
        const response = await fetch(
          `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?fields=sheets.properties.title`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          },
        )

        if (response.ok) {
          apiTest = "✅ Success"
        } else {
          const errorData = await response.text()
          apiError = `HTTP ${response.status}: ${errorData}`
        }
      }
    } catch (error) {
      apiError = error instanceof Error ? error.message : "Unknown error"
    }

    return {
      status: "diagnostic",
      timestamp: new Date().toISOString(),
      tests: {
        environmentVariables: envCheck,
        authentication: authTest,
        apiAccess: apiTest,
      },
      errors: {
        auth: authError,
        api: apiError,
      },
      instructions: authTest.includes("❌")
        ? {
            setup: "Configure Service Account credentials",
            steps: [
              "1. Create .env.local file with GOOGLE_SERVICE_ACCOUNT_EMAIL and GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY",
              "2. Get private key from Google Cloud Console Service Account",
              "3. Share spreadsheet with service account email",
              "4. Ensure Google Sheets API is enabled",
            ],
          }
        : undefined,
    }
  } catch (error) {
    return {
      status: "error",
      message: error instanceof Error ? error.message : "Unknown diagnostic error",
      timestamp: new Date().toISOString(),
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
        method: "GET",
        headers: {
          Authorization: `Bearer ${accessToken}`,
          "Content-Type": "application/json",
        },
      },
    )

    if (!response.ok) {
      if (response.status === 403) {
        throw new Error(
          `Access denied to sheet ${sheetName}. Please ensure the service account (${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL}) has access to the spreadsheet.`,
        )
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
          if (typeof value === "string" && !isNaN(Number(value)) && value.trim() !== "") {
            sheetData[key] = Number(value)
          } else if (typeof value === "string" && (value.toLowerCase() === "true" || value.toLowerCase() === "false")) {
            sheetData[key] = value.toLowerCase() === "true"
          } else {
            sheetData[key] = value || ""
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
    { roomId: "room-1", roomType: "Living Room", sheetName: "Room 1" },
    { roomId: "room-2", roomType: "Kitchen", sheetName: "Room 2" },
    { roomId: "room-3", roomType: "Bathroom", sheetName: "Room 3" },
    { roomId: "room-4", roomType: "Bedroom", sheetName: "Room 4" },
    { roomId: "room-5", roomType: "Bedroom", sheetName: "Room 5" },
    { roomId: "room-6", roomType: "Bedroom", sheetName: "Room 6" },
    { roomId: "room-7", roomType: "Bedroom", sheetName: "Room 7" },
    { roomId: "room-8", roomType: "Bedroom", sheetName: "Room 8" },
    { roomId: "room-9", roomType: "Bedroom", sheetName: "Room 9" },
    { roomId: "room-10", roomType: "Bedroom", sheetName: "Room 10" },
    { roomId: "room-11", roomType: "Bedroom", sheetName: "Room 11" },
    { roomId: "room-12", roomType: "Bedroom", sheetName: "Room 12" },
    { roomId: "room-13", roomType: "Bedroom", sheetName: "Room 13" },
  ]

  // Check if authentication is properly configured
  const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
  const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY

  if (!serviceAccountEmail || !serviceAccountKey) {
    console.warn("Google Service Account not configured, returning error data")
    return roomSheets.map((room) => ({
      roomId: room.roomId,
      roomType: room.roomType,
      sheetData: {
        error: "Google Service Account not configured. Please set environment variables.",
        fallback: "CSV data will be used instead",
      },
    }))
  }

  // Test authentication before attempting to fetch all sheets
  try {
    await getAccessToken()
  } catch (authError) {
    console.error("Authentication failed, returning error data:", authError)
    return roomSheets.map((room) => ({
      roomId: room.roomId,
      roomType: room.roomType,
      sheetData: {
        error: `Authentication failed: ${authError instanceof Error ? authError.message : "Unknown error"}`,
        fallback: "CSV data will be used instead",
        authIssue: true,
      },
    }))
  }

  const results = await Promise.allSettled(
    roomSheets.map(async (room) => {
      try {
        const sheetData = await fetchSheetData(room.sheetName)
        return {
          roomId: room.roomId,
          roomType: room.roomType,
          sheetData,
        }
      } catch (error) {
        console.error(`Error fetching sheet ${room.sheetName}:`, error)
        return {
          roomId: room.roomId,
          roomType: room.roomType,
          sheetData: {
            error: `Failed to load data: ${error instanceof Error ? error.message : "Unknown error"}`,
            fallback: "CSV data will be used instead",
          },
        }
      }
    }),
  )

  return results.map((result, index) => {
    if (result.status === "fulfilled") {
      return result.value
    } else {
      return {
        roomId: roomSheets[index].roomId,
        roomType: roomSheets[index].roomType,
        sheetData: {
          error: `Failed to load: ${result.reason instanceof Error ? result.reason.message : "Unknown error"}`,
          fallback: "CSV data will be used instead",
        },
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
    const action = searchParams.get("action")

    // Handle diagnostic test
    if (action === "test") {
      const diagnosticResult = await handleDiagnosticTest()
      return NextResponse.json(diagnosticResult, {
        status: 200,
        headers: {
          "Cache-Control": "no-store, max-age=0",
        },
      })
    }

    // Check cache first
    const cacheKey = "all-rooms"
    const cached = cache.get(cacheKey)

    if (cached && Date.now() - cached.timestamp < CACHE_DURATION) {
      return NextResponse.json({
        data: cached.data,
        source: "cache",
        timestamp: cached.timestamp,
      })
    }

    // Fetch fresh data
    try {
      const roomData = await getAllRoomData()

      // Update cache
      cache.set(cacheKey, {
        data: roomData,
        timestamp: Date.now(),
      })

      return NextResponse.json({
        data: roomData,
        source: "live",
        timestamp: Date.now(),
      })
    } catch (authError) {
      // If it's an authentication error, return a more helpful response
      console.warn("Sheets API authentication failed, suggesting CSV fallback:", authError)

      return NextResponse.json(
        {
          error: "sheets_authentication_failed",
          message: "Google Sheets API authentication failed. Application will use CSV data instead.",
          details: authError instanceof Error ? authError.message : "Unknown authentication error",
          fallback: "csv_data",
          timestamp: Date.now(),
        },
        {
          status: 503, // Service Unavailable - temporary issue
          headers: {
            "Retry-After": "300", // Suggest retry after 5 minutes
            "Cache-Control": "no-store, max-age=0",
          },
        },
      )
    }
  } catch (error) {
    console.error("Sheets API Error:", error)

    return NextResponse.json(
      {
        error: "internal_server_error",
        message: "An unexpected error occurred",
        details: error instanceof Error ? error.message : "Unknown error occurred",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}

/**
 * Handle POST requests (for future use)
 */
export async function POST(request: NextRequest) {
  return NextResponse.json({ error: "Method not implemented" }, { status: 501 })
}
