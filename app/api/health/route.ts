import { NextResponse } from 'next/server'

export async function GET() {
  try {
    // Basic health check
    const healthData = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      vercel: {
        region: process.env.VERCEL_REGION || 'unknown',
        url: process.env.VERCEL_URL || 'localhost',
      },
      nextjs: {
        version: process.version,
      },
      services: {
        googleAuth: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
        supabase: !!process.env.NEXT_PUBLIC_SUPABASE_URL,
      }
    }

    return NextResponse.json(healthData, { 
      status: 200,
      headers: {
        'Cache-Control': 'no-store, max-age=0',
      }
    })
  } catch (error) {
    return NextResponse.json(
      { 
        status: 'error', 
        message: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString()
      }, 
      { status: 500 }
    )
  }
}
