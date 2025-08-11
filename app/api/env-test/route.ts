import { NextResponse } from 'next/server'

export async function GET() {
  // Test environment variable detection for debugging
  const envTest = {
    // Google Service Account variables
    googleServiceAccountEmail: {
      exists: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
      value: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL ? 
        process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL.substring(0, 20) + '...' : 
        'NOT_SET'
    },
    googleServiceAccountPrivateKey: {
      exists: !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
      length: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.length || 0,
      startsWithBegin: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.startsWith('-----BEGIN') || false
    },
    googleProjectId: {
      exists: !!process.env.GOOGLE_PROJECT_ID,
      value: process.env.GOOGLE_PROJECT_ID || 'my-project-db-389005 (default)'
    },
    googleServiceAccountKeyId: {
      exists: !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY_ID,
      value: process.env.GOOGLE_SERVICE_ACCOUNT_KEY_ID ? 
        process.env.GOOGLE_SERVICE_ACCOUNT_KEY_ID.substring(0, 10) + '...' : 
        'c5d7aa... (default)'
    },
    
    // Environment info
    environment: {
      nodeEnv: process.env.NODE_ENV,
      vercelEnv: process.env.VERCEL_ENV || 'local',
      vercelUrl: process.env.VERCEL_URL || 'localhost',
      vercelRegion: process.env.VERCEL_REGION || 'local'
    },
    
    // All environment variables that start with GOOGLE_ (for debugging)
    allGoogleVars: Object.keys(process.env)
      .filter(key => key.startsWith('GOOGLE_'))
      .map(key => ({
        name: key,
        exists: !!process.env[key],
        length: process.env[key]?.length || 0
      })),
    
    timestamp: new Date().toISOString()
  }

  return NextResponse.json(envTest, { 
    status: 200,
    headers: {
      'Cache-Control': 'no-store, max-age=0',
    }
  })
}
