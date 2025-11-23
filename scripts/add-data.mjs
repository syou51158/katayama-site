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
const key = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.SUPABASE_SERVICE_ROLE
if (!url || !key) {
  console.error('Missing Supabase environment variables')
  process.exit(1)
}

const supabase = createClient(url, key, { auth: { autoRefreshToken: false, persistSession: false } })

async function addServices() {
  const { data } = await supabase.from('services').select('title')
  const titles = new Set((data || []).map((s) => s.title))
  const toInsert = []
  if (!titles.has('設備工事')) {
    toInsert.push({
      title: '設備工事',
      description: '上下水道・電気・空調などの設備工事',
      detailed_description: 'インフラ設備の設計・施工・保守まで一貫対応',
      service_image: '/images/services/utilities.jpg',
      icon: 'wrench',
      features: ['上下水道', '電気設備', '空調設備'],
      sort_order: 6,
      status: 'active'
    })
  }
  if (toInsert.length) {
    await supabase.from('services').insert(toInsert)
  }
}

async function addWorks() {
  const { data } = await supabase.from('works').select('title')
  const titles = new Set((data || []).map((w) => w.title))
  const toInsert = []
  if (!titles.has('学校耐震補強工事')) {
    toInsert.push({
      title: '学校耐震補強工事',
      description: '市内小学校校舎の耐震補強工事',
      category: '建築',
      featured_image: '/images/works/school.jpg',
      location: '金沢市',
      completion_date: '2025-06-30',
      construction_period: '2ヶ月',
      floor_area: '—',
      client_name: '金沢市教育委員会',
      tags: ['耐震', '補強'],
      status: 'published'
    })
  }
  if (!titles.has('上下水道敷設工事')) {
    toInsert.push({
      title: '上下水道敷設工事',
      description: '新規宅地開発に伴う上下水道配管敷設',
      category: '設備',
      featured_image: '/images/works/water.jpg',
      location: '白山市',
      completion_date: '2025-05-15',
      construction_period: '1.5ヶ月',
      floor_area: '—',
      client_name: '不動産開発事業者',
      tags: ['上下水道', '配管'],
      status: 'published'
    })
  }
  if (!titles.has('工場改修・導線改善工事')) {
    toInsert.push({
      title: '工場改修・導線改善工事',
      description: '安全性と生産性向上のための改修',
      category: '建築',
      featured_image: '/images/works/factory.jpg',
      location: '能美市',
      completion_date: '2025-03-31',
      construction_period: '2ヶ月',
      floor_area: '—',
      client_name: '製造業A社',
      tags: ['改修', '導線改善'],
      status: 'published'
    })
  }
  if (toInsert.length) {
    await supabase.from('works').insert(toInsert)
  }
}

async function addNews() {
  const { data } = await supabase.from('news').select('title')
  const titles = new Set((data || []).map((n) => n.title))
  const toInsert = []
  if (!titles.has('採用情報公開のお知らせ')) {
    toInsert.push({
      title: '採用情報公開のお知らせ',
      content: '新卒・中途採用の募集を開始しました。詳細は採用ページをご覧ください。',
      excerpt: '採用開始のお知らせ',
      category: 'お知らせ',
      featured_image: '/images/news/recruit.jpg',
      published_date: new Date().toISOString().slice(0, 10),
      status: 'published'
    })
  }
  if (!titles.has('地域清掃活動を実施しました')) {
    toInsert.push({
      title: '地域清掃活動を実施しました',
      content: '社員有志で会社周辺の清掃活動を実施しました。',
      excerpt: '地域清掃活動のご報告',
      category: 'お知らせ',
      featured_image: '/images/news/cleanup.jpg',
      published_date: new Date().toISOString().slice(0, 10),
      status: 'published'
    })
  }
  if (toInsert.length) {
    await supabase.from('news').insert(toInsert)
  }
}

async function updateRepresentativeSignature() {
  const { data } = await supabase.from('representatives').select('id, signature_url').limit(1)
  if (data && data.length > 0) {
    const row = data[0]
    if (!row.signature_url) {
      await supabase.from('representatives').update({ signature_url: 'assets/img/signature.png' }).eq('id', row.id)
    }
  }
}

async function main() {
  await addServices()
  await addWorks()
  await addNews()
  await updateRepresentativeSignature()
  console.log('Data additions completed')
}

main()