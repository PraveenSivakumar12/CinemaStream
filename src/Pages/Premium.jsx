import { useState } from "react";
import { Link } from "react-router-dom";
import TrailerModal from "../Components/TrailerModal";
import { getOttLinks } from "../utils/ottPlatforms";

function PremiumContent() {
  const [selectedMovie, setSelectedMovie] = useState(null);

  const premiumMovies = [
    {
      id: 912649,
      title: "Venom: The Last Dance",
      genre: "Action · Sci-Fi · Thriller",
      year: 2024,
      quality: "4K ULTRA HD",
      vote_average: 7.8,
      overview:
        "Eddie and Venom are on the run. Hunted by both of their worlds and with the net closing in, the duo are forced into a devastating decision that will bring the curtains down.",
      poster_path: "/aosm8Vh92BdBt3mNp0vfTg7Dr5O.jpg",
      image: "https://image.tmdb.org/t/p/w780/3V4kLQg0kSqPLctI5ziYWMEAZYF.jpg",
    },
    {
      id: 533535,
      title: "Deadpool & Wolverine",
      genre: "Action · Comedy · Sci-Fi",
      year: 2024,
      quality: "IMAX ENHANCED",
      vote_average: 8.2,
      overview:
        "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again.",
      poster_path: "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
      image: "https://image.tmdb.org/t/p/w780/yDHYTjA3R0jFYba16jBB1jv82E9.jpg",
    },
    {
      id: 693134,
      title: "Dune: Part Two",
      genre: "Sci-Fi · Adventure",
      year: 2024,
      quality: "DOLBY VISION & ATMOS",
      vote_average: 8.6,
      overview:
        "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family.",
      poster_path: "/1pdfLvkbY9ohJlCjQH2CZjjYVvJ.jpg",
      image: "https://image.tmdb.org/t/p/w780/xOMo8BRK7PfcJv9JCnx7s520042.jpg",
    },
    {
      id: 1022789,
      title: "Inside Out 2",
      genre: "Animation · Adventure · Comedy",
      year: 2024,
      quality: "4K ULTRA HD",
      vote_average: 7.9,
      overview:
        "Teenager Riley's mind headquarters is undergoing a sudden demolition to make room for something entirely unexpected: new Emotions! Joy, Sadness, Anger, Fear and Disgust aren't sure how to feel when Anxiety shows up.",
      poster_path: "/vpnVM9B6NMmQpWeZvzLvDESb2QY.jpg",
      image: "https://image.tmdb.org/t/p/w780/stKGOm80Z02QSE0bVsq7ClPaq1Z.jpg",
    },
  ];

  return (
    <section className="premium-page">
      <header className="premium-header">
        <span className="premium-label">✦ CINEMASTREAM VIP ACCESS</span>
        <h1>VIP Premium Collection</h1>
        <p>
          Enjoy exclusive 4K Ultra HD blockbusters with Dolby Atmos trailers
          and direct streaming destinations.
        </p>
      </header>

      <div className="premium-movies">
        {premiumMovies.map((movie) => {
          const ottLinks = getOttLinks(movie.title);
          return (
            <article className="premium-movie-card" key={movie.id}>
              <div className="premium-card-image-wrap">
                <img src={movie.image} alt={movie.title} />
                <span className="premium-quality-tag">{movie.quality}</span>
              </div>

              <div className="premium-movie-info">
                <div className="premium-card-title-row">
                  <h2>{movie.title}</h2>
                  <span className="premium-star-rating">⭐ {movie.vote_average}</span>
                </div>

                <p className="premium-genre-text">{movie.genre} • {movie.year}</p>
                <p className="premium-synopsis-text">{movie.overview}</p>

                <div className="card-ott-section">
                  <span className="card-ott-label">Watch full movie on:</span>
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
                        title={`Watch on ${plat.name}`}
                      >
                        <span>{plat.icon}</span>
                        <span>{plat.name}</span>
                      </a>
                    ))}
                  </div>
                </div>

                <button
                  type="button"
                  className="premium-watch-trailer-btn"
                  onClick={() => setSelectedMovie(movie)}
                >
                  ▶ Watch Official 4K Trailer
                </button>
              </div>
            </article>
          );
        })}
      </div>

      <div className="premium-footer-nav">
        <Link to="/movies" className="back-to-movies">
          ← Explore General Movies
        </Link>
      </div>

      {selectedMovie && (
        <TrailerModal
          item={selectedMovie}
          mediaType="movie"
          onClose={() => setSelectedMovie(null)}
        />
      )}
    </section>
  );
}

export default PremiumContent;