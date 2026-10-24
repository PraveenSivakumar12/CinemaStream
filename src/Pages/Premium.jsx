import { Link } from "react-router-dom";


function PremiumContent() {
  const premiumMovies = [
    {
      id: 1,
      title: "The Dark Horizon",
      genre: "Action · Thriller",
      year: 2026,
      image:
        "https://placehold.co/600x350/151515/ffffff?text=The+Dark+Horizon",
    },
    {
      id: 2,
      title: "Beyond the Stars",
      genre: "Sci-Fi · Adventure",
      year: 2026,
      image:
        "https://placehold.co/600x350/151515/ffffff?text=Beyond+the+Stars",
    },
    {
      id: 3,
      title: "The Last Kingdom",
      genre: "Drama · Fantasy",
      year: 2026,
      image:
        "https://placehold.co/600x350/151515/ffffff?text=The+Last+Kingdom",
    },
  ];

  return (
    <section className="premium-page">
      <header className="premium-header">
        <span className="premium-label">✦ CINEMASTREAM PREMIUM</span>

        <h1>Premium Collection</h1>

        <p>
          Discover exclusive stories and enjoy your next movie night.
        </p>
      </header>

      <div className="premium-movies">
        {premiumMovies.map((movie) => (
          <article className="premium-movie-card" key={movie.id}>
            <img
              src={movie.image}
              alt={movie.title}
            />

            <div className="premium-movie-info">
              <h2>{movie.title}</h2>
              <p>{movie.genre}</p>
              <span>{movie.year}</span>

              <button
                type="button"
                onClick={() =>
                  alert(`Player integration coming soon for ${movie.title}`)
                }
              >
                ▶ Watch Now
              </button>
            </div>
          </article>
        ))}
      </div>

      <Link to="/movies" className="back-to-movies">
        ← Explore All Movies
      </Link>
    </section>
  );
}

export default PremiumContent;