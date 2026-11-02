import { useEffect, useState } from "react";
import "./TrailerModal.css";
import { getOttLinks } from "../utils/ottPlatforms";
import { useFavourites } from "../Context/FavouriteContext";

const API_KEY = import.meta.env.VITE_TMDB_API_KEY;
const IMAGE_BASE = "https://image.tmdb.org/t/p/original";

function TrailerModal({ item, mediaType = "movie", onClose }) {
  const [videoKey, setVideoKey] = useState("");
  const [loading, setLoading] = useState(true);
  const [details, setDetails] = useState(null);
  const { toggleFavourite, isFavourite } = useFavourites();

  const title = item?.title || item?.name || "Untitled";
  const releaseDate = item?.release_date || item?.first_air_date || "";
  const year = releaseDate ? releaseDate.slice(0, 4) : "";
  const rating = Number(item?.vote_average ?? 0).toFixed(1);
  const backdropUrl = item?.backdrop_path
    ? `${IMAGE_BASE}${item.backdrop_path}`
    : item?.poster_path
    ? `https://image.tmdb.org/t/p/w780${item.poster_path}`
    : null;

  const favourite = item ? isFavourite(item.id) : false;
  const ottLinks = getOttLinks(title);

  // Prevent background scrolling while modal is open
  useEffect(() => {
    const originalOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    function handleKeyDown(event) {
      if (event.key === "Escape") {
        onClose();
      }
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = originalOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [onClose]);

  // Fetch trailer and detailed movie/tv info
  useEffect(() => {
    let isCancelled = false;

    async function loadData() {
      if (!item?.id) return;
      setLoading(true);
      setError("");

      try {
        const type = mediaType === "tv" || item?.first_air_date ? "tv" : "movie";

        // Fetch videos and details in parallel
        const [videosRes, detailsRes] = await Promise.all([
          fetch(
            `https://api.themoviedb.org/3/${type}/${item.id}/videos?api_key=${API_KEY}&language=en-US`
          ),
          fetch(
            `https://api.themoviedb.org/3/${type}/${item.id}?api_key=${API_KEY}&language=en-US`
          ),
        ]);

        if (videosRes.ok) {
          const videoData = await videosRes.json();
          const trailer =
            videoData.results?.find(
              (v) =>
                v.site === "YouTube" &&
                v.type === "Trailer" &&
                v.official
            ) ||
            videoData.results?.find(
              (v) => v.site === "YouTube" && v.type === "Trailer"
            ) ||
            videoData.results?.find((v) => v.site === "YouTube" && v.key);

          if (!isCancelled && trailer) {
            setVideoKey(trailer.key);
          }
        }

        if (detailsRes.ok) {
          const detailData = await detailsRes.json();
          if (!isCancelled) {
            setDetails(detailData);
          }
        }
      } catch {
        // Fallback gracefully to search link if TMDB trailer fails
      } finally {
        if (!isCancelled) {
          setLoading(false);
        }
      }
    }

    loadData();
    return () => {
      isCancelled = true;
    };
  }, [item, mediaType]);

  if (!item) return null;

  function handleBackdropClick(event) {
    if (event.target === event.currentTarget) {
      onClose();
    }
  }

  function handleFavClick() {
    toggleFavourite({
      id: item.id,
      title: title,
      name: item.name,
      poster_path: item.poster_path,
      backdrop_path: item.backdrop_path,
      release_date: item.release_date,
      first_air_date: item.first_air_date,
      vote_average: item.vote_average,
      overview: item.overview,
      media_type: mediaType,
      image: item.poster_path
        ? `https://image.tmdb.org/t/p/w500${item.poster_path}`
        : null,
    });
  }

  const runtime = details?.runtime
    ? `${Math.floor(details.runtime / 60)}h ${details.runtime % 60}m`
    : details?.number_of_seasons
    ? `${details.number_of_seasons} Season${details.number_of_seasons > 1 ? "s" : ""}`
    : null;

  return (
    <div
      className="trailer-backdrop"
      onClick={handleBackdropClick}
      role="dialog"
      aria-modal="true"
      aria-label={`${title} trailer preview`}
    >
      <div className="trailer-dialog">
        <button
          className="trailer-close-btn"
          onClick={onClose}
          aria-label="Close modal"
          type="button"
        >
          ✕
        </button>

        <div className="trailer-player-wrap">
          {loading ? (
            <div className="trailer-placeholder">
              <div className="trailer-loading">
                <div className="trailer-spinner" />
                <p>Loading trailer for {title}...</p>
              </div>
            </div>
          ) : videoKey ? (
            <iframe
              src={`https://www.youtube-nocookie.com/embed/${videoKey}?autoplay=1&rel=0&modestbranding=1`}
              title={`${title} Official Trailer`}
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            />
          ) : (
            <div
              className="trailer-placeholder"
              style={{
                backgroundImage: backdropUrl ? `url(${backdropUrl})` : "none",
              }}
            >
              <div className="trailer-placeholder-content">
                <span className="trailer-placeholder-icon">🎬</span>
                <h3>Official Trailer Preview</h3>
                <p>
                  Official TMDB trailer clip is currently unavailable.
                  You can watch on YouTube or stream on partner platforms below!
                </p>
                <a
                  href={`https://www.youtube.com/results?search_query=${encodeURIComponent(
                    title + " official trailer"
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-ott-btn"
                  style={{ background: "#FF0000", color: "#FFF" }}
                >
                  ▶ Search "{title}" on YouTube
                </a>
              </div>
            </div>
          )}
        </div>

        <div className="trailer-info-body">
          <div className="trailer-header-row">
            <div>
              <h2 className="trailer-title">{title}</h2>
              {details?.tagline && (
                <p className="trailer-tagline">"{details.tagline}"</p>
              )}
            </div>

            <div className="trailer-modal-actions">
              <button
                type="button"
                className={`trailer-fav-btn ${favourite ? "is-fav" : ""}`}
                onClick={handleFavClick}
                aria-pressed={favourite}
              >
                <span>{favourite ? "❤️" : "🤍"}</span>
                <span>{favourite ? "In My List" : "Add to List"}</span>
              </button>
            </div>
          </div>

          <div className="trailer-meta-pills">
            {rating > 0 && (
              <span className="meta-pill rating">⭐ {rating} TMDB</span>
            )}
            {year && <span className="meta-pill">{year}</span>}
            {runtime && <span className="meta-pill">{runtime}</span>}
            {details?.status && (
              <span className="meta-pill">{details.status}</span>
            )}
            {details?.genres && (
              <div className="meta-genre-tags">
                {details.genres.map((g) => (
                  <span key={g.id} className="genre-tag">
                    {g.name}
                  </span>
                ))}
              </div>
            )}
          </div>

          <p className="trailer-synopsis">
            {item.overview ||
              details?.overview ||
              "No detailed synopsis available for this title."}
          </p>

          <div className="modal-ott-section">
            <h4 className="modal-ott-title">
              <span>⚡</span> Stream Now on OTT Platforms:
            </h4>
            <div className="modal-ott-grid">
              {ottLinks.map((plat) => (
                <a
                  key={plat.id}
                  href={plat.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="modal-ott-btn"
                  style={{
                    backgroundColor: plat.badgeColor,
                    color: plat.textColor,
                    border: plat.border || "none",
                  }}
                  title={`Watch ${title} on ${plat.name}`}
                >
                  <span className="modal-ott-icon">{plat.icon}</span>
                  <span>{plat.name}</span>
                  <span style={{ fontSize: "10px", opacity: 0.8 }}>↗</span>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrailerModal;
