# Google Sheets Integration Troubleshooting Guide

## Quick Diagnostics

### 1. Test Service Account Authentication (Recommended)
\`\`\`bash
# Test the service account connection
curl "http://localhost:3000/api/sheets?action=test"

# Or if you prefer the diagnostic script (API key method)
node scripts/test-sheets-connection.js
\`\`\`

### 2. Check Environment Variables
\`\`\`bash
# Verify your service account credentials are set
echo $GOOGLE_SERVICE_ACCOUNT_EMAIL
echo $GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
# On Windows:
echo %GOOGLE_SERVICE_ACCOUNT_EMAIL%
echo %GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY%
\`\`\`

## Authentication Methods

### Method 1: Service Account Authentication (Recommended for Production)

Service Account authentication is more secure and reliable than API keys, especially for server-to-server communication.

**Advantages:**
- More secure (no API key exposure)
- Better for production environments
- Granular permission control
- Works reliably with Vercel and other hosting platforms

**Setup:**

1. **Ensure Service Account Exists**
   - Service Account Email: `lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com`
   - Project ID: `my-project-db-389005`

2. **Set Environment Variables**
   \`\`\`bash
   GOOGLE_SERVICE_ACCOUNT_EMAIL=lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com
   GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
   GOOGLE_SERVICE_ACCOUNT_KEY_ID=c5d7aaff84fb15c6df322dbb430228481418ec71
   GOOGLE_PROJECT_ID=my-project-db-389005
   \`\`\`

3. **Share Spreadsheet with Service Account**
   - Open your Google Spreadsheet
   - Click "Share" button
   - Add the service account email: `lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com`
   - Set permission to "Viewer"

### Method 2: API Key Authentication (Legacy)

## Common Error Solutions

### Error: "Access denied to sheet Room X"

**Cause:** This is a 403 Forbidden error indicating permission issues.

**Solutions:**

1. **Check API Key Validity**
   - Ensure your Google Sheets API key is correct
   - Verify the key hasn't expired or been revoked
   - Test with a simple API call: `https://sheets.googleapis.com/v4/spreadsheets/SHEET_ID?key=YOUR_KEY`

