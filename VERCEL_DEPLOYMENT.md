# Vercel Deployment Guide

This guide will help you deploy the Property Insights Tool to Vercel with full Google Service Account authentication support.

## Prerequisites

1. **Vercel Account**: Sign up at [vercel.com](https://vercel.com)
2. **Google Cloud Project**: With Service Account configured (see SERVICE_ACCOUNT_SETUP.md)
3. **Git Repository**: Your code should be pushed to GitHub, GitLab, or Bitbucket

## Deployment Steps

### 1. Connect Your Repository

1. Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. Click "Add New Project"
3. Import your Git repository
4. Select the repository containing this code

### 2. Configure Build Settings

Vercel will automatically detect this as a Next.js project. The default settings should work:

- **Framework Preset**: Next.js
- **Build Command**: `npm run build`
- **Output Directory**: `.next` (auto-detected)
- **Install Command**: `npm install --legacy-peer-deps`

### 3. Configure Environment Variables

In your Vercel project dashboard, go to **Settings > Environment Variables** and add:

#### Required for Google Sheets API:
\`\`\`bash
GOOGLE_SERVICE_ACCOUNT_EMAIL=lh-n8n-service@my-project-db-389005.iam.gserviceaccount.com
GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_ACTUAL_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----"
GOOGLE_PROJECT_ID=my-project-db-389005
GOOGLE_SERVICE_ACCOUNT_KEY_ID=c5d7aaff84fb15c6df322dbb430228481418ec71
\`\`\`

#### Optional for Supabase:
\`\`\`bash
NEXT_PUBLIC_SUPABASE_URL=your-supabase-project-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-supabase-anon-key
\`\`\`

#### Optional for Custom Domain:
\`\`\`bash
NEXT_PUBLIC_APP_URL=https://your-domain.vercel.app
\`\`\`

### 4. Important Notes for Environment Variables

1. **Private Key Formatting**: The private key must include `\n` for newlines:
   \`\`\`
   "-----BEGIN PRIVATE KEY-----\nMIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQC...\n-----END PRIVATE KEY-----"
   \`\`\`

2. **Environment Scope**: Set all variables for **Production**, **Preview**, and **Development** environments.

3. **Security**: Never commit actual private keys to your repository. Only use them in Vercel's environment variables.

### 5. Deploy

1. Click **Deploy** in Vercel
2. Wait for the build to complete
3. Visit your deployed URL to test

## Vercel-Specific Optimizations

This project includes several Vercel optimizations:

### vercel.json Configuration
\`\`\`json
{
  "buildCommand": "npm run build",
  "outputDirectory": ".next",
  "framework": "nextjs",
  "regions": ["iad1"],
  "functions": {
    "app/api/sheets/route.ts": {
      "maxDuration": 30
    }
  }
}
\`\`\`

### Next.js Configuration (next.config.mjs)
\`\`\`javascript
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
}
\`\`\`

## Testing Your Deployment

### 1. Test the Main Application
Visit your Vercel URL (e.g., `https://your-app.vercel.app`)

### 2. Test the API Endpoints
- Health check: `https://your-app.vercel.app/api/sheets?action=test`
- This should return diagnostic information about your Google Service Account setup

### 3. Monitor Logs
In Vercel dashboard > Functions tab, you can monitor real-time logs and errors.

## Troubleshooting

### Common Issues:

1. **Build Fails with Dependency Errors**
   - Solution: Add `--legacy-peer-deps` to install command in Vercel build settings

2. **Environment Variables Not Working**
   - Check variable names are exactly correct (case-sensitive)
   - Ensure variables are set for the correct environment (Production/Preview/Development)
   - Redeploy after adding variables

3. **Google Sheets API Errors**
   - Verify Service Account email has access to your Google Sheets
   - Check private key formatting (must include `\n` for newlines)
   - Ensure Google Sheets API is enabled in Google Cloud Console

4. **Function Timeout**
   - The API function has a 30-second timeout configured in vercel.json
   - For longer operations, consider breaking them into smaller chunks

### Debug Mode

You can enable debug mode by adding this environment variable:
\`\`\`bash
DEBUG=true
\`\`\`

This will provide more detailed error messages in the logs.

## Production Considerations

1. **Domain Setup**: Configure a custom domain in Vercel settings
2. **Performance**: Monitor performance in Vercel Analytics
3. **Security**: Regularly rotate your Service Account keys
4. **Monitoring**: Set up error tracking with tools like Sentry
5. **Backup**: Ensure your Google Sheets data is backed up

## Support

If you encounter issues:

1. Check Vercel build logs for detailed error messages
2. Use the diagnostic script: `npm run test:service-account`
3. Review the SERVICE_ACCOUNT_SETUP.md guide
4. Check Vercel's documentation at [vercel.com/docs](https://vercel.com/docs)

## Next Steps After Deployment

1. **Test all functionality** with real Google Sheets data
2. **Set up custom domain** if needed
3. **Configure monitoring** and error tracking
4. **Share the URL** with your team
5. **Set up CI/CD** for automatic deployments on code changes

Your Property Insights Tool is now ready for production use on Vercel! 🚀
