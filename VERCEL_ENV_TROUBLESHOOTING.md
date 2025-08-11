# Vercel Environment Variables Troubleshooting Guide

## 🔍 Common Issues with Vercel Environment Variables

### Issue 1: Environment Variables Not Being Read

**Symptoms:**
- API returns "Google Service Account credentials not configured"
- Environment variables show as `undefined` in logs
- Works locally but fails on Vercel

**Solutions:**

#### ✅ Step 1: Verify Environment Variable Names
Ensure exact spelling and case sensitivity:
\`\`\`bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=your-email@project.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_KEY\n-----END PRIVATE KEY-----"
GOOGLE_PROJECT_ID=your-project-id
GOOGLE_SERVICE_ACCOUNT_KEY_ID=your-key-id
\`\`\`

#### ✅ Step 2: Set Variables for All Environments
In Vercel Dashboard > Project > Settings > Environment Variables:
- ☑️ **Production** (checked)
- ☑️ **Preview** (checked) 
- ☑️ **Development** (checked)

#### ✅ Step 3: Private Key Formatting
**Critical:** The private key must be properly escaped:

**❌ Wrong:**
\`\`\`
-----BEGIN PRIVATE KEY-----
MIIEvgIBADANBgkqhkiG9w0BAQEF...
-----END PRIVATE KEY-----
\`\`\`

**✅ Correct:**
\`\`\`
"-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEF...\n-----END PRIVATE KEY-----"
\`\`\`

#### ✅ Step 4: Redeploy After Adding Variables
Environment variables only take effect after redeployment:
1. Add/update variables in Vercel
2. Go to Deployments tab
3. Click "Redeploy" on latest deployment
4. OR push a new commit to trigger rebuild

### Issue 2: Private Key Encoding Problems

**Symptoms:**
- "Invalid private key format" errors
- JWT signing failures
- Authentication errors with Google

**Solutions:**

#### Method 1: Use Vercel CLI (Recommended)
\`\`\`bash
# Install Vercel CLI
npm i -g vercel

# Set environment variables (handles escaping automatically)
vercel env add GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
# Paste the full private key when prompted

vercel env add GOOGLE_SERVICE_ACCOUNT_EMAIL
# Enter: lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com
\`\`\`

#### Method 2: Manual Encoding
\`\`\`bash
# Convert private key to single line with \n
cat private-key.pem | sed ':a;N;$!ba;s/\n/\\n/g'
\`\`\`

### Issue 3: Scope and Permissions

**Symptoms:**
- "Access denied" errors
- "Insufficient permissions" messages
- 403 errors from Google Sheets API

**Solutions:**

#### ✅ Verify Service Account Permissions
1. Go to Google Cloud Console
2. IAM & Admin > Service Accounts
3. Find: `lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com`
4. Ensure it has "Viewer" or "Editor" role

#### ✅ Share Spreadsheet
1. Open: https://docs.google.com/spreadsheets/d/10XVAxEPF6ZfD2zlqPB0kvSyQOP41z8iF6GD9vrG4qHg
2. Click "Share"
3. Add: `lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com`
4. Set permission: "Viewer" (minimum) or "Editor"

### Issue 4: Vercel Function Timeouts

**Symptoms:**
- Functions timeout after 10 seconds
- Incomplete responses
- "Function execution timed out" errors

**Solutions:**

#### ✅ Update vercel.json
\`\`\`json
{
  "functions": {
    "app/api/sheets/route.ts": {
      "maxDuration": 30
    }
  }
}
\`\`\`

#### ✅ Optimize API Calls
- Use caching to reduce API calls
- Implement request batching
- Add timeout handling

## 🧪 Testing Environment Variables

### Local Testing
\`\`\`bash
# Test locally first
npm run test:service-account

# Check specific variables
node -e "console.log('EMAIL:', process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL)"
node -e "console.log('KEY EXISTS:', !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY)"
\`\`\`

### Vercel Testing
Add this temporary endpoint to test on Vercel:

**File: `app/api/env-test/route.ts`**
\`\`\`typescript
import { NextResponse } from 'next/server'

export async function GET() {
  return NextResponse.json({
    email: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
    projectId: process.env.GOOGLE_PROJECT_ID || 'not-set',
    nodeEnv: process.env.NODE_ENV,
    vercelEnv: process.env.VERCEL_ENV,
    timestamp: new Date().toISOString()
  })
}
\`\`\`

## 🔧 Quick Fix Commands

### Reset Everything
\`\`\`bash
# Clear Vercel environment variables
vercel env rm GOOGLE_SERVICE_ACCOUNT_EMAIL
vercel env rm GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
vercel env rm GOOGLE_PROJECT_ID

# Re-add them correctly
vercel env add GOOGLE_SERVICE_ACCOUNT_EMAIL
vercel env add GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY
vercel env add GOOGLE_PROJECT_ID

# Redeploy
vercel --prod
\`\`\`

### Force Rebuild
\`\`\`bash
# Option 1: Push empty commit
git commit --allow-empty -m "Force rebuild for env vars"
git push

# Option 2: Use Vercel CLI
vercel --prod --force
\`\`\`

## 📋 Verification Checklist

Before deploying, verify:

- [ ] ✅ Environment variables set in Vercel Dashboard
- [ ] ✅ All three environments checked (Production, Preview, Development)
- [ ] ✅ Private key properly escaped with `\n`
- [ ] ✅ Service account email is correct
- [ ] ✅ Spreadsheet shared with service account
- [ ] ✅ Google Sheets API enabled in project
- [ ] ✅ Function timeout set to 30 seconds
- [ ] ✅ Redeployed after adding variables

## 🆘 Still Not Working?

1. **Check Vercel Logs:**
   - Go to Vercel Dashboard > Functions
   - Check real-time logs for errors

2. **Test API Endpoints:**
   - `/api/health` - Shows environment detection
   - `/api/sheets?action=test` - Shows detailed diagnostics

3. **Contact Support:**
   - Include error messages from Vercel logs
   - Share environment variable setup (without private key)
   - Mention this troubleshooting guide

## 🎯 Common Error Messages

| Error | Cause | Solution |
|-------|-------|----------|
| "credentials not configured" | Missing env vars | Add to Vercel Dashboard |
| "Invalid private key format" | Bad escaping | Use `\n` for newlines |
| "Access denied" | Permissions | Share spreadsheet with service account |
| "Function timeout" | Slow API calls | Increase maxDuration |
| "404 Not Found" | Wrong spreadsheet ID | Verify SPREADSHEET_ID |

Remember: Environment variables on Vercel only take effect after redeployment! 🔄
