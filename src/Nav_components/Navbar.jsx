
import { NavLink, Link } from "react-router-dom";
import "./Navbar.css";
import Search from "./Search";
import { useState } from "react";

function Navbar() {

  const [showSearch, setShowSearch] = useState(false);

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
          onClick={() => setShowSearch(true)}
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
