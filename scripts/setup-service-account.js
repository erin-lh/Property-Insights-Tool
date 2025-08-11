#!/usr/bin/env node

/**
 * Google Service Account Setup Helper
 * This script helps validate and test your Google Service Account configuration
 * for the Property Insights Tool (without google-auth-library dependency).
 */

console.log('🔧 Google Service Account Setup Helper\n')

// Check environment variables
const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
const projectId = process.env.GOOGLE_PROJECT_ID

console.log('📋 Environment Variables Check:')
console.log(`   GOOGLE_SERVICE_ACCOUNT_EMAIL: ${serviceAccountEmail ? '✅ Set' : '❌ Missing'}`)
console.log(`   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: ${serviceAccountKey ? '✅ Set' : '❌ Missing'}`)
console.log(`   GOOGLE_PROJECT_ID: ${projectId || 'my-project-db-389005 (default)'}\n`)

if (!serviceAccountEmail || !serviceAccountKey) {
  console.log('❌ Service Account credentials are not properly configured.\n')
  console.log('📝 To set up Service Account authentication:\n')
  console.log('1. Create a .env.local file in your project root with:')
  console.log('   GOOGLE_SERVICE_ACCOUNT_EMAIL=lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com')
  console.log('   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_PRIVATE_KEY_HERE\\n-----END PRIVATE KEY-----\\n"')
  console.log('   GOOGLE_SERVICE_ACCOUNT_KEY_ID=c5d7aaff84fb15c6df322dbb430228481418ec71')
  console.log('   GOOGLE_PROJECT_ID=my-project-db-389005\n')
  console.log('2. Get the private key from Google Cloud Console:')
  console.log('   - Go to: https://console.cloud.google.com/iam-admin/serviceaccounts?project=my-project-db-389005')
  console.log('   - Find: lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com')
  console.log('   - Click "Actions" > "Manage keys"')
  console.log('   - Click "Add Key" > "Create new key" > "JSON"')
  console.log('   - Copy the "private_key" field from the downloaded JSON\n')
  console.log('3. Share the spreadsheet with the service account:')
  console.log('   - Open: https://docs.google.com/spreadsheets/d/10XVAxEPF6ZfD2zlqPB0kvSyQOP41z8iF6GD9vrG4qHg')
  console.log('   - Click "Share"')
  console.log('   - Add: lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com')
  console.log('   - Set permission: Viewer\n')
  process.exit(1)
}

// Test the authentication by making a simple HTTP request
async function testAuthentication() {
  try {
    console.log('🧪 Testing Service Account Authentication...\n')

    // Create a simple JWT for testing
    const crypto = require('crypto')
    
    function base64UrlEncode(data) {
      return Buffer.from(data)
        .toString('base64')
        .replace(/\+/g, '-')
        .replace(/\//g, '_')
        .replace(/=/g, '')
    }

    function sign(message, privateKey) {
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

    const signature = sign(message, serviceAccountKey.replace(/\\n/g, '\n'))
    const jwt = `${message}.${signature}`

    // Get access token
    console.log('📡 Requesting access token from Google...')
    
    const tokenResponse = await fetch('https://oauth2.googleapis.com/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams({
        grant_type: 'urn:ietf:params:oauth:grant-type:jwt-bearer',
        assertion: jwt,
      }),
    })

    if (!tokenResponse.ok) {
      const errorText = await tokenResponse.text()
      throw new Error(`OAuth2 request failed: ${tokenResponse.status} ${errorText}`)
    }

    const tokenData = await tokenResponse.json()
    
    if (!tokenData.access_token) {
      throw new Error("No access token received from Google")
    }

    console.log('✅ Access token obtained successfully!')

    // Test spreadsheet access
    console.log('📊 Testing spreadsheet access...')
    
    const sheetsResponse = await fetch(
      'https://sheets.googleapis.com/v4/spreadsheets/10XVAxEPF6ZfD2zlqPB0kvSyQOP41z8iF6GD9vrG4qHg?fields=sheets.properties.title',
      {
        headers: {
          'Authorization': `Bearer ${tokenData.access_token}`,
          'Content-Type': 'application/json',
        },
      }
    )

    if (!sheetsResponse.ok) {
      const errorData = await sheetsResponse.text()
      throw new Error(`Sheets API error: ${sheetsResponse.status} ${errorData}`)
    }

    const sheetsData = await sheetsResponse.json()
    console.log('✅ Spreadsheet access successful!')
    console.log(`📋 Found ${sheetsData.sheets?.length || 0} sheets in the spreadsheet\n`)

    console.log('🎉 Service Account setup is working correctly!')
    console.log('✅ You can now use the application with Google Sheets integration.\n')
    console.log('🚀 The implementation now uses native Node.js crypto instead of google-auth-library')
    console.log('📦 This makes it fully compatible with Vercel and other serverless platforms!\n')

  } catch (error) {
    console.error('❌ Authentication test failed:', error.message)
    console.log('\n🔧 Troubleshooting steps:')
    console.log('1. Verify your private key is correctly formatted (includes \\n for newlines)')
    console.log('2. Ensure the service account email is correct')
    console.log('3. Check that the spreadsheet is shared with the service account')
    console.log('4. Verify Google Sheets API is enabled in your Google Cloud project')
    console.log('5. Make sure the service account key is not expired\n')
    process.exit(1)
  }
}

// Run the test
testAuthentication()
