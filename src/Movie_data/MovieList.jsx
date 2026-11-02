import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

const GENRES = [
  { id: "all", name: "All Genres" },
  { id: 28, name: "Action" },
  { id: 35, name: "Comedy" },
  { id: 18, name: "Drama" },
  { id: 878, name: "Sci-Fi" },
  { id: 16, name: "Animation" },
  { id: 27, name: "Horror" },
  { id: 53, name: "Thriller" },
];

function MovieList({
  title = "Trending Movies",
  subtitle = "Discover the most popular movies streaming right now",
  endpoint = "movie/popular",
  mediaType = "movie",
  showFilters = false,
  limit = 20,
}) {
  const [items, setItems] = useState([]);
  const [selectedGenre, setSelectedGenre] = useState("all");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      setError("");

      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        if (!apiKey) {
          throw new Error("TMDB API key is missing. Check your .env file.");
        }

        const response = await fetch(
          `https://api.themoviedb.org/3/${endpoint}?api_key=${apiKey}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data from TMDB.");
        }

        const data = await response.json();
        setItems(data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [endpoint]);

  const filteredItems = items
    .filter((item) => {
      if (selectedGenre === "all") return true;
      return item.genre_ids?.includes(Number(selectedGenre));
    })
    .slice(0, limit);

  return (
    <section className="movie-section">
      <div className="section-header-wrap">
        <div>
          <h2 className="section-title">
            <span className="section-title-bar" />
            {title}
          </h2>
          {subtitle && <p className="section-subtitle">{subtitle}</p>}
        </div>

        {showFilters && (
          <div className="genre-filter-chips">
            {GENRES.map((g) => (
              <button
                key={g.id}
                type="button"
                className={`genre-chip ${
                  selectedGenre === g.id ? "active" : ""
                }`}
                onClick={() => setSelectedGenre(g.id)}
              >
                {g.name}
              </button>
            ))}
          </div>
        )}
      </div>

      {loading ? (
        <div className="movie-grid">
          {Array.from({ length: 10 }).map((_, index) => (
            <div key={index} className="skeleton-card">
              <div className="skeleton-poster" />
            </div>
          ))}
        </div>
      ) : error ? (
        <div className="movie-message error-message">
          <p>⚠️ {error}</p>
        </div>
      ) : filteredItems.length === 0 ? (
        <div className="movie-message empty-genre-message">
          <p>No titles found in this category.</p>
        </div>
      ) : (
        <div className="movie-grid">
          {filteredItems.map((item) => (
            <MovieCard key={item.id} movie={item} mediaType={mediaType} />
          ))}
        </div>
      )}
    </section>
  );
}

export default MovieList;
