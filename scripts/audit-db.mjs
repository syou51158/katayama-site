import fs from 'fs'
import path from 'path'
import { createClient } from '@supabase/supabase-js'

const envPath = path.resolve(process.cwd(), '.env.local')
if (fs.existsSync(envPath)) {
  const envLines = fs.readFileSync(envPath, 'utf-8').split('\n').filter((l) => l && !l.startsWith('#'))
  for (const line of envLines) {
    const idx = line.indexOf('=')
    if (idx > 0) {
      const k = line.slice(0, idx).trim()
      const v = line.slice(idx + 1).trim()
      if (!(k in process.env)) process.env[k] = v
    }
  }
}

const url = process.env.NEXT_PUBLIC_SUPABASE_URL || process.env.SUPABASE_URL
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!url || !key) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(url, key, {
  auth: { autoRefreshToken: false, persistSession: false }
})

const tables = [
  { name: 'services', orderBy: 'created_at' },
  { name: 'works', orderBy: 'created_at' },
  { name: 'news', orderBy: 'published_date' },
  { name: 'representatives', orderBy: 'updated_at' },
  { name: 'company_stats', orderBy: 'created_at' },
  { name: 'testimonials', orderBy: 'created_at' },
  { name: 'partners', orderBy: 'created_at' },
]

async function main() {
  const out = {}
  for (const t of tables) {
    let total = null
    let sample = []
    const fields = {}
    let errMsg = null
    try {
      const { count } = await supabase.from(t.name).select('*', { count: 'exact', head: true })
      total = count ?? null
      let q = supabase.from(t.name).select('*').limit(5)
      if (t.orderBy) q = q.order(t.orderBy, { ascending: false })
      const { data, error } = await q
      if (error) errMsg = error.message
      sample = data || []

      for (const row of sample) {
        for (const k of Object.keys(row)) {
          const v = row[k]
          const isEmpty = v === null || v === '' || (Array.isArray(v) && v.length === 0)
          fields[k] = fields[k] || { filled: 0, empty: 0 }
          if (isEmpty) fields[k].empty += 1
          else fields[k].filled += 1
        }
      }
    } catch (e) {
      errMsg = e instanceof Error ? e.message : String(e)
    }
    out[t.name] = { total, sample, fields, error: errMsg }
  }
  console.log(JSON.stringify(out, null, 2))
}

main()