import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import Search from "./Search";
import { useState } from "react";
import { useFavourites } from "../Context/FavouriteContext";

function Navbar() {
  const [showSearch, setShowSearch] = useState(false);
  const { favouriteCount } = useFavourites();
  return (
    <nav className="navbar">
      <Link to="/" className="brand">
        <span className="brand-icon">▶</span>
        <span className="brand-highlight">CINEMA</span> STREAM
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

        <NavLink to="/my-list" className="favourite-link">
          ❤️ My List
          <span className="favourite-count">
            {favouriteCount}
          </span>
        </NavLink>

        <NavLink to="/subscription">
          Subscription
        </NavLink>
      </div>

      <div className="nav-actions">
        <button
          className="search-button"
          type="button"
          onClick={() => setShowSearch(true)}
          aria-label="Open search"
        >
          🔍
        </button>

        <NavLink to="/login" className="login-button">
          Login
        </NavLink>
      </div>

      {showSearch && (
        <Search onClose={() => setShowSearch(false)} />
      )}
    </nav>
  );
}

export default Navbar;