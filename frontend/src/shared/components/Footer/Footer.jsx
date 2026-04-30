import { Link } from 'react-router-dom';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        
        {/* Section 1: Logo & Description */}
        <div className="footer-section">
          <div className="footer-logo">
            <img src="/logo.jpg" alt="ElectroWorld" className="footer-logo-img" />
            <span className="footer-logo-text">ElectroWorld</span>
          </div>
          <p className="footer-description">
            Votre univers tech depuis 2024. Découvrez les meilleurs produits 
            high-tech au meilleur prix. Livraison rapide et service client réactif.
          </p>
        </div>

        {/* Section 2: Liens rapides */}
        <div className="footer-section">
          <h3 className="footer-title">Navigation</h3>
          <ul className="footer-links">
            <li><Link to="/">Accueil</Link></li>
            <li><Link to="/category/1">Smartphones</Link></li>
            <li><Link to="/category/2">Ordinateurs</Link></li>
            <li><Link to="/category/3">Électroménager</Link></li>
            <li><Link to="/category/4">TV & Audio</Link></li>
          </ul>
        </div>

        {/* Section 3: Contact & Social Media */}
        <div className="footer-section">
          <h3 className="footer-title">Contactez-nous</h3>
          <ul className="footer-contact">
            <li>📍 Casablanca, Maroc</li>
            <li>📞 +212 5 22 123 456</li>
            <li>✉️ contact@electroworld.ma</li>
          </ul>
          <div className="footer-social">
            <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Facebook">
              <img src="/logos/facebook.png" alt="Facebook" className="social-icon" />
            </a>
            <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="Instagram">
              <img src="/logos/instagram.png" alt="Instagram" className="social-icon" />
            </a>
            <a href="mailto:contact@electroworld.ma" className="footer-social-link" aria-label="Gmail">
              <img src="/logos/gmail.png" alt="Gmail" className="social-icon" />
            </a>
            <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="footer-social-link" aria-label="LinkedIn">
              <img src="/logos/logolinkdin4.png" alt="LinkedIn" className="social-icon" />
            </a>
          </div>
        </div>
      </div>

      {/* Copyright */}
      <div className="footer-bottom">
        <p>&copy; 2026 ElectroWorld - Tous droits réservés</p>
      </div>
    </footer>
  );
};

export default Footer;