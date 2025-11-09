import React, { useEffect, useState } from 'react';
import { useSearch } from '../context/SearchContext';
import api from '../services/rawApi.js';


export default function Carts() {
  const [allGames, setAllGames] = useState([]);
  const [loading, setLoading] = useState(true);
  const { searchResults, searchTerm, isSearching } = useSearch();

  useEffect(() => {
    const fetchGames = async () => {
      setLoading(true);
      try {
        // Fixed: Use api correctly
        const response = await api.getGames({ page_size: 40 });
        console.log('Juegos cargados:', response.data);

        // api returns axios response, data is in response.data
        setAllGames(response.data.results || []);
        
      } catch (error) {
        console.error('Error cargando juegos:', error);
        setAllGames([]);
      } finally {
        setLoading(false);
      }
    };

    fetchGames();
  }, []);

  // Decidir qué mostrar: resultados de búsqueda o todos los juegos
  const gamesToDisplay = searchTerm ? searchResults : allGames;

  // Loading state
  if (loading || isSearching) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-center">
          <div className="h-16 w-16 border-4 border-gray-300 border-t-indigo-600 rounded-full animate-spin mx-auto"></div>
          <p className="mt-4 text-gray-600">
            {isSearching ? 'Buscando juegos...' : 'Cargando juegos...'}
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      {/* Header con contador */}
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800">
          {searchTerm ? `Resultados para "${searchTerm}"` : 'Todos los Juegos'}
        </h1>
        <p className="text-gray-600 mt-2">
          {gamesToDisplay.length} juego(s) encontrado(s)
        </p>
      </div>

      {/* Grid de juegos */}
      {gamesToDisplay.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {gamesToDisplay.map((game) => (
            <div
              key={game.id}
              className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow duration-300 cursor-pointer"
            >
              {/* Imagen del juego */}
              <div className="relative h-48 overflow-hidden bg-gray-200">
                <img
                  src={game.background_image || game.image || game.thumbnail || 'https://via.placeholder.com/400x300?text=No+Image'}
                  alt={game.name}
                  className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                  onError={(e) => {
                    e.target.src = 'https://via.placeholder.com/400x300?text=No+Image';
                  }}
                />
              </div>

              {/* Contenido de la card */}
              <div className="p-4">
                {/* Título */}
                <h3 className="font-bold text-lg mb-2 line-clamp-1" title={game.name}>
                  {game.name}
                </h3>

                {/* Género */}
                <p className="text-sm text-gray-600 mb-2">
                  {game.genre || game.genres?.[0]?.name || 'Sin género'}
                </p>

                {/* Footer con rating y fecha */}
                <div className="flex items-center justify-between mt-3 pt-3 border-t border-gray-100">
                  <div className="flex items-center gap-1">
                    <span className="text-yellow-500 font-semibold">⭐</span>
                    <span className="text-sm font-medium">
                      {game.rating || game.metacritic || 'N/A'}
                    </span>
                  </div>
                  
                  <span className="text-xs text-gray-500">
                    {game.released || game.release_date || 'TBA'}
                  </span>
                </div>

                {/* Plataformas (opcional) */}
                {game.platforms && (
                  <div className="flex gap-2 mt-2 flex-wrap">
                    {game.platforms.slice(0, 3).map((platform, index) => (
                      <span
                        key={index}
                        className="text-xs bg-gray-100 px-2 py-1 rounded"
                      >
                        {platform.platform?.name || platform}
                      </span>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      ) : (
        // Estado vacío
        <div className="flex flex-col items-center justify-center py-16 text-center">
          <div className="text-6xl mb-4">🎮</div>
          <h3 className="text-xl font-semibold text-gray-700 mb-2">
            {searchTerm ? 'No se encontraron juegos' : 'No hay juegos disponibles'}
          </h3>
          <p className="text-gray-500">
            {searchTerm
              ? `No hay resultados para "${searchTerm}". Intenta con otro término.`
              : 'Parece que no hay juegos cargados en este momento.'}
          </p>
        </div>
      )}
    </div>
  );
}