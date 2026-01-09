import { NextResponse } from 'next/server'

/**
 * Health check endpoint for Railway and monitoring
 * Returns 200 if the API is healthy
 */
export async function GET() {
  try {
    // Basic health check
    // You can add more checks here (database, external services, etc.)
    
    return NextResponse.json(
      {
        status: 'healthy',
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
        environment: process.env.NODE_ENV || 'development',
      },
      { status: 200 }
    )
  } catch (error) {
    return NextResponse.json(
      {
        status: 'unhealthy',
        error: error instanceof Error ? error.message : 'Unknown error',
        timestamp: new Date().toISOString(),
      },
      { status: 500 }
    )
  }
}
