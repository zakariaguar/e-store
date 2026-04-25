import { Link, useNavigate } from 'react-router-dom';
import { useState, useEffect, useRef } from 'react';

const Navbar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);
  const [showSearch, setShowSearch] = useState(false);
  const [isCategoryOpen, setIsCategoryOpen] = useState(false);
  const searchRef = useRef(null);
  const navigate = useNavigate();

  // Fonction pour rechercher des produits
  const searchProducts = async (query) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    try {
      const response = await fetch(`http://localhost:8080/api/products/search?keyword=${encodeURIComponent(query)}`);
      if (response.ok) {
        const data = await response.json();
        setSearchResults(data);
      }
    } catch (error) {
      console.error('Erreur recherche:', error);
      setSearchResults([]);
    }
  };

  // Effet pour rechercher pendant la saisie (desktop)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (showSearch) {
        searchProducts(searchTerm);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm, showSearch]);

  // Effet pour recherche mobile (en temps réel)
  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      if (searchTerm.trim()) {
        searchProducts(searchTerm);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(delayDebounce);
  }, [searchTerm]);

  // Fermer les résultats quand on clique ailleurs
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
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

  // Style pour les liens
  const linkStyle = {
    textDecoration: 'none',
    color: '#fff',
    fontSize: '0.9rem',
    fontWeight: '500',
    transition: 'opacity 0.3s ease',
    opacity: 1,
    padding: '0.5rem 0',
    display: 'inline-block'
  };

  const buttonStyle = {
    textDecoration: 'none',
    color: '#fff',
    backgroundColor: '#e74c3c',
    padding: '0.5rem 1.5rem',
    borderRadius: '5px',
    fontSize: '0.9rem',
    textAlign: 'center',
    display: 'inline-block',
    transition: 'opacity 0.3s ease, backgroundColor 0.3s ease',
    opacity: 1,
    border: 'none',
    cursor: 'pointer'
  };

  const handleMouseEnter = (e) => {
    e.target.style.opacity = '0.7';
  };

  const handleMouseLeave = (e) => {
    e.target.style.opacity = '1';
  };

  const handleButtonMouseEnter = (e) => {
    e.target.style.opacity = '0.8';
    e.target.style.backgroundColor = '#c0392b';
  };

  const handleButtonMouseLeave = (e) => {
    e.target.style.opacity = '1';
    e.target.style.backgroundColor = '#e74c3c';
  };

  return (
    <nav style={{
      backgroundColor: '#1a1a2e',
      padding: '1rem 2rem',
      boxShadow: '0 4px 15px rgba(0,0,0,0.1)',
      borderBottom: 'none',
      position: 'sticky',
      top: 0,
      zIndex: 1000
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
        {/* Logo ElectroWorld */}
        <div>
          <Link 
            to="/" 
            style={{
              textDecoration: 'none',
              color: '#fff',
              fontSize: '1.5rem',
              fontWeight: '700',
              letterSpacing: '1px',
              transition: 'opacity 0.3s ease'
            }}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            ElectroWorld
          </Link>
          <div style={{ fontSize: '0.7rem', color: '#aaa', letterSpacing: '1px' }}>
            votre univers tech
          </div>
        </div>

        {/* Navigation Desktop */}
        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }} className="desktop-menu">
          <Link to="/" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Accueil</Link>

          {/* Menu Catégories */}
          <div 
            style={{ position: 'relative' }}
            onMouseEnter={() => setIsCategoryOpen(true)}
            onMouseLeave={() => setIsCategoryOpen(false)}
          >
            <span style={{ ...linkStyle, cursor: 'pointer' }} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Catégories ▼</span>
            {isCategoryOpen && (
              <div style={{
                position: 'absolute',
                top: '100%',
                left: 0,
                backgroundColor: '#fff',
                minWidth: '200px',
                boxShadow: '0 8px 16px rgba(0,0,0,0.1)',
                borderRadius: '8px',
                zIndex: 1000,
                padding: '0.5rem 0'
              }}>
                <Link to="/category/1" style={{ display: 'block', padding: '10px 24px', color: '#333', textDecoration: 'none', fontSize: '0.9rem' }}>Smartphones</Link>
                <Link to="/category/2" style={{ display: 'block', padding: '10px 24px', color: '#333', textDecoration: 'none', fontSize: '0.9rem' }}>Ordinateurs</Link>
                <Link to="/category/3" style={{ display: 'block', padding: '10px 24px', color: '#333', textDecoration: 'none', fontSize: '0.9rem' }}>Électroménager</Link>
                <Link to="/category/4" style={{ display: 'block', padding: '10px 24px', color: '#333', textDecoration: 'none', fontSize: '0.9rem' }}>TV & Audio</Link>
              </div>
            )}
          </div>

          <Link to="/cart" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Panier</Link>
          <Link to="/orders" style={linkStyle} onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>Commandes</Link>

          {/* Logo recherche personnalisé desktop */}
          <button
            onClick={() => setShowSearch(!showSearch)}
            style={{
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              padding: '0',
              display: 'flex',
              alignItems: 'center'
            }}
          >
            <img 
              src="/rech.png" 
              alt="Rechercher"
              style={{
                height: '32px',
                width: 'auto',
                transition: 'opacity 0.3s ease, transform 0.3s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.opacity = '0.7';
                e.currentTarget.style.transform = 'scale(1.05)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.opacity = '1';
                e.currentTarget.style.transform = 'scale(1)';
              }}
            />
          </button>

          {!isLoggedIn ? (
            <Link to="/login" style={buttonStyle} onMouseEnter={handleButtonMouseEnter} onMouseLeave={handleButtonMouseLeave}>Connexion</Link>
          ) : (
            <button style={{ background: 'none', border: '1px solid #fff', padding: '0.5rem 1.5rem', borderRadius: '5px', cursor: 'pointer', color: '#fff' }}>
              Mon compte
            </button>
          )}
        </div>

        {/* Bouton Hamburger mobile */}
        <button
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            fontSize: '1.8rem',
            cursor: 'pointer',
            color: '#fff',
            transition: 'opacity 0.3s ease'
          }}
          className="hamburger"
        >
          {isMenuOpen ? '✕' : '☰'}
        </button>
      </div>

      {/* Barre de recherche DESKTOP avec résultats dynamiques */}
      {showSearch && (
        <div ref={searchRef} style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #333',
          position: 'relative'
        }}>
          <input
            type="text"
            placeholder="Rechercher un produit..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{
              width: '100%',
              maxWidth: '500px',
              margin: '0 auto',
              display: 'block',
              padding: '0.7rem 1rem',
              border: 'none',
              borderRadius: '5px',
              fontSize: '0.9rem',
              outline: 'none',
              backgroundColor: '#fff'
            }}
            autoFocus
          />

          {/* Résultats de recherche desktop */}
          {searchTerm.trim() && (
            <div style={{
              position: 'absolute',
              top: '100%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '500px',
              maxHeight: '400px',
              overflowY: 'auto',
              backgroundColor: '#fff',
              borderRadius: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
              marginTop: '5px',
              zIndex: 1001
            }}>
              {searchResults.length === 0 ? (
                <div style={{ padding: '1rem', textAlign: 'center', color: '#999' }}>
                  Aucun produit trouvé
                </div>
              ) : (
                searchResults.map((product) => (
                  <div
                    key={product.id}
                    onClick={() => handleProductClick(product.id)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      gap: '1rem',
                      padding: '0.8rem 1rem',
                      borderBottom: '1px solid #eee',
                      cursor: 'pointer',
                      transition: 'background-color 0.2s'
                    }}
                    onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#f5f5f5'}
                    onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#fff'}
                  >
                    <img 
                      src={product.imageUrl || 'https://picsum.photos/id/0/50/50'} 
                      alt={product.name}
                      style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }}
                    />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontWeight: '600', color: '#333' }}>{product.name}</div>
                      <div style={{ fontSize: '0.8rem', color: '#666' }}>{product.description?.substring(0, 60)}...</div>
                      <div style={{ fontWeight: 'bold', color: '#e74c3c', marginTop: '4px' }}>{product.price} €</div>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}
        </div>
      )}

      {/* Menu MOBILE avec recherche intégrée */}
      {isMenuOpen && (
        <div style={{
          marginTop: '1rem',
          paddingTop: '1rem',
          borderTop: '1px solid #333',
          display: 'flex',
          flexDirection: 'column',
          gap: '1rem'
        }} className="mobile-menu">
          
          {/* Barre recherche mobile */}
          <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
            <input
              type="text"
              placeholder="Rechercher un produit..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{
                flex: 1,
                padding: '0.7rem 1rem',
                border: 'none',
                borderRadius: '5px',
                fontSize: '0.9rem',
                outline: 'none',
                backgroundColor: '#fff'
              }}
              autoFocus
            />
            <img 
              src="/rech.png" 
              alt="Rechercher"
              style={{
                height: '50px',
                width: 'auto',
                cursor: 'pointer'
              }}
              onClick={() => {
                if (searchTerm.trim()) {
                  navigate(`/search?q=${encodeURIComponent(searchTerm)}`);
                  setIsMenuOpen(false);
                }
              }}
            />
          </div>

          {/* Résultats recherche mobile */}
          {searchTerm.trim() && searchResults.length > 0 && (
            <div style={{
              maxHeight: '300px',
              overflowY: 'auto',
              backgroundColor: '#fff',
              borderRadius: '8px'
            }}>
              {searchResults.map((product) => (
                <div
                  key={product.id}
                  onClick={() => handleProductClick(product.id)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    padding: '0.5rem',
                    borderBottom: '1px solid #eee',
                    cursor: 'pointer'
                  }}
                >
                  <img 
                    src={product.imageUrl || 'https://picsum.photos/id/0/40/40'} 
                    alt={product.name}
                    style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '5px' }}
                  />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontWeight: '600', color: '#333', fontSize: '0.8rem' }}>{product.name}</div>
                    <div style={{ fontWeight: 'bold', color: '#e74c3c', fontSize: '0.8rem' }}>{product.price} €</div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {searchTerm.trim() && searchResults.length === 0 && (
            <div style={{ padding: '0.5rem', textAlign: 'center', color: '#aaa', backgroundColor: '#fff', borderRadius: '5px' }}>
              Aucun produit trouvé
            </div>
          )}

          <Link to="/" style={{ ...linkStyle }} onClick={() => setIsMenuOpen(false)}>Accueil</Link>
          <Link to="/category/1" style={{ ...linkStyle }} onClick={() => setIsMenuOpen(false)}>Smartphones</Link>
          <Link to="/category/2" style={{ ...linkStyle }} onClick={() => setIsMenuOpen(false)}>Ordinateurs</Link>
          <Link to="/category/3" style={{ ...linkStyle }} onClick={() => setIsMenuOpen(false)}>Électroménager</Link>
          <Link to="/category/4" style={{ ...linkStyle }} onClick={() => setIsMenuOpen(false)}>TV & Audio</Link>
          <Link to="/cart" style={{ ...linkStyle }} onClick={() => setIsMenuOpen(false)}>Panier</Link>
          <Link to="/orders" style={{ ...linkStyle }} onClick={() => setIsMenuOpen(false)}>Commandes</Link>
          
          {!isLoggedIn ? (
            <Link to="/login" style={buttonStyle} onClick={() => setIsMenuOpen(false)}>Connexion</Link>
          ) : (
            <button style={{ background: 'none', border: '1px solid #fff', padding: '0.5rem 1.5rem', borderRadius: '5px', cursor: 'pointer', color: '#fff' }}>
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