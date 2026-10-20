
import { useEffect, useState } from "react";
import "./FeaturedCarousel.css";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

function FeaturedCarousel() {
  const [movies, setMovies] = useState([]);
  const [activeIndex, setActiveIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [trailerKey, setTrailerKey] = useState("");
  const [trailerLoading, setTrailerLoading] = useState(false);
  const [trailerError, setTrailerError] = useState("");

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
    if (movies.length < 2 || trailerKey) return;

    const interval = setInterval(() => {
      setActiveIndex((previousIndex) =>
        (previousIndex + 1) % movies.length
      );
    }, 6000);

    return () => clearInterval(interval);
  }, [movies.length, trailerKey, activeIndex]);

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

  async function playTrailer(movie) {
    setTrailerError("");
    setTrailerKey("");
    setTrailerLoading(true);

    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${API_KEY}&language=en-US`
      );

      if (!response.ok) {
        throw new Error("Unable to fetch the trailer.");
      }

      const data = await response.json();

      const trailer = data.results.find(
        (video) =>
          video.site === "YouTube" &&
          video.type === "Trailer" &&
          video.official
      ) || data.results.find(
        (video) =>
          video.site === "YouTube" &&
          video.type === "Trailer"
      );

      if (trailer) {
        setTrailerKey(trailer.key);
      } else {
        setTrailerError("No trailer is available for this movie.");
      }
    } catch {
      setTrailerError("Could not load the trailer. Please try again.");
    } finally {
      setTrailerLoading(false);
    }
  }

  if (loading) {
    return <div className="featured-message">Loading featured movies...</div>;
  }

  if (error) {
    return <div className="featured-message">{error}</div>;
  }

  if (movies.length === 0) {
    return <div className="featured-message">No featured movies found.</div>;
  }

  const movie = movies[activeIndex];

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
            <p className="featured-label">CINEMASTREAM ORIGINALS</p>

            <h1>{movie.title}</h1>

            <div className="featured-meta">
              <span>
                {movie.release_date
                  ? movie.release_date.slice(0, 4)
                  : "Release date unavailable"}
              </span>

              <span>⭐ {movie.vote_average.toFixed(1)}</span>
            </div>

            <p className="featured-overview">
              {movie.overview || "Discover this movie on Cinema-Stream."}
            </p>

            <button
              className="featured-play-button"
              onClick={() => playTrailer(movie)}
              disabled={trailerLoading}
            >
              {trailerLoading ? "Loading trailer..." : "▶ Play Trailer"}
            </button>

            {trailerError && (
              <p className="trailer-error" role="status">
                {trailerError}
              </p>
            )}
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

      {trailerKey && (
        <div
          className="trailer-modal"
          role="dialog"
          aria-modal="true"
          aria-label={`${movie.title} trailer`}
        >
          <button
            className="trailer-close"
            onClick={() => setTrailerKey("")}
            aria-label="Close trailer"
          >
            ✕
          </button>

          <iframe
            src={`https://www.youtube-nocookie.com/embed/${trailerKey}?autoplay=1`}
            title={`${movie.title} trailer`}
            allow="autoplay; encrypted-media; picture-in-picture"
            allowFullScreen
          />
        </div>
      )}
    </section>
  );
}

export default FeaturedCarousel;
