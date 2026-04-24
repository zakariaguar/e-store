import { Link } from 'react-router-dom';
import { useState } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      window.location.href = `/search?q=${encodeURIComponent(searchTerm)}`;
    }
    setIsMenuOpen(false);
  };

  // Style pour les liens avec animation au survol
  const linkStyle = {
    textDecoration: 'none',
    color: '#555',
    fontSize: '0.9rem',
    transition: 'opacity 0.3s ease',
    opacity: 1,
    padding: '0.5rem 0',
    display: 'inline-block'
  };

  // Style pour le bouton Connexion avec animation au survol
  const buttonStyle = {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#333',
    padding: '0.5rem 1.5rem',
    borderRadius: '25px',
    fontSize: '0.9rem',
    textAlign: 'center',
    display: 'inline-block',
    transition: 'opacity 0.3s ease, backgroundColor 0.3s ease',
    opacity: 1,
    border: 'none',
    cursor: 'pointer'
  };

  // Style pour le logo avec animation au survol
  const logoStyle = {
    textDecoration: 'none',
    color: '#333',
    fontSize: '1.3rem',
    fontWeight: '500',
    letterSpacing: '2px',
    transition: 'opacity 0.3s ease',
    opacity: 1,
    display: 'inline-block'
  };

  // Gestionnaires d'événements pour l'opacité
  const handleMouseEnter = (e) => {
    e.target.style.opacity = '0.7';
  };

  const handleMouseLeave = (e) => {
    e.target.style.opacity = '1';
  };

  // Pour le bouton Connexion avec changement de couleur
  const handleButtonMouseEnter = (e) => {
    e.target.style.opacity = '0.8';
    e.target.style.backgroundColor = '#555';
  };

  const handleButtonMouseLeave = (e) => {
    e.target.style.opacity = '1';
    e.target.style.backgroundColor = '#333';
  };

  return (
    <nav style={{
      backgroundColor: 'white',
      padding: '1rem 2rem',
      boxShadow: '0 2px 10px rgba(0,0,0,0.05)',
      borderBottom: '1px solid #eee'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        flexWrap: 'wrap',
        gap: '1rem'
      }}>
        {/* Logo avec animation */}
        <div>
          <Link 
            to="/" 
            style={logoStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            E-STORE
          </Link>
          <div style={{ fontSize: '0.7rem', color: '#999', letterSpacing: '1px' }}>
            Boutique en ligne
          </div>
        </div>

        {/* Barre de recherche - visible sur PC */}
        <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: '300px' }} className="search-desktop">
          <div style={{ display: 'flex', gap: '0.5rem' }}>
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '0.5rem 1rem',
                border: '1px solid #ddd',
                borderRadius: '25px',
                fontSize: '0.9rem',
                outline: 'none',
                transition: 'borderColor 0.3s ease'
              }}
              onFocus={(e) => e.target.style.borderColor = '#333'}
              onBlur={(e) => e.target.style.borderColor = '#ddd'}
            />
          </div>
        </form>

        {/* Navigation Desktop avec animation */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-menu">
          <Link 
            to="/" 
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Accueil
          </Link>
          <Link 
            to="/cart" 
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Panier
          </Link>
          <Link 
            to="/orders" 
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Commandes
          </Link>
          <Link 
            to="/about" 
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            À propos
          </Link>
          <Link 
            to="/contact" 
            style={linkStyle}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Contact
          </Link>
          {!isLoggedIn ? (
            <Link 
              to="/login" 
              style={buttonStyle}
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
            >
              Connexion
            </Link>
          ) : (
            <button 
              style={{ 
                background: 'none', 
                border: '1px solid #ddd', 
                padding: '0.5rem 1.5rem', 
                borderRadius: '25px', 
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
                opacity: 1
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Mon compte
            </button>
          )}
        </div>

        {/* Bouton Hamburger / X avec animation */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            fontSize: '1.8rem',
            cursor: 'pointer',
            color: '#333',
            transition: 'opacity 0.3s ease',
            opacity: 1
          }}
          className="hamburger"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #eee',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }} className="mobile-menu">
          <form onSubmit={handleSearch} style={{ width: '100%' }}>
            <div style={{ display: 'flex', gap: '0.5rem' }}>
              <input
                type="text"
                placeholder="Rechercher un produit..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{
                  flex: 1,
                  padding: '0.5rem 1rem',
                  border: '1px solid #ddd',
                  borderRadius: '25px',
                  fontSize: '0.9rem',
                  outline: 'none'
                }}
              />
            </div>
          </form>
          
          <Link 
            to="/" 
            style={linkStyle} 
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Accueil
          </Link>
          <Link 
            to="/cart" 
            style={linkStyle} 
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Panier
          </Link>
          <Link 
            to="/orders" 
            style={linkStyle} 
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Commandes
          </Link>
          <Link 
            to="/about" 
            style={linkStyle} 
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            À propos
          </Link>
          <Link 
            to="/contact" 
            style={linkStyle} 
            onClick={() => setIsMenuOpen(false)}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            Contact
          </Link>
          
          {!isLoggedIn ? (
            <Link 
              to="/login" 
              style={buttonStyle} 
              onClick={() => setIsMenuOpen(false)}
              onMouseEnter={handleButtonMouseEnter}
              onMouseLeave={handleButtonMouseLeave}
            >
              Connexion
            </Link>
          ) : (
            <button 
              style={{ 
                background: 'none', 
                border: '1px solid #ddd', 
                padding: '0.5rem 1.5rem', 
                borderRadius: '25px', 
                cursor: 'pointer',
                transition: 'opacity 0.3s ease',
                opacity: 1
              }}
              onMouseEnter={handleMouseEnter}
              onMouseLeave={handleMouseLeave}
            >
              Mon compte
            </button>
          )}
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .desktop-menu {
            display: none !important;
          }
          .search-desktop {
            display: none !important;
          }
          .hamburger {
            display: block !important;
          }
        }
        @media (min-width: 769px) {
          .mobile-menu {
            display: none !important;
          }
        }
      `}</style>
    </nav>
  );
};

export default Navbar;