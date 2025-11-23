import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

// Initialize Supabase client
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.SUPABASE_SERVICE_ROLE_KEY!
)

export async function POST(request: NextRequest) {
  try {
    const { metric, value, id, label, timestamp } = await request.json()

    // Validate input
    if (!metric || value === undefined || !id) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      )
    }

    // Store in Supabase
    const { data, error } = await supabase
      .from('web_vitals')
      .insert([
        {
          metric_name: metric,
          metric_value: value,
          metric_id: id,
          metric_label: label,
          timestamp: timestamp || new Date().toISOString(),
          user_agent: request.headers.get('user-agent'),
          url: request.headers.get('referer'),
        },
      ])

    if (error) {
      console.error('Error storing web vitals:', error)
      return NextResponse.json(
        { error: 'Failed to store web vitals' },
        { status: 500 }
      )
    }

    return NextResponse.json({ success: true, data })
  } catch (error) {
    console.error('Error processing web vitals:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const metric = searchParams.get('metric')
    const days = parseInt(searchParams.get('days') || '7')

    let query = supabase
      .from('web_vitals')
      .select('*')
      .gte('timestamp', new Date(Date.now() - days * 24 * 60 * 60 * 1000).toISOString())
      .order('timestamp', { ascending: false })

    if (metric) {
      query = query.eq('metric_name', metric)
    }

    const { data, error } = await query

    if (error) {
      console.error('Error fetching web vitals:', error)
      return NextResponse.json(
        { error: 'Failed to fetch web vitals' },
        { status: 500 }
      )
    }

    return NextResponse.json({ data })
  } catch (error) {
    console.error('Error fetching web vitals:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}