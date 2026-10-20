
import "./Footer.css";

function Footer() {
  return (
    <div className="footer-container">
      <div className="footer-brand">
        <h3>
          CINEMA<span>STREAM</span>
        </h3>
        <p>Your world of movies and entertainment.</p>
      </div>

      <div className="footer-links">
        <a href="#about">About</a>
        <a href="#contact">Contact</a>
        <a href="#privacy">Privacy Policy</a>
      </div>

      <p className="footer-copy">
        © {new Date().getFullYear()} Cinema-Stream. All rights reserved.
      </p>
    </div>
  );
}

export default Footer;
