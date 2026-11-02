import { useEffect, useState } from "react";
import "./FeaturedCarousel.css";
import TrailerModal from "../Components/TrailerModal";
import { getOttLinks } from "../utils/ottPlatforms";
import { useFavourites } from "../Context/FavouriteContext";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

function FeaturedCarousel() {
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [selectedMovieForTrailer, setSelectedMovieForTrailer] = useState(null);

  const { toggleFavourite, isFavourite } = useFavourites();

  // Fetch movie data from TMDB
  useEffect(() => {
    async function fetchFeaturedMovies() {
      try {
        if (!API_KEY) {
          throw new Error("TMDB API key is missing.");
        }

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error("Unable to fetch featured movies.");
        }

        const data = await response.json();

        const featured = data.results
          .filter((movie) => movie.backdrop_path)
          .slice(0, 8);

        setMovies(featured);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchFeaturedMovies();
  }, []);

  // Automatically move to the next movie
  useEffect(() => {
    if (movies.length < 2 || selectedMovieForTrailer) return;

    const interval = setInterval(() => {
      setActiveIndex((previousIndex) =>
        (previousIndex + 1) % movies.length
      );
    }, 6500);

    return () => clearInterval(interval);
  }, [movies.length, selectedMovieForTrailer]);

  function showPrevious() {
    setActiveIndex((index) =>
      (index - 1 + movies.length) % movies.length
    );
  }

  function showNext() {
    setActiveIndex((index) =>
      (index + 1) % movies.length
    );
  }

  if (loading) {
    return (
      <div className="featured-message">
        <div className="featured-spinner" />
        <p>Loading featured movies...</p>
      </div>
    );
  }

  if (error) {
    return <div className="featured-message">{error}</div>;
  }

  if (movies.length === 0) {
    return <div className="featured-message">No featured movies found.</div>;
  }

  const movie = movies[activeIndex];
  const ottLinks = getOttLinks(movie.title);
  const favourite = isFavourite(movie.id);

  function handleToggleFav() {
    toggleFavourite({
      id: movie.id,
      title: movie.title,
      poster_path: movie.poster_path,
      backdrop_path: movie.backdrop_path,
      release_date: movie.release_date,
      vote_average: movie.vote_average,
      overview: movie.overview,
      media_type: "movie",
      image: movie.poster_path
        ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
        : null,
    });
  }

  return (
    <section className="featured-carousel">
      <div
        className="featured-backdrop"
        style={{
          backgroundImage: `url("${IMAGE_BASE}${movie.backdrop_path}")`,
        }}
        key={movie.id}
      >
        <div className="featured-gradient">
          <div className="featured-content">
            <p className="featured-label">✦ CINEMASTREAM FEATURED</p>

            <h1>{movie.title}</h1>

            <div className="featured-meta">
              <span>
                {movie.release_date
                  ? movie.release_date.slice(0, 4)
                  : "Release date unavailable"}
              </span>

              <span>⭐ {movie.vote_average?.toFixed(1)} TMDB</span>
            </div>

            <p className="featured-overview">
              {movie.overview || "Discover this movie on Cinema-Stream."}
            </p>

            <div className="featured-action-buttons">
              <button
                type="button"
                className="featured-play-button"
                onClick={() => setSelectedMovieForTrailer(movie)}
              >
                ▶ Watch Trailer
              </button>

              <button
                type="button"
                className={`featured-fav-button ${favourite ? "active" : ""}`}
                onClick={handleToggleFav}
              >
                {favourite ? "❤️ In My List" : "🤍 Add to List"}
              </button>
            </div>

            <div className="featured-ott-row">
              <span className="featured-ott-tag">Available on:</span>
              <div className="featured-ott-badges">
                {ottLinks.slice(0, 4).map((plat) => (
                  <a
                    key={plat.id}
                    href={plat.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="featured-ott-pill"
                    style={{
                      backgroundColor: plat.badgeColor,
                      color: plat.textColor,
                      border: plat.border || "none",
                    }}
                    title={`Watch on ${plat.name}`}
                  >
                    <span>{plat.icon}</span>
                    <span>{plat.name}</span>
                  </a>
                ))}
              </div>
            </div>
          </div>

          <button
            className="carousel-arrow previous"
            onClick={showPrevious}
            aria-label="Previous movie"
          >
            ❮
          </button>

          <button
            className="carousel-arrow next"
            onClick={showNext}
            aria-label="Next movie"
          >
            ❯
          </button>

          <div className="carousel-dots">
            {movies.map((item, index) => (
              <button
                key={item.id}
                className={index === activeIndex ? "dot active" : "dot"}
                onClick={() => setActiveIndex(index)}
                aria-label={`Show ${item.title}`}
                aria-current={index === activeIndex ? "true" : undefined}
              />
            ))}
          </div>
        </div>
      </div>

      {selectedMovieForTrailer && (
        <TrailerModal
          item={selectedMovieForTrailer}
          mediaType="movie"
          onClose={() => setSelectedMovieForTrailer(null)}
        />
      )}
    </section>
  );
}

export default FeaturedCarousel;
