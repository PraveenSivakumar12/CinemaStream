import "./Footer.css";
import { Link } from "react-router-dom";

const CURRENT_YEAR = new Date().getFullYear();

function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-top-grid">
        <div className="footer-brand">
          <Link to="/" className="footer-logo">
            <span className="brand-icon">▶</span>
            CINEMA<span>STREAM</span>
          </Link>
          <p>
            Your ultimate portal for movie discovery, official HD trailers,
            and seamless streaming navigation across Netflix, Amazon Prime,
            Disney+ Hotstar and Apple TV+.
          </p>
          <div className="footer-ott-notice">
            <span>Powered by TMDB API • Non-commercial demo</span>
          </div>
        </div>

        <div className="footer-links-col">
          <h4>Navigation</h4>
          <Link to="/">Home</Link>
          <Link to="/movies">Popular Movies</Link>
          <Link to="/tv-shows">TV Shows & Series</Link>
          <Link to="/my-list">My Watchlist</Link>
          <Link to="/subscription">Subscription Plans</Link>
        </div>

        <div className="footer-links-col">
          <h4>Supported Platforms</h4>
          <span className="footer-plat-item">Netflix</span>
          <span className="footer-plat-item">Amazon Prime Video</span>
          <span className="footer-plat-item">Disney+ Hotstar</span>
          <span className="footer-plat-item">Apple TV+</span>
          <span className="footer-plat-item">YouTube Movies</span>
        </div>
      </div>

      <div className="footer-bottom-row">
        <p className="footer-copy">
          © {CURRENT_YEAR} Cinema-Stream. Built with React & Vite. All rights reserved.
        </p>
        <div className="footer-legal-links">
          <span>Privacy Policy</span>
          <span>Terms of Use</span>
          <span>API Attribution</span>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
