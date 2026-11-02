import FeaturedCarousel from "../Movie_data/FeaturedCarousel";
import MovieList from "../Movie_data/MovieList";
import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="home-page-container">
      <FeaturedCarousel />

      <MovieList
        title="Trending Movies"
        subtitle="The hottest movies being watched worldwide today"
        endpoint="movie/popular"
        mediaType="movie"
        showFilters={true}
        limit={10}
      />

      <MovieList
        title="Critically Acclaimed & Top Rated"
        subtitle="All-time cinematic masterpieces loved by audiences"
        endpoint="movie/top_rated"
        mediaType="movie"
        limit={10}
      />

      <MovieList
        title="Binge-Worthy TV Series"
        subtitle="Top trending television shows and web series"
        endpoint="tv/popular"
        mediaType="tv"
        limit={10}
      />

      <section className="features-banner-section">
        <div className="features-banner-card">
          <div className="features-banner-content">
            <span className="features-tag">WHY CINEMA STREAM</span>
            <h2>Your Ultimate Entertainment Companion</h2>
            <p>
              Stream official high-definition trailers, discover where to watch on
              top OTT platforms (Netflix, Prime Video, Disney+ Hotstar, Apple TV),
              and build your dream cinema watchlist — all in one sleek platform.
            </p>
            <div className="features-cta-group">
              <Link to="/movies" className="feature-primary-btn">
                Browse All Movies
              </Link>
              <Link to="/subscription" className="feature-secondary-btn">
                View Subscription Plans
              </Link>
            </div>
          </div>
          <div className="features-grid-perks">
            <div className="perk-box">
              <span className="perk-icon">🎬</span>
              <h4>HD Official Trailers</h4>
              <p>Watch YouTube trailers in our cinematic theater overlay.</p>
            </div>
            <div className="perk-box">
              <span className="perk-icon">⚡</span>
              <h4>Direct OTT Navigation</h4>
              <p>One-click deep links to Netflix, Prime Video, Hotstar & Apple TV.</p>
            </div>
            <div className="perk-box">
              <span className="perk-icon">❤️</span>
              <h4>Personal Watchlist</h4>
              <p>Save and organize your favorite titles with instant sync.</p>
            </div>
            <div className="perk-box">
              <span className="perk-icon">💎</span>
              <h4>Premium Perks</h4>
              <p>Access exclusive 4K content and ad-free experience.</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

export default Home;