import { NextResponse } from "next/server"

export async function GET() {
  try {
    // Basic health check
    const healthData = {
      status: "healthy",
      timestamp: new Date().toISOString(),
      environment: process.env.NODE_ENV,
      vercel: {
        region: process.env.VERCEL_REGION || "unknown",
        url: process.env.VERCEL_URL || "localhost",
        env: process.env.VERCEL_ENV || "local",
      },
      nextjs: {
        version: process.version,
      },
      services: {
        googleAuth: {
          emailConfigured: !!process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
          privateKeyConfigured: !!process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY,
          privateKeyLength: process.env.GOOGLE_SERVICE_ACCOUNT_PRIVATE_KEY?.length || 0,
          projectIdConfigured: !!process.env.GOOGLE_PROJECT_ID,
          keyIdConfigured: !!process.env.GOOGLE_SERVICE_ACCOUNT_KEY_ID,
        },
      },
      // Debug info for environment variables
      debug: {
        googleVarsFound: Object.keys(process.env).filter((key) => key.startsWith("GOOGLE_")).length,
        allGoogleVars: Object.keys(process.env)
          .filter((key) => key.startsWith("GOOGLE_"))
          .map((key) => ({ name: key, hasValue: !!process.env[key] })),
        envVarSample: process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL
          ? `${process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL.substring(0, 10)}...`
          : "not-found",
      },
    }

    return NextResponse.json(healthData, {
      status: 200,
      headers: {
        "Cache-Control": "no-store, max-age=0",
      },
    })
  } catch (error) {
    return NextResponse.json(
      {
        status: "error",
        message: error instanceof Error ? error.message : "Unknown error",
        timestamp: new Date().toISOString(),
      },
      { status: 500 },
    )
  }
}
