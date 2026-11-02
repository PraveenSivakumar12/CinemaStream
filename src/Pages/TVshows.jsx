import { useState } from "react";
import MovieList from "../Movie_data/MovieList";

const TV_CATEGORIES = [
  { id: "popular", label: "Popular Series", endpoint: "tv/popular", desc: "Most-watched TV series and web shows" },
  { id: "top_rated", label: "Top Rated", endpoint: "tv/top_rated", desc: "Critically acclaimed television masterpieces" },
  { id: "on_the_air", label: "Airing Now", endpoint: "tv/on_the_air", desc: "New episodes broadcasting this week" },
];

function TVShows() {
  const [activeCategory, setActiveCategory] = useState(TV_CATEGORIES[0]);

  return (
    <div className="tv-shows-page-container">
      <header className="page-hero-banner tv-banner">
        <div className="page-hero-content">
          <span className="page-hero-tag">TELEVISION & SERIES</span>
          <h1>Binge Your Next Favorite Show</h1>
          <p>
            Explore trending series, watch official trailers, and find out where
            to stream full seasons on Netflix, Disney+ Hotstar, Prime Video and more.
          </p>

          <div className="category-tab-bar">
            {TV_CATEGORIES.map((cat) => (
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
        title={activeCategory.label}
        subtitle={activeCategory.desc}
        endpoint={activeCategory.endpoint}
        mediaType="tv"
        showFilters={false}
        limit={20}
      />
    </div>
  );
}

export default TVShows;