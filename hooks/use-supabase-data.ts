import { useQuery } from '@tanstack/react-query';
import { newsAPI, productsAPI, galleryAPI, registrationsAPI } from '@/lib/supabase';

// Hook for fetching all news articles
export function useNews() {
  return useQuery({
    queryKey: ['news'],
    queryFn: () => newsAPI.getAll(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
}

// Hook for fetching news by category
export function useNewsByCategory(category: string) {
  return useQuery({
    queryKey: ['news', category],
    queryFn: () => newsAPI.getByCategory(category),
    staleTime: 5 * 60 * 1000,
    enabled: !!category,
  });
}

// Hook for fetching all products
export function useProducts() {
  return useQuery({
    queryKey: ['products'],
    queryFn: () => productsAPI.getAll(),
    staleTime: 5 * 60 * 1000,
  });
}

// Hook for fetching products by type
export function useProductsByType(type: string) {
  return useQuery({
    queryKey: ['products', type],
    queryFn: () => productsAPI.getByType(type),
    staleTime: 5 * 60 * 1000,
    enabled: !!type,
  });
}

// Hook for fetching gallery photos
export function useGallery() {
  return useQuery({
    queryKey: ['gallery'],
    queryFn: () => galleryAPI.getAll(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
}

// Hook for fetching gallery photos by category
export function useGalleryByCategory(category: string) {
  return useQuery({
    queryKey: ['gallery', category],
    queryFn: () => galleryAPI.getByCategory(category),
    staleTime: 10 * 60 * 1000,
    enabled: !!category,
  });
}

// Hook for submitting registrations
export function useCreateRegistration() {
  const queryClient = require('@tanstack/react-query').useQueryClient();
  
  return {
    mutate: async (data: any) => {
      try {
        const result = await registrationsAPI.create(data);
        queryClient.invalidateQueries({ queryKey: ['registrations'] });
        return result;
      } catch (error) {
        throw error;
      }
    },
  };
}
