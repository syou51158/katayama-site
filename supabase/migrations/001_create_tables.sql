-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- Create works table
CREATE TABLE works (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  category VARCHAR(100) NOT NULL,
  body_md TEXT,
  city VARCHAR(100),
  date DATE,
  cover_url TEXT,
  gallery TEXT[], -- Array of image URLs
  tags TEXT[], -- Array of tags
  published BOOLEAN DEFAULT false,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create posts table
CREATE TABLE posts (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title VARCHAR(255) NOT NULL,
  slug VARCHAR(255) UNIQUE NOT NULL,
  body_md TEXT,
  published_at TIMESTAMP WITH TIME ZONE,
  cover_url TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create inquiries table
CREATE TABLE inquiries (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(50),
  email VARCHAR(255) NOT NULL,
  address TEXT,
  request_type VARCHAR(50) NOT NULL,
  message TEXT NOT NULL,
  files TEXT[], -- Array of file URLs
  consent BOOLEAN NOT NULL DEFAULT false,
  status VARCHAR(20) DEFAULT 'new' CHECK (status IN ('new', 'processing', 'closed'))
);

-- Create pages table
CREATE TABLE pages (
  slug VARCHAR(255) PRIMARY KEY,
  title VARCHAR(255) NOT NULL,
  body_md TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Create indexes for better performance
CREATE INDEX idx_works_published ON works(published);
CREATE INDEX idx_works_category ON works(category);
CREATE INDEX idx_works_date ON works(date);
CREATE INDEX idx_works_slug ON works(slug);
CREATE INDEX idx_posts_published_at ON posts(published_at);
CREATE INDEX idx_posts_slug ON posts(slug);
CREATE INDEX idx_inquiries_status ON inquiries(status);
CREATE INDEX idx_inquiries_created_at ON inquiries(created_at);

-- Enable Row Level Security (RLS)
ALTER TABLE works ENABLE ROW LEVEL SECURITY;
ALTER TABLE posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE inquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE pages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for works table
CREATE POLICY "works_select_public" ON works
  FOR SELECT USING (published = true);

CREATE POLICY "works_select_all" ON works
  FOR SELECT USING (true);

CREATE POLICY "works_insert_admin" ON works
  FOR INSERT WITH CHECK (true);

CREATE POLICY "works_update_admin" ON works
  FOR UPDATE USING (true);

CREATE POLICY "works_delete_admin" ON works
  FOR DELETE USING (true);

-- Create RLS policies for posts table
CREATE POLICY "posts_select_public" ON posts
  FOR SELECT USING (published_at IS NOT NULL AND published_at <= NOW());

CREATE POLICY "posts_select_all" ON posts
  FOR SELECT USING (true);

CREATE POLICY "posts_insert_admin" ON posts
  FOR INSERT WITH CHECK (true);

CREATE POLICY "posts_update_admin" ON posts
  FOR UPDATE USING (true);

CREATE POLICY "posts_delete_admin" ON posts
  FOR DELETE USING (true);

-- Create RLS policies for inquiries table
CREATE POLICY "inquiries_insert_public" ON inquiries
  FOR INSERT WITH CHECK (consent = true);

CREATE POLICY "inquiries_select_admin" ON inquiries
  FOR SELECT USING (true);

CREATE POLICY "inquiries_update_admin" ON inquiries
  FOR UPDATE USING (true);

CREATE POLICY "inquiries_delete_admin" ON inquiries
  FOR DELETE USING (true);

-- Create RLS policies for pages table
CREATE POLICY "pages_select_public" ON pages
  FOR SELECT USING (true);

CREATE POLICY "pages_insert_admin" ON pages
  FOR INSERT WITH CHECK (true);

CREATE POLICY "pages_update_admin" ON pages
  FOR UPDATE USING (true);

CREATE POLICY "pages_delete_admin" ON pages
  FOR DELETE USING (true);

-- Grant permissions to anon and authenticated roles
GRANT SELECT ON works TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON works TO authenticated;

GRANT SELECT ON posts TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON posts TO authenticated;

GRANT INSERT ON inquiries TO anon;
GRANT SELECT, UPDATE, DELETE ON inquiries TO authenticated;

GRANT SELECT ON pages TO anon, authenticated;
GRANT INSERT, UPDATE, DELETE ON pages TO authenticated;