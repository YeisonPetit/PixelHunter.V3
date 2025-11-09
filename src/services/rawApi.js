import axios from 'axios'
import { RAWG_CONFIG } from '../utils/constants'

const rawApi = axios.create({
  baseURL: RAWG_CONFIG.BASE_URL,
  params: {
    key: RAWG_CONFIG.API_KEY,
  },
})


const api = {
    getGames: (params) => rawApi.get('/games', { params }),
    getGameDetails: (id, params) => rawApi.get(`/games/${id}`, { params }),
    getGameScreenshots: (id) => rawApi.get(`/games/${id}/screenshots`),
    getGameTrailers: (id) => rawApi.get(`/games/${id}/movies`),
    getGenres: () => rawApi.get('/genres'),
    getPlatforms: () => rawApi.get('/platforms'),
    getStores: () => rawApi.get('/stores'),
    getReview: () => rawApi.get('./review')
};

export default api;