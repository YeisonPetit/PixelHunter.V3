import { Link } from "react-router-dom";
import { useState, useCallback } from "react";
import React from "react";
import { useAuth } from "../context/AutheContext";
import { useSearch } from "../context/SearchContext";

export default function Sidebar() {
  const [search, setSearch] = useState("");
  const { signOut } = useAuth();
  const { setSearchResults, setIsSearching, setSearchTerm } = useSearch();

  // Debounce function
  const debounce = (func, delay = 500) => {
    let timeoutId;
    return (...args) => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => func(...args), delay);
    };
  };

  // Función de búsqueda con API
  const performSearch = async (searchTerm) => {
    setSearchTerm(searchTerm); // Guardar el término de búsqueda
    
    if (!searchTerm.trim()) {
      setSearchResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);
    console.log("Buscando en API:", searchTerm);

    try {
      const response = await fetch(
        `https://tu-api.com/games/search?q=${encodeURIComponent(searchTerm)}`,
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (!response.ok) {
        throw new Error(`Error: ${response.status}`);
      }

      const data = await response.json();
      console.log("Resultados encontrados:", data);

      // Guardar resultados en el contexto
      setSearchResults(data.results || data);

    } catch (error) {
      console.error("Error en la búsqueda:", error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const debouncedSearch = useCallback(
    debounce((value) => performSearch(value), 500),
    []
  );

  const handleSearchChange = (e) => {
    const value = e.target.value;
    setSearch(value);
    debouncedSearch(value);
  };

  const handleLogout = async () => {
    await signOut();
  };

  return (
    <aside className="w-80 min-h-screen bg-white shadow-xl sticky top-0">
      <div className="flex flex-col h-full p-4">
        {/* Logo */}
        <div className="flex items-center gap-4 p-4 mb-2">
          <img
            src="https://docs.material-tailwind.com/img/logo-ct-dark.png"
            alt="brand"
            className="w-8 h-8"
          />
          <h5 className="text-xl font-semibold text-blue-gray-900">
            PixelHunter
          </h5>
        </div>

        {/* Search */}
        <div className="p-2 mb-4">
          <div className="relative">
            <input
              className="w-full rounded-lg border border-gray-300 px-3 py-2 pr-10 text-sm focus:border-gray-900 focus:outline-none"
              type="text"
              value={search}
              onChange={handleSearchChange}
              placeholder="Search games..."
            />
            <svg
              className="absolute right-3 top-2.5 h-5 w-5 text-gray-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </div>
        </div>

        {/* Navigation */}
        <nav className="flex-1 flex flex-col gap-1 overflow-y-auto">
          <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Link to={"/carts"}>
              <div className="flex items-center gap-3">
                <span>🎮</span>
                <span>Home</span>
              </div>
            </Link>
          </div>

          <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <div className="flex items-center gap-3">
              <span>📝</span>
              <span>Reviews</span>
            </div>
          </div>

          <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <div className="flex items-center gap-3">
              <span>🔥</span>
              <span>This Week</span>
            </div>
          </div>

          <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <div className="flex items-center gap-3">
              <span>🏆</span>
              <span>Top Rated</span>
            </div>
          </div>

          <hr className="my-2 border-gray-200" />

          <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Link to={"/Profile.jsx"}>
              <div className="flex items-center gap-3">
                <span>👤</span>
                <span>Profile</span>
              </div>
            </Link>
          </div>

          <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer">
            <Link to={"/settings"}>
              <div className="flex items-center gap-3">
                <span>⚙️</span>
                <span>Settings</span>
              </div>
            </Link>
          </div>

          <div className="p-3 hover:bg-gray-100 rounded-lg cursor-pointer text-red-600">
            <Link to={"/logout"}>
              <div className="flex items-center gap-3">
                <span>🚪</span>
                <span onClick={handleLogout}>Log Out</span>
              </div>
            </Link>
          </div>
        </nav>

        {/* Upgrade Card */}
        <div className="mt-auto p-4 bg-gray-900 text-white rounded-lg">
          <h6 className="font-semibold mb-2">Upgrade to PRO</h6>
          <p className="text-sm opacity-80 mb-3">
            Get premium features and more games!
          </p>
          <button className="text-sm font-medium hover:underline">
            Upgrade Now →
          </button>
        </div>
      </div>
    </aside>
  );
}