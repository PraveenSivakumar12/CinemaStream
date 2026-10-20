
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">▶</span>
        CINEMA<span className="brand-highlight">STREAM</span>
      </Link>

      <div className="nav-links">
        <NavLink to="/" end>
          Home
        </NavLink>

        <NavLink to="/movies">
          Movies
        </NavLink>

        <NavLink to="/tv-shows">
          TV Shows
        </NavLink>

        <NavLink to="/my-list">
          Favourites
        </NavLink>
      </div>

      <div className="nav-actions">
        <button
          className="search-button"
          aria-label="Search movies"
          onClick={() => alert("Search feature coming soon!")}
        >
          🔍
        </button>

        <NavLink to="/login" className="login-button">
          Login
        </NavLink>
      </div>
    </nav>
  );
}

export default Navbar;
