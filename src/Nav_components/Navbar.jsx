import { NavLink, Link, useNavigate } from "react-router-dom";
import "./Navbar.css";
import Search from "./Search";
import { useState, useEffect } from "react";
import { useFavourites } from "../Context/FavouriteContext";
import { useAuth } from "../Context/AuthContext";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [badgeAnimated, setBadgeAnimated] = useState(false);

  const { favouriteCount } = useFavourites();
  const { currentUser, isLoggedIn, logout } = useAuth();
  const navigate = useNavigate();

  // Trigger pulse animation whenever favouriteCount changes
  useEffect(() => {
    if (favouriteCount > 0) {
      const activateTimer = setTimeout(() => {
        setBadgeAnimated(true);
      }, 0);
      const deactivateTimer = setTimeout(() => {
        setBadgeAnimated(false);
      }, 500);

      return () => {
        clearTimeout(activateTimer);
        clearTimeout(deactivateTimer);
      };
    }
  }, [favouriteCount]);

  function handleLogout() {
    logout();
    navigate("/");
  }

  return (
    <nav className="navbar">
      <div className="navbar-brand-section">
        <Link to="/" className="brand" onClick={() => setMobileMenuOpen(false)}>
          <span className="brand-icon">▶</span>
          <span className="brand-highlight">CINEMA</span> STREAM
        </Link>
      </div>

      <button
        className="mobile-toggle-btn"
        type="button"
        onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        aria-label="Toggle navigation menu"
      >
        {mobileMenuOpen ? "✕" : "☰"}
      </button>

      <div className={`nav-links ${mobileMenuOpen ? "mobile-open" : ""}`}>
        <NavLink
          to="/"
          end
          onClick={() => setMobileMenuOpen(false)}
        >
          Home
        </NavLink>

        <NavLink
          to="/movies"
          onClick={() => setMobileMenuOpen(false)}
        >
          Movies
        </NavLink>

        <NavLink
          to="/tv-shows"
          onClick={() => setMobileMenuOpen(false)}
        >
          TV Shows
        </NavLink>

        <NavLink
          to="/my-list"
          className="favourite-link"
          onClick={() => setMobileMenuOpen(false)}
        >
          <span>❤️ My List</span>
          <span
            className={`favourite-count ${
              badgeAnimated ? "badge-pulse" : ""
            }`}
          >
            {favouriteCount}
          </span>
        </NavLink>

        <NavLink
          to="/subscription"
          onClick={() => setMobileMenuOpen(false)}
        >
          Subscription
        </NavLink>

        {currentUser?.isSubscribed && (
          <NavLink
            to="/premium"
            className="premium-vip-nav-link"
            onClick={() => setMobileMenuOpen(false)}
          >
            ✦ Premium
          </NavLink>
        )}
      </div>

      <div className="nav-actions">
        <button
          className="search-button"
          type="button"
          onClick={() => setShowSearch(true)}
          aria-label="Open search"
          title="Search movies & TV"
        >
          🔍
        </button>

        {isLoggedIn ? (
          <div className="user-profile-widget">
            <span className="user-greeting">
              👤 {currentUser.name?.split(" ")[0]}
              {currentUser.isSubscribed && (
                <span className="user-vip-badge">VIP</span>
              )}
            </span>
            <button
              type="button"
              className="logout-button"
              onClick={handleLogout}
              title="Sign out of CinemaStream"
            >
              Sign Out
            </button>
          </div>
        ) : (
          <NavLink to="/login" className="login-button">
            Sign In
          </NavLink>
        )}
      </div>

      {showSearch && (
        <Search onClose={() => setShowSearch(false)} />
      )}
    </nav>
  );
}

export default Navbar;