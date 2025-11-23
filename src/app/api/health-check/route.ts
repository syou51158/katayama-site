import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function GET(request: NextRequest) {
  try {
    const checks = {
      database: false,
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: process.memoryUsage(),
      environment: process.env.NODE_ENV,
    }

    // Check database connection
    try {
      const { data, error } = await supabase
        .from('site_settings')
        .select('setting_key')
        .limit(1)

      if (!error) {
        checks.database = true
      }
    } catch (dbError) {
      console.error('Database health check failed:', dbError)
    }

    // Determine overall health
    const isHealthy = checks.database
    const status = isHealthy ? 'healthy' : 'unhealthy'
    const statusCode = isHealthy ? 200 : 503

    return NextResponse.json(
      {
        status,
        checks,
        message: isHealthy ? 'All systems operational' : 'Some systems are experiencing issues',
      },
      { status: statusCode }
    )
  } catch (error) {
    console.error('Health check failed:', error)
    const errorMessage = error instanceof Error ? error.message : 'Unknown error'
    return NextResponse.json(
      {
        status: 'error',
        message: 'Health check failed',
        error: process.env.NODE_ENV === 'development' ? errorMessage : undefined,
      },
      { status: 500 }
    )
  }
}