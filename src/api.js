// api.js - the base URL of the backend, read from the Vite env.
// Set VITE_API_URL in .env (e.g. http://localhost:3000).
export const API = import.meta.env.VITE_API_URL || 'http://localhost:3000'

// A small fallback image for apartments (the database has no image column).
export const FALLBACK_IMAGE =
  'https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80'
