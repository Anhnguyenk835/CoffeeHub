// Types for our API responses
export interface CoffeeShop {
  place_id: string;
  place_name: string;
  place_url: string;
  place_address: string;
  rating?: number;
  thumbnail?: string;
  type?: string[];
  price_range?: string;
  phone?: string;
  website?: string;
  latitude?: string;
  longitude?: string;
  online_order_link?: string;
}

export interface CoffeeShopImage {
  image_id: string;
  place_id: string;
  img_title: string;
  img_url: string;
}

// API Base URL
const API_BASE_URL = 'http://localhost:3000/api';

// Helper functions for API calls
export const getPlaces = async (): Promise<CoffeeShop[]> => {
  const response = await fetch(`${API_BASE_URL}/places`);
  if (!response.ok) {
    throw new Error('Failed to fetch coffee shops');
  }
  return response.json();
};

export const getPlaceById = async (id: string): Promise<CoffeeShop> => {
  const response = await fetch(`${API_BASE_URL}/places/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch coffee shop details');
  }
  return response.json();
};

export const getImagesByPlaceId = async (id: string): Promise<CoffeeShopImage[]> => {
  const response = await fetch(`${API_BASE_URL}/images/place/${id}`);
  if (!response.ok) {
    throw new Error('Failed to fetch coffee shop images');
  }
  return response.json();
}; 