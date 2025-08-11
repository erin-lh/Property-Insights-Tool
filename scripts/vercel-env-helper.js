#!/usr/bin/env node

/**
 * Vercel Environment Variable Helper
 * This script helps you properly set environment variables in Vercel
 */

console.log('🔧 Vercel Environment Variable Helper\n')

console.log('📋 Step-by-Step Guide to Fix Environment Variables in Vercel:\n')

console.log('1️⃣ **Go to Vercel Dashboard**')
console.log('   - Visit: https://vercel.com/dashboard')
console.log('   - Select your Property Insights Tool project\n')

console.log('2️⃣ **Navigate to Settings**')
console.log('   - Click on "Settings" tab')
console.log('   - Click on "Environment Variables" in the sidebar\n')

console.log('3️⃣ **Add Environment Variables**')
console.log('   Add these EXACT variable names:\n')

console.log('   🔑 **GOOGLE_SERVICE_ACCOUNT_EMAIL**')
console.log('   Value: lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com')
console.log('   ✅ Check: Production, Preview, Development\n')

console.log('   🔑 **GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY**')
console.log('   Value: "-----BEGIN PRIVATE KEY-----\\nYOUR_ACTUAL_PRIVATE_KEY_HERE\\n-----END PRIVATE KEY-----"')
console.log('   ⚠️  IMPORTANT: Replace \\n with actual newlines OR use the method below')
console.log('   ✅ Check: Production, Preview, Development\n')

console.log('   🔑 **GOOGLE_PROJECT_ID**')
console.log('   Value: my-project-db-389005')
console.log('   ✅ Check: Production, Preview, Development\n')

console.log('   🔑 **GOOGLE_SERVICE_ACCOUNT_KEY_ID**')
console.log('   Value: c5d7aaff84fb15c6df322dbb430228481418ec71')
console.log('   ✅ Check: Production, Preview, Development\n')

console.log('4️⃣ **Private Key Formatting Options**\n')

console.log('   **Option A: Use Vercel CLI (Recommended)**')
console.log('   ```bash')
console.log('   npm install -g vercel')
console.log('   vercel login')
console.log('   vercel link')
console.log('   vercel env add GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY')
console.log('   # Paste the full private key when prompted (with actual newlines)')
console.log('   ```\n')

console.log('   **Option B: Manual Entry**')
console.log('   - Copy your private key from Google Cloud Console')
console.log('   - Replace all actual newlines with \\n')
console.log('   - Wrap the entire thing in quotes\n')

console.log('5️⃣ **Verify Setup**')
console.log('   - After adding all variables, click "Save"')
console.log('   - Go to "Deployments" tab')
console.log('   - Click "Redeploy" on your latest deployment')
console.log('   - OR push a new commit to trigger rebuild\n')

console.log('6️⃣ **Test Your Deployment**')
console.log('   Visit these URLs after deployment:')
console.log('   - https://your-app.vercel.app/api/health')
console.log('   - https://your-app.vercel.app/api/env-test')
console.log('   - https://your-app.vercel.app/api/sheets?action=test\n')

console.log('🚨 **Common Mistakes to Avoid:**')
console.log('   ❌ Forgetting to check all three environment boxes')
console.log('   ❌ Not redeploying after adding variables')
console.log('   ❌ Incorrect private key formatting')
console.log('   ❌ Typos in variable names (case sensitive)')
console.log('   ❌ Not sharing the spreadsheet with service account\n')

console.log('✅ **How to Verify Success:**')
console.log('   - /api/health should show googleAuth: true')
console.log('   - /api/env-test should show all variables as existing')
console.log('   - /api/sheets?action=test should not show "credentials not configured"\n')

console.log('🔗 **Quick Links:**')
console.log('   - Vercel Dashboard: https://vercel.com/dashboard')
console.log('   - Google Cloud Console: https://console.cloud.google.com/iam-admin/serviceaccounts?project=my-project-db-389005')
console.log('   - Spreadsheet: https://docs.google.com/spreadsheets/d/10XVAxEPF6ZfD2zlqPB0kvSyQOP41z8iF6GD9vrG4qHg\n')

console.log('💡 **Need Help?**')
console.log('   - Run `npm run test:service-account` locally first to verify credentials')
console.log('   - Check VERCEL_ENV_TROUBLESHOOTING.md for detailed solutions')
console.log('   - Contact support with Vercel function logs if issues persist\n')

console.log('🎯 **Remember: Environment variables only take effect after redeployment!**')
