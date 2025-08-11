/**
 * Service Account Setup Helper
 * 
 * This script helps you verify and set up Google Service Account authentication
 * for the Property Insights Tool Google Sheets integration.
 */

console.log('🔧 Google Service Account Setup Helper\n')

// Check if service account credentials are set
const serviceAccountEmail = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
const serviceAccountKey = process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
const projectId = process.env.GOOGLE_PROJECT_ID

console.log('📋 Environment Variables Check:')
console.log(`   GOOGLE_SERVICE_ACCOUNT_EMAIL: ${serviceAccountEmail ? '✅ Set' : '❌ Missing'}`)
console.log(`   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY: ${serviceAccountKey ? '✅ Set' : '❌ Missing'}`)
console.log(`   GOOGLE_PROJECT_ID: ${projectId || 'my-project-db-389005 (default)'}`)

if (!serviceAccountEmail || !serviceAccountKey) {
  console.log('\n❌ Service Account credentials are not properly configured.')
  console.log('\n📝 To set up Service Account authentication:')
  console.log('\n1. Create a .env.local file in your project root with:')
  console.log('   GOOGLE_SERVICE_ACCOUNT_EMAIL=lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com')
  console.log('   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\\nYOUR_PRIVATE_KEY_HERE\\n-----END PRIVATE KEY-----\\n"')
  console.log('   GOOGLE_SERVICE_ACCOUNT_KEY_ID=c5d7aaff84fb15c6df322dbb430228481418ec71')
  console.log('   GOOGLE_PROJECT_ID=my-project-db-389005')
  console.log('\n2. Get the private key from Google Cloud Console:')
  console.log('   - Go to: https://console.cloud.google.com/iam-admin/serviceaccounts?project=my-project-db-389005')
  console.log('   - Find: lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com')
  console.log('   - Click "Actions" > "Manage keys"')
  console.log('   - Click "Add Key" > "Create new key" > "JSON"')
  console.log('   - Copy the "private_key" field from the downloaded JSON')
  console.log('\n3. Share the spreadsheet with the service account:')
  console.log('   - Open: https://docs.google.com/spreadsheets/d/10XVAxEPF6ZfD2zlqPB0kvSyQOP41z8iF6GD9vrG4qHg')
  console.log('   - Click "Share"')
  console.log('   - Add: lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com')
  console.log('   - Set permission: Viewer')
  
  process.exit(1)
}

console.log('\n✅ Service Account credentials are configured!')
console.log('\n🧪 Testing authentication...')

// Test authentication
async function testServiceAccount() {
  try {
    const { GoogleAuth } = require('google-auth-library')
    
    const credentials = {
      type: "service_account",
      project_id: projectId || "my-project-db-389005",
      private_key_id: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_ID || "c5d7aaff84fb15c6df322dbb430228481418ec71",
      private_key: serviceAccountKey.replace(/\\n/g, '\n'),
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

    const authClient = await auth.getClient()
    const accessToken = await authClient.getAccessToken()

    if (accessToken.token) {
      console.log('✅ Authentication successful!')
      console.log(`   Service Account: ${serviceAccountEmail}`)
      console.log(`   Project ID: ${projectId || "my-project-db-389005"}`)
      
      // Test spreadsheet access
      console.log('\n📊 Testing spreadsheet access...')
      const spreadsheetId = '10XVAxEPF6ZfD2zlqPB0kvSyQOP41z8iF6GD9vrG4qHg'
      const url = `https://sheets.googleapis.com/v4/spreadsheets/${spreadsheetId}?fields=sheets.properties.title`
      
      const response = await fetch(url, {
        headers: {
          'Authorization': `Bearer ${accessToken.token}`,
          'Content-Type': 'application/json'
        }
      })

      if (response.ok) {
        const data = await response.json()
        const sheetNames = data.sheets?.map(sheet => sheet.properties.title) || []
        console.log(`✅ Spreadsheet access successful!`)
        console.log(`   Available sheets: ${sheetNames.join(', ')}`)
        
        const targetSheets = Array.from({ length: 14 }, (_, i) => `Room ${i + 1}`)
        const missingSheets = targetSheets.filter(name => !sheetNames.includes(name))
        
        if (missingSheets.length === 0) {
          console.log('🎉 All Room sheets (1-14) are available!')
        } else {
          console.log(`⚠️  Missing sheets: ${missingSheets.join(', ')}`)
        }
      } else {
        const errorData = await response.json().catch(() => null)
        console.log(`❌ Spreadsheet access failed: ${response.status} ${response.statusText}`)
        if (errorData) {
          console.log(`   Error: ${errorData.error?.message || 'Unknown error'}`)
        }
        console.log('\n🔧 To fix spreadsheet access:')
        console.log('   1. Share the spreadsheet with the service account')
        console.log('   2. Make sure the service account has at least "Viewer" permission')
      }
    } else {
      console.log('❌ Failed to obtain access token')
    }

  } catch (error) {
    console.log('❌ Authentication test failed:')
    console.log(`   Error: ${error.message}`)
    
    if (error.message.includes('private_key')) {
      console.log('\n🔧 Private key format issue:')
      console.log('   - Make sure the private key includes the full PEM format')
      console.log('   - Include -----BEGIN PRIVATE KEY----- and -----END PRIVATE KEY-----')
      console.log('   - Ensure newlines are properly escaped as \\n in the environment variable')
    }
  }
}

// Run the test
testServiceAccount().catch(console.error)
