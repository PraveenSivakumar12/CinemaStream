import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

// 1. Create the context
const FavouriteContext = createContext(null);

// 2. Create the provider
export function FavouriteProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem("cinema-favourites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // 3. Save favourites to localStorage
  useEffect(() => {
    localStorage.setItem(
      "cinema-favourites",
      JSON.stringify(favourites)
    );
  }, [favourites]);

  // 4. Add or remove a favourite
  function toggleFavourite(movie) {
    setFavourites((current) => {
      const exists = current.some((item) => item.id === movie.id);

      if (exists) {
        return current.filter((item) => item.id !== movie.id);
      }

      return [...current, movie];
    });
  }

  // 5. Check whether a movie is favourited
  function isFavourite(movieId) {
    return favourites.some((movie) => movie.id === movieId);
  }

  // 6. Share the state and count with components
  return (
    <FavouriteContext.Provider
      value={{
        favourites,
        favouriteCount: favourites.length,
        toggleFavourite,
        isFavourite,
      }}
    >
      {children}
    </FavouriteContext.Provider>
  );
}

// 7. Custom hook
export function useFavourites() {
  const context = useContext(FavouriteContext);

  if (!context) {
    throw new Error(
      "useFavourites must be used inside FavouriteProvider"
    );
  }

  return context;
}