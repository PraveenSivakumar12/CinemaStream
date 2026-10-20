
import "./MovieCard.css";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie }) {
  if (!movie) {
    return null;
  }

  const {
    title,
    poster_path,
    release_date,
    vote_average,
    overview,
  } = movie;

  const poster = poster_path
    ? `${IMAGE_BASE}${poster_path}`
    : null;

  const year = release_date
    ? release_date.slice(0, 4)
    : "Year unavailable";

  return (
    <div className="movie-card">
      {poster ? (
        <img
          className="movie-poster"
          src={poster}
          alt={title}
          loading="lazy"
        />
      ) : (
        <div className="poster-placeholder">
          No poster available
        </div>
      )}

      <div className="movie-overlay">
        <h3>{title}</h3>

        <div className="movie-meta">
          <span>{year}</span>
          <span>
            ⭐ {Number(vote_average ?? 0).toFixed(1)}
          </span>
        </div>

        <p className="movie-overview">
          {overview || "No description available."}
        </p>

        <button
          className="movie-details-btn"
          onClick={() => alert(`Selected: ${title}`)}
        >
          View Details
        </button>
      </div>
    </div>
  );
}

export default MovieCard;
