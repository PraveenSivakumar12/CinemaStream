
import { useEffect, useState } from "react";
import MovieCard from "./MovieCard";
import "./MovieList.css";

function MovieList() {
  const [movies, setMovies] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function fetchMovies() {
      try {
        const apiKey = import.meta.env.VITE_TMDB_API_KEY;

        if (!apiKey) {
          throw new Error("TMDB API key is missing. Check your .env file.");
        }

        const response = await fetch(
          `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}&language=en-US&page=1`
        );

        if (!response.ok) {
          throw new Error("Failed to fetch movies from TMDB.");
        }

        const data = await response.json();

        setMovies(data.results);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    }

    fetchMovies();
  }, []);

  if (loading) {
    return <p className="movie-message">Loading movies...</p>;
  }

  if (error) {
    return <p className="movie-message">{error}</p>;
  }

  return (
    <section className="movie-section">
     

      <div className="movie-grid">
        {movies.map((movie) => (
          <MovieCard key={movie.id} movie={movie} />
        ))}
      </div>
    </section>
  );
}

export default MovieList;
