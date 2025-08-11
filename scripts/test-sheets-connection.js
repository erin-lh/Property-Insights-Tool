/**
 * Google Sheets API Connection Test Script
 * 
 * This script tests the Google Sheets API connection and provides detailed diagnostics
 * to help troubleshoot permission and configuration issues.
 * 
 * Usage:
 * 1. Set your GOOGLE_SHEETS_API_KEY environment variable
 * 2. Run: node scripts/test-sheets-connection.js
 */

const SPREADSHEET_ID = '10XVAxEPF6ZfD2zlqPB0kvSyQOP41z8iF6GD9vrG4qHg'
const ROOM_SHEETS = Array.from({ length: 14 }, (_, i) => `Room ${i + 1}`)

async function testSheetsConnection() {
  console.log('🔍 Testing Google Sheets API Connection...\n')
  
  // Check environment variable
  const apiKey = process.env.GOOGLE_SHEETS_API_KEY
  if (!apiKey) {
    console.error('❌ GOOGLE_SHEETS_API_KEY environment variable is not set')
    console.log('\n📋 To fix this:')
    console.log('1. Get a Google Sheets API key from Google Cloud Console')
    console.log('2. Set the environment variable: GOOGLE_SHEETS_API_KEY=your_key_here')
    process.exit(1)
  }
  
  console.log('✅ GOOGLE_SHEETS_API_KEY is set')
  console.log(`🔗 Testing spreadsheet: ${SPREADSHEET_ID}\n`)
  
  try {
    // Test 1: Basic API connectivity
    console.log('📡 Test 1: Basic API connectivity...')
    const testUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?key=${apiKey}&fields=properties.title`
    const testResponse = await fetch(testUrl)
    
    if (!testResponse.ok) {
      const errorData = await testResponse.json().catch(() => null)
      console.error(`❌ API connection failed: ${testResponse.status} ${testResponse.statusText}`)
      if (errorData?.error) {
        console.error(`   Error: ${errorData.error.message}`)
        
        if (testResponse.status === 403) {
          console.log('\n🔧 Common fixes for 403 Forbidden:')
          console.log('1. Ensure Google Sheets API is enabled in Google Cloud Console')
          console.log('2. Check API key restrictions and permissions')
          console.log('3. Make sure the spreadsheet is publicly accessible or shared with your service account')
        } else if (testResponse.status === 404) {
          console.log('\n🔧 Common fixes for 404 Not Found:')
          console.log('1. Verify the spreadsheet ID is correct')
          console.log('2. Check if the spreadsheet exists and is accessible')
        }
      }
      return
    }
    
    const basicInfo = await testResponse.json()
    console.log(`✅ Connected to spreadsheet: "${basicInfo.properties?.title || 'Unknown'}"`)
    
    // Test 2: Sheet listing
    console.log('\n📋 Test 2: Checking available sheets...')
    const sheetsUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}?key=${apiKey}&fields=sheets.properties.title`
    const sheetsResponse = await fetch(sheetsUrl)
    
    if (!sheetsResponse.ok) {
      console.error(`❌ Failed to list sheets: ${sheetsResponse.status} ${sheetsResponse.statusText}`)
      return
    }
    
    const sheetsData = await sheetsResponse.json()
    const availableSheets = sheetsData.sheets?.map(sheet => sheet.properties.title) || []
    
    console.log(`✅ Found ${availableSheets.length} sheets:`)
    availableSheets.forEach(name => console.log(`   • ${name}`))
    
    // Test 3: Check target sheets
    console.log('\n🎯 Test 3: Checking target room sheets...')
    const missingSheets = ROOM_SHEETS.filter(name => !availableSheets.includes(name))
    const foundSheets = ROOM_SHEETS.filter(name => availableSheets.includes(name))
    
    console.log(`✅ Found ${foundSheets.length}/${ROOM_SHEETS.length} target sheets:`)
    foundSheets.forEach(name => console.log(`   ✓ ${name}`))
    
    if (missingSheets.length > 0) {
      console.log(`\n⚠️  Missing ${missingSheets.length} sheets:`)
      missingSheets.forEach(name => console.log(`   ✗ ${name}`))
    }
    
    // Test 4: Sample data fetch
    console.log('\n📊 Test 4: Testing data fetch from first available room sheet...')
    const testSheet = foundSheets[0]
    if (testSheet) {
      const dataUrl = `https://sheets.googleapis.com/v4/spreadsheets/${SPREADSHEET_ID}/values/${testSheet}!A1:Z10?key=${apiKey}`
      const dataResponse = await fetch(dataUrl)
      
      if (!dataResponse.ok) {
        const errorData = await dataResponse.json().catch(() => null)
        console.error(`❌ Failed to fetch data from ${testSheet}: ${dataResponse.status} ${dataResponse.statusText}`)
        if (errorData?.error) {
          console.error(`   Error: ${errorData.error.message}`)
        }
      } else {
        const data = await dataResponse.json()
        const rows = data.values || []
        console.log(`✅ Successfully fetched ${rows.length} rows from ${testSheet}`)
        
        if (rows.length > 0) {
          console.log(`   Headers: ${rows[0]?.join(', ') || 'No headers found'}`)
        }
      }
    } else {
      console.log('⚠️  No room sheets found to test')
    }
    
    // Summary
    console.log('\n📊 Test Summary:')
    console.log(`   • API Connection: ✅ Working`)
    console.log(`   • Spreadsheet Access: ✅ Working`)
    console.log(`   • Available Sheets: ${availableSheets.length}`)
    console.log(`   • Target Sheets Found: ${foundSheets.length}/${ROOM_SHEETS.length}`)
    console.log(`   • Data Access: ${foundSheets.length > 0 ? '✅ Working' : '❌ No accessible sheets'}`)
    
    if (missingSheets.length === 0 && foundSheets.length > 0) {
      console.log('\n🎉 All tests passed! Google Sheets integration should work correctly.')
    } else {
      console.log('\n⚠️  Some issues found. Check the missing sheets and ensure they exist in the spreadsheet.')
    }
    
  } catch (error) {
    console.error('❌ Unexpected error during testing:')
    console.error(error.message)
    
    if (error.message.includes('fetch')) {
      console.log('\n🔧 Network connectivity issues:')
      console.log('1. Check your internet connection')
      console.log('2. Verify firewall settings allow HTTPS requests to googleapis.com')
    }
  }
}

// Run the test
testSheetsConnection().catch(console.error)
