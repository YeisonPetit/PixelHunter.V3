export const RAWG_CONFIG = {
  BASE_URL: 'https://api.rawg.io/api',
  API_KEY: import.meta.env.VITE_RAWG_KEY,
}

export const SUPABASE_CONFIG = {
  URL: import.meta.env.VITE_SUPABASE_URL,
  ANON_KEY: import.meta.env.VITE_SUPABASE_KEY,
}

export const GAME_GENRES = [
  'Action', 'Adventure', 'RPG', 'Strategy', 'Sports', 'Racing'
]