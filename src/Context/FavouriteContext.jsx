import {
  createContext,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react";
import Toast from "../Components/Toast";

const FavouriteContext = createContext(null);

export function FavouriteProvider({ children }) {
  const [favourites, setFavourites] = useState(() => {
    try {
      const saved = localStorage.getItem("cinema-favourites");
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [toasts, setToasts] = useState([]);
  const [justAddedId, setJustAddedId] = useState(null);

  const addToast = useCallback((message, type = "success", icon = "❤️") => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type, icon }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 3200);
  }, []);

  const removeToast = useCallback((id) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  useEffect(() => {
    localStorage.setItem(
      "cinema-favourites",
      JSON.stringify(favourites)
    );
  }, [favourites]);

  const toggleFavourite = useCallback((movie) => {
    if (!movie) return;
    const movieTitle = movie.title || movie.name || "Movie";

    setFavourites((current) => {
      const exists = current.some((item) => item.id === movie.id);

      if (exists) {
        addToast(`Removed "${movieTitle}" from My List`, "remove", "💔");
        return current.filter((item) => item.id !== movie.id);
      }

      setJustAddedId(movie.id);
      setTimeout(() => setJustAddedId(null), 1200);

      addToast(`Added "${movieTitle}" to My List!`, "success", "❤️");
      return [...current, movie];
    });
  }, [addToast]);

  const isFavourite = useCallback((movieId) => {
    return favourites.some((movie) => movie.id === movieId);
  }, [favourites]);

  return (
    <FavouriteContext.Provider
      value={{
        favourites,
        favouriteCount: favourites.length,
        toggleFavourite,
        isFavourite,
        justAddedId,
        addToast,
      }}
    >
      {children}
      <Toast toasts={toasts} removeToast={removeToast} />
    </FavouriteContext.Provider>
  );
}

export function useFavourites() {
  const context = useContext(FavouriteContext);

  if (!context) {
    throw new Error(
      "useFavourites must be used inside FavouriteProvider"
    );
  }

  return context;
}