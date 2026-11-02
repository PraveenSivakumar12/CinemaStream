import { useState } from "react";
import MovieList from "../Movie_data/MovieList";

const MOVIE_CATEGORIES = [
  { id: "popular", label: "Popular", endpoint: "movie/popular", desc: "Currently trending with global audiences" },
  { id: "top_rated", label: "Top Rated", endpoint: "movie/top_rated", desc: "Highest voter ratings on TMDB" },
  { id: "now_playing", label: "In Theaters", endpoint: "movie/now_playing", desc: "Currently playing in cinemas" },
  { id: "upcoming", label: "Upcoming", endpoint: "movie/upcoming", desc: "Anticipated blockbusters arriving soon" },
];

function Movies() {
  const [activeCategory, setActiveCategory] = useState(MOVIE_CATEGORIES[0]);

  return (
    <div className="movies-page-container">
      <header className="page-hero-banner">
        <div className="page-hero-content">
          <span className="page-hero-tag">DISCOVER MOVIES</span>
          <h1>Explore Cinematic Worlds</h1>
          <p>
            Dive into thousands of movies, watch trailers with blurred cinema modal,
            and navigate to Netflix, Prime Video, or Hotstar to start streaming.
          </p>

          <div className="category-tab-bar">
            {MOVIE_CATEGORIES.map((cat) => (
              <button
                key={cat.id}
                type="button"
                className={`category-tab-btn ${
                  activeCategory.id === cat.id ? "active" : ""
                }`}
                onClick={() => setActiveCategory(cat)}
              >
                {cat.label}
              </button>
            ))}
          </div>
        </div>
      </header>

      <MovieList
        key={activeCategory.id}
        title={activeCategory.label + " Movies"}
        subtitle={activeCategory.desc}
        endpoint={activeCategory.endpoint}
        mediaType="movie"
        showFilters={true}
        limit={20}
      />
    </div>
  );
}

export default Movies;