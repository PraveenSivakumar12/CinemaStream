import { useEffect, useState } from "react";
import searchMovies from "../Movie_data/movieApi";
import "./Search.css";
import TrailerModal from "../Components/TrailerModal";
import { getOttLinks } from "../utils/ottPlatforms";

function Search({ onClose }) {
  const [query, setQuery] = useState("");
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [selectedMovie, setSelectedMovie] = useState(null);

  useEffect(() => {
    const value = query.trim();

    if (!value) {
      return;
    }

    let cancelled = false;

    const timer = setTimeout(async () => {
      setLoading(true);
      setError("");

      try {
        const results = await searchMovies(value);

        if (!cancelled) {
          setMovies(results || []);
        }
      } catch {
        if (!cancelled) {
          setError("Unable to search movies. Please try again.");
        }
      } finally {
        if (!cancelled) {
          setLoading(false);
        }
      }
    }, 350);

    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [query]);

  function handleInputChange(event) {
    const nextValue = event.target.value;
    setQuery(nextValue);
    if (!nextValue.trim()) {
      setMovies([]);
      setError("");
      setLoading(false);
    }
  }

  return (
    <div className="search-overlay" onClick={(e) => {
      if (e.target === e.currentTarget && !selectedMovie) onClose();
    }}>
      <div className="search-panel">
        <div className="search-header">
          <h2>Search Cinema-Stream</h2>

          <button
            type="button"
            className="search-close"
            onClick={onClose}
            aria-label="Close search"
          >
            ✕
          </button>
        </div>

        <div className="search-input-wrapper">
          <span className="search-icon-symbol">🔍</span>
          <input
            className="search-input"
            type="search"
            placeholder="Type a movie title (e.g. Inception, Avatar, Batman)..."
            value={query}
            onChange={handleInputChange}
            autoFocus
          />
        </div>

        {loading && (
          <div className="search-status-box">
            <div className="search-spinner" />
            <p className="search-message">Searching TMDB library...</p>
          </div>
        )}

        {error && <p className="search-message search-error">{error}</p>}

        {!loading && !error && query.trim() && movies.length === 0 && (
          <div className="search-empty-box">
            <span style={{ fontSize: "32px" }}>🔍</span>
            <p>No titles found matching "{query}"</p>
          </div>
        )}

        <div className="search-results">
          {movies.map((movie) => {
            const ottLinks = getOttLinks(movie.title);
            return (
              <div
                className="search-result-item"
                key={movie.id}
                onClick={() => setSelectedMovie(movie)}
                role="button"
                tabIndex={0}
                onKeyDown={(e) => {
                  if (e.key === "Enter") setSelectedMovie(movie);
                }}
              >
                {movie.poster_path ? (
                  <img
                    className="search-poster-img"
                    src={`https://image.tmdb.org/t/p/w185${movie.poster_path}`}
                    alt={movie.title}
                  />
                ) : (
                  <div className="search-no-poster">🎬</div>
                )}

                <div className="search-result-info">
                  <div className="search-item-header">
                    <h3>{movie.title}</h3>
                    <span className="search-rating">
                      ⭐ {Number(movie.vote_average ?? 0).toFixed(1)}
                    </span>
                  </div>

                  <p className="search-release-year">
                    {movie.release_date
                      ? movie.release_date.slice(0, 4)
                      : "Release date unavailable"}
                  </p>

                  <p className="search-overview-text">
                    {movie.overview || "Click to watch trailer and stream."}
                  </p>

                  <div className="search-result-footer">
                    <span className="search-watch-trailer-tag">
                      ▶ Watch Trailer
                    </span>

                    <div
                      className="search-ott-badges"
                      onClick={(e) => e.stopPropagation()}
                    >
                      {ottLinks.slice(0, 3).map((plat) => (
                        <a
                          key={plat.id}
                          href={plat.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="search-ott-badge"
                          style={{
                            backgroundColor: plat.badgeColor,
                            color: plat.textColor,
                            border: plat.border || "none",
                          }}
                          title={`Watch on ${plat.name}`}
                        >
                          {plat.name}
                        </a>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {selectedMovie && (
        <TrailerModal
          item={selectedMovie}
          mediaType="movie"
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </div>
  );
}

export default Search;
