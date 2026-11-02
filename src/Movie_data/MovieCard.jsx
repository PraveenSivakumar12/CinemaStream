import { useState } from "react";
import "./MovieCard.css";
import { useFavourites } from "../Context/FavouriteContext";
import TrailerModal from "../Components/TrailerModal";
import { getOttLinks } from "../utils/ottPlatforms";

const IMAGE_BASE = "https://image.tmdb.org/t/p/w500";

function MovieCard({ movie, mediaType = "movie" }) {
  const { toggleFavourite, isFavourite, justAddedId } = useFavourites();
  const [showTrailer, setShowTrailer] = useState(false);

  if (!movie) {
    return null;
  }

  const {
    id,
    title,
    name,
    poster_path,
    backdrop_path,
    release_date,
    first_air_date,
    vote_average,
    overview,
  } = movie;

  const displayTitle = title || name || "Untitled";
  const displayDate = release_date || first_air_date || "";
  const year = displayDate ? displayDate.slice(0, 4) : "N/A";
  const poster = poster_path ? `${IMAGE_BASE}${poster_path}` : null;
  const rating = Number(vote_average ?? 0).toFixed(1);

  const favourite = isFavourite(id);
  const isBursting = justAddedId === id;
  const ottLinks = getOttLinks(displayTitle);

  function handleFavouriteClick(event) {
    event.stopPropagation();

    toggleFavourite({
      id,
      title: displayTitle,
      name,
      poster_path,
      backdrop_path,
      release_date,
      first_air_date,
      vote_average,
      overview,
      media_type: mediaType,
      image: poster,
    });
  }

  function handleCardClick() {
    setShowTrailer(true);
  }

  function handleOttClick(event) {
    event.stopPropagation();
  }

  return (
    <>
      <div
        className="movie-card"
        onClick={handleCardClick}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            setShowTrailer(true);
          }
        }}
        aria-label={`Open trailer and details for ${displayTitle}`}
      >
        {poster ? (
          <img
            className="movie-poster"
            src={poster}
            alt={displayTitle}
            loading="lazy"
          />
        ) : (
          <div className="poster-placeholder">
            <span>🎬</span>
            <span>{displayTitle}</span>
          </div>
        )}

        <button
          type="button"
          className={`favourite-btn ${favourite ? "is-favourite" : ""} ${
            isBursting ? "animate-burst" : ""
          }`}
          onClick={handleFavouriteClick}
          aria-label={
            favourite
              ? `Remove ${displayTitle} from favourites`
              : `Add ${displayTitle} to favourites`
          }
          aria-pressed={favourite}
        >
          {favourite ? "❤️" : "🤍"}

          {isBursting && (
            <span className="fav-particle-burst" aria-hidden="true">
              <span className="fav-particle p1">❤️</span>
              <span className="fav-particle p2">✨</span>
              <span className="fav-particle p3">💖</span>
            </span>
          )}
        </button>

        <div className="movie-overlay">
          <h3 className="movie-overlay-title">{displayTitle}</h3>

          <div className="movie-meta">
            <span className="movie-meta-year">{year}</span>
            <span className="movie-meta-rating">⭐ {rating}</span>
          </div>

          <p className="movie-overview">
            {overview || "No description available for this title."}
          </p>

          <div className="card-ott-section" onClick={handleOttClick}>
            <span className="card-ott-label">Stream on:</span>
            <div className="card-ott-pills">
              {ottLinks.slice(0, 4).map((plat) => (
                <a
                  key={plat.id}
                  href={plat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="card-ott-pill"
                  style={{
                    backgroundColor: plat.badgeColor,
                    color: plat.textColor,
                    border: plat.border || "none",
                  }}
                  title={`Search & watch on ${plat.name}`}
                >
                  <span>{plat.icon}</span>
                  <span>{plat.name}</span>
                </a>
              ))}
            </div>
          </div>

          <button
            type="button"
            className="movie-details-btn"
            onClick={(e) => {
              e.stopPropagation();
              setShowTrailer(true);
            }}
          >
            <span>▶</span> Watch Trailer
          </button>
        </div>
      </div>

      {showTrailer && (
        <TrailerModal
          item={movie}
          mediaType={mediaType}
          onClose={() => setShowTrailer(false)}
        />
      )}
    </>
  );
}

export default MovieCard;