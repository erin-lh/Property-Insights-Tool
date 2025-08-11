# Google Service Account Setup Guide

## Overview

The Property Insights Tool now uses Google Service Account authentication for Google Sheets integration. This is more secure and reliable than API keys, especially for production environments.

## 🔐 Service Account Details

- **Service Account Email**: `lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com`
- **Project ID**: `my-project-db-389005`
- **Key ID**: `c5d7aaff84fb15c6df322dbb430228481418ec71`

## 🚀 Quick Setup

### 1. Get the Private Key

You'll need to obtain the private key for the service account:

1. **Go to Google Cloud Console**: https://console.cloud.google.com/iam-admin/serviceaccounts?project=my-project-db-389005
2. **Find the service account**: `lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com`
3. **Click "Actions"** → **"Manage keys"**
4. **Create a new key** (if needed): Click "Add Key" → "Create new key" → "JSON"
5. **Copy the private key** from the downloaded JSON file (the `private_key` field)

### 2. Configure Environment Variables

Create a `.env.local` file in your project root:

```bash
# Google Service Account Configuration
GOOGLE_SERVICE_ACCOUNT_EMAIL=lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_SERVICE_ACCOUNT_KEY_ID=c5d7aaff84fb15c6df322dbb430228481418ec71
GOOGLE_PROJECT_ID=my-project-db-389005
```

**Important**: 
- Replace `YOUR_PRIVATE_KEY_HERE` with the actual private key
- Keep the quotes around the private key
- Ensure newlines are escaped as `\n`

### 3. Share Spreadsheet with Service Account

1. **Open the spreadsheet**: https://docs.google.com/spreadsheets/d/10XVAxEPF6ZfD2zlqPB0kvSyQOP41z8iF6GD9vrG4qHg
2. **Click "Share"**
3. **Add the service account email**: `lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com`
4. **Set permission to "Viewer"**
5. **Click "Send"**

### 4. Test the Setup

Run the setup helper script:

```bash
# Set environment variables and run the test
npm run test:service-account

# Or test using the API endpoint
npm run dev
# Then visit: http://localhost:3000/api/sheets?action=test
```

## 🛠️ Vercel Deployment

For production deployment on Vercel:

1. **Go to your Vercel project dashboard**
2. **Navigate to "Settings" → "Environment Variables"**
3. **Add the following variables**:
   - `GOOGLE_SERVICE_ACCOUNT_EMAIL` = `lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com`
   - `GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY` = `-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n`
   - `GOOGLE_SERVICE_ACCOUNT_KEY_ID` = `c5d7aaff84fb15c6df322dbb430228481418ec71`
   - `GOOGLE_PROJECT_ID` = `my-project-db-389005`
4. **Redeploy your application**

## 🔧 Troubleshooting

### Common Issues:

1. **"Authentication failed"**
   - Check that the private key is correctly formatted
   - Ensure all required environment variables are set
   - Verify the service account exists in the project

2. **"Access denied to spreadsheet"**
   - Make sure the spreadsheet is shared with the service account
   - Verify the service account has at least "Viewer" permission
   - Check that the spreadsheet ID is correct

3. **"Private key format error"**
   - Ensure the private key includes `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
   - Make sure newlines are escaped as `\n` in the environment variable
   - Don't include extra spaces or characters

### Test Commands:

```bash
# Test service account setup
node scripts/setup-service-account.js

# Test API endpoint
curl "http://localhost:3000/api/sheets?action=test"

# Check environment variables
echo $GOOGLE_SERVICE_ACCOUNT_EMAIL
```

## 🎯 Benefits of Service Account Authentication

- **Security**: No API keys to manage or expose
- **Reliability**: More stable authentication for server-to-server communication
- **Granular Control**: Specific permissions for the service account
- **Production Ready**: Designed for production environments
- **Vercel Compatible**: Works seamlessly with Vercel's environment variable system

## 📋 Migration from API Key

If you were previously using an API key, the service account method is now the recommended approach. The old API key method is still supported as a fallback, but service account authentication is more secure and reliable.

To migrate:
1. Set up the service account environment variables (above)
2. Remove or comment out `GOOGLE_SHEETS_API_KEY` from your environment
3. Test the service account authentication
4. Deploy with the new environment variables

## 🚀 Next Steps

Once configured, your Google Sheets integration will:
- ✅ Fetch data from Room 1-14 sheets
- ✅ Display sync indicators on room cards
- ✅ Show additional details in room modals
- ✅ Provide real-time data refresh capabilities
- ✅ Handle errors gracefully with detailed diagnostics
