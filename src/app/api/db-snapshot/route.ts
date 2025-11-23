import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

const tables = [
  { name: 'services', orderBy: 'created_at' },
  { name: 'works', orderBy: 'created_at' },
  { name: 'news', orderBy: 'published_date' },
  { name: 'representatives', orderBy: 'updated_at' },
  { name: 'company_stats', orderBy: 'created_at' },
  { name: 'testimonials', orderBy: 'created_at' },
  { name: 'partners', orderBy: 'created_at' },
]

export async function GET() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE
  if (!supabaseUrl || !supabaseServiceKey) {
    return NextResponse.json({ error: 'Supabase configuration is missing' }, { status: 500 })
  }
  const supabase = createClient(supabaseUrl, supabaseServiceKey)
  const result: Record<string, unknown> = {}
  for (const t of tables) {
    try {
      const countRes = await supabase
        .from(t.name)
        .select('*', { count: 'exact', head: true })
      const total = countRes.count ?? null

      let sampleQuery = supabase.from(t.name).select('*').limit(5)
      if (t.orderBy) {
        sampleQuery = sampleQuery.order(t.orderBy, { ascending: false, nullsFirst: true })
      }
      const { data: sampleData, error: sampleError } = await sampleQuery

      const fields: Record<string, { filled: number; empty: number }> = {}
      if (Array.isArray(sampleData)) {
        for (const row of sampleData as Record<string, unknown>[]) {
          for (const key of Object.keys(row)) {
            const v = row[key]
            const isEmpty = v === null || (typeof v === 'string' && v.length === 0) || (Array.isArray(v) && (v as unknown[]).length === 0)
            fields[key] = fields[key] || { filled: 0, empty: 0 }
            if (isEmpty) fields[key].empty += 1
            else fields[key].filled += 1
          }
        }
      }

      result[t.name] = { total, sample: sampleData ?? [], fields, error: sampleError?.message }
    } catch (e) {
      const message = e instanceof Error ? e.message : 'Unknown error'
      result[t.name] = { total: null, sample: [], fields: {}, error: message }
    }
  }

  return NextResponse.json(result)
}