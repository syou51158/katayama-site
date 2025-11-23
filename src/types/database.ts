export interface Work {
  id: string;
  title: string;
  slug: string;
  category: string;
  body_md?: string;
  city?: string;
  date?: string;
  cover_url?: string;
  gallery?: string[];
  tags?: string[];
  published: boolean;
  created_at: string;
  updated_at: string;
}

export interface Post {
  id: string;
  title: string;
  slug: string;
  body_md?: string;
  published_at?: string;
  cover_url?: string;
  created_at: string;
  updated_at: string;
}

export interface Inquiry {
  id: string;
  created_at: string;
  name: string;
  phone?: string;
  email: string;
  address?: string;
  request_type: 'demolition' | 'exterior' | 'paving' | 'utilities' | 'other' | 'estimate';
  message: string;
  files?: string[];
  consent: boolean;
  status: 'new' | 'processing' | 'closed';
}

export interface Page {
  slug: string;
  title: string;
  body_md?: string;
  updated_at: string;
}

export type ServiceCategory = 'demolition' | 'exterior' | 'paving' | 'utilities' | 'real-estate';

export interface Service {
  id: ServiceCategory;
  title: string;
  description: string;
  features: string[];
  image: string;
}