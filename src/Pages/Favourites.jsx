import { useFavourites } from "../Context/FavouriteContext";
import MovieCard from "../Movie_data/MovieCard";


function MyList() {
  const { favourites } = useFavourites();

  return (
    <div className="my-list-page">
      <h1>My List ❤️</h1>

      {favourites.length === 0 ? (
        <div className="empty-list">
          <h2>Your list is empty</h2>
          <p>
            Browse movies and click the 🤍 button to add
            them to your favourites.
          </p>
        </div>
      ) : (
        <div className="movie-grid">
          {favourites.map((movie) => (
            <MovieCard key={movie.id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}

export default MyList;