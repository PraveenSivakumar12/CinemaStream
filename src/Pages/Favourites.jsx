import { Link } from "react-router-dom";
import { useFavourites } from "../Context/FavouriteContext";
import MovieCard from "../Movie_data/MovieCard";

function MyList() {
  const { favourites } = useFavourites();

  return (
    <div className="my-list-page">
      <header className="my-list-header">
        <div>
          <span className="page-hero-tag">PERSONAL WATCHLIST</span>
          <h1>My List ❤️</h1>
          <p>
            {favourites.length === 1
              ? "You have 1 title saved to your watchlist"
              : `You have ${favourites.length} titles saved to your watchlist`}
          </p>
        </div>

        {favourites.length > 0 && (
          <Link to="/movies" className="explore-more-btn">
            + Add More Movies
          </Link>
        )}
      </header>

      {favourites.length === 0 ? (
        <div className="empty-list">
          <div className="empty-list-icon">🍿</div>
          <h2>Your Watchlist is Empty</h2>
          <p>
            Explore movies or TV series and click the heart (🤍) button on any card
            to save titles here for easy access and trailer streaming.
          </p>
          <div className="empty-list-actions">
            <Link to="/movies" className="feature-primary-btn">
              Explore Popular Movies
            </Link>
            <Link to="/tv-shows" className="feature-secondary-btn">
              Browse TV Series
            </Link>
          </div>
        </div>
      ) : (
        <div className="movie-grid">
          {favourites.map((movie) => (
            <MovieCard
              key={movie.id}
              movie={movie}
              mediaType={movie.media_type || (movie.first_air_date ? "tv" : "movie")}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyList;