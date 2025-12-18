import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer__container">
        <div className="footer__content">
          <div className="footer__brand">
            <h3 className="footer__logo">Je Me Digitalise</h3>
            <p className="footer__tagline">
              Marketing digital & stratégies performantes
            </p>
          </div>

          <div className="footer__links">
            <h4>Navigation</h4>
            <ul>
              <li><Link to="/">Accueil</Link></li>
              <li><a href="/#services">Services</a></li>
              <li><a href="/#portfolio">Portfolio</a></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          <div className="footer__social">
            <h4>Suivez-moi</h4>
            <div className="footer__social-links">
              <a 
                href="https://www.instagram.com/jemedigitalise/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Instagram
              </a>
              <a 
                href="https://www.tiktok.com/@nicojemedigitalise" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                TikTok
              </a>
              <a 
                href="https://www.youtube.com/@Nico-JeMeDigitalise/featured" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                YouTube
              </a>
            </div>
          </div>

          <div className="footer__contact">
            <h4>Contact</h4>
            <p>
              <a href="mailto:jules_benoit@outlook.com">jules_benoit@outlook.com</a>
            </p>
            <p>
              <a href="tel:+32499845636">+32 499 84 56 36</a>
            </p>
          </div>
        </div>

        <div className="footer__bottom">
          <p>&copy; {new Date().getFullYear()} Je Me Digitalise. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
