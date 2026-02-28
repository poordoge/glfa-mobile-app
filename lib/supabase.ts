import { createClient } from '@supabase/supabase-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Get Supabase credentials from environment variables
const SUPABASE_URL = process.env.EXPO_PUBLIC_SUPABASE_URL || 'https://your-project.supabase.co';
const SUPABASE_ANON_KEY = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || 'your-anon-key';

// Create Supabase client with AsyncStorage for auth persistence
export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});

// Type definitions for database tables
export interface NewsArticle {
  id: number;
  title: string;
  content: string;
  category: string;
  image_url: string;
  created_at: string;
  author: string;
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  image_url: string;
  type: string;
  sizes: string[];
  stock: number;
}

export interface Registration {
  id: number;
  parent_name: string;
  parent_email: string;
  parent_phone: string;
  parent_telegram?: string;
  student_name: string;
  student_age: number;
  program: string;
  additional_notes?: string;
  created_at: string;
}

export interface GalleryPhoto {
  id: number;
  title: string;
  image_url: string;
  category: string;
  created_at: string;
}

// Helper functions for API calls
export const newsAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as NewsArticle[];
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('news')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as NewsArticle[];
  },

  async create(article: Omit<NewsArticle, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('news')
      .insert([article])
      .select();
    if (error) throw error;
    return data?.[0] as NewsArticle;
  },
};

export const productsAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('name');
    if (error) throw error;
    return data as Product[];
  },

  async getByType(type: string) {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('type', type);
    if (error) throw error;
    return data as Product[];
  },

  async create(product: Omit<Product, 'id'>) {
    const { data, error } = await supabase
      .from('products')
      .insert([product])
      .select();
    if (error) throw error;
    return data?.[0] as Product;
  },
};

export const registrationsAPI = {
  async create(registration: Omit<Registration, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('registrations')
      .insert([registration])
      .select();
    if (error) throw error;
    return data?.[0] as Registration;
  },

  async getAll() {
    const { data, error } = await supabase
      .from('registrations')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as Registration[];
  },
};

export const galleryAPI = {
  async getAll() {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as GalleryPhoto[];
  },

  async getByCategory(category: string) {
    const { data, error } = await supabase
      .from('gallery')
      .select('*')
      .eq('category', category)
      .order('created_at', { ascending: false });
    if (error) throw error;
    return data as GalleryPhoto[];
  },

  async create(photo: Omit<GalleryPhoto, 'id' | 'created_at'>) {
    const { data, error } = await supabase
      .from('gallery')
      .insert([photo])
      .select();
    if (error) throw error;
    return data?.[0] as GalleryPhoto;
  },
};
