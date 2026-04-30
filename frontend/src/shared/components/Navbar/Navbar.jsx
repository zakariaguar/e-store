import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';
import './Navbar.css';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const searchRef = useRef(null);
  const searchInputRef = useRef(null);
  const navigate = useNavigate();

  // Vérifier si l'utilisateur est connecté
  useEffect(() => {
    const user = localStorage.getItem('user');
    if (user) {
      const userData = JSON.parse(user);
      setIsLoggedIn(true);
      setUserName(`${userData.firstName} ${userData.lastName}`);
    }
  }, []);

  // Déconnexion
  const handleLogout = () => {
    localStorage.removeItem('user');
    setIsLoggedIn(false);
    setUserName('');
    navigate('/');
    window.location.reload();
  };

  const searchProducts = async (query) => {
    if (!query.trim()) { setSearchResults([]); return; }
    try {
      const response = await fetch(`http://localhost:8080/api/products/search?keyword=${encodeURIComponent(query)}`);
      if (response.ok) setSearchResults(await response.json());
    } catch {
      setSearchResults([]);
    }
  };

  useEffect(() => {
    const t = setTimeout(() => searchProducts(searchTerm), 300);
    return () => clearTimeout(t);
  }, [searchTerm]);

  useEffect(() => {
    if (showSearch) searchInputRef.current?.focus();
  }, [showSearch]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchRef.current && !searchRef.current.contains(e.target)) {
        setShowSearch(false);
        setSearchResults([]);
        setSearchTerm('');
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
    setShowSearch(false);
    setSearchResults([]);
    setSearchTerm('');
    setIsMenuOpen(false);
  };

  const handleSearchToggle = () => {
    setShowSearch((prev) => {
      if (prev) { setSearchTerm(''); setSearchResults([]); }
      return !prev;
    });
  };

  return (
    <nav className="navbar">
      <div className="navbar__container">
        {/* Logo */}
        <div className="navbar__brand">
          <Link to="/" className="navbar__logo">ElectroWorld</Link>
          <span className="navbar__tagline">votre univers tech</span>
        </div>

        {/* Menu Desktop */}
        <div className="navbar__desktop-menu">
          <Link to="/" className="navbar__link">Accueil</Link>

          <div
            className="navbar__dropdown"
            onMouseEnter={() => setIsCategoryOpen(true)}
            onMouseLeave={() => setIsCategoryOpen(false)}
          >
            <span className="navbar__link navbar__link--dropdown">Catégories ▼</span>
            {isCategoryOpen && (
              <div className="navbar__dropdown-menu">
                <Link to="/category/1" className="navbar__dropdown-item">Smartphones</Link>
                <Link to="/category/2" className="navbar__dropdown-item">Ordinateurs</Link>
                <Link to="/category/3" className="navbar__dropdown-item">Électroménager</Link>
                <Link to="/category/4" className="navbar__dropdown-item">TV & Audio</Link>
              </div>
            )}
          </div>

          <Link to="/cart" className="navbar__link">Panier</Link>
          <Link to="/orders" className="navbar__link">Commandes</Link>

          {/* Loupe */}
          <button className="navbar__search-btn" onClick={handleSearchToggle}>
            <svg className="navbar__search-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
          </button>

          {/* Connexion / Déconnexion */}
          {!isLoggedIn ? (
            <Link to="/login" className="navbar__btn-login">Connexion</Link>
          ) : (
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <span style={{ color: '#fff' }}>👤 {userName}</span>
              <button onClick={handleLogout} className="navbar__btn-login" style={{ backgroundColor: '#555', marginRight: '20px' }}>
                Déconnexion
              </button>
            </div>
          )}
        </div>

        {/* Hamburger Mobile */}
        <button className="navbar__hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Barre de recherche Desktop */}
      {showSearch && (
        <div className="navbar__search-bar" ref={searchRef}>
          <div className="navbar__search-wrapper">
            <svg className="navbar__search-bar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
            <input
              ref={searchInputRef}
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="navbar__search-input"
            />
            {searchTerm && (
              <button className="navbar__search-clear" onClick={() => { setSearchTerm(''); setSearchResults([]); }}>✕</button>
            )}
          </div>

          {searchTerm.trim() && (
            <div className="navbar__search-results">
              {searchResults.length === 0
                ? <div className="navbar__search-empty">Aucun produit trouvé</div>
                : searchResults.map((product) => (
                  <div key={product.id} onClick={() => handleProductClick(product.id)} className="navbar__search-result-item">
                    <img src={product.imageUrl || 'https://picsum.photos/id/0/50/50'} alt={product.name} className="navbar__result-img" />
                    <div className="navbar__result-info">
                      <div className="navbar__result-name">{product.name}</div>
                      <div className="navbar__result-desc">{product.description?.replace(/<[^>]*>/g, ' ').substring(0, 60)}...</div>
                      <div className="navbar__result-price">{product.price} DH</div>
                    </div>
                  </div>
                ))
              }
            </div>
          )}
        </div>
      )}

      {/* Menu Mobile */}
      {isMenuOpen && (
        <div className="navbar__mobile-menu">
          <div className="navbar__mobile-search">
            <svg className="navbar__search-bar-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="7" />
              <line x1="16.5" y1="16.5" x2="22" y2="22" />
            </svg>
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="navbar__search-input"
            />
          </div>

          {searchTerm.trim() && searchResults.length > 0 && (
            <div className="navbar__mobile-results">
              {searchResults.map((product) => (
                <div key={product.id} onClick={() => handleProductClick(product.id)} className="navbar__mobile-result-item">
                  <img src={product.imageUrl || 'https://picsum.photos/id/0/40/40'} alt={product.name} className="navbar__mobile-result-img" />
                  <div className="navbar__result-info">
                    <div className="navbar__result-name">{product.name}</div>
                    <div className="navbar__result-price">{product.price} DH</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchTerm.trim() && searchResults.length === 0 && (
            <div className="navbar__search-empty navbar__search-empty--mobile">Aucun produit trouvé</div>
          )}

          <div className="navbar__mobile-links">
            <Link to="/" className="navbar__link" onClick={() => setIsMenuOpen(false)}>Accueil</Link>
            <Link to="/category/1" className="navbar__link" onClick={() => setIsMenuOpen(false)}>Smartphones</Link>
            <Link to="/category/2" className="navbar__link" onClick={() => setIsMenuOpen(false)}>Ordinateurs</Link>
            <Link to="/category/3" className="navbar__link" onClick={() => setIsMenuOpen(false)}>Électroménager</Link>
            <Link to="/category/4" className="navbar__link" onClick={() => setIsMenuOpen(false)}>TV & Audio</Link>
            <Link to="/cart" className="navbar__link" onClick={() => setIsMenuOpen(false)}>Panier</Link>
            <Link to="/orders" className="navbar__link" onClick={() => setIsMenuOpen(false)}>Commandes</Link>

            {!isLoggedIn ? (
              <Link to="/login" className="navbar__btn-login navbar__btn-login--mobile" onClick={() => setIsMenuOpen(false)}>Connexion</Link>
            ) : (
              <>
                <div style={{ padding: '0.5rem 0', color: '#fff' }}>👤 {userName}</div>
                <button onClick={handleLogout} className="navbar__btn-login navbar__btn-login--mobile" style={{ backgroundColor: '#555' }}>
                  Déconnexion
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;