2. **Enable Google Sheets API**
   - Go to [Google Cloud Console](https://console.cloud.google.com/)
   - Navigate to "APIs & Services" > "Library"
   - Search for "Google Sheets API"
   - Click "Enable" if not already enabled

3. **Check Spreadsheet Permissions**
   - Option A: Make spreadsheet publicly viewable
     - Open your Google Sheet
     - Click "Share" button
     - Change "Restricted" to "Anyone with the link"
     - Set permission to "Viewer"
   
   - Option B: Use Service Account (Recommended for production)
     - Create a service account in Google Cloud Console
     - Download the JSON key file
     - Share your Google Sheet with the service account email
     - Use OAuth2 instead of API key

4. **API Key Restrictions**
   - In Google Cloud Console, go to "APIs & Services" > "Credentials"
   - Click on your API key
   - Under "API restrictions", ensure "Google Sheets API" is allowed
   - Under "Application restrictions", check if IP/domain restrictions are blocking your requests

### Error: "Sheet 'Room X' not found"

**Cause:** The sheet name doesn't exist in the spreadsheet.

**Solutions:**

1. **Verify Sheet Names**
   - Check that sheets are named exactly "Room 1", "Room 2", etc. (case-sensitive)
   - No extra spaces or different naming conventions

2. **Check Spreadsheet ID**
   - Verify the spreadsheet ID in the URL: `10XVAxEPF6ZfD2zlqPB0kvSyQOP41z8iF6GD9vrG4qHg`
   - Make sure you're using the correct spreadsheet

### Error: "GOOGLE_SHEETS_API_KEY environment variable is not set"

**Solutions:**

1. **Local Development**
   \`\`\`bash
   # Create a .env.local file in your project root
   echo "GOOGLE_SHEETS_API_KEY=your_api_key_here" > .env.local
   \`\`\`

2. **Production (Vercel)**
   - Go to your Vercel project dashboard
   - Navigate to "Settings" > "Environment Variables"
   - Add: `GOOGLE_SHEETS_API_KEY` with your API key value
   - Redeploy your application

3. **Production (Other platforms)**
   - Set the environment variable in your hosting platform's configuration
   - Restart your application after setting the variable

### Error: "Rate limit exceeded"

**Cause:** Too many API requests in a short time.

**Solutions:**

1. **Use Caching** (Already implemented)
   - The system caches data for 5 minutes
   - Avoid refreshing too frequently

2. **Increase Quotas**
   - Go to Google Cloud Console > "APIs & Services" > "Quotas"
   - Request quota increases if needed

## Google Cloud Console Setup Guide

### Step 1: Create a Project
1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Click "Select a project" > "New Project"
3. Give your project a name
4. Click "Create"

### Step 2: Enable Google Sheets API
1. In your project, go to "APIs & Services" > "Library"
2. Search for "Google Sheets API"
3. Click on it and press "Enable"

### Step 3: Create API Key
1. Go to "APIs & Services" > "Credentials"
2. Click "Create Credentials" > "API Key"
3. Copy the generated API key
4. (Optional) Click "Restrict Key" to add security restrictions

### Step 4: Configure API Key (Recommended)
1. Click on your API key to edit it
2. Under "API restrictions":
   - Select "Restrict key"
   - Choose "Google Sheets API"
3. Under "Application restrictions" (optional):
   - Add your domain/IP restrictions for security

## Testing Your Setup

### Manual API Test
\`\`\`bash
# Replace YOUR_API_KEY and test basic connectivity
curl "https://sheets.googleapis.com/v4/spreadsheets/10XVAxEPF6ZfD2zlqPB0kvSyQOP41z8iF6GD9vrG4qHg?key=YOUR_API_KEY"
\`\`\`

### Test Specific Sheet
\`\`\`bash
# Test fetching data from Room 1
curl "https://sheets.googleapis.com/v4/spreadsheets/10XVAxEPF6ZfD2zlqPB0kvSyQOP41z8iF6GD9vrG4qHg/values/Room%201!A:Z?key=YOUR_API_KEY"
\`\`\`

### Use Our Diagnostic Tool
\`\`\`bash
# Run the comprehensive test script
GOOGLE_SHEETS_API_KEY=your_key_here node scripts/test-sheets-connection.js
\`\`\`

## Security Best Practices

1. **Use Environment Variables**
   - Never commit API keys to version control
   - Use `.env.local` for local development
   - Set environment variables in production

2. **Restrict API Keys**
   - Limit API access to only Google Sheets API
   - Add domain/IP restrictions when possible

3. **Consider Service Accounts**
   - For production applications, use OAuth2 with service accounts
   - More secure than API keys for server-to-server communication

4. **Monitor Usage**
   - Check Google Cloud Console for API usage
   - Set up alerts for unusual activity

## Production Deployment Checklist

- [ ] Google Sheets API enabled in Google Cloud Console
- [ ] API key created and properly restricted
- [ ] Environment variable `GOOGLE_SHEETS_API_KEY` set in production
- [ ] Spreadsheet is publicly accessible or shared with service account
- [ ] All target sheets (Room 1-14) exist in the spreadsheet
- [ ] API quota limits are sufficient for your usage
- [ ] Error monitoring is in place to catch API failures

## Getting Help

If you're still experiencing issues:

1. **Check the browser console** for detailed error messages
2. **Run the diagnostic script** to identify specific problems
3. **Check Google Cloud Console logs** for API request details
4. **Review the API response** using the test endpoint: `/api/sheets?action=test`

For Google Sheets API specific issues, refer to the [official documentation](https://developers.google.com/sheets/api/guides/concepts).
