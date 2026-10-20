
import { useEffect, useState } from "react";
import searchMovies  from "../Movie_data/movieApi";
import "./Search.css";

function Search({ onClose }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const value = query.trim();

    if (!value) {
      setMovies([]);
      setLoading(false);
      setError("");
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const results = await searchMovies(value);

        if (!cancelled) {
          setMovies(results);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to load movies. Try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 400);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  return (
    <div className="search-overlay">
      <div className="search-panel">
        <div className="search-header">
          <h2>Search Movies</h2>

          <button
            className="search-close"
            onClick={onClose}
            aria-label="Close search"
          >
            ✕
          </button>
        </div>

        <input
          className="search-input"
          type="search"
          placeholder="Search for movies..."
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          autoFocus
        />

        {loading && <p className="search-message">Searching...</p>}
        {error && <p className="search-message">{error}</p>}

        {!loading && !error && query.trim() && movies.length === 0 && (
          <p className="search-message">No movies found.</p>
        )}

        <div className="search-results">
          {movies.map((movie) => (
            <div className="search-result" key={movie.id}>
              {movie.poster_path ? (
                <img
                  src={`https://image.tmdb.org/t/p/w92${movie.poster_path}`}
                  alt={movie.title}
                />
              ) : (
                <div className="search-no-poster">No image</div>
              )}

              <div>
                <h3>{movie.title}</h3>
                <p>
                  {movie.release_date
                    ? movie.release_date.slice(0, 4)
                    : "Release date unavailable"}
                </p>
                {movie.overview && <p>{movie.overview}</p>}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Search;
