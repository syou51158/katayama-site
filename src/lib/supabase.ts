import { createClient } from '@supabase/supabase-js'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Database types
export interface Work {
  id: string
  title: string
  slug: string
  category: string
  body_md: string | null
  city: string | null
  date: string | null
  cover_url: string | null
  gallery: string[] | null
  tags: string[] | null
  published: boolean
  created_at: string
  updated_at: string
}

export interface Post {
  id: string
  title: string
  slug: string
  body_md: string | null
  published_at: string | null
  cover_url: string | null
  created_at: string
  updated_at: string
}

export interface News {
  id: string
  title: string
  content: string | null
  excerpt: string | null
  category: string | null
  featured_image: string | null
  published_date: string | null
  status: 'draft' | 'published' | 'archived'
  created_at?: string | null
  updated_at?: string | null
}

export interface Inquiry {
  id: string
  created_at: string
  name: string
  phone: string | null
  email: string
  address: string | null
  request_type: string
  message: string
  files: string[] | null
  consent: boolean
  status: 'new' | 'processing' | 'closed'
}

export interface Page {
  slug: string
  title: string
  body_md: string | null
  updated_at: string
}

// API functions
export async function getWorks(category?: string, limit?: number): Promise<Work[]> {
  let query = supabase
    .from('works')
    .select('*')
    .eq('status', 'published')
    .order('completion_date', { ascending: false })

  if (category) {
    query = query.eq('category', category)
  }

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching works:', error)
    return []
  }

  return data || []
}

export async function getWorkBySlug(slug: string): Promise<Work | null> {
  const { data, error } = await supabase
    .from('works')
    .select('*')
    .eq('slug', slug)
    .eq('status', 'published')
    .single()

  if (error) {
    console.error('Error fetching work:', error)
    return null
  }

  return data
}

export async function getPosts(limit?: number): Promise<Post[]> {
  let query = supabase
    .from('posts')
    .select('*')
    .not('published_at', 'is', null)
    .lt('published_at', new Date().toISOString())
    .order('published_at', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching posts:', error)
    return []
  }

  return data || []
}

export async function getPostBySlug(slug: string): Promise<Post | null> {
  const { data, error } = await supabase
    .from('posts')
    .select('*')
    .eq('slug', slug)
    .not('published_at', 'is', null)
    .lt('published_at', new Date().toISOString())
    .single()

  if (error) {
    console.error('Error fetching post:', error)
    return null
  }

  return data
}

export async function getNews(limit?: number): Promise<News[]> {
  let query = supabase
    .from('news')
    .select('*')
    .eq('status', 'published')
    .order('published_date', { ascending: false })

  if (limit) {
    query = query.limit(limit)
  }

  const { data, error } = await query

  if (error) {
    console.error('Error fetching news:', error)
    return []
  }

  return data || []
}

export async function getPageBySlug(slug: string): Promise<Page | null> {
  const { data, error } = await supabase
    .from('pages')
    .select('*')
    .eq('slug', slug)
    .single()

  if (error) {
    console.error('Error fetching page:', error)
    return null
  }

  return data
}

export async function createInquiry(inquiry: Omit<Inquiry, 'id' | 'created_at' | 'status'>) {
  const { data, error } = await supabase
    .from('inquiries')
    .insert([{
      ...inquiry,
      status: 'new' as const
    }])
    .select()
    .single()

  if (error) {
    console.error('Error creating inquiry:', error)
    throw error
  }

  return data
}

export async function uploadFile(file: File, path: string): Promise<string> {
  const { data, error } = await supabase.storage
    .from('inquiries')
    .upload(path, file)

  if (error) {
    console.error('Error uploading file:', error)
    throw error
  }

  const { data: { publicUrl } } = supabase.storage
    .from('inquiries')
    .getPublicUrl(data.path)

  return publicUrl
}